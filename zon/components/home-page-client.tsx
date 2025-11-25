"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { motion, Variants } from "framer-motion"
import { Check, Zap, FileText, Code2, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CodeBlock } from "@/components/ui/code-block"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BorderBeam } from "@/components/ui/border-beam"
import { RetroGrid } from "@/components/ui/retro-grid"
import { cn } from "@/lib/utils"

const features = [
  {
    title: "Human Readable",
    description:
      "Designed to be read and written by humans. No more trailing comma errors or strict quoting rules.",
    icon: FileText,
  },
  {
    title: "Zero Overhead",
    description:
      "Parses faster than JSON in many cases. Optimized for modern LLM tokenizers.",
    icon: Zap,
  },
  {
    title: "Type Safe",
    description:
      "Built-in support for types and schema validation. Catch errors before they happen.",
    icon: Shield,
  },
  {
    title: "Streaming Ready",
    description:
      "First-class support for streaming data. Process large datasets with minimal memory footprint.",
    icon: Code2,
  },
]

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } }
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05
    }
  }
}

interface HomePageClientProps {
  quickStartCode: string
  basicEncodingCode: string
  advancedUsageCode: string
  initialStars: number
}

export function HomePageClient({ quickStartCode, basicEncodingCode, advancedUsageCode, initialStars }: HomePageClientProps) {
  const [stars, setStars] = useState(initialStars)

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const res = await fetch('https://api.github.com/repos/ZON-Format/ZON')
        if (res.ok) {
          const data = await res.json()
          setStars(data.stargazers_count)
        }
      } catch (e) {
        console.error("Failed to fetch stars", e)
      }
    }

    const interval = setInterval(fetchStars, 3600000) // 1 hour
    return () => clearInterval(interval)
  }, [])
  return (
    <div className="flex flex-col min-h-screen bg-zinc-100 relative isolate selection:bg-primary/10">
      {/* Retro Grid Background */}
      <div className="absolute inset-x-0 top-0 -z-10 h-[800px] w-full overflow-hidden">
        <RetroGrid />
      </div>
      {/* Hero Section */}
      <section className="relative py-12 sm:py-20 md:py-24 lg:py-32 border-b border-border/40">
        <div className="container mx-auto max-w-6xl px-4 relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
            style={{ willChange: 'opacity, transform' }}
          >
            <motion.div variants={fadeInUp} className="mb-6 sm:mb-8 flex justify-center">
              <Badge variant="secondary" className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full border border-border/50 bg-secondary/50 backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                v1.0 Entropy Engine
              </Badge>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-primary mb-4 sm:mb-6 leading-[0.95]">
              <span className="text-primary">ZON</span> <br className="hidden sm:inline" />
              <span className="text-lg sm:text-xl md:text-5xl font-medium text-muted-foreground">Zero Overhead Notation</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed font-medium px-4">
              Smart compression for LLMs: 58% fewer tokens than JSON, 100% human-readable. Save 30-40% on API costs.
            </motion.p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto"
            style={{ willChange: 'opacity, transform' }}
          >
            <Link href="/docs" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-11 sm:h-12 px-8 text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                Get Started Free →
              </Button>
            </Link>
            <Link href="https://github.com/ZON-Format/ZON" target="_blank" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto h-11 sm:h-12 px-6 text-base bg-background/50 backdrop-blur-sm hover:bg-secondary/80 transition-all duration-300 flex items-center justify-center gap-2">
                <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                <span className="flex items-center gap-1.5">
                  <span className="hidden xs:inline">GitHub</span>
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
                    ★ {stars}
                  </span>
                </span>
              </Button>
            </Link>
          </motion.div>

          {/* Trust Signal: Framework logos */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 sm:mt-16 flex flex-col items-center gap-3"
          >
            <p className="text-xs text-muted-foreground font-medium">Works with</p>
            <div className="flex items-center justify-center gap-4 sm:gap-6 opacity-60 text-xs sm:text-sm font-medium">
              <span>LangChain</span>
              <span className="text-border">•</span>
              <span>OpenAI</span>
              <span className="text-border">•</span>
              <span>DSPy</span>
            </div>
          </motion.div>
        </div>

        {/* Decorative Background Elements - Cal.com Style */}
        <div className="absolute inset-0 -z-10 h-full w-full pointer-events-none select-none">
          {/* Crosshair Markers at Grid Intersections */}
          <div className="absolute left-[5%] top-[15%] text-slate-500 dark:text-slate-500 text-lg font-light">+</div>
          <div className="absolute left-[15%] top-[25%] text-slate-500 dark:text-slate-400 text-lg font-light">+</div>
          <div className="absolute left-[25%] top-[35%] text-slate-500 dark:text-slate-600 text-lg font-light">+</div>
          <div className="absolute left-[35%] top-[15%] text-slate-500 dark:text-slate-400 text-lg font-light">+</div>
          <div className="absolute left-[45%] top-[25%] text-slate-500 dark:text-slate-300 text-lg font-light">+</div>
          <div className="absolute left-[55%] top-[35%] text-slate-500 dark:text-slate-300 text-lg font-light">+</div>
          <div className="absolute left-[65%] top-[15%] text-slate-500 dark:text-slate-300 text-lg font-light">+</div>
          <div className="absolute left-[75%] top-[25%] text-slate-500 dark:text-slate-300 text-lg font-light">+</div>
          <div className="absolute left-[85%] top-[35%] text-slate-500 dark:text-slate-300 text-lg font-light">+</div>
          <div className="absolute left-[95%] top-[15%] text-slate-500 dark:text-slate-400 text-lg font-light">+</div>
          
          <div className="absolute left-[5%] top-[45%] text-slate-500 dark:text-slate-400 text-lg font-light">+</div>
          <div className="absolute left-[15%] top-[55%] text-slate-500 dark:text-slate-600 text-lg font-light">+</div>
          <div className="absolute left-[25%] top-[65%] text-slate-500 dark:text-slate-400 text-lg font-light">+</div>
          <div className="absolute left-[35%] top-[75%] text-slate-500 dark:text-slate-400 text-lg font-light">+</div>
          <div className="absolute left-[45%] top-[85%] text-slate-500 dark:text-slate-300 text-lg font-light">+</div>
          <div className="absolute left-[55%] top-[45%] text-slate-500 dark:text-slate-300 text-lg font-light">+</div>
          <div className="absolute left-[65%] top-[55%] text-slate-500 dark:text-slate-400 text-lg font-light">+</div>
          <div className="absolute left-[75%] top-[65%] text-slate-500 dark:text-slate-500 text-lg font-light">+</div>
          <div className="absolute left-[85%] top-[75%] text-slate-500 dark:text-slate-400 text-lg font-light">+</div>
          <div className="absolute left-[95%] top-[85%] text-slate-500 dark:text-slate-600 text-lg font-light">+</div>

          {/* Subtle Glow */}
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/5 opacity-40 blur-[100px]"></div>
        </div>
      </section>

      {/* Visual Comparison Section - THE AHA MOMENT */}
      <section className="py-12 sm:py-20 border-b border-border/40">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Same Data, 58% Fewer Tokens
            </h2>
            <p className="text-lg text-muted-foreground">
              Exact same hiking data → Dramatic difference
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {/* JSON */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="h-full hover:border-border/80 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm sm:text-base font-semibold text-muted-foreground">JSON</CardTitle>
                    <Badge variant="secondary" className="font-mono text-xs">229 tokens</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="max-h-[300px] sm:max-h-[400px] overflow-y-auto">
                    <pre className="text-xs sm:text-sm font-mono text-muted-foreground leading-relaxed overflow-x-auto">{`{
  "context": {
    "task": "Our favorite hikes",
    "location": "Boulder",
    "season": "spring_2025"
  },
  "friends": ["ana", "luis", "sam"],
  "hikes": [
    {
      "id": 1,
      "name": "Blue Lake Trail",
      "distanceKm": 7.5,
      "elevationGain": 320,
      "companion": "ana",
      "wasSunny": true
    }
    // ... 2 more records
  ]
}`}</pre>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* ZON */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="min-w-0"
            >
              <Card className="relative h-full border-primary/50 bg-primary/5 hover:border-primary transition-colors overflow-hidden">
                <BorderBeam size={250} duration={12} delay={9} />
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm sm:text-base font-semibold text-primary">ZON</CardTitle>
                    <Badge className="font-mono text-xs shrink-0">96 ⚡</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 overflow-hidden">
                  <div className="max-h-[300px] sm:max-h-[400px] overflow-auto">
                    <pre className="text-xs sm:text-sm font-mono text-foreground leading-relaxed whitespace-pre-wrap break-all">{`context:"{task:Our favorite hikes,location:Boulder,season:spring_2025}"
friends:"[ana,luis,sam]"

@hikes(3):companion,distanceKm,elevationGain,id,name,wasSunny
ana,7.5,320,1,Blue Lake Trail,T
luis,9.2,540,2,Ridge Overlook,F
sam,5.1,180,3,Wildflower Loop,T`}</pre>
                  </div>
                  <div className="mt-3 pt-3 border-t border-primary/20 flex items-center gap-2 text-[10px] sm:text-xs text-primary font-medium">
                    <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
                    <span>58% smaller · readable</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benchmarks Section */}
      <section id="benchmarks" className="py-12 sm:py-20 border-b border-border/40">
        <div className="container mx-auto max-w-5xl px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Proven Across Real Datasets
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From analytics to nested objects, ZON consistently delivers
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10">
            {/* Standard Datasets */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
              className="space-y-3 sm:space-y-4"
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-lg font-semibold">Standard Datasets</h3>
                <div className="text-sm text-muted-foreground">vs JSON</div>
              </div>
              <div className="space-y-2.5 sm:space-y-3">
                {[
                  { name: "analytics.json", reduction: 63.6, color: "from-emerald-500 to-green-600" },
                  { name: "employees.json", reduction: 56.9, color: "from-blue-500 to-cyan-600" },
                  { name: "complex_nested.json", reduction: 22.2, color: "from-purple-500 to-pink-600" },
                ].map((bench, i) => (
                  <motion.div key={i} variants={fadeInUp}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="text-xs sm:text-sm font-medium text-foreground truncate pr-2">{bench.name}</div>
                      <div className="text-base sm:text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent whitespace-nowrap">
                        {bench.reduction}%
                      </div>
                    </div>
                    <div className="relative h-2 bg-secondary/50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${bench.reduction}%` }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
                        className={`h-full bg-gradient-to-r ${bench.color}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Real-World Data */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
              className="space-y-3 sm:space-y-4"
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-lg font-semibold">Real-World API Data</h3>
                <div className="text-sm text-muted-foreground">vs JSON</div>
              </div>
              <div className="space-y-2.5 sm:space-y-3">
                {[
                  { name: "internet_random_users", reduction: 16.7, color: "from-orange-500 to-red-600" },
                  { name: "internet_posts", reduction: 14.6, color: "from-amber-500 to-orange-600" },
                  { name: "internet_github_repos", reduction: 16.0, color: "from-violet-500 to-purple-600" },
                ].map((bench, i) => (
                  <motion.div key={i} variants={fadeInUp}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="text-xs sm:text-sm font-medium text-foreground truncate pr-2">{bench.name}</div>
                      <div className="text-base sm:text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent whitespace-nowrap">
                        {bench.reduction}%
                      </div>
                    </div>
                    <div className="relative h-2 bg-secondary/50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${bench.reduction}%` }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
                        className={`h-full bg-gradient-to-r ${bench.color}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Format Comparison */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="mt-12 sm:mt-16"
          >
            <h3 className="text-lg sm:text-xl font-semibold mb-6 text-center">Token Efficiency Comparison</h3>
            <Card className="bg-background/50 backdrop-blur border-border/50">
              <CardContent className="p-3 sm:p-6">
                <div className="space-y-4">
                  {[
                    { name: "ZON", score: 100, accuracy: "96%", tokens: 9600, color: "from-primary to-primary/80", highlight: true },
                    { name: "TOON", score: 95, accuracy: "95%", tokens: 10400, color: "from-purple-500 to-purple-600" },
                    { name: "JSON compact", score: 70, accuracy: "94%", tokens: 13900, color: "from-blue-500 to-blue-600" },
                    { name: "YAML", score: 53, accuracy: "91%", tokens: 18000, color: "from-orange-500 to-orange-600" },
                    { name: "JSON", score: 43, accuracy: "94%", tokens: 22900, color: "from-gray-500 to-gray-600" },
                    { name: "XML", score: 30, accuracy: "89%", tokens: 31000, color: "from-red-500 to-red-600" },
                  ].map((format, i) => (
                    <motion.div
                      key={format.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                      className={cn(
                        "flex items-center gap-3 sm:gap-4",
                        format.highlight && "px-2 py-1 -mx-2 rounded-lg bg-primary/5"
                      )}
                    >
                      <div className="w-20 sm:w-24 text-xs sm:text-sm font-mono font-medium text-foreground flex items-center gap-1">
                        {format.name}
                        {format.highlight && <span className="text-xs text-primary">★</span>}
                      </div>
                      <div className="flex-1 flex items-center gap-2">
                        <div className="flex-1 h-6 sm:h-7 bg-secondary/30 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${(format.score / 100) * 100}%` }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.8, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] }}
                            className={cn(
                              "h-full bg-gradient-to-r rounded-full flex items-center justify-end pr-2",
                              `bg-gradient-to-r ${format.color}`
                            )}
                          >
                            <span className="text-xs font-bold text-white">{format.score}</span>
                          </motion.div>
                        </div>
                        <div className="hidden sm:flex items-center gap-2 sm:gap-4 text-xs text-muted-foreground font-mono">
                          <span className="w-16">{format.accuracy} acc</span>
                          <span className="w-20">{format.tokens.toLocaleString()} tokens</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 text-xs text-muted-foreground text-center">
                  Higher score = better compression × accuracy on GPT-5 Tokenizer (o200k_base)
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mt-8 sm:mt-12"
          >
            <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 px-4 py-3">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary flex-shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-medium text-muted-foreground">Average Token Saving</div>
                  <div className="text-sm sm:text-base font-bold text-primary whitespace-nowrap">58% fewer tokens</div>
                </div>
              </div>
              <div className="hidden sm:block h-8 w-px bg-border/50" />
              <div className="text-left">
                <div className="text-xs font-medium text-muted-foreground">vs TOON</div>
                <div className="text-sm sm:text-base font-bold text-green-600 whitespace-nowrap">8% more efficient</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comparison Section - Now showing Python usage */}
      <section className="py-12 sm:py-20 md:py-24 border-b border-border/40 bg-secondary/20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
              className="space-y-4 sm:space-y-6"
            >
              <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                Python Native. LLM Optimized.
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                ZON is built for the Python ecosystem. It integrates seamlessly with your existing data pipelines and LLM workflows.
              </motion.p>
              <ul className="space-y-3 sm:space-y-4 mt-6 sm:mt-8">
                {["Native Python support", "Optimized for token efficiency", "Human-readable format", "Type-safe serialization"].map((item, i) => (
                  <motion.li
                    key={item}
                    variants={fadeInUp}
                    custom={i}
                    className="flex items-center gap-3"
                  >
                    <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary-foreground" />
                    </div>
                    <span className="font-medium text-sm sm:text-base">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="relative group w-full max-w-full mt-8 lg:mt-0 overflow-hidden"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-gray-200 to-gray-100 rounded-2xl blur opacity-20 transition duration-1000 group-hover:opacity-40"></div>
              <div className="relative rounded-xl border border-border/50 bg-card shadow-2xl overflow-hidden transform transition-transform duration-500 hover:scale-[1.01]">
                <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 border-b border-border/50 bg-muted/30">
                  <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#FF5F56]"></div>
                  <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#FFBD2E]"></div>
                  <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#27C93F]"></div>
                  <div className="ml-2 text-xs text-muted-foreground font-medium">quick_start.py</div>
                </div>
                <div className="overflow-x-auto">
                  <CodeBlock
                    code={quickStartCode || "# Loading example..."}
                    language="python"
                    filename="quick_start.py"
                    className="border-0 rounded-none bg-transparent text-xs sm:text-sm"
                    hideHeader={true}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 border-b border-border/40">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Why Choose ZON?
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Built for performance, designed for developer happiness.
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="bg-background border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* Format Comparison Section */}
      <section className="py-12 sm:py-16 md:py-20 border-b border-border/40">
        <div className="container mx-auto max-w-5xl px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-8 sm:mb-10">
            <Badge variant="secondary" className="mb-4">Format Comparison</Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
              JSON vs ZON vs TOON
            </h2>
            <p className="text-lg text-muted-foreground">
              See how ZON compares with the same data
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <Tabs defaultValue="json" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6 h-auto">
                <TabsTrigger value="json" className="text-xs sm:text-sm py-2 sm:py-2.5">
                  <span className="hidden sm:inline">JSON (229)</span>
                  <span className="sm:hidden">JSON</span>
                </TabsTrigger>
                <TabsTrigger value="zon" className="text-xs sm:text-sm py-2 sm:py-2.5">
                  <span className="hidden sm:inline">ZON (96)</span>
                  <span className="sm:hidden">ZON</span>
                </TabsTrigger>
                <TabsTrigger value="toon" className="text-xs sm:text-sm py-2 sm:py-2.5">
                  <span className="hidden sm:inline">TOON (104)</span>
                  <span className="sm:hidden">TOON</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="json" className="space-y-3">
                <div className="text-xs sm:text-sm text-muted-foreground">
                  GPT-5 Tokenizer: 229 tokens • 680 bytes
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                  <CodeBlock
                    code={`{
  "context": {
    "task": "Our favorite hikes together",
    "location": "Boulder",
    "season": "spring_2025"
  },
  "friends": [
    "ana",
    "luis",
    "sam"
  ],
  "hikes": [
    {
      "id": 1,
      "name": "Blue Lake Trail",
      "distanceKm": 7.5,
      "elevationGain": 320,
      "companion": "ana",
      "wasSunny": true
    },
    {
      "id": 2,
      "name": "Ridge Overlook",
      "distanceKm": 9.2,
      "elevationGain": 540,
      "companion": "luis",
      "wasSunny": false
    },
    {
      "id": 3,
      "name": "Wildflower Loop",
      "distanceKm": 5.1,
      "elevationGain": 180,
      "companion": "sam",
      "wasSunny": true
    }
  ]
}`}
                    language="json"
                    filename="data.json"
                  />
                </div>
              </TabsContent>

              <TabsContent value="zon" className="space-y-3">
                <div className="text-xs sm:text-sm text-muted-foreground">
                  GPT-5 Tokenizer: 96 tokens • 264 bytes • <span className="text-primary font-semibold">58.1% reduction</span>
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                  <CodeBlock
                    code={`context:"{task:Our favorite hikes together,location:Boulder,season:spring_2025}"
friends:"[ana,luis,sam]"

@hikes(3):companion,distanceKm,elevationGain,id,name,wasSunny
ana,7.5,320,1,Blue Lake Trail,T
luis,9.2,540,2,Ridge Overlook,F
sam,5.1,180,3,Wildflower Loop,T`}
                    language="zon"
                    filename="data.zon"
                  />
                </div>
              </TabsContent>

              <TabsContent value="toon" className="space-y-3">
                <div className="text-xs sm:text-sm text-muted-foreground">
                  GPT-5 Tokenizer: 104 tokens • 286 bytes • <span className="text-amber-600 font-semibold">54.6% reduction</span>
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                  <CodeBlock
                    code={`context:
  task: Our favorite hikes together
  location: Boulder
  season: spring_2025
friends[3]: ana,luis,sam
hikes[3]{id,name,distanceKm,elevationGain,companion,wasSunny}:
  1,Blue Lake Trail,7.5,320,ana,true
  2,Ridge Overlook,9.2,540,luis,false
  3,Wildflower Loop,5.1,180,sam,true`}
                    language="yaml"
                    filename="data.toon"
                  />
                </div>
              </TabsContent>
            </Tabs>

            {/* Comparison Summary */}
            <div className="mt-6 sm:mt-8 p-4 sm:p-6 rounded-lg bg-secondary/20 border border-border/50">
              <h3 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4">Token Analysis Summary</h3>
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                <div className="text-center p-3 sm:p-4 rounded bg-background">
                  <div className="text-lg sm:text-2xl font-bold text-muted-foreground">229</div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-1">JSON tokens</div>
                  <div className="text-xs text-muted-foreground mt-0.5">baseline</div>
                </div>
                <div className="text-center p-3 sm:p-4 rounded bg-primary/10 border-2 border-primary">
                  <div className="text-lg sm:text-2xl font-bold text-primary">96</div>
                  <div className="text-xs sm:text-sm font-medium mt-1">ZON tokens</div>
                  <div className="text-xs text-primary font-semibold mt-0.5">7.7% better</div>
                </div>
                <div className="text-center p-3 sm:p-4 rounded bg-background">
                  <div className="text-lg sm:text-2xl font-bold text-amber-600">104</div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-1">TOON tokens</div>
                  <div className="text-xs text-muted-foreground mt-0.5">8 more</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section with Accordion */}
      <section className="py-16 sm:py-24 border-b border-border/40 bg-secondary/20">
        <div className="container mx-auto max-w-3xl px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about ZON
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">
                  Is ZON compatible with existing JSON workflows?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes! ZON is designed to be a drop-in replacement for JSON in many Python workflows.
                  It maps directly to Python dictionaries and lists, making integration seamless.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">
                  How do I install ZON?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Simply run <code className="bg-secondary px-2 py-0.5 rounded">pip install zon-format</code>.
                  It requires Python 3.8 or higher.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">
                  Does ZON support other languages?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Currently, ZON is optimized for Python, but the format specification is open and language-agnostic.
                  Community drivers for other languages are welcome!
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">
                  Why use ZON for LLMs?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  ZON significantly reduces token usage compared to JSON (30-40% reduction), which directly translates
                  to lower API costs and faster inference times for Large Language Models.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left">
                  Can I use ZON in production?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes! ZON v1.0 is stable and production-ready. It&apos;s battle-tested, follows semantic versioning,
                  and has comprehensive test coverage.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-border/40 bg-background">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold tracking-tight mb-8">
              Ready to simplify your data?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Join the growing community of developers switching to ZON.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link href="/docs">
                <Button size="lg" className="h-14 px-10 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  Read the Docs
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
