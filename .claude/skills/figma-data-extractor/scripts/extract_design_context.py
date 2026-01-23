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


def process_design_context(input_path: str, output_dir: str) -> dict:
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

    return result


def main():
    if len(sys.argv) < 3:
        print("Usage: python extract_design_context.py <input_json> <output_dir>")
        print("Example: python extract_design_context.py design-context.json ./output")
        sys.exit(1)

    input_path = sys.argv[1]
    output_dir = sys.argv[2]

    if not os.path.exists(input_path):
        print(f"Error: Input file not found: {input_path}")
        sys.exit(1)

    result = process_design_context(input_path, output_dir)

    print(f"Processed: {result['input_file']}")
    print(f"Code size: {result['code_size']} characters")
    print(f"Assets found: {result.get('asset_count', 0)}")
    print(f"Components: {', '.join(result.get('components', []))}")
    print(f"Files created: {len(result['files_created'])}")
    for f in result['files_created']:
        print(f"  - {f}")


if __name__ == '__main__':
    main()
