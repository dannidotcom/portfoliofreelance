import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { featuredProject as featured } from "@/content/projects"
import { localePath } from "@/lib/i18n"
import { caseStudyPath } from "@/lib/routes"
import { isShown } from "@/lib/todo"
import type { Locale } from "@/content/types"
import { getDictionary } from "@/content/ui"
import { Reveal, SectionHeading } from "@/components/reveal"

export default function FeaturedProject({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)

  return (
    <section id="featured" className="section-shell border-t border-white/[0.05] relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 80% 20%, hsl(168 40% 20% / 0.18), transparent 60%)",
        }}
        aria-hidden
      />

      <div className="container relative">
        <Reveal>
          <SectionHeading
            index="02"
            eyebrow={dict.featured.eyebrow}
            title={featured.title[locale]}
            description={featured.subtitle?.[locale]}
          />
        </Reveal>

        <Reveal delay={0.08}>
          <article className="panel panel-glow p-6 sm:p-8 md:p-10 lg:p-12">
            <div className="grid lg:grid-cols-[1.25fr_0.75fr] gap-10 lg:gap-14">
              <div className="space-y-9">
                <p className="text-lg md:text-xl text-foreground/85 leading-relaxed max-w-2xl">
                  {featured.description[locale]}
                </p>

                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <h3 className="label-caps !tracking-[0.2em]">{dict.featured.problem}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{featured.problem[locale]}</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="label-caps !tracking-[0.2em]">{dict.featured.solution}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{featured.solution[locale]}</p>
                  </div>
                </div>

                {featured.highlights?.length ? (
                  <div>
                    <h3 className="label-caps !tracking-[0.2em] mb-4">{dict.featured.highlights}</h3>
                    <ul className="space-y-3">
                      {featured.highlights.map((item) => (
                        <li key={item.fr} className="flex gap-3 text-sm text-foreground/85">
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary shadow-[0_0_12px_hsl(168_55%_42%/0.6)]"
                            aria-hidden
                          />
                          {item[locale]}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {featured.caseStudy ? (
                  <Link href={localePath(locale, caseStudyPath(featured.slug))} className="btn-primary">
                    {dict.projects.caseStudy}
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </Link>
                ) : null}
              </div>

              <aside className="space-y-6 lg:border-l lg:border-white/[0.06] lg:pl-10">
                <dl className="space-y-5 text-sm">
                  <div>
                    <dt className="text-muted-foreground text-xs uppercase tracking-wider">{dict.featured.role}</dt>
                    <dd className="mt-1.5 text-champagne font-medium leading-snug">{featured.role[locale]}</dd>
                  </div>
                  {isShown(featured.status) ? (
                    <div>
                      <dt className="text-muted-foreground text-xs uppercase tracking-wider">{dict.featured.status}</dt>
                      <dd className="mt-1.5 text-foreground">{dict.status[featured.status]}</dd>
                    </div>
                  ) : null}
                  {isShown(featured.year) ? (
                    <div>
                      <dt className="text-muted-foreground text-xs uppercase tracking-wider">{dict.featured.year}</dt>
                      <dd className="mt-1.5 text-foreground">{featured.year}</dd>
                    </div>
                  ) : null}
                </dl>

                <div className="pt-2">
                  <h3 className="label-caps !tracking-[0.2em] mb-3">{dict.featured.stack}</h3>
                  <ul className="flex flex-wrap gap-2">
                    {featured.technologies.map((tech) => (
                      <li key={tech} className="chip !text-[11px] !px-2.5 !py-1">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>

                {featured.disclaimer ? (
                  <p className="pt-4 text-[11px] leading-relaxed text-muted-foreground border-t border-white/[0.06]">
                    {featured.disclaimer[locale]}
                  </p>
                ) : null}
              </aside>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
