"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { motion, Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RetroGrid } from "@/components/ui/retro-grid"
import { Marquee } from "@/components/ui/marquee"
import { cn } from "@/lib/utils"
import { Zap, Shield, Layers, Database, FileCode, Globe, ArrowUpRight, Star, ShieldCheck, ArrowDown, MessageCircle } from "lucide-react"
import {
  LangChainLogo,
  OpenAILogo,
  DSPyLogo,
  LlamaIndexLogo,
  AutoGenLogo,
  VercelLogo,
  MistralLogo,
  AnthropicLogo
} from "@/components/ui/brand-logos"
import { BenchmarkChart } from "@/components/benchmark-chart"
import { TokenReductionChart } from "@/components/token-reduction-chart"
import { LlmShowcase } from "@/components/llm-showcase"



// Simplified animations for better performance
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1] // cubic-bezier for smoother Safari performance
    }
  }
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02
    }
  }
}

interface HomePageClientProps {
  initialStars: number
}

function SpotlightCard({ children, className = "", gradientColor = "#262626" }: { children: React.ReactNode; className?: string; gradientColor?: string }) {
  const divRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return

    // Throttle with requestAnimationFrame for better performance
    if (rafRef.current) return

    rafRef.current = requestAnimationFrame(() => {
      if (!divRef.current) return
      const div = divRef.current
      const rect = div.getBoundingClientRect()
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
      rafRef.current = null
    })
  }

  const handleMouseEnter = () => setOpacity(1)
  const handleMouseLeave = () => {
    setOpacity(0)
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-zinc-900 dark:text-zinc-200 shadow-sm transition-shadow duration-200 hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transform-gpu",
        className
      )}
    >
      {/* Spotlight gradient - GPU accelerated */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-200 z-10 transform-gpu"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${gradientColor}, transparent 40%)`,
          willChange: opacity > 0 ? 'opacity' : 'auto',
        }}
      />
      <div className="relative h-full z-20">{children}</div>
    </div>
  )
}

export function HomePageClient({ initialStars }: HomePageClientProps) {
  const [starsTs, setStarsTs] = useState(initialStars)
  const [starsPy, setStarsPy] = useState(0)

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const res = await fetch('/api/github-stars')
        if (res.ok) {
          const data = await res.json()
          setStarsTs(data.starsTs)
          setStarsPy(data.starsPy)
        }
      } catch (e) {
        console.error("Failed to fetch stars", e)
      }
    }

    fetchStars()
    const interval = setInterval(fetchStars, 3600000) // 1 hour
    return () => clearInterval(interval)
  }, [])
  return (
    <div className="flex flex-col min-h-screen bg-background relative isolate selection:bg-primary/10 overflow-x-hidden">
      {/* Retro Grid Background */}
      <div className="absolute inset-x-0 top-0 -z-10 h-[800px] w-full overflow-hidden">
        <RetroGrid />
      </div>
      {/* Hero Section */}
      <section className="relative py-4 sm:py-8 md:py-12 lg:py-16 border-b border-border/40">
        <div className="container mx-auto max-w-6xl px-4 relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
            style={{ willChange: 'opacity, transform' }}
          >
            <motion.div variants={fadeInUp} className="mb-6 sm:mb-8 flex flex-col items-center gap-4">
              <Badge variant="secondary" className="px-4 py-1.5 text-xs sm:text-sm font-medium rounded-full border border-border/40 bg-secondary/60 backdrop-blur-sm shadow-sm hover:shadow-md hover:bg-secondary/80 transition-all duration-300 hover:scale-[1.02] cursor-default">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                v1.3.0 Entropy Engine
              </Badge>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground font-medium animate-in fade-in slide-in-from-bottom-2 duration-700 delay-200 fill-mode-backwards">
                <span className="opacity-80">Supported in:</span>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#3776AB]/10 text-[#3776AB] dark:text-[#3776AB] border border-[#3776AB]/20 shadow-sm transition-transform hover:scale-105 cursor-default">
                    Python
                  </span>
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#3178C6]/10 text-[#3178C6] dark:text-[#3178C6] border border-[#3178C6]/20 shadow-sm transition-transform hover:scale-105 cursor-default">
                    TypeScript
                  </span>
                </div>
              </div>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold tracking-tighter text-primary mb-4 sm:mb-6 leading-[0.95]">
              <span className="text-primary">ZON</span> <br className="hidden sm:inline" />
              <span className="text-lg sm:text-xl md:text-3xl font-medium text-muted-foreground">Zero Overhead Notation</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed font-medium px-4">
              Smart compression for LLMs: 50% fewer tokens than JSON, 100% human-readable. Save ~50% on API costs.
            </motion.p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
            className="mt-8 sm:mt-10 flex flex-col items-center gap-4 sm:gap-5 w-full"
            style={{ willChange: 'opacity, transform' }}
          >
            {/* Primary CTA - Playground */}
            <Link href="/playground">
              <Button size="lg" className="h-11 px-6 text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:scale-95 rounded-full">
                Try Playground →
              </Button>
            </Link>
            
            {/* Secondary links - compact outline buttons */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              <Link href="/docs/benchmarks">
                <Button variant="outline" size="sm" className="h-9 px-4 text-sm font-medium rounded-full border-zinc-200 dark:border-zinc-700 hover:bg-muted transition-all hover:-translate-y-0.5">
                  Benchmarks
                </Button>
              </Link>
              <Link href="/docs/cli-guide">
                <Button variant="outline" size="sm" className="h-9 px-4 text-sm font-medium rounded-full border-zinc-200 dark:border-zinc-700 hover:bg-muted transition-all hover:-translate-y-0.5">
                  CLI
                </Button>
              </Link>
              <Link href="/docs">
                <Button variant="outline" size="sm" className="h-9 px-4 text-sm font-medium rounded-full border-zinc-200 dark:border-zinc-700 hover:bg-muted transition-all hover:-translate-y-0.5">
                  Why ZON?
                </Button>
              </Link>
              <a href="https://discord.gg/SPUMptnsGn" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="h-9 px-4 text-sm font-medium rounded-full border-[#5865F2]/30 bg-[#5865F2]/10 text-[#5865F2] hover:bg-[#5865F2]/20 hover:border-[#5865F2]/50 transition-all hover:-translate-y-0.5">
                  <MessageCircle className="w-4 h-4 mr-1.5" />
                  Join Discord
                </Button>
              </a>
            </div>
            
            {/* GitHub stars - Python and TypeScript */}
            <div className="flex items-center justify-center gap-3">
              <Link href="https://github.com/ZON-Format/zon" target="_blank" className="text-zinc-900 dark:text-zinc-100" style={{ color: 'inherit' }}>
                <div className="h-10 pl-3 pr-2 text-sm font-medium bg-[#3776AB]/10 border border-[#3776AB]/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-95 flex items-center justify-center gap-2 rounded-full cursor-pointer">
                  <span className="text-[#3776AB] font-semibold">Python</span>
                  <div className="flex items-center gap-1 bg-[#3776AB] px-2 py-0.5 rounded-full text-white text-xs font-semibold font-mono">
                    <Star className="h-3 w-3 fill-current" />
                    {starsPy >= 1000 ? (starsPy / 1000).toFixed(1) + 'k' : starsPy}
                  </div>
                </div>
              </Link>
              <Link href="https://github.com/ZON-Format/zon-ts" target="_blank" className="text-zinc-900 dark:text-zinc-100" style={{ color: 'inherit' }}>
                <div className="h-10 pl-3 pr-2 text-sm font-medium bg-[#3178C6]/10 border border-[#3178C6]/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-95 flex items-center justify-center gap-2 rounded-full cursor-pointer">
                  <span className="text-[#3178C6] font-semibold">TypeScript</span>
                  <div className="flex items-center gap-1 bg-[#3178C6] px-2 py-0.5 rounded-full text-white text-xs font-semibold font-mono">
                    <Star className="h-3 w-3 fill-current" />
                    {starsTs >= 1000 ? (starsTs / 1000).toFixed(1) + 'k' : starsTs}
                  </div>
                </div>
              </Link>
            </div>
          </motion.div>

          {/* Trust Signal: Framework logos */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-8 sm:mt-12 flex flex-col items-center gap-3"
          >
            <p className="text-xs text-muted-foreground font-medium mb-4">Works with leading AI frameworks & platforms</p>
            <div className="relative flex w-full max-w-lg flex-col items-center justify-center overflow-hidden rounded-lg">
              <Marquee pauseOnHover repeat={2} className="py-2 [--duration:30s]">
                {[
                  { name: "OpenAI", Icon: OpenAILogo },
                  { name: "Vercel", Icon: VercelLogo },
                  { name: "Anthropic", Icon: AnthropicLogo },
                  { name: "LangChain", Icon: LangChainLogo },
                  { name: "Mistral", Icon: MistralLogo },
                  { name: "LlamaIndex", Icon: LlamaIndexLogo },
                  { name: "DSPy", Icon: DSPyLogo },
                  { name: "AutoGen", Icon: AutoGenLogo },
                ].map((item) => (
                  <div key={item.name} className="mx-6 flex items-center gap-2 whitespace-nowrap group cursor-default">
                    <item.Icon className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
                    <span className="text-sm sm:text-base font-semibold text-muted-foreground group-hover:text-foreground transition-colors duration-200">{item.name}</span>
                  </div>
                ))}
              </Marquee>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent"></div>
              <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent"></div>
            </div>
          </motion.div>

          {/* Bouncing Benchmark Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="mt-6 sm:mt-8 flex justify-center"
          >
            <Link href="#benchmarks" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group cursor-pointer">
              <span className="text-xs sm:text-sm font-medium tracking-wide">See Benchmarks</span>
              <div className="p-2 rounded-full border border-border/40 bg-background/50 backdrop-blur-sm shadow-sm group-hover:shadow-md group-hover:border-primary/30 transition-all duration-300 animate-bounce-slow">
                <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Decorative Background Elements - Cal.com Style */}
        <div className="hidden md:block absolute inset-0 -z-10 h-full w-full pointer-events-none select-none">
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

        </div>
      </section>





      {/* NEW: Showcase Section */}
      <section className="py-16 bg-zinc-50/50 dark:bg-zinc-900/20 border-b border-border/40">
        <LlmShowcase />
      </section>

      {/* Features Section (Why ZON?) */}
      <section id="benchmarks" className="py-20 sm:py-32 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-white/5 relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-primary/5 dark:bg-primary/20 blur-[120px] rounded-full opacity-30 dark:opacity-20 pointer-events-none" />
        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          <div className="mb-16 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6 text-zinc-900 dark:text-white">
              Why Choose ZON?
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl leading-relaxed">
              Engineered for the AI era, combining human readability with machine efficiency.
            </p>
          </div>

          <div className="space-y-8 mb-16">
            <BenchmarkChart />
            <TokenReductionChart />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 auto-rows-[minmax(280px,auto)]">
            {[
              {
                title: "Token-Efficient Architecture",
                desc: "Achieves ~50% token reduction compared to JSON by utilizing tabular encoding for arrays and minimizing syntax overhead.",
                icon: Zap,
                link: "/docs/benchmarks#token-efficiency-benchmark",
                className: "md:col-span-2",
                gradient: "rgba(245, 158, 11, 0.15)"
              },
              {
                title: "Runtime Guardrails",
                desc: "Validate LLM outputs against strict schemas with zero overhead. Type-safe, reliable, and built-in.",
                icon: ShieldCheck,
                link: "/docs/eval-llms",
                className: "md:col-span-1",
                gradient: "rgba(99, 102, 241, 0.15)"
              },
              {
                title: "99%+ Retrieval Accuracy",
                desc: "Self-explanatory structure with explicit headers eliminates ambiguity, ensuring LLMs retrieve data with near-perfect accuracy.",
                icon: Shield,
                link: "/docs/benchmarks",
                className: "md:col-span-1",
                gradient: "rgba(16, 185, 129, 0.15)"
              },
              {
                title: "Streaming Ready",
                desc: "Designed for byte-level parsing, allowing large datasets to be processed incrementally with minimal memory footprint.",
                icon: Layers,
                link: "/docs/streaming-guide",
                className: "md:col-span-2",
                gradient: "rgba(168, 85, 247, 0.15)"
              },
              {
                title: "JSON Data Model",
                desc: "Maps 1:1 to JSON types including objects, arrays, strings, numbers, booleans, and nulls. Lossless round-tripping guaranteed.",
                icon: Database,
                link: "/docs/format-overview",
                className: "md:col-span-1",
                gradient: "rgba(59, 130, 246, 0.15)"
              },
              {
                title: "Human-Centric Syntax",
                desc: "Minimal noise, no strict quoting rules, and a clean layout make ZON as readable as Markdown for developers.",
                icon: FileCode,
                link: "/docs/syntax-cheatsheet",
                className: "md:col-span-1",
                gradient: "rgba(236, 72, 153, 0.15)"
              },
              {
                title: "Multi-Language Support",
                desc: "Production-ready libraries available for Python and TypeScript, ensuring seamless integration into your stack.",
                icon: Globe,
                link: "/docs/implementations",
                className: "md:col-span-1",
                gradient: "rgba(6, 182, 212, 0.15)"
              }
            ].map((item, i) => (
              <Link key={i} href={item.link} className={cn("block h-full group", item.className)}>
                <SpotlightCard gradientColor={item.gradient} className="h-full transition-transform duration-300 hover:-translate-y-1">
                  <div className="flex flex-col h-full p-8">
                    <div className="mb-6 inline-flex p-3 rounded-lg bg-zinc-100 dark:bg-white/5 w-fit">
                      <item.icon className="w-6 h-6 text-zinc-900 dark:text-zinc-100" strokeWidth={1.5} />
                    </div>

                    <h3 className="text-lg font-bold mb-3 text-zinc-900 dark:text-zinc-100">{item.title}</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 flex-grow">
                      {item.desc}
                    </p>

                    <div className="flex items-center text-xs font-medium text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors mt-auto">
                      Learn more
                      <ArrowUpRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </SpotlightCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
