---
name: figma-node-tree
description: Fetch Figma node tree structure with minimal context. Use when user says "fetch node tree", "get figma structure", "extract figma nodes", or provides a Figma URL and wants just the node hierarchy (not full design context). Outputs node IDs, names, and types as clean XML.
---

# Figma Node Tree

Fetch node tree structure from Figma REST API as XML. No MCP required.

## Prerequisites

- `FIGMA_ACCESS_TOKEN` environment variable (or in `.env` file)

## Usage

1. Parse Figma URL:
   - `https://figma.com/design/:fileKey/:fileName?node-id=X-Y`
   - Extract `fileKey` and convert `node-id` from `X-Y` to `X:Y`

2. Run the script:

```bash
python ./.claude/skills/figma-node-tree/scripts/fetch_node_tree.py <file_key> <node_id> <output_path.xml>
```

3. Report the node counts to the user.

## Output

Creates one XML file with:
- `id` - Node ID
- `name` - Node name
- `type` - Node type (FRAME, INSTANCE, TEXT, etc.)
- `componentId` - Component reference (only for INSTANCE nodes)

## Example

```bash
# From: https://figma.com/design/abc123/File?node-id=42-15
python ./.claude/skills/figma-node-tree/scripts/fetch_node_tree.py abc123 42:15 ./node-tree.xml
```
