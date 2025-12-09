"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { Button } from "@/components/ui/button"
import { Table2, Settings2, Sparkles, Terminal, MessageSquare, Copy, Check } from "lucide-react"

const SCENARIOS = [
  {
    id: "analytics",
    label: "Analytics",
    icon: Table2,
    context: `users:@(5):email,id,last_login,tier
alice@ex.com,1,2024-12-08,premium
bob@site.co,2,2024-11-15,pro
carol@demo.org,3,2024-12-01,free
dave@net.io,4,2024-10-20,premium
eve@corp.ai,5,2024-12-09,pro`,
    prompt: "Return keys & tiers for users who logged in after Dec 1st.",
    response: `users:@(3):id,tier
1,premium
3,free
5,pro`
  },
  {
    id: "transform",
    label: "Transform",
    icon: Settings2,
    context: `legacy_profile{
  full_name:Sarah Connor
  contact:sarah@skynet.com
  meta{
    join_date:2023-01-15
    role:admin
  }
}`,
    prompt: "Convert to new 'User' schema with flat fields.",
    response: `user{
  name:Sarah Connor
  email:sarah@skynet.com
  created_at:2023-01-15
  is_admin:true
}`
  },
  {
    id: "reasoning",
    label: "Reasoning",
    icon: Sparkles,
    context: `orders:@(2):id,items,total
101,[{name:Laptop,price:1200},{name:Mouse,price:25}],1225
102,[{name:Monitor,price:300}],300`,
    prompt: "Extract items cheaper than $50.",
    response: `cheap_items:@(1):id,item,price
101,Mouse,25`
  }
]

export function LlmShowcase() {
  const [activeScenario, setActiveScenario] = useState(0)
  const [displayedResponse, setDisplayedResponse] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const scenario = SCENARIOS[activeScenario]

  // Typewriter effect
  useEffect(() => {
    // Reset state
    setDisplayedResponse("")
    setIsTyping(true)
    
    // Clear any existing timeout
    if (typingTimeoutRef.current) {
      clearInterval(typingTimeoutRef.current)
    }

    let currentIndex = 0
    const fullText = scenario.response
    
    // Start typing after a small delay to simulate "thinking"
    const startDelay = setTimeout(() => {
      typingTimeoutRef.current = setInterval(() => {
        if (currentIndex < fullText.length) {
          setDisplayedResponse(fullText.substring(0, currentIndex + 1))
          currentIndex++
        } else {
          setIsTyping(false)
          if (typingTimeoutRef.current) clearInterval(typingTimeoutRef.current)
        }
      }, 15) // Typing speed
    }, 400)

    return () => {
      clearTimeout(startDelay)
      if (typingTimeoutRef.current) clearInterval(typingTimeoutRef.current)
    }
  }, [activeScenario, scenario.response])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(scenario.response)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-3 text-zinc-900 dark:text-zinc-100">
          Native Fluency in ZON
        </h2>
        <p className="text-muted-foreground text-lg">
          See how models like GPT-4 and Claude 3.5 produce ZON natively.
        </p>
      </div>

      <SpotlightCard className="overflow-hidden bg-zinc-950 border-zinc-800" gradientColor="rgba(120, 119, 198, 0.1)">
        <div className="flex flex-col h-full min-h-[500px] md:min-h-[400px]">
          {/* Tabs header */}
          <div className="flex flex-wrap items-center gap-2 p-4 border-b border-white/10 bg-white/5">
            {SCENARIOS.map((s, idx) => {
              const Icon = s.icon
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveScenario(idx)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    activeScenario === idx 
                      ? "bg-primary/20 text-primary ring-1 ring-primary/50" 
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {s.label}
                </button>
              )
            })}
          </div>

          <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
            {/* User Input Section */}
            <div className="w-full md:w-2/5 p-6 border-b md:border-b-0 md:border-r border-white/10 bg-zinc-900/30 flex flex-col gap-6">
              
              {/* Context Block */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <Table2 className="w-3 h-3" /> Input Data (ZON)
                </div>
                <div className="bg-zinc-950/50 border border-white/5 rounded-xl p-3 font-mono text-xs text-zinc-400 overflow-x-auto">
                  <pre>{scenario.context}</pre>
                </div>
              </div>

              {/* Prompt Block */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <MessageSquare className="w-3 h-3" /> User Query
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 text-sm text-zinc-200 leading-relaxed relative">
                  {scenario.prompt}
                  <div className="absolute top-[-6px] left-4 w-3 h-3 bg-blue-500/10 border-t border-l border-blue-500/20 transform rotate-45" />
                </div>
              </div>

            </div>

            {/* Model Response Section */}
            <div className="w-full md:w-3/5 p-6 bg-zinc-950 relative group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <Terminal className="w-3 h-3" /> Model Response
                </div>
                <div className="text-xs text-emerald-500 font-mono opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:opacity-100">
                  {isTyping ? (
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Generating ZON...
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-zinc-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                      Complete
                    </span>
                  )}
                </div>
              </div>
              
              <div className="relative font-mono text-sm leading-relaxed">
                <div className="absolute right-0 top-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-white"
                    onClick={copyToClipboard}
                  >
                    {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                
                <pre className="text-zinc-300 whitespace-pre-wrap">
                  {displayedResponse}
                  {isTyping && <motion.span 
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-2 h-4 align-middle bg-primary ml-0.5"
                  />}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </div>
  )
}
