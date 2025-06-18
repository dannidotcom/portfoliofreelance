"use client"

import { useEffect } from "react"
import { motion, useAnimation, useScroll } from "framer-motion"

export default function AnimationsProvider() {
  const { scrollY } = useScroll()
  const controls = useAnimation()

  // Animation pour les éléments qui apparaissent au scroll
  useEffect(() => {
    const elements = document.querySelectorAll("[data-animate]")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")

            // Ajouter des animations spécifiques basées sur les attributs data
            const animationType = entry.target.getAttribute("data-animation-type")
            if (animationType === "fade-up") {
              entry.target.animate(
                [
                  { opacity: 0, transform: "translateY(30px)" },
                  { opacity: 1, transform: "translateY(0)" },
                ],
                {
                  duration: 800,
                  easing: "ease-out",
                  fill: "forwards",
                },
              )
            } else if (animationType === "fade-in") {
              entry.target.animate([{ opacity: 0 }, { opacity: 1 }], {
                duration: 1000,
                easing: "ease-out",
                fill: "forwards",
              })
            } else if (animationType === "slide-left") {
              entry.target.animate(
                [
                  { opacity: 0, transform: "translateX(-50px)" },
                  { opacity: 1, transform: "translateX(0)" },
                ],
                {
                  duration: 800,
                  easing: "ease-out",
                  fill: "forwards",
                },
              )
            } else if (animationType === "slide-right") {
              entry.target.animate(
                [
                  { opacity: 0, transform: "translateX(50px)" },
                  { opacity: 1, transform: "translateX(0)" },
                ],
                {
                  duration: 800,
                  easing: "ease-out",
                  fill: "forwards",
                },
              )
            } else if (animationType === "zoom-in") {
              entry.target.animate(
                [
                  { opacity: 0, transform: "scale(0.8)" },
                  { opacity: 1, transform: "scale(1)" },
                ],
                {
                  duration: 800,
                  easing: "ease-out",
                  fill: "forwards",
                },
              )
            }
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    elements.forEach((el) => observer.observe(el))

    return () => elements.forEach((el) => observer.unobserve(el))
  }, [])

  // Animation pour les éléments qui réagissent au scroll
  useEffect(() => {
    return scrollY.onChange((y) => {
      // Parallax effect
      const parallaxElements = document.querySelectorAll("[data-parallax]")
      parallaxElements.forEach((element) => {
        const speed = Number.parseFloat(element.getAttribute("data-parallax-speed") || "0.2")
        const yPos = -(y * speed)
        element.setAttribute("style", `transform: translate3d(0, ${yPos}px, 0)`)
      })

      // Rotation effect
      const rotateElements = document.querySelectorAll("[data-rotate-on-scroll]")
      rotateElements.forEach((element) => {
        const speed = Number.parseFloat(element.getAttribute("data-rotate-speed") || "0.02")
        const rotation = y * speed
        element.setAttribute("style", `transform: rotate(${rotation}deg)`)
      })

      // Scale effect
      const scaleElements = document.querySelectorAll("[data-scale-on-scroll]")
      scaleElements.forEach((element) => {
        const rect = element.getBoundingClientRect()
        const elementTop = rect.top
        const elementHeight = rect.height
        const windowHeight = window.innerHeight

        // Calculate how much of the element is in view
        const inView = (windowHeight - elementTop) / (windowHeight + elementHeight)
        const scale = Math.max(0.8, Math.min(1 + inView * 0.2, 1.2))

        if (inView > 0 && inView < 1) {
          element.setAttribute("style", `transform: scale(${scale})`)
        }
      })
    })
  }, [scrollY])

  // Effet de particules flottantes
  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement("div")
      particle.className = "absolute w-1 h-1 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 opacity-20"

      // Position aléatoire
      const x = Math.random() * window.innerWidth
      const y = Math.random() * window.innerHeight
      particle.style.left = `${x}px`
      particle.style.top = `${y}px`

      // Animation
      const duration = 5 + Math.random() * 10
      const keyframes = [
        { transform: `translate(0, 0) scale(1)`, opacity: 0.2 },
        { transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0)`, opacity: 0 },
      ]

      particle.animate(keyframes, {
        duration: duration * 1000,
        easing: "ease-out",
        fill: "forwards",
      })

      document.body.appendChild(particle)

      // Supprimer la particule après l'animation
      setTimeout(() => {
        document.body.removeChild(particle)
      }, duration * 1000)
    }

    // Créer des particules à intervalles réguliers
    const interval = setInterval(createParticle, 2000)

    return () => clearInterval(interval)
  }, [])

  // Effet de hover global pour les boutons
  useEffect(() => {
    const buttons = document.querySelectorAll("button, a.btn")

    buttons.forEach((button) => {
      button.addEventListener("mouseenter", () => {
        button.animate([{ transform: "scale(1)" }, { transform: "scale(1.05)" }, { transform: "scale(1.02)" }], {
          duration: 300,
          easing: "ease-out",
          fill: "forwards",
        })
      })

      button.addEventListener("mouseleave", () => {
        button.animate([{ transform: "scale(1.02)" }, { transform: "scale(1)" }], {
          duration: 200,
          easing: "ease-out",
          fill: "forwards",
        })
      })
    })
  }, [])

  return (
    <>
      {/* Cursor follower */}
      <motion.div
        className="fixed w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-30 pointer-events-none mix-blend-screen z-50 hidden md:block"
        animate={controls}
        style={{
          filter: "blur(5px)",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Cursor effect */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
          document.addEventListener('mousemove', (e) => {
            const cursor = document.querySelector('.fixed.w-6.h-6');
            if (cursor) {
              cursor.style.left = e.clientX + 'px';
              cursor.style.top = e.clientY + 'px';
            }
          });
        `,
        }}
      />
    </>
  )
}
