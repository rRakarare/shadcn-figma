#!/usr/bin/env python3
"""
Extract true component instances from Figma metadata XML.

This script parses the XML output from get_metadata and extracts only
<instance> nodes, properly categorizing them and extracting icon names.

Usage:
    python extract_instances_from_metadata.py <metadata.xml> <output_dir> [file_key]

Example:
    python extract_instances_from_metadata.py metadata.xml ./output p47Lwdw7tC0AaAT1ynftyS
"""

import json
import re
import sys
import os
from pathlib import Path
from xml.etree import ElementTree as ET
from typing import Optional
from dataclasses import dataclass, asdict


# ============================================================================
# SHADCN/UI COMPONENTS - These are library components, no Figma URL needed
# ============================================================================
SHADCN_COMPONENTS = {
    # Core UI Components
    'accordion', 'alert', 'alert-dialog', 'aspect-ratio', 'avatar',
    'badge', 'breadcrumb', 'button', 'button-group',
    'calendar', 'card', 'carousel', 'chart', 'checkbox', 'collapsible',
    'command', 'context-menu',
    'dialog', 'drawer', 'dropdown-menu',
    'empty',
    'field', 'form',
    'hover-card',
    'input', 'input-group', 'input-otp', 'item',
    'kbd',
    'label',
    'menubar',
    'native-select', 'navigation-menu',
    'pagination', 'popover', 'progress',
    'radio-group', 'resizable',
    'scroll-area', 'select', 'separator', 'sheet', 'sidebar',
    'skeleton', 'slider', 'sonner', 'spinner', 'switch',
    'table', 'tabs', 'textarea', 'toggle', 'toggle-group', 'tooltip',
}

# Common variations and aliases
SHADCN_ALIASES = {
    'alertdialog': 'alert-dialog',
    'buttongroup': 'button-group',
    'contextmenu': 'context-menu',
    'dropdownmenu': 'dropdown-menu',
    'hovercard': 'hover-card',
    'inputgroup': 'input-group',
    'inputotp': 'input-otp',
    'nativeselect': 'native-select',
    'navigationmenu': 'navigation-menu',
    'radiogroup': 'radio-group',
    'scrollarea': 'scroll-area',
    'togglegroup': 'toggle-group',
}


@dataclass
class InstanceInfo:
    """Information about a Figma component instance."""
    node_id: str
    name: str
    x: int
    y: int
    width: int
    height: int
    hidden: bool = False
    # Categorization
    is_shadcn: bool = False
    is_lucide_icon: bool = False
    lucide_icon_name: Optional[str] = None
    shadcn_component: Optional[str] = None
    figma_url: Optional[str] = None


def normalize_component_name(name: str) -> str:
    """Normalize a component name for comparison."""
    return name.lower().replace('-', '').replace('_', '').replace(' ', '')


def is_shadcn_component(name: str) -> tuple[bool, Optional[str]]:
    """
    Check if a component name matches a shadcn/ui component.

    Returns:
        (is_shadcn, component_name) - True and the shadcn component name if match
    """
    name_lower = name.lower().strip()
    name_normalized = normalize_component_name(name)

    # Direct match
    if name_lower in SHADCN_COMPONENTS:
        return True, name_lower

    # Check aliases
    if name_normalized in SHADCN_ALIASES:
        return True, SHADCN_ALIASES[name_normalized]

    # Check if name starts with a shadcn component
    # e.g., "Button Primary", "Badge Outline", "Card Header"
    words = name_lower.split()
    if words:
        first_word = words[0].replace('-', '')
        if first_word in SHADCN_COMPONENTS:
            return True, first_word
        # Check with hyphen variations
        for comp in SHADCN_COMPONENTS:
            if first_word == comp.replace('-', ''):
                return True, comp

    return False, None


def extract_lucide_icon_name(name: str) -> tuple[bool, Optional[str]]:
    """
    Extract Lucide icon name from instance name.

    Patterns:
        "Lucide Icons / plus" → "Plus"
        "Lucide Icons / chevron-down" → "ChevronDown"
        "lucide/arrow-right" → "ArrowRight"
        "Icon / search" → "Search" (generic icon pattern)

    Returns:
        (is_lucide, icon_name) - PascalCase icon name for lucide-react import
    """
    name_lower = name.lower().strip()

    # Pattern 1: "Lucide Icons / icon-name"
    lucide_pattern = r'lucide\s*icons?\s*/\s*(.+)'
    match = re.match(lucide_pattern, name_lower)
    if match:
        icon_name = match.group(1).strip()
        return True, to_pascal_case(icon_name)

    # Pattern 2: "lucide/icon-name" or "lucide-icon-name"
    if name_lower.startswith('lucide'):
        parts = re.split(r'[/\-_\s]+', name_lower)
        if len(parts) > 1:
            icon_name = '-'.join(parts[1:])
            return True, to_pascal_case(icon_name)

    # Pattern 3: Generic "Icon / name" or "Icons / name"
    icon_pattern = r'icons?\s*/\s*(.+)'
    match = re.match(icon_pattern, name_lower)
    if match:
        icon_name = match.group(1).strip()
        # Could be Lucide or other icon library
        return True, to_pascal_case(icon_name)

    return False, None


def to_pascal_case(name: str) -> str:
    """
    Convert icon name to PascalCase for lucide-react import.

    Examples:
        "chevron-down" → "ChevronDown"
        "arrow_right" → "ArrowRight"
        "plus" → "Plus"
        "ellipsis-vertical" → "EllipsisVertical"
    """
    # Split on common separators
    parts = re.split(r'[-_\s]+', name.strip())
    # Capitalize each part
    return ''.join(part.capitalize() for part in parts if part)


def parse_metadata_xml(xml_content: str, file_key: Optional[str] = None) -> dict:
    """
    Parse Figma metadata XML and extract instance information.

    Args:
        xml_content: XML string from get_metadata
        file_key: Optional Figma file key for URL generation

    Returns:
        Dictionary with categorized instances
    """
    # Wrap in root element if needed (metadata may be a fragment)
    if not xml_content.strip().startswith('<?xml') and not xml_content.strip().startswith('<root'):
        xml_content = f'<root>{xml_content}</root>'

    try:
        root = ET.fromstring(xml_content)
    except ET.ParseError as e:
        print(f"XML parse error: {e}")
        return {'error': str(e), 'instances': [], 'lucide_icons': {}, 'shadcn_components': {}, 'custom_instances': {}}

    instances = []
    lucide_icons = {}  # icon_name -> list of node_ids
    shadcn_components = {}  # component_name -> list of instances
    custom_instances = {}  # node_id -> instance info

    # Find all <instance> elements recursively
    for instance_elem in root.iter('instance'):
        node_id = instance_elem.get('id', '')
        name = instance_elem.get('name', '')

        info = InstanceInfo(
            node_id=node_id,
            name=name,
            x=int(instance_elem.get('x', 0)),
            y=int(instance_elem.get('y', 0)),
            width=int(instance_elem.get('width', 0)),
            height=int(instance_elem.get('height', 0)),
            hidden=instance_elem.get('hidden', 'false').lower() == 'true',
        )

        # Check if it's a Lucide icon
        is_lucide, icon_name = extract_lucide_icon_name(name)
        if is_lucide and icon_name:
            info.is_lucide_icon = True
            info.lucide_icon_name = icon_name
            if icon_name not in lucide_icons:
                lucide_icons[icon_name] = []
            lucide_icons[icon_name].append(node_id)

        # Check if it's a shadcn component
        is_shadcn, comp_name = is_shadcn_component(name)
        if is_shadcn and comp_name:
            info.is_shadcn = True
            info.shadcn_component = comp_name
            if comp_name not in shadcn_components:
                shadcn_components[comp_name] = []
            shadcn_components[comp_name].append(asdict(info))

        # If not shadcn and not lucide, it's a custom component
        if not is_shadcn and not is_lucide:
            if file_key:
                info.figma_url = f"https://www.figma.com/design/{file_key}/?node-id={node_id.replace(':', '-')}"
            custom_instances[node_id] = asdict(info)

        instances.append(asdict(info))

    return {
        'total_instances': len(instances),
        'lucide_icons': {
            'count': len(lucide_icons),
            'icons': lucide_icons,
            'import_statement': generate_lucide_import(lucide_icons),
        },
        'shadcn_components': {
            'count': len(shadcn_components),
            'components': {k: len(v) for k, v in shadcn_components.items()},
        },
        'custom_instances': {
            'count': len(custom_instances),
            'instances': custom_instances,
        },
        'all_instances': instances,
    }


def generate_lucide_import(lucide_icons: dict) -> str:
    """Generate the lucide-react import statement."""
    if not lucide_icons:
        return ''

    icon_names = sorted(lucide_icons.keys())
    if len(icon_names) <= 5:
        return f"import {{ {', '.join(icon_names)} }} from 'lucide-react';"
    else:
        icons_str = ',\n  '.join(icon_names)
        return f"import {{\n  {icons_str}\n}} from 'lucide-react';"


def format_xml_output(xml_content: str) -> str:
    """
    Format XML for better readability with proper indentation.
    """
    # Wrap if needed
    if not xml_content.strip().startswith('<?xml') and not xml_content.strip().startswith('<root'):
        xml_content = f'<root>{xml_content}</root>'

    try:
        root = ET.fromstring(xml_content)
    except ET.ParseError:
        return xml_content  # Return as-is if can't parse

    # Custom pretty print that preserves attributes nicely
    def format_element(elem, level=0):
        indent = '  ' * level
        lines = []

        # Build opening tag with attributes
        tag_parts = [elem.tag]
        for key, value in elem.attrib.items():
            tag_parts.append(f'{key}="{value}"')

        if len(elem) == 0:  # No children
            lines.append(f"{indent}<{' '.join(tag_parts)} />")
        else:
            lines.append(f"{indent}<{' '.join(tag_parts)}>")
            for child in elem:
                lines.extend(format_element(child, level + 1))
            lines.append(f"{indent}</{elem.tag}>")

        return lines

    # Skip the wrapper root if we added it
    if root.tag == 'root' and len(root) == 1:
        result = format_element(root[0])
    else:
        result = format_element(root)

    return '\n'.join(result)


def main():
    if len(sys.argv) < 3:
        print("Usage: python extract_instances_from_metadata.py <metadata.xml> <output_dir> [file_key]")
        print("")
        print("Extracts true <instance> nodes from Figma metadata XML.")
        print("Categorizes into: Lucide icons, shadcn components, custom instances.")
        sys.exit(1)

    input_path = sys.argv[1]
    output_dir = sys.argv[2]
    file_key = sys.argv[3] if len(sys.argv) > 3 else None

    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    # Read XML content
    with open(input_path, 'r', encoding='utf-8') as f:
        xml_content = f.read()

    # Parse and extract instances
    result = parse_metadata_xml(xml_content, file_key)

    # Save formatted XML
    formatted_xml = format_xml_output(xml_content)
    xml_output_path = output_dir / 'metadata-formatted.xml'
    with open(xml_output_path, 'w', encoding='utf-8') as f:
        f.write(formatted_xml)

    # Save instance data
    instances_path = output_dir / 'instances.json'
    with open(instances_path, 'w', encoding='utf-8') as f:
        json.dump(result, f, indent=2)

    # Print summary
    print(f"\n{'='*60}")
    print("INSTANCE ANALYSIS (from metadata XML)")
    print(f"{'='*60}")
    print(f"Total <instance> nodes: {result['total_instances']}")
    print("")

    # Lucide Icons
    lucide = result['lucide_icons']
    print(f"LUCIDE ICONS: {lucide['count']} unique icons")
    if lucide['icons']:
        for icon, node_ids in sorted(lucide['icons'].items()):
            print(f"  - {icon} ({len(node_ids)} uses)")
        print("")
        print("Import statement:")
        print(f"  {lucide['import_statement']}")
    print("")

    # Shadcn Components
    shadcn = result['shadcn_components']
    print(f"SHADCN COMPONENTS: {shadcn['count']} types (no Figma URL needed)")
    if shadcn['components']:
        for comp, count in sorted(shadcn['components'].items()):
            print(f"  - {comp} ({count} instances)")
    print("")

    # Custom Instances
    custom = result['custom_instances']
    print(f"CUSTOM INSTANCES: {custom['count']} (may need extraction)")
    if custom['instances']:
        for node_id, info in list(custom['instances'].items())[:10]:
            print(f"  [{node_id}] {info['name']}")
            if info.get('figma_url'):
                print(f"      {info['figma_url']}")
        if custom['count'] > 10:
            print(f"  ... and {custom['count'] - 10} more")
    print("")

    print(f"Files saved:")
    print(f"  - {xml_output_path}")
    print(f"  - {instances_path}")


if __name__ == '__main__':
    main()
