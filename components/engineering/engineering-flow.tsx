"use client"

import { useRef, type KeyboardEvent } from "react"
import type { Locale } from "@/content/types"
import { getDictionary } from "@/content/ui"
import FlowArrow from "@/components/sequence/flow-arrow"
import SequenceControls from "@/components/sequence/sequence-controls"
import { stepFromKey, useStepSequence } from "@/hooks/use-step-sequence"
import { cn } from "@/lib/utils"

type Step = { label: string; detail: string }

export default function EngineeringFlow({ steps, locale }: { steps: Step[]; locale: Locale }) {
  const s = getDictionary(locale).sequence
  const sequence = useStepSequence<HTMLDivElement>({ steps: steps.length })
  const buttons = useRef<(HTMLButtonElement | null)[]>([])
  const running = sequence.started && !sequence.reduced

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const target = stepFromKey(event.key, index, steps.length)
    if (target === null) return
    event.preventDefault()
    sequence.goTo(target)
    buttons.current[target]?.focus()
  }

  return (
    <div ref={sequence.ref} className="space-y-6" data-sequence={running ? "running" : "idle"}>
      <p className="sr-only">
        {s.flow(steps.map((step) => step.label))} {s.keyboard}
      </p>
      <ol className="step-flow flex flex-col lg:flex-row">
        {steps.map((step, i) => {
          const current = running && sequence.step === i
          return (
            <li key={step.label} className="flex min-w-0 flex-col lg:flex-1 lg:flex-row">
              <div
                className={cn(
                  "step-card panel h-full flex-1 p-4 lg:p-3.5",
                  sequence.isLit(i) && "is-lit",
                  current && "is-current",
                )}
              >
                <span className="font-mono text-[10px] text-accent-steel" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2.5 font-display text-sm font-semibold text-champagne">
                  <button
                    ref={(element) => {
                      buttons.current[i] = element
                    }}
                    type="button"
                    aria-current={current ? "step" : undefined}
                    onClick={() => sequence.goTo(i)}
                    onKeyDown={(event) => onKeyDown(event, i)}
                    className="text-left after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-inset focus-visible:after:ring-ring"
                  >
                    {step.label}
                  </button>
                </h3>
                <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground">{step.detail}</p>
              </div>
              {i < steps.length - 1 ? <FlowArrow drawn={sequence.reduced || sequence.isDrawn(2 * i + 1)} /> : null}
            </li>
          )
        })}
      </ol>
      <SequenceControls sequence={sequence} locale={locale} stepLabel={steps[Math.max(sequence.step, 0)].label} />
    </div>
  )
}
