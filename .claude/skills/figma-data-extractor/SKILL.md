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
get_design_context(fileKey, nodeId)   → Generated code + component instances (PRIMARY DATA SOURCE)
get_screenshot(fileKey, nodeId)       → Visual reference
get_variable_defs(fileKey, nodeId)    → Design tokens
get_code_connect_map(fileKey, nodeId) → Code mappings (if any)
```

**Note:** The MCP `get_metadata` tool only returns root node info. For the **full node tree with all children**, use the `fetch_node_tree.py` script (see Step 5).

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

### Step 5: Fetch Full Node Tree

Use `fetch_node_tree.py` to get the **complete hierarchical structure** from Figma REST API:

```bash
# Fetch full node tree (JSON format with summary + raw data)
python ./.claude/skills/figma-data-extractor/scripts/fetch_node_tree.py <file_key> <node_id> <output_dir>/node-tree.json

# Or XML format for readable hierarchy
python ./.claude/skills/figma-data-extractor/scripts/fetch_node_tree.py <file_key> <node_id> <output_dir>/node-tree.xml --format=xml
```

This provides:
- Full nested tree of all frames, instances, text, vectors
- Node types (FRAME, INSTANCE, TEXT, VECTOR, COMPONENT, etc.)
- Component IDs for INSTANCE nodes (links to source components)
- Positions and dimensions for all nodes

**Component Analysis:** Additional instance analysis comes from `extract_design_context.py` which parses `data-node-id` patterns in the generated code. This produces `child-components.json` with categorized instances.

### Step 6: Save All Data

Create output directory and save:

| File | Content | Method |
|------|---------|--------|
| `screenshot.png` | Visual reference | Python (Figma REST API) |
| `design-context.json` | Raw MCP response | bash cp |
| `generated-code.tsx` | React/Tailwind code | Python extract |
| `child-components.json` | Categorized instances | Python extract |
| `node-tree.json` | Full hierarchical tree (summary) | Python (Figma REST API) |
| `node-tree-raw.json` | Full hierarchical tree (raw) | Python (Figma REST API) |
| `node-tree.xml` | Full hierarchical tree (readable) | Python (Figma REST API) |
| `variable-definitions.json` | Design tokens | Direct write |
| `assets/*.png` | Component images | Python download |
| `README.md` | Summary document | Direct write |

### Step 7: Handle Child Component References

The `child-components.json` file (created by `extract_design_context.py`) categorizes all component instances found via `data-node-id` patterns in the generated code:

```json
{
  "instance_count": 215,
  "unique_components": 57,
  "custom_count": 28,
  "base_count": 29,
  "custom_components": {
    "2138:6232": {
      "node_id": "2138:6232",
      "names": ["Project Header"],
      "figma_url": "https://www.figma.com/design/abc123/?node-id=2138-6232"
    }
  },
  "base_components": {
    "136:1182": {
      "node_id": "136:1182",
      "names": ["Badge", "Button", "Lucide Icons / plus"]
    }
  }
}
```

**Categories:**
- **Custom Components**: App-specific components with Figma URLs (may need extraction)
- **Base Components**: Library components (shadcn/ui, Lucide icons) - no extraction needed

**Ask User:** After extraction, if custom components are found, ask using `AskUserQuestion`:

```
Question: "Found {N} custom component instances (e.g., Project Header, Star Icon). Extract them?"
Header: "Custom Children"
Options:
  - "Skip - I only need the main component"
  - "Extract all custom instances"
  - "Let me choose which ones"
```

### Step 8: Document Variables

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

**PRIMARY SCRIPT** for processing design context and analyzing child components. Extracts code, asset URLs, and categorizes component instances by parsing `data-node-id` patterns.

```bash
python ./.claude/skills/figma-data-extractor/scripts/extract_design_context.py <input.json> <output_dir> [file_key]
```

**Features:**
- Extracts full React/Tailwind code
- Finds all Figma asset URLs
- Analyzes component instances from `data-node-id` patterns
- Categorizes into custom vs base (shadcn/icons) components
- Generates Figma URLs for custom components

**Output:**
- `generated-code.tsx` - Full React/Tailwind code
- `assets/asset-urls.txt` - List of Figma asset URLs
- `child-components.json` - Categorized component analysis

### fetch_node_tree.py

Fetches the **complete hierarchical node tree** from Figma REST API. This provides the full structure that the MCP `get_metadata` tool doesn't return.

```bash
# JSON format (creates both summary and raw files)
python ./.claude/skills/figma-data-extractor/scripts/fetch_node_tree.py <file_key> <node_id> <output_path.json>

# XML format (readable hierarchical structure)
python ./.claude/skills/figma-data-extractor/scripts/fetch_node_tree.py <file_key> <node_id> <output_path.xml> --format=xml
```

**Output includes:**
- Node ID, name, type for every element
- Bounding box (x, y, width, height)
- Component ID for INSTANCE nodes
- Full parent-child nesting

**Node types:** COMPONENT, FRAME, INSTANCE, TEXT, VECTOR, RECTANGLE, BOOLEAN_OPERATION, LINE, etc.

### download_screenshot.py

Downloads component screenshot using Figma REST API. Requires `FIGMA_ACCESS_TOKEN`.

```bash
python ./.claude/skills/figma-data-extractor/scripts/download_screenshot.py <file_key> <node_id> <output_path> [scale]
```

### download_assets.py

Downloads assets from Figma MCP URLs.

```bash
python ./.claude/skills/figma-data-extractor/scripts/download_assets.py <urls_file> <output_dir>
```

## Shadcn Components (No Figma URL Needed)

The following components are part of shadcn/ui and don't require Figma URL extraction:

```
accordion, alert, alert-dialog, aspect-ratio, avatar,
badge, breadcrumb, button, button-group,
calendar, card, carousel, chart, checkbox, collapsible, command, context-menu,
dialog, drawer, dropdown-menu,
empty,
field, form,
hover-card,
input, input-group, input-otp, item,
kbd,
label,
menubar,
native-select, navigation-menu,
pagination, popover, progress,
radio-group, resizable,
scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner, spinner, switch,
table, tabs, textarea, toggle, toggle-group, tooltip
```

## Lucide Icon Name Extraction

Icons in Figma are typically named:
- `Lucide Icons / chevron-down` → `ChevronDown`
- `Lucide Icons / plus` → `Plus`
- `Lucide Icons / ellipsis-vertical` → `EllipsisVertical`

The script automatically converts to PascalCase for `lucide-react`:

```tsx
import { ChevronDown, EllipsisVertical, Plus } from 'lucide-react';
```

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
python ./.claude/skills/figma-data-extractor/scripts/download_screenshot.py abc123 42:15 ./figma-component-data/Sidebar/screenshot.png 2

# If design_context was auto-saved, copy and extract (includes component analysis):
cp "~/.claude/.../mcp-figma-get_design_context-xxx.txt" "./figma-component-data/Sidebar/design-context.json"
python ./.claude/skills/figma-data-extractor/scripts/extract_design_context.py ./figma-component-data/Sidebar/design-context.json ./figma-component-data/Sidebar abc123

# Fetch full node tree (JSON + XML)
python ./.claude/skills/figma-data-extractor/scripts/fetch_node_tree.py abc123 42:15 ./figma-component-data/Sidebar/node-tree.json
python ./.claude/skills/figma-data-extractor/scripts/fetch_node_tree.py abc123 42:15 ./figma-component-data/Sidebar/node-tree.xml --format=xml

# Download assets
python ./.claude/skills/figma-data-extractor/scripts/download_assets.py ./figma-component-data/Sidebar/assets/asset-urls.txt ./figma-component-data/Sidebar/assets

# Save variable definitions (use Write tool)
```

**Step 7: Review component analysis**

Script output from `extract_design_context.py`:
```
============================================================
CHILD COMPONENT ANALYSIS
============================================================
Total instances: 215
Unique components: 57
  - Custom components: 28
  - Base/library components: 29

>>> CUSTOM COMPONENTS (likely need extraction):
  [2138:6232] Project Header
      https://www.figma.com/design/abc123/?node-id=2138-6232
  [2138:21718] Project Tag
      https://www.figma.com/design/abc123/?node-id=2138-21718
  ...

--- Base components (shadcn/icons - usually no extraction needed):
  Badge, Button, Lucide Icons / chevron-down, Lucide Icons / plus, ...
```

**Result:**
```
figma-component-data/
└── Sidebar/
    ├── screenshot.png
    ├── design-context.json
    ├── generated-code.tsx
    ├── child-components.json     # Categorized component analysis
    ├── node-tree.json            # Full hierarchical tree (summary)
    ├── node-tree-raw.json        # Full hierarchical tree (raw Figma data)
    ├── node-tree.xml             # Full hierarchical tree (readable)
    ├── variable-definitions.json
    ├── README.md
    └── assets/
        └── *.png
```

## Key Principles

1. **Never read large files into Claude's context.** Use:
   - `bash cp` to move files
   - `python` to process files on disk
   - Only write small summaries/previews to context

2. **Use `fetch_node_tree.py` for full structure.** The MCP `get_metadata` tool only returns root node info. The `fetch_node_tree.py` script fetches the complete hierarchical tree from Figma REST API.

3. **Component analysis comes from multiple sources:**
   - `node-tree.json/xml` - Full hierarchical structure with all node types
   - `child-components.json` - Instance categorization from generated code

4. **Don't save Figma URLs for library components.** Shadcn/ui and Lucide icons are imported from npm packages.

5. **Extract Lucide icon names correctly.** Convert to PascalCase for `lucide-react` imports.
