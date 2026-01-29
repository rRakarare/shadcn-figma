#!/usr/bin/env python3
"""
Insert placeholder comments for subcomponents in a React component file.

This script finds JSX elements that correspond to child custom components
and replaces them with placeholder comments that can be filled in later.

Usage:
    python insert_placeholders.py <component.tsx> --subcomponents <subcomponents.json>
    python insert_placeholders.py <component.tsx> --subcomponent-names "ProjectHeader,ProjectTag"

Example:
    python insert_placeholders.py ./components/Project.tsx --subcomponents subs.json

    # subs.json format:
    # [{"name": "ProjectHeader", "nodeId": "2138:21369"}, ...]

The script looks for patterns like:
    - data-node-id="2138:21369" in JSX
    - Component names matching the subcomponent names
    - Div wrappers containing the subcomponent content

Output:
    Modifies the file in place, replacing subcomponent JSX with:
    {/* @figma-placeholder name="ProjectHeader" nodeId="2138:21369" */}
"""

import argparse
import json
import re
import sys
from pathlib import Path
from typing import List, Dict, Any


def load_subcomponents(subcomponents_path: str) -> List[Dict[str, Any]]:
    """Load subcomponents list from JSON file."""
    with open(subcomponents_path, 'r') as f:
        return json.load(f)


def find_and_replace_by_node_id(code: str, subcomponents: List[Dict[str, Any]]) -> str:
    """
    Find JSX blocks with data-node-id matching subcomponents and replace with placeholders.
    """
    result = code

    for sub in subcomponents:
        node_id = sub.get("nodeId", "")
        name = sub.get("name", "Unknown")

        if not node_id:
            continue

        # Normalize node_id format
        node_id_colon = node_id.replace("-", ":")
        node_id_dash = node_id.replace(":", "-")

        for nid in [node_id_colon, node_id_dash]:
            # Try self-closing tags first
            self_closing_pattern = rf'<(\w+)[^>]*data-node-id="{re.escape(nid)}"[^>]*/>'

            match = re.search(self_closing_pattern, result)
            if match:
                placeholder = f'{{/* @figma-placeholder name="{name}" nodeId="{node_id_colon}" */}}'
                result = result[:match.start()] + placeholder + result[match.end():]
                continue

            # Try opening/closing tag pairs
            opening_pattern = rf'<(\w+)([^>]*data-node-id="{re.escape(nid)}"[^>]*)>'

            match = re.search(opening_pattern, result)
            if match:
                tag_name = match.group(1)
                start_pos = match.start()
                close_tag = f'</{tag_name}>'

                # Find matching closing tag with depth tracking
                search_start = match.end()
                depth = 1
                pos = search_start

                while depth > 0 and pos < len(result):
                    next_open = result.find(f'<{tag_name}', pos)
                    next_close = result.find(close_tag, pos)

                    if next_close == -1:
                        break

                    if next_open != -1 and next_open < next_close:
                        tag_end = result.find('>', next_open)
                        if tag_end != -1 and result[tag_end-1] == '/':
                            pos = tag_end + 1
                        else:
                            depth += 1
                            pos = tag_end + 1 if tag_end != -1 else next_open + 1
                    else:
                        depth -= 1
                        if depth == 0:
                            end_pos = next_close + len(close_tag)
                            placeholder = f'{{/* @figma-placeholder name="{name}" nodeId="{node_id_colon}" */}}'
                            result = result[:start_pos] + placeholder + result[end_pos:]
                            break
                        pos = next_close + len(close_tag)

    return result


def find_and_replace_by_name(code: str, subcomponents: List[Dict[str, Any]]) -> str:
    """
    Find JSX elements by component name and replace with placeholders.
    Fallback when node_id matching doesn't work.
    """
    result = code

    for sub in subcomponents:
        name = sub.get("name", "")
        node_id = sub.get("nodeId", "").replace("-", ":")

        if not name:
            continue

        # Convert name to PascalCase for JSX matching
        pascal_name = ''.join(word.capitalize() for word in re.split(r'[\s_-]+', name))
        placeholder = f'{{/* @figma-placeholder name="{name}" nodeId="{node_id}" */}}'

        # Self-closing component
        self_closing_pattern = rf'<{pascal_name}\s+[^>]*/>'
        result = re.sub(self_closing_pattern, placeholder, result)

        # Opening/closing component
        opening_pattern = rf'<{pascal_name}(\s+[^>]*)?>.*?</{pascal_name}>'
        result = re.sub(opening_pattern, placeholder, result, flags=re.DOTALL, count=1)

    return result


def insert_placeholders(
    component_path: str,
    subcomponents: List[Dict[str, Any]],
    in_place: bool = True
) -> str:
    """
    Insert placeholder comments for subcomponents.

    Args:
        component_path: Path to the component file
        subcomponents: List of {name, nodeId} dicts
        in_place: If True, modify file in place. If False, return modified code.

    Returns:
        Modified code string
    """
    with open(component_path, 'r', encoding='utf-8') as f:
        code = f.read()

    # First try to match by node_id (more precise)
    result = find_and_replace_by_node_id(code, subcomponents)

    # Check if any placeholders were inserted
    placeholders_inserted = result.count('@figma-placeholder')

    # If no placeholders from node_id matching, try name matching
    if placeholders_inserted < len(subcomponents):
        remaining = []
        for sub in subcomponents:
            node_id = sub.get("nodeId", "").replace("-", ":")
            if f'nodeId="{node_id}"' not in result:
                remaining.append(sub)

        if remaining:
            result = find_and_replace_by_name(result, remaining)

    if in_place:
        with open(component_path, 'w', encoding='utf-8') as f:
            f.write(result)

    return result


def main():
    parser = argparse.ArgumentParser(
        description="Insert placeholder comments for subcomponents in a React component"
    )
    parser.add_argument("component", help="Path to the component file")
    parser.add_argument(
        "--subcomponents", "-s",
        help="Path to JSON file with subcomponent list"
    )
    parser.add_argument(
        "--subcomponent-names", "-n",
        help="Comma-separated list of subcomponent names"
    )
    parser.add_argument(
        "--subcomponent-node-ids", "-i",
        help="Comma-separated list of subcomponent node IDs (pairs with --subcomponent-names)"
    )
    parser.add_argument(
        "--dry-run", "-d",
        action="store_true",
        help="Print modified code instead of writing to file"
    )

    args = parser.parse_args()

    # Load subcomponents
    subcomponents = []

    if args.subcomponents:
        subcomponents = load_subcomponents(args.subcomponents)
    elif args.subcomponent_names:
        names = [n.strip() for n in args.subcomponent_names.split(',')]
        node_ids = []
        if args.subcomponent_node_ids:
            node_ids = [n.strip() for n in args.subcomponent_node_ids.split(',')]

        for i, name in enumerate(names):
            node_id = node_ids[i] if i < len(node_ids) else ""
            subcomponents.append({"name": name, "nodeId": node_id})
    else:
        print("Error: Must provide --subcomponents or --subcomponent-names", file=sys.stderr)
        sys.exit(1)

    if not subcomponents:
        print("No subcomponents provided", file=sys.stderr)
        sys.exit(1)

    # Process
    result = insert_placeholders(
        args.component,
        subcomponents,
        in_place=not args.dry_run
    )

    if args.dry_run:
        print(result)
    else:
        placeholder_count = result.count('@figma-placeholder')
        print(f"Inserted {placeholder_count} placeholder(s) in {args.component}")

        for sub in subcomponents:
            name = sub.get("name", "Unknown")
            node_id = sub.get("nodeId", "")
            if f'name="{name}"' in result:
                print(f"  - {name} (nodeId: {node_id})")


if __name__ == "__main__":
    main()
