/**
 * Generated from Figma
 * Source: https://www.figma.com/design/p47Lwdw7tC0AaAT1ynftyS/Knowledge?node-id=2138-6227
 * Node: 2138:6227
 * Component: Project
 */

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Crown, Star, Database, MoreVertical } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ProjectProps {
  className?: string
  variant?: "default" | "active"
  name?: string
  count?: number
  isFavorite?: boolean
  primaryTag?: {
    label: string
    icon?: React.ReactNode
  }
  tags?: string[]
  onMoreClick?: () => void
}

export function Project({
  className,
  variant = "default",
  name = "MyAwesomeProject",
  count = 1,
  isFavorite = true,
  primaryTag = { label: "Datasilo", icon: <Database className="size-4" /> },
  tags = ["Finance", "HR", "Marketing"],
  onMoreClick,
}: ProjectProps) {
  const isActive = variant === "active"

  return (
    <div
      className={cn(
        "relative flex w-full gap-4 border-b border-border px-6 py-5",
        isActive && "flex-col bg-foreground/5",
        className
      )}
    >
      {/* Green accent border */}
      <div
        className={cn(
          "absolute bottom-[-1px] top-0 bg-green-600",
          isActive ? "left-0 w-2" : "-left-2 w-1"
        )}
      />

      {/* Project Info */}
      <div
        className={cn(
          "flex flex-1 items-start gap-4",
          isActive && "w-full shrink-0"
        )}
      >
        <div className="flex flex-1 flex-col items-start justify-center gap-3">
          {/* Project Header */}
          <div className="flex w-full items-center gap-1">
            <Crown className="size-6 shrink-0 text-secondary-foreground" />
            <p className="shrink-0 overflow-hidden text-ellipsis text-sm font-medium leading-5 text-secondary-foreground">
              {name} ({count})
            </p>
            {isFavorite && (
              <Star className="size-6 shrink-0 fill-yellow-500 text-yellow-500" />
            )}
          </div>

          {/* Project Tags */}
          <div className="flex shrink-0 items-start gap-2">
            {/* Primary Tag Container */}
            {primaryTag && (
              <div className="flex shrink-0 items-center gap-[9px]">
                <div className="flex shrink-0 items-center gap-[9px]">
                  <Badge variant="default" className="gap-1 rounded-xl">
                    {primaryTag.icon}
                    <span className="shrink-0 overflow-hidden text-ellipsis text-xs font-medium leading-4">
                      {primaryTag.label}
                    </span>
                  </Badge>
                  <div className="flex h-full flex-row items-center self-stretch">
                    <Separator orientation="vertical" className="h-6" />
                  </div>
                </div>
              </div>
            )}

            {/* Secondary Tags Container */}
            {tags.length > 0 && (
              <div className="flex shrink-0 items-center gap-[9px]">
                <div className="flex shrink-0 items-center gap-[9px]">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="rounded-xl">
                      <span className="shrink-0 overflow-hidden text-ellipsis text-xs font-medium leading-4">
                        {tag}
                      </span>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* More Options Button */}
        <Button
          variant="ghost"
          size="icon"
          className="size-9 shrink-0 rounded-full"
          onClick={onMoreClick}
        >
          <MoreVertical className="size-6" />
        </Button>
      </div>
    </div>
  )
}

export default Project
