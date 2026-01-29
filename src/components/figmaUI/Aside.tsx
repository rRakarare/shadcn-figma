/**
 * Generated from Figma
 * Source: https://www.figma.com/design/p47Lwdw7tC0AaAT1ynftyS/Knowledge?node-id=2143-31510
 * Node: 2143:31510
 * Component: Aside
 */

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Project, type ProjectProps } from "./Project"
import { Plus, ChevronDown, ListFilter, Database, Layers } from "lucide-react"
import { cn } from "@/lib/utils"

export interface AsideProject {
  id: string
  name: string
  count?: number
  isFavorite?: boolean
  primaryTag?: {
    label: string
    icon?: React.ReactNode
  }
  tags?: string[]
  variant?: "default" | "active"
}

export interface AsideProps {
  className?: string
  title?: string
  searchPlaceholder?: string
  filterLabel?: string
  viewLabel?: string
  projects?: AsideProject[]
  onNewProjectClick?: () => void
  onProjectMoreClick?: (projectId: string) => void
  onSearch?: (query: string) => void
  onFilterChange?: () => void
  onViewChange?: () => void
}

const defaultProjects: AsideProject[] = [
  {
    id: "1",
    name: "Operation Neptune Spear",
    isFavorite: true,
    primaryTag: { label: "Datasilo", icon: <Database className="size-4" /> },
    tags: ["Research and Development"],
    variant: "default",
  },
  {
    id: "2",
    name: "Potenzialanalyse Daimler Busses",
    isFavorite: false,
    primaryTag: { label: "Datasilo", icon: <Database className="size-4" /> },
    tags: ["Sales"],
    variant: "active",
  },
  {
    id: "3",
    name: "Task Force Red Wings",
    isFavorite: true,
    primaryTag: { label: "Project", icon: <Layers className="size-4" /> },
    tags: ["Intelligence"],
    variant: "default",
  },
  {
    id: "4",
    name: "Project Viking Conquest",
    isFavorite: true,
    primaryTag: { label: "Datasilo", icon: <Database className="size-4" /> },
    tags: ["Equipment Maintenance"],
    variant: "default",
  },
  {
    id: "5",
    name: "Project Black Hawk Down",
    isFavorite: false,
    primaryTag: { label: "Project", icon: <Layers className="size-4" /> },
    tags: ["Cybersecurity"],
    variant: "active",
  },
  {
    id: "6",
    name: "Mission Enduring Freedom",
    isFavorite: false,
    primaryTag: { label: "Project", icon: <Layers className="size-4" /> },
    tags: ["Mission Planning"],
    variant: "default",
  },
  {
    id: "7",
    name: "Exercise Rolling Thunder",
    isFavorite: true,
    primaryTag: { label: "Datasilo", icon: <Database className="size-4" /> },
    tags: ["Weapon Systems"],
    variant: "default",
  },
  {
    id: "8",
    name: "Operation Anaconda Strike",
    isFavorite: false,
    primaryTag: { label: "Project", icon: <Layers className="size-4" /> },
    tags: ["Base Operations"],
    variant: "default",
  },
  {
    id: "9",
    name: "Mission Guardian Angel",
    isFavorite: true,
    primaryTag: { label: "Datasilo", icon: <Database className="size-4" /> },
    tags: ["Ground Forces"],
    variant: "default",
  },
]

export function Aside({
  className,
  title = "Company Knowledge",
  searchPlaceholder = "Search projects",
  filterLabel = "All Knowledge",
  viewLabel = "View",
  projects = defaultProjects,
  onNewProjectClick,
  onProjectMoreClick,
  onSearch,
  onFilterChange,
  onViewChange,
}: AsideProps) {
  return (
    <aside
      className={cn(
        "flex h-full w-[420px] flex-col items-start bg-white/50",
        className
      )}
    >
      {/* Header Section */}
      <div className="flex w-full flex-col items-start gap-4 p-6">
        {/* Title and New Button */}
        <div className="flex w-full items-center justify-between">
          <h1 className="text-xl font-bold leading-8 tracking-tight text-secondary-foreground">
            {title}
          </h1>
          <Button
            className="h-9 gap-2 rounded-full px-4 shadow-sm"
            onClick={onNewProjectClick}
          >
            <Plus className="size-6" />
            <span className="text-sm font-medium leading-5">New Project</span>
          </Button>
        </div>

        {/* Search Input */}
        <Input
          placeholder={searchPlaceholder}
          className="w-full rounded-xl bg-white shadow-sm"
          onChange={(e) => onSearch?.(e.target.value)}
        />

        {/* Filter Buttons */}
        <div className="flex w-full items-center justify-between">
          <Button
            variant="outline"
            className="h-9 gap-2 rounded-full bg-white px-4 shadow-sm"
            onClick={onFilterChange}
          >
            <span className="text-sm font-medium leading-5">{filterLabel}</span>
            <ChevronDown className="size-6" />
          </Button>
          <Button
            variant="outline"
            className="h-9 gap-2 rounded-full bg-white px-4 shadow-sm"
            onClick={onViewChange}
          >
            <span className="text-sm font-medium leading-5">{viewLabel}</span>
            <ListFilter className="size-6" />
          </Button>
        </div>
      </div>

      {/* Projects List */}
      <div className="flex w-full flex-col items-start border-t border-border">
        {projects.map((project) => (
          <Project
            key={project.id}
            name={project.name}
            count={project.count}
            isFavorite={project.isFavorite}
            primaryTag={project.primaryTag}
            tags={project.tags}
            variant={project.variant}
            onMoreClick={() => onProjectMoreClick?.(project.id)}
          />
        ))}
      </div>
    </aside>
  )
}

export default Aside
