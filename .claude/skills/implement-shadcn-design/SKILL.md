---
name: implement-design-shadcn
description: Translates Figma designs into production-ready shadcn/ui components with 1:1 visual fidelity. Use when implementing UI from Figma files using shadcn/ui, when user mentions "implement design", "generate code", "implement component", "build Figma design", provides Figma URLs, or asks to build components matching Figma specs. Requires Figma MCP and shadcn MCP server connections.
metadata:
  mcp-server: figma, figma-desktop, shadcn
---

# Implement Design with shadcn/ui

## Overview

This skill provides a structured workflow for translating Figma designs into production-ready code using shadcn/ui components. It ensures consistent integration with both the Figma MCP server and shadcn MCP server, proper use of shadcn design tokens, and 1:1 visual parity with designs.

## Prerequisites

- **Figma MCP server** must be connected and accessible
- **shadcn MCP server** must be connected and accessible
- User must provide a Figma URL in the format: `https://figma.com/design/:fileKey/:fileName?node-id=1-2`
  - `:fileKey` is the file key
  - `1-2` is the node ID (the specific component or frame to implement)
- **OR** when using `figma-desktop` MCP: User can select a node directly in the Figma desktop app (no URL required)
- Project must have shadcn/ui initialized (`npx shadcn@latest init` completed)

## shadcn Design Tokens Reference

**CRITICAL:** All implementations must exclusively use these shadcn design tokens. Never use hardcoded color values, spacing pixels, or custom CSS variables.

### Color Tokens

| Token | Usage |
|-------|-------|
| `background` / `foreground` | Base page colors |
| `card` / `card-foreground` | Card component colors |
| `popover` / `popover-foreground` | Popover/dropdown colors |
| `primary` / `primary-foreground` | Primary actions, buttons |
| `secondary` / `secondary-foreground` | Secondary actions |
| `muted` / `muted-foreground` | Subdued elements, placeholders |
| `accent` / `accent-foreground` | Highlights, hover states |
| `destructive` / `destructive-foreground` | Destructive actions, errors |
| `border` | Border colors |
| `input` | Input field borders |
| `ring` | Focus ring color |
| `chart-1` through `chart-5` | Chart/data visualization colors |
| `sidebar-*` | Sidebar-specific variants |

### Radius Tokens

| Token | Value |
|-------|-------|
| `radius-sm` | `calc(var(--radius) - 4px)` |
| `radius-md` | `calc(var(--radius) - 2px)` |
| `radius-lg` | `var(--radius)` |
| `radius-xl` | `calc(var(--radius) + 4px)` |

### Typography Tokens

| Token | Usage |
|-------|-------|
| `font-sans` | Default sans-serif font |
| `font-mono` | Monospace font |
| `font-serif` | Serif font |

### Shadow Tokens

`shadow-2xs`, `shadow-xs`, `shadow-sm`, `shadow`, `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl`

---

## Required Workflow

**Follow these steps in order. Do not skip steps.**

### Step 1: Get Node ID

#### Option A: Parse from Figma URL

When the user provides a Figma URL, extract the file key and node ID.

**URL format:** `https://figma.com/design/:fileKey/:fileName?node-id=1-2`

**Extract:**
- **File key:** `:fileKey` (segment after `/design/`)
- **Node ID:** `1-2` (value of `node-id` query parameter)

**Note:** When using `figma-desktop` MCP, `fileKey` is not required—only `nodeId` is needed.

#### Option B: Use Current Selection (figma-desktop MCP only)

The tools automatically use the currently selected node from the open Figma desktop app.

### Step 2: Fetch Design Context

Run `get_design_context` with the extracted parameters:

```
get_design_context(fileKey=":fileKey", nodeId="1-2")
```

**Extract from the response:**
- Component names (e.g., "Button", "Input", "Card")
- Variant properties (e.g., "variant=primary", "size=lg")
- Layout properties (Auto Layout, constraints, sizing)
- Typography specifications
- Color values (to map to shadcn tokens)
- Spacing and padding values

**If the response is truncated:**
1. Run `get_metadata(fileKey=":fileKey", nodeId="1-2")` for the node map
2. Fetch specific child nodes individually with `get_design_context`

### Step 3: Capture Visual Reference

Run `get_screenshot` for visual validation:

```
get_screenshot(fileKey=":fileKey", nodeId="1-2")
```

Keep this screenshot accessible throughout implementation as the source of truth.

### Step 4: Identify and Install shadcn Components

**4a. Map Figma components to shadcn components:**

| Figma Component Name | shadcn Component |
|---------------------|------------------|
| Button | `button` |
| Input, TextField | `input` |
| Label | `label` |
| Card | `card` |
| Dialog, Modal | `dialog` |
| Dropdown, Select | `select` |
| Checkbox | `checkbox` |
| Radio, RadioButton | `radio-group` |
| Switch, Toggle | `switch` |
| Tabs | `tabs` |
| Avatar | `avatar` |
| Badge | `badge` |
| Alert | `alert` |
| Toast, Notification | `sonner` or `toast` |
| Tooltip | `tooltip` |
| Popover | `popover` |
| Accordion | `accordion` |
| Table | `table` |
| Form | `form` |
| Slider | `slider` |
| Progress | `progress` |
| Separator | `separator` |
| Sheet, Drawer | `sheet` |
| Skeleton | `skeleton` |
| Calendar | `calendar` |
| DatePicker | `date-picker` |
| Command, CommandPalette | `command` |
| NavigationMenu | `navigation-menu` |
| Breadcrumb | `breadcrumb` |
| Pagination | `pagination` |
| Sidebar | `sidebar` |

**If no mapping is found in the table above:**

1. Query the shadcn MCP to list all available components:
   ```
   shadcn_list_components()
   ```
2. Compare the Figma component name against the returned list
3. If a matching or similar name exists, proceed with that component
4. If no match exists, compose the UI using multiple shadcn primitives

**4b. Query shadcn MCP for component details:**

```
shadcn_get_component(component="button")
```

This returns:
- Component implementation code
- Available variants and props
- Required dependencies

**4c. Check if component is installed:**

If the component is not installed in the project, install it via shadcn MCP:

```
shadcn_add_component(component="button")
```

**4d. Map Figma variants to shadcn variants:**

| Figma Variant | shadcn Variant |
|---------------|----------------|
| Primary | `variant="default"` |
| Secondary | `variant="secondary"` |
| Outline | `variant="outline"` |
| Ghost | `variant="ghost"` |
| Link | `variant="link"` |
| Destructive, Danger | `variant="destructive"` |
| Small, SM | `size="sm"` |
| Medium, MD, Default | `size="default"` |
| Large, LG | `size="lg"` |
| Icon | `size="icon"` |

### Step 5: Translate to shadcn Conventions

**5a. Component Usage:**

- Import components from `@/components/ui/[component]`
- Use the exact variant props identified in Step 4d
- Compose complex UIs using multiple shadcn components

**5b. Color Mapping (Figma → shadcn):**

| Figma Color Usage | shadcn Class |
|-------------------|--------------|
| Primary/brand color | `bg-primary text-primary-foreground` |
| Secondary color | `bg-secondary text-secondary-foreground` |
| Background | `bg-background` |
| Text/foreground | `text-foreground` |
| Muted/disabled | `text-muted-foreground` |
| Borders | `border-border` |
| Error/danger | `bg-destructive text-destructive-foreground` |
| Hover backgrounds | `hover:bg-accent` |
| Focus rings | `focus:ring-ring` |

**5c. Spacing Mapping:**

Use Tailwind spacing scale. Map Figma pixel values to nearest Tailwind class:

| Figma Pixels | Tailwind Class |
|--------------|----------------|
| 4px | `p-1`, `m-1`, `gap-1` |
| 8px | `p-2`, `m-2`, `gap-2` |
| 12px | `p-3`, `m-3`, `gap-3` |
| 16px | `p-4`, `m-4`, `gap-4` |
| 20px | `p-5`, `m-5`, `gap-5` |
| 24px | `p-6`, `m-6`, `gap-6` |
| 32px | `p-8`, `m-8`, `gap-8` |

**5d. Border Radius:**

| Figma Radius | shadcn Class |
|--------------|--------------|
| Small (2-4px) | `rounded-sm` |
| Medium (6px) | `rounded-md` |
| Large (8px) | `rounded-lg` |
| Extra large (12px+) | `rounded-xl` |
| Full/pill | `rounded-full` |

**5e. Typography:**

Use shadcn's typography conventions:
- Headings: `text-xl font-semibold`, `text-lg font-medium`, etc.
- Body: `text-sm`, `text-base`
- Muted: `text-sm text-muted-foreground`

### Step 6: Download Required Assets

Download any images, icons, or SVGs from the Figma MCP server.

**Asset Rules:**
- Use `localhost` sources directly when provided by Figma MCP
- For icons, prefer `lucide-react` (shadcn's default icon library)
- Map Figma icons to Lucide equivalents when possible
- DO NOT import additional icon packages unless absolutely necessary

### Step 7: Implement the Component

**Structure:**

```tsx
import { ComponentName } from "@/components/ui/component-name"
import { LucideIcon } from "lucide-react"

interface MyComponentProps {
  // Define props with TypeScript
}

export function MyComponent({ ...props }: MyComponentProps) {
  return (
    // Use shadcn components with proper variants
    // Use only shadcn design tokens for styling
  )
}
```

**Rules:**
- Never use hardcoded colors (no `#hex`, `rgb()`, or color names)
- Never use hardcoded pixel values for design tokens
- Always use shadcn's `cn()` utility for conditional classes
- Extend shadcn components rather than recreating functionality

### Step 8: Validate Against Figma

**Validation Checklist:**

- [ ] All shadcn components correctly identified and installed
- [ ] Variants match Figma specifications
- [ ] Layout matches (spacing, alignment, sizing)
- [ ] Typography matches using shadcn conventions
- [ ] Colors use only shadcn design tokens
- [ ] Interactive states work (hover, active, disabled, focus)
- [ ] Responsive behavior follows Figma constraints
- [ ] Icons render correctly (preferably from Lucide)
- [ ] No hardcoded design values in code

---

## Implementation Rules

### Strict Token Usage

**ALLOWED:**
```tsx
// shadcn design token classes
className="bg-primary text-primary-foreground"
className="border-border rounded-lg"
className="text-muted-foreground"
```

**FORBIDDEN:**
```tsx
// Hardcoded values - NEVER USE
className="bg-[#3b82f6]"
className="text-[#1f2937]"
className="border-[#e5e7eb]"
style={{ backgroundColor: '#3b82f6' }}
```

### Component Organization

- Place custom components in `@/components/` (not in `@/components/ui/`)
- shadcn primitives remain in `@/components/ui/`
- Follow project's file naming conventions

### Extending shadcn Components

When a shadcn component needs customization:

```tsx
import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CustomButtonProps extends ButtonProps {
  // Additional props
}

export function CustomButton({ className, ...props }: CustomButtonProps) {
  return (
    <Button
      className={cn("your-additional-classes", className)}
      {...props}
    />
  )
}
```

### Code Quality Standards

- TypeScript types for all component props
- JSDoc comments for exported components
- Use `cn()` for class merging
- Prefer composition over customization

---

## Examples

### Example 1: Implementing a Button from Figma

**User says:** "Implement this Figma button: https://figma.com/design/kL9xQn2VwM8pYrTb4ZcHjF/DesignSystem?node-id=42-15"

**Workflow:**

1. **Parse URL:** `fileKey="kL9xQn2VwM8pYrTb4ZcHjF"`, `nodeId="42-15"`

2. **Fetch design context:**
   ```
   get_design_context(fileKey="kL9xQn2VwM8pYrTb4ZcHjF", nodeId="42-15")
   ```
   Response indicates: Component="Button", Variant="Primary", Size="Medium", has left icon

3. **Get screenshot:**
   ```
   get_screenshot(fileKey="kL9xQn2VwM8pYrTb4ZcHjF", nodeId="42-15")
   ```

4. **Query shadcn:**
   ```
   shadcn_get_component(component="button")
   ```
   Map: Figma "Primary" → shadcn `variant="default"`, "Medium" → `size="default"`

5. **Install if needed:**
   ```
   shadcn_add_component(component="button")
   ```

6. **Implement:**
   ```tsx
   import { Button } from "@/components/ui/button"
   import { ArrowRight } from "lucide-react"

   export function PrimaryButton() {
     return (
       <Button variant="default" size="default">
         <ArrowRight className="mr-2 h-4 w-4" />
         Get Started
       </Button>
     )
   }
   ```

7. **Validate:** Compare against screenshot for visual parity

---

### Example 2: Implementing a Card Component

**User says:** "Build this card: https://figma.com/design/pR8mNv5KqXzGwY2JtCfL4D/Dashboard?node-id=10-5"

**Workflow:**

1. **Parse URL:** `fileKey="pR8mNv5KqXzGwY2JtCfL4D"`, `nodeId="10-5"`

2. **Fetch design context:**
   ```
   get_design_context(fileKey="pR8mNv5KqXzGwY2JtCfL4D", nodeId="10-5")
   ```
   Response indicates: Component="Card" with header, content, and footer sections

3. **Get screenshot:**
   ```
   get_screenshot(fileKey="pR8mNv5KqXzGwY2JtCfL4D", nodeId="10-5")
   ```

4. **Query and install shadcn components:**
   ```
   shadcn_get_component(component="card")
   shadcn_add_component(component="card")
   shadcn_add_component(component="button")
   ```

5. **Implement:**
   ```tsx
   import {
     Card,
     CardHeader,
     CardTitle,
     CardDescription,
     CardContent,
     CardFooter,
   } from "@/components/ui/card"
   import { Button } from "@/components/ui/button"

   export function FeatureCard() {
     return (
       <Card>
         <CardHeader>
           <CardTitle>Card Title</CardTitle>
           <CardDescription className="text-muted-foreground">
             Card description text
           </CardDescription>
         </CardHeader>
         <CardContent>
           <p>Card content goes here</p>
         </CardContent>
         <CardFooter className="flex justify-end gap-2">
           <Button variant="outline">Cancel</Button>
           <Button>Submit</Button>
         </CardFooter>
       </Card>
     )
   }
   ```

6. **Validate:** Ensure spacing, typography, and colors match screenshot

---

### Example 3: Implementing a Form with Multiple Components

**User says:** "Implement this login form: https://figma.com/design/xY7zKm3NpQrStWv8BcDf2E/Auth?node-id=5-12"

**Workflow:**

1. **Parse URL:** `fileKey="xY7zKm3NpQrStWv8BcDf2E"`, `nodeId="5-12"`

2. **Fetch metadata (complex form):**
   ```
   get_metadata(fileKey="xY7zKm3NpQrStWv8BcDf2E", nodeId="5-12")
   ```
   Identify child nodes: email input, password input, checkbox, button

3. **Fetch design context for each:**
   ```
   get_design_context(fileKey="xY7zKm3NpQrStWv8BcDf2E", nodeId="5-13") // Email
   get_design_context(fileKey="xY7zKm3NpQrStWv8BcDf2E", nodeId="5-14") // Password
   get_design_context(fileKey="xY7zKm3NpQrStWv8BcDf2E", nodeId="5-15") // Checkbox
   get_design_context(fileKey="xY7zKm3NpQrStWv8BcDf2E", nodeId="5-16") // Button
   ```

4. **Get screenshot:**
   ```
   get_screenshot(fileKey="xY7zKm3NpQrStWv8BcDf2E", nodeId="5-12")
   ```

5. **Install all required components:**
   ```
   shadcn_add_component(component="card")
   shadcn_add_component(component="input")
   shadcn_add_component(component="label")
   shadcn_add_component(component="checkbox")
   shadcn_add_component(component="button")
   ```

6. **Implement:**
   ```tsx
   import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
   import { Input } from "@/components/ui/input"
   import { Label } from "@/components/ui/label"
   import { Checkbox } from "@/components/ui/checkbox"
   import { Button } from "@/components/ui/button"

   export function LoginForm() {
     return (
       <Card className="w-full max-w-md">
         <CardHeader>
           <CardTitle>Sign In</CardTitle>
         </CardHeader>
         <CardContent className="space-y-4">
           <div className="space-y-2">
             <Label htmlFor="email">Email</Label>
             <Input
               id="email"
               type="email"
               placeholder="name@example.com"
             />
           </div>
           <div className="space-y-2">
             <Label htmlFor="password">Password</Label>
             <Input
               id="password"
               type="password"
             />
           </div>
           <div className="flex items-center space-x-2">
             <Checkbox id="remember" />
             <Label
               htmlFor="remember"
               className="text-sm text-muted-foreground"
             >
               Remember me
             </Label>
           </div>
           <Button className="w-full">Sign In</Button>
         </CardContent>
       </Card>
     )
   }
   ```

7. **Validate:** Check all spacing, input styles, and button variants match

---

## Common Issues and Solutions

### Issue: Figma component has no direct shadcn equivalent

**Solution:** Compose from multiple shadcn primitives or create a custom component using shadcn's design tokens exclusively.

### Issue: Figma colors don't map to shadcn tokens

**Solution:** Map to the semantically closest token:
- Brand colors → `primary`
- Secondary/subtle → `secondary` or `muted`
- Success states → `primary` (or extend theme)
- Error states → `destructive`

### Issue: Figma uses custom icons not in Lucide

**Solution:** Download the SVG from Figma and create a custom icon component. Use `currentColor` for fill to respect shadcn color tokens.

### Issue: Spacing doesn't match exactly

**Solution:** Use the nearest Tailwind spacing class. Pixel-perfect spacing is less important than consistent token usage. Document any notable deviations.

### Issue: shadcn component doesn't have the exact variant

**Solution:** Extend the component using `cn()` and shadcn tokens:
```tsx
<Button className={cn("custom-token-based-styles")}>
```

---

## Best Practices

### Always Query shadcn First

Before implementing, always check the shadcn component's available variants and props. Don't assume—verify.

### Token Consistency Over Pixel Perfection

If matching Figma exactly requires hardcoded values, prefer shadcn tokens with slight visual variance. Document the deviation.

### Leverage Composition

shadcn components are designed for composition. Build complex UIs by combining primitives rather than creating monolithic components.

### Keep shadcn Components Pristine

Never modify files in `@/components/ui/`. Create wrapper components in `@/components/` for customizations.

### Document Mappings

When component or variant mappings aren't obvious, add comments explaining the Figma-to-shadcn translation.

---

## Quick Reference: Figma to shadcn Mapping

| Figma Property | shadcn Approach |
|----------------|-----------------|
| Fill color | `bg-{token}` class |
| Text color | `text-{token}` class |
| Border color | `border-{token}` class |
| Border radius | `rounded-{size}` class |
| Shadow | `shadow-{size}` class |
| Font family | `font-{family}` class |
| Spacing | Tailwind spacing scale |
| Component name | Map to shadcn component |
| Variant property | Map to shadcn variant prop |