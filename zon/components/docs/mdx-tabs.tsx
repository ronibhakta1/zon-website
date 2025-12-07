"use client"

import * as React from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

interface DocsTabsProps {
  items: string[]
  children: React.ReactNode
}

export function DocsTabs({ items, children }: DocsTabsProps) {
  const [value, setValue] = React.useState(items[0])

  return (
    <Tabs value={value} onValueChange={setValue} className="relative mt-6 w-full">
      <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
        {items.map((item) => (
          <TabsTrigger
            key={item}
            value={item}
            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            {item}
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </Tabs>
  )
}

interface DocsTabProps {
  value: string
  children: React.ReactNode
}

export function DocsTab({ value, children }: DocsTabProps) {
  return (
    <TabsContent value={value} className="relative rounded-md border bg-muted/20 px-0 py-0 mt-0 [&>div]:mt-0 [&>div]:rounded-none [&>div]:border-0 [&>div]:shadow-none">
      {children}
    </TabsContent>
  )
}
