"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import * as Popover from "@radix-ui/react-popover"
import { ArrowUpRight, Briefcase, FolderGit2 } from "lucide-react"
import type { SkillLevel } from "@/content/skills"
import { cn } from "@/lib/utils"

export type SkillEvidence = {
  kind: "experience" | "project"
  title: string
  detail: string
  href: string
}

type LevelText = { label: string; detail: string }

type Props = {
  id: string
  label: string
  level: SkillLevel | null
  levelText: LevelText | null
  evidence: SkillEvidence[]
  labels: {
    usedIn: string
    level: string
    experience: string
    project: string
    trigger: string
    noEvidence: string | null
  }
  levelTodo?: boolean
}

const LEVEL_BARS: Record<SkillLevel, number> = { production: 3, solid: 2, growing: 1 }
const OPEN_EVENT = "skill-badge:open"

export function LevelBars({ level, className }: { level: SkillLevel; className?: string }) {
  return (
    <span className={cn("inline-flex items-end gap-[2px]", className)} aria-hidden>
      {[1, 2, 3].map((bar) => (
        <span
          key={bar}
          className={cn(
            "w-[3px] rounded-full",
            bar === 1 ? "h-1.5" : bar === 2 ? "h-2" : "h-2.5",
            bar <= LEVEL_BARS[level] ? "bg-primary" : "bg-white/15",
          )}
        />
      ))}
    </span>
  )
}

export default function SkillBadge({ id, label, level, levelText, evidence, labels, levelTodo }: Props) {
  const [open, setOpen] = useState(false)
  const [pinned, setPinned] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const anchorId = `skill-${id}`

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = null
  }, [])

  const scheduleClose = useCallback(() => {
    cancelClose()
    closeTimer.current = setTimeout(() => {
      setOpen(false)
      setPinned(false)
    }, 160)
  }, [cancelClose])

  useEffect(() => {
    const syncWithHash = () => {
      if (window.location.hash !== `#${anchorId}`) return
      setOpen(true)
      setPinned(true)
      triggerRef.current?.focus({ preventScroll: true })
    }
    syncWithHash()
    window.addEventListener("hashchange", syncWithHash)
    return () => window.removeEventListener("hashchange", syncWithHash)
  }, [anchorId])

  useEffect(() => cancelClose, [cancelClose])

  useEffect(() => {
    if (!open) return
    window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: id }))
    const closeIfOther = (event: Event) => {
      if ((event as CustomEvent<string>).detail === id) return
      setOpen(false)
      setPinned(false)
    }
    window.addEventListener(OPEN_EVENT, closeIfOther)
    return () => window.removeEventListener(OPEN_EVENT, closeIfOther)
  }, [open, id])

  const interactive = evidence.length > 0 || levelText !== null || labels.noEvidence !== null

  const chipContent = (
    <>
      <span>{label}</span>
      {level ? <LevelBars level={level} /> : null}
      {level && levelText ? <span className="sr-only">{`, ${labels.level} : ${levelText.label}`}</span> : null}
    </>
  )

  if (!interactive) {
    return (
      <span id={anchorId} className="chip scroll-mt-28 gap-2 !text-[11px] !px-2.5 !py-1">
        {chipContent}
      </span>
    )
  }

  return (
    <Popover.Root
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (!next) setPinned(false)
      }}
    >
      <Popover.Trigger asChild>
        <button
          ref={triggerRef}
          id={anchorId}
          type="button"
          aria-label={labels.trigger}
          className={cn(
            "chip scroll-mt-28 gap-2 !text-[11px] !px-2.5 !py-1 cursor-pointer",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            open && "border-primary/40 bg-primary/10 text-foreground",
          )}
          onPointerEnter={(event) => {
            if (event.pointerType !== "mouse") return
            cancelClose()
            setOpen(true)
          }}
          onPointerLeave={(event) => {
            if (event.pointerType !== "mouse" || pinned) return
            scheduleClose()
          }}
          onClick={(event) => {
            event.preventDefault()
            cancelClose()
            if (open && !pinned) {
              setPinned(true)
            } else if (open) {
              setOpen(false)
              setPinned(false)
            } else {
              setOpen(true)
              setPinned(true)
            }
          }}
        >
          {chipContent}
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side="top"
          align="start"
          sideOffset={8}
          collisionPadding={16}
          onOpenAutoFocus={(event) => {
            if (!pinned) event.preventDefault()
          }}
          onPointerEnter={cancelClose}
          onPointerLeave={(event) => {
            if (event.pointerType !== "mouse" || pinned) return
            scheduleClose()
          }}
          className={cn(
            "z-50 w-[min(20rem,calc(100vw-2rem))] rounded-xl border border-white/10 bg-[#0b111c]/95 p-4 text-sm shadow-2xl backdrop-blur-md",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          )}
        >
          <div className="flex items-center justify-between gap-3">
            <p className="font-display text-base font-semibold text-champagne">{label}</p>
            {level && levelText ? (
              <span className="inline-flex items-center gap-2 font-mono text-[11px] text-accent-steel">
                <LevelBars level={level} />
                {levelText.label}
              </span>
            ) : levelTodo ? (
              <span className="rounded-md border border-dashed border-amber-400/60 px-1.5 py-0.5 font-mono text-[10px] text-amber-300">
                TODO · {labels.level}
              </span>
            ) : null}
          </div>
          {levelText ? <p className="mt-1 text-xs text-muted-foreground">{levelText.detail}</p> : null}

          {evidence.length > 0 ? (
            <>
              <p className="label-caps mt-4 mb-2">{labels.usedIn}</p>
              <ul className="space-y-1.5">
                {evidence.map((item) => {
                  const Icon = item.kind === "experience" ? Briefcase : FolderGit2
                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={() => {
                          setOpen(false)
                          setPinned(false)
                        }}
                        className="group flex items-start gap-2.5 rounded-lg px-2 py-1.5 -mx-2 transition-colors hover:bg-white/[0.05] focus-visible:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/60"
                      >
                        <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
                        <span className="min-w-0 flex-1">
                          <span className="block text-foreground/90 group-hover:text-foreground">{item.title}</span>
                          <span className="block text-xs text-muted-foreground">
                            <span className="sr-only">
                              {item.kind === "experience" ? labels.experience : labels.project} ·{" "}
                            </span>
                            {item.detail}
                          </span>
                        </span>
                        <ArrowUpRight
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
                          aria-hidden
                        />
                      </a>
                    </li>
                  )
                })}
              </ul>
            </>
          ) : labels.noEvidence ? (
            <p className="mt-3 rounded-md border border-dashed border-amber-400/60 px-2 py-1 font-mono text-[11px] text-amber-300">
              TODO · {labels.noEvidence}
            </p>
          ) : null}
          <Popover.Arrow className="fill-[#0b111c]" width={12} height={6} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
