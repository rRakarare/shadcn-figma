# Figma Component Builder Skill

A powerful orchestration skill that transforms Figma designs into a complete React/shadcn component hierarchy by coordinating multiple subagents.

---

## Overview

The `/figma-component-builder` skill takes a Figma URL and automatically:

1. Discovers all custom (non-library) components in the design tree
2. Analyzes dependencies between components
3. Builds components in parallel waves (respecting dependency order)
4. Handles placeholder replacement as components complete

```
Figma Design Tree          →    React Component Hierarchy
├── Aside                        ├── Aside.tsx
│   └── Project                  ├── Project.tsx
│       ├── ProjectHeader        ├── ProjectHeader.tsx
│       └── ProjectTag           └── ProjectTag.tsx
```

---

## Prerequisites & Setup

### 1. Figma MCP Server

The skill requires the **Figma MCP server** to be configured and running. This provides access to:
- `get_design_context` - Fetches component structure and code hints
- `get_screenshot` - Visual reference for validation
- `get_variable_defs` - Design token definitions

### 2. Figma API Token

A Figma personal access token is required for the Python scripts that analyze the design tree.

**Setup:**
```bash
# Create .env file in project root
echo "FIGMA_TOKEN=your-figma-personal-access-token" >> .env
```

To get a token:
1. Go to Figma → Settings → Account
2. Scroll to "Personal access tokens"
3. Generate a new token with read access

### 3. shadcn MCP Server

The `component-builder` subagent uses the **shadcn MCP server** to:
- Search for matching shadcn/ui components
- View component documentation and examples
- Get installation commands

---

## How It Works

### Orchestration Flow

```
┌─────────────────────────────────────────────────────────────┐
│  1. USER PROVIDES FIGMA URL                                 │
│     https://figma.com/design/xyz/File?node-id=123-456       │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           v
┌─────────────────────────────────────────────────────────────┐
│  2. DISCOVER CUSTOM COMPONENTS                              │
│     Run: find_custom_instances.py                           │
│     → Fetches Figma metadata via API                        │
│     → Identifies non-library (custom) components            │
│     → Returns list of components with Figma URLs            │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           v
┌─────────────────────────────────────────────────────────────┐
│  3. ANALYZE DEPENDENCIES                                    │
│     Run: analyze_dependencies.py                            │
│     → Builds dependency graph                               │
│     → Performs topological sort                             │
│     → Groups components into BUILD WAVES                    │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           v
┌─────────────────────────────────────────────────────────────┐
│  4. CREATE TASK SYSTEM                                      │
│     → TaskCreate for each component                         │
│     → TaskUpdate to set blockedBy relationships             │
│     → Enables dependency-aware parallel execution           │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           v
┌─────────────────────────────────────────────────────────────┐
│  5. WAVE-BASED EXECUTION                                    │
│                                                             │
│     WAVE 0 (Leaf components - no dependencies)              │
│     ┌─────────────┬─────────────┬─────────────┐            │
│     │ Subagent 1  │ Subagent 2  │ Subagent 3  │ ← PARALLEL │
│     │ ProjectTag  │ ProjectBadge│ StatusIcon  │            │
│     └──────┬──────┴──────┬──────┴──────┬──────┘            │
│            └─────────────┼─────────────┘                    │
│                          v                                  │
│     → Replace placeholders in parent components             │
│                          │                                  │
│     WAVE 1 (Depends on Wave 0)                              │
│     ┌─────────────┬─────────────┐                          │
│     │ Subagent 4  │ Subagent 5  │ ← PARALLEL               │
│     │ Project     │ UserCard    │                          │
│     └──────┬──────┴──────┬──────┘                          │
│            └──────┬──────┘                                  │
│                   v                                         │
│     → Replace placeholders                                  │
│                   │                                         │
│     WAVE N (Root component)                                 │
│     ┌─────────────┐                                        │
│     │ Subagent N  │                                        │
│     │ Aside       │                                        │
│     └─────────────┘                                        │
└─────────────────────────────────────────────────────────────┘
```

### The Wave System

Components are grouped into **waves** based on their dependencies:

| Wave | Contains | Execution |
|------|----------|-----------|
| Wave 0 | Leaf components (no dependencies) | All run in parallel |
| Wave 1 | Components depending only on Wave 0 | Waits for Wave 0, then parallel |
| Wave 2 | Components depending on Wave 0+1 | Waits for Wave 1, then parallel |
| Wave N | Root component | Final wave |

**Example dependency tree:**
```
Aside (root)
└── depends on: Project
    └── depends on: ProjectHeader, ProjectTag

Build order:
  Wave 0: [ProjectHeader, ProjectTag]  ← built in parallel
  Wave 1: [Project]                    ← waits, then builds
  Wave 2: [Aside]                      ← waits, then builds
```

---

## The Component-Builder Subagent

Each component is built by an isolated **component-builder** subagent with this workflow:

### Subagent Workflow

```
1. FETCH DESIGN CONTEXT
   └── get_design_context() → JSX structure from Figma
   └── get_screenshot()     → Visual reference

2. DETECT PROJECT CONFIG
   └── Read tsconfig.json for path aliases (@/)
   └── Check JSX mode for React imports

3. IDENTIFY SHADCN COMPONENTS
   └── Scan design for component patterns
   └── Search shadcn registry via MCP
   └── Match Lucide icons

4. APPLY DESIGN TOKENS
   └── Convert hex codes → Tailwind tokens
   └── Use shadcn color system (primary, foreground, etc.)

5. BUILD COMPONENT
   └── Assemble React component with shadcn/ui
   └── Apply Tailwind classes

6. INSERT PLACEHOLDERS (for child components)
   └── Format: {/* @figma-placeholder name="Child" nodeId="123:456" */}

7. VISUAL VALIDATION
   └── Compare output against screenshot

8. SAVE & COMPLETE
   └── Write to output path
   └── Mark task as completed
```

### Placeholder System

When a component has child components that will be built later, placeholders are inserted:

```tsx
// Project.tsx (built in Wave 1)
export default function Project() {
  return (
    <div className="p-4 bg-card">
      {/* @figma-placeholder name="ProjectHeader" nodeId="123:456" */}
      {/* @figma-placeholder name="ProjectTag" nodeId="789:012" */}
    </div>
  );
}
```

After Wave 0 completes, placeholders are replaced:

```tsx
// Project.tsx (after placeholder replacement)
import { ProjectHeader } from "@/components/figmaUI/ProjectHeader";
import { ProjectTag } from "@/components/figmaUI/ProjectTag";

export default function Project() {
  return (
    <div className="p-4 bg-card">
      <ProjectHeader />
      <ProjectTag />
    </div>
  );
}
```

---

## Python Scripts

Located in `.claude/skills/figma-component-builder/scripts/`

| Script | Purpose |
|--------|---------|
| `find_custom_instances.py` | Discovers all custom components in Figma tree |
| `analyze_dependencies.py` | Builds dependency graph and wave structure |
| `insert_placeholders.py` | Replaces child JSX with placeholder comments |
| `replace_placeholder.py` | Replaces placeholders with actual imports/components |

---

## Usage

Invoke the skill with a Figma URL:

```
/figma-component-builder https://figma.com/design/abc123/MyFile?node-id=456-789
```

The skill will:
1. Analyze the design tree starting from that node
2. Discover all custom components
3. Build them in dependency order
4. Output to `components/figmaUI/` (or configured path)

---

## To Improve

### 1. Wave Parallelization Optimization

**Current State:** Components are built wave-by-wave. Wave N must complete entirely before Wave N+1 starts.

**Potential Improvement:** All custom components could theoretically be built in parallel regardless of dependencies. Each component would use placeholders for any child component still being built by another subagent. This could significantly reduce total build time.

**Considerations:**
- Need to investigate if placeholder replacement can happen incrementally as components finish
- May require tracking which components are "pending" vs "complete"
- Could reduce total build time from `O(number_of_waves)` to `O(1)` for subagent launches

**Status:** Needs investigation for time efficiency gains

---

### 2. Python Scripts Refactoring

**Current Issues:**
- Scripts evolved from a different context and may contain unnecessary code
- Need explicit audit of what functionality is still required
- Scripts currently pollute the base folder with intermediate files (gathered Figma MCP/API data)

**Required Actions:**
- [ ] Audit each script for unused code paths
- [ ] Review efficiency of API calls and data processing
- [ ] Evaluate if intermediate data files are necessary or can live in memory/context
- [ ] Consider smarter data sharing between agents (context vs files)
- [ ] **Implement cleanup function** at the end of the skill to remove temporary files

**Current Pollution:**
```
project-root/
├── figma-output/           ← Created by scripts
│   ├── dependencies.json   ← Should be cleaned up
│   └── instances.json      ← Should be cleaned up
```

---

### 3. Component Builder Instructions Clarity

**Current Issues:**
- Subagents sometimes output generic `<button>` instead of shadcn `<Button>`
- Inconsistent export patterns (named vs default exports)

**Required Improvements:**
- [ ] Stricter instructions to ALWAYS use shadcn components when available
- [ ] Define explicit export convention:
  ```tsx
  // Option A: Named export (recommended for tree-shaking)
  export function ComponentName() { ... }

  // Option B: Default export
  export default function ComponentName() { ... }
  ```
- [ ] Add validation step to check for non-shadcn primitives
- [ ] Include explicit mapping: `button → Button`, `input → Input`, etc.

**Example of Current Problem:**
```tsx
// ❌ Current (sometimes)
<button className="...">Click</button>

// ✅ Expected
import { Button } from "@/components/ui/button";
<Button className="...">Click</Button>
```

---

## File Structure

```
.claude/
├── skills/
│   └── figma-component-builder/
│       ├── SKILL.md              # Main orchestration logic
│       ├── README.md             # This documentation
│       └── scripts/
│           ├── find_custom_instances.py
│           ├── analyze_dependencies.py
│           ├── insert_placeholders.py
│           └── replace_placeholder.py
└── agents/
    └── component-builder.md      # Subagent definition
```
