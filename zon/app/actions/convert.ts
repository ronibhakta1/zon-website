"use server"

import { encode, encodeAdaptive } from "zon-format"
import { unstable_cache } from "next/cache"
import { headers } from "next/headers"

// Encoding mode types
export type EncodingMode = "compact" | "readable" | "llm-optimized"

export interface AdvancedOptions {
  enableDictCompression?: boolean
  disableTables?: boolean
}

export interface ConvertOptions {
  mode?: EncodingMode
  advanced?: AdvancedOptions
}

// Basic in-memory rate limiter
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS = 30 // 30 requests per minute
const ipRequests = new Map<string, { count: number; timestamp: number }>()

// Cleanup old entries periodically
setInterval(() => {
  const now = Date.now()
  for (const [ip, data] of ipRequests.entries()) {
    if (now - data.timestamp > RATE_LIMIT_WINDOW) {
      ipRequests.delete(ip)
    }
  }
}, RATE_LIMIT_WINDOW)

async function checkRateLimit() {
  const headersList = await headers()
  const ip = headersList.get("x-forwarded-for") || "unknown"
  
  const now = Date.now()
  const data = ipRequests.get(ip) || { count: 0, timestamp: now }

  if (now - data.timestamp > RATE_LIMIT_WINDOW) {
    // Reset window
    data.count = 1
    data.timestamp = now
  } else {
    data.count++
  }

  ipRequests.set(ip, data)

  if (data.count > MAX_REQUESTS) {
    throw new Error("Rate limit exceeded. Please try again later.")
  }
}

// Convert function with mode and options support
function convertWithOptions(data: unknown, options?: ConvertOptions): string {
  const mode = options?.mode || "compact"
  const advanced = options?.advanced

  // Build options for encodeAdaptive
  const encodeOptions: Record<string, unknown> = {
    mode: mode
  }

  // Apply advanced options if set
  if (advanced?.enableDictCompression) {
    encodeOptions.enableDictCompression = true
  }
  if (advanced?.disableTables) {
    encodeOptions.disableTables = true
  }

  // Use encodeAdaptive which properly handles modes
  const result = encodeAdaptive(data, encodeOptions)
  
  // encodeAdaptive can return string or object with debug info
  if (typeof result === "string") {
    return result
  }
  
  // If it returns an object, extract the output
  return (result as { output: string }).output
}

// Cached conversion function
const getCachedConversion = unstable_cache(
  async (jsonString: string, optionsJson: string) => {
    try {
      const parsed = JSON.parse(jsonString)
      const options: ConvertOptions = optionsJson ? JSON.parse(optionsJson) : {}
      return convertWithOptions(parsed, options)
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Conversion failed")
    }
  },
  ["zon-conversion-v2"], // Cache key
  {
    revalidate: 3600, // Cache for 1 hour
    tags: ["zon-conversion"]
  }
)

export async function convertAction(jsonString: string, options?: ConvertOptions) {
  try {
    await checkRateLimit()
    
    // Check input size (limit to ~1MB to prevent server overload)
    if (jsonString.length > 1024 * 1024) {
      throw new Error("Input too large (max 1MB)")
    }

    const optionsJson = options ? JSON.stringify(options) : ""
    const result = await getCachedConversion(jsonString, optionsJson)
    return { success: true, data: result }
  } catch (err) {
    return { 
      success: false, 
      error: err instanceof Error ? err.message : "Unknown error" 
    }
  }
}


