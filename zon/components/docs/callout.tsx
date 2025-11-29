"use client"

import { cn } from "@/lib/utils"
import { AlertTriangle, Info, Lightbulb, OctagonX, AlertCircle } from "lucide-react"

interface CalloutProps {
  icon?: string
  title?: string
  children?: React.ReactNode
  type?: "note" | "tip" | "important" | "warning" | "caution"
}

export function Callout({
  children,
  type = "note",
  title,
  ...props
}: CalloutProps) {
  const icons = {
    note: Info,
    tip: Lightbulb,
    important: AlertCircle,
    warning: AlertTriangle,
    caution: OctagonX,
  }

  const Icon = icons[type] || icons.note

  return (
    <div
      className={cn(
        "my-6 flex w-full flex-col gap-2 rounded-lg border p-4 text-sm shadow-sm",
        {
          "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-200/30 dark:bg-blue-900/30 dark:text-blue-200":
            type === "note",
          "border-green-200 bg-green-50 text-green-900 dark:border-green-200/30 dark:bg-green-900/30 dark:text-green-200":
            type === "tip",
          "border-purple-200 bg-purple-50 text-purple-900 dark:border-purple-200/30 dark:bg-purple-900/30 dark:text-purple-200":
            type === "important",
          "border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-200/30 dark:bg-yellow-900/30 dark:text-yellow-200":
            type === "warning",
          "border-red-200 bg-red-50 text-red-900 dark:border-red-200/30 dark:bg-red-900/30 dark:text-red-200":
            type === "caution",
        }
      )}
      {...props}
    >
      <div className="flex items-center gap-2 font-semibold">
        <Icon className="h-4 w-4" />
        <span className="capitalize">{title || type}</span>
      </div>
      <div className="[&>p]:last:mb-0 [&>p]:first:mt-0">{children}</div>
    </div>
  )
}
