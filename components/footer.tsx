import Link from "next/link"
import { Github, Mail } from "lucide-react"
import { profile } from "@/data/profile"

export default function Footer() {
  const year = new Date().getFullYear()

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
              {profile.title} — systèmes IA souverains, backend et architectures prêtes pour la production.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {[
              ["#about", "About"],
              ["#experience", "Experience"],
              ["#projects", "Projects"],
              ["#skills", "Skills"],
              ["#contact", "Contact"],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="text-muted-foreground hover:text-champagne transition-colors duration-300"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-white/[0.06] pt-7">
          <p className="text-xs text-muted-foreground/70">
            © {year} {profile.fullName}. Tous droits réservés.
          </p>
          <div className="flex items-center gap-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-muted-foreground hover:text-champagne hover:border-white/20 transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-muted-foreground hover:text-champagne hover:border-white/20 transition-colors"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
