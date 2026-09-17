"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { profile } from "@/data/profile"

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open
          ? "bg-background/75 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)]"
          : "bg-transparent",
      )}
    >
      <div className="container flex h-[4.25rem] items-center justify-between">
        <Link
          href="#home"
          className="font-display text-[15px] md:text-base font-semibold tracking-tight text-champagne"
        >
          {profile.shortName}
          <span className="text-primary">.</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative px-3.5 py-2 text-[13px] text-muted-foreground hover:text-champagne transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
          <a href="#contact" className="btn-primary ml-3 !py-2 !px-4 text-[13px]">
            Me contacter
          </a>
        </nav>

        <button
          type="button"
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-foreground focus-ring"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      <div
        className={cn(
          "lg:hidden overflow-hidden border-t border-white/[0.06] bg-background/95 backdrop-blur-xl transition-[max-height,opacity] duration-300",
          open ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0 border-t-0 pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <nav className="container flex flex-col gap-1 py-5">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-xl px-4 py-3.5 text-base text-muted-foreground hover:bg-white/[0.04] hover:text-champagne transition-colors"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-3 justify-center">
            Me contacter
          </a>
        </nav>
      </div>
    </header>
  )
}
