/**
 * Generated from Figma
 * Source: https://www.figma.com/design/p47Lwdw7tC0AaAT1ynftyS/?node-id=2138-6227
 * Node: 2138:6227
 */

import { Crown, Star, Database, EllipsisVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type ProjectProps = {
  className?: string;
  datasilo?: boolean;
  state?: "Default" | "active";
  projectName?: string;
  projectCount?: number;
  tags?: string[];
};

export default function Project({
  className,
  datasilo = true,
  state = "Default",
  projectName = "MyAwesomeProject",
  projectCount = 1,
  tags = ["Finance", "HR", "Marketing"],
}: ProjectProps) {
  const isActive = state === "active";

  return (
    <div
      className={cn(
        "relative flex w-[462px] gap-4 border-b border-border p-6",
        isActive && "flex-col bg-foreground/5",
        className
      )}
    >
      {/* Green left border indicator */}
      <div
        className={cn(
          "absolute bottom-0 top-0 bg-green-600",
          isActive ? "left-0 w-2" : "-left-2 w-1"
        )}
      />

      {/* Project Info */}
      <div
        className={cn(
          "flex flex-1 gap-2",
          isActive ? "w-full shrink-0" : "min-h-px min-w-px self-stretch"
        )}
      >
        {/* Project Details */}
        <div className="flex flex-1 flex-col gap-4 items-start justify-center min-h-px min-w-px">
          {/* Project Header */}
          <div className="flex w-full items-center gap-1 shrink-0">
            <Crown className="size-6 shrink-0 text-secondary-foreground" />
            <p className="font-medium text-sm leading-5 text-secondary-foreground truncate shrink-0">
              {projectName} ({projectCount})
            </p>
            <Star className="size-6 shrink-0 text-amber-400 fill-amber-400" />
          </div>

          {/* Project Tags */}
          <div className="flex items-start gap-2 shrink-0">
            {datasilo && (
              <div className="flex items-center gap-2 shrink-0">
                <Badge variant="default" className="gap-1">
                  <Database className="size-4" />
                  Datasilo
                </Badge>
                <Separator orientation="vertical" className="h-6" />
              </div>
            )}

            <div className="flex items-center gap-2 shrink-0">
              {tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* More Options Button */}
        <button className="flex items-center justify-center p-2 rounded-full size-9 shrink-0 hover:bg-accent">
          <EllipsisVertical className="size-6 text-foreground" />
        </button>
      </div>
    </div>
  );
}
