---
name: figma-data-extractor
description: Extracts and saves complete Figma component data using MCP tools, handling large responses that exceed token limits. Use when gathering Figma design information, when user says "extract figma data", "save figma component", "get all figma info", or needs to capture complete design context including code, assets, variables, and metadata for later use.
metadata:
  mcp-server: figma, figma-desktop
---

# Figma Data Extractor

Extract complete Figma component data and save it to files, handling large MCP responses that exceed Claude's token limits.

## When to Use

- Gathering complete design information from Figma for documentation
- Saving design context for later implementation
- Extracting assets and generated code when MCP responses are too large to process directly

## Prerequisites

- Figma MCP server connected
- Python 3.8+ available
- `FIGMA_ACCESS_TOKEN` env variable (for screenshot download)
- User provides Figma URL: `https://figma.com/design/:fileKey/:fileName?node-id=X-Y`

## Workflow

### Step 1: Ask for Component Name

**IMPORTANT:** Before extracting data, ask the user for the component name using `AskUserQuestion`:

```
Question: "What should this component be called?"
Header: "Component"
Options:
  - Suggest a name based on URL/context (e.g., "Sidebar", "ProjectList")
  - "Other" (user provides custom name)
```

This name will be used to create the output folder: `figma-component-data/<component-name>/`

### Step 2: Parse Figma URL

Extract from URL:
- **fileKey**: segment after `/design/`
- **nodeId**: value of `node-id` param (convert `-` to `:`)

### Step 3: Gather All MCP Data

Call these tools in parallel:

```
get_design_context(fileKey, nodeId)   → Generated code + structure
get_screenshot(fileKey, nodeId)       → Visual reference
get_metadata(fileKey, nodeId)         → Component dimensions/position
get_variable_defs(fileKey, nodeId)    → Design tokens
get_code_connect_map(fileKey, nodeId) → Code mappings (if any)
```

### Step 4: Handle Large Responses

When `get_design_context` exceeds token limit, the system auto-saves to:
```
~/.claude/projects/.../tool-results/mcp-figma-get_design_context-{timestamp}.txt
```

**Do NOT try to read this file directly** - it will also exceed limits.

Instead, use bash to copy and Python to process:

```bash
# 1. Copy file without reading into context
cp "<temp-file-path>" "<output-dir>/design-context.json"

# 2. Extract code using Python script
python scripts/extract_design_context.py <output-dir>/design-context.json <output-dir>

# 3. Download assets
python scripts/download_assets.py <output-dir>/assets/asset-urls.txt <output-dir>/assets
```

### Step 5: Save All Data

Create output directory and save:

| File | Content | Method |
|------|---------|--------|
| `screenshot.png` | Visual reference | Python (Figma REST API) |
| `design-context.json` | Raw MCP response | bash cp |
| `generated-code.tsx` | React/Tailwind code | Python extract |
| `metadata.xml` | Dimensions, position | Direct write |
| `variable-definitions.json` | Design tokens | Direct write |
| `assets/*.png` | Component images | Python download |
| `README.md` | Summary document | Direct write |

### Step 6: Document Variables

Save `get_variable_defs` output directly - it's small enough:

```json
{
  "var(--primary)": "#0056a7",
  "var(--radius)": "32",
  "text-sm": "14"
}
```

## Scripts Reference

### extract_design_context.py

Extracts code and asset URLs from large design context files.

```bash
python scripts/extract_design_context.py <input.json> <output_dir>
```

**Output:**
- `generated-code.tsx` - Full React/Tailwind code
- `assets/asset-urls.txt` - List of Figma asset URLs
- Prints component names found

### download_screenshot.py

Downloads component screenshot using Figma REST API. Requires `FIGMA_ACCESS_TOKEN`.

```bash
python scripts/download_screenshot.py <file_key> <node_id> <output_path> [scale]
```

**Example:**
```bash
python scripts/download_screenshot.py p47Lwdw7tC0AaAT1ynftyS 2143:31510 ./screenshot.png 2
```

### download_assets.py

Downloads assets from Figma MCP URLs.

```bash
python scripts/download_assets.py <urls_file> <output_dir>
```

Downloads all assets in parallel (5 concurrent).

### save_mcp_output.py

Complete workflow in one command:

```bash
python scripts/save_mcp_output.py <source.json> <output_dir> --component-name "Sidebar" --node-id "123:456"
```

Creates full output structure with README.

## Example Workflow

User: "Extract all data from https://figma.com/design/abc123/File?node-id=42-15"

**Step 1: Ask for component name**
```
AskUserQuestion:
  Question: "What should this component be called?"
  Header: "Component"
  Options: ["Sidebar (Recommended)", "ProjectList", "NavigationPanel"]
```

User selects: "Sidebar"

**Step 2-6: Extract and save**
```bash
# Create component-specific directory
mkdir -p ./figma-component-data/Sidebar

# Download screenshot
python scripts/download_screenshot.py abc123 42:15 ./figma-component-data/Sidebar/screenshot.png 2

# If design_context was auto-saved, copy and extract:
cp "~/.claude/.../mcp-figma-get_design_context-xxx.txt" "./figma-component-data/Sidebar/design-context.json"
python scripts/extract_design_context.py ./figma-component-data/Sidebar/design-context.json ./figma-component-data/Sidebar

# Download assets
python scripts/download_assets.py ./figma-component-data/Sidebar/assets/asset-urls.txt ./figma-component-data/Sidebar/assets

# Save metadata, variables, README
```

**Result:**
```
figma-component-data/
└── Sidebar/
    ├── screenshot.png
    ├── design-context.json
    ├── generated-code.tsx
    ├── variable-definitions.json
    ├── metadata.xml
    ├── README.md
    └── assets/
        └── *.png
```

## Key Principle

**Never read large files into Claude's context.** Use:
- `bash cp` to move files
- `python` to process files on disk
- Only write small summaries/previews to context
