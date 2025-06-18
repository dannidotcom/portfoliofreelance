"use client"

import { useState, useEffect } from "react"
import { useInView } from "framer-motion"
import { useRef } from "react"

interface CountUpProps {
  end: number
  duration?: number
  start?: number
}

export default function CountUp({ end, duration = 2, start = 0 }: CountUpProps) {
  const [count, setCount] = useState(start)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    const startTime = Date.now()
    const endTime = startTime + duration * 1000

    const timer = setInterval(() => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / (endTime - startTime), 1)

      setCount(Math.floor(progress * (end - start) + start))

      if (progress === 1) {
        clearInterval(timer)
      }
    }, 16)

    return () => clearInterval(timer)
  }, [isInView, end, start, duration])

  return <span ref={ref}>{count}</span>
}
