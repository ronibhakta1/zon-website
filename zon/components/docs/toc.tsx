"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useMounted } from "@/hooks/use-mounted"

interface TocItem {
  title: string
  url: string
  items?: TocItem[]
}

interface TableOfContentsProps {
  toc: {
    level: number
    text: string
    slug: string
  }[]
}

export function DashboardTableOfContents({ toc }: TableOfContentsProps) {
  const itemIds = React.useMemo(
    () =>
      toc
        ? toc
            .map((item) => item.slug)
            .filter(Boolean)
        : [],
    [toc]
  )
  const activeHeading = useActiveItem(itemIds)
  const mounted = useMounted()

  if (!toc?.length || !mounted) {
    return null
  }

  return (
    <div className="space-y-2">
      <p className="font-medium text-sm">On This Page</p>
      <ul className="m-0 list-none">
        {toc.map((item, index) => (
          <li key={index} className={cn("mt-0 pt-2", item.level === 3 && "pl-4")}>
            <a
              href={`#${item.slug}`}
              className={cn(
                "inline-block no-underline transition-colors hover:text-foreground text-sm border-l-2 pl-4 -ml-[2px]",
                item.slug === activeHeading
                  ? "font-medium text-foreground border-primary"
                  : "text-muted-foreground border-transparent hover:border-border"
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function useActiveItem(itemIds: (string | undefined)[]) {
  const [activeId, setActiveId] = React.useState<string>("")

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: `0% 0% -80% 0%` }
    )

    itemIds?.forEach((id) => {
      if (!id) return
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      itemIds?.forEach((id) => {
        if (!id) return
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [itemIds])

  return activeId
}
