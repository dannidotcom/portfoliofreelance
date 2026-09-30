import { engineeringSteps } from "@/content/skills"
import type { Locale } from "@/content/types"
import { getDictionary } from "@/content/ui"
import { Reveal, SectionHeading } from "@/components/reveal"
import EngineeringFlow from "@/components/engineering/engineering-flow"

export default function EngineeringSection({ locale, index = "06" }: { locale: Locale; index?: string }) {
  const dict = getDictionary(locale)

  return (
    <section id="engineering" className="section-shell border-t border-white/[0.05] relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 70% 80%, hsl(210 40% 25% / 0.12), transparent 55%)",
        }}
        aria-hidden
      />
      <div className="container relative">
        <Reveal>
          <SectionHeading
            index={index}
            eyebrow={dict.engineering.eyebrow}
            title={dict.engineering.title}
            description={dict.engineering.description}
          />
        </Reveal>

        <Reveal delay={0.08}>
          <EngineeringFlow
            locale={locale}
            steps={engineeringSteps.map((step) => ({ label: step.label[locale], detail: step.detail[locale] }))}
          />
        </Reveal>
      </div>
    </section>
  )
}
