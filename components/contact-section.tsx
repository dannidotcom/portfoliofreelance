import { Github, Mail, MapPin, Phone } from "lucide-react"
import { profile } from "@/content/profile"
import type { Locale } from "@/content/types"
import { getDictionary } from "@/content/ui"
import { Reveal, SectionHeading } from "@/components/reveal"
import ContactForm from "@/components/contact/contact-form"

export default function ContactSection({ locale, index = "08" }: { locale: Locale; index?: string }) {
  const dict = getDictionary(locale)

  const channels = [
    { icon: Mail, label: dict.contact.email, value: profile.email, href: `mailto:${profile.email}`, external: false },
    {
      icon: Phone,
      label: dict.contact.phone,
      value: profile.phone,
      href: `tel:${profile.phone.replace(/\s/g, "")}`,
      external: false,
    },
    { icon: Github, label: "GitHub", value: "github.com/dannidotcom", href: profile.github, external: true },
  ]

  return (
    <section id="contact" className="section-shell border-t border-white/[0.05] relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, hsl(168 40% 22% / 0.14), transparent 55%)",
        }}
        aria-hidden
      />

      <div className="container relative">
        <Reveal>
          <SectionHeading
            index={index}
            eyebrow={dict.contact.eyebrow}
            title={dict.contact.title}
            description={dict.contact.description}
          />
        </Reveal>

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 max-w-5xl">
          <Reveal delay={0.05}>
            <ul className="space-y-1">
              {channels.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="group flex items-start gap-4 rounded-2xl p-4 -mx-4 transition-colors hover:bg-white/[0.03] focus-ring"
                  >
                    <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-primary group-hover:border-primary/30 transition-colors">
                      <item.icon className="h-4 w-4" aria-hidden />
                    </span>
                    <span>
                      <span className="block text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
                        {item.label}
                      </span>
                      <span className="text-sm text-champagne group-hover:text-white transition-colors">
                        {item.value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
              <li className="flex items-start gap-4 rounded-2xl p-4 -mx-4">
                <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-primary">
                  <MapPin className="h-4 w-4" aria-hidden />
                </span>
                <span>
                  <span className="block text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
                    {dict.contact.location}
                  </span>
                  <span className="text-sm text-champagne">{profile.location[locale]}</span>
                </span>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm locale={locale} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
