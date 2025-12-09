export const docsMap: Record<string, string> = {
  "index": "content/docs/getting-started.mdx",
  "getting-started": "content/docs/getting-started.mdx",
  "format-overview": "content/docs/format-overview.mdx",
  "using-zon-with-llms": "content/docs/using-zon-with-llms.mdx", // Keeping for backward compat, but navigation will point to llm-best-practices
  "llm-best-practices": "content/docs/llm-best-practices.mdx",
  "benchmarks": "content/docs/benchmarks.mdx",
  "cli-reference": "content/docs/cli-guide.mdx", // Alias to new guide
  "cli-guide": "content/docs/cli-guide.mdx",
  "tools-playgrounds": "content/docs/tools-playgrounds.mdx",
  "implementations": "content/docs/implementations.mdx",
  "api-typescript": "content/docs/api-typescript.mdx",
  "api-python": "content/docs/api-python.mdx",
  "efficiency-formalization": "content/docs/efficiency-formalization.mdx",
  "typescript": "content/docs/typescript.mdx",
  "specification": "content/docs/specification.mdx",
  "changelog": "content/docs/changelog.mdx",
  "syntax-cheatsheet": "content/docs/syntax-cheatsheet.mdx",
  "vs-toon": "content/docs/vs-toon.mdx",
  "eval-llms": "content/docs/eval-llms.mdx",
  "contributing": "CONTRIBUTING.md",
  "advanced-features": "content/docs/advanced-features.mdx",
  "streaming-guide": "content/docs/streaming-guide.mdx",
  "schema-validation": "content/docs/schema-validation.mdx",
  "integrations": "content/docs/integrations.mdx",
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
        { title: "TypeScript Guide", href: "/docs/typescript" },
        { title: "Implementations", href: "/docs/implementations" },
        { title: "LLM Best Practices", href: "/docs/llm-best-practices" },
        { title: "Benchmarks", href: "/docs/benchmarks" },
        { title: "ZON vs TOON", href: "/docs/vs-toon" },
      ]
    },
    {
      title: "Toolkit",
      items: [
        { title: "CLI Guide", href: "/docs/cli-guide" },
        { title: "Schema Validation", href: "/docs/schema-validation" },
        { title: "Eval LLMs", href: "/docs/eval-llms" },
        { title: "Streaming Guide", href: "/docs/streaming-guide" },
        { title: "Integrations", href: "/docs/integrations" },
        { title: "Advanced Features", href: "/docs/advanced-features" },
        { title: "Tools & Playgrounds", href: "/docs/tools-playgrounds" },
      ]
    },
    {
      title: "Technical Reference",
      items: [
        { title: "API (TypeScript)", href: "/docs/api-typescript" },
        { title: "API (Python)", href: "/docs/api-python" },
        { title: "Syntax Cheatsheet", href: "/docs/syntax-cheatsheet" },
        { title: "Specification", href: "/docs/specification" },
        { title: "Efficiency Formalization", href: "/docs/efficiency-formalization" },
        { title: "Changelog", href: "/docs/changelog" },
      ]
    }
  ]
}
