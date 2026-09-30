"use client"

import { useCallback, useEffect, useRef, useState } from "react"

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])
  return reduced
}

/** Roving keyboard navigation between steps: arrows, Home, End. */
export function stepFromKey(key: string, index: number, count: number): number | null {
  if (key === "ArrowRight" || key === "ArrowDown") return Math.min(count - 1, index + 1)
  if (key === "ArrowLeft" || key === "ArrowUp") return Math.max(0, index - 1)
  if (key === "Home") return 0
  if (key === "End") return count - 1
  return null
}

type Options = {
  steps: number
  /** Last phase of the sequence. Defaults to the last step being lit. */
  maxPhase?: number
  phaseMs?: number
  /** Share of the element that must be visible to start (and keep) the animation. */
  threshold?: number
}

export type StepSequence<T extends Element> = ReturnType<typeof useStepSequence<T>>

/**
 * Drives a step-by-step walkthrough. Phase 2k lights step k, phase 2k+1 draws the connectors leaving step k;
 * -1 means not started. Autoplays once when the element becomes visible, pauses while it is off screen,
 * and shows everything statically when the user prefers reduced motion.
 */
export function useStepSequence<T extends Element>({ steps, maxPhase, phaseMs = 300, threshold = 0.4 }: Options) {
  const lastPhase = Math.max(maxPhase ?? 0, 2 * (steps - 1))
  const ref = useRef<T>(null)
  const reduced = usePrefersReducedMotion()
  const [phase, setPhase] = useState(-1)
  const [playing, setPlaying] = useState(false)
  const [visible, setVisible] = useState(false)
  const [manual, setManual] = useState(false)
  const started = useRef(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        const tallEnough = entry.intersectionRect.height >= window.innerHeight * 0.6
        const inView = entry.isIntersecting && (entry.intersectionRatio >= threshold || tallEnough)
        setVisible(inView)
        if (inView && !started.current) {
          started.current = true
          setPhase(0)
          setPlaying(true)
        }
      },
      { threshold: [0, 0.2, threshold, 0.6, 1] },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold])

  useEffect(() => {
    if (!playing || !visible || reduced) return
    if (phase >= lastPhase) {
      setPlaying(false)
      return
    }
    const timer = window.setTimeout(() => setPhase((value) => Math.min(value + 1, lastPhase)), phaseMs)
    return () => window.clearTimeout(timer)
  }, [playing, visible, reduced, phase, lastPhase, phaseMs])

  const current = reduced ? lastPhase : phase
  const step = current < 0 ? -1 : Math.min(steps - 1, Math.floor(current / 2))

  const replay = useCallback(() => {
    started.current = true
    setManual(false)
    setPhase(0)
    setPlaying(true)
  }, [])

  const play = useCallback(() => {
    started.current = true
    setManual(false)
    setPhase((value) => (value < 0 || value >= lastPhase ? 0 : value))
    setPlaying(true)
  }, [lastPhase])

  const pause = useCallback(() => setPlaying(false), [])

  const goTo = useCallback(
    (target: number) => {
      started.current = true
      setPlaying(false)
      setManual(true)
      setPhase(2 * Math.min(steps - 1, Math.max(0, target)))
    },
    [steps],
  )

  return {
    ref,
    phase: current,
    step,
    steps,
    lastPhase,
    reduced,
    visible,
    manual,
    started: current >= 0,
    done: current >= lastPhase,
    playing: playing && !reduced,
    isLit: (index: number) => current >= 2 * index,
    /** Connector drawn once its phase is reached. */
    isDrawn: (connectorPhase: number) => current >= connectorPhase,
    play,
    pause,
    replay,
    goTo,
    next: () => goTo(step + 1),
    prev: () => goTo(step - 1),
  }
}
