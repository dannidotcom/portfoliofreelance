import { experiences } from "@/content/experience"
import { skillIdsForTech } from "@/content/skills"
import type { Locale } from "@/content/types"
import { getDictionary } from "@/content/ui"
import { Reveal, SectionHeading } from "@/components/reveal"
import ExperienceList from "@/components/experience/experience-list"
import ExperienceTimeline from "@/components/experience/experience-timeline"

export default function ExperienceSection({ locale, index: sectionIndex = "06" }: { locale: Locale; index?: string }) {
  const dict = getDictionary(locale)
  const techSkills = Object.fromEntries(
    experiences.map((exp) => [exp.id, exp.technologies.map((tech) => skillIdsForTech(tech)[0] ?? null)]),
  )

  return (
    <section id="experience" className="section-shell border-t border-white/[0.05]">
      <div className="container">
        <Reveal>
          <SectionHeading
            index={sectionIndex}
            eyebrow={dict.experience.eyebrow}
            title={dict.experience.title}
            description={dict.experience.description}
          />
        </Reveal>

        <Reveal>
          <ExperienceTimeline locale={locale} />
        </Reveal>

        <ExperienceList locale={locale} techSkills={techSkills} />
      </div>
    </section>
  )
}
