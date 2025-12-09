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
  
  // Multiple JSON-LD schemas for comprehensive SEO
  const jsonLd = [
    // SoftwareApplication schema
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'ZON (Zero Overhead Notation)',
      alternateName: 'ZON Format',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Any',
      sameAs: [
        'https://github.com/ZON-Format/ZON',
        'https://github.com/ZON-Format/ZON-TS',
        'https://www.npmjs.com/package/zon-format',
        'https://pypi.org/project/zon-format/',
      ],
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      description: 'A human-readable, token-efficient data format designed for LLMs. A superior alternative to JSON, YAML, and TOON that saves 30-40% on API costs.',
      softwareVersion: '1.3.0',
      author: {
        '@type': 'Person',
        name: 'Roni Bhakta',
        url: 'https://ronibhakta.in',
      },
    },
    // Organization schema
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'ZON Format',
      url: 'https://zonformat.org',
      logo: 'https://zonformat.org/logo.png',
      sameAs: [
        'https://github.com/ZON-Format',
      ],
    },
    // WebSite schema with search action
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'ZON - Zero Overhead Notation',
      url: 'https://zonformat.org',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://zonformat.org/docs?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
  ]

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
