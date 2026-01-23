# ProjectList Component

Extracted from Figma on 2026-01-23

## Source

- **Figma URL:** https://www.figma.com/design/p47Lwdw7tC0AaAT1ynftyS/Projects?node-id=2143-31510
- **File Key:** p47Lwdw7tC0AaAT1ynftyS
- **Node ID:** 2143:31510
- **Component Name:** Aside

## Dimensions

- **Width:** 420px
- **Height:** 1083px
- **Position:** (1521, 122)

## Description

A project list sidebar component featuring:
- Header with "Company Knowledge" title and "+ New Project" button
- Search input field
- Filter dropdown ("All Knowledge") and View controls
- Scrollable list of project items, each containing:
  - Project icon (various types: target, clipboard, tools, shield, etc.)
  - Project name with optional star indicator
  - Type badge (Datasilo/Project)
  - Category badge (e.g., Research and Development, Sales, Intelligence)
  - More options menu (3-dot)
- Selected state with red left border highlight

## Files

| File | Description |
|------|-------------|
| `screenshot.png` | Visual reference (2x scale) |
| `design-context.json` | Raw MCP response with full design data |
| `generated-code.tsx` | React/Tailwind implementation (~71KB) |
| `variable-definitions.json` | Design tokens and CSS variables |
| `child-components.json` | 57 referenced child components with Figma URLs |
| `metadata.xml` | Component dimensions and position |
| `assets/` | 18 icon/image assets |

## Child Components

This component references **57 unique child components** (215 total instances).

### Custom Components (28) - May need extraction
App-specific components that can be extracted separately:
- Project Icon, Project Header, Project Info
- Project Details, Project Tags, Project Tag
- Project Tag Container, Star Icon

### Base Components (29) - No extraction needed
shadcn/ui and icon library components:
- Button, Badge, Input
- Lucide Icons (plus, chevron-down, list-filter, database, folder, ellipsis-vertical)
- Vector, border

See `child-components.json` for full list with Figma URLs.

## Key Design Tokens

### Colors
- Primary: `#0056a7`
- Primary Foreground: `#ffffff`
- Secondary: `#e5e7eb`
- Secondary Foreground: `#374151`
- Foreground: `#1e293b`
- Muted Foreground: `#6b7280`
- Border: `#d1d5db`
- Input: `#d1d5db`

### Typography
- Font Family: Inter
- Text XL: 20px (bold, line-height 32px)
- Text SM: 14px (medium/normal, line-height 20px)
- Text XS: 12px (medium, line-height 16px)

### Spacing
- p-0.5: 2px
- p-1: 4px
- p-2: 8px
- p-3: 12px
- p-4: 16px

### Other
- Border Radius: 32px (primary), 12px (secondary)
- Shadow: 0 4px 8px -1px rgba(0,0,0,0.1)

## Badge Colors
- Amber: #d97706 / #b45309
- Red: #dc2626 / #b91c1c
- Indigo: #4f46e5 / #4338ca
- Lime: #65a30d / #4d7c0f
- Violet: #7c3aed / #6d28d9
- Teal: #0d9488 / #0f766e
- Green: #16a34a
