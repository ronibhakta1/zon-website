"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

interface LanguageInstallTabsProps {
  tsPackage?: string
  pyPackage?: string
}

export function LanguageInstallTabs({ 
  tsPackage = "zon-format", 
  pyPackage = "zon-format" 
}: LanguageInstallTabsProps) {
  const [copied, setCopied] = useState(false)
  const [language, setLanguage] = useState<"ts" | "py">("ts")
  const [pkgManager, setPkgManager] = useState("npm")

  function getCommand(): string {
    if (language === "ts") {
      if (pkgManager === "npm") return `npm install ${tsPackage}`
      if (pkgManager === "pnpm") return `pnpm add ${tsPackage}`
      if (pkgManager === "yarn") return `yarn add ${tsPackage}`
      if (pkgManager === "bun") return `bun add ${tsPackage}`
    } else {
      if (pkgManager === "pip") return `pip install ${pyPackage}`
      if (pkgManager === "uv") return `uv add ${pyPackage}`
    }
    return ""
  }

  function handleCopy() {
    navigator.clipboard.writeText(getCommand())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const tsPkgManagers = ["npm", "pnpm", "yarn", "bun"]
  const pyPkgManagers = ["pip", "uv"]
  const currentManagers = language === "ts" ? tsPkgManagers : pyPkgManagers

  // Reset package manager when language changes
  function handleLanguageChange(lang: "ts" | "py") {
    setLanguage(lang)
    if (lang === "ts") setPkgManager("npm")
    else setPkgManager("pip")
  }

  return (
    <div className="my-4 rounded-lg border overflow-hidden">
      {/* Language tabs */}
      <div className="flex items-center justify-between border-b bg-muted/30 px-1">
        <div className="flex">
          <button
            onClick={() => handleLanguageChange("ts")}
            className={`h-10 px-4 text-sm font-medium transition-colors ${
              language === "ts" 
                ? "bg-background border-b-2 border-primary text-foreground" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            TypeScript / JavaScript
          </button>
          <button
            onClick={() => handleLanguageChange("py")}
            className={`h-10 px-4 text-sm font-medium transition-colors ${
              language === "py" 
                ? "bg-background border-b-2 border-primary text-foreground" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Python
          </button>
        </div>
      </div>
      
      {/* Package manager tabs + copy button */}
      <div className="flex items-center justify-between border-b bg-muted/50 px-1">
        <div className="flex">
          {currentManagers.map((pkg) => (
            <button
              key={pkg}
              onClick={() => setPkgManager(pkg)}
              className={`h-9 px-3 text-xs font-medium transition-colors ${
                pkgManager === pkg 
                  ? "border-b-2 border-foreground text-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {pkg}
            </button>
          ))}
        </div>
        <button
          onClick={handleCopy}
          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Copy command"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
      
      {/* Command */}
      <div className="px-4 py-3 bg-background">
        <code className="text-sm font-mono text-foreground">{getCommand()}</code>
      </div>
    </div>
  )
}
