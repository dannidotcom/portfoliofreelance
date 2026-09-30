import type { Metadata } from "next"
import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react"
import { caseStudyProjects } from "@/content/projects"
import { profile, siteUrl } from "@/content/profile"
import { getDictionary } from "@/content/ui"
import ArchitectureDiagram from "@/components/architecture/architecture-diagram"
import AdrList from "@/components/architecture/adr-list"
import TodoMark from "@/components/todo-mark"
import { alternatesFor, isLocale, localePath } from "@/lib/i18n"
import { caseStudyPath } from "@/lib/routes"
import { SHOW_TODOS, isShown, isTodo, shown } from "@/lib/todo"

type Params = Promise<{ locale: string; slug: string }>

export function generateStaticParams() {
  return caseStudyProjects.map((project) => ({ slug: project.slug }))
}

function findProject(slug: string) {
  return caseStudyProjects.find((project) => project.slug === slug)
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params
  const project = findProject(slug)
  if (!project || !isLocale(locale)) return {}
  const title = project.title[locale]
  return {
    title,
    description: project.description[locale],
    alternates: alternatesFor(locale, caseStudyPath(slug)),
    openGraph: {
      title: `${title} — ${profile.shortName}`,
      description: project.description[locale],
      url: localePath(locale, caseStudyPath(slug)),
      type: "article",
    },
  }
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28 border-t border-white/[0.06] pt-10">
      <h2 id={`${id}-title`} className="font-display text-2xl font-semibold text-champagne mb-6">
        {title}
      </h2>
      {children}
    </section>
  )
}

export default async function CaseStudyPage({ params }: { params: Params }) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const project = findProject(slug)
  if (!project) notFound()

  const dict = getDictionary(locale)
  const cs = project.caseStudy
  const d = dict.caseStudy
  const home = localePath(locale)

  const metrics = shown(cs.metrics, (metric) => metric.value)
  const nextSteps = shown(cs.nextSteps)
  const decisions = shown(cs.decisions, (adr) => adr.validated)
  const github = project.githubUrl && isShown(project.githubUrl) ? project.githubUrl : null
  const demo = project.demoUrl && isShown(project.demoUrl) ? project.demoUrl : null

  const index = caseStudyProjects.findIndex((p) => p.slug === slug)
  const previous = caseStudyProjects[(index - 1 + caseStudyProjects.length) % caseStudyProjects.length]
  const next = caseStudyProjects[(index + 1) % caseStudyProjects.length]

  const sections: { id: string; title: string; content: ReactNode }[] = [
    {
      id: "context",
      title: d.context,
      content: (
        <div className="space-y-8">
          <p className="text-base md:text-lg text-foreground/85 leading-relaxed max-w-3xl">{cs.context[locale]}</p>
          {project.images.length ? (
            <div>
              <h3 className="label-caps mb-4">{d.gallery}</h3>
              <ul className="grid gap-4 sm:grid-cols-2">
                {project.images.map((src, i) => (
                  <li
                    key={src}
                    className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-secondary/30"
                  >
                    <Image
                      src={src}
                      alt={d.screenshot(project.title[locale], i + 1)}
                      fill
                      sizes="(min-width: 1024px) 400px, 100vw"
                      className="object-cover object-top"
                      loading="lazy"
                    />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ),
    },
    {
      id: "constraints",
      title: d.constraints,
      content: (
        <ul className="grid gap-3 sm:grid-cols-2">
          {cs.constraints.map((constraint) => (
            <li key={constraint.fr} className="panel p-4 text-sm text-foreground/85 leading-relaxed">
              {constraint[locale]}
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "architecture",
      title: d.architecture,
      content: (
        <div className="panel panel-glow p-4 sm:p-6 md:p-8">
          <ArchitectureDiagram diagram={cs.diagram} locale={locale} hint={dict.architecture.hint} />
        </div>
      ),
    },
    {
      id: "data-model",
      title: d.dataModel,
      content: isTodo(cs.dataModel) ? (
        SHOW_TODOS ? (
          <TodoMark label={d.dataModel} />
        ) : null
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(cs.dataModel as Exclude<typeof cs.dataModel, string>).map((entity) => (
            <li key={entity.name} className="panel p-4">
              <p className="font-mono text-sm text-accent-steel">{entity.name}</p>
              <ul className="mt-2 space-y-1 font-mono text-xs text-muted-foreground">
                {entity.fields.map((field) => (
                  <li key={field}>{field}</li>
                ))}
              </ul>
              {entity.note ? <p className="mt-3 text-xs text-muted-foreground">{entity.note[locale]}</p> : null}
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "decisions",
      title: d.decisions,
      content: decisions.length ? <AdrList adrs={decisions} locale={locale} level={3} /> : null,
    },
    {
      id: "results",
      title: d.results,
      content: (
        <div className="space-y-6">
          {metrics.length ? (
            <dl className="grid gap-4 sm:grid-cols-3">
              {metrics.map((metric) => (
                <div key={metric.label.en} className="panel flex flex-col-reverse p-5">
                  <dt className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {metric.label[locale]}
                  </dt>
                  <dd className="font-display text-3xl font-semibold text-champagne">{metric.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
          <ul className="space-y-2.5">
            {project.results.map((result) => (
              <li key={result.fr} className="flex gap-3 text-sm text-foreground/85">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                {result[locale]}
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: "stack",
      title: d.stack,
      content: (
        <ul className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <li key={tech} className="chip">
              {tech}
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "next-steps",
      title: d.nextSteps,
      content: nextSteps.length ? (
        <ul className="space-y-2.5">
          {nextSteps.map((step, i) => (
            <li key={`${step.fr}-${i}`} className="flex gap-3 text-sm text-foreground/85">
              <span className="font-mono text-xs text-accent-steel pt-0.5" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              {isTodo(step) ? <TodoMark label={d.nextSteps} /> : step[locale]}
            </li>
          ))}
        </ul>
      ) : null,
    },
    {
      id: "links",
      title: d.links,
      content: (
        <div className="flex flex-wrap gap-3">
          {github ? (
            <a href={github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <Github className="h-4 w-4" aria-hidden />
              {d.github}
            </a>
          ) : null}
          {demo ? (
            <a href={demo} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <ExternalLink className="h-4 w-4" aria-hidden />
              {d.demo}
            </a>
          ) : null}
          {!github && !demo ? <p className="text-sm text-muted-foreground">{d.noPublicLinks}</p> : null}
        </div>
      ),
    },
  ].filter((section) => section.content !== null)

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: profile.shortName, item: `${siteUrl}${home}` },
      { "@type": "ListItem", position: 2, name: dict.nav.projects, item: `${siteUrl}${home}#projects` },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title[locale],
        item: `${siteUrl}${localePath(locale, caseStudyPath(slug))}`,
      },
    ],
  }

  return (
    <main id="main" tabIndex={-1} className="outline-none relative overflow-x-hidden pt-28 pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <div className="absolute inset-0 grid-atmosphere pointer-events-none opacity-30" aria-hidden />

      <div className="container relative">
        <nav aria-label={dict.a11y.breadcrumb} className="mb-10">
          <Link
            href={`${home}#projects`}
            className="inline-flex items-center gap-2 rounded-md text-sm text-muted-foreground hover:text-champagne transition-colors focus-ring"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {d.back}
          </Link>
        </nav>

        <header className="max-w-3xl space-y-6 mb-14">
          <p className="flex flex-wrap items-center gap-3 label-caps">
            {project.category[locale]}
            {isShown(project.year) ? (
              <>
                <span className="text-muted-foreground" aria-hidden>
                  ·
                </span>
                <span className="text-muted-foreground tracking-[0.2em]">{project.year}</span>
              </>
            ) : null}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-champagne text-balance leading-[1.05]">
            {project.title[locale]}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">{project.description[locale]}</p>
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-5 pt-2 text-sm">
            {[
              [d.role, project.role[locale]],
              [d.team, project.team[locale]],
              [d.duration, project.duration[locale]],
              [d.status, isShown(project.status) ? dict.status[project.status] : ""],
            ]
              .filter(([, value]) => value)
              .map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">{label}</dt>
                  <dd className="mt-1.5 text-champagne leading-snug">{value}</dd>
                </div>
              ))}
          </dl>
          {project.disclaimer ? (
            <p className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 text-xs leading-relaxed text-muted-foreground">
              {project.disclaimer[locale]}
            </p>
          ) : null}
        </header>

        <div className="grid gap-12 lg:grid-cols-[200px_1fr]">
          <aside className="hidden lg:block">
            <nav aria-label={d.toc} className="sticky top-28">
              <p className="label-caps mb-4">{d.toc}</p>
              <ol className="space-y-2 border-l border-white/[0.08]">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="-ml-px block border-l border-transparent pl-4 text-sm text-muted-foreground hover:border-primary hover:text-champagne transition-colors focus-ring"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="min-w-0 space-y-14">
            {sections.map((section) => (
              <Section key={section.id} id={section.id} title={section.title}>
                {section.content}
              </Section>
            ))}

            <nav
              aria-label={dict.nav.projects}
              className="grid gap-4 border-t border-white/[0.06] pt-10 sm:grid-cols-2"
            >
              <Link
                href={localePath(locale, caseStudyPath(previous.slug))}
                className="panel group p-5 transition-colors hover:bg-white/[0.04] focus-ring"
              >
                <span className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                  <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
                  {d.previous}
                </span>
                <span className="mt-2 block font-display text-lg text-champagne">{previous.title[locale]}</span>
              </Link>
              <Link
                href={localePath(locale, caseStudyPath(next.slug))}
                className="panel group p-5 text-right transition-colors hover:bg-white/[0.04] focus-ring"
              >
                <span className="flex items-center justify-end gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                  {d.next}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </span>
                <span className="mt-2 block font-display text-lg text-champagne">{next.title[locale]}</span>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </main>
  )
}
