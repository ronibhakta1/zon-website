"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { presets, type Preset } from "./example-presets"

interface PresetSelectorProps {
  onSelect: (preset: Preset) => void
  className?: string
}

export function PresetSelector({ onSelect, className }: PresetSelectorProps) {
  return (
    <div className={cn("w-full overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide", className)}>
      <div className="flex gap-3 min-w-max">
        {presets.map((preset) => (
          <button
            key={preset.name}
            onClick={() => onSelect(preset)}
            className={cn(
              "group relative flex flex-col items-start p-4 w-[240px] h-[100px] rounded-xl text-left transition-all duration-300",
              "bg-white/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800",
              "hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md hover:-translate-y-0.5",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            )}
          >
            <div className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 mb-1 group-hover:text-primary transition-colors">
              {preset.name}
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
              {preset.description}
            </div>
            
            {/* Hover Gradient */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </button>
        ))}
      </div>
    </div>
  )
}
