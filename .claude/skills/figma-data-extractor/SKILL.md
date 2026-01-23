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

# 2. Extract code using Python script (scripts are in .claude/skills/figma-data-extractor/scripts/)
python ./.claude/skills/figma-data-extractor/scripts/extract_design_context.py <output-dir>/design-context.json <output-dir>

# 3. Download assets
python ./.claude/skills/figma-data-extractor/scripts/download_assets.py <output-dir>/assets/asset-urls.txt <output-dir>/assets
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
| `child-components.json` | Referenced child components | Python extract |
| `assets/*.png` | Component images | Python download |
| `README.md` | Summary document | Direct write |

### Step 6: Handle Child Component References

After extracting the design context, the script will detect child component references. These are Figma components used within the main design (e.g., buttons, icons, badges).

**Detection:** The `extract_design_context.py` script automatically identifies component instances by looking for `data-node-id` patterns with semicolons (e.g., `I2119:17420;6715:46630`).

**Output:** `child-components.json` contains:
```json
{
  "instance_count": 215,
  "unique_components": 57,
  "custom_count": 28,
  "base_count": 29,
  "custom_components": {
    "2138:21162": {
      "node_id": "2138:21162",
      "names": ["Project Icon"],
      "figma_url": "https://www.figma.com/design/abc123/?node-id=2138-21162"
    }
  },
  "base_components": {
    "6715:46630": {
      "node_id": "6715:46630",
      "names": ["Button"],
      "figma_url": "..."
    }
  }
}
```

**Component Categorization:**
- **Custom components**: App-specific components (e.g., "Project Header", "ProjectListItem") - these are the ones you may want to extract
- **Base components**: shadcn/ui components (Button, Input, Card, Badge) and icon libraries (Lucide Icons) - usually no extraction needed

The categorization logic:
- Components starting with base names ("Button Primary") → base
- Components starting with app names ("Project Header") → custom
- Icon library prefixes ("Lucide Icons / plus") → base

**Ask User:** After extraction, if custom components are found, ask the user using `AskUserQuestion`:

```
Question: "Found {N} custom components (e.g., Project Header, Project Icon). Extract them?"
Header: "Custom Children"
Options:
  - "Skip - I only need the main component"
  - "Extract all custom components"
  - "Let me choose which ones"
```

Note: Only ask about **custom** components. Base components (Button, Badge, Lucide Icons) are from shadcn/ui and don't need extraction.

If user chooses to extract:
1. For each selected child component, run the full extraction workflow recursively
2. Create subdirectories: `figma-component-data/<main-component>/children/<child-name>/`
3. Or create separate top-level directories: `figma-component-data/<child-name>/`

**Note:** Child components are often shared design system elements (buttons, icons, inputs). Check if they already exist before extracting duplicates.

### Step 7: Document Variables

Save `get_variable_defs` output directly - it's small enough:

```json
{
  "var(--primary)": "#0056a7",
  "var(--radius)": "32",
  "text-sm": "14"
}
```

## Scripts Location

**IMPORTANT:** All scripts are located in the skill directory, NOT the project root or output directory.

The scripts path is: `.claude/skills/figma-data-extractor/scripts/`

Always use this path pattern when calling scripts:
```bash
python ./.claude/skills/figma-data-extractor/scripts/<script_name>.py <args>
```

## Scripts Reference

### extract_design_context.py

Extracts code, asset URLs, and child component references from large design context files.

```bash
python ./.claude/skills/figma-data-extractor/scripts/extract_design_context.py <input.json> <output_dir> [file_key]
```

**Parameters:**
- `input.json` - The design-context.json file
- `output_dir` - Directory to save extracted files
- `file_key` (optional) - Figma file key to generate URLs for child components

**Output:**
- `generated-code.tsx` - Full React/Tailwind code
- `assets/asset-urls.txt` - List of Figma asset URLs
- `child-components.json` - Child component references with Figma URLs (if file_key provided)
- Prints component names and child component info found

### download_screenshot.py

Downloads component screenshot using Figma REST API. Requires `FIGMA_ACCESS_TOKEN`.

```bash
python ./.claude/skills/figma-data-extractor/scripts/download_screenshot.py <file_key> <node_id> <output_path> [scale]
```

**Example:**
```bash
python ./.claude/skills/figma-data-extractor/scripts/download_screenshot.py p47Lwdw7tC0AaAT1ynftyS 2143:31510 ./screenshot.png 2
```

### download_assets.py

Downloads assets from Figma MCP URLs.

```bash
python ./.claude/skills/figma-data-extractor/scripts/download_assets.py <urls_file> <output_dir>
```

Downloads all assets in parallel (5 concurrent).

### save_mcp_output.py

Complete workflow in one command:

```bash
python ./.claude/skills/figma-data-extractor/scripts/save_mcp_output.py <source.json> <output_dir> --component-name "Sidebar" --node-id "123:456"
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

**Step 2-5: Extract and save**
```bash
# Create component-specific directory
mkdir -p ./figma-component-data/Sidebar

# Download screenshot (note: scripts are in .claude/skills/figma-data-extractor/scripts/)
python ./.claude/skills/figma-data-extractor/scripts/download_screenshot.py abc123 42:15 ./figma-component-data/Sidebar/screenshot.png 2

# If design_context was auto-saved, copy and extract (include file_key for child component URLs):
cp "~/.claude/.../mcp-figma-get_design_context-xxx.txt" "./figma-component-data/Sidebar/design-context.json"
python ./.claude/skills/figma-data-extractor/scripts/extract_design_context.py ./figma-component-data/Sidebar/design-context.json ./figma-component-data/Sidebar abc123

# Download assets
python ./.claude/skills/figma-data-extractor/scripts/download_assets.py ./figma-component-data/Sidebar/assets/asset-urls.txt ./figma-component-data/Sidebar/assets

# Save metadata, variables, README
```

**Step 6: Handle child components**

Script output shows:
```
CHILD COMPONENT ANALYSIS
Unique components: 57
  - Custom components: 28  ← These are YOUR components
  - Base/library: 29       ← shadcn/ui, icons (skip these)

>>> CUSTOM COMPONENTS (likely need extraction):
  [2138:21162] Project Icon
  [2138:6232] Project Header
  [2138:21368] Project Details
  ...
```

```
AskUserQuestion:
  Question: "Found 28 custom components (Project Icon, Project Header, etc.). Extract them?"
  Header: "Custom Children"
  Options: ["Skip", "Extract all custom", "Let me choose"]
```

User selects: "Skip" (or extracts selected custom components recursively)

**Result:**
```
figma-component-data/
└── Sidebar/
    ├── screenshot.png
    ├── design-context.json
    ├── generated-code.tsx
    ├── variable-definitions.json
    ├── child-components.json    # NEW: child component references
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
