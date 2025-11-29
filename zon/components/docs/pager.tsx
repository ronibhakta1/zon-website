"use client"

import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getDocsNav, NavItem } from "@/lib/docs-config"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface DocsPagerProps {
  slug: string
}

export function DocsPager({ slug }: DocsPagerProps) {
  const nav = getDocsNav()
  const flattenedLinks = nav.reduce<NavItem[]>((acc, section) => {
    return acc.concat(section.items)
  }, [])

  // Handle index page specially or normalize slug
  const currentPath = slug === "index" ? "/docs" : `/docs/${slug}`
  
  const activeIndex = flattenedLinks.findIndex(
    (link) => link.href === currentPath || (slug === "index" && link.href === "/docs")
  )
  
  const prev = activeIndex !== 0 ? flattenedLinks[activeIndex - 1] : null
  const next = activeIndex !== flattenedLinks.length - 1 ? flattenedLinks[activeIndex + 1] : null

  if (!prev && !next) {
    return null
  }

  return (
    <div className="flex flex-row items-center justify-between mt-10 pt-6 border-t border-border/40">
      {prev ? (
        <Link
          href={prev.href}
          className={cn(buttonVariants({ variant: "outline" }), "h-auto py-4 px-6 flex flex-col items-start gap-1 hover:border-primary/50 transition-colors")}
        >
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <ChevronLeft className="h-3 w-3" /> Previous
          </span>
          <span className="font-medium text-foreground">{prev.title}</span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={next.href}
          className={cn(buttonVariants({ variant: "outline" }), "h-auto py-4 px-6 flex flex-col items-end gap-1 hover:border-primary/50 transition-colors ml-auto")}
        >
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            Next <ChevronRight className="h-3 w-3" />
          </span>
          <span className="font-medium text-foreground">{next.title}</span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  )
}
