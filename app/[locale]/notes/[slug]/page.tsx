import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { getNote, getNotes } from "@/content/notes"
import { profile } from "@/content/profile"
import { getDictionary } from "@/content/ui"
import { alternatesFor, isLocale, localePath } from "@/lib/i18n"
import { notePath, notesPath } from "@/lib/routes"
import { isTodo } from "@/lib/todo"

type Params = Promise<{ locale: string; slug: string }>

export const dynamicParams = false

export function generateStaticParams() {
  return getNotes().map((note) => ({ slug: note.slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params
  const note = getNote(slug)
  if (!note || !isLocale(locale)) return {}
  const meta = note.meta[locale]
  return {
    title: meta.title,
    description: meta.summary,
    alternates: alternatesFor(locale, notePath(slug)),
    robots: meta.draft ? { index: false, follow: false } : undefined,
    openGraph: {
      title: `${meta.title} — ${profile.shortName}`,
      description: meta.summary,
      url: localePath(locale, notePath(slug)),
      type: "article",
    },
  }
}

export default async function NotePage({ params }: { params: Params }) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const note = getNote(slug)
  if (!note) notFound()

  const dict = getDictionary(locale)
  const meta = note.meta[locale]
  const Content = note.Content[locale]

  return (
    <main id="main" className="relative overflow-x-hidden pt-28 pb-24">
      <div className="absolute inset-0 grid-atmosphere pointer-events-none opacity-30" aria-hidden />
      <div className="container relative max-w-3xl">
        <nav aria-label={dict.a11y.breadcrumb} className="mb-10">
          <Link
            href={localePath(locale, notesPath)}
            className="inline-flex items-center gap-2 rounded-md text-sm text-muted-foreground hover:text-champagne transition-colors focus-ring"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {dict.notes.back}
          </Link>
        </nav>

        <article>
          <header className="mb-10 space-y-5 border-b border-white/[0.06] pb-8">
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              {meta.draft ? (
                <span className="rounded-md border border-dashed border-amber-400/60 px-2 py-0.5 font-mono text-amber-300">
                  {dict.notes.draft}
                </span>
              ) : null}
              {!isTodo(meta.date) ? (
                <time dateTime={meta.date}>{dict.notes.published(meta.date)}</time>
              ) : null}
              {meta.tags.map((tag) => (
                <span key={tag} className="chip !text-[10px] !px-2 !py-0.5">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-champagne text-balance leading-[1.05]">
              {meta.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">{meta.summary}</p>
          </header>
          <Content />
        </article>
      </div>
    </main>
  )
}
