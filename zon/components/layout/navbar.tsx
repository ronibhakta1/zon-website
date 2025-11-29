"use client"

import Link from "next/link"
import { Github, Menu, X } from "lucide-react"
import { useState } from "react"

import { cn } from "@/lib/utils"
import { Wordmark } from "@/components/ui/logo"
import { SearchDialog } from "@/components/search-dialog"
import { Button } from "@/components/ui/button"

import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-950/60">
      <div className="container mx-auto flex h-14 max-w-screen-xl items-center px-4">
        {/* Desktop Navigation */}
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Wordmark />
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link
              href="/docs"
              className={cn(
                "transition-colors hover:text-zinc-900 dark:hover:text-zinc-50",
                "text-zinc-600 dark:text-zinc-400"
              )}
            >
              Docs
            </Link>
            <Link
              href="/#benchmarks"
              className={cn(
                "transition-colors hover:text-zinc-900 dark:hover:text-zinc-50",
                "text-zinc-600 dark:text-zinc-400"
              )}
            >
              Benchmarks
            </Link>
            <Link
              href="docs/vs-toon"
              className={cn(
                "transition-colors hover:text-zinc-900 dark:hover:text-zinc-50",
                "text-zinc-600 dark:text-zinc-400"
              )}
            >
              ZON vs TOON
            </Link>
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
        <div className="md:hidden border-t border-zinc-200 bg-zinc-50">
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
