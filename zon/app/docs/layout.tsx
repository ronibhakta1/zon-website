"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { SearchDialog } from "@/components/search-dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface DocsLayoutProps {
  children: React.ReactNode
}

const sidebarLinks = [
  { title: "Introduction", href: "/docs" },
  { title: "What is ZON?", href: "/docs#-what-is-zon" },
  { title: "Installation", href: "/docs#-installation" },
  { title: "Quick Start", href: "/docs#-quick-start" },
  { title: "Beginner Tutorial", href: "/docs#-beginner-tutorial" },
  { title: "Advanced Usage", href: "/docs#-advanced-usage" },
  { title: "API Reference", href: "/docs#-api-reference" },
  { title: "Benchmarks", href: "/docs#-benchmark-results" },
  { title: "Best Practices", href: "/docs#-best-practices" },
  { title: "Spec", href: "/docs/spec" },
  { title: "Contributing", href: "/docs/contributing" },
]

export default function DocsLayout({ children }: DocsLayoutProps) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-background">
      {/* Mobile Header */}
      <div className="md:hidden sticky top-14 z-30 flex items-center border-b bg-background/95 backdrop-blur px-4 h-12">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <div className="px-7">
              <Link href="/" className="font-bold">
                ZON
              </Link>
            </div>
            <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <div className="flex flex-col space-y-3">
                <h4 className="font-medium">Documentation</h4>
                {sidebarLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-muted-foreground hover:text-foreground transition-colors",
                      pathname === link.href && "text-foreground font-medium"
                    )}
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
        <div className="font-medium">Documentation</div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block md:w-64 border-r border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="h-full py-6 pl-8 pr-6 lg:py-8">
          <div className="mb-6">
            <SearchDialog />
          </div>
          <ScrollArea className="h-full pr-6">
            <div className="flex flex-col space-y-1">
              <h4 className="mb-2 rounded-md px-2 py-1 text-sm font-semibold text-foreground">Getting Started</h4>
              {sidebarLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block rounded-md px-2 py-1.5 text-sm font-medium transition-colors",
                    pathname === link.href 
                      ? "bg-secondary text-foreground" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </ScrollArea>
        </div>
      </aside>

      {/* Main Content */}
      <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px] w-full">
        {/* Dotted Background */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        
        <div className="mx-auto w-full min-w-0 max-w-3xl px-4 md:px-6 lg:px-8">
          {children}
        </div>
        
        {/* Table of Contents (Placeholder for now) */}
        <div className="hidden text-sm xl:block">
          <div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] overflow-hidden pt-6">
            <ScrollArea className="pb-10">
              <div className="space-y-2">
                <p className="font-medium">On This Page</p>
                <ul className="m-0 list-none">
                  <li className="mt-0 pt-2">
                    <a href="#" className="inline-block no-underline transition-colors hover:text-foreground text-muted-foreground">
                      Overview
                    </a>
                  </li>
                  <li className="mt-0 pt-2">
                    <a href="#" className="inline-block no-underline transition-colors hover:text-foreground text-muted-foreground">
                      Features
                    </a>
                  </li>
                </ul>
              </div>
            </ScrollArea>
          </div>
        </div>
      </main>
    </div>
  )
}
