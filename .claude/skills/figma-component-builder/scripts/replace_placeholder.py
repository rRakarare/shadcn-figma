#!/usr/bin/env python3
"""
Replace a placeholder comment with an actual component import and usage.

After a child component is built, use this script to update parent components
that have placeholders for that child.

Usage:
    python replace_placeholder.py <parent.tsx> --child-name <Name> --child-path <import/path>

Example:
    python replace_placeholder.py ./components/Project.tsx \\
        --child-name "ProjectHeader" \\
        --child-path "@/components/figmaUI/ProjectHeader"

This will:
1. Add import: import { ProjectHeader } from "@/components/figmaUI/ProjectHeader"
2. Replace: {/* @figma-placeholder name="ProjectHeader" ... */} with <ProjectHeader />
"""

import argparse
import re
import sys
from pathlib import Path
from typing import Optional, Tuple


def fix_git_bash_path(path: str) -> str:
    """Fix Git Bash path expansion on Windows.

    Git Bash expands @/ to @C:/Program Files/Git/ which breaks imports.
    This detects and fixes the mangled pattern.
    """
    # Pattern: @C:/Program Files/Git/ or @/c/Program Files/Git/
    # Also handles: @/c/Program Files/Git/ (unix-style path in Git Bash)
    mangled_pattern = r'^@[A-Za-z]?:?/?(?:[a-zA-Z]/)?[Pp]rogram [Ff]iles/[Gg]it/'
    if re.match(mangled_pattern, path, re.IGNORECASE):
        # Extract the actual path after the Git installation prefix
        # e.g., "@C:/Program Files/Git/components/..." -> "@/components/..."
        match = re.search(r'[Gg]it/(.+)$', path)
        if match:
            return '@/' + match.group(1)
    return path


def get_placeholder_pattern(child_name: str) -> str:
    """Get the regex pattern for placeholder comments."""
    # Match: {/* @figma-placeholder name="ChildName" nodeId="..." */}
    return rf'\{{/\*\s*@figma-placeholder\s+name="{re.escape(child_name)}"\s+nodeId="[^"]*"\s*\*/\}}'


def find_placeholder(code: str, child_name: str) -> Optional[re.Match]:
    """Find a placeholder comment for the given child name."""
    pattern = get_placeholder_pattern(child_name)
    return re.search(pattern, code)


def count_placeholders(code: str, child_name: str) -> int:
    """Count how many placeholders exist for the given child name."""
    pattern = get_placeholder_pattern(child_name)
    return len(re.findall(pattern, code))


def replace_all_placeholders(code: str, child_name: str) -> Tuple[str, int]:
    """
    Replace ALL placeholder comments for the given child name.

    Returns:
        Tuple of (modified_code, replacement_count)
    """
    pattern = get_placeholder_pattern(child_name)
    component_usage = f'<{child_name} />'
    new_code, count = re.subn(pattern, component_usage, code)
    return new_code, count


def find_import_section(code: str) -> Tuple[int, int]:
    """
    Find the position to insert a new import statement.
    Returns (insert_position, last_import_end).
    """
    # Find all import statements
    import_pattern = r'^import\s+.*?[\'"][^"\']+[\'"];?\s*$'
    matches = list(re.finditer(import_pattern, code, re.MULTILINE))

    if matches:
        # Insert after the last import
        last_import = matches[-1]
        return last_import.end(), last_import.end()
    else:
        # No imports found, insert at the beginning (after any comments/directives)
        # Skip past any leading comments or "use client" directive
        lines = code.split('\n')
        insert_line = 0

        for i, line in enumerate(lines):
            stripped = line.strip()
            if stripped.startswith('//') or stripped.startswith('/*') or stripped.startswith('*'):
                insert_line = i + 1
            elif stripped.startswith('"use ') or stripped.startswith("'use "):
                insert_line = i + 1
            elif stripped:
                break

        if insert_line == 0:
            return 0, 0

        # Calculate position
        pos = sum(len(lines[i]) + 1 for i in range(insert_line))
        return pos, pos


def has_import(code: str, child_name: str, child_path: str) -> bool:
    """Check if the import already exists."""
    # Check for named import
    pattern1 = rf'import\s+\{{\s*{re.escape(child_name)}\s*\}}\s+from\s+[\'\"]{re.escape(child_path)}[\'\"]'
    # Check for default import
    pattern2 = rf'import\s+{re.escape(child_name)}\s+from\s+[\'\"]{re.escape(child_path)}[\'\"]'

    return bool(re.search(pattern1, code)) or bool(re.search(pattern2, code))


def add_import(code: str, child_name: str, child_path: str) -> str:
    """Add an import statement for the child component."""
    if has_import(code, child_name, child_path):
        return code

    import_statement = f'import {{ {child_name} }} from "{child_path}";\n'

    insert_pos, _ = find_import_section(code)

    # Add newline before if inserting after existing imports
    if insert_pos > 0 and code[insert_pos-1] != '\n':
        import_statement = '\n' + import_statement

    return code[:insert_pos] + import_statement + code[insert_pos:]


def replace_placeholder(
    parent_path: str,
    child_name: str,
    child_path: str,
    in_place: bool = True
) -> Tuple[str, int]:
    """
    Replace ALL placeholders with an actual component.

    Args:
        parent_path: Path to the parent component file
        child_name: Name of the child component (e.g., "ProjectHeader")
        child_path: Import path for the child (e.g., "@/components/figmaUI/ProjectHeader")
        in_place: If True, modify file in place. If False, return modified code.

    Returns:
        Tuple of (modified_code, replacement_count)
    """
    # Fix Git Bash path mangling on Windows
    child_path = fix_git_bash_path(child_path)

    with open(parent_path, 'r', encoding='utf-8') as f:
        code = f.read()

    # Count and replace ALL placeholders
    code, replacement_count = replace_all_placeholders(code, child_name)

    if replacement_count == 0:
        print(f"Warning: No placeholder found for {child_name} in {parent_path}", file=sys.stderr)
        return code, 0

    # Add import (only once, regardless of how many placeholders were replaced)
    code = add_import(code, child_name, child_path)

    if in_place:
        with open(parent_path, 'w', encoding='utf-8') as f:
            f.write(code)

    return code, replacement_count


def main():
    parser = argparse.ArgumentParser(
        description="Replace a placeholder comment with a component import and usage"
    )
    parser.add_argument("parent", help="Path to the parent component file")
    parser.add_argument(
        "--child-name", "-n",
        required=True,
        help="Name of the child component"
    )
    parser.add_argument(
        "--child-path", "-p",
        required=True,
        help="Import path for the child component"
    )
    parser.add_argument(
        "--dry-run", "-d",
        action="store_true",
        help="Print modified code instead of writing to file"
    )

    args = parser.parse_args()

    if not Path(args.parent).exists():
        print(f"Error: File not found: {args.parent}", file=sys.stderr)
        sys.exit(1)

    result, replacement_count = replace_placeholder(
        args.parent,
        args.child_name,
        args.child_path,
        in_place=not args.dry_run
    )

    if args.dry_run:
        print(result)
    else:
        print(f"Replaced {replacement_count} placeholder(s) for {args.child_name} in {args.parent}")
        print(f"  Added import from: {args.child_path}")


if __name__ == "__main__":
    main()
