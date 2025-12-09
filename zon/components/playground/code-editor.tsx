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
    <div className={cn(
      "flex flex-col h-full rounded-xl overflow-hidden border shadow-sm transition-all duration-300 hover:shadow-md",
      "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl",
      error 
        ? "border-red-500 dark:border-red-500/50 ring-4 ring-red-500/10" 
        : "border-zinc-200 dark:border-zinc-800",
      className
    )}>
      {/* Window Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/50">
        <div className="flex items-center gap-2">
          {/* Traffic Lights */}
          <div className="flex gap-1.5 mr-3">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
          </div>
          <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 tracking-wide uppercase">
            {label}
          </span>
        </div>
        
        <button
          onClick={handleCopy}
          disabled={!value}
          className={cn(
            "inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-md transition-all duration-200",
            "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400",
            "hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-100",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Editor Area */}
      <div className="flex-1 relative bg-transparent">
        <CodeEditor
          value={value}
          language={language === "json" ? "json" : "text"}
          onChange={(e) => onChange?.(e.target.value)}
          readOnly={readOnly}
          padding={20}
          className={cn(
            "font-mono text-sm leading-relaxed min-h-[400px] h-full bg-transparent",
            "focus:outline-none",
            "[&_.w-tc-editor-text]:!text-[var(--w-tc-editor-text)]"
          )}
          style={{
            fontSize: 13,
            fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
            backgroundColor: "transparent",
            // Improve light mode contrast
            ["--color-fg-default" as never]: "var(--foreground)",
            ["--color-prettylights-syntax-string" as never]: "#059669",
            ["--color-prettylights-syntax-keyword" as never]: "#c026d3",
            ["--color-prettylights-syntax-entity" as never]: "#0891b2",
            ["--color-prettylights-syntax-constant" as never]: "#d97706",
          }}
        />
      </div>

      {/* Footer Status Bar */}
      <div className="px-4 py-2 border-t border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-50/30 dark:bg-zinc-900/30 flex justify-between items-center">
        {error ? (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-xs text-red-500 font-medium"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            {error}
          </motion.div>
        ) : (
          <div className="text-xs text-zinc-400 font-mono">
            {language === "json" ? "JSON" : "ZON"}
          </div>
        )}
        <div className="text-xs text-zinc-500 font-mono tabular-nums">
          {value.length.toLocaleString()} chars
        </div>
      </div>
    </div>
  )
}
