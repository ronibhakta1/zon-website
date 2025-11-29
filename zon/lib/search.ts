import path from "path"
import { docsMap, getDocsNav, type SearchItem } from "@/lib/docs-config"

function stripMarkdown(content: string): string {
  return content
    .replace(/^---\n[\s\S]*?\n---\n/, "") // Remove frontmatter
    .replace(/```[\s\S]*?```/g, "") // Remove code blocks
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Remove links
    .replace(/[*_`#]/g, "") // Remove formatting chars
    .replace(/\n+/g, " ") // Replace newlines with spaces
    .trim()
}

export function getSearchIndex(): SearchItem[] {
  const nav = getDocsNav()
  const index: SearchItem[] = []

  // Create a map of href to section title
  const hrefToSection: Record<string, string> = {}
  nav.forEach((section) => {
    section.items.forEach((item) => {
      hrefToSection[item.href] = section.title || "Documentation"
    })
  })

  // Iterate over docsMap to read files
  Object.entries(docsMap).forEach(([slug, filePath]) => {
    const fullPath = path.join(process.cwd(), filePath)
    // We use sync fs here because this runs at build time/server start
    const fsSync = require("fs")
    if (fsSync.existsSync(fullPath)) {
      const content = fsSync.readFileSync(fullPath, "utf-8")
      
      // Extract headings
      const headingRegex = /^(#{2,4})\s+(.+)$/gm
      let match
      let lastH2 = ""
      let lastH3 = ""
      
      // Add the main page
      const plainText = stripMarkdown(content)
      const href = `/docs/${slug === "index" ? "getting-started" : slug}` // Normalize href
      const navItem = nav.flatMap((s) => s.items).find((i) => i.href === href)
      const pageTitle = navItem?.title || slug
      const section = hrefToSection[href] || "Documentation"

      index.push({
        title: pageTitle,
        href,
        content: plainText.slice(0, 200), // Limit content size
        section
      })

      while ((match = headingRegex.exec(content)) !== null) {
        const level = match[1].length
        const text = match[2].trim()
        const slugText = text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "")
        
        if (level === 2) {
          lastH2 = text
          lastH3 = ""
        } else if (level === 3) {
          lastH3 = text
        }

        // Construct hierarchy
        let hierarchy = pageTitle
        if (lastH2 && level >= 2) hierarchy += ` > ${lastH2}`
        if (lastH3 && level >= 3) hierarchy += ` > ${lastH3}`
        
        // If the current heading is the last part of hierarchy, don't duplicate it in title display if we want
        // But for search, we want the specific heading as the main title, and hierarchy as context.
        
        index.push({
          title: text,
          href: `${href}#${slugText}`,
          content: hierarchy, // Use content field to store hierarchy for display/search
          section
        })
      }
    }
  })

  return index
}
