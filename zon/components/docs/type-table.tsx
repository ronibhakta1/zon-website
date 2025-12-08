import { cn } from "@/lib/utils"

interface TypeTableProps {
  types: {
    prop: string
    type: string
    default?: string
    description: string
  }[]
  className?: string
}

export function TypeTable({ types, className }: TypeTableProps) {
  return (
    <div className={cn("my-4 w-full overflow-x-auto", className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-2 pr-4 text-left font-medium text-foreground">Prop</th>
            <th className="py-2 px-4 text-left font-medium text-foreground">Type</th>
            <th className="py-2 px-4 text-left font-medium text-foreground">Default</th>
            <th className="py-2 pl-4 text-left font-medium text-foreground">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {types.map((item, index) => (
            <tr key={index}>
              <td className="py-3 pr-4 align-top font-mono text-sm text-primary">{item.prop}</td>
              <td className="py-3 px-4 align-top">
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">{item.type}</code>
              </td>
              <td className="py-3 px-4 align-top text-muted-foreground">
                {item.default ? (
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">{item.default}</code>
                ) : (
                  "—"
                )}
              </td>
              <td className="py-3 pl-4 align-top text-muted-foreground">{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

