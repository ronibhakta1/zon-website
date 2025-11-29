export const docsMap: Record<string, string> = {
  "index": "content/docs/introduction.mdx",
  "vs-toon": "content/docs/vs-toon.mdx",
  "typescript": "content/docs/typescript.mdx",
  "specification": "content/docs/specification.mdx",
  "changelog": "content/docs/changelog.mdx",
  "api-reference": "content/docs/api-reference.mdx",
  "syntax-cheatsheet": "content/docs/syntax-cheatsheet.mdx",
  "contributing": "CONTRIBUTING.md",
}

export interface NavItem {
  title: string
  href: string
}

export interface NavSection {
  title?: string
  items: NavItem[]
}

export function getDocsNav(): NavSection[] {
  return [
    {
      title: "Getting Started",
      items: [
        { title: "Introduction", href: "/docs" },
        { title: "ZON vs TOON", href: "/docs/vs-toon" },
        { title: "TypeScript Support", href: "/docs/typescript" },
        { title: "Changelog", href: "/docs/changelog" },
      ]
    },
    {
      title: "Reference",
      items: [
        { title: "Specification", href: "/docs/specification" },
        { title: "API Reference", href: "/docs/api-reference" },
        { title: "Syntax Cheatsheet", href: "/docs/syntax-cheatsheet" },
      ]
    },
    {
      title: "Resources",
      items: [
        { title: "Contributing", href: "/docs/contributing" },
      ]
    }
  ]
}
