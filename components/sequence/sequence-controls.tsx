"use client"

import { Pause, Play, RotateCcw, SkipBack, SkipForward } from "lucide-react"
import type { Locale } from "@/content/types"
import { getDictionary } from "@/content/ui"
import type { StepSequence } from "@/hooks/use-step-sequence"
import { cn } from "@/lib/utils"

const buttonClass =
  "inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-white/25 hover:text-champagne focus-ring disabled:opacity-40 disabled:hover:border-white/10 disabled:hover:text-muted-foreground"

/** Play/pause, previous/next, replay and a polite live region announcing the active step. */
export default function SequenceControls<T extends Element>({
  sequence,
  locale,
  stepLabel,
  className,
}: {
  sequence: StepSequence<T>
  locale: Locale
  stepLabel: string
  className?: string
}) {
  const s = getDictionary(locale).sequence
  const { step, steps, playing, reduced, manual, done, started } = sequence
  const shownStep = Math.max(step, 0) + 1
  const announce = started && (manual || done) ? s.announce(shownStep, steps, stepLabel) : ""

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <p className="sr-only" aria-live="polite">
        {announce}
      </p>
      {reduced ? null : (
        <div role="group" aria-label={s.controls} className="flex items-center gap-1.5">
          <button type="button" onClick={sequence.prev} disabled={step <= 0} aria-label={s.previous} className={buttonClass}>
            <SkipBack className="h-4 w-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={playing ? sequence.pause : sequence.play}
            aria-label={playing ? s.pause : s.play}
            aria-pressed={playing}
            className={cn(buttonClass, "text-primary")}
          >
            {playing ? <Pause className="h-4 w-4" aria-hidden /> : <Play className="h-4 w-4" aria-hidden />}
          </button>
          <button
            type="button"
            onClick={sequence.next}
            disabled={step >= steps - 1}
            aria-label={s.next}
            className={buttonClass}
          >
            <SkipForward className="h-4 w-4" aria-hidden />
          </button>
          <button type="button" onClick={sequence.replay} aria-label={s.replay} className={buttonClass}>
            <RotateCcw className="h-4 w-4" aria-hidden />
          </button>
        </div>
      )}
      <p className="font-mono text-[11px] text-muted-foreground" aria-hidden>
        {s.step(shownStep, steps)}
        {started ? <span className="text-champagne/90"> · {stepLabel}</span> : null}
      </p>
    </div>
  )
}
