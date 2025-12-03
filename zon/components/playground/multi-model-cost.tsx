"use client"

import { motion } from "framer-motion"
import { DollarSign, TrendingDown, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface ModelPricing {
  name: string
  provider: string
  inputCostPer1M: number // USD per 1M input tokens
  outputCostPer1M: number
  color: string
}

const MODEL_PRICING: ModelPricing[] = [
  { name: "GPT-4o", provider: "OpenAI", inputCostPer1M: 2.50, outputCostPer1M: 10.00, color: "emerald" },
  { name: "GPT-4 Turbo", provider: "OpenAI", inputCostPer1M: 10.00, outputCostPer1M: 30.00, color: "emerald" },
  { name: "Claude 3.5 Sonnet", provider: "Anthropic", inputCostPer1M: 3.00, outputCostPer1M: 15.00, color: "orange" },
  { name: "Claude 3 Opus", provider: "Anthropic", inputCostPer1M: 15.00, outputCostPer1M: 75.00, color: "orange" },
  { name: "Gemini 1.5 Pro", provider: "Google", inputCostPer1M: 1.25, outputCostPer1M: 5.00, color: "blue" },
  { name: "Gemini 1.5 Flash", provider: "Google", inputCostPer1M: 0.075, outputCostPer1M: 0.30, color: "blue" },
]

interface MultiModelCostProps {
  tokensSaved: number
  className?: string
}

export function MultiModelCost({ tokensSaved, className }: MultiModelCostProps) {
  if (tokensSaved <= 0) return null

  // Calculate savings for different request volumes
  const volumes = [
    { label: "1K requests", multiplier: 1000 },
    { label: "100K requests", multiplier: 100000 },
    { label: "1M requests", multiplier: 1000000 },
  ]

  const selectedVolume = volumes[1] // Default to 100K

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">
            Cost Savings Across Models
          </h3>
          <p className="text-sm text-muted-foreground">
            Real pricing from major LLM providers • Updated Dec 2024
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
          <TrendingDown className="w-3 h-3 text-green-600 dark:text-green-400" />
          <span className="text-xs font-medium text-green-600 dark:text-green-400">
            {tokensSaved.toLocaleString()} tokens saved
          </span>
        </div>
      </div>

      {/* Volume Selector */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Showing savings at:</span>
        <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-muted border border-border">
          <Zap className="w-3 h-3" />
          <span className="font-medium text-foreground">{selectedVolume.label}</span>
        </div>
      </div>

      {/* Model Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MODEL_PRICING.map((model, index) => {
          const savingsPerRequest = (tokensSaved / 1_000_000) * model.inputCostPer1M
          const totalSavings = savingsPerRequest * selectedVolume.multiplier

          return (
            <motion.div
              key={model.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "p-5 rounded-xl border transition-all duration-200 hover:shadow-lg",
                "bg-gradient-to-br from-card to-card/50",
                model.color === "emerald" && "border-emerald-200 dark:border-emerald-900/50",
                model.color === "orange" && "border-orange-200 dark:border-orange-900/50",
                model.color === "blue" && "border-blue-200 dark:border-blue-900/50"
              )}
            >
              {/* Model Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-sm text-foreground mb-0.5">
                    {model.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">{model.provider}</p>
                </div>
                <div className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-medium",
                  model.color === "emerald" && "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300",
                  model.color === "orange" && "bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300",
                  model.color === "blue" && "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
                )}>
                  Input
                </div>
              </div>

              {/* Savings Amount */}
              <div className="mb-3">
                <div className="flex items-baseline gap-1 mb-1">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span className="text-2xl font-bold text-foreground tabular-nums">
                    {totalSavings < 0.01 ? "0.01" : totalSavings.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  saved per {selectedVolume.label.toLowerCase()}
                </p>
              </div>

              {/* Pricing Details */}
              <div className="pt-3 border-t border-border space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Input pricing</span>
                  <span className="font-medium text-foreground tabular-nums">
                    ${model.inputCostPer1M.toFixed(2)}/1M
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Per request</span>
                  <span className="font-medium text-green-600 dark:text-green-400 tabular-nums">
                    ${savingsPerRequest < 0.0001 ? "0.0001" : savingsPerRequest.toFixed(4)}
                  </span>
                </div>
              </div>

              {/* Annual Projection */}
              {selectedVolume.multiplier >= 100000 && (
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground">Annual (12M reqs)</span>
                    <span className="text-xs font-bold text-foreground tabular-nums">
                      ${((totalSavings / selectedVolume.multiplier) * 12_000_000).toFixed(0)}K
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-6 rounded-xl border border-border bg-gradient-to-br from-muted/50 to-muted/20"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-xs text-muted-foreground mb-2">Average Savings</div>
            <div className="text-2xl font-bold text-foreground tabular-nums">
              ${(MODEL_PRICING.reduce((sum, model) => {
                const savingsPerRequest = (tokensSaved / 1_000_000) * model.inputCostPer1M
                return sum + (savingsPerRequest * selectedVolume.multiplier)
              }, 0) / MODEL_PRICING.length).toFixed(2)}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              across all models
            </div>
          </div>

          <div>
            <div className="text-xs text-muted-foreground mb-2">Best Value</div>
            <div className="text-2xl font-bold text-foreground">
              {MODEL_PRICING.reduce((best, model) => {
                const savingsPerRequest = (tokensSaved / 1_000_000) * model.inputCostPer1M
                const totalSavings = savingsPerRequest * selectedVolume.multiplier
                const bestSavings = (tokensSaved / 1_000_000) * best.inputCostPer1M * selectedVolume.multiplier
                return totalSavings > bestSavings ? model : best
              }).name}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              highest absolute savings
            </div>
          </div>

          <div>
            <div className="text-xs text-muted-foreground mb-2">ROI Impact</div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400 tabular-nums">
              ~50%
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              reduction in token costs
            </div>
          </div>
        </div>
      </motion.div>

      {/* Info Footer */}
      <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50">
        <DollarSign className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
        <div className="flex-1 text-xs text-blue-900 dark:text-blue-100">
          <p className="font-medium mb-1">Pricing based on input tokens only</p>
          <p className="text-blue-700 dark:text-blue-300">
            Output token savings vary by use case. If your LLM generates ZON responses, you'll see additional savings on output tokens. 
            Prices are current as of December 2024 and may vary.
          </p>
        </div>
      </div>
    </div>
  )
}
