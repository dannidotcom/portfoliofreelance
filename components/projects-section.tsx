"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown, ExternalLink, Github } from "lucide-react"
import { projects } from "@/content/projects"
import type { Locale } from "@/content/types"
import { getDictionary } from "@/content/ui"
import { Reveal, SectionHeading } from "@/components/reveal"
import { cn } from "@/lib/utils"
import { isShown } from "@/lib/todo"

export default function ProjectsSection({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const [activeSlug, setActiveSlug] = useState<string | null>(projects[0]?.slug ?? null)

  return (
    <section id="projects" className="section-shell border-t border-white/[0.05]">
      <div className="container">
        <Reveal>
          <SectionHeading
            index="03"
            eyebrow={dict.projects.eyebrow}
            title={dict.projects.title}
            description={dict.projects.description}
          />
        </Reveal>

        <div className="space-y-3">
          {projects.map((project, index) => {
            const open = activeSlug === project.slug
            const panelId = `project-panel-${project.slug}`
            return (
              <Reveal key={project.slug} delay={index * 0.04}>
                <article
                  className={cn(
                    "group panel transition-all duration-300",
                    open ? "panel-glow bg-white/[0.035]" : "hover:bg-white/[0.03] hover:border-white/15",
                  )}
                >
                  <button
                    type="button"
                    className="w-full text-left p-5 md:p-7 focus-ring rounded-2xl"
                    onClick={() => setActiveSlug(open ? null : project.slug)}
                    aria-expanded={open}
                    aria-controls={panelId}
                  >
                    <div className="flex items-start gap-4 md:gap-6">
                      <span className="font-mono text-[11px] text-muted-foreground pt-1.5 shrink-0" aria-hidden>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h3 className="font-display text-lg md:text-xl font-semibold text-champagne group-hover:text-white transition-colors">
                            {project.title[locale]}
                          </h3>
                          {project.featured ? (
                            <span className="rounded-full border border-primary/35 bg-primary/10 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-accent-steel">
                              {dict.projects.featuredBadge}
                            </span>
                          ) : null}
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                          {project.summary[locale]}
                        </p>
                      </div>
                      <div className="hidden sm:flex flex-col items-end gap-1 text-xs text-muted-foreground shrink-0 pt-1">
                        <span>{project.year}</span>
                        <span>{dict.status[project.status]}</span>
                      </div>
                      <ChevronDown
                        aria-hidden
                        className={cn(
                          "h-4 w-4 text-muted-foreground shrink-0 mt-1.5 transition-transform duration-300",
                          open && "rotate-180 text-primary",
                        )}
                      />
                    </div>
                  </button>

                  <div
                    id={panelId}
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-out",
                      open ? "grid-rows-[1fr]" : "grid-rows-[0fr] invisible",
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 md:px-7 pb-7 border-t border-white/[0.06]">
                        <div className="grid lg:grid-cols-[1fr_240px] gap-8 pt-6">
                          <div className="space-y-5">
                            <div className="grid sm:grid-cols-2 gap-5">
                              <div>
                                <h4 className="label-caps !tracking-[0.18em] mb-2">{dict.projects.problem}</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {project.problem[locale]}
                                </p>
                              </div>
                              <div>
                                <h4 className="label-caps !tracking-[0.18em] mb-2">{dict.projects.solution}</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {project.solution[locale]}
                                </p>
                              </div>
                            </div>
                            <div>
                              <h4 className="label-caps !tracking-[0.18em] mb-2">{dict.projects.role}</h4>
                              <p className="text-sm text-foreground/90">{project.role[locale]}</p>
                            </div>
                            {project.results.length ? (
                              <ul className="space-y-2">
                                {project.results.map((r) => (
                                  <li key={r.fr} className="flex gap-2.5 text-sm text-muted-foreground">
                                    <span className="mt-2 h-1 w-1 rounded-full bg-primary shrink-0" aria-hidden />
                                    {r[locale]}
                                  </li>
                                ))}
                              </ul>
                            ) : null}
                            <ul className="flex flex-wrap gap-2">
                              {project.technologies.map((tech) => (
                                <li key={tech} className="chip !text-[11px] !px-2.5 !py-1">
                                  {tech}
                                </li>
                              ))}
                            </ul>
                            <div className="flex flex-wrap gap-4 pt-1">
                              {project.githubUrl && isShown(project.githubUrl) ? (
                                <a
                                  href={project.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-sm text-champagne hover:text-primary transition-colors focus-ring rounded-md"
                                >
                                  <Github className="h-4 w-4" aria-hidden />
                                  GitHub
                                </a>
                              ) : null}
                              {project.demoUrl && isShown(project.demoUrl) ? (
                                <a
                                  href={project.demoUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-sm text-champagne hover:text-primary transition-colors focus-ring rounded-md"
                                >
                                  <ExternalLink className="h-4 w-4" aria-hidden />
                                  {dict.projects.demo}
                                </a>
                              ) : null}
                            </div>
                          </div>

                          {project.images[0] ? (
                            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-secondary/30">
                              <Image
                                src={project.images[0]}
                                alt={project.title[locale]}
                                fill
                                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                                sizes="240px"
                                loading="lazy"
                              />
                            </div>
                          ) : (
                            <div className="hidden lg:flex aspect-[4/3] items-end rounded-xl border border-dashed border-white/10 p-4 bg-white/[0.02]">
                              <p className="font-mono text-[11px] text-muted-foreground leading-relaxed">
                                {project.category[locale]}
                                <br />
                                {project.client[locale]}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
