# ProjectCard

Figma component data extracted on 2026-01-23

## Source

- **Figma URL**: https://www.figma.com/design/p47Lwdw7tC0AaAT1ynftyS/Projects?node-id=2138-6227
- **File Key**: p47Lwdw7tC0AaAT1ynftyS
- **Node ID**: 2138:6227

## Component Overview

A project list item card with two states:
- **Default**: Standard appearance with bottom border
- **Hovered**: Background highlight with green left accent bar

### Dimensions
- Width: 462px
- Height: 92px per state

## Structure

The component contains:
- **Project Icon**: Crown/project icon (16x16)
- **Project Name**: "MyAwesomeProject (1)" with star indicator
- **Tags/Badges**:
  - Primary badge: "Datasilo" (blue background with database icon)
  - Outline badges: "Finance", "HR", "Marketing"
- **Actions**: Ellipsis menu button (36x36)

## Design Tokens

Key variables used:
- `--primary`: #0056a7 (blue for primary badge)
- `--border`: #d1d5db (gray border)
- `--foreground`: #1e293b (text color)
- `--secondary-foreground`: #374151 (secondary text)
- `--radius`: 32px (border radius)
- `colors/green/600`: #16a34a (hover accent bar)
- `custom/bg-primary-10`: rgba(23,23,23,0.05) (hover background)

## Files

| File | Description |
|------|-------------|
| `screenshot.png` | Visual reference of the component |
| `generated-code.tsx` | Raw Figma-generated React/Tailwind code |
| `variable-definitions.json` | Design tokens and variables |
| `metadata.xml` | Component dimensions and position |
| `assets/` | Downloaded image assets (icons) |

## Referenced Components

This design uses shadcn/ui components:
- [Badge](https://ui.shadcn.com/docs/components/badge)
- [Separator](https://ui.shadcn.com/docs/components/separator)

Icons from [Lucide Icons](https://lucide.dev/icons/):
- crown
- star-filled
- database
- ellipsis-vertical

## Implementation Notes

The generated code needs to be adapted to:
1. Use proper shadcn/ui Badge component
2. Replace image-based icons with Lucide React icons
3. Apply project's CSS variable conventions
4. Handle hover state via CSS or React state
