"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, ExternalLink, Github, Network, X } from "lucide-react"
import { architectureTabAnchor } from "@/content/architecture"
import { projects, type ProjectStatus } from "@/content/projects"
import type { Locale } from "@/content/types"
import { getDictionary } from "@/content/ui"
import { Reveal, SectionHeading } from "@/components/reveal"
import { cn } from "@/lib/utils"
import { localePath } from "@/lib/i18n"
import { caseStudyPath } from "@/lib/routes"
import { isShown, shown } from "@/lib/todo"

const STATUS_STYLE: Record<ProjectStatus, string> = {
  "in-progress": "border-primary/40 bg-primary/10 text-accent-steel",
  completed: "border-white/15 bg-white/[0.04] text-foreground/85",
  prototype: "border-amber-400/30 bg-amber-400/10 text-amber-200",
}

export default function ProjectsSection({ locale, index: sectionIndex = "04" }: { locale: Locale; index?: string }) {
  const dict = getDictionary(locale)
  const [tag, setTag] = useState<string | null>(null)

  const filtered = useMemo(
    () => (tag ? projects.filter((project) => project.technologies.includes(tag)) : projects),
    [tag],
  )

  const toggleTag = (value: string) => setTag((current) => (current === value ? null : value))

  return (
    <section id="projects" className="section-shell border-t border-white/[0.05]">
      <div className="container">
        <Reveal>
          <SectionHeading
            index={sectionIndex}
            eyebrow={dict.projects.eyebrow}
            title={dict.projects.title}
            description={dict.projects.description}
          />
        </Reveal>

        <div className="mb-6 flex min-h-9 flex-wrap items-center gap-3">
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {dict.projects.count(filtered.length)}
            {tag ? (
              <>
                {" · "}
                <span className="text-champagne">{tag}</span>
              </>
            ) : null}
          </p>
          {tag ? (
            <button
              type="button"
              onClick={() => setTag(null)}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs text-muted-foreground hover:text-champagne hover:border-white/20 transition-colors focus-ring"
            >
              <X className="h-3.5 w-3.5" aria-hidden />
              {dict.projects.all}
            </button>
          ) : null}
        </div>

        {filtered.length ? (
          <ul className="grid gap-5 md:grid-cols-2">
            {filtered.map((project, i) => {
              const github = project.githubUrl && isShown(project.githubUrl) ? project.githubUrl : null
              const demo = project.demoUrl && isShown(project.demoUrl) ? project.demoUrl : null
              const caseHref = project.caseStudy ? localePath(locale, caseStudyPath(project.slug)) : null
              const facts = shown(project.facts ?? [], (fact) => fact.value)
              return (
                <li key={project.slug} id={`project-${project.slug}`} className="scroll-mt-24">
                  <Reveal delay={i * 0.04} className="h-full">
                    <article
                      className={cn(
                        "panel group flex h-full flex-col p-6 md:p-7 transition-colors duration-300 hover:bg-white/[0.035] hover:border-white/15",
                        project.featured && "panel-glow",
                      )}
                    >
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        {isShown(project.year) ? (
                          <span className="font-mono text-muted-foreground">{project.year}</span>
                        ) : null}
                        {isShown(project.status) ? (
                          <span className={cn("rounded-full border px-2.5 py-0.5", STATUS_STYLE[project.status])}>
                            {dict.status[project.status]}
                          </span>
                        ) : null}
                        {project.featured ? (
                          <span className="rounded-full border border-primary/35 bg-primary/10 px-2.5 py-0.5 uppercase tracking-wider text-[10px] text-accent-steel">
                            {dict.projects.featuredBadge}
                          </span>
                        ) : null}
                        <span className="ml-auto text-muted-foreground">{project.category[locale]}</span>
                      </div>

                      <h3 className="mt-4 font-display text-xl font-semibold text-champagne">
                        {caseHref ? (
                          <Link href={caseHref} className="rounded-md hover:text-white transition-colors focus-ring">
                            {project.title[locale]}
                          </Link>
                        ) : (
                          project.title[locale]
                        )}
                      </h3>
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{project.description[locale]}</p>
                      {project.context && isShown(project.context) ? (
                        <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                          <span className="text-foreground/80">{dict.projects.context} · </span>
                          {project.context[locale]}
                        </p>
                      ) : null}
                      {isShown(project.role) ? (
                        <p className="mt-3 text-xs text-muted-foreground">
                          <span className="text-foreground/80">{dict.projects.role} · </span>
                          {project.role[locale]}
                        </p>
                      ) : null}
                      {facts.length ? (
                        <dl aria-label={dict.projects.facts} className="mt-4 grid grid-cols-2 gap-3 text-xs">
                          {facts.map((fact) => (
                            <div key={fact.label.en} className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2">
                              <dt className="text-muted-foreground">{fact.label[locale]}</dt>
                              <dd className="mt-0.5 font-medium text-champagne">{fact.value}</dd>
                            </div>
                          ))}
                        </dl>
                      ) : null}

                      <ul aria-label={dict.projects.filterLabel} className="mt-5 flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <li key={tech}>
                            <button
                              type="button"
                              onClick={() => toggleTag(tech)}
                              aria-pressed={tag === tech}
                              className={cn(
                                "chip !text-[11px] !px-2.5 !py-1 focus-ring",
                                tag === tech && "!border-primary/50 !bg-primary/15 !text-champagne",
                              )}
                            >
                              {tech}
                            </button>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto flex flex-wrap items-center gap-4 pt-6">
                        {caseHref ? (
                          <Link
                            href={caseHref}
                            className="inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-accent-steel hover:text-champagne transition-colors focus-ring"
                          >
                            {dict.projects.caseStudy}
                            <ArrowUpRight className="h-4 w-4" aria-hidden />
                          </Link>
                        ) : null}
                        {project.architecture ? (
                          <a
                            href={`#${architectureTabAnchor(project.architecture)}`}
                            className="inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-accent-steel hover:text-champagne transition-colors focus-ring"
                          >
                            <Network className="h-4 w-4" aria-hidden />
                            {dict.projects.architecture}
                          </a>
                        ) : null}
                        {github ? (
                          <a
                            href={github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-md text-sm text-champagne hover:text-primary transition-colors focus-ring"
                          >
                            <Github className="h-4 w-4" aria-hidden />
                            GitHub
                          </a>
                        ) : null}
                        {demo ? (
                          <a
                            href={demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-md text-sm text-champagne hover:text-primary transition-colors focus-ring"
                          >
                            <ExternalLink className="h-4 w-4" aria-hidden />
                            {dict.projects.demo}
                          </a>
                        ) : null}
                      </div>
                    </article>
                  </Reveal>
                </li>
              )
            })}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">{dict.projects.empty}</p>
        )}
      </div>
    </section>
  )
}
