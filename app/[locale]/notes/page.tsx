import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { getNotes, publishedNotes } from "@/content/notes"
import { getDictionary } from "@/content/ui"
import { alternatesFor, isLocale, localePath } from "@/lib/i18n"
import { notePath, notesPath } from "@/lib/routes"
import { isTodo } from "@/lib/todo"

type Params = Promise<{ locale: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)
  return {
    title: dict.notes.title,
    description: dict.notes.description,
    alternates: alternatesFor(locale, notesPath),
    robots: publishedNotes().length ? undefined : { index: false, follow: true },
  }
}

export default async function NotesPage({ params }: { params: Params }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)
  const notes = getNotes()
  const home = localePath(locale)

  return (
    <main id="main" className="relative overflow-x-hidden pt-28 pb-24">
      <div className="absolute inset-0 grid-atmosphere pointer-events-none opacity-30" aria-hidden />
      <div className="container relative max-w-4xl">
        <nav aria-label={dict.a11y.breadcrumb} className="mb-10">
          <Link
            href={home}
            className="inline-flex items-center gap-2 rounded-md text-sm text-muted-foreground hover:text-champagne transition-colors focus-ring"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {dict.notFound.back}
          </Link>
        </nav>

        <header className="mb-12 space-y-4">
          <p className="label-caps">{dict.notes.eyebrow}</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-champagne">
            {dict.notes.title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">{dict.notes.description}</p>
        </header>

        {notes.length === 0 ? (
          <p className="panel p-6 text-muted-foreground">{dict.notes.empty}</p>
        ) : (
          <ul className="space-y-4">
            {notes.map((note) => {
              const meta = note.meta[locale]
              return (
                <li key={note.slug}>
                  <Link
                    href={localePath(locale, notePath(note.slug))}
                    className="panel group block p-6 transition-colors hover:bg-white/[0.035] focus-ring"
                  >
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      {meta.draft ? (
                        <span className="rounded-md border border-dashed border-amber-400/60 px-2 py-0.5 font-mono text-amber-300">
                          {dict.notes.draft}
                        </span>
                      ) : null}
                      {!isTodo(meta.date) ? <time dateTime={meta.date}>{meta.date}</time> : null}
                      {meta.tags.map((tag) => (
                        <span key={tag} className="chip !text-[10px] !px-2 !py-0.5">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="mt-3 font-display text-xl font-semibold text-champagne">{meta.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{meta.summary}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary">
                      {dict.notes.readNote}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </main>
  )
}
