"use client"

import { useCallback, useEffect, useId, useRef, useState } from "react"
import { Loader2, Pause, Play, Volume2, VolumeX } from "lucide-react"
import type { Locale } from "@/content/types"
import { getDictionary } from "@/content/ui"
import { createFocusAudioSource, focusAudio } from "@/lib/audio/config"
import type { AudioErrorKind, AudioSource } from "@/lib/audio/types"
import { cn } from "@/lib/utils"

type Status = "idle" | "loading" | "playing" | "paused" | "error"

const STORAGE = { volume: "focus-music:volume", muted: "focus-music:muted" } as const
/** If playback has not started this long after a click, the browser most likely blocked it. */
const BLOCKED_AFTER_MS = 5000

function readStorage(key: string): string | null {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

function clearTimer(timer: { current: ReturnType<typeof setTimeout> | null }) {
  if (timer.current) clearTimeout(timer.current)
  timer.current = null
}

function writeStorage(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    /* storage disabled (private mode, quota): preferences are simply not remembered */
  }
}

export default function FocusMusic({ locale }: { locale: Locale }) {
  const m = getDictionary(locale).music
  const volumeId = useId()
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<AudioErrorKind | null>(null)
  const [blocked, setBlocked] = useState(false)
  const [volume, setVolume] = useState<number>(focusAudio.defaultVolume)
  const [muted, setMuted] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const sourceRef = useRef<AudioSource | null>(null)
  const blockedTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const errorRef = useRef<AudioErrorKind | null>(null)
  const prefs = useRef({ volume, muted })
  prefs.current = { volume, muted }

  useEffect(() => {
    const storedVolume = Number(readStorage(STORAGE.volume))
    if (readStorage(STORAGE.volume) !== null && Number.isFinite(storedVolume)) {
      setVolume(Math.min(100, Math.max(0, storedVolume)))
    }
    setMuted(readStorage(STORAGE.muted) === "1")

    return () => {
      clearTimer(blockedTimer)
      sourceRef.current?.destroy()
      sourceRef.current = null
    }
  }, [])

  useEffect(() => {
    const onVisibility = () => {
      if (document.visibilityState !== "visible" || !sourceRef.current) return
      const playing = sourceRef.current.isPlaying()
      setStatus((current) => (current === "error" ? current : playing ? "playing" : current === "playing" ? "paused" : current))
    }
    document.addEventListener("visibilitychange", onVisibility)
    return () => document.removeEventListener("visibilitychange", onVisibility)
  }, [])

  const fail = useCallback((kind: AudioErrorKind) => {
    clearTimer(blockedTimer)
    sourceRef.current?.destroy()
    sourceRef.current = null
    errorRef.current = kind
    setError(kind)
    setBlocked(false)
    setStatus("error")
  }, [])

  const requestPlay = (source: AudioSource) => {
    setBlocked(false)
    setStatus("loading")
    source.play()
    clearTimer(blockedTimer)
    blockedTimer.current = setTimeout(() => {
      if (source.isPlaying()) return
      setBlocked(true)
      setStatus("paused")
    }, BLOCKED_AFTER_MS)
  }

  const toggle = async () => {
    if (status === "loading" || (status === "error" && error === "unavailable")) return
    const current = sourceRef.current
    if (current) {
      if (status === "playing") current.pause()
      else requestPlay(current)
      return
    }
    if (!containerRef.current) return

    errorRef.current = null
    setError(null)
    setStatus("loading")
    let source: AudioSource | null = null
    try {
      source = await createFocusAudioSource(containerRef.current, {
        onStateChange: (state) => {
          if (state === "playing") {
            clearTimer(blockedTimer)
            setBlocked(false)
            setStatus("playing")
          } else if (state === "paused") {
            setStatus((value) => (value === "error" ? value : "paused"))
          } else if (state === "buffering") {
            setStatus((value) => (value === "error" ? value : "loading"))
          }
        },
        onError: fail,
      })
      await source.load()
      source.setVolume(prefs.current.volume)
      source.setMuted(prefs.current.muted)
      sourceRef.current = source
      requestPlay(source)
    } catch {
      source?.destroy()
      fail(errorRef.current ?? "network")
    }
  }

  const changeVolume = (value: number) => {
    setVolume(value)
    writeStorage(STORAGE.volume, String(value))
    sourceRef.current?.setVolume(value)
    if (muted && value > 0) toggleMute(false)
  }

  const toggleMute = (next = !muted) => {
    setMuted(next)
    writeStorage(STORAGE.muted, next ? "1" : "0")
    sourceRef.current?.setMuted(next)
  }

  const playing = status === "playing"
  const loading = status === "loading"
  const unavailable = status === "error" && error === "unavailable"
  const message =
    status === "error" ? (error === "unavailable" ? m.unavailable : m.network) : blocked ? m.blocked : null
  const silent = muted || volume === 0

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2">
      <div
        ref={containerRef}
        aria-hidden
        className="pointer-events-none fixed bottom-0 right-0 h-px w-px overflow-hidden opacity-0"
      />

      <p role="status" aria-live="polite" className={cn(message ? "focus-music-note" : "sr-only")}>
        {message ?? (loading ? m.loading : "")}
      </p>

      <div
        role="group"
        aria-label={m.group}
        className="flex items-center gap-1 rounded-full border border-primary/30 bg-background/90 p-1 shadow-[0_0_24px_hsl(168_55%_40%/0.25)] backdrop-blur-md"
      >
        <button
          type="button"
          onClick={toggle}
          disabled={unavailable}
          aria-pressed={playing}
          aria-busy={loading}
          aria-label={playing ? m.pause : m.play}
          className="inline-flex h-10 items-center gap-2.5 rounded-full px-3.5 text-xs font-semibold text-champagne transition-colors hover:bg-white/[0.05] focus-ring disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin text-primary" aria-hidden />
          ) : playing ? (
            <Pause className="h-4 w-4 text-primary" aria-hidden />
          ) : (
            <Play className="h-4 w-4 text-primary" aria-hidden />
          )}
          <span>{m.label}</span>
          {playing ? (
            <span className="equalizer" aria-hidden>
              <span />
              <span />
              <span />
              <span />
            </span>
          ) : null}
        </button>

        <button
          type="button"
          onClick={() => toggleMute()}
          aria-pressed={muted}
          aria-label={muted ? m.unmute : m.mute}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-white/[0.05] hover:text-champagne focus-ring"
        >
          {silent ? <VolumeX className="h-4 w-4" aria-hidden /> : <Volume2 className="h-4 w-4" aria-hidden />}
        </button>

        <label htmlFor={volumeId} className="sr-only">
          {m.volume}
        </label>
        <input
          id={volumeId}
          type="range"
          min={0}
          max={100}
          step={5}
          value={volume}
          aria-valuetext={`${volume} %`}
          onChange={(event) => changeVolume(Number(event.target.value))}
          className="focus-music-volume mr-3 w-16 sm:w-24"
        />
      </div>
    </div>
  )
}
