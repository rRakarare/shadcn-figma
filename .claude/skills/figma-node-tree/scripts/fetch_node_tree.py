#!/usr/bin/env python3
"""
Fetch node tree from Figma REST API as XML.

Usage:
    python fetch_node_tree.py <file_key> <node_id> <output_path.xml>

Example:
    python fetch_node_tree.py abc123 2143:31510 ./output/node-tree.xml

Requires FIGMA_ACCESS_TOKEN environment variable.
"""

import json
import os
import sys
import urllib.request
import urllib.error
import urllib.parse
from pathlib import Path
from typing import Any, Dict


def load_env_file():
    """Try to load .env file from current directory or parent directories."""
    current = Path.cwd()
    for _ in range(5):
        env_file = current / '.env'
        if env_file.exists():
            with open(env_file) as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith('#') and '=' in line:
                        key, value = line.split('=', 1)
                        key = key.strip()
                        value = value.strip().strip('"').strip("'")
                        if key not in os.environ:
                            os.environ[key] = value
            return
        current = current.parent


def fetch_node_tree(file_key: str, node_id: str) -> Dict[str, Any]:
    """Fetch the full node tree from Figma REST API."""
    load_env_file()

    token = os.environ.get("FIGMA_ACCESS_TOKEN")
    if not token:
        raise ValueError(
            "FIGMA_ACCESS_TOKEN environment variable not set.\n"
            "Get your token at: https://www.figma.com/developers/api#access-tokens"
        )

    node_id = node_id.replace("-", ":")
    encoded_node_id = urllib.parse.quote(node_id, safe="")
    url = f"https://api.figma.com/v1/files/{file_key}/nodes?ids={encoded_node_id}"

    req = urllib.request.Request(url)
    req.add_header("X-Figma-Token", token)

    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode("utf-8"))
            return data
    except urllib.error.HTTPError as e:
        raise Exception(f"Figma API error: {e.code} - {e.read().decode('utf-8')}")


def escape_xml(text: str) -> str:
    """Escape special XML characters."""
    return (text
            .replace("&", "&amp;")
            .replace("<", "&lt;")
            .replace(">", "&gt;")
            .replace('"', "&quot;"))


def node_to_xml(node: Dict[str, Any], indent: int = 0) -> str:
    """Convert a Figma node to minimal XML format."""
    spaces = "  " * indent
    node_type = node.get("type", "UNKNOWN")
    node_id = node.get("id", "")
    node_name = escape_xml(node.get("name", ""))

    # Build minimal attributes
    attrs = f'id="{node_id}" name="{node_name}" type="{node_type}"'

    # Add componentId for instances (useful for mapping)
    component_id = node.get("componentId", "")
    if component_id:
        attrs += f' componentId="{component_id}"'

    children = node.get("children", [])

    if children:
        lines = [f"{spaces}<node {attrs}>"]
        for child in children:
            lines.append(node_to_xml(child, indent + 1))
        lines.append(f"{spaces}</node>")
        return "\n".join(lines)
    else:
        return f"{spaces}<node {attrs} />"


def count_nodes(node: Dict[str, Any]) -> Dict[str, int]:
    """Count nodes by type."""
    counts: Dict[str, int] = {}

    def count_recursive(n: Dict[str, Any]):
        node_type = n.get("type", "UNKNOWN")
        counts[node_type] = counts.get(node_type, 0) + 1
        for child in n.get("children", []):
            count_recursive(child)

    count_recursive(node)
    return counts


def main():
    if len(sys.argv) < 4:
        print(__doc__)
        sys.exit(1)

    file_key = sys.argv[1]
    node_id = sys.argv[2]
    output_path = sys.argv[3]

    print(f"Fetching node tree for {file_key}/{node_id}...")

    response = fetch_node_tree(file_key, node_id)

    nodes = response.get("nodes", {})
    node_key = node_id.replace("-", ":")

    if node_key not in nodes:
        print(f"Error: Node {node_key} not found in response")
        print(f"Available nodes: {list(nodes.keys())}")
        sys.exit(1)

    node_data = nodes[node_key]
    document = node_data.get("document", {})

    counts = count_nodes(document)
    total = sum(counts.values())

    print(f"\nNode tree fetched successfully!")
    print(f"Total nodes: {total}")
    print(f"\nBy type:")
    for node_type, count in sorted(counts.items(), key=lambda x: -x[1]):
        print(f"  {node_type}: {count}")

    os.makedirs(os.path.dirname(output_path) or ".", exist_ok=True)

    xml_output = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml_output += f'<!-- Figma Node Tree: {file_key}/{node_id} -->\n'
    xml_output += f'<!-- Total nodes: {total} -->\n'
    xml_output += node_to_xml(document)

    with open(output_path, "w", encoding="utf-8") as f:
        f.write(xml_output)

    print(f"\nOutput saved to: {output_path}")


if __name__ == "__main__":
    main()
