"use client"

import { useEffect } from "react"

export default function MobileTouchHelper() {
  useEffect(() => {
    // Améliorer les performances de défilement sur mobile
    const handleTouchStart = (e: TouchEvent) => {
      // Permettre le défilement naturel
      if (e.touches.length > 1) {
        e.preventDefault()
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      // Empêcher le zoom par pincement sur les formulaires
      if (e.touches.length > 1) {
        e.preventDefault()
      }
    }

    // Optimiser les performances de défilement
    const options: AddEventListenerOptions = { passive: false }

    document.addEventListener("touchstart", handleTouchStart, options)
    document.addEventListener("touchmove", handleTouchMove, options)

    // Améliorer la réactivité des boutons sur iOS
    const style = document.createElement("style")
    style.textContent = `
      * {
        -webkit-tap-highlight-color: transparent;
      }
      
      button, a, input, textarea {
        -webkit-tap-highlight-color: rgba(147, 51, 234, 0.2);
      }
    `
    document.head.appendChild(style)

    return () => {
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchmove", handleTouchMove)
      document.head.removeChild(style)
    }
  }, [])

  return null
}
