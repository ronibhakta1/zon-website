// LLM Pricing (per 1M tokens)
// Prices updated: Dec 2024
export const PRICING = {
  gpt5: {
    name: "GPT-5",
    input: 1.25,
    output: 10.00,
    color: "text-emerald-600 dark:text-emerald-400"
  },
  gpt4o: {
    name: "GPT-4o",
    input: 2.50,
    output: 10.00,
    color: "text-emerald-600 dark:text-emerald-400"
  },
  o3: {
    name: "OpenAI o3",
    input: 2.00,
    output: 8.00,
    color: "text-rose-600 dark:text-rose-400"
  },
  o1preview: {
    name: "OpenAI o1-preview",
    input: 15.00,
    output: 60.00,
    color: "text-orange-600 dark:text-orange-400"
  },
  o1mini: {
    name: "OpenAI o1-mini",
    input: 3.00,
    output: 12.00,
    color: "text-amber-600 dark:text-amber-400"
  },
  claude45: {
    name: "Claude 4.5 Sonnet",
    input: 3.00,
    output: 15.00,
    color: "text-violet-600 dark:text-violet-400"
  },
  claude: {
    name: "Claude 3.5 Sonnet",
    input: 3.00,
    output: 15.00,
    color: "text-purple-600 dark:text-purple-400"
  },
  gemini: {
    name: "Gemini 1.5 Pro",
    input: 1.25,
    output: 5.00,
    color: "text-blue-600 dark:text-blue-400"
  },
  geminiflash: {
    name: "Gemini 1.5 Flash",
    input: 0.0375,
    output: 0.15,
    color: "text-cyan-600 dark:text-cyan-400"
  }
} as const

export type ModelKey = keyof typeof PRICING

/**
 * Calculate cost savings for a given model
 */
export function calculateSavings(
  jsonTokens: number,
  zonTokens: number,
  model: ModelKey,
  isOutput = false
) {
  const pricing = PRICING[model]
  const rate = isOutput ? pricing.output : pricing.input
  
  const jsonCost = (jsonTokens / 1_000_000) * rate
  const zonCost = (zonTokens / 1_000_000) * rate
  const savings = jsonCost - zonCost
  
  return {
    jsonCost,
    zonCost,
    savings,
    savingsPercent: jsonTokens > 0 ? ((savings / jsonCost) * 100) : 0
  }
}

/**
 * Calculate savings at scale
 */
export function calculateAtScale(
  tokensSaved: number,
  requests: number,
  model: ModelKey,
  isOutput = false
) {
  const pricing = PRICING[model]
  const rate = isOutput ? pricing.output : pricing.input
  
  const totalTokensSaved = tokensSaved * requests
  const costSaved = (totalTokensSaved / 1_000_000) * rate
  
  return {
    totalTokensSaved,
    costSaved
  }
}

/**
 * Get efficiency rating based on token reduction percentage
 */
export function getEfficiencyRating(reductionPercent: number): {
  grade: string
  label: string
  color: string
} {
  if (reductionPercent >= 50) {
    return {
      grade: "S",
      label: "Exceptional",
      color: "text-amber-500"
    }
  } else if (reductionPercent >= 40) {
    return {
      grade: "A+",
      label: "Excellent",
      color: "text-green-500"
    }
  } else if (reductionPercent >= 30) {
    return {
      grade: "A",
      label: "Great",
      color: "text-green-600"
    }
  } else if (reductionPercent >= 20) {
    return {
      grade: "B",
      label: "Good",
      color: "text-blue-600"
    }
  } else if (reductionPercent >= 10) {
    return {
      grade: "C",
      label: "Fair",
      color: "text-zinc-600"
    }
  } else {
    return {
      grade: "D",
      label: "Minimal",
      color: "text-zinc-500"
    }
  }
}

/**
 * Format currency with appropriate precision
 */
export function formatCost(cost: number): string {
  if (cost < 0.0001) return "$0.00"
  if (cost < 0.01) return `$${cost.toFixed(4)}`
  if (cost < 1) return `$${cost.toFixed(3)}`
  return `$${cost.toFixed(2)}`
}
