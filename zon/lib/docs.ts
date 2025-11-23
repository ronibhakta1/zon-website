import { compileMDX } from "next-mdx-remote/rsc"
import rehypeSlug from "rehype-slug"
import { docsMap } from "./docs-config"

const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/ZON-Format/ZON/main'

export async function getDocBySlug(slug: string): Promise<string | null> {
  const filename = docsMap[slug]
  if (!filename) return null

  try {
    const response = await fetch(`${GITHUB_RAW_BASE}/${filename}`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    })
    
    if (!response.ok) return null
    return await response.text()
  } catch (error) {
    console.error(`Error fetching ${filename}:`, error)
    return null
  }
}

export async function getDocContent(slug: string) {
  const fileName = docsMap[slug] || docsMap["index"]
  
  const source = await getDocBySlug(slug)
  
  if (!source) {
    return null
  }

  const { content, frontmatter } = await compileMDX({
    source,
    options: { 
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [rehypeSlug]
      }
    },
    components: {
        // Add custom components here if needed
    }
  })

  return { content, frontmatter, title: fileName.replace(".md", "") }
}
