"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Copy, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import CodeEditor from "@uiw/react-textarea-code-editor"

interface CodeEditorPanelProps {
  value: string
  onChange?: (value: string) => void
  language: "json" | "plaintext"
  readOnly?: boolean
  label: string
  error?: string
  className?: string
}

export function CodeEditorPanel({
  value,
  onChange,
  language,
  readOnly = false,
  label,
  error,
  className
}: CodeEditorPanelProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-foreground">{label}</h3>
        <button
          onClick={handleCopy}
          disabled={!value}
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200",
            "bg-secondary hover:bg-secondary/80 text-secondary-foreground",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          )}
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Editor */}
      <div className="flex-1 relative rounded-lg border border-border overflow-hidden bg-code-bg">
        <CodeEditor
          value={value}
          language={language === "json" ? "json" : "text"}
          onChange={(e) => onChange?.(e.target.value)}
          readOnly={readOnly}
          padding={16}
          className={cn(
            "font-mono text-sm leading-relaxed",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            "min-h-[400px] h-full"
          )}
          style={{
            fontSize: 14,
            fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
            backgroundColor: "var(--code-bg)",
            color: "var(--code-color)",
          }}
        />
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 p-3 rounded-md bg-destructive/10 border border-destructive/20"
        >
          <p className="text-xs text-destructive font-medium">{error}</p>
        </motion.div>
      )}

      {/* Character Count */}
      <div className="mt-2 text-xs text-muted-foreground text-right">
        {value.length.toLocaleString()} characters
      </div>
    </div>
  )
}
