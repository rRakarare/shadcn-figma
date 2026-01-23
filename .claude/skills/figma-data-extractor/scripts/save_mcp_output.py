#!/usr/bin/env python3
"""
Save and organize Figma MCP tool outputs.

This script handles the complete workflow of saving MCP outputs:
1. Copies the large tool output file to a target directory
2. Extracts code and assets
3. Creates a summary README

Usage:
    python save_mcp_output.py <source_json> <output_dir> [--component-name NAME]

Example:
    python save_mcp_output.py /path/to/mcp-output.txt ./figma-data --component-name Sidebar
"""

import json
import sys
import os
import shutil
import re
from pathlib import Path
from datetime import datetime


def create_readme(output_dir: Path, metadata: dict) -> None:
    """Create a README.md summarizing the extracted data."""
    readme_path = output_dir / 'README.md'

    content = f"""# Figma Component: {metadata.get('component_name', 'Unknown')}

## Source Information
- **Extracted**: {metadata.get('timestamp', 'Unknown')}
- **Node ID**: {metadata.get('node_id', 'Unknown')}
- **File Key**: {metadata.get('file_key', 'Unknown')}

## Files

| File | Description |
|------|-------------|
| `design-context.json` | Raw MCP tool output |
| `generated-code.tsx` | Extracted React/Tailwind code |
| `assets/` | Downloaded image assets |
| `assets/asset-urls.txt` | List of asset URLs |

## Statistics
- **Code size**: {metadata.get('code_size', 0):,} characters
- **Assets found**: {metadata.get('asset_count', 0)}
- **Components**: {', '.join(metadata.get('components', ['Unknown']))}

## Usage

To use the generated code:

1. Copy `generated-code.tsx` to your project
2. Download assets using: `python download_assets.py assets/asset-urls.txt ./public/assets`
3. Update asset paths in the code to match your project structure
"""

    with open(readme_path, 'w', encoding='utf-8') as f:
        f.write(content)


def extract_components_list(text: str) -> list[str]:
    """Extract component names from code."""
    pattern = r'function\s+([A-Z][a-zA-Z0-9]*)\s*\('
    matches = re.findall(pattern, text)
    return list(set(matches))


def save_mcp_output(
    source_path: str,
    output_dir: str,
    component_name: str = None,
    node_id: str = None,
    file_key: str = None
) -> dict:
    """
    Save and organize MCP output.

    Returns metadata about the saved files.
    """
    source = Path(source_path)
    output = Path(output_dir)
    output.mkdir(parents=True, exist_ok=True)

    # Copy source file
    dest_json = output / 'design-context.json'
    shutil.copy2(source, dest_json)

    # Read and parse
    with open(source, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # Extract text content
    if isinstance(data, list) and len(data) > 0:
        text = data[0].get('text', '')
    elif isinstance(data, dict):
        text = data.get('text', '') or data.get('code', '')
    else:
        text = str(data)

    # Save extracted code
    code_path = output / 'generated-code.tsx'
    with open(code_path, 'w', encoding='utf-8') as f:
        f.write(text)

    # Extract and save asset URLs
    asset_pattern = r'https://www\.figma\.com/api/mcp/asset/[a-f0-9-]+'
    asset_urls = list(set(re.findall(asset_pattern, text)))

    assets_dir = output / 'assets'
    assets_dir.mkdir(exist_ok=True)

    urls_path = assets_dir / 'asset-urls.txt'
    with open(urls_path, 'w', encoding='utf-8') as f:
        for url in asset_urls:
            f.write(url + '\n')

    # Extract component names
    components = extract_components_list(text)

    # Determine component name
    if not component_name and components:
        component_name = components[0]
    elif not component_name:
        component_name = 'Unknown'

    # Build metadata
    metadata = {
        'component_name': component_name,
        'timestamp': datetime.now().isoformat(),
        'node_id': node_id or 'Unknown',
        'file_key': file_key or 'Unknown',
        'code_size': len(text),
        'asset_count': len(asset_urls),
        'components': components
    }

    # Save metadata
    meta_path = output / 'metadata.json'
    with open(meta_path, 'w', encoding='utf-8') as f:
        json.dump(metadata, f, indent=2)

    # Create README
    create_readme(output, metadata)

    return metadata


def main():
    import argparse

    parser = argparse.ArgumentParser(
        description='Save and organize Figma MCP tool outputs'
    )
    parser.add_argument('source', help='Source JSON file from MCP tool output')
    parser.add_argument('output_dir', help='Output directory for extracted files')
    parser.add_argument('--component-name', help='Name of the component')
    parser.add_argument('--node-id', help='Figma node ID')
    parser.add_argument('--file-key', help='Figma file key')

    args = parser.parse_args()

    if not os.path.exists(args.source):
        print(f"Error: Source file not found: {args.source}")
        sys.exit(1)

    metadata = save_mcp_output(
        args.source,
        args.output_dir,
        component_name=args.component_name,
        node_id=args.node_id,
        file_key=args.file_key
    )

    print(f"Saved MCP output to: {args.output_dir}")
    print(f"Component: {metadata['component_name']}")
    print(f"Code size: {metadata['code_size']:,} characters")
    print(f"Assets: {metadata['asset_count']}")
    print(f"Components found: {', '.join(metadata['components'])}")


if __name__ == '__main__':
    main()
