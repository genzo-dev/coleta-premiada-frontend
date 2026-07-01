import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressBarProps extends React.ComponentProps<"div"> {
  value: number
  max?: number
  indicatorClassName?: string
}

function ProgressBar({
  className,
  value = 0,
  max = 100,
  indicatorClassName,
  ...props
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  return (
    <div
      data-slot="progress-bar"
      className={cn(
        "relative h-4 w-full bg-morador-surface-container rounded-full overflow-hidden",
        className
      )}
      {...props}
    >
      <div
        data-slot="progress-bar-indicator"
        className={cn(
          "h-full bg-morador-primary-container rounded-full transition-all duration-500 ease-out",
          indicatorClassName
        )}
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}

export { ProgressBar }
