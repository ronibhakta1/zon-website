"use client"

import { motion } from "framer-motion"
import { TrendingDown, Zap, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"

interface TokenComparisonProps {
  jsonTokens: number
  zonTokens: number
  jsonChars: number
  zonChars: number
  className?: string
}

export function TokenComparison({
  jsonTokens,
  zonTokens,
  jsonChars,
  zonChars,
  className
}: TokenComparisonProps) {
  const tokenReduction = jsonTokens > 0 
    ? Math.round(((jsonTokens - zonTokens) / jsonTokens) * 100)
    : 0
  
  const charReduction = jsonChars > 0
    ? Math.round(((jsonChars - zonChars) / jsonChars) * 100)
    : 0

  // Estimate cost savings (GPT-4: $0.03 per 1K input tokens)
  const tokensSaved = jsonTokens - zonTokens
  const costSavings = (tokensSaved / 1000) * 0.03

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4", className)}>
      {/* Token Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-6 rounded-xl border border-border bg-card hover:shadow-md transition-shadow duration-200"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Zap className="w-4 h-4 text-primary" />
          </div>
          <h4 className="text-sm font-semibold text-card-foreground">Token Efficiency</h4>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-muted-foreground">JSON</span>
            <span className="text-lg font-bold font-mono text-foreground">
              {jsonTokens.toLocaleString()}
            </span>
          </div>
          
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-muted-foreground">ZON</span>
            <span className="text-lg font-bold font-mono text-foreground">
              {zonTokens.toLocaleString()}
            </span>
          </div>

          {tokenReduction > 0 && (
            <div className="pt-3 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-green-600 dark:text-green-400 flex items-center gap-1">
                  <TrendingDown className="w-3 h-3" />
                  Reduction
                </span>
                <span className="text-xl font-bold text-green-600 dark:text-green-400">
                  {tokenReduction}%
                </span>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Character Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 rounded-xl border border-border bg-card hover:shadow-md transition-shadow duration-200"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <TrendingDown className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <h4 className="text-sm font-semibold text-card-foreground">Size Reduction</h4>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-muted-foreground">JSON</span>
            <span className="text-lg font-bold font-mono text-foreground">
              {jsonChars.toLocaleString()}
            </span>
          </div>
          
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-muted-foreground">ZON</span>
            <span className="text-lg font-bold font-mono text-foreground">
              {zonChars.toLocaleString()}
            </span>
          </div>

          {charReduction > 0 && (
            <div className="pt-3 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1">
                  <TrendingDown className="w-3 h-3" />
                  Smaller
                </span>
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  {charReduction}%
                </span>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Cost Savings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-6 rounded-xl border border-border bg-card hover:shadow-md transition-shadow duration-200"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-amber-500/10">
            <DollarSign className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <h4 className="text-sm font-semibold text-card-foreground">Cost Savings</h4>
        </div>
        
        <div className="space-y-3">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Per request</p>
            <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {costSavings < 0.0001 ? "$0.00" : `$${costSavings.toFixed(4)}`}
            </p>
          </div>

          <div className="pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground mb-1">Tokens saved</p>
            <p className="text-lg font-bold font-mono text-foreground">
              {tokensSaved > 0 ? tokensSaved.toLocaleString() : 0}
            </p>
          </div>

          <div className="pt-2">
            <p className="text-xs text-muted-foreground leading-tight">
              Based on GPT-4 pricing: $0.03/1K input tokens
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
