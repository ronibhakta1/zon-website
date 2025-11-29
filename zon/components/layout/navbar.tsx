"use client"

import Link from "next/link"
import { Github, Menu, X, ChevronDown } from "lucide-react"
import { useState } from "react"
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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-screen-2xl items-center px-4">
        {/* Desktop Navigation */}
        <div className="mr-4 hidden md:flex">
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
                  <Link href="/docs/using-zon-with-llms">Using ZON with LLMs</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/docs/benchmarks">Benchmarks</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/docs/cli-reference">CLI Reference</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/docs/tools-playgrounds">Tools & Playgrounds</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

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
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 transition-colors hover:text-foreground/80 text-foreground/60 outline-none">
                Ecosystem <ChevronDown className="h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem asChild>
                  <Link href="/docs/implementations">Implementations</Link>
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
                v1.0.4 <ChevronDown className="h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  v1.0.4 (Latest)
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  v1.0.3
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>

        {/* Mobile Logo & Hamburger */}
        <div className="flex md:hidden flex-1 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Wordmark />
          </Link>
          <div className="flex items-center gap-2">
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
        <div className="hidden md:flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <SearchDialog />
          </div>
          <nav className="flex items-center gap-2">
            <Link
              href="https://github.com/ZON-Format/ZON"
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  "inline-flex h-9 w-9 items-center justify-center whitespace-nowrap rounded-md px-0 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                )}
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background">
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
              href="docs/vs-toon"
              className={cn(
                "transition-colors hover:text-foreground/80",
                "text-foreground/60"
              )}
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
