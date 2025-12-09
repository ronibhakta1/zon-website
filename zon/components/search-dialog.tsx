"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { useRouter } from "next/navigation"
import { Search, FileText, X } from "lucide-react"
import { type SearchItem } from "@/lib/docs-config"
import { useDebouncedCallback } from "use-debounce"

export function SearchDialog() {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [results, setResults] = React.useState<SearchItem[]>([])
  const [loading, setLoading] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const router = useRouter()
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
      if (e.key === "Escape") {
        setOpen(false)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  React.useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

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

  const handleSelect = (href: string) => {
    setOpen(false)
    setQuery("")
    setResults([])
    router.push(href)
  }

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

  const modalContent = open ? (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-[99999]"
        onClick={() => setOpen(false)}
      />
      
      {/* Modal */}
      <div 
        className="fixed left-1/2 top-[15vh] -translate-x-1/2 z-[100000] w-[calc(100%-2rem)] max-w-[550px] bg-background border border-border rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center border-b px-4">
          <Search className="mr-3 h-5 w-5 shrink-0 opacity-50" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              handleSearch(e.target.value)
            }}
            placeholder="Search documentation..."
            className="flex h-14 w-full bg-transparent py-4 text-base outline-none border-none focus:outline-none focus:ring-0 focus:border-none placeholder:text-muted-foreground"
          />
          <button
            onClick={() => setOpen(false)}
            className="p-2 hover:bg-muted rounded-md ml-2"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[400px] overflow-y-auto p-3">
          {loading && (
            <div className="py-8 text-center text-sm text-muted-foreground">
              Searching...
            </div>
          )}
          
          {!loading && query && results.length === 0 && (
            <div className="py-8 text-center text-sm text-muted-foreground">
              No results found.
            </div>
          )}

          {!loading && !query && (
            <div className="py-8 text-center text-sm text-muted-foreground">
              Type to search documentation...
            </div>
          )}

          {Object.entries(groupedItems).map(([section, items]) => (
            <div key={section} className="mb-3">
              <div className="px-2 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {section}
              </div>
              {items.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleSelect(item.href)}
                  className="flex w-full items-center gap-3 rounded-md px-3 py-3 text-sm hover:bg-accent transition-colors"
                >
                  <FileText className="h-4 w-4 shrink-0 opacity-50" />
                  <span className="font-medium">{item.title}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  ) : null

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center whitespace-nowrap transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground px-4 py-2 relative h-9 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
      >
        <Search className="mr-2 h-4 w-4" />
        <span className="hidden lg:inline-flex">Search documentation...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      
      {mounted && createPortal(modalContent, document.body)}
    </>
  )
}


