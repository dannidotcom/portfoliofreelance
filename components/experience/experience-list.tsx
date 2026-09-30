"use client"

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"
import { experiences } from "@/content/experience"
import type { Locale } from "@/content/types"
import { getDictionary } from "@/content/ui"
import { Reveal } from "@/components/reveal"
import TodoMark from "@/components/todo-mark"
import { cn } from "@/lib/utils"
import { formatMonth } from "@/lib/i18n"
import { isTodo, shown } from "@/lib/todo"

type Props = {
  locale: Locale
  /** Skill id per technology (same order as `experience.technologies`), null when no matching skill. */
  techSkills: Record<string, (string | null)[]>
}

export default function ExperienceList({ locale, techSkills }: Props) {
  const dict = getDictionary(locale)
  const [expanded, setExpanded] = useState<string | null>(experiences[0]?.id ?? null)

  useEffect(() => {
    const syncWithHash = () => {
      const match = window.location.hash.match(/^#exp-(.+)$/)
      if (match && experiences.some((exp) => exp.id === match[1])) setExpanded(match[1])
    }
    syncWithHash()
    window.addEventListener("hashchange", syncWithHash)
    return () => window.removeEventListener("hashchange", syncWithHash)
  }, [])

  return (
    <div className="relative max-w-4xl">
      <div
        className="absolute left-[11px] top-3 bottom-3 w-px hidden sm:block bg-gradient-to-b from-primary/50 via-white/10 to-transparent"
        aria-hidden
      />

      <ol className="space-y-4">
        {experiences.map((exp, index) => {
          const open = expanded === exp.id
          const current = exp.end === null
          const panelId = `exp-panel-${exp.id}`
          const period = `${formatMonth(exp.start, locale)} — ${
            exp.end ? formatMonth(exp.end, locale) : dict.experience.present
          }`
          const impact = shown(exp.impact)
          const skills = techSkills[exp.id] ?? []
          return (
            <li key={exp.id} id={`exp-${exp.id}`} className="sm:pl-10 relative scroll-mt-24">
              <Reveal delay={index * 0.04}>
                <span
                  className={cn(
                    "hidden sm:block absolute left-1.5 top-7 h-3 w-3 rounded-full border-2 border-background",
                    current ? "bg-primary shadow-[0_0_16px_hsl(168_55%_42%/0.55)]" : "bg-muted-foreground/40",
                  )}
                  aria-hidden
                />
                <article
                  className={cn(
                    "panel transition-all duration-300",
                    open ? "panel-glow bg-white/[0.035]" : "hover:bg-white/[0.03]",
                  )}
                >
                  <button
                    type="button"
                    className="w-full text-left p-5 md:p-6 focus-ring rounded-2xl"
                    onClick={() => setExpanded(open ? null : exp.id)}
                    aria-expanded={open}
                    aria-controls={panelId}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h3 className="font-display text-lg font-semibold text-champagne">
                            {exp.position[locale]}
                          </h3>
                          {current ? (
                            <span className="rounded-full bg-primary/15 text-accent-steel px-2.5 py-0.5 text-[10px] uppercase tracking-wider">
                              {dict.experience.current}
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-1.5 text-sm text-muted-foreground">
                          {exp.company} · {exp.location[locale]}
                        </p>
                        <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                          {exp.description[locale]}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-3 shrink-0">
                        <p className="text-[11px] md:text-xs text-muted-foreground text-right max-w-[9rem]">
                          {period}
                        </p>
                        <ChevronDown
                          aria-hidden
                          className={cn(
                            "h-4 w-4 text-muted-foreground transition-transform duration-300",
                            open && "rotate-180 text-primary",
                          )}
                        />
                      </div>
                    </div>
                  </button>

                  <div
                    id={panelId}
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300",
                      open ? "grid-rows-[1fr]" : "grid-rows-[0fr] invisible",
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 md:px-6 pb-6 space-y-5 border-t border-white/[0.06] pt-5">
                        {impact.length > 0 ? (
                          <div className="rounded-xl border border-primary/20 bg-primary/[0.06] p-4">
                            <h4 className="label-caps !tracking-[0.18em] mb-3 !text-accent-steel">
                              {dict.experience.impact}
                            </h4>
                            <ul className="space-y-2">
                              {impact.map((item, i) => (
                                <li key={i} className="flex gap-2.5 text-sm text-foreground/90">
                                  <span className="mt-2 h-1 w-1 rounded-full bg-primary shrink-0" aria-hidden />
                                  {isTodo(item) ? <TodoMark label={`impact ${i + 1}`} /> : item[locale]}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : null}

                        <div>
                          <h4 className="label-caps !tracking-[0.18em] mb-3">{dict.experience.responsibilities}</h4>
                          <ul className="space-y-2.5">
                            {exp.responsibilities.map((item) => (
                              <li key={item.fr} className="flex gap-2.5 text-sm text-muted-foreground">
                                <span className="mt-2 h-1 w-1 rounded-full bg-primary shrink-0" aria-hidden />
                                {item[locale]}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="sr-only">{dict.experience.technologies}</h4>
                          <ul className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech, i) => {
                              const skillId = skills[i]
                              return (
                                <li key={tech}>
                                  {skillId ? (
                                    <a
                                      href={`#skill-${skillId}`}
                                      aria-label={dict.experience.viewSkill(tech)}
                                      onClick={() => {
                                        if (window.location.hash !== `#skill-${skillId}`) return
                                        document.getElementById(`skill-${skillId}`)?.scrollIntoView({ block: "center" })
                                        window.dispatchEvent(new HashChangeEvent("hashchange"))
                                      }}
                                      className="chip !text-[11px] !px-2.5 !py-1 focus-ring"
                                    >
                                      {tech}
                                    </a>
                                  ) : (
                                    <span className="chip !text-[11px] !px-2.5 !py-1 !text-muted-foreground">
                                      {tech}
                                    </span>
                                  )}
                                </li>
                              )
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
