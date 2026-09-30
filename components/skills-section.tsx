import { experiences } from "@/content/experience"
import { getProject } from "@/content/projects"
import { skillDomains, skillRefs, type Skill, type SkillLevel } from "@/content/skills"
import { TODO, type Locale } from "@/content/types"
import { getDictionary } from "@/content/ui"
import { Reveal, SectionHeading } from "@/components/reveal"
import SkillBadge, { LevelBars, type SkillEvidence } from "@/components/skills/skill-badge"
import { localePath } from "@/lib/i18n"
import { caseStudyPath } from "@/lib/routes"
import { isTodo, SHOW_TODOS } from "@/lib/todo"

const LEVELS: SkillLevel[] = ["production", "solid", "growing"]

function levelOf(skill: Skill): SkillLevel | null {
  return skill.level === TODO ? null : skill.level
}

function evidenceFor(skill: Skill, locale: Locale): SkillEvidence[] {
  const dict = getDictionary(locale)
  return skillRefs(skill).flatMap((ref): SkillEvidence[] => {
    if (ref.type === "experience") {
      const experience = experiences.find((e) => e.id === ref.id)
      if (!experience) return []
      return [
        {
          kind: "experience",
          title: experience.company,
          detail: experience.position[locale],
          href: `#exp-${experience.id}`,
        },
      ]
    }
    const project = getProject(ref.slug)
    if (!project) return []
    return [
      {
        kind: "project",
        title: project.title[locale],
        detail: project.caseStudy ? dict.projects.caseStudy : dict.skills.project,
        href: project.caseStudy ? localePath(locale, caseStudyPath(project.slug)) : `#project-${project.slug}`,
      },
    ]
  })
}

export default function SkillsSection({ locale, index: sectionIndex = "05" }: { locale: Locale; index?: string }) {
  const dict = getDictionary(locale)
  const anyLevelShown = skillDomains.some((domain) => domain.skills.some((skill) => levelOf(skill) !== null))

  return (
    <section id="skills" className="section-shell border-t border-white/[0.05] relative">
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 10% 60%, hsl(168 35% 18% / 0.12), transparent 55%)",
        }}
        aria-hidden
      />
      <div className="container relative">
        <Reveal>
          <SectionHeading
            index={sectionIndex}
            eyebrow={dict.skills.eyebrow}
            title={dict.skills.title}
            description={dict.skills.description}
          />
        </Reveal>

        <Reveal>
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-muted-foreground">{dict.skills.hint}</p>
            {anyLevelShown ? (
              <dl aria-label={dict.skills.levelsLegend} className="flex flex-wrap gap-x-5 gap-y-2 text-xs">
                {LEVELS.map((level) => (
                  <div key={level} className="flex items-center gap-2">
                    <dt className="flex items-center gap-2 font-medium text-foreground/90">
                      <LevelBars level={level} />
                      {dict.skills.levels[level].label}
                    </dt>
                    <dd className="text-muted-foreground">{dict.skills.levels[level].detail}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
          {skillDomains.map((domain, index) => (
            <Reveal key={domain.id} delay={index * 0.05}>
              <div
                id={`skills-${domain.id}`}
                className="panel panel-glow h-full p-6 md:p-7 transition-colors duration-300 hover:bg-white/[0.035]"
              >
                <div className="flex items-baseline justify-between gap-3 mb-2">
                  <h3 className="font-display text-lg font-semibold text-champagne">{domain.title[locale]}</h3>
                  <span className="font-mono text-[10px] text-muted-foreground" aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{domain.description[locale]}</p>
                <ul className="flex flex-wrap gap-2">
                  {domain.skills.map((skill) => {
                    const level = levelOf(skill)
                    return (
                      <li key={skill.id}>
                        <SkillBadge
                          id={skill.id}
                          label={skill.label}
                          level={level}
                          levelText={level ? dict.skills.levels[level] : null}
                          levelTodo={SHOW_TODOS && isTodo(skill.level)}
                          evidence={evidenceFor(skill, locale)}
                          labels={{
                            usedIn: dict.skills.usedIn,
                            level: dict.skills.level,
                            experience: dict.skills.experience,
                            project: dict.skills.project,
                            trigger: dict.skills.showEvidence(skill.label),
                            noEvidence: SHOW_TODOS ? dict.skills.noEvidence : null,
                          }}
                        />
                      </li>
                    )
                  })}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
