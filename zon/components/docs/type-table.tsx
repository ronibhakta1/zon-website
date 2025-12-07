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
    <div className={cn("my-6 w-full overflow-hidden rounded-lg border", className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Prop</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Type</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Default</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            {types.map((item, index) => (
              <tr key={index} className="border-b last:border-0 hover:bg-muted/50">
                <td className="p-4 align-top font-mono font-semibold text-primary">{item.prop}</td>
                <td className="p-4 align-top font-mono text-xs text-muted-foreground">
                  <span className="rounded-md bg-muted px-1.5 py-0.5">{item.type}</span>
                </td>
                <td className="p-4 align-top font-mono text-xs text-muted-foreground">
                  {item.default ? (
                     <span className="rounded-md bg-muted px-1.5 py-0.5">{item.default}</span>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="p-4 align-top text-muted-foreground">{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
