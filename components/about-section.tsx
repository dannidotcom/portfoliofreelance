import { Download } from "lucide-react"
import { profile } from "@/content/profile"
import type { Locale } from "@/content/types"
import { getDictionary } from "@/content/ui"
import { Reveal, SectionHeading } from "@/components/reveal"
import { cvFileName, cvUrl } from "@/lib/cv"

export default function AboutSection({ locale, index = "07" }: { locale: Locale; index?: string }) {
  const dict = getDictionary(locale)

  return (
    <section id="about" className="section-shell border-t border-white/[0.05]">
      <div className="container">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-20">
          <Reveal>
            <SectionHeading index={index} eyebrow={dict.about.eyebrow} title={dict.about.title} />
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl -mt-6">
              {profile.about.map((paragraph) => (
                <p key={paragraph.fr.slice(0, 32)}>{paragraph[locale]}</p>
              ))}
            </div>
            <a href={cvUrl(locale)} download={cvFileName(locale)} className="btn-ghost mt-10">
              <Download className="h-4 w-4" aria-hidden />
              {dict.cta.downloadCv}
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="panel panel-glow p-7 md:p-8 space-y-8 lg:mt-16">
              <div>
                <h3 className="label-caps mb-4">{dict.about.education}</h3>
                <ul className="space-y-5">
                  {profile.education.map((edu) => (
                    <li key={edu.school} className="border-l-2 border-primary/40 pl-4">
                      <p className="text-sm font-medium text-champagne leading-snug">{edu.degree[locale]}</p>
                      <p className="text-sm text-muted-foreground mt-1.5">{edu.school}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-2 border-t border-white/[0.06]">
                <h3 className="label-caps mb-3">{dict.about.languages}</h3>
                <p className="text-sm text-muted-foreground">
                  {profile.languages.map((language) => language[locale]).join(" · ")}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
