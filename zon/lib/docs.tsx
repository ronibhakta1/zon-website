import { compileMDX } from "next-mdx-remote/rsc"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import { docsMap } from "./docs-config"

import fs from 'fs/promises'
import path from 'path'

const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/ZON-Format/ZON/main'

export async function getDocBySlug(slug: string): Promise<string | null> {
  const filename = docsMap[slug]
  if (!filename) return null

  // Try local file first (for development)
  try {
    const localPath = path.join(process.cwd(), filename)
    const content = await fs.readFile(localPath, 'utf-8')
    return content
  } catch (e) {
    // Fallback to GitHub if local file not found (or in production if files aren't bundled)
    // console.log(`Local file not found: ${filename}, trying GitHub...`)
  }

  try {
    const response = await fetch(`${GITHUB_RAW_BASE}/${filename}`, {
      next: { revalidate: 3600 } // Revalidate every 1 hour
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
        table: (props: any) => (
            <div className="my-6 w-full overflow-hidden rounded-lg border border-primary/30 bg-primary/5 shadow-sm">
                <div className="overflow-x-auto">
                    <table {...props} className="w-full text-sm" />
                </div>
            </div>
        ),
        th: (props: any) => (
            <th {...props} className="whitespace-nowrap px-4 py-3 text-left font-bold text-primary border-b border-primary/20 bg-primary/10" />
        ),
        td: (props: any) => (
            <td {...props} className="whitespace-nowrap px-4 py-3 border-b border-primary/10 text-foreground/90" />
        ),
    }
  })

  const cleanTitle = (frontmatter as any).title || path.basename(fileName).replace(/\.mdx?$/, "")
  
  return { content, frontmatter, title: cleanTitle }
}
