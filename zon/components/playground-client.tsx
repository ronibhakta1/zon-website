"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RetroGrid } from "@/components/ui/retro-grid"
import { CodeEditorPanel } from "@/components/playground/code-editor"
import { PresetSelector } from "@/components/playground/preset-selector"
import { StatsDashboard } from "@/components/playground/stats-dashboard"
import { type Preset } from "@/components/playground/example-presets"
import { countTokens } from "@/lib/tokenizer"
import { useDebounce } from "use-debounce"
import { RotateCcw, Sparkles, ArrowRight, Info } from "lucide-react"
import { cn } from "@/lib/utils"

// Import ZON encoder
import { encode } from "zon-format"

const DEFAULT_JSON = JSON.stringify({
  users: [
    { id: 1, name: "Alice", email: "alice@example.com", role: "admin", active: true },
    { id: 2, name: "Bob", email: "bob@example.com", role: "user", active: true },
    { id: 3, name: "Charlie", email: "charlie@example.com", role: "user", active: false }
  ]
}, null, 2)

export function PlaygroundClient() {
  const [jsonInput, setJsonInput] = useState(DEFAULT_JSON)
  const [zonOutput, setZonOutput] = useState("")
  const [error, setError] = useState("")
  const [jsonTokens, setJsonTokens] = useState(0)
  const [zonTokens, setZonTokens] = useState(0)
  const [isConverting, setIsConverting] = useState(false)

  // Debounce input to avoid excessive processing
  const [debouncedInput] = useDebounce(jsonInput, 300)

  // Convert JSON to ZON
  const convertToZon = useCallback((jsonString: string) => {
    try {
      setIsConverting(true)
      setError("")
      
      // Parse JSON
      const parsed = JSON.parse(jsonString)
      
      // Encode to ZON
      const zonEncoded = encode(parsed)
      
      setZonOutput(zonEncoded)
      
      // Count tokens
      const jTokens = countTokens(jsonString)
      const zTokens = countTokens(zonEncoded)
      
      setJsonTokens(jTokens)
      setZonTokens(zTokens)
      
    } catch (err) {
      if (err instanceof SyntaxError) {
        setError(`Invalid JSON: ${err.message}`)
      } else {
        setError(`Conversion error: ${err instanceof Error ? err.message : 'Unknown error'}`)
      }
      setZonOutput("")
      setJsonTokens(0)
      setZonTokens(0)
    } finally {
      setIsConverting(false)
    }
  }, [])

  // Convert on debounced input change
  useEffect(() => {
    if (debouncedInput.trim()) {
      convertToZon(debouncedInput)
    }
  }, [debouncedInput, convertToZon])

  // Load preset
  const handlePresetSelect = (preset: Preset) => {
    const formatted = JSON.stringify(preset.data, null, 2)
    setJsonInput(formatted)
  }

  // Reset to default
  const handleReset = () => {
    setJsonInput(DEFAULT_JSON)
  }

  // Format JSON
  const handleFormat = () => {
    try {
      const parsed = JSON.parse(jsonInput)
      const formatted = JSON.stringify(parsed, null, 2)
      setJsonInput(formatted)
    } catch (err) {
      // Ignore formatting errors
    }
  }

  const tokenReduction = jsonTokens > 0 
    ? Math.round(((jsonTokens - zonTokens) / jsonTokens) * 100)
    : 0

  const tokensSaved = jsonTokens - zonTokens
  const costSavings = (tokensSaved / 1000) * 0.03 // GPT-4 pricing

  return (
    <div className="flex flex-col min-h-screen bg-background relative isolate overflow-x-hidden">
      {/* Retro Grid Background */}
      <div className="absolute inset-x-0 top-0 -z-10 h-[400px] w-full overflow-hidden">
        <RetroGrid />
      </div>

      {/* Compact Hero */}
      <section className="relative py-8 sm:py-12 border-b border-border/40">
        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="flex flex-col items-start gap-3">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter text-primary">
                ZON Playground
              </h1>
              <Badge variant="secondary" className="text-xs font-medium">
                <Sparkles className="w-3 h-3 mr-1 inline" />
                Live
              </Badge>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground">
              Convert JSON to ZON and see the efficiency gains instantly
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto max-w-7xl px-4">
          
          {/* PRIORITY 1: Stats Dashboard - Immediate Impact */}
          {zonOutput && (
            <div className="mb-8">
              <StatsDashboard 
                jsonTokens={jsonTokens}
                zonTokens={zonTokens}
                tokenReduction={tokenReduction}
                tokensSaved={tokensSaved}
              />
            </div>
          )}

          {/* Controls */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-3">
              <PresetSelector onSelect={handlePresetSelect} />
              <Button variant="outline" size="sm" onClick={handleFormat}>
                Format JSON
              </Button>
              <Button variant="ghost" size="sm" onClick={handleReset}>
                <RotateCcw className="w-3 h-3 mr-1.5" />
                Reset
              </Button>
            </div>
            
            <div className="flex items-center gap-2 text-xs">
              {isConverting ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  Converting...
                </div>
              ) : zonOutput ? (
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  Live • Auto-updates
                </div>
              ) : (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Info className="w-3 h-3" />
                  Paste JSON to start
                </div>
              )}
            </div>
          </div>

          {/* PRIORITY 2: Editors - The Main Action */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* JSON Input */}
            <div className="relative">
              <div className="absolute -top-3 left-4 z-10 flex items-center gap-2">
                <Badge variant="secondary" className="text-xs font-medium shadow-sm">
                  JSON Input
                </Badge>
                {jsonTokens > 0 && (
                  <Badge variant="outline" className="text-xs font-medium tabular-nums">
                    {jsonTokens.toLocaleString()} tokens
                  </Badge>
                )}
              </div>
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                <CodeEditorPanel
                  value={jsonInput}
                  onChange={setJsonInput}
                  language="json"
                  label="JSON"
                  error={error}
                />
              </div>
            </div>

            {/* ZON Output */}
            <div className="relative">
              <div className="absolute -top-3 left-4 z-10 flex items-center gap-2">
                <Badge variant="secondary" className="text-xs font-medium shadow-sm">
                  ZON Output
                </Badge>
                {zonTokens > 0 && (
                  <Badge variant="outline" className="text-xs font-medium tabular-nums">
                    {zonTokens.toLocaleString()} tokens
                  </Badge>
                )}
                {tokenReduction > 0 && (
                  <Badge className="text-xs font-medium shadow-sm bg-green-600 text-white">
                    -{tokenReduction}%
                  </Badge>
                )}
              </div>
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                <CodeEditorPanel
                  value={zonOutput}
                  language="plaintext"
                  label="ZON"
                  readOnly
                />
              </div>
            </div>
          </div>



          {/* How It Works */}
          <div className="p-6 sm:p-8 rounded-xl border border-border bg-muted/30 backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-6 text-foreground flex items-center gap-2">
              <span>How it works</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    1
                  </div>
                  <span className="font-semibold text-foreground">Paste JSON</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Enter your JSON data or select from curated examples. Works with any valid JSON structure.
                </p>
              </div>
              
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    2
                  </div>
                  <span className="font-semibold text-foreground">Auto-Convert</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  ZON encoding happens automatically. Watch the token count drop in real-time.
                </p>
              </div>
              
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    3
                  </div>
                  <span className="font-semibold text-foreground">See Savings</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Compare token counts and estimated API cost savings instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
