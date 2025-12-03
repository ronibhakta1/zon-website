"use client"

import { motion } from "framer-motion"
import { TrendingDown, Zap, DollarSign, BarChart3, FileJson, Crown } from "lucide-react"
import { cn } from "@/lib/utils"

interface LiveStatsProps {
  jsonTokens: number
  zonTokens: number
  jsonChars: number
  zonChars: number
  className?: string
}

export function LiveStats({
  jsonTokens,
  zonTokens,
  jsonChars,
  zonChars,
  className
}: LiveStatsProps) {
  const tokenReduction = jsonTokens > 0 
    ? Math.round(((jsonTokens - zonTokens) / jsonTokens) * 100)
    : 0
  
  const charReduction = jsonChars > 0
    ? Math.round(((jsonChars - zonChars) / jsonChars) * 100)
    : 0

  const tokensSaved = jsonTokens - zonTokens
  const costSavings = (tokensSaved / 1000) * 0.03

  // Calculate efficiency score (similar to homepage)
  const efficiencyScore = jsonTokens > 0 
    ? ((zonTokens / jsonTokens) * 100).toFixed(1)
    : "0.0"

  const maxTokens = Math.max(jsonTokens, zonTokens, 1)
  const totalBlocks = 20
  const zonBlocks = Math.round((zonTokens / maxTokens) * totalBlocks)
  const jsonBlocks = Math.round((jsonTokens / maxTokens) * totalBlocks)

  return (
    <div className={cn("space-y-6", className)}>
      {/* Hero Stats - Big Numbers */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="p-4 sm:p-6 rounded-xl border border-border bg-gradient-to-br from-green-500/10 to-green-600/5 hover:shadow-lg transition-all duration-200"
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-xs font-medium text-muted-foreground">Token Reduction</span>
          </div>
          <div className="text-3xl sm:text-4xl font-bold text-green-600 dark:text-green-400 tabular-nums">
            {tokenReduction}%
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {tokensSaved > 0 ? `${tokensSaved.toLocaleString()} saved` : 'No data'}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="p-4 sm:p-6 rounded-xl border border-border bg-gradient-to-br from-blue-500/10 to-blue-600/5 hover:shadow-lg transition-all duration-200"
        >
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-medium text-muted-foreground">Efficiency</span>
          </div>
          <div className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400 tabular-nums">
            {efficiencyScore}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            ZON/JSON ratio
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="p-4 sm:p-6 rounded-xl border border-border bg-gradient-to-br from-amber-500/10 to-amber-600/5 hover:shadow-lg transition-all duration-200"
        >
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span className="text-xs font-medium text-muted-foreground">Cost Saved</span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-amber-600 dark:text-amber-400 tabular-nums">
            {costSavings < 0.0001 ? "$0.00" : `$${costSavings.toFixed(4)}`}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            per request
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="p-4 sm:p-6 rounded-xl border border-border bg-gradient-to-br from-purple-500/10 to-purple-600/5 hover:shadow-lg transition-all duration-200"
        >
          <div className="flex items-center gap-2 mb-2">
            <FileJson className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-xs font-medium text-muted-foreground">Size Reduction</span>
          </div>
          <div className="text-3xl sm:text-4xl font-bold text-purple-600 dark:text-purple-400 tabular-nums">
            {charReduction}%
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {jsonChars - zonChars > 0 ? `${(jsonChars - zonChars).toLocaleString()} chars` : 'No data'}
          </div>
        </motion.div>
      </div>

      {/* Visual Comparison Bar (like homepage) */}
      {jsonTokens > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-xl border border-zinc-800/50 bg-gradient-to-br from-[#0a0a0a] to-[#0f0f0f] font-mono shadow-xl"
        >
          <div className="mb-4">
            <h3 className="text-sm text-zinc-400 mb-1">Live Token Comparison</h3>
            <p className="text-xs text-zinc-600">Real-time visualization of your data</p>
          </div>

          <div className="space-y-4">
            {/* ZON Bar */}
            <div className="flex items-center gap-4">
              <div className="w-20 shrink-0 flex items-center gap-2">
                <span className="text-sm font-medium text-zinc-100">ZON</span>
                <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              </div>
              
              <div className="flex-1 flex items-center gap-[2px]">
                {Array.from({ length: totalBlocks }).map((_, i) => {
                  const isFilled = i < zonBlocks
                  return (
                    <div
                      key={i}
                      className={cn(
                        "h-5 flex-1 rounded-sm transition-all duration-500",
                        isFilled 
                          ? "bg-zinc-100 shadow-[0_0_8px_rgba(255,255,255,0.3)]" 
                          : "bg-zinc-900/60 border border-zinc-800/40"
                      )}
                    />
                  )
                })}
              </div>

              <div className="w-32 text-right">
                <span className="text-sm font-medium text-zinc-200 tabular-nums">
                  {zonTokens.toLocaleString()} tokens
                </span>
              </div>
            </div>

            {/* JSON Bar */}
            <div className="flex items-center gap-4">
              <div className="w-20 shrink-0">
                <span className="text-sm text-zinc-500">JSON</span>
              </div>
              
              <div className="flex-1 flex items-center gap-[2px]">
                {Array.from({ length: totalBlocks }).map((_, i) => {
                  const isFilled = i < jsonBlocks
                  return (
                    <div
                      key={i}
                      className={cn(
                        "h-5 flex-1 rounded-sm transition-all duration-500",
                        isFilled 
                          ? "bg-zinc-600" 
                          : "bg-zinc-900/60 border border-zinc-800/40"
                      )}
                    />
                  )
                })}
              </div>

              <div className="w-32 text-right">
                <span className="text-sm text-zinc-500 tabular-nums">
                  {jsonTokens.toLocaleString()} tokens
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 pt-4 border-t border-zinc-800/50 flex justify-between items-center">
            <span className="text-xs text-zinc-600">GPT-4 Tokenization</span>
            <span className="text-xs text-zinc-400 font-medium">
              {tokenReduction}% more efficient
            </span>
          </div>
        </motion.div>
      )}

      {/* Additional Insights */}
      {jsonTokens > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="p-4 rounded-lg border border-border bg-card">
            <div className="text-xs text-muted-foreground mb-1">At 1M requests/month</div>
            <div className="text-xl font-bold text-foreground tabular-nums">
              ${((costSavings * 1000000) / 1000).toFixed(0)}K
            </div>
            <div className="text-xs text-muted-foreground mt-1">potential savings</div>
          </div>

          <div className="p-4 rounded-lg border border-border bg-card">
            <div className="text-xs text-muted-foreground mb-1">Bandwidth saved</div>
            <div className="text-xl font-bold text-foreground tabular-nums">
              {((jsonChars - zonChars) / 1024).toFixed(1)} KB
            </div>
            <div className="text-xs text-muted-foreground mt-1">per request</div>
          </div>

          <div className="p-4 rounded-lg border border-border bg-card">
            <div className="text-xs text-muted-foreground mb-1">Response time</div>
            <div className="text-xl font-bold text-foreground tabular-nums">
              ~{Math.round(tokenReduction * 0.5)}%
            </div>
            <div className="text-xs text-muted-foreground mt-1">faster processing</div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
