import projectsData from "@/data/projects.json"
import { Reveal, SectionHeading } from "@/components/reveal"

export default function FeaturedProject() {
  const featured = projectsData.featured

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
            eyebrow="Featured project"
            title={featured.title}
            description={featured.subtitle}
          />
        </Reveal>

        <Reveal delay={0.08}>
          <article className="panel panel-glow p-6 sm:p-8 md:p-10 lg:p-12">
            <div className="grid lg:grid-cols-[1.25fr_0.75fr] gap-10 lg:gap-14">
              <div className="space-y-9">
                <p className="text-lg md:text-xl text-foreground/80 leading-relaxed max-w-2xl">
                  {featured.shortDescription}
                </p>

                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <h3 className="label-caps !tracking-[0.2em]">Problème</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{featured.problem}</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="label-caps !tracking-[0.2em]">Solution</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{featured.solution}</p>
                  </div>
                </div>

                <div>
                  <h3 className="label-caps !tracking-[0.2em] mb-4">Points clés</h3>
                  <ul className="space-y-3">
                    {featured.highlights.map((item) => (
                      <li key={item} className="flex gap-3 text-sm text-foreground/85">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary shadow-[0_0_12px_hsl(168_55%_42%/0.6)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <aside className="space-y-6 lg:border-l lg:border-white/[0.06] lg:pl-10">
                <dl className="space-y-5 text-sm">
                  <div>
                    <dt className="text-muted-foreground text-xs uppercase tracking-wider">Rôle</dt>
                    <dd className="mt-1.5 text-champagne font-medium leading-snug">{featured.role}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground text-xs uppercase tracking-wider">Statut</dt>
                    <dd className="mt-1.5 text-foreground">{featured.status}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground text-xs uppercase tracking-wider">Année</dt>
                    <dd className="mt-1.5 text-foreground">{featured.year}</dd>
                  </div>
                </dl>

                <div className="pt-2">
                  <h3 className="label-caps !tracking-[0.2em] mb-3">Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {featured.technologies.map((tech) => (
                      <span key={tech} className="chip !text-[11px] !px-2.5 !py-1">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {"disclaimer" in featured && featured.disclaimer ? (
                  <p className="pt-4 text-[11px] leading-relaxed text-muted-foreground/70 border-t border-white/[0.06]">
                    {featured.disclaimer}
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
