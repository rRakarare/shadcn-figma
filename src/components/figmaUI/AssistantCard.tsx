/**
 * Generated from Figma
 * Source: https://www.figma.com/design/VO9w8SEvI6yY3uFgDuLfwo/?node-id=4012-1586
 * Node: 4012:1586
 * Component: AssistantCard
 * Generated: 2025-01-30
 */

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Landmark, Star } from "lucide-react";

type AssistantCardProps = {
  className?: string;
  title?: string;
  description?: string;
  author?: string;
  category?: string;
  favorite?: boolean;
  state?: "default" | "hover";
  onClick?: () => void;
};

export default function AssistantCard({
  className,
  title = "Credit Risk Auditor",
  description = "Evaluates loan portfolios, defaults, exposure, and capital impact",
  author = "P19 GmbH",
  category = "Banking",
  favorite = true,
  state = "default",
  onClick,
}: AssistantCardProps) {
  const isHover = state === "hover";

  return (
    <div
      className={cn(
        "flex flex-col gap-4 items-center min-w-[280px] w-[340px] p-4 rounded-xl border border-border shadow-sm cursor-pointer transition-colors",
        isHover ? "bg-background" : "bg-card",
        className
      )}
      onClick={onClick}
    >
      {/* Container */}
      <div className="flex flex-col gap-2 items-start w-full">
        {/* Header */}
        <div className="flex items-center justify-between w-full">
          <Landmark className="size-6 text-foreground" />
          <div className="flex items-center">
            {favorite && (
              <Star className="size-6 fill-amber-400 text-amber-400" />
            )}
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-2 items-start w-full">
          {/* Title */}
          <div className="flex items-center justify-center w-full">
            <p className="flex-1 font-semibold text-base leading-6 text-foreground overflow-hidden text-ellipsis">
              {title}
            </p>
          </div>

          {/* Description */}
          <div className="flex items-center justify-center w-full">
            <p className="flex-1 font-normal text-sm leading-5 text-card-foreground overflow-hidden text-ellipsis">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between w-full">
        <p className="flex-1 font-normal text-sm leading-none text-muted-foreground">
          By {author}
        </p>
        <div className="flex gap-2 items-start">
          <Badge variant="secondary" className="rounded-xl">
            {category}
          </Badge>
        </div>
      </div>
    </div>
  );
}
