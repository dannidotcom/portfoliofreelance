import type { Adr } from "@/content/architecture"
import type { Locale } from "@/content/types"
import { getDictionary } from "@/content/ui"
import { SHOW_TODOS, shown } from "@/lib/todo"

export default function AdrList({ adrs, locale, level = 4 }: { adrs: Adr[]; locale: Locale; level?: 3 | 4 }) {
  const dict = getDictionary(locale)
  const visible = shown(adrs, (adr) => adr.validated)
  if (!visible.length) return null
  const Heading = `h${level}` as const
  const ItemHeading = `h${level + 1}` as "h4" | "h5"

  return (
    <div>
      <Heading className="label-caps mb-4">{dict.architecture.decisions}</Heading>
      <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((adr) => (
          <li key={adr.id} className="panel h-full p-5 md:p-6">
            <article aria-labelledby={`adr-${adr.id}`} className="space-y-4">
              <header className="space-y-2">
                <p className="flex items-center gap-2 font-mono text-[11px] text-accent-steel">
                  ADR-{adr.id}
                  {SHOW_TODOS && adr.validated !== true ? (
                    <span className="rounded-full border border-dashed border-amber-400/60 px-2 text-amber-300">
                      TODO · {dict.architecture.toValidate}
                    </span>
                  ) : null}
                </p>
                <ItemHeading id={`adr-${adr.id}`} className="font-display text-base font-semibold text-champagne leading-snug">
                  {adr.title[locale]}
                </ItemHeading>
              </header>
              <dl className="space-y-3 text-sm leading-relaxed">
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    {dict.architecture.context}
                  </dt>
                  <dd className="mt-1 text-foreground/85">{adr.context[locale]}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    {dict.architecture.decision}
                  </dt>
                  <dd className="mt-1 text-foreground/85">{adr.decision[locale]}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    {dict.architecture.tradeoffs}
                  </dt>
                  <dd className="mt-1 text-muted-foreground">{adr.tradeoffs[locale]}</dd>
                </div>
              </dl>
            </article>
          </li>
        ))}
      </ul>
    </div>
  )
}
