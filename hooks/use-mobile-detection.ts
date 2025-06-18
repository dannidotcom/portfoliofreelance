"use client"

import { useState, useEffect } from "react"

export function useMobileDetection() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">("desktop")

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth
      const userAgent = navigator.userAgent

      // Détection par taille d'écran
      const mobile = width < 768
      const tablet = width >= 768 && width < 1024

      // Détection par User Agent
      const mobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
      const tabletUA = /iPad|Android(?=.*Mobile)/i.test(userAgent)

      setIsMobile(mobile || (mobileUA && !tabletUA))
      setIsTablet(tablet || tabletUA)

      if (mobile || (mobileUA && !tabletUA)) {
        setScreenSize("mobile")
      } else if (tablet || tabletUA) {
        setScreenSize("tablet")
      } else {
        setScreenSize("desktop")
      }
    }

    checkDevice()
    window.addEventListener("resize", checkDevice)
    window.addEventListener("orientationchange", checkDevice)

    return () => {
      window.removeEventListener("resize", checkDevice)
      window.removeEventListener("orientationchange", checkDevice)
    }
  }, [])

  return {
    isMobile,
    isTablet,
    isDesktop: !isMobile && !isTablet,
    screenSize,
  }
}
