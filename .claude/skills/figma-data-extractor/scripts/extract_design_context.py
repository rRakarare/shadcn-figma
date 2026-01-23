#!/usr/bin/env python3
"""
Extract and process design context from Figma MCP tool output.

Handles large JSON responses that exceed Claude's token limits by:
1. Reading the saved tool output file
2. Extracting the generated code
3. Extracting asset URLs
4. Saving components to separate files

Usage:
    python extract_design_context.py <input_json> <output_dir>

Example:
    python extract_design_context.py design-context.json ./output
"""

import json
import re
import sys
import os
from pathlib import Path


def extract_code(text: str) -> str:
    """Extract the main code content from design context text."""
    return text


def extract_asset_urls(text: str) -> list[str]:
    """Extract all Figma asset URLs from the code."""
    pattern = r'https://www\.figma\.com/api/mcp/asset/[a-f0-9-]+'
    urls = re.findall(pattern, text)
    return list(set(urls))


def extract_components(text: str) -> dict[str, str]:
    """Extract individual component definitions from the code."""
    components = {}

    # Match function components: function Name(...) { ... }
    func_pattern = r'(function\s+([A-Z][a-zA-Z0-9]*)\s*\([^)]*\)\s*\{)'

    matches = list(re.finditer(func_pattern, text))

    for i, match in enumerate(matches):
        name = match.group(2)
        start = match.start()

        # Find the end by counting braces
        brace_count = 0
        end = start
        in_string = False
        string_char = None

        for j, char in enumerate(text[start:], start):
            if char in '"\'`' and (j == 0 or text[j-1] != '\\'):
                if not in_string:
                    in_string = True
                    string_char = char
                elif char == string_char:
                    in_string = False

            if not in_string:
                if char == '{':
                    brace_count += 1
                elif char == '}':
                    brace_count -= 1
                    if brace_count == 0:
                        end = j + 1
                        break

        components[name] = text[start:end]

    return components


def extract_child_component_refs(text: str, file_key: str = None) -> dict:
    """
    Extract child component references from the code.

    Component instances in Figma use patterns like:
    - I<parent-id>;<component-id> for direct instances
    - I<parent-id>;<intermediate-id>;<component-id> for nested instances

    The component-id (after the last semicolon) is the actual component definition.

    Returns:
        dict with:
        - 'instances': list of all instance patterns found
        - 'component_refs': unique component IDs referenced
        - 'figma_urls': generated Figma URLs for each unique component
        - 'custom_components': components that are NOT base library components
        - 'base_components': shadcn/ui and icon library components
    """
    # Known base component patterns (shadcn/ui, icons, common UI primitives)
    BASE_COMPONENT_PATTERNS = [
        # shadcn/ui components
        'button', 'input', 'card', 'badge', 'avatar', 'checkbox', 'radio',
        'select', 'switch', 'slider', 'tabs', 'dialog', 'drawer', 'dropdown',
        'popover', 'tooltip', 'toast', 'alert', 'accordion', 'separator',
        'scroll', 'table', 'form', 'label', 'textarea', 'calendar', 'date',
        'command', 'menubar', 'navigation', 'pagination', 'progress', 'skeleton',
        'sheet', 'sidebar', 'sonner', 'toggle', 'carousel', 'collapsible',
        'context-menu', 'hover-card', 'resizable', 'aspect-ratio', 'breadcrumb',
        # Icon patterns
        'icon', 'lucide', 'vector', 'svg',
        # Common primitives/containers (usually not custom)
        'container', 'wrapper', 'frame', 'group', 'stack', 'flex', 'grid',
        'header', 'footer', 'content', 'body', 'row', 'column', 'divider',
        'spacer', 'line', 'border', 'background', 'overlay', 'backdrop',
    ]

    # Find all data-node-id patterns with their corresponding data-name
    # Pattern to capture both node-id and name together
    combined_pattern = r'data-node-id="(I[^"]+)"[^>]*?data-name="([^"]+)"'
    combined_matches = re.findall(combined_pattern, text)

    # Also try reverse order (name before node-id)
    combined_pattern_rev = r'data-name="([^"]+)"[^>]*?data-node-id="(I[^"]+)"'
    combined_matches_rev = re.findall(combined_pattern_rev, text)
    # Swap to (node_id, name) format
    combined_matches_rev = [(m[1], m[0]) for m in combined_matches_rev]

    all_matches = combined_matches + combined_matches_rev

    # Build mapping of component_ref -> names
    component_to_names = {}
    for node_id, name in all_matches:
        parts = node_id.split(';')
        if len(parts) >= 2:
            component_ref = parts[-1]
            if component_ref not in component_to_names:
                component_to_names[component_ref] = set()
            component_to_names[component_ref].add(name)

    # Fallback: get all instances and names separately if combined didn't work well
    instance_pattern = r'data-node-id="(I[^"]+)"'
    instances = re.findall(instance_pattern, text)

    name_pattern = r'data-name="([^"]+)"'
    all_names = re.findall(name_pattern, text)

    # Extract unique component references
    component_refs = set()
    for inst in instances:
        parts = inst.split(';')
        if len(parts) >= 2:
            component_refs.add(parts[-1])

    def is_base_component(name: str) -> bool:
        """Check if a component name matches base component patterns.

        A component is considered "base" if:
        1. The name IS a base component (e.g., "Button", "Input")
        2. The name starts with icon library prefix (e.g., "Lucide Icons / plus")

        A component is considered "custom" if:
        1. It has an app-specific prefix before the base name (e.g., "Project Header")
        2. It's a completely custom name (e.g., "ProjectListItem")
        """
        name_lower = name.lower().strip()

        # If name contains " / " it's likely an icon from a library
        if ' / ' in name_lower:
            # Check if it's from a known icon library
            icon_prefixes = ['lucide', 'icon', 'heroicon', 'feather', 'phosphor']
            for prefix in icon_prefixes:
                if name_lower.startswith(prefix):
                    return True

        # Exact match or very close match to base components
        # Remove common suffixes/prefixes for comparison
        clean_name = name_lower.replace('-', ' ').replace('_', ' ')
        words = clean_name.split()

        # If FIRST word is NOT a base component, it's likely custom
        # e.g., "Project Header" -> "project" is not a base, so it's custom
        # e.g., "Button Primary" -> "button" is base, so it's base
        if words:
            first_word = words[0]
            # Check if first word matches a base component exactly
            for pattern in BASE_COMPONENT_PATTERNS:
                if first_word == pattern or first_word == pattern + 's':  # plural
                    return True

        # Check if the entire name (without spaces) matches base patterns
        name_no_spaces = name_lower.replace(' ', '').replace('-', '').replace('_', '')
        for pattern in BASE_COMPONENT_PATTERNS:
            pattern_clean = pattern.replace('-', '').replace('_', '')
            if name_no_spaces == pattern_clean or name_no_spaces == pattern_clean + 's':
                return True

        return False

    # Categorize components
    custom_components = {}
    base_components = {}

    for ref in component_refs:
        names = component_to_names.get(ref, set())
        # If no names found via combined pattern, try to infer from all names
        if not names:
            # Use ref as identifier
            names = {ref}

        # Check if ANY name suggests it's a base component
        names_list = list(names)
        is_base = any(is_base_component(n) for n in names_list)

        component_info = {
            'node_id': ref,
            'names': names_list,
        }
        if file_key:
            component_info['figma_url'] = f"https://www.figma.com/design/{file_key}/?node-id={ref.replace(':', '-')}"

        if is_base:
            base_components[ref] = component_info
        else:
            custom_components[ref] = component_info

    # Generate Figma URLs if file_key is provided
    figma_urls = {}
    if file_key:
        for ref in component_refs:
            figma_urls[ref] = f"https://www.figma.com/design/{file_key}/?node-id={ref.replace(':', '-')}"

    return {
        'instance_count': len(instances),
        'unique_components': len(component_refs),
        'component_refs': sorted(list(component_refs)),
        'figma_urls': figma_urls,
        'component_names': all_names[:20],  # Sample of component names found
        'custom_components': custom_components,
        'base_components': base_components,
        'custom_count': len(custom_components),
        'base_count': len(base_components),
    }


def process_design_context(input_path: str, output_dir: str, file_key: str = None) -> dict:
    """Process a design context JSON file and extract all data."""
    input_path = Path(input_path)
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    # Read input JSON
    with open(input_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # Extract text content (handle array format from MCP)
    if isinstance(data, list) and len(data) > 0:
        text = data[0].get('text', '')
    elif isinstance(data, dict):
        text = data.get('text', '') or data.get('code', '')
    else:
        text = str(data)

    result = {
        'input_file': str(input_path),
        'output_dir': str(output_dir),
        'files_created': []
    }

    # Save full code
    code_path = output_dir / 'generated-code.tsx'
    with open(code_path, 'w', encoding='utf-8') as f:
        f.write(text)
    result['files_created'].append(str(code_path))
    result['code_size'] = len(text)

    # Extract and save asset URLs
    asset_urls = extract_asset_urls(text)
    if asset_urls:
        assets_dir = output_dir / 'assets'
        assets_dir.mkdir(exist_ok=True)

        urls_path = assets_dir / 'asset-urls.txt'
        with open(urls_path, 'w', encoding='utf-8') as f:
            for url in asset_urls:
                f.write(url + '\n')
        result['files_created'].append(str(urls_path))
        result['asset_count'] = len(asset_urls)

    # Extract components
    components = extract_components(text)
    if components:
        result['components'] = list(components.keys())

    # Extract child component references
    child_refs = extract_child_component_refs(text, file_key)
    if child_refs['unique_components'] > 0:
        child_refs_path = output_dir / 'child-components.json'
        with open(child_refs_path, 'w', encoding='utf-8') as f:
            json.dump(child_refs, f, indent=2)
        result['files_created'].append(str(child_refs_path))
        result['child_component_count'] = child_refs['unique_components']
        result['child_refs'] = child_refs

    return result


def main():
    if len(sys.argv) < 3:
        print("Usage: python extract_design_context.py <input_json> <output_dir> [file_key]")
        print("Example: python extract_design_context.py design-context.json ./output p47Lwdw7tC0AaAT1ynftyS")
        print("")
        print("Optional file_key enables generating Figma URLs for child components")
        sys.exit(1)

    input_path = sys.argv[1]
    output_dir = sys.argv[2]
    file_key = sys.argv[3] if len(sys.argv) > 3 else None

    if not os.path.exists(input_path):
        print(f"Error: Input file not found: {input_path}")
        sys.exit(1)

    result = process_design_context(input_path, output_dir, file_key)

    print(f"Processed: {result['input_file']}")
    print(f"Code size: {result['code_size']} characters")
    print(f"Assets found: {result.get('asset_count', 0)}")
    print(f"Components: {', '.join(result.get('components', []))}")
    print(f"Files created: {len(result['files_created'])}")
    for f in result['files_created']:
        print(f"  - {f}")

    # Report child component references
    if 'child_refs' in result:
        refs = result['child_refs']
        print(f"\n{'='*60}")
        print(f"CHILD COMPONENT ANALYSIS")
        print(f"{'='*60}")
        print(f"Total instances: {refs['instance_count']}")
        print(f"Unique components: {refs['unique_components']}")
        print(f"  - Custom components: {refs.get('custom_count', 0)}")
        print(f"  - Base/library components: {refs.get('base_count', 0)}")

        # Show custom components (the ones user likely wants to extract)
        if refs.get('custom_components'):
            print(f"\n>>> CUSTOM COMPONENTS (likely need extraction):")
            for ref, info in list(refs['custom_components'].items())[:10]:
                names = ', '.join(info.get('names', [ref]))
                print(f"  [{ref}] {names}")
                if info.get('figma_url'):
                    print(f"      {info['figma_url']}")
            if len(refs['custom_components']) > 10:
                print(f"  ... and {len(refs['custom_components']) - 10} more custom components")

        # Show base components summary
        if refs.get('base_components'):
            print(f"\n--- Base components (shadcn/icons - usually no extraction needed):")
            base_names = set()
            for ref, info in refs['base_components'].items():
                base_names.update(info.get('names', []))
            print(f"  {', '.join(sorted(base_names)[:15])}")
            if len(base_names) > 15:
                print(f"  ... and {len(base_names) - 15} more")

        print(f"\nFull details saved to child-components.json")


if __name__ == '__main__':
    main()
