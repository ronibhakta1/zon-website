import { getDocBySlug } from "@/lib/docs"
import { HomePageClient } from "@/components/home-page-client"

function extractCodeBlock(content: string, language: string, index: number = 0): string {
  const regex = new RegExp(`\`\`\`${language}\\n([\\s\\S]*?)\`\`\``, 'g')
  const matches = [...content.matchAll(regex)]
  return matches[index] ? matches[index][1].trim() : ""
}

export default async function Home() {
  const readmeContent = await getDocBySlug("index") || ""
  
  const quickStartCode = extractCodeBlock(readmeContent, "python", 0)
  const basicEncodingCode = extractCodeBlock(readmeContent, "python", 3) // Step 2: Basic Encoding
  const advancedUsageCode = extractCodeBlock(readmeContent, "python", 6) // Advanced Usage

  return (
    <HomePageClient 
      quickStartCode={quickStartCode}
      basicEncodingCode={basicEncodingCode}
      advancedUsageCode={advancedUsageCode}
    />
  )
}
