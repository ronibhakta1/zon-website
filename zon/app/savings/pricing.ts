import { unstable_cache } from "next/cache"
import { PRICING } from "@/components/playground/cost-calculator"

// Simulated fetch for pricing with 1-week cache
export const getCachedPricing = unstable_cache(
  async () => {
    // In a real app, this would fetch from an API
    // For now, we return the constant but wrapped in a promise/cache
    return PRICING
  },
  ["llm-pricing-v2"],
  { revalidate: 604800 } // 1 week in seconds
)
