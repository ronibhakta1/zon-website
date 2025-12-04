// LLM Pricing (per 1M tokens)
export const PRICING = {
  gpt4: {
    name: "GPT-4 Turbo",
    input: 10,
    output: 30,
    color: "text-emerald-600 dark:text-emerald-400"
  },
  claude: {
    name: "Claude 3.5 Sonnet",
    input: 3,
    output: 15,
    color: "text-purple-600 dark:text-purple-400"
  },
  gemini: {
    name: "Gemini 1.5 Pro",
    input: 1.25,
    output: 5,
    color: "text-blue-600 dark:text-blue-400"
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
