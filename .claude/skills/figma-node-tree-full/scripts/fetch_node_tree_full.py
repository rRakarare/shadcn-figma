#!/usr/bin/env python3
"""
Fetch comprehensive node tree from Figma REST API as XML.

Usage:
    python fetch_node_tree_full.py <file_key> <node_id> <output_path.xml>

Example:
    python fetch_node_tree_full.py abc123 2143:31510 ./output/node-tree-full.xml

Requires FIGMA_ACCESS_TOKEN environment variable.
"""

import json
import os
import sys
import urllib.request
import urllib.error
import urllib.parse
import subprocess
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


def fetch_variables(file_key: str) -> tuple[Dict[str, Dict[str, Any]], str]:
    """
    Fetch variable definitions from Figma REST API.
    Returns (variables_map, error_message).
    """
    load_env_file()

    token = os.environ.get("FIGMA_ACCESS_TOKEN")
    if not token:
        return {}, ""

    # Try the variables endpoint
    url = f"https://api.figma.com/v1/files/{file_key}/variables/local"

    req = urllib.request.Request(url)
    req.add_header("X-Figma-Token", token)

    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode("utf-8"))

            # Create a mapping of variable_id -> variable_name
            variables_map = {}
            for var_id, var_data in data.get("meta", {}).get("variables", {}).items():
                var_name = var_data.get("name", "")
                variables_map[var_id] = {
                    "name": var_name,
                    "type": var_data.get("resolvedType", ""),
                }

            return variables_map, ""
    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8')
        try:
            error_json = json.loads(error_body)
            error_msg = error_json.get("message", "")
            if "file_variables:read" in error_msg:
                return {}, "scope_missing"
        except:
            pass

        return {}, f"error_{e.code}"


def fetch_component_metadata(file_key: str) -> Dict[str, Dict[str, Any]]:
    """
    Fetch component metadata from Figma REST API.
    Returns a mapping of componentId -> {name, remote, key, componentSetId}.
    """
    load_env_file()

    token = os.environ.get("FIGMA_ACCESS_TOKEN")
    if not token:
        return {}

    url = f"https://api.figma.com/v1/files/{file_key}"

    req = urllib.request.Request(url)
    req.add_header("X-Figma-Token", token)

    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode("utf-8"))

            # Create a mapping of component_id -> component metadata
            components_map = {}
            for comp_id, comp_data in data.get("components", {}).items():
                components_map[comp_id] = {
                    "name": comp_data.get("name", ""),
                    "remote": comp_data.get("remote", False),
                    "key": comp_data.get("key", ""),
                    "componentSetId": comp_data.get("componentSetId", ""),
                }

            return components_map
    except urllib.error.HTTPError as e:
        return {}


def escape_xml(text: str) -> str:
    """Escape special XML characters."""
    return (text
            .replace("&", "&amp;")
            .replace("<", "&lt;")
            .replace(">", "&gt;")
            .replace('"', "&quot;"))


def format_color(color: Dict[str, Any]) -> str:
    """Format a color object to hex string."""
    r = int(color.get("r", 0) * 255)
    g = int(color.get("g", 0) * 255)
    b = int(color.get("b", 0) * 255)
    a = color.get("a", 1)
    if a < 1:
        return f"rgba({r},{g},{b},{a:.2f})"
    return f"#{r:02x}{g:02x}{b:02x}"


def get_fills_string(fills: list) -> str:
    """Convert fills array to readable string."""
    if not fills:
        return ""

    result = []
    for fill in fills:
        if fill.get("visible", True):
            fill_type = fill.get("type", "")
            if fill_type == "SOLID":
                color = fill.get("color", {})
                result.append(format_color(color))
            elif fill_type in ["GRADIENT_LINEAR", "GRADIENT_RADIAL", "GRADIENT_ANGULAR"]:
                result.append(fill_type.lower())
            elif fill_type == "IMAGE":
                result.append("image")

    return ", ".join(result) if result else ""


def get_strokes_string(strokes: list, stroke_weight: float = 0) -> str:
    """Convert strokes array to readable string."""
    if not strokes or stroke_weight == 0:
        return ""

    colors = []
    for stroke in strokes:
        if stroke.get("visible", True) and stroke.get("type") == "SOLID":
            color = stroke.get("color", {})
            colors.append(format_color(color))

    if colors:
        return f"{stroke_weight}px {colors[0]}"
    return ""


def get_text_style(node: Dict[str, Any]) -> str:
    """Extract text styling information."""
    style = node.get("style", {})
    parts = []

    font_family = style.get("fontFamily")
    if font_family:
        parts.append(f"font:{font_family}")

    font_size = style.get("fontSize")
    if font_size:
        parts.append(f"size:{font_size}")

    font_weight = style.get("fontWeight")
    if font_weight:
        parts.append(f"weight:{font_weight}")

    line_height = style.get("lineHeightPx")
    if line_height:
        parts.append(f"lineHeight:{line_height}")

    letter_spacing = style.get("letterSpacing")
    if letter_spacing:
        parts.append(f"letterSpacing:{letter_spacing}")

    text_align_h = style.get("textAlignHorizontal")
    if text_align_h and text_align_h != "LEFT":
        parts.append(f"alignH:{text_align_h.lower()}")

    text_align_v = style.get("textAlignVertical")
    if text_align_v and text_align_v != "TOP":
        parts.append(f"alignV:{text_align_v.lower()}")

    return "; ".join(parts) if parts else ""


# Type to shorthand element mapping
TYPE_SHORTHAND = {
    "COMPONENT_SET": "cs",
    "COMPONENT": "c",
    "INSTANCE": "i",
    "FRAME": "f",
    "TEXT": "t",
    "RECTANGLE": "r",
    "VECTOR": "v",
    "BOOLEAN_OPERATION": "bo",
    "LINE": "ln",
    "GROUP": "g",
    "ELLIPSE": "e",
}


def format_number(value: float) -> str:
    """Format number: remove .0 suffix for integers."""
    if value == int(value):
        return str(int(value))
    return f"{value:.1f}".rstrip('0').rstrip('.')


def node_to_xml(node: Dict[str, Any], variables_map: Dict[str, Dict[str, Any]], components_map: Dict[str, Dict[str, Any]] = None, indent: int = 0) -> str:
    """Convert a Figma node to optimized XML format with shorthand elements."""
    spaces = "  " * indent
    node_type = node.get("type", "UNKNOWN")
    node_id = node.get("id", "")
    node_name = escape_xml(node.get("name", ""))

    # Get shorthand element name
    element_name = TYPE_SHORTHAND.get(node_type, "n")

    # Check if this is a library component
    is_library = False
    component_id = node.get("componentId", "")
    if component_id and components_map and component_id in components_map:
        comp_info = components_map[component_id]
        is_library = comp_info.get("remote", False)

    # Determine if this is a local instance (INSTANCE type without lib attribute)
    is_local_instance = node_type == "INSTANCE" and not is_library

    # Build attributes list - only include id for local instances
    attrs = []
    if is_local_instance:
        attrs.append(f'id="{node_id}"')
    attrs.append(f'name="{node_name}"')

    # Position and size with shorthand attribute names
    abs_bounds = node.get("absoluteBoundingBox", {})
    if abs_bounds:
        x = abs_bounds.get("x", 0)
        y = abs_bounds.get("y", 0)
        width = abs_bounds.get("width", 0)
        height = abs_bounds.get("height", 0)
        attrs.append(f'x="{format_number(x)}"')
        attrs.append(f'y="{format_number(y)}"')
        attrs.append(f'w="{format_number(width)}"')
        attrs.append(f'h="{format_number(height)}"')

    # Component reference for local instances only
    if component_id:
        if is_local_instance:
            attrs.append(f'componentId="{component_id}"')
        if is_library:
            attrs.append('lib')

    # Fills (colors/gradients)
    fills = node.get("fills", [])
    fills_str = get_fills_string(fills)
    if fills_str:
        attrs.append(f'fills="{escape_xml(fills_str)}"')

    # Strokes (borders)
    strokes = node.get("strokes", [])
    stroke_weight = node.get("strokeWeight", 0)
    strokes_str = get_strokes_string(strokes, stroke_weight)
    if strokes_str:
        attrs.append(f'stroke="{escape_xml(strokes_str)}"')

    # Corner radius
    corner_radius = node.get("cornerRadius")
    if corner_radius:
        attrs.append(f'cornerRadius="{corner_radius}"')

    # Opacity
    opacity = node.get("opacity")
    if opacity is not None and opacity < 1:
        attrs.append(f'opacity="{opacity:.2f}"')

    # Auto-layout properties
    layout_mode = node.get("layoutMode")
    if layout_mode and layout_mode != "NONE":
        attrs.append(f'layoutMode="{layout_mode}"')

        primary_spacing = node.get("itemSpacing")
        if primary_spacing:
            attrs.append(f'spacing="{primary_spacing}"')

        padding_left = node.get("paddingLeft", 0)
        padding_right = node.get("paddingRight", 0)
        padding_top = node.get("paddingTop", 0)
        padding_bottom = node.get("paddingBottom", 0)

        if any([padding_left, padding_right, padding_top, padding_bottom]):
            if padding_left == padding_right == padding_top == padding_bottom:
                attrs.append(f'padding="{padding_left}"')
            else:
                attrs.append(f'padding="{padding_top},{padding_right},{padding_bottom},{padding_left}"')

    # Layout positioning - how child behaves in parent auto-layout
    layout_align = node.get("layoutAlign")
    if layout_align and layout_align != "INHERIT":
        attrs.append(f'layoutAlign="{layout_align}"')

    layout_grow = node.get("layoutGrow")
    if layout_grow and layout_grow != 0:
        attrs.append(f'layoutGrow="{layout_grow}"')

    # Constraints - how node resizes relative to parent
    constraints = node.get("constraints")
    if constraints:
        horizontal = constraints.get("horizontal", "")
        vertical = constraints.get("vertical", "")
        if horizontal or vertical:
            constraint_parts = []
            if horizontal and horizontal != "LEFT":
                constraint_parts.append(f"h:{horizontal.lower()}")
            if vertical and vertical != "TOP":
                constraint_parts.append(f"v:{vertical.lower()}")
            if constraint_parts:
                attrs.append(f'constraints="{",".join(constraint_parts)}"')

    # Design system style references
    styles = node.get("styles")
    if styles:
        style_refs = []
        if styles.get("fill"):
            style_refs.append(f"fill:{styles['fill']}")
        if styles.get("stroke"):
            style_refs.append(f"stroke:{styles['stroke']}")
        if styles.get("text"):
            style_refs.append(f"text:{styles['text']}")
        if styles.get("effect"):
            style_refs.append(f"effect:{styles['effect']}")
        if style_refs:
            attrs.append(f'styleRefs="{",".join(style_refs)}"')

    # Variable bindings (design tokens like "primary", "background", etc.)
    bound_variables = node.get("boundVariables")
    if bound_variables:
        var_bindings = []

        def get_var_display(var_id):
            """Get variable name or ID for display."""
            if var_id and variables_map and var_id in variables_map:
                return variables_map[var_id]["name"]
            elif var_id:
                # Show just the last part of the ID (after the slash)
                if "/" in var_id:
                    return var_id.split("/")[-1]
                return var_id.split(":")[-1] if ":" in var_id else var_id
            return None

        # Handle fills variables (array of bindings)
        if "fills" in bound_variables:
            fills_list = bound_variables["fills"]
            if isinstance(fills_list, list):
                for i, fill_binding in enumerate(fills_list):
                    if isinstance(fill_binding, dict) and fill_binding.get("type") == "VARIABLE_ALIAS":
                        var_display = get_var_display(fill_binding.get("id"))
                        if var_display:
                            var_bindings.append(f"fill:{var_display}")

        # Handle strokes variables (array of bindings)
        if "strokes" in bound_variables:
            strokes_list = bound_variables["strokes"]
            if isinstance(strokes_list, list):
                for stroke_binding in strokes_list:
                    if isinstance(stroke_binding, dict) and stroke_binding.get("type") == "VARIABLE_ALIAS":
                        var_display = get_var_display(stroke_binding.get("id"))
                        if var_display:
                            var_bindings.append(f"stroke:{var_display}")

        # Handle single value bindings (padding, spacing, etc.)
        simple_bindings = {
            "itemSpacing": "spacing",
            "paddingLeft": "paddingLeft",
            "paddingRight": "paddingRight",
            "paddingTop": "paddingTop",
            "paddingBottom": "paddingBottom",
            "strokeWeight": "strokeWeight",
        }
        for binding_key, display_name in simple_bindings.items():
            if binding_key in bound_variables:
                binding = bound_variables[binding_key]
                if isinstance(binding, dict) and binding.get("type") == "VARIABLE_ALIAS":
                    var_display = get_var_display(binding.get("id"))
                    if var_display:
                        var_bindings.append(f"{display_name}:{var_display}")

        if var_bindings:
            attrs.append(f'variables="{escape_xml(",".join(var_bindings))}"')

    # Text-specific properties
    if node_type == "TEXT":
        characters = node.get("characters", "")
        if characters:
            # Truncate long text
            display_text = characters[:50] + "..." if len(characters) > 50 else characters
            attrs.append(f'text="{escape_xml(display_text)}"')

        text_style = get_text_style(node)
        if text_style:
            attrs.append(f'textStyle="{escape_xml(text_style)}"')

    # Effects (shadows, blurs)
    effects = node.get("effects", [])
    if effects:
        visible_effects = [e for e in effects if e.get("visible", True)]
        if visible_effects:
            effect_types = [e.get("type", "").lower() for e in visible_effects]
            attrs.append(f'effects="{",".join(effect_types)}"')

    # Build XML with shorthand element name
    children = node.get("children", [])
    attrs_str = " ".join(attrs)

    if children:
        lines = [f"{spaces}<{element_name} {attrs_str}>"]
        for child in children:
            lines.append(node_to_xml(child, variables_map, components_map, indent + 1))
        lines.append(f"{spaces}</{element_name}>")
        return "\n".join(lines)
    else:
        return f"{spaces}<{element_name} {attrs_str} />"


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

    print(f"Fetching comprehensive node tree for {file_key}/{node_id}...")

    response = fetch_node_tree(file_key, node_id)

    nodes = response.get("nodes", {})
    node_key = node_id.replace("-", ":")

    if node_key not in nodes:
        print(f"Error: Node {node_key} not found in response")
        print(f"Available nodes: {list(nodes.keys())}")
        sys.exit(1)

    node_data = nodes[node_key]
    document = node_data.get("document", {})

    # Fetch component metadata
    print("Fetching component metadata...")
    components_map = fetch_component_metadata(file_key)
    if components_map:
        remote_count = sum(1 for c in components_map.values() if c.get("remote", False))
        print(f"Found {len(components_map)} components ({remote_count} from external libraries)")

    # Fetch variable definitions
    print("Fetching variable definitions...")
    variables_map, error = fetch_variables(file_key)
    if variables_map:
        print(f"Found {len(variables_map)} variables")
    elif error == "scope_missing":
        print("\nWARNING: Cannot fetch variable names - missing API scope")
        print("Your Figma token needs the 'file_variables:read' scope.")
        print("Variable IDs will be shown instead of names.")
        print("\nTo fix: Create a new token at https://www.figma.com/developers/api")
        print("and enable the 'file_variables:read' scope.\n")
    elif error:
        print(f"Note: Could not fetch variables ({error})")
        print("Variable IDs will be shown instead of names.\n")

    counts = count_nodes(document)
    total = sum(counts.values())

    print(f"\nNode tree fetched successfully!")
    print(f"Total nodes: {total}")
    print(f"\nBy type:")
    for node_type, count in sorted(counts.items(), key=lambda x: -x[1]):
        print(f"  {node_type}: {count}")

    os.makedirs(os.path.dirname(output_path) or ".", exist_ok=True)

    xml_output = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml_output += f'<!-- Figma Node Tree (Full): {file_key}/{node_id} -->\n'
    xml_output += f'<!-- Total nodes: {total} -->\n'
    xml_output += f'<!-- Includes: position, size, colors, spacing, typography, layout constraints, grow/align, design system styles, variables, library info -->\n'
    xml_output += node_to_xml(document, variables_map, components_map)

    with open(output_path, "w", encoding="utf-8") as f:
        f.write(xml_output)

    print(f"\nOutput saved to: {output_path}")


if __name__ == "__main__":
    main()
