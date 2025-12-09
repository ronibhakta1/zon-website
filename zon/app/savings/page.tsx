import { getCachedPricing } from "./pricing"
import { SavingsCalculator } from "./client"
import { RetroGrid } from "@/components/ui/retro-grid"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, DollarSign } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cost Savings Calculator",
  description: "Calculate how much you can save on LLM API costs using ZON format. Compare GPT-4o, Claude 3.5 Sonnet, and other AI models.",
  openGraph: {
    title: "ZON Cost Savings Calculator",
    description: "Calculate your LLM API cost savings with ZON format",
    url: "https://zonformat.org/savings",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "ZON Cost Savings Calculator",
    description: "Calculate your LLM API cost savings with ZON format",
  },
  alternates: {
    canonical: "https://zonformat.org/savings",
  },
}

export default async function SavingsPage() {
  const pricing = await getCachedPricing()

  return (
    <div className="min-h-screen bg-background relative isolate overflow-x-hidden">
      {/* Background */}
      <div className="absolute inset-x-0 top-0 -z-10 h-[500px] w-full overflow-hidden">
        <RetroGrid />
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-12 sm:py-20">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 space-y-6">
          <Link href="/playground">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Playground
            </Button>
          </Link>
          
          <Badge variant="secondary" className="h-8 px-4 text-sm">
            <DollarSign className="w-3.5 h-3.5 mr-1.5 text-green-600" />
            ROI Calculator
          </Badge>
          
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter text-primary">
            Stop Overpaying for Tokens
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            See exactly how much ZON can save your team on API costs with top models like GPT-4o and Claude 3.5 Sonnet.
          </p>
        </div>

        {/* Calculator */}
        <SavingsCalculator pricing={pricing} />
      </div>
    </div>
  )
}
