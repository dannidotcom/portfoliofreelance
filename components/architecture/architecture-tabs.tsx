"use client"

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react"
import { stepFromKey } from "@/hooks/use-step-sequence"
import { cn } from "@/lib/utils"

export type ArchitectureTab = { id: string; label: string; panel: ReactNode }

/**
 * Accessible tablist (automatic activation, roving tabindex). Only the active panel is mounted, so its
 * diagram animation starts fresh on every switch. `#<idPrefix>-<tab id>` in the URL selects a tab.
 */
export default function ArchitectureTabs({
  tabs,
  label,
  idPrefix,
}: {
  tabs: ArchitectureTab[]
  label: string
  idPrefix: string
}) {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const tabIds = tabs.map((tab) => tab.id).join("|")

  useEffect(() => {
    const ids = tabIds.split("|")
    const selectFromHash = () => {
      const index = ids.findIndex((id) => window.location.hash === `#${idPrefix}-${id}`)
      if (index >= 0) setActive(index)
    }
    selectFromHash()
    window.addEventListener("hashchange", selectFromHash)
    return () => window.removeEventListener("hashchange", selectFromHash)
  }, [tabIds, idPrefix])

  const select = (index: number) => {
    setActive(index)
    // Drop a tab hash so that following the same link again still switches tabs.
    if (window.location.hash.startsWith(`#${idPrefix}-`)) {
      window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search)
    }
  }

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const target = stepFromKey(event.key, index, tabs.length)
    if (target === null) return
    event.preventDefault()
    select(target)
    tabRefs.current[target]?.focus()
  }

  const current = tabs[active]

  return (
    <div className="space-y-6">
      <div
        role="tablist"
        aria-label={label}
        className="inline-flex max-w-full flex-wrap gap-1.5 rounded-2xl border border-white/10 bg-white/[0.02] p-1.5"
      >
        {tabs.map((tab, i) => {
          const selected = i === active
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[i] = el
              }}
              id={`${idPrefix}-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={selected ? `${idPrefix}-${tab.id}-panel` : undefined}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(i)}
              onKeyDown={(event) => onKeyDown(event, i)}
              className={cn(
                "min-h-10 scroll-mt-28 rounded-xl border px-4 py-2 text-left text-sm font-medium transition-colors focus-ring",
                selected
                  ? "border-primary/50 bg-primary/15 text-champagne"
                  : "border-transparent text-muted-foreground hover:bg-white/[0.04] hover:text-champagne",
              )}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      <div
        key={current.id}
        role="tabpanel"
        id={`${idPrefix}-${current.id}-panel`}
        aria-labelledby={`${idPrefix}-${current.id}`}
      >
        {current.panel}
      </div>
    </div>
  )
}
