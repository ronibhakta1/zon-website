"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string
  language?: string
  filename?: string
  hideHeader?: boolean
  compact?: boolean
}

export function CodeBlock({
  code,
  filename,
  className,
  hideHeader = false,
  compact = false,
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

  return (
    <div
      className={cn(
        "relative rounded-md border overflow-hidden group",
        className
      )}
      {...props}
    >
      {filename && !hideHeader && (
        <div className="flex items-center justify-between border-b bg-muted/40 px-4 py-2 text-xs">
          <span className="font-mono text-muted-foreground">{filename}</span>
          <button
            onClick={copyToClipboard}
            className="p-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            {hasCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        </div>
      )}
      <div className={cn(
        "relative overflow-x-auto",
        compact ? "px-3 py-2" : "px-4 py-3"
      )}>
        {!filename && !hideHeader && (
          <button
            onClick={copyToClipboard}
            className="absolute right-2 top-2 p-1.5 rounded text-muted-foreground hover:text-foreground transition-colors opacity-0 group-hover:opacity-100"
          >
            {hasCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
        )}
        <pre className="text-sm font-mono leading-relaxed whitespace-pre text-foreground">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}

