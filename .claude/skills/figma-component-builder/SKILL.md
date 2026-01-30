---
name: figma-component-builder
description: Builds complete React component hierarchy from Figma. Use when user wants to "build components from Figma", "implement Figma design tree", "build all nested components", or provides a Figma URL asking for all custom child components to be built. Coordinates the component-builder subagent for each custom component with dependency management.
metadata:
  mcp-server: figma, figma-desktop
---

# Figma Component Builder

Build a complete React/Tailwind component hierarchy from Figma, handling nested custom components with parallel subagent coordination.

## When to Use

- User wants to build **all** components in a Figma design tree
- User says "build components from Figma", "implement all nested components", "build the whole tree"
- Design has multiple custom (non-library) child components that need separate files
- User wants each component in its own file with proper imports

## Prerequisites

- Figma MCP server connected
- Python 3.8+ available
- `FIGMA_ACCESS_TOKEN` env variable (or in `.env` file)
- User provides Figma URL: `https://figma.com/design/:fileKey/:fileName?node-id=X-Y`

## Workflow Overview

```
User provides Figma URL
        |
        v
+-------------------------+
| 1. Find custom instances |  (find_custom_instances.py)
+-----------+-------------+
            |
            v
+-------------------------+
| 2. Build dependency graph|  (analyze_dependencies.py)
+-----------+-------------+
            |
            v
+-------------------------------------------------+
| 3. Spawn component-builder subagent in waves    |
|    (parallel per wave)                          |
|                                                 |
|   Wave 0: [Leaf components - no dependencies]   |
|   Wave 1: [Components depending on Wave 0]      |
|   Wave N: [Root component]                      |
+-----------+-------------------------------------+
            |
            v
+-------------------------+
| 4. Replace placeholders  |  (replace_placeholder.py)
+-------------------------+
            |
            v
+-------------------------+
| 5. Final assembly        |
+-------------------------+
```

## Step-by-Step Workflow

### Step 0: Detect Output Directory

Before creating tasks, determine the correct output path based on the project's path alias configuration:

1. Read `tsconfig.json` and check `compilerOptions.paths`
2. If `@/*` maps to `./src/*`, use output path: `src/components/figmaUI/<Component>.tsx`
3. Otherwise use: `components/figmaUI/<Component>.tsx`

Store this base path for all component outputs. The import path should always use the alias format (e.g., `@/components/figmaUI/ComponentName`).

### Step 1: Parse Figma URL

Extract from URL `https://figma.com/design/:fileKey/:fileName?node-id=X-Y`:
- **fileKey**: segment after `/design/`
- **nodeId**: value of `node-id` param (convert `-` to `:` for scripts)

### Step 2: Find Custom Instances

Run the find_custom_instances script to discover all custom (non-library) components:

```bash
python ./.claude/skills/find-custom-instances/scripts/find_custom_instances.py <file_key> <node_id>
```

This outputs:
- Input component name and URL
- List of all custom instances with names and Figma URLs

**If no custom instances found:** Proceed to build only the root component using the `component-builder` subagent directly.

### Step 3: Analyze Dependencies

Run the dependency analyzer to determine build order:

```bash
python ./.claude/skills/figma-component-builder/scripts/analyze_dependencies.py <file_key> <root_node_id> --output ./figma-output/dependencies.json
```

This outputs `dependencies.json`:
```json
{
  "root": {
    "node_id": "2143:31510",
    "name": "Aside",
    "figma_url": "https://..."
  },
  "components": {
    "2143:31510": {
      "name": "Aside",
      "figma_url": "https://...",
      "depends_on": ["2138:6227"],
      "depended_by": []
    },
    "2138:6227": {
      "name": "Project",
      "figma_url": "https://...",
      "depends_on": ["2138:21369", "2138:21718"],
      "depended_by": ["2143:31510"]
    }
  },
  "build_waves": [
    ["2138:21369", "2138:21718"],
    ["2138:6227"],
    ["2143:31510"]
  ]
}
```

### Step 3.5: Check for Existing Components

Before creating tasks, check if any components already exist:

```bash
# List existing components
ls src/components/figmaUI/*.tsx 2>/dev/null || ls components/figmaUI/*.tsx 2>/dev/null
```

For each component in the dependency graph:
1. Convert Figma name to PascalCase (e.g., `<Assistant Card>` → `AssistantCard`)
2. Check if `{base_path}/{ComponentName}.tsx` exists
3. If exists:
   - Mark as "existing" - do NOT spawn subagent for it
   - Other components can still depend on it (imports will work)
   - Print: `✓ {ComponentName} already exists - skipping build`

**Modified task creation:** Only create tasks for components that don't exist. Components that DO exist should still be tracked so parent components know to import them.

### Step 4: Create Tasks for Each Component

Use `TaskCreate` to create a task for each component that doesn't already exist:

```
For each component in dependency graph:
  TaskCreate:
    subject: "Build <ComponentName> from Figma"
    description: |
      Build React component from Figma.
      - Name: <name>
      - Figma URL: <figma_url>
      - Node ID: <node_id>
      - Output: <detected_base_path>/<ComponentName>.tsx  (e.g., src/components/figmaUI/ComponentName.tsx)
      - Subcomponents: <list of depends_on names, or "None">
    activeForm: "Building <ComponentName>"
```

Then use `TaskUpdate` to set `blockedBy` based on `depends_on`:

```
For each component with dependencies:
  TaskUpdate:
    taskId: <component_task_id>
    addBlockedBy: [<dependency_task_ids>]
```

### Step 5: Launch Wave 0 (Leaves) with Subagents

Components in Wave 0 have no dependencies. Launch `component-builder` subagent for each using multiple Task tool calls in a **single message**:

```
Task(
  subagent_type="component-builder",
  prompt="Build component: ProjectHeader
    - Figma URL: https://...
    - File Key: p47Lwdw7tC0AaAT1ynftyS
    - Node ID: 2138:21369
    - Output: components/figmaUI/ProjectHeader.tsx
    - Subcomponents: None (leaf component)
    - Task ID: <task_id>",
  description="Build ProjectHeader"
)
```

**IMPORTANT:** Launch all Wave 0 components in parallel by including multiple Task calls in ONE message.

### Step 6: Monitor and Launch Subsequent Waves

After launching a wave:

1. Use `TaskList` to check task status
2. When all tasks in current wave are `completed`, launch next wave
3. For non-leaf components, include the subcomponent list in the prompt

**Example for non-leaf component:**
```
Task(
  subagent_type="component-builder",
  prompt="Build component: Project
    - Figma URL: https://...
    - File Key: p47Lwdw7tC0AaAT1ynftyS
    - Node ID: 2138:6227
    - Output: components/figmaUI/Project.tsx
    - Subcomponents to leave as placeholders:
      - ProjectHeader (nodeId: 2138:21369)
      - ProjectTag (nodeId: 2138:21718)
    - Task ID: <task_id>",
  description="Build Project"
)
```

### Step 7: Replace Placeholders After Each Wave

When a wave completes, replace placeholders in parent components:

```bash
python ./.claude/skills/figma-component-builder/scripts/replace_placeholder.py \
  "src/components/figmaUI/Project.tsx" \
  --child-name "ProjectHeader" \
  --child-path '@/components/figmaUI/ProjectHeader'
```

**IMPORTANT (Windows/Git Bash):** Use single quotes around paths containing `@` to prevent shell expansion. The `@` symbol can be misinterpreted by Git Bash on Windows.

This:
1. Adds import: `import { ProjectHeader } from "@/components/figmaUI/ProjectHeader"`
2. Replaces **ALL** `{/* @figma-placeholder name="ProjectHeader" ... */}` with `<ProjectHeader />`
   - If a component uses the same child 12 times, all 12 placeholders are replaced

**Run this for each child that just completed, updating all parents that use it.**

### Step 8: Final Validation

After all waves complete:

1. Check no placeholder comments remain:
   ```bash
   grep -r "@figma-placeholder" components/figmaUI/
   ```

2. Verify imports are correct in all files

3. Report summary:
   ```
   Built X components (Y skipped):
   - Aside.tsx (root)
   - Project.tsx
   - ProjectHeader.tsx
   - ✓ ProjectTag.tsx (already existed)
   ```

## Output Structure

If `tsconfig.json` has `@/*` -> `./src/*`:
```
src/components/figmaUI/
├── Aside.tsx           # Root component (imports Project)
├── Project.tsx         # Imports ProjectHeader, ProjectTag
├── ProjectHeader.tsx   # Leaf component
├── ProjectTag.tsx      # Leaf component
└── index.ts            # Optional barrel export
```

Otherwise:
```
components/figmaUI/
├── Aside.tsx           # Root component (imports Project)
├── Project.tsx         # Imports ProjectHeader, ProjectTag
├── ProjectHeader.tsx   # Leaf component
├── ProjectTag.tsx      # Leaf component
└── index.ts            # Optional barrel export
```

## Monitoring Subagent Progress

### How to see running subagents:
1. **TaskList**: Shows all tasks with status (`pending`, `in_progress`, `completed`)
2. **During execution**: The CLI shows spinner with task's `activeForm` text
3. **Background mode**: Use `run_in_background: true` then poll with `TaskOutput`

### Why components may run sequentially:
- Components in DIFFERENT waves MUST run sequentially (dependencies)
- Components in the SAME wave CAN run in parallel
- Example: If Wave 0 has [A, B, C], all 3 launch in parallel
- Example: If Wave 0 has [A] and Wave 1 has [B], they run sequentially because B depends on A

## Scripts Reference

### analyze_dependencies.py

Builds dependency graph and determines build wave order.

```bash
python ./.claude/skills/figma-component-builder/scripts/analyze_dependencies.py <file_key> <root_node_id> [options]

Options:
  --output PATH    Output JSON file (default: stdout)
```

### insert_placeholders.py

Replaces subcomponent JSX blocks with placeholder comments. Used by the `component-builder` subagent.

```bash
python ./.claude/skills/figma-component-builder/scripts/insert_placeholders.py <component.tsx> \
  --subcomponent-names "Name1,Name2" \
  --subcomponent-node-ids "123:456,789:012"

# Or with JSON file:
python ./.claude/skills/figma-component-builder/scripts/insert_placeholders.py <component.tsx> \
  --subcomponents subcomponents.json
```

### replace_placeholder.py

Replaces a placeholder with actual import and component usage.

```bash
python ./.claude/skills/figma-component-builder/scripts/replace_placeholder.py <parent.tsx> \
  --child-name <Name> \
  --child-path <import/path>
```

## Subagent Coordination

This skill uses the `component-builder` subagent (defined in `.claude/agents/component-builder.md`) to build individual components. The subagent:

1. Receives component info (URL, name, output path, subcomponents)
2. Calls Figma MCP to get design context
3. Processes the code
4. Inserts placeholders for subcomponents
5. Saves to the output path
6. Marks its task as completed

**Key points:**
- Subagents run in their own context (isolated from main conversation)
- Launch multiple subagents in parallel by using multiple Task calls in one message
- Subagents cannot spawn other subagents (orchestration stays here)
- Use TaskList to monitor progress between waves

## Error Handling

### No Custom Instances Found
Build only the root component directly.

### Circular Dependencies
The analyzer will error. Report to user and ask which component to break out.

### Subagent Failure
If a subagent fails:
1. Task remains incomplete
2. Check error in task description
3. Retry the specific component
4. Do not proceed to dependent components

### Large MCP Responses
Subagents handle this by copying temp files and using Python processing.

## Example Session

User: "Build all components from https://figma.com/design/p47Lwdw7tC0AaAT1ynftyS/Knowledge?node-id=2143-31510"

**Step 1:** Parse URL
- fileKey: `p47Lwdw7tC0AaAT1ynftyS`
- nodeId: `2143:31510`

**Step 2:** Find custom instances
```
Custom Instances Found (2):
  1. Project - https://...?node-id=2138-6227
  2. ProjectTag - https://...?node-id=2138-21718
```

**Step 3:** Analyze dependencies
```json
{
  "build_waves": [
    ["2138:21718"],      // Wave 0: ProjectTag (leaf)
    ["2138:6227"],       // Wave 1: Project (uses ProjectTag)
    ["2143:31510"]       // Wave 2: Aside (root, uses Project)
  ]
}
```

**Step 4:** Create tasks
- Task 1: "Build ProjectTag from Figma"
- Task 2: "Build Project from Figma" (blockedBy: Task 1)
- Task 3: "Build Aside from Figma" (blockedBy: Task 2)

**Step 5:** Launch Wave 0
```
Task(subagent_type="component-builder", prompt="Build ProjectTag...", description="Build ProjectTag")
```

**Step 6:** Wave 0 completes, launch Wave 1
```
Task(subagent_type="component-builder", prompt="Build Project with placeholder for ProjectTag...", description="Build Project")
```

**Step 7:** Replace placeholder in Project
```bash
python .../replace_placeholder.py "src/components/figmaUI/Project.tsx" --child-name ProjectTag --child-path '@/components/figmaUI/ProjectTag'
```

**Step 8:** Wave 1 completes, launch Wave 2
```
Task(subagent_type="component-builder", prompt="Build Aside with placeholder for Project...", description="Build Aside")
```

**Step 9:** Replace placeholder in Aside
```bash
python .../replace_placeholder.py "src/components/figmaUI/Aside.tsx" --child-name Project --child-path '@/components/figmaUI/Project'
```

**Step 10:** Done! Report:
```
Built 3 components (0 skipped):
- src/components/figmaUI/Aside.tsx (root)
- src/components/figmaUI/Project.tsx
- src/components/figmaUI/ProjectTag.tsx
```

**Example with existing components:**
```
Built 2 components (1 skipped):
- src/components/figmaUI/Aside.tsx (root)
- src/components/figmaUI/Project.tsx
- ✓ src/components/figmaUI/ProjectTag.tsx (already existed)
```
