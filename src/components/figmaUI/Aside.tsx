/**
 * Generated from Figma
 * Source: https://www.figma.com/design/p47Lwdw7tC0AaAT1ynftyS/?node-id=2143-31510
 * Node: 2143:31510
 */

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, ChevronDown, ListFilter } from "lucide-react";
import Project from "@/components/figmaUI/Project";

export default function Aside({ className }: { className?: string }) {
  return (
    <aside
      className={
        className ||
        "bg-sidebar flex flex-col w-[460px] h-full border-r border-border"
      }
    >
      {/* Header Container */}
      <div className="flex flex-col gap-4 p-6">
        {/* Header */}
        <div className="flex items-center justify-between w-full">
          <h1 className="text-xl font-bold leading-8 text-secondary-foreground tracking-tight">
            Company Knowledge
          </h1>
          <Button className="rounded-full shadow-sm">
            <Plus className="size-5" />
            New Project
          </Button>
        </div>

        {/* Search Input */}
        <Input
          placeholder="Search projects"
          className="rounded-xl shadow-sm bg-white border-input"
        />

        {/* Filters */}
        <div className="flex items-center justify-between w-full">
          <Button
            variant="outline"
            className="rounded-full shadow-sm bg-white"
          >
            All Knowledge
            <ChevronDown className="size-5" />
          </Button>
          <Button
            variant="outline"
            className="rounded-full shadow-sm bg-white"
          >
            View
            <ListFilter className="size-5" />
          </Button>
        </div>
      </div>

      {/* Projects List */}
      <div className="flex flex-col border-t border-border overflow-y-auto  w-fit">
        <Project state="active"  />
        <Project />
        <Project />
        <Project />
        <Project />
        <Project />
        <Project />
        <Project />
        <Project />
        <Project />
      </div>
    </aside>
  );
}
