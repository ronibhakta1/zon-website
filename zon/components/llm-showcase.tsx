"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Table2, Settings2, Sparkles, Terminal, Copy, Check, ArrowRight, Code2 } from "lucide-react"

// --- SpotlightCard (Copied from home-page-client.tsx to ensure perfect match) ---
function SpotlightCard({ children, className = "", gradientColor = "#262626" }: { children: React.ReactNode; className?: string; gradientColor?: string }) {
  const divRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return
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
        "relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-zinc-900 dark:text-zinc-200 shadow-sm transition-shadow duration-200 hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transform-gpu h-full",
        className
      )}
    >
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
5,pro`,
    decoded: `{
  "users": [
    { "id": 1, "tier": "premium" },
    { "id": 3, "tier": "free" },
    { "id": 5, "tier": "pro" }
  ]
}`
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
}`,
    decoded: `{
  "user": {
    "name": "Sarah Connor",
    "email": "sarah@skynet.com",
    "created_at": "2023-01-15",
    "is_admin": true
  }
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
101,Mouse,25`,
    decoded: `{
  "cheap_items": [
    { "id": 101, "item": "Mouse", "price": 25 }
  ]
}`
  }
]

export function LlmShowcase() {
  const [activeScenario, setActiveScenario] = useState(0)
  const [displayedResponse, setDisplayedResponse] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const scenario = SCENARIOS[activeScenario]

  useEffect(() => {
    setDisplayedResponse("")
    setIsTyping(true)
    
    if (typingTimeoutRef.current) clearInterval(typingTimeoutRef.current)

    let currentIndex = 0
    const fullText = scenario.response
    
    const startDelay = setTimeout(() => {
      typingTimeoutRef.current = setInterval(() => {
        if (currentIndex < fullText.length) {
          setDisplayedResponse(fullText.substring(0, currentIndex + 1))
          currentIndex++
        } else {
          setIsTyping(false)
          if (typingTimeoutRef.current) clearInterval(typingTimeoutRef.current)
        }
      }, 15)
    }, 600)

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
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4 text-zinc-900 dark:text-zinc-100">
          Native Fluency in ZON
        </h2>
        <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
          ZON connects your data to LLMs natively. No JSON conversion overhead.
        </p>
      </div>

      {/* Scenario Selector */}
      <div className="flex justify-center mb-12">
        <div className="flex bg-zinc-100 dark:bg-zinc-900/50 p-1 md:p-1.5 rounded-full border border-zinc-200 dark:border-white/10 shadow-sm">
          {SCENARIOS.map((s, idx) => {
            const Icon = s.icon
            const isActive = activeScenario === idx
            return (
              <button
                key={s.id}
                onClick={() => setActiveScenario(idx)}
                className={cn(
                  "flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 relative",
                  isActive ? "text-white" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-zinc-900 dark:bg-zinc-700 rounded-full shadow-md"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5 md:gap-2">
                  <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span className="hidden sm:inline">{s.label}</span>
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Node Flow UI - Stacks vertically on mobile */}
      <div className="relative flex flex-col lg:flex-row items-stretch lg:items-center justify-center gap-4 lg:gap-0">
        
        {/* INPUT NODE */}
        <motion.div 
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full lg:flex-1 lg:max-w-[380px] relative z-10"
        >
          <SpotlightCard gradientColor="rgba(59, 130, 246, 0.2)">
            <div className="p-5 flex flex-col h-full">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                   <Table2 className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                   <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">Input Data</div>
                   <div className="text-[10px] text-zinc-500 font-mono">ZON Encoder</div>
                </div>
              </div>

              <div className="space-y-4 font-mono">
                <div>
                   <div className="text-[10px] font-semibold text-zinc-500 mb-1.5 uppercase tracking-wider">Context</div>
                   <div className="bg-zinc-50 dark:bg-zinc-950/50 rounded-lg p-3 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800/80 overflow-x-auto text-[10px] md:text-xs leading-relaxed">
                     <pre className="whitespace-pre-wrap">{scenario.context}</pre>
                   </div>
                </div>
                <div>
                   <div className="flex items-center gap-1.5 text-[10px] font-semibold text-blue-600 dark:text-blue-500 mb-1.5 uppercase tracking-wider">
                      <ArrowRight className="w-3 h-3" /> Query
                   </div>
                   <div className="bg-blue-50/50 dark:bg-blue-500/5 rounded-lg p-3 text-zinc-700 dark:text-zinc-200 border border-blue-100 dark:border-blue-500/10 text-[10px] md:text-xs">
                     {scenario.prompt}
                   </div>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* FIRST CONNECTOR - Desktop */}
        <div className="hidden lg:flex flex-col justify-center items-center w-[80px] h-16 shrink-0 relative">
           <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
             <defs>
               <linearGradient id="beam-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                 <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                 <stop offset="100%" stopColor="#10b981" stopOpacity="0.4" />
               </linearGradient>
               <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                 <feGaussianBlur stdDeviation="3" result="blur" />
                 <feComposite in="SourceGraphic" in2="blur" operator="over" />
               </filter>
             </defs>
             <motion.path 
               d="M 0,32 L 80,32" 
               fill="none" 
               stroke="url(#beam-grad)" 
               strokeWidth="2"
               strokeLinecap="round"
               filter="url(#glow)"
               initial={{ pathLength: 0 }}
               animate={{ pathLength: 1 }}
               transition={{ duration: 0.8, ease: "easeInOut" }}
             />
              <motion.circle r="2" fill="#fff" filter="url(#glow)">
               <animateMotion dur="1.5s" repeatCount="indefinite" path="M 0,32 L 80,32" />
             </motion.circle>
           </svg>
        </div>
        {/* Mobile Connector */}
        <div className="flex lg:hidden justify-center py-2 relative z-0">
          <div className="w-[1px] h-8 bg-gradient-to-b from-blue-500/30 to-emerald-500/30" />
        </div>

        {/* OUTPUT NODE */}
        <motion.div 
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full lg:flex-1 lg:max-w-[380px] relative z-10"
          transition={{ delay: 0.1 }}
        >
          <SpotlightCard gradientColor="rgba(16, 185, 129, 0.2)">
            <div className="p-5 flex flex-col h-full relative">
              <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                       <Terminal className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div>
                       <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">Output</div>
                       <div className="text-[10px] text-zinc-500 font-mono">LLM Stream</div>
                    </div>
                 </div>
                 {isTyping ? (
                    <div className="flex gap-0.5">
                      <motion.div className="w-1 h-1 bg-emerald-500 rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} />
                      <motion.div className="w-1 h-1 bg-emerald-500 rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} />
                      <motion.div className="w-1 h-1 bg-emerald-500 rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} />
                    </div>
                 ) : (
                    <div className="text-[10px] font-medium text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">Complete</div>
                 )}
              </div>

               <div className="flex-grow bg-zinc-50 dark:bg-zinc-950/50 rounded-lg p-3 border border-zinc-200 dark:border-zinc-800/80 min-h-[160px] relative overflow-hidden font-mono text-[10px] md:text-xs">
                 <div className="absolute top-1 right-1 z-20">
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors" onClick={copyToClipboard}>
                      {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    </Button>
                </div>
                 <pre className="whitespace-pre-wrap relative z-10 text-zinc-700 dark:text-zinc-300">
                  {displayedResponse}
                  {isTyping && <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-1.5 h-3 md:w-2 md:h-4 align-middle bg-emerald-500 ml-0.5" />}
                </pre>
               </div>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* SECOND CONNECTOR - Desktop */}
        <div className="hidden lg:flex flex-col justify-center items-center w-[80px] h-16 shrink-0 relative">
           <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
             <defs>
               <linearGradient id="beam-grad-2" x1="0%" y1="0%" x2="100%" y2="0%">
                 <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                 <stop offset="100%" stopColor="#a855f7" stopOpacity="0.4" />
               </linearGradient>
             </defs>
             <motion.path 
               d="M 0,32 L 80,32" 
               fill="none" 
               stroke="url(#beam-grad-2)" 
               strokeWidth="2"
               strokeLinecap="round"
               filter="url(#glow)"
               initial={{ pathLength: 0 }}
               animate={{ pathLength: 1 }}
               transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
             />
              <motion.circle r="2" fill="#fff" filter="url(#glow)">
               <animateMotion dur="1.5s" repeatCount="indefinite" path="M 0,32 L 80,32" />
             </motion.circle>
           </svg>
        </div>
        {/* Mobile Connector */}
        <div className="flex lg:hidden justify-center py-2 relative z-0">
          <div className="w-[1px] h-8 bg-gradient-to-b from-emerald-500/30 to-purple-500/30" />
        </div>

        {/* DECODER NODE */}
        <motion.div 
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full lg:flex-1 lg:max-w-[340px] relative z-10"
          transition={{ delay: 0.2 }}
        >
          <SpotlightCard gradientColor="rgba(168, 85, 247, 0.2)">
            <div className="p-5 flex flex-col h-full">
              <div className="flex items-center gap-2 mb-4">
                 <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <Code2 className="w-4 h-4 text-purple-500" />
                 </div>
                 <div>
                    <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">Decoder</div>
                    <div className="text-[10px] text-zinc-500 font-mono">JSON Output</div>
                 </div>
              </div>

               <div className="flex-grow bg-zinc-50 dark:bg-zinc-950/50 rounded-lg p-3 border border-zinc-200 dark:border-zinc-800/80 min-h-[120px] font-mono text-[10px] md:text-xs">
                 <pre className="whitespace-pre-wrap text-purple-700 dark:text-purple-300">
                  {!isTyping && scenario.decoded}
                </pre>
               </div>
            </div>
          </SpotlightCard>
        </motion.div>

      </div>
    </div>
  )
}
