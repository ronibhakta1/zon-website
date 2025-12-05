"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ArrowRight, DollarSign, Zap, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { RetroGrid } from "@/components/ui/retro-grid"
import { type PRICING } from "@/components/playground/cost-calculator"

import { SpotlightCard } from "@/components/ui/spotlight-card"

interface SavingsCalculatorProps {
  pricing: typeof PRICING
}

export function SavingsCalculator({ pricing }: SavingsCalculatorProps) {
  const [requests, setRequests] = useState(100000) // 100k requests
  const [avgTokens, setAvgTokens] = useState(1000) // 1k tokens per request
  const [reduction, setReduction] = useState(35) // 35% reduction

  const totalTokens = requests * avgTokens
  const savedTokens = totalTokens * (reduction / 100)

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(num)
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="lg:col-span-4 space-y-8">
          <div className="space-y-6 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl shadow-sm">
            <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100">Estimator Settings</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Monthly Requests</label>
                <Badge variant="secondary" className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700">{formatNumber(requests)}</Badge>
              </div>
              <Slider
                value={[requests]}
                onValueChange={(v: number[]) => setRequests(v[0])}
                min={1000}
                max={10000000}
                step={1000}
                className="py-2"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Avg. Tokens / Req</label>
                <Badge variant="secondary" className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700">{formatNumber(avgTokens)}</Badge>
              </div>
              <Slider
                value={[avgTokens]}
                onValueChange={(v: number[]) => setAvgTokens(v[0])}
                min={100}
                max={10000}
                step={100}
                className="py-2"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">ZON Reduction</label>
                <Badge className="bg-green-600 hover:bg-green-700 text-white">{reduction}%</Badge>
              </div>
              <Slider
                value={[reduction]}
                onValueChange={(v: number[]) => setReduction(v[0])}
                min={10}
                max={60}
                step={5}
                className="py-2"
              />
              <p className="text-xs text-zinc-500 dark:text-zinc-500">
                Based on typical ZON performance (30-50%)
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-5 h-5 text-zinc-900 dark:text-zinc-100" />
              <h4 className="font-bold text-zinc-900 dark:text-zinc-100">Total Impact</h4>
            </div>
            <p className="text-3xl font-bold tracking-tight mb-1 text-zinc-900 dark:text-zinc-100">
              {formatNumber(savedTokens)}
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Tokens saved per month</p>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(Object.entries(pricing) as [keyof typeof pricing, typeof pricing[keyof typeof pricing]][]).map(([key, model]) => {
              const costPerMillion = model.input // Using input price for simplicity
              const monthlySpend = (totalTokens / 1_000_000) * costPerMillion
              const monthlySavings = (savedTokens / 1_000_000) * costPerMillion
              const yearlySavings = monthlySavings * 12

              return (
                <SpotlightCard
                  key={key}
                  gradientColor={
                    key.includes('gpt') ? "rgba(16, 185, 129, 0.15)" :
                    key.includes('claude') ? "rgba(147, 51, 234, 0.15)" :
                    key.includes('gemini') ? "rgba(37, 99, 235, 0.15)" :
                    "rgba(245, 158, 11, 0.15)" // o1 fallback
                  }
                  className="group"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <h3 className={cn("font-bold text-lg", model.color)}>{model.name}</h3>
                        <Badge variant="outline" className="font-mono text-[10px] border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400">
                          ${model.input}/1M
                        </Badge>
                      </div>
                      <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/40 border-0">
                        {((100 / (100 - reduction))).toFixed(1)}x Value
                      </Badge>
                    </div>

                    <div className="space-y-6">
                      {/* Visual Savings Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium">
                          <span className="text-zinc-500">Cost Breakdown</span>
                          <span className="text-green-600 dark:text-green-400">-{reduction}% Cost</span>
                        </div>
                        <div className="h-3 w-full flex rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                          {/* ZON Cost Segment */}
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${100 - reduction}%` }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="h-full bg-zinc-300 dark:bg-zinc-600"
                          />
                          {/* Savings Segment */}
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${reduction}%` }}
                            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                            className="h-full bg-green-500 dark:bg-green-500"
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-zinc-400">
                          <span>With ZON</span>
                          <span>Savings</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/50">
                        <div>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Monthly Savings</p>
                          <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                            {formatMoney(monthlySavings)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-medium text-green-600 dark:text-green-400 mb-1">Yearly Projected</p>
                          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                            {formatMoney(yearlySavings)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
