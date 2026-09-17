"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { profile } from "@/data/profile"

const HeroScene3D = dynamic(() => import("@/components/hero-scene-3d"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_45%,hsl(168_30%_16%/0.3),transparent_55%)]" />
  ),
})

const TERMINAL_LINES = [
  "$ boot workstation — souverain mode",
  "> stack: FastAPI · RAG · vLLM · Qdrant",
  "> mission: systèmes IA en production",
  `> operator: ${profile.shortName}`,
]

export default function HeroSection() {
  const [lineIndex, setLineIndex] = useState(0)
  const [typed, setTyped] = useState("")

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      setTyped(TERMINAL_LINES.join("\n"))
      setLineIndex(TERMINAL_LINES.length)
      return
    }

    const current = TERMINAL_LINES[Math.min(lineIndex, TERMINAL_LINES.length - 1)]
    if (lineIndex >= TERMINAL_LINES.length) return

    if (typed.length < current.length) {
      const id = window.setTimeout(() => setTyped(current.slice(0, typed.length + 1)), 22)
      return () => window.clearTimeout(id)
    }

    const id = window.setTimeout(() => {
      setLineIndex((v) => v + 1)
      setTyped("")
    }, 420)
    return () => window.clearTimeout(id)
  }, [typed, lineIndex])

  const completed = TERMINAL_LINES.slice(0, lineIndex).join("\n")
  const live = lineIndex < TERMINAL_LINES.length ? `${completed ? `${completed}\n` : ""}${typed}` : completed

  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden">
      <HeroScene3D photoUrl="/images/profile.png" />

      <div className="absolute inset-0 grid-atmosphere pointer-events-none opacity-40" aria-hidden />

      <div className="container relative z-10 flex min-h-[100svh] items-center pt-24 pb-20">
        <div className="max-w-xl space-y-7 animate-fade-up">
          <div className="panel panel-glow overflow-hidden max-w-md">
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
            <p className="font-display text-lg sm:text-xl font-medium text-foreground/80">
              {profile.title}
            </p>
          </div>

          <p className="max-w-md text-base text-muted-foreground leading-relaxed">
            {profile.valueProposition}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <a href="#featured" className="btn-primary">
              Voir le projet phare
              <ArrowDownRight className="h-4 w-4" />
            </a>
            <a href="#contact" className="btn-ghost">
              Me contacter
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <p className="text-[12px] text-muted-foreground/70 font-mono">
            workstation 3D · typing @ keyboard · Python on screen
          </p>
        </div>
      </div>
    </section>
  )
}
