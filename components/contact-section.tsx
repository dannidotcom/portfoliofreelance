"use client"

import type React from "react"
import { useState } from "react"
import { Github, Loader2, Mail, MapPin, Phone, Send } from "lucide-react"
import { profile } from "@/data/profile"
import { Reveal, SectionHeading } from "@/components/reveal"

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
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
      const result = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
        e.currentTarget.reset()
      } else {
        setError(result.error || "Erreur lors de l'envoi du message")
      }
    } catch {
      setError("Erreur de connexion. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

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
            index="08"
            eyebrow="Contact"
            title="Discutons de votre prochain système IA"
            description="Une question technique, une mission, ou un besoin d'architecture — écrivez-moi."
          />
        </Reveal>

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 max-w-5xl">
          <Reveal delay={0.05}>
            <ul className="space-y-1">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: profile.email,
                  href: `mailto:${profile.email}`,
                },
                {
                  icon: Phone,
                  label: "Téléphone",
                  value: profile.phone,
                  href: `tel:${profile.phone.replace(/\s/g, "")}`,
                },
                {
                  icon: Github,
                  label: "GitHub",
                  value: "github.com/dannidotcom",
                  href: profile.github,
                },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.label === "GitHub" ? "_blank" : undefined}
                    rel={item.label === "GitHub" ? "noopener noreferrer" : undefined}
                    className="group flex items-start gap-4 rounded-2xl p-4 -mx-4 transition-colors hover:bg-white/[0.03]"
                  >
                    <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-primary group-hover:border-primary/30 transition-colors">
                      <item.icon className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-[11px] uppercase tracking-[0.2em] text-muted-foreground/70 mb-1">
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
                  <MapPin className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-[11px] uppercase tracking-[0.2em] text-muted-foreground/70 mb-1">
                    Localisation
                  </span>
                  <span className="text-sm text-champagne">{profile.location}</span>
                </span>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            {isSubmitted ? (
              <div className="panel panel-glow p-8 md:p-10">
                <p className="font-display text-2xl font-semibold text-champagne">Message envoyé</p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  Merci. Je vous répondrai dès que possible.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 text-sm text-primary hover:underline"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="panel panel-glow space-y-4 p-6 md:p-8">
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="block space-y-2">
                    <span className="text-xs text-muted-foreground">Nom *</span>
                    <input name="name" required className="input-field" placeholder="Votre nom" />
                  </label>
                  <label className="block space-y-2">
                    <span className="text-xs text-muted-foreground">Email *</span>
                    <input
                      name="email"
                      type="email"
                      required
                      className="input-field"
                      placeholder="votre@email.com"
                    />
                  </label>
                </div>
                <label className="block space-y-2">
                  <span className="text-xs text-muted-foreground">Sujet *</span>
                  <input
                    name="subject"
                    required
                    className="input-field"
                    placeholder="Sujet de votre message"
                  />
                </label>
                <label className="block space-y-2">
                  <span className="text-xs text-muted-foreground">Message *</span>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    maxLength={2000}
                    className="input-field resize-y min-h-[130px]"
                    placeholder="Contexte, objectif, contraintes techniques..."
                  />
                </label>

                {error ? <p className="text-sm text-red-400">{error}</p> : null}

                <button type="submit" disabled={isSubmitting} className="btn-primary disabled:opacity-60">
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  Envoyer
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
