"use client"

import * as React from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function Details({ className, children, ...props }: React.HTMLAttributes<HTMLDetailsElement>) {
  return (
    <details
      className={cn(
        "group my-4 rounded-lg border border-border bg-card text-card-foreground shadow-sm transition-all",
        className
      )}
      {...props}
    >
      {children}
    </details>
  )
}

export function Summary({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <summary
      className={cn(
        "flex cursor-pointer items-center px-4 py-3 font-medium transition-colors hover:bg-muted/50 [&::-webkit-details-marker]:hidden",
        className
      )}
      {...props}
    >
      <ChevronRight className="mr-2 h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-90 text-muted-foreground" />
      {children}
    </summary>
  )
}
