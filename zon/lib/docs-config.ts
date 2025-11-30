export const docsMap: Record<string, string> = {
  "index": "content/docs/getting-started.mdx",
  "getting-started": "content/docs/getting-started.mdx",
  "format-overview": "content/docs/format-overview.mdx",
  "using-zon-with-llms": "content/docs/using-zon-with-llms.mdx",
  "benchmarks": "content/docs/benchmarks.mdx",
  "cli-reference": "content/docs/cli-reference.mdx",
  "tools-playgrounds": "content/docs/tools-playgrounds.mdx",
  "implementations": "content/docs/implementations.mdx",
  "api-typescript": "content/docs/api-typescript.mdx",
  "efficiency-formalization": "content/docs/efficiency-formalization.mdx",
  "typescript": "content/docs/typescript.mdx",
  "specification": "content/docs/specification.mdx",
  "changelog": "content/docs/changelog.mdx",
  "syntax-cheatsheet": "content/docs/syntax-cheatsheet.mdx",
  "vs-toon": "content/docs/vs-toon.mdx",
  "eval-llms": "content/docs/eval-llms.mdx",
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

export interface SearchItem {
  title: string
  href: string
  content: string
  section: string
}

export function getDocsNav(): NavSection[] {
  return [
    {
      title: "Essentials",
      items: [
        { title: "Getting Started", href: "/docs/getting-started" },
        { title: "Format Overview", href: "/docs/format-overview" },
        { title: "Using ZON with LLMs", href: "/docs/using-zon-with-llms" },
        { title: "Benchmarks", href: "/docs/benchmarks" },
        { title: "Eval LLMs (Guardrails)", href: "/docs/eval-llms" },
        { title: "ZON vs TOON", href: "/docs/vs-toon" },
      ]
    },
    {
      title: "Toolkit",
      items: [
        { title: "CLI Reference", href: "/docs/cli-reference" },
        { title: "Tools & Playgrounds", href: "/docs/tools-playgrounds" },
      ]
    },
    {
      title: "Libraries",
      items: [
        { title: "Implementations", href: "/docs/implementations" },
      ]
    },
    {
      title: "Technical Reference",
      items: [
        { title: "API (TypeScript)", href: "/docs/api-typescript" },
        { title: "Syntax Cheatsheet", href: "/docs/syntax-cheatsheet" },
        { title: "Specification", href: "/docs/specification" },

        { title: "Efficiency Formalization", href: "/docs/efficiency-formalization" },
        { title: "Changelog", href: "/docs/changelog" },
      ]
    }
  ]
}
