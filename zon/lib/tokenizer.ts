import { Tiktoken, encodingForModel } from "js-tiktoken"

let cachedEncoding: Tiktoken | null = null

/**
 * Count tokens in a string using GPT-4 tokenization
 */
export function countTokens(text: string): number {
  try {
    if (!cachedEncoding) {
      cachedEncoding = encodingForModel("gpt-4")
    }
    const tokens = cachedEncoding.encode(text)
    return tokens.length
  } catch (error) {
    console.error("Error counting tokens:", error)
    // Fallback: rough estimate (1 token ≈ 4 characters)
    return Math.ceil(text.length / 4)
  }
}

/**
 * Calculate token reduction percentage
 */
export function calculateReduction(originalTokens: number, newTokens: number): number {
  if (originalTokens === 0) return 0
  return Math.round(((originalTokens - newTokens) / originalTokens) * 100)
}

/**
 * Estimate API cost savings based on token reduction
 * Using GPT-4 pricing: $0.03 per 1K input tokens
 */
export function estimateCostSavings(tokenReduction: number): string {
  const costPer1kTokens = 0.03
  const savingsPerRequest = (tokenReduction / 1000) * costPer1kTokens
  
  if (savingsPerRequest < 0.001) {
    return "$0.00"
  }
  
  return `$${savingsPerRequest.toFixed(4)}`
}

/**
 * Clean up encoding resources (no-op for js-tiktoken)
 */
export function cleanup() {
  // js-tiktoken doesn't require manual cleanup
  cachedEncoding = null
}

