import { FileIcon, FolderIcon, FolderOpenIcon } from "lucide-react"
import React from "react"

import { cn } from "@/lib/utils"

interface FolderProps {
  name: string
  defaultOpen?: boolean
  children: React.ReactNode
}

export function Folder({ name, defaultOpen = false, children }: FolderProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)

  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-md px-2 py-1 text-sm hover:bg-muted/50 text-foreground"
      >
        {isOpen ? (
          <FolderOpenIcon className="h-4 w-4 text-blue-500" />
        ) : (
          <FolderIcon className="h-4 w-4 text-blue-500" />
        )}
        <span className="font-medium">{name}</span>
      </button>
      {isOpen && <div className="ml-4 flex flex-col gap-1 border-l pl-2">{children}</div>}
    </div>
  )
}

interface FileProps {
  name: string
}

export function File({ name }: FileProps) {
  return (
    <div className="flex items-center gap-2 rounded-md px-2 py-1 text-sm text-muted-foreground hover:bg-muted/50 hover:text-foreground">
      <FileIcon className="h-4 w-4" />
      <span>{name}</span>
    </div>
  )
}

export function FileTree({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-lg border bg-card p-4 font-mono text-sm shadow-sm mt-6 mb-6", className)}>
      {children}
    </div>
  )
}
