export const docsMap: Record<string, string> = {
  "index": "README.md",
  "spec": "SPEC.md",
  "changelog": "CHANGELOG.md",
  "contributing": "CONTRIBUTING.md",
  "edge-cases": "EDGE_CASES.md",
  "publishing": "PUBLISHING.md",
  "qa-report": "QA_REPORT.md",
}

export function getDocsNav() {
  return Object.keys(docsMap).map(slug => ({
    title: slug === "index" ? "Introduction" : slug.charAt(0).toUpperCase() + slug.slice(1).replace("-", " "),
    href: slug === "index" ? "/docs" : `/docs/${slug}`
  }))
}
