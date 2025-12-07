import { cn } from "@/lib/utils"

interface StepProps {
  title?: string
  children: React.ReactNode
}

export function Step({ title, children }: StepProps) {
  return (
    <div className="step relative pl-8 pb-8 last:pb-0">
      <div className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full border bg-background text-xs font-medium text-muted-foreground ring-4 ring-background">
        <span className="step-number"></span>
      </div>
      <div className="absolute left-[11px] top-6 bottom-0 w-px bg-border last:hidden" />
      <div className="flex flex-col gap-2">
        {title && <h3 className="font-semibold leading-6 tracking-tight mt-0">{title}</h3>}
        <div className="text-sm text-muted-foreground">{children}</div>
      </div>
    </div>
  )
}

export function Steps({ children }: { children: React.ReactNode }) {
  return (
    <div className="steps mb-12 ml-4 border-l pl-8 [counter-reset:step]">
      {children}
    </div>
  )
}
