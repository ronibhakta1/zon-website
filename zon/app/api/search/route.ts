import { NextRequest, NextResponse } from "next/server"
import { getSearchIndex } from "@/lib/search"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("q")?.toLowerCase()

  const index = getSearchIndex()

  if (!query) {
    return NextResponse.json([])
  }

  const results = index.filter((item) => {
    return (
      item.title.toLowerCase().includes(query) ||
      item.content.toLowerCase().includes(query)
    )
  })

  return NextResponse.json(results.slice(0, 20)) // Limit results for performance
}
