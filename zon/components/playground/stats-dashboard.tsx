"use client"

import { motion } from "framer-motion"
import { TrendingDown, Zap, DollarSign, Award } from "lucide-react"
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

function SpotlightCard({ children, className = "", gradientColor = "#262626" }: { children: React.ReactNode; className?: string; gradientColor?: string }) {
  const divRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return
    const div = divRef.current
    const rect = div.getBoundingClientRect()
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleMouseEnter = () => setOpacity(1)
  const handleMouseLeave = () => setOpacity(0)

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm transition-all duration-300 hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700",
        className
      )}
    >
      {/* Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] pointer-events-none z-0 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-10"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${gradientColor}, transparent 40%)`,
        }}
      />
      <div className="relative h-full z-20">{children}</div>
    </div>
  )
}

export function StatsDashboard({ 
  jsonTokens, 
  zonTokens, 
  tokenReduction, 
  tokensSaved 
}: StatsDashboardProps) {
  const rating = getEfficiencyRating(tokenReduction)
  const models: ModelKey[] = ["gpt4", "claude", "gemini"]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Token Reduction Meter */}
      <SpotlightCard gradientColor="rgba(34, 197, 94, 0.15)" className="transition-transform duration-300 hover:-translate-y-1">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl shadow-sm", rating.color, "bg-current/10")}>
                {rating.grade}
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Token Efficiency</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{rating.label} Optimization</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 tabular-nums">
                {tokenReduction}%
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Reduction</p>
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

      {/* Multi-Model Cost Comparison */}
      <SpotlightCard gradientColor="rgba(99, 102, 241, 0.15)" className="transition-transform duration-300 hover:-translate-y-1">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex p-3 rounded-lg bg-zinc-100 dark:bg-white/5 w-fit">
              <DollarSign className="w-5 h-5 text-zinc-900 dark:text-zinc-100" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Cost Comparison</h3>
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Per request • Input tokens</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {models.map((model) => {
              const pricing = PRICING[model]
              const savings = calculateSavings(jsonTokens, zonTokens, model, false)
              
              return (
                <div key={model} className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/30 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900/50">
                  <div className="flex items-center justify-between mb-4">
                    <span className={cn("font-bold text-sm", pricing.color)}>
                      {pricing.name}
                    </span>
                    <span className="text-xs text-zinc-600 dark:text-zinc-400 font-mono">
                      ${pricing.input}/1M
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm font-mono">
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-600 dark:text-zinc-400">JSON</span>
                      <span className="text-zinc-900 dark:text-zinc-100 line-through opacity-60 font-medium">
                        {formatCost(savings.jsonCost)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-900 dark:text-zinc-100 font-bold">ZON ✓</span>
                      <span className="text-green-600 dark:text-green-400 font-bold">
                        {formatCost(savings.zonCost)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-zinc-600 dark:text-zinc-400">Saved</span>
                      <span className="text-base font-bold text-green-600 dark:text-green-400 tabular-nums">
                        {formatCost(savings.savings)}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </SpotlightCard>

      {/* Real-World Impact */}
      <SpotlightCard gradientColor="rgba(59, 130, 246, 0.15)" className="transition-transform duration-300 hover:-translate-y-1">
        <div className="p-6 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 w-fit">
              <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Real-World Impact</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {models.map((model) => {
              const pricing = PRICING[model]
              const atScale = calculateAtScale(tokensSaved, 1_000_000, model, false)
              
              return (
                <div key={model} className="text-center">
                  <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-2 font-medium">{pricing.name}</div>
                  <div className={cn("text-3xl font-bold tabular-nums", pricing.color)}>
                    {formatCost(atScale.costSaved)}
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">at 1M requests</div>
                </div>
              )
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-blue-200 dark:border-blue-900/50 text-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              💡 Multiply your savings at scale with every API call
            </p>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  )
}
