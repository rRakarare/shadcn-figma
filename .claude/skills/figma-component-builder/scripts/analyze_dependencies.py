#!/usr/bin/env python3
"""
Analyze component dependencies and determine build order.

Takes the root component and discovers all custom instances, then builds
a dependency graph to determine which components can be built in parallel.

Usage:
    python analyze_dependencies.py <file_key> <root_node_id> [--output FILE]

Example:
    python analyze_dependencies.py p47Lwdw7tC0AaAT1ynftyS 2143:31510 --output deps.json

Requires FIGMA_ACCESS_TOKEN environment variable.
"""

import json
import os
import sys
import argparse
import urllib.request
import urllib.error
import urllib.parse
from pathlib import Path
from typing import Any, Dict, List, Set
from collections import defaultdict


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


def format_node_id_for_url(node_id: str) -> str:
    """Convert node ID from X:Y format to X-Y format for URL."""
    return node_id.replace(":", "-")


def build_figma_url(file_key: str, node_id: str) -> str:
    """Build a Figma URL for a given file key and node ID."""
    formatted_id = format_node_id_for_url(node_id)
    return f"https://www.figma.com/design/{file_key}/?node-id={formatted_id}"


def find_custom_instances_in_tree(
    node: Dict[str, Any],
    components_map: Dict[str, Dict[str, Any]],
) -> Dict[str, Dict[str, Any]]:
    """
    Find all custom (non-library) instances in a node tree.
    Returns a dict of targetId -> {name, componentId, componentSetId, targetId}.
    """
    found: Dict[str, Dict[str, Any]] = {}

    def recurse(n: Dict[str, Any]):
        node_type = n.get("type", "")

        if node_type == "INSTANCE":
            component_id = n.get("componentId", "")

            if component_id and component_id in components_map:
                comp_info = components_map[component_id]
                is_remote = comp_info.get("remote", False)

                if not is_remote:
                    component_set_id = comp_info.get("componentSetId", "")
                    target_id = component_set_id if component_set_id else component_id

                    if component_set_id and component_set_id in components_map:
                        name = components_map[component_set_id].get("name", comp_info.get("name", "Unknown"))
                    else:
                        name = comp_info.get("name", "Unknown")

                    if target_id not in found:
                        found[target_id] = {
                            "name": name,
                            "componentId": component_id,
                            "componentSetId": component_set_id,
                            "targetId": target_id,
                        }

        for child in n.get("children", []):
            recurse(child)

    recurse(node)
    return found


def find_direct_dependencies(
    node: Dict[str, Any],
    components_map: Dict[str, Dict[str, Any]],
    all_custom_ids: Set[str]
) -> Set[str]:
    """
    Find direct custom component dependencies within a node.
    Only counts immediate children, not nested grandchildren.
    """
    dependencies = set()

    def recurse(n: Dict[str, Any]):
        node_type = n.get("type", "")

        if node_type == "INSTANCE":
            component_id = n.get("componentId", "")

            if component_id and component_id in components_map:
                comp_info = components_map[component_id]
                is_remote = comp_info.get("remote", False)

                if not is_remote:
                    component_set_id = comp_info.get("componentSetId", "")
                    target_id = component_set_id if component_set_id else component_id

                    if target_id in all_custom_ids:
                        dependencies.add(target_id)
                        # Don't recurse into this instance - its children are its own deps
                        return

        for child in n.get("children", []):
            recurse(child)

    # Start recursion from children (skip the root itself)
    for child in node.get("children", []):
        recurse(child)

    return dependencies


def topological_sort_waves(
    components: Dict[str, Dict[str, Any]]
) -> List[List[str]]:
    """
    Perform topological sort and group into waves.
    Wave 0 = components with no dependencies (leaves)
    Wave N = components whose dependencies are all in waves < N
    """
    in_degree = defaultdict(int)
    dependents = defaultdict(list)

    for comp_id, info in components.items():
        deps = info.get("depends_on", [])
        in_degree[comp_id] = len(deps)
        for dep in deps:
            dependents[dep].append(comp_id)

    waves = []
    remaining = set(components.keys())

    while remaining:
        wave = [comp_id for comp_id in remaining if in_degree[comp_id] == 0]

        if not wave:
            raise ValueError(f"Circular dependency detected among: {remaining}")

        waves.append(wave)

        for comp_id in wave:
            remaining.remove(comp_id)
            for dependent in dependents[comp_id]:
                in_degree[dependent] -= 1

    return waves


def analyze_dependencies(file_key: str, root_node_id: str, token: str) -> Dict[str, Any]:
    """
    Analyze all custom components and their dependencies.

    Returns:
        {
            "root": {"node_id": "...", "name": "...", "figma_url": "..."},
            "components": {
                "node_id": {
                    "name": "...",
                    "figma_url": "...",
                    "depends_on": [...],
                    "depended_by": [...]
                }
            },
            "build_waves": [[...], [...], ...]
        }
    """
    # Fetch component metadata
    print("Fetching component metadata...", file=sys.stderr)
    components_map = fetch_component_metadata(file_key, token)

    # Fetch root node tree
    print("Fetching root node tree...", file=sys.stderr)
    response = fetch_node_tree(file_key, root_node_id, token)
    nodes = response.get("nodes", {})
    node_key = root_node_id.replace("-", ":")

    if node_key not in nodes:
        raise ValueError(f"Node {node_key} not found in response")

    node_data = nodes[node_key]
    document = node_data.get("document", {})
    root_name = document.get("name", "Unknown")

    # Find all custom instances in root
    found_instances = find_custom_instances_in_tree(document, components_map)
    print(f"Found {len(found_instances)} custom instance(s)", file=sys.stderr)

    # Build components dict
    components = {}

    # Add root component
    root_deps = find_direct_dependencies(document, components_map, set(found_instances.keys()))
    components[node_key] = {
        "name": root_name,
        "figma_url": build_figma_url(file_key, node_key),
        "depends_on": list(root_deps),
        "depended_by": [],
    }

    # For each custom instance, fetch its node tree to find its dependencies
    for i, (target_id, info) in enumerate(found_instances.items()):
        print(f"Analyzing {info['name']} ({i+1}/{len(found_instances)})...", file=sys.stderr)
        try:
            comp_response = fetch_node_tree(file_key, target_id, token)
            comp_nodes = comp_response.get("nodes", {})
            comp_key = target_id.replace("-", ":")

            if comp_key in comp_nodes:
                comp_doc = comp_nodes[comp_key].get("document", {})
                deps = find_direct_dependencies(comp_doc, components_map, set(found_instances.keys()))
                deps.discard(target_id)
            else:
                deps = set()
        except Exception as e:
            print(f"  Warning: Could not fetch {info['name']}: {e}", file=sys.stderr)
            deps = set()

        components[target_id] = {
            "name": info["name"],
            "figma_url": build_figma_url(file_key, target_id),
            "depends_on": list(deps),
            "depended_by": [],
        }

    # Build depended_by (reverse mapping)
    for comp_id, info in components.items():
        for dep_id in info["depends_on"]:
            if dep_id in components:
                components[dep_id]["depended_by"].append(comp_id)

    # Calculate build waves
    waves = topological_sort_waves(components)

    return {
        "root": {
            "node_id": node_key,
            "name": root_name,
            "figma_url": build_figma_url(file_key, node_key),
        },
        "components": components,
        "build_waves": waves,
    }


def main():
    parser = argparse.ArgumentParser(
        description="Analyze Figma component dependencies and determine build order"
    )
    parser.add_argument("file_key", help="Figma file key")
    parser.add_argument("root_node_id", help="Root node ID (e.g., 2143:31510 or 2143-31510)")
    parser.add_argument("--output", "-o", help="Output JSON file (default: stdout)")

    args = parser.parse_args()

    try:
        token = get_token()
    except ValueError as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)

    try:
        result = analyze_dependencies(args.file_key, args.root_node_id, token)
    except Exception as e:
        print(f"Error analyzing dependencies: {e}", file=sys.stderr)
        sys.exit(1)

    # Output JSON
    output_json = json.dumps(result, indent=2)

    if args.output:
        output_path = Path(args.output)
        output_path.parent.mkdir(parents=True, exist_ok=True)
        with open(output_path, 'w') as f:
            f.write(output_json)
        print(f"Dependencies written to: {args.output}", file=sys.stderr)
    else:
        print(output_json)

    # Print summary
    print("\n" + "=" * 60, file=sys.stderr)
    print("DEPENDENCY ANALYSIS SUMMARY", file=sys.stderr)
    print("=" * 60, file=sys.stderr)
    print(f"\nRoot: {result['root']['name']}", file=sys.stderr)
    print(f"Total components: {len(result['components'])}", file=sys.stderr)
    print(f"Build waves: {len(result['build_waves'])}", file=sys.stderr)

    for i, wave in enumerate(result['build_waves']):
        names = [result['components'][cid]['name'] for cid in wave]
        print(f"\n  Wave {i}: {', '.join(names)}", file=sys.stderr)
        for cid in wave:
            comp = result['components'][cid]
            if comp['depends_on']:
                dep_names = [result['components'].get(d, {}).get('name', d) for d in comp['depends_on']]
                print(f"    - {comp['name']} depends on: {', '.join(dep_names)}", file=sys.stderr)

    print(file=sys.stderr)


if __name__ == "__main__":
    main()
