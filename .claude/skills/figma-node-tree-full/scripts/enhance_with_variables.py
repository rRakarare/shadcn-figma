#!/usr/bin/env python3
"""
Enhance node tree XML with variable names from MCP tool.

This script:
1. Reads the XML with variable IDs
2. Reads variable definitions from MCP tool (JSON)
3. Attempts to map IDs to names using color/value matching
4. Replaces IDs with names where possible
5. Cleans up intermediate files (raw.xml, variables.json)

Usage:
    python enhance_with_variables.py <input.xml> <variables.json> <output.xml>
"""

import json
import os
import re
import sys
from pathlib import Path
from typing import Dict, Set


def parse_variables_json(variables_data: dict) -> Dict[str, str]:
    """
    Parse MCP tool variable output into name->value mapping.
    Returns: {"var(--primary)": "#171717", "p-2": "8", ...}
    """
    return variables_data


def extract_variable_ids_from_xml(xml_content: str) -> Set[str]:
    """Extract all unique variable IDs from the XML."""
    pattern = r'variables="([^"]+)"'
    matches = re.findall(pattern, xml_content)

    ids = set()
    for match in matches:
        # Parse the variables attribute: "fill:51804:806,stroke:51804:1057,..."
        for var_binding in match.split(','):
            if ':' in var_binding:
                # Extract the ID part (last segment)
                parts = var_binding.split(':')
                if len(parts) >= 2:
                    var_id = parts[-1]  # e.g., "51804:806" or just the last number
                    # Keep the full reference for now
                    ids.add(':'.join(parts[1:]))  # e.g., "51804:806"

    return ids


def normalize_numeric(val: str) -> str:
    """Normalize numeric value by removing trailing .0"""
    if '.' in val:
        return val.rstrip('0').rstrip('.')
    return val


def create_id_to_name_mapping(
    xml_content: str,
    variable_defs: Dict[str, str],
    fills_in_xml: Dict[str, str]
) -> Dict[str, str]:
    """
    Create mapping from variable IDs to names using heuristics.

    Strategy:
    1. Match colors: fill="#171717" or stroke color -> variable with same hex value
    2. Match numeric values: spacing, padding, strokeWeight -> variable with same number
    """
    id_to_name = {}

    # Create reverse lookup: value -> name
    value_to_name = {v: k for k, v in variable_defs.items()}

    # Also create normalized numeric lookup
    normalized_value_to_name = {}
    for name, value in variable_defs.items():
        normalized_value_to_name[normalize_numeric(str(value))] = name

    # Find all elements with variables attribute
    element_pattern = r'<\w+([^>]*)/?>'

    for element_match in re.finditer(element_pattern, xml_content):
        attrs_str = element_match.group(1)

        # Extract variables attribute
        variables_match = re.search(r'variables="([^"]+)"', attrs_str)
        if not variables_match:
            continue
        variables = variables_match.group(1)

        # Extract other relevant attributes
        fills_match = re.search(r'fills="([^"]+)"', attrs_str)
        stroke_match = re.search(r'stroke="([^"]+)"', attrs_str)
        spacing_match = re.search(r'spacing="([^"]+)"', attrs_str)
        padding_match = re.search(r'padding="([^"]+)"', attrs_str)

        fills = fills_match.group(1) if fills_match else None
        stroke = stroke_match.group(1) if stroke_match else None
        spacing = spacing_match.group(1) if spacing_match else None
        padding = padding_match.group(1) if padding_match else None

        # Parse stroke attribute: "1.33px #ffffff" -> width="1.33", color="#ffffff"
        stroke_width = None
        stroke_color = None
        if stroke:
            width_match = re.match(r'^([\d.]+)', stroke)
            color_match = re.search(r'(#[0-9a-fA-F]{6})', stroke)
            stroke_width = width_match.group(1) if width_match else None
            stroke_color = color_match.group(1) if color_match else None

        # Parse padding attribute: "8" or "8,16,8,16" -> top, right, bottom, left
        padding_values = {}
        if padding:
            parts = padding.split(',')
            if len(parts) == 1:
                padding_values = {'top': parts[0], 'right': parts[0], 'bottom': parts[0], 'left': parts[0]}
            elif len(parts) == 4:
                padding_values = {'top': parts[0], 'right': parts[1], 'bottom': parts[2], 'left': parts[3]}

        # Process each variable binding
        for var_binding in variables.split(','):
            if ':' not in var_binding:
                continue

            prefix, var_id = var_binding.split(':', 1)

            # Skip if already resolved (not a numeric ID)
            if not re.match(r'^[\d:]+$', var_id):
                continue

            # Match based on binding type
            matched_name = None

            if prefix == 'fill' and fills:
                matched_name = value_to_name.get(fills)

            elif prefix == 'stroke' and stroke_color:
                matched_name = value_to_name.get(stroke_color)

            elif prefix == 'strokeWeight' and stroke_width:
                # Try exact match first, then normalized
                matched_name = value_to_name.get(stroke_width)
                if not matched_name:
                    matched_name = normalized_value_to_name.get(normalize_numeric(stroke_width))

            elif prefix == 'spacing' and spacing:
                norm_spacing = normalize_numeric(spacing)
                matched_name = normalized_value_to_name.get(norm_spacing)

            elif prefix == 'paddingTop' and 'top' in padding_values:
                norm_val = normalize_numeric(padding_values['top'])
                matched_name = normalized_value_to_name.get(norm_val)

            elif prefix == 'paddingRight' and 'right' in padding_values:
                norm_val = normalize_numeric(padding_values['right'])
                matched_name = normalized_value_to_name.get(norm_val)

            elif prefix == 'paddingBottom' and 'bottom' in padding_values:
                norm_val = normalize_numeric(padding_values['bottom'])
                matched_name = normalized_value_to_name.get(norm_val)

            elif prefix == 'paddingLeft' and 'left' in padding_values:
                norm_val = normalize_numeric(padding_values['left'])
                matched_name = normalized_value_to_name.get(norm_val)

            if matched_name:
                id_to_name[var_id] = matched_name

    return id_to_name


def replace_variable_ids(xml_content: str, id_to_name: Dict[str, str]) -> str:
    """Replace variable IDs with names in the XML."""

    def replace_in_variables_attr(match):
        variables_str = match.group(1)
        parts = []

        for var_binding in variables_str.split(','):
            if ':' in var_binding:
                binding_parts = var_binding.split(':', 1)
                if len(binding_parts) == 2:
                    prefix, var_id = binding_parts

                    # Replace ID with name if we have a mapping
                    if var_id in id_to_name:
                        parts.append(f"{prefix}:{id_to_name[var_id]}")
                    else:
                        parts.append(var_binding)  # Keep original
                else:
                    parts.append(var_binding)
            else:
                parts.append(var_binding)

        return f'variables="{",".join(parts)}"'

    # Replace all variables attributes
    pattern = r'variables="([^"]+)"'
    return re.sub(pattern, replace_in_variables_attr, xml_content)


def main():
    if len(sys.argv) < 4:
        print(__doc__)
        sys.exit(1)

    input_xml = Path(sys.argv[1])
    variables_json = Path(sys.argv[2])
    output_xml = Path(sys.argv[3])

    print(f"Reading {input_xml}...")
    xml_content = input_xml.read_text(encoding='utf-8')

    print(f"Reading {variables_json}...")
    variables = json.loads(variables_json.read_text(encoding='utf-8'))

    print(f"Found {len(variables)} variable definitions from MCP tool")

    # Extract variable IDs from XML
    var_ids = extract_variable_ids_from_xml(xml_content)
    print(f"Found {len(var_ids)} unique variable IDs in XML")

    # Create ID to name mapping using heuristics
    print("Mapping variable IDs to names...")
    id_to_name = create_id_to_name_mapping(xml_content, variables, {})

    print(f"Mapped {len(id_to_name)} variable IDs to names")

    # Show sample mappings
    if id_to_name:
        print("\nSample mappings:")
        for var_id, var_name in list(id_to_name.items())[:5]:
            print(f"  {var_id} -> {var_name}")

    # Replace IDs with names
    print("\nReplacing variable IDs with names...")
    enhanced_xml = replace_variable_ids(xml_content, id_to_name)

    # Write output (no variable definitions comment - keeping output lean for LLM context)
    output_xml.parent.mkdir(parents=True, exist_ok=True)
    output_xml.write_text(enhanced_xml, encoding='utf-8')

    print(f"\nEnhanced XML saved to {output_xml}")
    print(f"  - Replaced {len(id_to_name)} variable IDs with names")

    # Cleanup intermediate files
    cleanup_files = [input_xml, variables_json]
    for f in cleanup_files:
        if f.exists() and f != output_xml:
            try:
                os.remove(f)
                print(f"  - Cleaned up: {f}")
            except OSError as e:
                print(f"  - Warning: Could not remove {f}: {e}")


if __name__ == "__main__":
    main()
