"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { profile } from "@/content/profile"
import type { Locale } from "@/content/types"
import { getDictionary } from "@/content/ui"
import { localePath, stripLocale } from "@/lib/i18n"

export default function Header({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const pathname = usePathname() ?? "/"
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const home = localePath(locale)
  const navItems = [
    { href: `${home}#projects`, label: dict.nav.projects },
    { href: `${home}#skills`, label: dict.nav.skills },
    { href: `${home}#experience`, label: dict.nav.experience },
    { href: `${home}#about`, label: dict.nav.about },
  ]

  const otherLocale: Locale = locale === "fr" ? "en" : "fr"
  const switchHref = localePath(otherLocale, stripLocale(pathname))

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

  const languageSwitch = (
    <Link
      href={switchHref}
      hrefLang={otherLocale}
      lang={otherLocale}
      aria-label={dict.a11y.switchTo}
      className="inline-flex h-9 items-center gap-1 rounded-full border border-white/10 px-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-white/20 hover:text-champagne focus-ring"
      onClick={() => setOpen(false)}
    >
      <span className={cn(locale === "fr" && "text-champagne")}>FR</span>
      <span aria-hidden>/</span>
      <span className={cn(locale === "en" && "text-champagne")}>EN</span>
    </Link>
  )

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
          href={home}
          className="font-display text-[15px] md:text-base font-semibold tracking-tight text-champagne focus-ring rounded-md"
        >
          {profile.shortName}
          <span className="text-primary">.</span>
        </Link>

        <nav aria-label={dict.a11y.mainNav} className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative rounded-md px-3.5 py-2 text-[13px] text-muted-foreground hover:text-champagne transition-colors duration-300 focus-ring"
            >
              {item.label}
            </a>
          ))}
          <span className="ml-2">{languageSwitch}</span>
          <a href={`${home}#contact`} className="btn-primary ml-3 !py-2 !px-4 text-[13px]">
            {dict.cta.contact}
          </a>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          {languageSwitch}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-foreground focus-ring"
            aria-label={open ? dict.a11y.closeMenu : dict.a11y.openMenu}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "lg:hidden overflow-hidden border-t border-white/[0.06] bg-background/95 backdrop-blur-xl transition-[max-height,opacity] duration-300",
          open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0 border-t-0 pointer-events-none invisible",
        )}
      >
        <nav aria-label={dict.a11y.mainNav} className="container flex flex-col gap-1 py-5">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-xl px-4 py-3.5 text-base text-muted-foreground hover:bg-white/[0.04] hover:text-champagne transition-colors focus-ring"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a href={`${home}#contact`} onClick={() => setOpen(false)} className="btn-primary mt-3 justify-center">
            {dict.cta.contact}
          </a>
        </nav>
      </div>
    </header>
  )
}
