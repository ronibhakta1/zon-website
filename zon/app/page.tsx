import { getDocBySlug } from "@/lib/docs"
import { HomePageClient } from "@/components/home-page-client"

function extractCodeBlock(content: string, language: string, index: number = 0): string {
  const regex = new RegExp(`\`\`\`${language}\\n([\\s\\S]*?)\`\`\``, 'g')
  const matches = [...content.matchAll(regex)]
  return matches[index] ? matches[index][1].trim() : ""
}

async function getGitHubStars() {
  try {
    const res = await fetch('https://api.github.com/repos/ZON-Format/ZON', {
      next: { revalidate: 3600 }
    })
    if (!res.ok) return 0
    const data = await res.json()
    return data.stargazers_count
  } catch (error) {
    return 0
  }
}

const quickStartCode = `import zon

# Your data
data = {
  "friends": ["ana", "luis", "sam"],
  "hikes": [
    {"name": "Blue Lake Trail", "distance": 7.5, "companion": "ana"},
    {"name": "Ridge Overlook", "distance": 9.2, "companion": "luis"},
    {"name": "Wildflower Loop", "distance": 5.1, "companion": "sam"}
  ]
}

# Encode & decode
compressed = zon.encode(data)
original = zon.decode(compressed)
assert original == data  # ✓ Perfect!`

export default async function Home() {
  const readmeContent = await getDocBySlug("index") || ""
  const stars = await getGitHubStars()
  
  const basicEncodingCode = extractCodeBlock(readmeContent, "python", 3) // Step 2: Basic Encoding
  const advancedUsageCode = extractCodeBlock(readmeContent, "python", 6) // Advanced Usage

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'ZON (Zero Overhead Notation)',
    alternateName: 'ZON Format',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    sameAs: ['https://github.com/ZON-Format/ZON'],
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'A human-readable, efficient data format for the modern web. Optimized for LLMs.',
    softwareVersion: '1.0',
    author: {
      '@type': 'Person',
      name: 'Roni Bhakta',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePageClient 
        quickStartCode={quickStartCode}
        basicEncodingCode={basicEncodingCode}
        advancedUsageCode={advancedUsageCode}
        initialStars={stars}
      />
    </>
  )
}
