import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Crown, Star, Database, MoreVertical } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ProjectTag {
  label: string
  icon?: React.ReactNode
  variant?: "default" | "outline"
}

export interface ProjectListItemProps {
  name: string
  count?: number
  isFavorite?: boolean
  primaryTag?: {
    label: string
    icon?: React.ReactNode
  }
  tags?: string[]
  isHovered?: boolean
  onMoreClick?: () => void
  className?: string
}

export function ProjectListItem({
  name,
  count,
  isFavorite = false,
  primaryTag,
  tags = [],
  isHovered = false,
  onMoreClick,
  className,
}: ProjectListItemProps) {
  return (
    <div
      className={cn(
        "relative flex items-start gap-4 border-b border-border px-6 py-5 transition-colors",
        isHovered && "bg-foreground/5",
        className
      )}
    >
      {/* Green accent border */}
      <div
        className={cn(
          "absolute top-0 bottom-[-1px] w-2 bg-green-600",
          isHovered ? "left-0" : "-left-2"
        )}
      />

      {/* Project Info */}
      <div className="flex flex-1 items-start gap-4">
        <div className="flex flex-1 flex-col gap-3">
          {/* Project Header */}
          <div className="flex items-center gap-1">
            <Crown className="size-4 text-secondary-foreground" />
            <span className="text-sm font-medium text-secondary-foreground">
              {name}
              {count !== undefined && ` (${count})`}
            </span>
            {isFavorite && (
              <Star className="size-4 fill-yellow-500 text-yellow-500" />
            )}
          </div>

          {/* Project Tags */}
          <div className="flex items-center gap-2">
            {primaryTag && (
              <Badge variant="default" className="gap-1">
                {primaryTag.icon || <Database className="size-3" />}
                {primaryTag.label}
              </Badge>
            )}
            {tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* More Options Button */}
        <Button
          variant="ghost"
          size="icon"
          className="size-9 shrink-0"
          onClick={onMoreClick}
        >
          <MoreVertical className="size-4" />
        </Button>
      </div>
    </div>
  )
}
