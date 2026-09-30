"use client"

import type React from "react"
import { useState } from "react"
import { Github, Loader2, Mail, MapPin, Phone, Send } from "lucide-react"
import { profile } from "@/content/profile"
import type { Locale } from "@/content/types"
import { getDictionary } from "@/content/ui"
import { Reveal, SectionHeading } from "@/components/reveal"

export default function ContactSection({ locale, index = "08" }: { locale: Locale; index?: string }) {
  const dict = getDictionary(locale)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(form)
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setIsSubmitted(true)
        form.reset()
      } else {
        setError(dict.contact.errorGeneric)
      }
    } catch {
      setError(dict.contact.errorNetwork)
    } finally {
      setIsSubmitting(false)
    }
  }

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
            {isSubmitted ? (
              <div className="panel panel-glow p-8 md:p-10" role="status">
                <p className="font-display text-2xl font-semibold text-champagne">{dict.contact.sentTitle}</p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{dict.contact.sentBody}</p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 text-sm text-primary hover:underline focus-ring rounded-md"
                >
                  {dict.contact.sendAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="panel panel-glow space-y-4 p-6 md:p-8">
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="block space-y-2">
                    <span className="text-xs text-muted-foreground">{dict.contact.name} *</span>
                    <input name="name" required className="input-field" placeholder={dict.contact.namePlaceholder} />
                  </label>
                  <label className="block space-y-2">
                    <span className="text-xs text-muted-foreground">{dict.contact.email} *</span>
                    <input
                      name="email"
                      type="email"
                      required
                      className="input-field"
                      placeholder={dict.contact.emailPlaceholder}
                    />
                  </label>
                </div>
                <label className="block space-y-2">
                  <span className="text-xs text-muted-foreground">{dict.contact.subject} *</span>
                  <input name="subject" required className="input-field" placeholder={dict.contact.subjectPlaceholder} />
                </label>
                <label className="block space-y-2">
                  <span className="text-xs text-muted-foreground">{dict.contact.message} *</span>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    maxLength={2000}
                    className="input-field resize-y min-h-[130px]"
                    placeholder={dict.contact.messagePlaceholder}
                  />
                </label>

                {error ? (
                  <p className="text-sm text-red-400" role="alert">
                    {error}
                  </p>
                ) : null}

                <button type="submit" disabled={isSubmitting} className="btn-primary disabled:opacity-60">
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  ) : (
                    <Send className="h-4 w-4" aria-hidden />
                  )}
                  {dict.contact.send}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
