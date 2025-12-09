import { notFound } from "next/navigation"
import { Metadata } from "next"
import { getDocContent } from "@/lib/docs"
import { DocsPager } from "@/components/docs/pager"
import { DocsBreadcrumbs } from "@/components/docs/breadcrumbs"
import { DashboardTableOfContents } from "@/components/docs/toc"
import { docsMap } from "@/lib/docs-config"

interface DocPageProps {
  params: Promise<{
    slug?: string[]
  }>
}

// Generate dynamic metadata for each docs page
export async function generateMetadata({ params }: DocPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const slug = resolvedParams.slug ? resolvedParams.slug.join("/") : "index"
  const doc = await getDocContent(slug)
  
  if (!doc) {
    return {
      title: "Not Found",
    }
  }

  const title = doc.title
  const description = `${doc.title} - ZON documentation. Learn about Zero Overhead Notation, the token-efficient data format for LLMs.`
  const url = slug === "index" ? "https://zonformat.org/docs" : `https://zonformat.org/docs/${slug}`

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ZON Docs`,
      description,
      url,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: `${title} | ZON Docs`,
      description,
    },
    alternates: {
      canonical: url,
    },
  }
}

// Generate static params for all docs pages
export async function generateStaticParams() {
  return Object.keys(docsMap).map((slug) => ({
    slug: slug === "index" ? [] : [slug],
  }))
}

export default async function DocPage({ params }: DocPageProps) {
  const resolvedParams = await params
  const slug = resolvedParams.slug ? resolvedParams.slug.join("/") : "index"
  const doc = await getDocContent(slug)

  if (!doc) {
    notFound()
  }

  // JSON-LD structured data for documentation
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: doc.title,
    description: `${doc.title} - ZON documentation for the token-efficient data format.`,
    author: {
      '@type': 'Organization',
      name: 'ZON Format',
      url: 'https://zonformat.org',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ZON Format',
      logo: {
        '@type': 'ImageObject',
        url: 'https://zonformat.org/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': slug === "index" ? "https://zonformat.org/docs" : `https://zonformat.org/docs/${slug}`,
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://zonformat.org',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Docs',
          item: 'https://zonformat.org/docs',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: doc.title,
          item: slug === "index" ? "https://zonformat.org/docs" : `https://zonformat.org/docs/${slug}`,
        },
      ],
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="lg:grid lg:grid-cols-[1fr_250px] xl:grid-cols-[1fr_300px] gap-10">
        <div className="min-w-0 max-w-3xl mx-auto w-full">
          <div className="sticky top-[6.5rem] md:top-14 z-20 -ml-4 -mr-4 px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4 border-b border-border/40 mb-8">
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
    </>
  )
}
