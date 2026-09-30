import { skillCategories } from "@/content/skills"
import type { Locale } from "@/content/types"
import { getDictionary } from "@/content/ui"
import { Reveal, SectionHeading } from "@/components/reveal"

export default function SkillsSection({ locale, index: sectionIndex = "05" }: { locale: Locale; index?: string }) {
  const dict = getDictionary(locale)

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

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
          {skillCategories.map((category, index) => (
            <Reveal key={category.id} delay={index * 0.05}>
              <div className="panel panel-glow h-full p-6 md:p-7 transition-colors duration-300 hover:bg-white/[0.035]">
                <div className="flex items-baseline justify-between gap-3 mb-5">
                  <h3 className="font-display text-lg font-semibold text-champagne">{category.title}</h3>
                  <span className="font-mono text-[10px] text-muted-foreground" aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <li key={skill} className="chip !text-[11px] !px-2.5 !py-1">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
