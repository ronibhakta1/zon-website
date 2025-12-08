"use client"

import { cn } from "@/lib/utils"
import { AlertTriangle, Info, Lightbulb, AlertCircle, Ban } from "lucide-react"

interface CalloutProps {
  icon?: string
  title?: string
  children?: React.ReactNode
  type?: "note" | "tip" | "important" | "warning" | "caution"
}

const calloutConfig = {
  note: {
    icon: Info,
    borderColor: "border-l-blue-500",
    iconColor: "text-blue-500 dark:text-blue-400",
    bg: "bg-blue-500/5 dark:bg-blue-500/10",
  },
  tip: {
    icon: Lightbulb,
    borderColor: "border-l-green-500",
    iconColor: "text-green-600 dark:text-green-400",
    bg: "bg-green-500/5 dark:bg-green-500/10",
  },
  important: {
    icon: AlertCircle,
    borderColor: "border-l-purple-500",
    iconColor: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-500/5 dark:bg-purple-500/10",
  },
  warning: {
    icon: AlertTriangle,
    borderColor: "border-l-yellow-500",
    iconColor: "text-yellow-600 dark:text-yellow-400",
    bg: "bg-yellow-500/5 dark:bg-yellow-500/10",
  },
  caution: {
    icon: Ban,
    borderColor: "border-l-red-500",
    iconColor: "text-red-600 dark:text-red-400",
    bg: "bg-red-500/5 dark:bg-red-500/10",
  },
}

export function Callout({
  children,
  type = "note",
  title,
  ...props
}: CalloutProps) {
  const config = calloutConfig[type] || calloutConfig.note
  const Icon = config.icon

  return (
    <div
      className={cn(
        "my-4 border-l-4 pl-4 py-3",
        config.borderColor,
        config.bg
      )}
      {...props}
    >
      <div className={cn("flex items-center gap-2 font-medium mb-1", config.iconColor)}>
        <Icon className="h-4 w-4" />
        <span className="capitalize text-sm">{title || type}</span>
      </div>
      <div className="text-sm text-muted-foreground [&>p]:last:mb-0 [&>p]:first:mt-0">{children}</div>
    </div>
  )
}

