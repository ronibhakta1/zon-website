import { HomePageClient } from "@/components/home-page-client"

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



export default async function Home() {
  const stars = await getGitHubStars()
  
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
        initialStars={stars}
      />
    </>
  )
}
