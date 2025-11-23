import { notFound } from "next/navigation"
import { getDocContent } from "@/lib/docs"

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
    <article className="prose prose-zinc dark:prose-invert max-w-none">
      <h1>{doc.title}</h1>
      {doc.content}
    </article>
  )
}
