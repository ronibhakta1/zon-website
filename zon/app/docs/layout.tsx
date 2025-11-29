"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { SearchDialog } from "@/components/search-dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getDocsNav } from "@/lib/docs-config"
import { Wordmark } from "@/components/ui/logo"

interface DocsLayoutProps {
  children: React.ReactNode
}

// Flatten navigation sections into a single array for the layout
function getFlattenedNav() {
  const sections = getDocsNav()
  return sections.flatMap(section => section.items)
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  const pathname = usePathname()
  const navSections = getDocsNav()

  return (
    <div className="flex min-h-screen flex-col bg-background">
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
            <div className="px-7 mt-8">
              <Link href="/" className="flex items-center space-x-2">
                <Wordmark />
              </Link>
            </div>
            <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <div className="flex flex-col space-y-4">
                {navSections.map((section, idx) => (
                  <div key={idx} className="space-y-3">
                    {section.title && (
                      <h4 className="font-semibold text-sm">{section.title}</h4>
                    )}
                    <div className="flex flex-col space-y-1">
                      {section.items.map((link) => (
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
                  </div>
                ))}
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
        <div className="font-medium">Documentation</div>
      </div>

      <div className="container flex-1 items-start md:grid md:grid-cols-[240px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10 mx-auto px-4 md:px-8">
        {/* Desktop Sidebar */}
        <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block border-r border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="h-full py-6 pr-6 lg:py-8">
            <div className="mb-6">
              <SearchDialog />
            </div>
            <ScrollArea className="h-full pr-6">
              <div className="flex flex-col space-y-4">
                {navSections.map((section, idx) => (
                  <div key={idx}>
                    {section.title && (
                      <h4 className="mb-2 rounded-md px-2 py-1 text-sm font-semibold text-foreground">{section.title}</h4>
                    )}
                    <div className="flex flex-col space-y-1">
                      {section.items.map((link) => (
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
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </aside>

        {/* Main Content */}
        <main className="relative py-6 lg:gap-10 lg:py-8 w-full min-w-0">
          {/* Dotted Background */}
          <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
          
          <div className="mx-auto w-full min-w-0">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
