import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { profile } from "@/content/profile"
import type { Locale } from "@/content/types"
import { getDictionary } from "@/content/ui"
import HeroCode from "@/components/hero/hero-code"
import HeroSceneLoader from "@/components/hero/hero-scene-loader"
import { shown } from "@/lib/todo"

export default function HeroSection({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const metrics = shown(profile.metrics, (metric) => metric.value)

  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden">
      <HeroSceneLoader />

      <div className="absolute inset-0 grid-atmosphere pointer-events-none opacity-40" aria-hidden />

      <div className="container relative z-10 grid min-h-[100svh] items-center gap-12 pt-28 pb-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10 xl:gap-16">
        <div className="max-w-xl space-y-7">
          <div className="space-y-4">
            <h1 className="font-display text-[2.4rem] sm:text-5xl md:text-[3.35rem] lg:text-[2.75rem] xl:text-[3.35rem] font-bold tracking-[-0.03em] text-champagne text-balance leading-[1.02]">
              {profile.fullName}
            </h1>
            <p className="font-display text-lg sm:text-xl font-medium text-foreground/85">{profile.title}</p>
          </div>

          <p className="max-w-md text-base text-muted-foreground leading-relaxed">{profile.tagline[locale]}</p>

          {metrics.length ? (
            <dl aria-label={dict.a11y.metrics} className="flex flex-wrap gap-x-8 gap-y-4 border-l-2 border-primary/40 pl-4">
              {metrics.map((metric) => (
                <div key={metric.id} className="flex min-w-[6.5rem] flex-col-reverse">
                  <dt className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    {metric.label[locale]}
                  </dt>
                  <dd className="font-display text-2xl font-semibold text-champagne tabular-nums">{metric.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          <div className="flex flex-col sm:flex-row gap-3">
            <a href="#featured" className="btn-primary">
              {dict.cta.featured}
              <ArrowDownRight className="h-4 w-4" aria-hidden />
            </a>
            <a href="#contact" className="btn-ghost">
              {dict.cta.contact}
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>

        <div className="min-w-0 animate-fade-up [animation-delay:120ms]">
          <HeroCode locale={locale} />
        </div>
      </div>
    </section>
  )
}
