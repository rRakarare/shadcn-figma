---
name: figma-node-tree
description: dont use anymore, outdated.
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
