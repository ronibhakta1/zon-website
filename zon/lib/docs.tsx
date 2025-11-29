import { compileMDX } from "next-mdx-remote/rsc"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import { docsMap } from "./docs-config"
import { Details, Summary } from "@/components/docs/details"
import { Callout } from "@/components/docs/callout"
import React from "react"

import fs from 'fs/promises'
import path from 'path'

const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/ZON-Format/ZON/main'

export async function getDocBySlug(slug: string): Promise<string | null> {
  const filename = docsMap[slug]
  if (!filename) return null

  // Try local file first (for development)
  // Try local file first (for development)
  try {
    const localPath = path.join(process.cwd(), filename)
    const content = await fs.readFile(localPath, 'utf-8')
    return content
  } catch (e) {
    console.error(`Local file not found: ${filename}`)
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
        blockquote: (props: any) => {
          const children = React.Children.toArray(props.children)
          const firstChild = children[0] as any
          
          if (firstChild?.type === "p") {
            const pChildren = React.Children.toArray(firstChild.props.children)
            const firstText = pChildren[0]
            
            if (typeof firstText === "string") {
              const match = firstText.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i)
              
              if (match) {
                const type = match[1].toLowerCase()
                const rawRemaining = firstText.replace(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/i, "")
                
                // Reconstruct the paragraph content without the tag
                const newPChildren = rawRemaining.trim() 
                  ? [rawRemaining, ...pChildren.slice(1)]
                  : pChildren.slice(1)
                  
                // If the paragraph is now empty (was just the tag), skip it
                const newChildren = newPChildren.length > 0
                  ? [<p key="first">{newPChildren}</p>, ...children.slice(1)]
                  : children.slice(1)

                return <Callout type={type as any}>{newChildren}</Callout>
              }
            }
          }
          
          // Fallback for standard blockquotes
          return (
            <blockquote className="mt-6 border-l-2 pl-6 italic" {...props} />
          )
        },
        details: Details,
        summary: Summary,
        Details,
        Summary,
        Callout,
    }
  })

  const cleanTitle = (frontmatter as any).title || path.basename(fileName).replace(/\.mdx?$/, "")
  
  // Extract headings for Table of Contents
  const headings = Array.from(cleanedSource.matchAll(/(#{2,3})\s+(.+)/g)).map(
    (match) => {
      const flag = match[1]
      const content = match[2]
      return {
        level: flag?.length === 2 ? 2 : 3,
        text: content || "",
        slug: content ? content.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "") : "",
      }
    }
  )

  return { content, frontmatter, title: cleanTitle, headings }
}


