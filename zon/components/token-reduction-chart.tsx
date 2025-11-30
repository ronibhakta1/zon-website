"use client"

import { cn } from "@/lib/utils"

interface TokenData {
  format: string
  tokens: number
  savings?: string
}

const data: TokenData[] = [
  { format: "ZON", tokens: 147267, savings: "22%" },
  { format: "CSV", tokens: 165647, savings: "12%" },
  { format: "JSON", tokens: 189193 },
]

export function TokenReductionChart() {
  const maxTokens = Math.max(...data.map(d => d.tokens))

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 rounded-xl border border-zinc-800/50 bg-[#09090b] font-mono shadow-2xl">
      <div className="mb-3 sm:mb-4">
        <h3 className="text-xs sm:text-sm text-zinc-400">Token Reduction · GPT-4o Total</h3>
      </div>

      <div className="space-y-3">
        {data.map((item) => {
          const percentage = (item.tokens / maxTokens) * 100
          const isWinner = item.format === "ZON"
          
          return (
            <div key={item.format} className="flex items-center gap-3 sm:gap-4">
              <div className={cn(
                "w-16 sm:w-20 shrink-0 text-xs sm:text-sm",
                isWinner ? "text-zinc-100 font-medium" : "text-zinc-500"
              )}>
                {item.format}
              </div>
              
              <div className="flex-1 h-3 sm:h-4 bg-zinc-900/60 rounded-sm overflow-hidden border border-zinc-800/40">
                <div
                  className={cn(
                    "h-full transition-all duration-1000",
                    isWinner ? "bg-zinc-100" : "bg-zinc-600"
                  )}
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <div className="flex items-center gap-2 shrink-0 text-xs tabular-nums">
                {item.savings && (
                  <span className={cn(
                    "font-medium",
                    isWinner ? "text-zinc-200" : "text-zinc-500"
                  )}>
                    -{item.savings}
                  </span>
                )}
                <span className="text-zinc-600 w-20 sm:w-24 text-right">
                  {(item.tokens / 1000).toFixed(0)}K
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
