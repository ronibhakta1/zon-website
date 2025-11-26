export const docsMap: Record<string, string> = {
  "index": "README.md",
  "vs-toon": "content/docs/vs-toon.mdx",
  "typescript": "content/docs/typescript.mdx",
  "changelog": "CHANGELOG.md",
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
        { title: "What is ZON?", href: "/docs#-what-is-zon" },
        { title: "Quick Start", href: "/docs#-quick-start" },
        { title: "Installation", href: "/docs#-installation" },
      ]
    },
    {
      title: "Features",
      items: [
        { title: "LLM Framework Integration", href: "/docs#-llm-framework-integration" },
        { title: "Benchmark Results", href: "/docs#-benchmark-results" },
        { title: "API Reference", href: "/docs#-api-reference" },
      ]
    },
    {
      title: "Resources",
      items: [
        { title: "Changelog", href: "/docs/changelog" },
        { title: "Contributing", href: "/docs/contributing" },
      ]
    }
  ]
}
