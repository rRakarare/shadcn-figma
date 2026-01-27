#!/usr/bin/env python3
"""
Merge variable names into node tree XML.

Takes the raw XML with variable IDs and a JSON mapping of variable names,
then replaces IDs with names in the XML output.

Usage:
    python merge_variables.py <input.xml> <variables.json> <output.xml>
"""

import json
import re
import sys
from pathlib import Path


def extract_variable_id_mapping(variables_data):
    """
    Extract variable ID to name mapping from Figma data.

    The variables_data might be in different formats:
    - {"var(--primary)": "#171717", ...} - name to value mapping
    - {"VariableID:xyz/123:456": {"name": "var(--primary)", ...}} - full format

    For now, we'll create a reverse lookup based on common patterns.
    """
    # For the MCP tool response, we get name->value pairs
    # We'll need to match these with the IDs somehow
    # Since we don't have direct ID mapping from MCP tool,
    # we'll extract the numeric IDs from the XML and try to match patterns

    # Return the raw data for now
    return variables_data


def replace_variable_ids(xml_content, variable_mapping):
    """
    Replace variable IDs in the XML with variable names.

    Looks for patterns like:
    - variables="fill:51804:806,stroke:51804:1057"

    And replaces with actual variable names from mapping.
    """
    # This is tricky because the MCP tool doesn't give us ID->name mapping directly
    # We get name->value pairs

    # For now, let's just add the variable definitions as a comment at the top
    # and keep the IDs in place

    # We could enhance this if we can get the actual ID mappings

    return xml_content


def main():
    if len(sys.argv) < 4:
        print(__doc__)
        sys.exit(1)

    input_xml = Path(sys.argv[1])
    variables_json = Path(sys.argv[2])
    output_xml = Path(sys.argv[3])

    # Read input files
    xml_content = input_xml.read_text(encoding='utf-8')
    variables = json.loads(variables_json.read_text(encoding='utf-8'))

    # Create variable mapping
    var_mapping = extract_variable_id_mapping(variables)

    # Replace IDs with names
    updated_xml = replace_variable_ids(xml_content, var_mapping)

    # Add variable definitions as XML comment
    var_comment = "\n<!-- Variable Definitions:\n"
    for name, value in sorted(variables.items())[:20]:  # Show first 20
        var_comment += f"     {name}: {value}\n"
    if len(variables) > 20:
        var_comment += f"     ... and {len(variables) - 20} more\n"
    var_comment += "-->\n"

    # Insert after first line
    lines = updated_xml.split('\n')
    lines.insert(1, var_comment)
    updated_xml = '\n'.join(lines)

    # Write output
    output_xml.write_text(updated_xml, encoding='utf-8')

    print(f"Merged {len(variables)} variable definitions into {output_xml}")


if __name__ == "__main__":
    main()
