import { notFound } from "next/navigation"
import { getDocContent } from "@/lib/docs"
import { DocsPager } from "@/components/docs/pager"
import { DocsBreadcrumbs } from "@/components/docs/breadcrumbs"
import { DashboardTableOfContents } from "@/components/docs/toc"

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
    <div className="lg:grid lg:grid-cols-[1fr_250px] xl:grid-cols-[1fr_300px] gap-10">
      <div className="min-w-0 max-w-3xl mx-auto w-full">
        <div className="sticky top-14 z-20 -ml-4 -mr-4 px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4 border-b border-border/40 mb-8">
          <DocsBreadcrumbs />
        </div>
        <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground prose-strong:text-foreground prose-h1:text-3xl prose-h1:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:text-primary prose-code:before:content-none prose-code:after:content-none prose-table:text-xs sm:prose-table:text-sm prose-th:px-2 sm:prose-th:px-4 prose-td:px-2 sm:prose-td:px-4">
          <h1>{doc.title}</h1>
          {doc.content}
          <DocsPager slug={slug} />
        </article>
      </div>
      <div className="hidden text-sm lg:block">
        <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto pt-6">
          <DashboardTableOfContents toc={doc.headings} />
        </div>
      </div>
    </div>
  )
}

