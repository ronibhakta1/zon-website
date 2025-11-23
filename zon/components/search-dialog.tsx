"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Search, FileText } from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

const searchItems = [
  { title: "Introduction", href: "/docs", keywords: ["intro", "start", "beginning"] },
  { title: "What is ZON?", href: "/docs#-what-is-zon", keywords: ["about", "overview"] },
  { title: "Installation", href: "/docs#-installation", keywords: ["install", "setup", "pip"] },
  { title: "Quick Start", href: "/docs#-quick-start", keywords: ["getting started", "tutorial"] },
  { title: "Beginner Tutorial", href: "/docs#-beginner-tutorial", keywords: ["learn", "guide"] },
  { title: "Advanced Usage", href: "/docs#-advanced-usage", keywords: ["advanced", "expert"] },
  { title: "API Reference", href: "/docs#-api-reference", keywords: ["api", "reference", "encode", "decode"] },
  { title: "Benchmarks", href: "/docs#-benchmark-results", keywords: ["performance", "speed", "comparison"] },
  { title: "Best Practices", href: "/docs#-best-practices", keywords: ["tips", "recommendations"] },
  { title: "Spec", href: "/docs/spec", keywords: ["specification", "format"] },
  { title: "Contributing", href: "/docs/contributing", keywords: ["contribute", "help"] },
]

export function SearchDialog() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center whitespace-nowrap transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground px-4 py-2 relative h-9 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
      >
        <Search className="mr-2 h-4 w-4" />
        <span className="hidden lg:inline-flex">Search documentation...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search documentation..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Documentation">
            {searchItems.map((item) => (
              <CommandItem
                key={item.href}
                value={`${item.title} ${item.keywords.join(" ")}`}
                onSelect={() => {
                  runCommand(() => router.push(item.href))
                }}
              >
                <FileText className="h-4 w-4" />
                <span>{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
