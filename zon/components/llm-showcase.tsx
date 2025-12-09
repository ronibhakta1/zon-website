"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Table2, Settings2, Sparkles, Terminal, Copy, Check, ArrowRight, Code2 } from "lucide-react"

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
    <div className="w-full max-w-7xl mx-auto px-4 py-6 md:py-8">
      <div className="mb-8 md:mb-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 md:mb-3 text-zinc-900 dark:text-zinc-100">
          Native Fluency in ZON
        </h2>
        <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto">
          ZON connects your data to LLMs natively. No JSON conversion overhead.
        </p>
      </div>

      {/* Scenario Selector */}
      <div className="flex justify-center mb-8 md:mb-12">
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
                    className="absolute inset-0 bg-zinc-800 dark:bg-zinc-700 rounded-full shadow-md"
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
          <div className="relative h-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/60 rounded-xl shadow-lg dark:shadow-2xl flex flex-col overflow-hidden">
            {/* Header Glow */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-50" />

            <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between bg-zinc-50 dark:bg-zinc-900/20">
              <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-blue-600 dark:text-blue-400 font-mono tracking-widest uppercase">
                <div className="w-2 h-2 bg-blue-500 rounded-sm" />
                Input::Data
              </div>
              <div className="text-[9px] md:text-[10px] text-zinc-400 dark:text-zinc-600 font-mono">ZON Encoder</div>
            </div>

            <div className="p-4 flex flex-col gap-4 flex-grow font-mono text-xs md:text-sm">
              <div>
                <label className="text-[9px] md:text-[10px] font-bold text-zinc-500 mb-1.5 block uppercase tracking-wider flex justify-between">
                  <span>Context</span>
                  <span className="text-zinc-400 dark:text-zinc-600">ZON</span>
                </label>
                <div className="bg-zinc-100 dark:bg-[#0a0a0a] rounded-lg p-2.5 md:p-3 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800/80 overflow-x-auto text-[10px] md:text-xs">
                   <pre className="whitespace-pre-wrap">{scenario.context}</pre>
                </div>
              </div>

              <div>
                 <label className="text-[9px] md:text-[10px] font-bold text-blue-600 dark:text-blue-500 mb-1.5 block uppercase tracking-wider flex items-center gap-1.5">
                  <ArrowRight className="w-2.5 h-2.5 md:w-3 md:h-3" /> 
                  Query
                </label>
                <div className="text-zinc-700 dark:text-zinc-200 leading-relaxed bg-blue-50 dark:bg-blue-500/5 border border-blue-200 dark:border-blue-500/10 p-2.5 md:p-3 rounded-lg text-[10px] md:text-xs">
                  {scenario.prompt}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FIRST CONNECTOR - Desktop */}
        <div className="hidden lg:flex flex-col justify-center items-center w-[80px] h-16 shrink-0 relative">
           <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
             <defs>
               <linearGradient id="beam-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                 <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                 <stop offset="100%" stopColor="#10b981" stopOpacity="0.6" />
               </linearGradient>
               <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                 <feGaussianBlur stdDeviation="2" result="blur" />
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
        <div className="flex lg:hidden justify-center py-2">
          <div className="w-[2px] h-8 bg-gradient-to-b from-blue-500/50 to-emerald-500/50 rounded-full" />
        </div>

        {/* OUTPUT NODE */}
        <motion.div 
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full lg:flex-1 lg:max-w-[380px] relative z-10"
          transition={{ delay: 0.1 }}
        >
          <div className="relative h-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/60 rounded-xl shadow-lg dark:shadow-2xl flex flex-col overflow-hidden">
             <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-50" />

             <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between bg-zinc-50 dark:bg-zinc-900/20">
              <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono tracking-widest uppercase">
                <div className="w-2 h-2 bg-emerald-500 rounded-sm" />
                Output::LLM
              </div>
              <div className="flex items-center gap-2">
                {isTyping && (
                  <div className="flex gap-0.5">
                    <motion.div className="w-1 h-1 bg-emerald-500 rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} />
                    <motion.div className="w-1 h-1 bg-emerald-500 rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} />
                    <motion.div className="w-1 h-1 bg-emerald-500 rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} />
                  </div>
                )}
                 <div className="text-[9px] md:text-[10px] text-zinc-400 dark:text-zinc-600 font-mono">{isTyping ? "Streaming..." : "Done"}</div>
              </div>
            </div>

            <div className="p-4 flex-grow font-mono text-xs md:text-sm relative flex flex-col min-h-[140px] md:min-h-[180px]">
              <label className="text-[9px] md:text-[10px] font-bold text-zinc-500 mb-1.5 block uppercase tracking-wider flex justify-between">
                  <span>Response</span>
                  <span className="text-zinc-400 dark:text-zinc-600">ZON</span>
              </label>
              
              <div className="bg-zinc-100 dark:bg-[#0a0a0a] rounded-lg p-2.5 md:p-3 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800/80 flex-grow relative overflow-hidden text-[10px] md:text-xs leading-relaxed">
                <div className="absolute top-1 right-1">
                    <Button variant="ghost" size="icon" className="h-5 w-5 md:h-6 md:w-6 text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors" onClick={copyToClipboard}>
                      {isCopied ? <Check className="w-2.5 h-2.5 md:w-3 md:h-3" /> : <Copy className="w-2.5 h-2.5 md:w-3 md:h-3" />}
                    </Button>
                </div>
                <pre className="whitespace-pre-wrap relative z-10 pr-6">
                  {displayedResponse}
                  {isTyping && <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-1.5 h-3 md:w-2 md:h-4 align-middle bg-emerald-500 ml-0.5" />}
                </pre>
              </div>
            </div>
          </div>
        </motion.div>

        {/* SECOND CONNECTOR - Desktop */}
        <div className="hidden lg:flex flex-col justify-center items-center w-[80px] h-16 shrink-0 relative">
           <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
             <defs>
               <linearGradient id="beam-grad-2" x1="0%" y1="0%" x2="100%" y2="0%">
                 <stop offset="0%" stopColor="#10b981" stopOpacity="0.6" />
                 <stop offset="100%" stopColor="#a855f7" stopOpacity="0.6" />
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
        <div className="flex lg:hidden justify-center py-2">
          <div className="w-[2px] h-8 bg-gradient-to-b from-emerald-500/50 to-purple-500/50 rounded-full" />
        </div>

        {/* DECODER NODE */}
        <motion.div 
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full lg:flex-1 lg:max-w-[340px] relative z-10"
          transition={{ delay: 0.2 }}
        >
          <div className="relative h-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/60 rounded-xl shadow-lg dark:shadow-2xl flex flex-col overflow-hidden">
             <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-50" />

             <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between bg-zinc-50 dark:bg-zinc-900/20">
              <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-purple-600 dark:text-purple-400 font-mono tracking-widest uppercase">
                <Code2 className="w-3 h-3 md:w-3.5 md:h-3.5" />
                Decoder::JSON
              </div>
               <div className="text-[9px] md:text-[10px] text-zinc-400 dark:text-zinc-600 font-mono">ZON.decode()</div>
            </div>

            <div className="p-4 flex-grow font-mono text-xs md:text-sm relative flex flex-col min-h-[120px] md:min-h-[160px]">
              <label className="text-[9px] md:text-[10px] font-bold text-zinc-500 mb-1.5 block uppercase tracking-wider flex justify-between">
                  <span>Output</span>
                  <span className="text-zinc-400 dark:text-zinc-600">JSON</span>
              </label>
              
              <div className="bg-zinc-100 dark:bg-[#0a0a0a] rounded-lg p-2.5 md:p-3 text-purple-700 dark:text-purple-300/80 border border-zinc-200 dark:border-zinc-800/80 flex-grow relative overflow-hidden text-[10px] md:text-xs leading-relaxed">
                <pre className="whitespace-pre-wrap relative z-10">
                  {!isTyping && scenario.decoded}
                </pre>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
