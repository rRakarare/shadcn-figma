---
name: figma-to-code
description: Extracts Tailwind React code from Figma designs with design system variables and saves to file. Use when user wants to extract code from Figma, says "figma to code", "extract figma code", "get code from figma", or provides a Figma URL asking for code output.
metadata:
  mcp-server: figma, figma-desktop
---

# Figma to Code

Extract Tailwind React code from Figma designs and save to file with design system variables.

## Prerequisites

- Figma MCP server connected
- Python 3.8+

## Workflow

### Step 1: Parse Figma URL

Extract from URL: `https://figma.com/design/:fileKey/:fileName?node-id=1-2`
- **fileKey**: segment after `/design/`
- **nodeId**: value of `node-id` parameter (convert `-` to `:`)

### Step 2: Fetch Data via MCP

Call both MCP tools:

```
get_design_context(fileKey, nodeId)
get_variable_defs(fileKey, nodeId)
```

**EXPECTED BEHAVIOR:** When `get_design_context` response exceeds token limit, you will see a message like:
```
Error: result (X characters) exceeds maximum allowed tokens. Output has been saved to...
```
This is NORMAL and expected - the file is automatically saved. Extract the file path from this message.

**CRITICAL: Do NOT use Read tool on the saved temp file!**

### Step 3: Copy and Save Files

Use Bash commands to save BOTH files (do NOT use Write tool for new files):

```bash
# Create output directory and copy design context in one command
mkdir -p ./figma-output && cp "<temp-file-path>" ./figma-output/design-context.json
```

```bash
# Save variables using echo (NOT Write tool - it requires reading first)
echo '<variables-json-output>' > ./figma-output/variables.json
```

**IMPORTANT:** Use `echo` with Bash for variables.json because the Write tool requires reading the file first, which fails for new files.

### Step 4: Process with Python

```bash
python ./.claude/skills/figma-to-code/scripts/process_figma_code.py \
  ./figma-output/design-context.json \
  ./figma-output/variables.json \
  ./figma-output/ComponentName.tsx \
  --figma-url "https://..." \
  --node-id "X:Y" \
  --strip-assets
```

### Step 5: Report Output

Read the script output and report:
- Output file path
- Component name
- Code size
- Variables count

## Script Options

| Option | Description |
|--------|-------------|
| `--strip-assets` | Remove asset URL constants (recommended) |
| `--component NAME` | Override component name |
| `--figma-url URL` | Source URL for header |
| `--node-id ID` | Node ID for header |

## Output Format

```tsx
/**
 * Generated from Figma
 * Source: [URL]
 * Node: [ID]
 * Component: [Name]
 *
 * Design System Variables:
 *   Colors:
 *     var(--primary): #0056a7
 *   Spacing:
 *     p-2: 8
 */

// Clean React/Tailwind code
```

## Example

URL: `https://figma.com/design/abc123/File?node-id=1-2`

1. Parse: fileKey=`abc123`, nodeId=`1:2`
2. Call MCP tools (get_design_context will show "exceeds maximum tokens" - this is expected)
3. Copy temp file: `mkdir -p ./figma-output && cp <temp-path> ./figma-output/design-context.json`
4. Save variables with echo: `echo '{"var":...}' > ./figma-output/variables.json`
5. Run: `python ./.claude/skills/figma-to-code/scripts/process_figma_code.py ...`

## Rules

1. **NEVER Read large temp files** - use `cp` command
2. **NEVER use Write tool for new files** - use `echo` via Bash instead (Write requires reading first)
3. **"Exceeds maximum tokens" is EXPECTED** - extract the file path and use `cp`
4. **Always use `--strip-assets`** - removes asset URL constants
5. **Use Python for processing** - handles large files properly
