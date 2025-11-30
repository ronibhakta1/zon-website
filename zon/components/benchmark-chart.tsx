"use client"

import { cn } from "@/lib/utils"
import { Crown } from "lucide-react"

interface BenchmarkData {
  label: string
  score: number
  accuracy: string
  tokens: string
  isWinner?: boolean
}

const data: BenchmarkData[] = [
  { label: "ZON", score: 1430.6, accuracy: "99.0%", tokens: "692", isWinner: true },
  { label: "CSV", score: 1386.5, accuracy: "99.0%", tokens: "714" },
  { label: "JSON compact", score: 1143.4, accuracy: "91.7%", tokens: "802" },
  { label: "TOON", score: 1132.7, accuracy: "99.0%", tokens: "874" },
  { label: "JSON", score: 744.6, accuracy: "96.8%", tokens: "1,300" },
]

export function BenchmarkChart() {
  const maxScore = 1450 
  const totalBlocks = 30

  return (
    <div className="w-full max-w-5xl mx-auto p-8 rounded-2xl border border-zinc-800/50 bg-gradient-to-br from-[#0a0a0a] to-[#0f0f0f] font-mono shadow-2xl">
      <div className="flex flex-col gap-4">
        {data.map((item) => {
          const fillPercentage = Math.min(item.score / maxScore, 1)
          const filledBlocks = Math.round(fillPercentage * totalBlocks)
          
          return (
            <div key={item.label} className="flex items-center gap-6 group">
              {/* Label */}
              <div className={cn(
                "w-28 shrink-0 font-medium text-sm transition-colors",
                item.isWinner ? "text-zinc-100" : "text-zinc-500"
              )}>
                {item.label}
              </div>

              {/* Block Bar Container */}
              <div className="flex-1 flex items-center gap-1">
                {Array.from({ length: totalBlocks }).map((_, i) => {
                  const isFilled = i < filledBlocks
                  return (
                    <div
                      key={i}
                      className={cn(
                        "h-6 flex-1 rounded-sm transition-all duration-300",
                        isFilled 
                          ? "bg-zinc-100 shadow-[0_0_8px_rgba(255,255,255,0.3)]" 
                          : "bg-zinc-900/60 border border-zinc-800/40"
                      )}
                    />
                  )
                })}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 shrink-0 text-[13px]">
                <span className={cn(
                  "w-32 text-right tabular-nums font-medium tracking-tight",
                  item.isWinner ? "text-zinc-200" : "text-zinc-500"
                )}>
                  {item.score.toFixed(1)} acc%/10K
                </span>
                <span className="text-zinc-800">|</span>
                <span className={cn(
                  "w-20 text-right tabular-nums",
                  item.isWinner ? "text-zinc-200" : "text-zinc-500"
                )}>
                  {item.accuracy} acc
                </span>
                <span className="text-zinc-800">|</span>
                <div className={cn(
                  "w-32 text-right tabular-nums flex items-center justify-end gap-2",
                  item.isWinner ? "text-zinc-200" : "text-zinc-500"
                )}>
                  <span>{item.tokens} tokens</span>
                  {item.isWinner && (
                    <Crown className="w-4 h-4 text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-zinc-800/50 flex justify-center">
        <div className="text-xs text-zinc-600 font-medium tracking-wide">
          Efficiency Ranking · GPT-5-nano (Azure OpenAI) · 309 Questions
        </div>
      </div>
    </div>
  )
}
