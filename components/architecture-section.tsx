import { diagrams } from "@/content/architecture"
import type { Locale } from "@/content/types"
import { getDictionary } from "@/content/ui"
import { Reveal, SectionHeading } from "@/components/reveal"
import ArchitectureDiagram from "@/components/architecture/architecture-diagram"
import AdrList from "@/components/architecture/adr-list"

export default function ArchitectureSection({ locale, index }: { locale: Locale; index: string }) {
  const dict = getDictionary(locale)

  return (
    <section id="architecture" className="section-shell border-t border-white/[0.05] relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 15% 30%, hsl(210 45% 25% / 0.14), transparent 60%)",
        }}
        aria-hidden
      />
      <div className="container relative">
        <Reveal>
          <SectionHeading
            index={index}
            eyebrow={dict.architecture.eyebrow}
            title={dict.architecture.title}
            description={dict.architecture.description}
          />
        </Reveal>

        <div className="space-y-20">
          {diagrams.map((diagram, i) => (
            <Reveal key={diagram.id} delay={0.05}>
              <div className="space-y-8">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px] text-accent-steel" aria-hidden>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <h3 className="font-display text-xl md:text-2xl font-semibold text-champagne">
                    {diagram.title[locale]}
                  </h3>
                </div>
                <div className="panel panel-glow p-4 sm:p-6 md:p-8">
                  <ArchitectureDiagram diagram={diagram} locale={locale} hint={dict.architecture.hint} />
                </div>
                <AdrList adrs={diagram.adrs} locale={locale} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
