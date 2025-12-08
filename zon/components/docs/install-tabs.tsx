"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

interface InstallTabsProps {
  args: string
}

export function InstallTabs({ args }: InstallTabsProps) {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("npm")

  function getCommand(pkg: string, pkgArgs: string): string {
    if (pkg === "npm") return "npm install " + pkgArgs
    if (pkg === "pnpm") return "pnpm add " + pkgArgs
    if (pkg === "yarn") return "yarn add " + pkgArgs
    if (pkg === "bun") return "bun add " + pkgArgs
    return ""
  }

  function handleCopy() {
    navigator.clipboard.writeText(getCommand(activeTab, args))
    setCopied(true)
    setTimeout(function() { setCopied(false) }, 2000)
  }

  const tabs = ["npm", "pnpm", "yarn", "bun"]

  return (
    <div className="my-4 rounded-lg border overflow-hidden">
      <div className="flex items-center justify-between border-b bg-muted/50 px-1">
        <div className="flex">
          {tabs.map(function(pkg) {
            return (
              <button
                key={pkg}
                onClick={function() { setActiveTab(pkg) }}
                className={"h-9 px-3 text-xs font-medium " + (activeTab === pkg ? "border-b-2 border-foreground" : "text-muted-foreground")}
              >
                {pkg}
              </button>
            )
          })}
        </div>
        <button
          onClick={handleCopy}
          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
      <div className="px-4 py-3">
        <code className="text-sm font-mono text-foreground">{getCommand(activeTab, args)}</code>
      </div>
    </div>
  )
}


