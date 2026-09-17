import { Download } from "lucide-react"
import { profile } from "@/data/profile"
import { Reveal, SectionHeading } from "@/components/reveal"

export default function AboutSection() {
  return (
    <section id="about" className="section-shell border-t border-white/[0.05]">
      <div className="container">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-20">
          <Reveal>
            <SectionHeading
              index="07"
              eyebrow="About"
              title="Ingénieur IA, orienté systèmes en production"
            />
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl -mt-6">
              {profile.about.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
            <a
              href={profile.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost mt-10"
            >
              <Download className="h-4 w-4" />
              Télécharger le CV
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="panel panel-glow p-7 md:p-8 space-y-8 lg:mt-16">
              <div>
                <h3 className="label-caps mb-4">Formation</h3>
                <ul className="space-y-5">
                  {profile.education.map((edu) => (
                    <li key={edu.degree} className="border-l-2 border-primary/40 pl-4">
                      <p className="text-sm font-medium text-champagne leading-snug">{edu.degree}</p>
                      <p className="text-sm text-muted-foreground mt-1.5">{edu.school}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-2 border-t border-white/[0.06]">
                <h3 className="label-caps mb-3">Langues</h3>
                <p className="text-sm text-muted-foreground">{profile.languages.join(" · ")}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
