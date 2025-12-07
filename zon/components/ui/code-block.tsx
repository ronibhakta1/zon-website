"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string
  language?: string
  filename?: string
  hideHeader?: boolean
}

export function CodeBlock({
  code,
  filename,
  className,
  hideHeader = false,
  ...props
}: CodeBlockProps) {
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    if (hasCopied) {
      const timeout = setTimeout(() => {
        setHasCopied(false)
      }, 2000)
      return () => clearTimeout(timeout)
    }
  }, [hasCopied])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setHasCopied(true)
  }

  const CopyButton = ({ className }: { className?: string }) => (
    <button
      onClick={copyToClipboard}
      className={cn(
        "absolute right-3 top-3 z-10 flex h-6 w-6 items-center justify-center rounded-md border bg-background/50 p-1 text-muted-foreground transition-all hover:bg-background hover:text-foreground opacity-0 group-hover:opacity-100",
        className
      )}
    >
      {hasCopied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      <span className="sr-only">Copy code</span>
    </button>
  )

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border bg-card shadow-sm group",
        className
      )}
      {...props}
    >
      {filename && !hideHeader && (
        <div className="flex items-center justify-between border-b bg-muted/80 px-4 py-2.5 text-xs font-medium text-foreground">
          <div className="truncate font-mono">{filename}</div>
          {/* show nothing else for now; reserved for future controls */}
          <div className="ml-4 text-xs text-muted-foreground/80"></div>
        </div>
      )}
      {!hideHeader && !filename && (
        <CopyButton />
      )}
      <div className="p-3 sm:p-5 overflow-x-auto bg-muted/20 group relative">
        {filename && (
           <CopyButton />
        )}
        <pre
          className={cn(
            "text-xs sm:text-sm font-mono leading-relaxed whitespace-pre text-foreground",
            // keep code blocks readable on narrow screens
            "[tab-size:2]",
            // better text rendering
            "antialiased"
          )}
        >
          <code className="block font-medium">{code}</code>
        </pre>
      </div>
    </div>
  )
}
