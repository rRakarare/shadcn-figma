#!/usr/bin/env python3
"""
Find all custom component instances (non-library) in a Figma component.

Usage:
    python find_custom_instances.py <file_key> <node_id>

Example:
    python find_custom_instances.py abc123 2143:31510

Requires FIGMA_ACCESS_TOKEN environment variable.
"""

import json
import os
import sys
import urllib.request
import urllib.error
import urllib.parse
from pathlib import Path
from typing import Any, Dict, Set, Tuple


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


def get_token() -> str:
    """Get Figma access token from environment."""
    load_env_file()
    token = os.environ.get("FIGMA_ACCESS_TOKEN")
    if not token:
        raise ValueError(
            "FIGMA_ACCESS_TOKEN environment variable not set.\n"
            "Get your token at: https://www.figma.com/developers/api#access-tokens"
        )
    return token


def fetch_node_tree(file_key: str, node_id: str, token: str) -> Dict[str, Any]:
    """Fetch the full node tree from Figma REST API."""
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


def fetch_component_metadata(file_key: str, token: str) -> Dict[str, Dict[str, Any]]:
    """
    Fetch component metadata from Figma REST API.
    Returns a mapping of componentId -> {name, remote, key, componentSetId}.
    """
    url = f"https://api.figma.com/v1/files/{file_key}"

    req = urllib.request.Request(url)
    req.add_header("X-Figma-Token", token)

    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode("utf-8"))

            components_map = {}
            for comp_id, comp_data in data.get("components", {}).items():
                components_map[comp_id] = {
                    "name": comp_data.get("name", ""),
                    "remote": comp_data.get("remote", False),
                    "key": comp_data.get("key", ""),
                    "componentSetId": comp_data.get("componentSetId", ""),
                }

            # Also get component set names
            for set_id, set_data in data.get("componentSets", {}).items():
                if set_id not in components_map:
                    components_map[set_id] = {
                        "name": set_data.get("name", ""),
                        "remote": set_data.get("remote", False),
                        "key": set_data.get("key", ""),
                        "componentSetId": "",
                    }

            return components_map
    except urllib.error.HTTPError as e:
        raise Exception(f"Figma API error: {e.code} - {e.read().decode('utf-8')}")


def find_custom_instances(
    node: Dict[str, Any],
    components_map: Dict[str, Dict[str, Any]],
    found: Dict[str, Dict[str, Any]]
) -> None:
    """
    Recursively find all custom (non-library) instances in a node tree.

    Args:
        node: The Figma node to search
        components_map: Map of componentId -> component metadata
        found: Dict to accumulate found custom instances (componentId -> info)
    """
    node_type = node.get("type", "")

    if node_type == "INSTANCE":
        component_id = node.get("componentId", "")

        if component_id and component_id in components_map:
            comp_info = components_map[component_id]
            is_remote = comp_info.get("remote", False)

            if not is_remote:
                # This is a custom/local instance
                component_set_id = comp_info.get("componentSetId", "")

                # Use componentSetId for the URL if available (top-level component set)
                target_id = component_set_id if component_set_id else component_id

                # Get the name - prefer component set name if available
                if component_set_id and component_set_id in components_map:
                    name = components_map[component_set_id].get("name", comp_info.get("name", "Unknown"))
                else:
                    name = comp_info.get("name", "Unknown")

                # Only add if we haven't seen this target_id before
                if target_id not in found:
                    found[target_id] = {
                        "name": name,
                        "componentId": component_id,
                        "componentSetId": component_set_id,
                        "targetId": target_id,
                    }

    # Recurse into children
    for child in node.get("children", []):
        find_custom_instances(child, components_map, found)


def format_node_id_for_url(node_id: str) -> str:
    """Convert node ID from X:Y format to X-Y format for URL."""
    return node_id.replace(":", "-")


def build_figma_url(file_key: str, node_id: str) -> str:
    """Build a Figma URL for a given file key and node ID."""
    formatted_id = format_node_id_for_url(node_id)
    return f"https://www.figma.com/design/{file_key}/?node-id={formatted_id}"


def main():
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(1)

    file_key = sys.argv[1]
    node_id = sys.argv[2].replace("-", ":")

    try:
        token = get_token()
    except ValueError as e:
        print(f"Error: {e}")
        sys.exit(1)

    # Fetch component metadata
    print("Fetching component metadata...")
    try:
        components_map = fetch_component_metadata(file_key, token)
    except Exception as e:
        print(f"Error fetching component metadata: {e}")
        sys.exit(1)

    # Fetch node tree
    print("Fetching node tree...")
    try:
        response = fetch_node_tree(file_key, node_id, token)
    except Exception as e:
        print(f"Error fetching node tree: {e}")
        sys.exit(1)

    nodes = response.get("nodes", {})
    node_key = node_id.replace("-", ":")

    if node_key not in nodes:
        print(f"Error: Node {node_key} not found in response")
        sys.exit(1)

    node_data = nodes[node_key]
    document = node_data.get("document", {})
    root_name = document.get("name", "Unknown")

    # Find all custom instances
    found_instances: Dict[str, Dict[str, Any]] = {}
    find_custom_instances(document, components_map, found_instances)

    # Print results
    print()
    print("=" * 60)
    print("CUSTOM COMPONENT INSTANCES")
    print("=" * 60)
    print()
    print("Input Component:")
    print(f"  Name: {root_name}")
    print(f"  URL: {build_figma_url(file_key, node_id)}")
    print()

    if found_instances:
        print(f"Custom Instances Found ({len(found_instances)}):")
        for i, (target_id, info) in enumerate(sorted(found_instances.items(), key=lambda x: x[1]["name"]), 1):
            print(f"  {i}. {info['name']}")
            print(f"     URL: {build_figma_url(file_key, target_id)}")
    else:
        print("No custom instances found.")
        print("(All instances are from external libraries like shadcn/ui or Lucide icons)")

    print()


if __name__ == "__main__":
    main()
