import { Metadata } from "next"
import { MultiModelCost } from "@/components/playground/multi-model-cost"

export const metadata: Metadata = {
  title: "Pricing Comparison | ZON Playground",
  description: "Compare ZON's cost savings across major LLM providers including GPT-4, Claude, and Gemini. See real pricing and calculate your potential savings.",
  openGraph: {
    title: "ZON Pricing Comparison - Multi-Model Cost Analysis",
    description: "Real pricing data from OpenAI, Anthropic, and Google showing ZON's cost efficiency",
  },
}

export default function PricingPage() {
  // Example: 100 tokens saved (users will come from playground with real data via URL params in future)
  const tokensSaved = 100

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <section className="py-12 sm:py-16 md:py-20 border-b border-border/40">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter text-primary mb-4">
              Cost Savings Across LLM Providers
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Real pricing data from major LLM providers showing how ZON reduces your API costs. 
              Updated December 2024.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <MultiModelCost tokensSaved={tokensSaved} />
        </div>
      </section>
    </div>
  )
}
