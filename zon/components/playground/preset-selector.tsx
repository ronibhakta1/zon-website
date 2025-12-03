"use client"

import { Button } from "@/components/ui/button"
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={className}
        >
          Load Example
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[280px]">
        {presets.map((preset) => (
          <DropdownMenuItem
            key={preset.name}
            onClick={() => onSelect(preset)}
            className="flex flex-col items-start gap-1 py-3 cursor-pointer"
          >
            <span className="font-medium text-sm">{preset.name}</span>
            <span className="text-xs text-muted-foreground">
              {preset.description}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
