#!/usr/bin/env python3
"""
Process Figma design context and create clean React/Tailwind output.

Usage:
    python process_figma_code.py <design_context.json> <variables.json> <output.tsx> [options]

Options:
    --figma-url URL     Source Figma URL for header comment
    --node-id ID        Node ID for header comment
    --strip-assets      Remove asset URL constants from output
    --component NAME    Component name for header

Example:
    python process_figma_code.py \\
        ./figma-output/design-context.json \\
        ./figma-output/variables.json \\
        ./figma-output/Sidebar.tsx \\
        --figma-url "https://figma.com/design/abc/File?node-id=1-2" \\
        --strip-assets \\
        --component "Sidebar"
"""

import json
import re
import sys
import argparse
from pathlib import Path
from datetime import datetime


def extract_code_from_response(data) -> str:
    """Extract code text from MCP response format.

    Only extracts the first text item, which contains the actual code.
    Subsequent items are Figma MCP metadata/instructions that should be ignored.
    """
    # Handle different formats
    content = []

    if isinstance(data, list):
        # Direct array format: [{type: 'text', text: '...'}]
        content = data
    elif isinstance(data, dict):
        # Nested format: {result: {content: [...]}}
        content = data.get('result', {}).get('content', [])
        if not content:
            content = data.get('content', [])

    # Only return the first text item (the actual code)
    # Subsequent items are metadata/instructions from Figma MCP
    if content:
        first_item = content[0]
        if isinstance(first_item, dict) and first_item.get('type') == 'text':
            return first_item.get('text', '')
        elif isinstance(first_item, str):
            return first_item

    return ''


def strip_asset_constants(code: str) -> str:
    """Remove asset URL constant declarations from code."""
    # Pattern: const img* = "https://www.figma.com/api/mcp/asset/...";
    pattern = r'^const\s+img\w*\s*=\s*"https://www\.figma\.com/api/mcp/asset/[^"]+"\s*;?\s*\n?'
    code = re.sub(pattern, '', code, flags=re.MULTILINE)

    # Also remove the variable usages (replace with placeholder)
    # Pattern: src={img} or src={img1} etc
    code = re.sub(r'src=\{img\w*\}', 'src=""', code)

    return code


def generate_header(
    figma_url: str = None,
    node_id: str = None,
    component_name: str = None
) -> str:
    """Generate minimal header comment block with source metadata."""
    lines = ['/**', ' * Generated from Figma']

    if figma_url:
        lines.append(f' * Source: {figma_url}')
    if node_id:
        lines.append(f' * Node: {node_id}')
    if component_name:
        lines.append(f' * Component: {component_name}')

    lines.append(f' * Generated: {datetime.now().strftime("%Y-%m-%d %H:%M")}')

    lines.append(' */')
    lines.append('')

    return '\n'.join(lines)


def process_figma_code(
    design_context_path: str,
    variables_path: str,
    output_path: str,
    figma_url: str = None,
    node_id: str = None,
    component_name: str = None,
    strip_assets: bool = False
) -> dict:
    """Process design context and create clean output file."""

    # Read design context
    with open(design_context_path, 'r', encoding='utf-8', errors='ignore') as f:
        design_data = json.load(f)

    # Read variables
    variables = {}
    if Path(variables_path).exists():
        with open(variables_path, 'r', encoding='utf-8') as f:
            variables = json.load(f)

    # Extract code
    code = extract_code_from_response(design_data)

    if not code:
        raise ValueError("No code content found in design context")

    # Strip assets if requested
    if strip_assets:
        code = strip_asset_constants(code)

    # Try to detect component name from code if not provided
    if not component_name:
        # First try to find export default function (the main component)
        match = re.search(r'export\s+default\s+function\s+([A-Z][a-zA-Z0-9]*)', code)
        if not match:
            # Fallback to first capitalized function
            match = re.search(r'function\s+([A-Z][a-zA-Z0-9]*)', code)
        if match:
            component_name = match.group(1)

    # Generate header
    header = generate_header(
        figma_url=figma_url,
        node_id=node_id,
        component_name=component_name
    )

    # Combine header and code
    output = header + code

    # Write output
    output_path = Path(output_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(output)

    # Return summary
    return {
        'output_path': str(output_path),
        'component_name': component_name,
        'code_size': len(code),
        'variables_count': len(variables),
        'assets_stripped': strip_assets
    }


def main():
    parser = argparse.ArgumentParser(
        description='Process Figma design context and create clean React/Tailwind output'
    )
    parser.add_argument('design_context', help='Path to design context JSON file')
    parser.add_argument('variables', help='Path to variables JSON file')
    parser.add_argument('output', help='Output .tsx file path')
    parser.add_argument('--figma-url', help='Source Figma URL for header')
    parser.add_argument('--node-id', help='Node ID for header')
    parser.add_argument('--component', help='Component name for header')
    parser.add_argument('--strip-assets', action='store_true',
                        help='Remove asset URL constants from output')

    args = parser.parse_args()

    try:
        result = process_figma_code(
            design_context_path=args.design_context,
            variables_path=args.variables,
            output_path=args.output,
            figma_url=args.figma_url,
            node_id=args.node_id,
            component_name=args.component,
            strip_assets=args.strip_assets
        )

        print(f"Output saved to: {result['output_path']}")
        print(f"  Component: {result['component_name'] or 'Unknown'}")
        print(f"  Code size: {result['code_size']:,} characters")
        print(f"  Variables: {result['variables_count']}")
        if result['assets_stripped']:
            print(f"  Assets: stripped")

    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main()
