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
import { type SearchItem, getDocsNav } from "@/lib/docs-config"

import { useDebouncedCallback } from "use-debounce"

export function SearchDialog() {
  const [open, setOpen] = React.useState(false)
  const [results, setResults] = React.useState<SearchItem[]>([])
  const [loading, setLoading] = React.useState(false)
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

  const handleSearch = useDebouncedCallback((term: string) => {
    if (!term) {
      setResults([])
      return
    }

    setLoading(true)
    fetch(`/api/search?q=${encodeURIComponent(term)}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Search failed", err)
        setLoading(false)
      })
  }, 300)

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  // Group items by section
  const groupedItems = React.useMemo(() => {
    const groups: Record<string, SearchItem[]> = {}
    
    results.forEach(item => {
      const section = item.section || "Documentation"
      if (!groups[section]) {
        groups[section] = []
      }
      groups[section].push(item)
    })
    return groups
  }, [results])

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
        <CommandInput 
          placeholder="Search documentation..." 
          onValueChange={handleSearch}
        />
        <CommandList>
          <CommandEmpty>
            {loading ? "Searching..." : "No results found."}
          </CommandEmpty>
          {Object.entries(groupedItems).map(([section, items]) => (
            <CommandGroup key={section} heading={section}>
              {items.map((item) => (
                <CommandItem
                  key={item.href}
                  value={`${item.title} ${item.content}`}
                  onSelect={() => {
                    runCommand(() => router.push(item.href))
                  }}
                  className="flex flex-col items-start gap-1 py-3"
                >
                  <div className="flex items-center gap-2 w-full">
                    <FileText className="h-4 w-4 shrink-0 opacity-50" />
                    <span className="font-medium">{item.title}</span>
                  </div>
                  {item.content && item.content.includes(">") && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground ml-6">
                      <span className="truncate">{item.content}</span>
                    </div>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  )
}
