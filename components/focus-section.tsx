import { profile } from "@/data/profile"
import { Reveal, SectionHeading } from "@/components/reveal"

export default function FocusSection() {
  return (
    <section id="focus" className="section-shell border-t border-white/[0.05]">
      <div className="container">
        <Reveal>
          <SectionHeading
            index="01"
            eyebrow="Positionnement"
            title="Domaines d'expertise"
            description="Un profil orienté ingénierie IA et backend, centré sur la conception de systèmes fiables plutôt que sur des démonstrations isolées."
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
