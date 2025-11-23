import Link from "next/link"
import { Github } from "lucide-react"

import { cn } from "@/lib/utils"
import { Wordmark } from "@/components/ui/logo"
import { SearchDialog } from "@/components/search-dialog"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-screen-xl items-center px-4">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Wordmark />
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/docs"
              className={cn(
                "transition-colors hover:text-foreground/80",
                "text-foreground/60"
              )}
            >
              Docs
            </Link>
            <Link
              href="/docs/spec"
              className={cn(
                "transition-colors hover:text-foreground/80",
                "text-foreground/60"
              )}
            >
              Spec
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <SearchDialog />
          </div>
          <nav className="flex items-center">
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
          </nav>
        </div>
      </div>
    </header>
  )
}
