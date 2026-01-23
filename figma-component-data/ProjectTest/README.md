# ProjectTest Component

**Figma URL:** https://www.figma.com/design/p47Lwdw7tC0AaAT1ynftyS/Projects?node-id=2143-31510

**Extracted:** 2026-01-23

## Screenshot

![Component Screenshot](./screenshot.png)

## Files

| File | Description |
|------|-------------|
| `screenshot.png` | Visual reference (2x scale) |
| `design-context.json` | Raw MCP response |
| `generated-code.tsx` | React/Tailwind code |
| `child-components.json` | Categorized component instances |
| `metadata.xml` | Root node info (name, dimensions) |
| `variable-definitions.json` | Design tokens |
| `assets/*.png` | 18 image assets |

## Design Tokens

Key variables used in this component:

| Token | Value |
|-------|-------|
| `--primary` | #0056a7 |
| `--primary-foreground` | #ffffff |
| `--secondary` | #e5e7eb |
| `--secondary-foreground` | #374151 |
| `--muted-foreground` | #6b7280 |
| `--foreground` | #1e293b |
| `--border` | #d1d5db |
| `--input` | #d1d5db |
| `--radius` | 32 |

## Typography

- **Font Family:** Inter (`font-sans`)
- **Text XL:** 20px, Bold, line-height 32px
- **Text SM:** 14px, Medium/Normal, line-height 20px
- **Text XS:** 12px, Medium, line-height 16px

## Component Structure

This is an "Aside" sidebar component containing:
- Header with "Company Knowledge" title and "New Project" button
- Search input
- Filter dropdown ("All Knowledge") and View toggle
- Project list items with:
  - Project icons (various types: Datasilo, Project badges)
  - Project names with optional star indicators
  - Tag badges (departments/categories)
  - More options menu (ellipsis)

## Child Components

**215 total instances** from **57 unique components**

### Lucide Icons Used
- `chevron-down`
- `database`
- `ellipsis-vertical`
- `folder`
- `list-filter`
- `plus`

```tsx
import { ChevronDown, Database, EllipsisVertical, Folder, ListFilter, Plus } from 'lucide-react';
```

### Shadcn Components Used
- Badge
- Button
- Separator

### Custom Components (28)
See `child-components.json` for full list with Figma URLs for extraction:
- Project Header
- Project Tag
- Project Tag Container
- Star Icon
- Project Info
- Shape (icons)
