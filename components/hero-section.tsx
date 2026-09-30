"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { profile } from "@/content/profile"
import type { Locale } from "@/content/types"
import { getDictionary } from "@/content/ui"
import { shown } from "@/lib/todo"

const HeroScene3D = dynamic(() => import("@/components/hero-scene-3d"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_45%,hsl(168_30%_16%/0.3),transparent_55%)]" />
  ),
})

const TERMINAL_LINES: Record<Locale, string[]> = {
  fr: [
    "$ boot workstation — mode souverain",
    "> stack: Python · FastAPI · ETL · RAG · vLLM",
    "> mission: plateformes data & IA en production",
    `> operator: ${profile.shortName}`,
  ],
  en: [
    "$ boot workstation — sovereign mode",
    "> stack: Python · FastAPI · ETL · RAG · vLLM",
    "> mission: data & AI platforms in production",
    `> operator: ${profile.shortName}`,
  ],
}

export default function HeroSection({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const lines = TERMINAL_LINES[locale]
  const metrics = shown(profile.metrics, (metric) => metric.value)
  const [lineIndex, setLineIndex] = useState(0)
  const [typed, setTyped] = useState("")

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      setTyped(lines.join("\n"))
      setLineIndex(lines.length)
      return
    }

    const current = lines[Math.min(lineIndex, lines.length - 1)]
    if (lineIndex >= lines.length) return

    if (typed.length < current.length) {
      const id = window.setTimeout(() => setTyped(current.slice(0, typed.length + 1)), 22)
      return () => window.clearTimeout(id)
    }

    const id = window.setTimeout(() => {
      setLineIndex((v) => v + 1)
      setTyped("")
    }, 420)
    return () => window.clearTimeout(id)
  }, [typed, lineIndex, lines])

  const completed = lines.slice(0, lineIndex).join("\n")
  const live = lineIndex < lines.length ? `${completed ? `${completed}\n` : ""}${typed}` : completed

  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden">
      <HeroScene3D photoUrl="/images/profile.png" />

      <div className="absolute inset-0 grid-atmosphere pointer-events-none opacity-40" aria-hidden />

      <div className="container relative z-10 flex min-h-[100svh] items-center pt-24 pb-20">
        <div className="max-w-xl space-y-7 animate-fade-up">
          <div className="panel panel-glow overflow-hidden max-w-md" aria-hidden>
            <div className="flex items-center gap-2 border-b border-white/[0.06] px-3.5 py-2 bg-white/[0.02]">
              <span className="h-2 w-2 rounded-full bg-red-400/80" />
              <span className="h-2 w-2 rounded-full bg-amber-400/80" />
              <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
              <span className="ml-2 font-mono text-[10px] text-muted-foreground">session · live desk</span>
            </div>
            <pre className="px-3.5 py-3 font-mono text-[11px] sm:text-xs leading-relaxed text-accent-steel min-h-[5.5rem] whitespace-pre-wrap">
              {live}
              <span className="inline-block w-1.5 h-3.5 bg-primary/80 align-middle ml-0.5 animate-pulse" />
            </pre>
          </div>

          <div className="space-y-4">
            <h1 className="font-display text-[2.4rem] sm:text-5xl md:text-[3.35rem] font-bold tracking-[-0.03em] text-champagne text-balance leading-[1.02]">
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

          <p className="text-[12px] text-muted-foreground font-mono" aria-hidden>
            {dict.hero.caption}
          </p>
        </div>
      </div>
    </section>
  )
}
