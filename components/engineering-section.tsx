import { engineeringSteps } from "@/content/skills"
import type { Locale } from "@/content/types"
import { getDictionary } from "@/content/ui"
import { Reveal, SectionHeading } from "@/components/reveal"

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
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
            {engineeringSteps.map((step, i) => (
              <li key={step.label.en} className="relative group">
                <div className="panel h-full p-4 lg:p-3.5 transition-colors duration-300 group-hover:bg-white/[0.04]">
                  <span className="font-mono text-[10px] text-accent-steel" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2.5 font-display text-sm font-semibold text-champagne">{step.label[locale]}</h3>
                  <p className="mt-1.5 text-[11px] text-muted-foreground leading-snug">{step.detail[locale]}</p>
                </div>
                {i < engineeringSteps.length - 1 ? (
                  <span
                    className="hidden lg:block absolute -right-1.5 top-1/2 -translate-y-1/2 z-10 text-primary/40 text-xs"
                    aria-hidden
                  >
                    →
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}
