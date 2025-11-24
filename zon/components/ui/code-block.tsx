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
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border bg-card shadow-sm",
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
      <div className="p-5 overflow-x-auto bg-muted/20">
        <pre
          className={cn(
            "text-[0.875rem] font-mono leading-7 whitespace-pre text-foreground",
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
