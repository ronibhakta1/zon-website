"use client"

import Link from "next/link"
import { Github, Menu, X, ChevronDown, Star } from "lucide-react"
import { useState, useEffect } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { cn } from "@/lib/utils"
import { Wordmark } from "@/components/ui/logo"
import { SearchDialog } from "@/components/search-dialog"
import { Button } from "@/components/ui/button"
import { type SearchItem } from "@/lib/docs-config"

import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [starsPy, setStarsPy] = useState(0)
  const [starsTs, setStarsTs] = useState(0)

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const res = await fetch('/api/github-stars', {
          cache: 'force-cache',
          next: { revalidate: 3600 }
        })

        if (res.ok) {
          const data = await res.json()
          setStarsPy(data.starsPy)
          setStarsTs(data.starsTs)
        }
      } catch (e) {
        console.error("Failed to fetch stars", e)
      }
    }

    fetchStars()
    const interval = setInterval(fetchStars, 3600000) // 1 hour
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-screen-2xl items-center px-4">
        {/* Desktop Navigation */}
        <div className="mr-4 hidden lg:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Wordmark />
          </Link>
          <nav className="flex items-center gap-4 text-sm font-medium">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 transition-colors hover:text-foreground/80 text-foreground/60 outline-none">
                Guide <ChevronDown className="h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem asChild>
                  <Link href="/docs/getting-started">Getting Started</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/docs/format-overview">Format Overview</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/docs/llm-best-practices">LLM Best Practices</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/docs/benchmarks">Benchmarks</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/docs/cli-guide">CLI Guide</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/docs/advanced-features">Advanced Features</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/playground"
              className={cn(
                "transition-colors hover:text-foreground/80",
                "text-foreground/60"
              )}
            >
              Playground
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 transition-colors hover:text-foreground/80 text-foreground/60 outline-none">
                Reference <ChevronDown className="h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem asChild>
                  <Link href="/docs/api-typescript">API (TypeScript)</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/docs/syntax-cheatsheet">Syntax Cheatsheet</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/docs/specification">Specification</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/docs/efficiency-formalization">Efficiency Formalization</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/docs/changelog">Changelog</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 transition-colors hover:text-foreground/80 text-foreground/60 outline-none">
                Ecosystem <ChevronDown className="h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem asChild>
                  <Link href="/docs/typescript">TypeScript Guide</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/docs/implementations">Implementations</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/docs/integrations">Integrations</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/docs/schema-validation">Schema Validation</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/docs/streaming-guide">Streaming Guide</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/docs/vs-toon"
              className={cn(
                "transition-colors hover:text-foreground/80",
                "text-foreground/60"
              )}
            >
              ZON vs TOON
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 transition-colors hover:text-foreground/80 text-foreground/60 outline-none ml-2">
                v1.3.0 <ChevronDown className="h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  v1.3.0 (Latest)
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  v1.2.0
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>

        {/* Mobile Logo & Hamburger */}
        <div className="flex lg:hidden flex-1 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Wordmark />
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex items-center h-9 border border-input bg-background shadow-sm rounded-md overflow-hidden">
              <Link
                href="https://github.com/ZON-Format/ZON"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-full w-9 items-center justify-center transition-colors hover:bg-accent hover:text-accent-foreground border-r border-input"
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub Organization</span>
              </Link>
              
              <Link
                href="https://github.com/ZON-Format/zon"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-2 h-full text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground border-r border-input"
              >
                <Star className="w-2.5 h-2.5 fill-[#3776AB] text-[#3776AB]" />
                <span className="text-muted-foreground">PY</span>
                <span className="text-foreground font-semibold">{starsPy >= 1000 ? (starsPy / 1000).toFixed(1) + 'k' : starsPy || 0}</span>
              </Link>

              <Link
                href="https://github.com/ZON-Format/zon-ts"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-2 h-full text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Star className="w-2.5 h-2.5 fill-[#3178C6] text-[#3178C6]" />
                <span className="text-muted-foreground">TS</span>
                <span className="text-foreground font-semibold">{starsTs >= 1000 ? (starsTs / 1000).toFixed(1) + 'k' : starsTs || 0}</span>
              </Link>
            </div>
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {/* Desktop Right Side */}
        <div className="hidden lg:flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <SearchDialog />
          </div>
          <nav className="flex items-center gap-2">
            <div className="flex items-center h-9 border border-input bg-background shadow-sm rounded-md overflow-hidden">
              <Link
                href="https://github.com/ZON-Format/ZON"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-full w-9 items-center justify-center transition-colors hover:bg-accent hover:text-accent-foreground border-r border-input"
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub Organization</span>
              </Link>
              
              <Link
                href="https://github.com/ZON-Format/zon"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 h-full text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground border-r border-input"
              >
                <Star className="w-3 h-3 fill-[#3776AB] text-[#3776AB]" />
                <span className="text-muted-foreground">PY</span>
                <span className="text-foreground font-semibold">{starsPy >= 1000 ? (starsPy / 1000).toFixed(1) + 'k' : starsPy || 0}</span>
              </Link>

              <Link
                href="https://github.com/ZON-Format/zon-ts"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 h-full text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Star className="w-3 h-3 fill-[#3178C6] text-[#3178C6]" />
                <span className="text-muted-foreground">TS</span>
                <span className="text-foreground font-semibold">{starsTs >= 1000 ? (starsTs / 1000).toFixed(1) + 'k' : starsTs || 0}</span>
              </Link>
            </div>
            <ThemeToggle />
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border/40 bg-background">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            <Link
              href="/docs"
              className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Docs
            </Link>
            <Link
              href="/#benchmarks"
              className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Benchmarks
            </Link>
            <Link
              href="/playground"
              className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Playground
            </Link>
            <Link
              href="/docs/vs-toon"
              className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              ZON vs TOON
            </Link>
            <Link
              href="https://github.com/ZON-Format/ZON"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60 py-2 flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Github className="h-4 w-4" />
              GitHub
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
