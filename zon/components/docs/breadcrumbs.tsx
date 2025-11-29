"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { getDocsNav } from "@/lib/docs-config"

export function DocsBreadcrumbs() {
  const pathname = usePathname()
  const nav = getDocsNav()
  
  // Find the current section and item
  let currentSection = ""
  let currentItem = ""
  
  for (const section of nav) {
    const item = section.items.find((item) => item.href === pathname || (item.href === "/docs" && pathname === "/docs"))
    if (item) {
      currentSection = section.title || ""
      currentItem = item.title
      break
    }
  }

  if (!currentSection || !currentItem) return null

  return (
    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
      <div className="overflow-hidden text-ellipsis whitespace-nowrap">
        Docs
      </div>
      <ChevronRight className="h-4 w-4" />
      <div className="font-medium text-foreground">
        {currentSection}
      </div>
      <ChevronRight className="h-4 w-4" />
      <div className="font-medium text-foreground">
        {currentItem}
      </div>
    </div>
  )
}
