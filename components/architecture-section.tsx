import { ARCHITECTURE_TAB_PREFIX, aiArchitectureTabs, dataPipelineDiagram, type Diagram } from "@/content/architecture"
import type { Locale } from "@/content/types"
import { getDictionary } from "@/content/ui"
import { Reveal, SectionHeading } from "@/components/reveal"
import ArchitectureDiagram from "@/components/architecture/architecture-diagram"
import ArchitectureTabs from "@/components/architecture/architecture-tabs"
import AdrList from "@/components/architecture/adr-list"
import DeploymentComparison from "@/components/architecture/deployment-comparison"

function BlockTitle({ letter, children }: { letter: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="font-mono text-[11px] text-accent-steel" aria-hidden>
        {letter}
      </span>
      <h3 className="font-display text-xl md:text-2xl font-semibold text-champagne">{children}</h3>
    </div>
  )
}

function DiagramBlock({ diagram, locale, hint }: { diagram: Diagram; locale: Locale; hint: string }) {
  return (
    <div className="space-y-8">
      <div className="panel panel-glow p-4 sm:p-6 md:p-8">
        <ArchitectureDiagram diagram={diagram} locale={locale} hint={hint} />
      </div>
      <AdrList adrs={diagram.adrs} locale={locale} />
    </div>
  )
}

export default function ArchitectureSection({ locale, index }: { locale: Locale; index: string }) {
  const dict = getDictionary(locale)
  const hint = dict.architecture.hint

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
          <Reveal delay={0.05}>
            <div className="space-y-8">
              <BlockTitle letter="A">{dict.architecture.aiTitle}</BlockTitle>
              <ArchitectureTabs
                idPrefix={ARCHITECTURE_TAB_PREFIX}
                label={dict.architecture.tabsLabel}
                tabs={aiArchitectureTabs.map((tab) => ({
                  id: tab.id,
                  label: tab.label[locale],
                  panel: <DiagramBlock diagram={tab.diagram} locale={locale} hint={hint} />,
                }))}
              />
              <DeploymentComparison locale={locale} />
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="space-y-8">
              <BlockTitle letter="B">{dataPipelineDiagram.title[locale]}</BlockTitle>
              <DiagramBlock diagram={dataPipelineDiagram} locale={locale} hint={hint} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
