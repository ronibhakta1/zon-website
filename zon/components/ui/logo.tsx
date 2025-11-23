import Image from "next/image"
import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-8 w-8", className)}>
      <Image
        src="/logo.png"
        alt="ZON Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  )
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Logo className="h-10 w-10" />
      {/* Text is now part of the logo image, so we hide the text or just use the logo */}
    </div>
  )
}
