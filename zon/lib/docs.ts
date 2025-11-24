import { compileMDX } from "next-mdx-remote/rsc"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import { docsMap } from "./docs-config"

const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/ZON-Format/ZON/main'

export async function getDocBySlug(slug: string): Promise<string | null> {
  const filename = docsMap[slug]
  if (!filename) return null

  try {
    const response = await fetch(`${GITHUB_RAW_BASE}/${filename}`, {
      next: { revalidate: 0 } // No cache for fresh docs
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

  // Clean common malformed table artifacts from remote README files.
  // Some upstream READMEs may contain stray pipe-only lines which
  // break GFM table parsing (e.g. a line that contains just "|\n").
  // Remove lines that consist only of pipes and whitespace so tables
  // parse correctly when using `remark-gfm`.
  const cleanedSource = source.replace(/^\s*\|\s*$/gm, "")

  const { content, frontmatter } = await compileMDX({
    source: cleanedSource,
    options: { 
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, rehypeHighlight]
      }
    },
    components: {
        // Add custom components here if needed
    }
  })

  return { content, frontmatter, title: fileName.replace(".md", "") }
}
