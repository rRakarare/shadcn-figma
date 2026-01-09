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

**CRITICAL:** All implementations must exclusively use these shadcn design tokens. Never use hardcoded color values, spacing pixels, custom CSS variables, or `calc()` expressions.

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

**IMPORTANT:** Only use these Tailwind class names. Never use `calc()` expressions or raw CSS variables in code.

| Tailwind Class | Usage |
|----------------|-------|
| `rounded-sm` | Small radius for subtle rounding |
| `rounded-md` | Medium radius (default for most components) |
| `rounded-lg` | Large radius for cards, dialogs |
| `rounded-xl` | Extra large radius for prominent elements |
| `rounded-full` | Fully rounded (circles, pills, avatars) |

**FORBIDDEN - Never use these in code:**
```tsx
// ❌ WRONG - Do not use calc expressions
className="rounded-[calc(var(--radius)-2px)]"
style={{ borderRadius: 'calc(var(--radius) - 4px)' }}

// ✅ CORRECT - Use Tailwind classes only
className="rounded-md"
className="rounded-lg"
className="rounded-full"
```

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

### Step 3: Output Summary & Get Screenshot

Provide a brief, structured summary (under 15 lines). **Do NOT dump raw JSON or verbose metadata.**

**Example format:**
```
📐 Design Analysis Complete

**Components detected:**
- Button (Primary variant, Medium size)
- Input (2 instances)
- Card container
- Icon: ArrowRight

**Layout:** Vertical stack, 16px gap
**Dimensions:** 400×320px
```

Get screenshot with `get_screenshot(fileKey=":fileKey", nodeId="1-2")` and keep it as visual reference throughout implementation.

### Step 4: Ask for Component Name

**MANDATORY:** After analyzing the design, ask the user for the component name using the AskUserQuestion tool.

**Use AskUserQuestion with:**
- Suggest a name based on the Figma design (e.g., login form → `LoginForm`, pricing card → `PricingCard`)
- Allow user to select your suggestion or provide their own name
- Use PascalCase following React conventions

**Example:**
```
AskUserQuestion({
  questions: [{
    question: "What would you like to name this component?",
    header: "Name",
    multiSelect: false,
    options: [
      {
        label: "LoginForm (Recommended)",
        description: "Suggested name based on the design analysis"
      },
      {
        label: "Use a different name",
        description: "Enter your own component name"
      }
    ]
  }]
})
```

**Wait for user confirmation before proceeding to implementation.**

### Step 5: Identify and Install shadcn Components

**5a. Map Figma components to shadcn components:**

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

**5b. Query shadcn MCP for component details:**

```
shadcn_get_component(component="button")
```

This returns:
- Component implementation code
- Available variants and props
- Required dependencies

**5c. Check if component is installed:**

If the component is not installed in the project, install it via shadcn MCP:

```
shadcn_add_component(component="button")
```

**5d. Map Figma variants to shadcn variants:**

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

### Step 6: Translate to shadcn Conventions

- Import components from `@/components/ui/[component]`
- Use the exact variant props identified in Step 5d
- Apply design tokens from the **shadcn Design Tokens Reference** section above
- Map Figma colors to semantic tokens (primary, secondary, muted, destructive, etc.)
- Use Tailwind spacing scale (p-1 to p-8, m-1 to m-8, gap-1 to gap-8)
- Use Tailwind border radius classes (`rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-full`)
- **Never use** arbitrary values `[Xpx]` or `calc()` expressions

### Step 7: Download Required Assets

Download any images, icons, or SVGs from the Figma MCP server.

**Asset Rules:**
- Use `localhost` sources directly when provided by Figma MCP
- For icons, prefer `lucide-react` (shadcn's default icon library)
- Map Figma icons to Lucide equivalents when possible
- DO NOT import additional icon packages unless absolutely necessary

### Step 8: Implement the Component

Use the component name confirmed by the user in Step 4.

**Structure:**

```tsx
import { ComponentName } from "@/components/ui/component-name"
import { LucideIcon } from "lucide-react"

interface [UserChosenName]Props {
  // Define props with TypeScript
}

export function [UserChosenName]({ ...props }: [UserChosenName]Props) {
  return (
    // Use shadcn components with proper variants
    // Use only shadcn design tokens for styling
  )
}
```

**Rules:**
- Use the component name the user confirmed in Step 4
- Never use hardcoded colors (no `#hex`, `rgb()`, or color names)
- Never use hardcoded pixel values for design tokens
- Never use `calc()` expressions for radius or spacing
- Always use Tailwind utility classes (`rounded-md`, `rounded-lg`, etc.)
- Always use shadcn's `cn()` utility for conditional classes
- Extend shadcn components rather than recreating functionality

### Step 9: Validate Against Figma

**Validation Checklist:**

- [ ] Component uses the name confirmed by the user
- [ ] All shadcn components correctly identified and installed
- [ ] Variants match Figma specifications
- [ ] Layout matches (spacing, alignment, sizing)
- [ ] Typography matches using shadcn conventions
- [ ] Colors use only shadcn design tokens
- [ ] Border radius uses only Tailwind classes (no calc expressions)
- [ ] Interactive states work (hover, active, disabled, focus)
- [ ] Responsive behavior follows Figma constraints
- [ ] Icons render correctly (preferably from Lucide)
- [ ] No hardcoded design values in code

### Step 10: Ask About Component Placement

**MANDATORY:** After component is built and validated, ask where to place it.

**Prompt:**
> "✅ Component `[ComponentName]` is ready! Where would you like me to place this component?
> - Specific route/page? (e.g., `/dashboard`)
> - Specific file path?
> - Keep it in `components/` for now?"

**Then:**
- Route specified → Find/create page file, import and add component
- File path specified → Open file, add import, insert component
- "Just components" → Leave in `@/components/[ComponentName].tsx`

**Wait for user response before making file changes.**

---

## Implementation Rules

### Core Principles

1. **Use shadcn design tokens exclusively** - Never hardcode colors, use `bg-primary`, `text-foreground`, etc.
2. **Use Tailwind utilities only** - `rounded-md` instead of `rounded-[8px]` or `calc()` expressions
3. **Place custom components in `@/components/`** - Keep `@/components/ui/` for shadcn primitives only
4. **Extend with `cn()` utility** - For conditional/merged classes
5. **TypeScript all props** - Define interfaces for component props
6. **Prefer composition** - Combine shadcn primitives rather than recreating functionality

---

## Workflow Summary Checklist

Before starting any implementation, ensure you complete these steps in order:

- [ ] **Step 1:** Parse Figma URL to get file key and node ID
- [ ] **Step 2:** Fetch Figma design context
- [ ] **Step 3:** Output concise summary + get screenshot
- [ ] **Step 4:** Ask user for component name (suggest one based on design) — **WAIT FOR RESPONSE**
- [ ] **Step 5:** Identify and install shadcn components
- [ ] **Step 6-7:** Translate to shadcn conventions and download assets
- [ ] **Step 8:** Implement using the confirmed component name
- [ ] **Step 9:** Validate against Figma screenshot
- [ ] **Step 10:** Ask user where to place the component — **WAIT FOR RESPONSE**

---

## Examples

### Example 1: Implementing a Button from Figma

**User says:** "Implement this Figma button: https://figma.com/design/kL9xQn2VwM8pYrTb4ZcHjF/DesignSystem?node-id=42-15"

**Workflow:**

1. **Parse URL:** `fileKey="kL9xQn2VwM8pYrTb4ZcHjF"`, `nodeId="42-15"`

2. **Fetch design context**

3. **Output summary:**
   ```
   📐 Design Analysis Complete
   
   **Components detected:**
   - Button (Primary variant, Medium size)
   - Icon: ArrowRight (right position)
   
   **Layout:** Horizontal, 8px gap
   **Dimensions:** 140×40px
   ```

4. **Get screenshot for reference**

5. **Ask for name:**
   > "What would you like to name this component? Based on the design, I'd suggest `CTAButton` — does that work?"
   
   *User confirms: "Yes, CTAButton is fine"*

6. **Query shadcn and map:**
   Figma "Primary" → shadcn `variant="default"`, "Medium" → `size="default"`

7. **Install if needed:**
   ```
   shadcn_add_component(component="button")
   ```

8. **Implement:**
   ```tsx
   import { Button } from "@/components/ui/button"
   import { ArrowRight } from "lucide-react"

   export function CTAButton() {
     return (
       <Button variant="default" size="default">
         Get Started
         <ArrowRight className="ml-2 h-4 w-4" />
       </Button>
     )
   }
   ```

9. **Validate against screenshot**

10. **Ask about placement:**
    > "✅ Component `CTAButton` is ready! Where would you like me to place this component?"
    
    *User responds: "Add it to the hero section on the home page"*
    
    → Open `src/app/page.tsx`, import `CTAButton`, add to hero section

---

### Example 2: Implementing a Card Component

**User says:** "Build this card: https://figma.com/design/pR8mNv5KqXzGwY2JtCfL4D/Dashboard?node-id=10-5"

**Workflow:**

1. **Parse URL:** `fileKey="pR8mNv5KqXzGwY2JtCfL4D"`, `nodeId="10-5"`

2. **Fetch design context**

3. **Output summary:**
   ```
   📐 Design Analysis Complete
   
   **Components detected:**
   - Card container
   - CardHeader with title
   - CardDescription (muted text)
   - CardContent area
   - CardFooter with 2 Buttons (Outline + Default)
   
   **Layout:** Vertical stack, 16px padding, 12px internal gaps
   **Dimensions:** 380×280px
   ```

4. **Get screenshot**

5. **Ask for name:**
   > "What would you like to name this component? Based on the design, I'd suggest `FeatureCard` — does that work?"
   
   *User confirms*

6. **Install all required components:**
   ```
   shadcn_add_component(component="card")
   shadcn_add_component(component="button")
   ```

7. **Implement:**
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
       <Card className="w-full max-w-md">
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

8. **Validate against screenshot**

9. **Ask about placement:**
   > "✅ Component `FeatureCard` is ready! Where would you like me to place this component?"

---

### Example 3: Implementing a Form with Multiple Components

**User says:** "Implement this login form: https://figma.com/design/xY7zKm3NpQrStWv8BcDf2E/Auth?node-id=5-12"

**Workflow:**

1. **Parse URL and fetch metadata for complex form**

2. **Fetch design context for child nodes**

3. **Output summary:**
   ```
   📐 Design Analysis Complete
   
   **Components detected:**
   - Card (container)
   - Input × 2 (Email, Password)
   - Label × 2
   - Checkbox with label ("Remember me")
   - Button (Primary, full-width)
   
   **Layout:** Vertical stack, 16px gaps
   **Dimensions:** 400×320px
   ```

4. **Get screenshot**

5. **Ask for name:**
   > "What would you like to name this component? Based on the design, I'd suggest `LoginForm` — does that work?"
   
   *User confirms*

6. **Install all required components:**
   ```
   shadcn_add_component(component="card")
   shadcn_add_component(component="input")
   shadcn_add_component(component="label")
   shadcn_add_component(component="checkbox")
   shadcn_add_component(component="button")
   ```

7. **Implement:**
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

8. **Validate against screenshot**

9. **Ask about placement:**
   > "✅ Component `LoginForm` is ready! Where would you like me to place this component?"
   
   *User responds: "Put it at /login route"*
   
   → Create or update `src/app/login/page.tsx` with the component

---

## Common Issues and Solutions

| Issue | Solution |
|-------|----------|
| No direct shadcn equivalent | Compose from multiple primitives using design tokens |
| Colors don't map to tokens | Map semantically: brand→`primary`, subtle→`muted`, errors→`destructive` |
| Custom icons (not in Lucide) | Download SVG from Figma, use `currentColor` for fill |
| Spacing mismatch | Use nearest Tailwind class—token consistency > pixel perfection |
| Missing variant | Extend with `cn()` and shadcn tokens: `<Button className={cn("...")}` |
| Non-standard radius | Map to nearest: 2-4px→`sm`, 5-7px→`md`, 8-10px→`lg`, 12px+→`xl`, circle→`full` |

---

## Best Practices

1. **Fetch first, then ask** - Analyze Figma design BEFORE suggesting component name
2. **Query shadcn first** - Check available variants/props before implementing
3. **Tokens over pixels** - Prefer shadcn tokens with slight variance over hardcoded values
4. **Leverage composition** - Combine primitives rather than creating monolithic components
5. **Keep ui/ pristine** - Never modify `@/components/ui/`, create wrappers in `@/components/`
6. **Document mappings** - Add comments for non-obvious Figma-to-shadcn translations
7. **Always offer placement** - Ask where to place the finished component

---

## Quick Reference: Figma to shadcn Mapping

| Figma Property | shadcn Approach |
|----------------|-----------------|
| Fill color | `bg-{token}` class |
| Text color | `text-{token}` class |
| Border color | `border-{token}` class |
| Border radius | `rounded-{sm\|md\|lg\|xl\|full}` class |
| Shadow | `shadow-{size}` class |
| Font family | `font-{family}` class |
| Spacing | Tailwind spacing scale |
| Component name | Map to shadcn component |
| Variant property | Map to shadcn variant prop |

