"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      setVisible(true)
      return
    }

    const fallback = window.setTimeout(() => setVisible(true), 1600)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          window.clearTimeout(fallback)
          observer.disconnect()
        }
      },
      { threshold: 0.06, rootMargin: "60px 0px" },
    )

    observer.observe(el)
    return () => {
      window.clearTimeout(fallback)
      observer.disconnect()
    }
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-out will-change-transform",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
        className,
      )}
      style={{ transitionDelay: visible ? `${Math.round(delay * 1000)}ms` : "0ms" }}
    >
      {children}
    </div>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  index,
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: "left" | "center"
  index?: string
}) {
  return (
    <div className={cn("mb-14 md:mb-16 max-w-3xl", align === "center" && "mx-auto text-center")}>
      <div className={cn("flex items-center gap-3 mb-5", align === "center" && "justify-center")}>
        {index ? (
          <span className="font-mono text-[11px] text-muted-foreground/55 tabular-nums">{index}</span>
        ) : null}
        {eyebrow ? <p className="label-caps">{eyebrow}</p> : null}
      </div>
      <h2 className="font-display text-3xl sm:text-4xl md:text-[2.75rem] font-semibold tracking-tight text-champagne text-balance leading-[1.12]">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
          {description}
        </p>
      ) : null}
    </div>
  )
}
