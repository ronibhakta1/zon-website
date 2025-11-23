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
        "relative overflow-hidden rounded-lg border bg-muted/50",
        className
      )}
      {...props}
    >
      {filename && !hideHeader && (
        <div className="flex items-center border-b bg-muted px-4 py-2 text-xs text-muted-foreground">
          {filename}
        </div>
      )}
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm font-mono leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}
