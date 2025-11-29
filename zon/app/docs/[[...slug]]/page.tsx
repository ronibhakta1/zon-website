import { notFound } from "next/navigation"
import { getDocContent } from "@/lib/docs"
import { DocsPager } from "@/components/docs/pager"

interface DocPageProps {
  params: Promise<{
    slug?: string[]
  }>
}

export default async function DocPage({ params }: DocPageProps) {
  const resolvedParams = await params
  const slug = resolvedParams.slug ? resolvedParams.slug[0] : "index"
  const doc = await getDocContent(slug)

  if (!doc) {
    notFound()
  }

  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground prose-strong:text-foreground prose-h1:text-3xl prose-h1:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:text-primary prose-code:before:content-none prose-code:after:content-none prose-table:text-xs sm:prose-table:text-sm prose-th:px-2 sm:prose-th:px-4 prose-td:px-2 sm:prose-td:px-4">
      <h1>{doc.title}</h1>
      {doc.content}
      <DocsPager slug={slug} />
    </article>
  )
}

