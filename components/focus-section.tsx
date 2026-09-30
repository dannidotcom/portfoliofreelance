import { profile } from "@/content/profile"
import type { Locale } from "@/content/types"
import { getDictionary } from "@/content/ui"
import { Reveal, SectionHeading } from "@/components/reveal"

export default function FocusSection({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)

  return (
    <section id="focus" className="section-shell border-t border-white/[0.05]">
      <div className="container">
        <Reveal>
          <SectionHeading
            index="01"
            eyebrow={dict.focus.eyebrow}
            title={dict.focus.title}
            description={dict.focus.description}
          />
        </Reveal>

        <Reveal delay={0.08}>
          <ul className="flex flex-wrap gap-2.5 md:gap-3">
            {profile.focusAreas.map((area) => (
              <li key={area} className="chip">
                {area}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
