import { MetadataRoute } from 'next'
import { docsMap } from '@/lib/docs-config'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://zonformat.org'

  const urls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/playground`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/savings`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  Object.keys(docsMap).forEach(slug => {
    if (slug !== 'index') {
      urls.push({
        url: `${baseUrl}/docs/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      })
    }
  })

  return urls
}