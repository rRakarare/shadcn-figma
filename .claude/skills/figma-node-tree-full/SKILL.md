# Figma Node Tree Full

Fetch comprehensive node tree structure from Figma combining REST API and MCP tools, with complete design system variable information. Outputs LLM-optimized XML with shorthand element names.

## Prerequisites

- `FIGMA_ACCESS_TOKEN` environment variable (or in `.env` file)
- Figma MCP server connected (for variable names)

## Usage

1. Parse Figma URL:
   - `https://figma.com/design/:fileKey/:fileName?node-id=X-Y`
   - Extract `fileKey` and convert `node-id` from `X-Y` to `X:Y`

2. Fetch node tree structure with variable IDs:
```bash
python ./.claude/skills/figma-node-tree-full/scripts/fetch_node_tree_full.py <file_key> <node_id> ./figma-extract/raw.xml
```

3. Fetch variable definitions using MCP and save to JSON:
```python
result = mcp__figma__get_variable_defs(fileKey=<file_key>, nodeId=<node_id>, clientLanguages="python", clientFrameworks="unknown")
# Save result to ./figma-extract/variables.json
```

4. Enhance XML with variable names (also cleans up intermediate files):
```bash
python ./.claude/skills/figma-node-tree-full/scripts/enhance_with_variables.py ./figma-extract/raw.xml ./figma-extract/variables.json ./figma-extract/node-tree.xml
```

5. Report results:
   - Total node count and breakdown by type
   - Number of variable IDs mapped to names
   - Sample variable mappings
   - Final output file location: `./figma-extract/node-tree.xml`

## Output

Creates one optimized XML file in `./figma-extract/node-tree.xml` with shorthand element names for LLM context efficiency.

### Element Shorthand Mapping

| Full Type | Shorthand | Example |
|-----------|-----------|---------|
| COMPONENT_SET | `<cs>` | `<cs name="Button">` |
| COMPONENT | `<c>` | `<c name="variant=primary">` |
| INSTANCE | `<i>` | `<i name="Button" lib>` |
| FRAME | `<f>` | `<f name="Container">` |
| TEXT | `<t>` | `<t name="Label" text="Hello">` |
| RECTANGLE | `<r>` | `<r name="Background">` |
| VECTOR | `<v>` | `<v name="Icon">` |
| BOOLEAN_OPERATION | `<bo>` | `<bo name="Union">` |
| LINE | `<ln>` | `<ln name="Divider">` |
| GROUP | `<g>` | `<g name="Group 1">` |
| ELLIPSE | `<e>` | `<e name="Circle">` |
| Others | `<n>` | `<n name="Unknown">` |

### Attribute Shorthand

- `w` - Width (instead of `width`)
- `h` - Height (instead of `height`)
- `lib` - From library component (instead of `fromLibrary="true"`)
- Integer values have `.0` suffix removed

### ID Handling

- `id`, `componentId`, and `componentSetId` only appear on local INSTANCE nodes (nodes without `lib` attribute)
- Library instances (`<i>` with `lib` attribute) do not include `id`, `componentId`, or `componentSetId`
- All other node types (`<f>`, `<t>`, `<r>`, `<c>`, `<cs>`, etc.) do not include `id` attribute

### Node Attributes

**Basic Info:**
- `id` - Node ID (only on local INSTANCE nodes)
- `name` - Node name
- `x`, `y` - Position coordinates
- `w`, `h` - Dimensions (shorthand)
- `componentId` - Component reference (only on local INSTANCE nodes)
- `lib` - Present when instance is from external library

**Visual Styling:**
- `fills` - Fill colors/gradients
- `stroke` - Stroke colors/borders
- `cornerRadius` - Border radius
- `opacity` - Opacity value
- `effects` - Shadows, blurs

**Layout (Auto-layout):**
- `layoutMode` - HORIZONTAL, VERTICAL, or NONE
- `spacing` - Gap between children
- `padding` - Internal padding (single value or top,right,bottom,left)
- `layoutAlign` - How child aligns in parent (MIN, CENTER, MAX, STRETCH)
- `layoutGrow` - Whether child grows to fill space (0 or 1)

**Layout (Constraints):**
- `constraints` - How node resizes relative to parent (h:left/right/center/scale/stretch, v:top/bottom/center/scale/stretch)

**Typography (TEXT nodes):**
- `text` - Text content
- `textStyle` - Font family, size, weight, line height, letter spacing, horizontal/vertical alignment

**Design System:**
- `styleRefs` - References to design system styles (fill:styleId, stroke:styleId, text:styleId, effect:styleId)
- `variables` - Variable bindings for design tokens with resolved names

## Example

```bash
# From: https://figma.com/design/abc123/File?node-id=42-15
python ./.claude/skills/figma-node-tree-full/scripts/fetch_node_tree_full.py abc123 42:15 ./figma-extract/raw.xml
# Then call MCP tool and save to ./figma-extract/variables.json
# Then run enhance script which outputs to ./figma-extract/node-tree.xml and deletes intermediate files
```

## Example Output

```xml
<i name="Lucide Icons / database" x="-20278" y="4451" w="12" h="12" componentId="2229:12352" lib>
  <v name="Vector" x="-20278" y="4451" w="12" h="12" />
</i>
```
