import { Github, Linkedin, Mail } from "lucide-react"
import { profile } from "@/content/profile"
import type { Locale } from "@/content/types"
import { getDictionary } from "@/content/ui"
import { localePath } from "@/lib/i18n"
import { isShown } from "@/lib/todo"

export default function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const year = new Date().getFullYear()
  const home = localePath(locale)

  const links: [string, string][] = [
    [`${home}#architecture`, dict.nav.architecture],
    [`${home}#projects`, dict.nav.projects],
    [`${home}#skills`, dict.nav.skills],
    [`${home}#experience`, dict.nav.experience],
    [`${home}#about`, dict.nav.about],
    [`${home}#contact`, dict.nav.contact],
  ]

  const iconClass =
    "inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-muted-foreground hover:text-champagne hover:border-white/20 transition-colors focus-ring"

  return (
    <footer className="border-t border-white/[0.06] relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, hsl(168 30% 18% / 0.1), transparent 55%)",
        }}
        aria-hidden
      />
      <div className="container relative py-14 md:py-16">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <div className="max-w-md space-y-4">
            <p className="font-display text-xl font-semibold text-champagne tracking-tight">
              {profile.shortName}
              <span className="text-primary">.</span>
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {profile.title} — {dict.footer.tagline}
            </p>
          </div>

          <nav aria-label={dict.a11y.mainNav}>
            <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
              {links.map(([href, label]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="rounded-md text-muted-foreground hover:text-champagne transition-colors duration-300 focus-ring"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-white/[0.06] pt-7">
          <p className="text-xs text-muted-foreground">
            © {year} {profile.fullName}. {dict.footer.rights}
          </p>
          <ul aria-label={dict.a11y.social} className="flex items-center gap-3">
            <li>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className={iconClass} aria-label="GitHub">
                <Github className="h-4 w-4" />
              </a>
            </li>
            {isShown(profile.linkedin) ? (
              <li>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={iconClass}
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </li>
            ) : null}
            <li>
              <a href={`mailto:${profile.email}`} className={iconClass} aria-label="Email">
                <Mail className="h-4 w-4" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
