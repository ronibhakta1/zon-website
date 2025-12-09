"use client"

import { cn } from "@/lib/utils"
import { Settings2, Zap, FileText, Bot } from "lucide-react"

export type EncodingMode = "compact" | "readable" | "llm-optimized"

export interface AdvancedOptions {
  enableDictCompression: boolean
  disableTables: boolean
}

interface ModeSelectorProps {
  mode: EncodingMode
  onModeChange: (mode: EncodingMode) => void
  advancedOptions: AdvancedOptions
  onAdvancedChange: (options: AdvancedOptions) => void
  showAdvanced: boolean
  onShowAdvancedChange: (show: boolean) => void
}

const modes = [
  { id: "compact" as const, label: "Compact", icon: Zap, description: "Maximum compression (T/F for booleans)" },
  { id: "readable" as const, label: "Readable", icon: FileText, description: "YAML-like human-readable format" },
  { id: "llm-optimized" as const, label: "LLM", icon: Bot, description: "Optimized for AI comprehension" },
]

export function ModeSelector({
  mode,
  onModeChange,
  advancedOptions,
  onAdvancedChange,
  showAdvanced,
  onShowAdvancedChange,
}: ModeSelectorProps) {
  return (
    <div className="space-y-3">
      {/* Mode Tabs */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-lg overflow-x-auto">
          {modes.map((m) => {
            const Icon = m.icon
            const isActive = mode === m.id
            return (
              <button
                key={m.id}
                onClick={() => onModeChange(m.id)}
                className={cn(
                  "flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap",
                  isActive
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                )}
                title={m.description}
              >
                <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>{m.label}</span>
              </button>
            )
          })}
        </div>
        
        {/* Advanced Toggle */}
        <button
          onClick={() => onShowAdvancedChange(!showAdvanced)}
          className={cn(
            "flex items-center gap-1 px-2 py-1.5 text-xs font-medium rounded-md transition-all shrink-0",
            showAdvanced
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
        >
          <Settings2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span className="hidden xs:inline sm:inline">Options</span>
        </button>
      </div>

      {/* Advanced Options */}
      {showAdvanced && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 bg-muted/30 rounded-lg border border-border/50">
          <label className="flex items-center gap-2 text-xs cursor-pointer">
            <input
              type="checkbox"
              checked={advancedOptions.enableDictCompression}
              onChange={(e) =>
                onAdvancedChange({
                  ...advancedOptions,
                  enableDictCompression: e.target.checked,
                })
              }
              className="w-4 h-4 rounded border-border accent-primary"
            />
            <span className="text-muted-foreground">
              Dictionary Compression
            </span>
          </label>
          <label className="flex items-center gap-2 text-xs cursor-pointer">
            <input
              type="checkbox"
              checked={advancedOptions.disableTables}
              onChange={(e) =>
                onAdvancedChange({
                  ...advancedOptions,
                  disableTables: e.target.checked,
                })
              }
              className="w-4 h-4 rounded border-border accent-primary"
            />
            <span className="text-muted-foreground">
              Disable Tables
            </span>
          </label>
        </div>
      )}
    </div>
  )
}
