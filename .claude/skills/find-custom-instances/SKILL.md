---
name: find-custom-instances
description: Finds all custom component instances (non-library) in a Figma component and prints their Figma URLs. Use when user wants to discover local component dependencies, find custom child components, list reusable components within a design, or identify which custom components are used in a Figma frame.
---

# Find Custom Instances

Find all custom/local component instances in a Figma component (excluding library components like Lucide icons and shadcn).

## Prerequisites

- `FIGMA_ACCESS_TOKEN` environment variable (or in `.env` file)

## Usage

1. Parse Figma URL:
   - `https://figma.com/design/:fileKey/:fileName?node-id=X-Y`
   - Extract `fileKey` and convert `node-id` from `X-Y` to `X:Y`

2. Run the script:
```bash
python ./.claude/skills/find-custom-instances/scripts/find_custom_instances.py <file_key> <node_id>
```

3. Report the output to the user.

## Example

```bash
# From: https://figma.com/design/abc123/File?node-id=42-15
python ./.claude/skills/find-custom-instances/scripts/find_custom_instances.py abc123 42:15
```

## Output Format

```
Input Component:
  Name: ProjectList
  URL: https://www.figma.com/design/abc123/File?node-id=42-15

Custom Instances Found (3):
  1. Project
     URL: https://www.figma.com/design/abc123/File?node-id=2138-6227
  2. Project Header
     URL: https://www.figma.com/design/abc123/File?node-id=2138-6232
  3. Project Tag
     URL: https://www.figma.com/design/abc123/File?node-id=2138-21718
```

## Notes

- Library components (Lucide icons, shadcn/ui, etc.) are filtered out
- When a component is a variant, the URL points to the parent Component Set
- Duplicate instances of the same component are deduplicated
