import { unstable_cache } from "next/cache"
import { PRICING } from "@/components/playground/cost-calculator"

// URL to the raw JSON file on GitHub (or your hosting provider)
// This allows updating prices without redeploying the application
const PRICING_URL = "https://raw.githubusercontent.com/ZON-Format/zon-website/main/public/data/pricing.json"

// Simulated fetch for pricing with 3-day cache
export const getCachedPricing = unstable_cache(
  async () => {
    try {
      // Fetch from the remote source
      const res = await fetch(PRICING_URL, {
        next: { revalidate: 259200 } // 3 days in seconds
      })

      if (!res.ok) {
        throw new Error(`Failed to fetch pricing: ${res.statusText}`)
      }

      const data = await res.json()
      return data as typeof PRICING
    } catch (error) {
      console.error("Error fetching dynamic pricing, falling back to static defaults:", error)
      // Fallback to static constant if fetch fails
      return PRICING
    }
  },
  ["llm-pricing-dynamic-v1"],
  { revalidate: 259200 } // 3 days in seconds
)
