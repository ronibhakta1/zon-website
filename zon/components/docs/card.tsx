import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  href?: string
  disabled?: boolean
  title: string
}

export function Card({
  href,
  className,
  children,
  disabled,
  title,
  ...props
}: CardProps) {
  const content = (
    <div
      className={cn(
        "group relative rounded-lg border p-6 shadow-sm transition-shadow hover:shadow-md",
        disabled && "cursor-not-allowed opacity-60",
        className
      )}
      {...props}
    >
      <div className="flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="font-bold">{title}</h3>
          <div className="text-sm text-muted-foreground">{children}</div>
        </div>
        {href && (
            <div className="flex items-center text-sm font-medium text-primary">
                Learn more <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
        )}
      </div>
      {href && (
        <Link href={href} className="absolute inset-0">
          <span className="sr-only">View</span>
        </Link>
      )}
    </div>
  )

  return content
}

export function Cards({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("grid gap-4 sm:grid-cols-2 mt-6", className)}
      {...props}
    />
  )
}
