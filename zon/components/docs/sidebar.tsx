"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { getDocsNav } from "@/lib/docs-config"

export function DocsSidebar() {
  const pathname = usePathname()
  const navSections = getDocsNav()

  return (
    <div className="w-full">
      <div className="pb-4 space-y-4">
        {navSections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            {section.title && (
              <h4 className="mb-2 rounded-md px-2 py-1 text-sm font-semibold">
                {section.title}
              </h4>
            )}
            <div className="grid grid-flow-row auto-rows-max text-sm">
              {section.items.map((item, itemIndex) => (
                <Link
                  key={itemIndex}
                  href={item.href}
                  className={cn(
                    "group flex w-full items-center rounded-md border border-transparent px-2 py-1.5 hover:underline transition-colors",
                    pathname === item.href || (item.href.includes("#") && pathname === "/docs")
                      ? "font-medium text-primary bg-primary/5 border-l-2 border-l-primary rounded-l-none"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
