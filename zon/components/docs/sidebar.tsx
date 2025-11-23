"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { getDocsNav } from "@/lib/docs-config"

export function DocsSidebar() {
  const pathname = usePathname()
  const nav = getDocsNav()

  return (
    <div className="w-full">
      <div className="pb-4">
        <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
          Documentation
        </h4>
        <div className="grid grid-flow-row auto-rows-max text-sm">
          {nav.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline",
                pathname === item.href
                  ? "font-medium text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
