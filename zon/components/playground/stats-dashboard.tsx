"use client"

import { motion } from "framer-motion"
import { TrendingDown, Zap, DollarSign, Award, ArrowRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { 
  PRICING, 
  type ModelKey, 
  calculateSavings, 
  calculateAtScale, 
  getEfficiencyRating,
  formatCost 
} from "./cost-calculator"
import { useRef, useState } from "react"

interface StatsDashboardProps {
  jsonTokens: number
  zonTokens: number
  tokenReduction: number
  tokensSaved: number
}

import { SpotlightCard } from "@/components/ui/spotlight-card"

export function StatsDashboard({ 
  jsonTokens, 
  zonTokens, 
  tokenReduction, 
  tokensSaved 
}: StatsDashboardProps) {
  const rating = getEfficiencyRating(tokenReduction)
  const models: ModelKey[] = ["gpt5", "o3", "claude45"]
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Token Reduction Meter */}
      <SpotlightCard gradientColor="rgba(34, 197, 94, 0.15)" className="transition-transform duration-300 hover:-translate-y-1">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              {/* Circular Progress Ring */}
              <div className="relative flex items-center justify-center w-14 h-14">
                <svg className="w-full h-full transform -rotate-90">
                  {/* Background Ring */}
                  <circle
                    cx="28"
                    cy="28"
                    r="24"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    className="text-zinc-100 dark:text-zinc-800/50"
                  />
                  {/* Progress Ring */}
                  <circle
                    cx="28"
                    cy="28"
                    r="24"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 24}
                    strokeDashoffset={2 * Math.PI * 24 - (tokenReduction / 100) * (2 * Math.PI * 24)}
                    strokeLinecap="round"
                    className={cn("transition-all duration-1000 ease-out", rating.color)}
                  />
                </svg>
                {/* Grade Text */}
                <div className={cn("absolute inset-0 flex items-center justify-center font-bold text-lg", rating.color)}>
                  {rating.grade}
                </div>
              </div>
              
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Token Efficiency</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">{rating.label} Optimization</p>
              </div>
            </div>

            <div className="text-right">
              <div className="text-3xl font-bold tracking-tight tabular-nums text-zinc-900 dark:text-zinc-100">
                {tokenReduction}%
              </div>
              <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mt-1">Reduction</p>
            </div>
          </div>

          {/* Visual Meter - Block-based like homepage */}
          <div className="space-y-3 mb-4">
            {/* JSON Bar */}
            <div className="flex items-center gap-3 font-mono text-sm text-zinc-600 dark:text-zinc-400">
              <span className="w-16">JSON</span>
              <div className="flex-1 flex items-center gap-[2px]">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-6 flex-1 rounded-sm bg-zinc-900 dark:bg-zinc-100 dark:shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                  />
                ))}
              </div>
              <span className="w-20 text-right tabular-nums font-medium">{jsonTokens.toLocaleString()}</span>
            </div>
            
            {/* ZON Bar */}
            <div className="flex items-center gap-3 font-mono text-sm text-zinc-900 dark:text-zinc-100">
              <span className="w-16 font-bold">ZON</span>
              <div className="flex-1 flex items-center gap-[2px]">
                {Array.from({ length: 30 }).map((_, i) => {
                  const fillPercentage = jsonTokens > 0 ? (zonTokens / jsonTokens) : 0
                  const filledBlocks = Math.round(fillPercentage * 30)
                  const isFilled = i < filledBlocks
                  
                  return (
                    <div
                      key={i}
                      className={cn(
                        "h-6 flex-1 rounded-sm transition-all duration-300",
                        isFilled 
                          ? "bg-zinc-900 dark:bg-zinc-100 dark:shadow-[0_0_8px_rgba(255,255,255,0.3)]" 
                          : "bg-zinc-200 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800/40"
                      )}
                    />
                  )
                })}
              </div>
              <span className="w-20 text-right tabular-nums font-bold">{zonTokens.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <TrendingDown className="w-4 h-4" />
            <span className="font-medium tabular-nums">{tokensSaved.toLocaleString()} tokens saved</span>
          </div>
        </div>
      </SpotlightCard>

      {/* Cost Savings Teaser */}
      <SpotlightCard gradientColor="rgba(99, 102, 241, 0.15)" className="transition-transform duration-300 hover:-translate-y-1 group cursor-pointer">
        <Link href="/savings" className="block p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="inline-flex p-3 rounded-lg bg-zinc-100 dark:bg-white/5 group-hover:bg-zinc-200 dark:group-hover:bg-white/10 transition-colors">
                <DollarSign className="w-6 h-6 text-zinc-900 dark:text-zinc-100" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-primary transition-colors">
                  Calculate ROI
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  See how much you can save with GPT-5 & o3
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-primary font-medium text-sm">
              View Calculator
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </Link>
      </SpotlightCard>
    </motion.div>
  )
}
