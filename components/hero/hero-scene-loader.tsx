"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

const HeroScene3D = dynamic(() => import("@/components/hero-scene-3d"), { ssr: false })

const QUERY = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)"

type NetworkInformation = { saveData?: boolean }

/** Loads the 3D workstation only on large screens, with motion allowed, once the main thread is idle. */
export default function HeroSceneLoader() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection
    if (connection?.saveData) return

    const media = window.matchMedia(QUERY)
    let idleId: number | undefined
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    const cancel = () => {
      if (idleId !== undefined) window.cancelIdleCallback?.(idleId)
      if (timeoutId !== undefined) clearTimeout(timeoutId)
      idleId = timeoutId = undefined
    }

    const update = () => {
      cancel()
      if (!media.matches) {
        setEnabled(false)
        return
      }
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(() => setEnabled(true), { timeout: 3000 })
      } else {
        timeoutId = setTimeout(() => setEnabled(true), 1500)
      }
    }

    update()
    media.addEventListener("change", update)
    return () => {
      cancel()
      media.removeEventListener("change", update)
    }
  }, [])

  if (!enabled) return null
  return (
    <div className="absolute inset-y-0 right-0 w-[60%] opacity-60" aria-hidden>
      <HeroScene3D photoUrl="/images/profile.png" />
    </div>
  )
}
