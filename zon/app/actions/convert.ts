"use server"

import { encode } from "zon-format"
import { unstable_cache } from "next/cache"
import { headers } from "next/headers"

// Basic in-memory rate limiter
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS = 20 // 20 requests per minute
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

// Cached conversion function
const getCachedConversion = unstable_cache(
  async (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString)
      return encode(parsed)
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Conversion failed")
    }
  },
  ["zon-conversion-v1"], // Cache key
  {
    revalidate: 3600, // Cache for 1 hour
    tags: ["zon-conversion"]
  }
)

export async function convertAction(jsonString: string) {
  try {
    await checkRateLimit()
    
    // Check input size (limit to ~1MB to prevent server overload)
    if (jsonString.length > 1024 * 1024) {
      throw new Error("Input too large (max 1MB)")
    }

    const result = await getCachedConversion(jsonString)
    return { success: true, data: result }
  } catch (err) {
    return { 
      success: false, 
      error: err instanceof Error ? err.message : "Unknown error" 
    }
  }
}
