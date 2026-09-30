"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Command as CommandIcon, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { profile } from "@/content/profile"
import type { Locale } from "@/content/types"
import { getDictionary } from "@/content/ui"
import { localePath, stripLocale } from "@/lib/i18n"
import type { PaletteProject } from "@/components/command-palette"
import LanguageSwitcher from "@/components/language-switcher"

const CommandPalette = dynamic(() => import("@/components/command-palette"), { ssr: false })

export type HeaderPalette = {
  projects: PaletteProject[]
  cv: { href: string; fileName: string }
}

type Props = { locale: Locale; showNotes?: boolean; palette: HeaderPalette }

export default function Header({ locale, showNotes = false, palette }: Props) {
  const dict = getDictionary(locale)
  const pathname = usePathname() ?? "/"
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [paletteLoaded, setPaletteLoaded] = useState(false)
  const [shortcut, setShortcut] = useState("Ctrl K")
  const [announcement, setAnnouncement] = useState("")
  const announceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const openPalette = useCallback(() => {
    setOpen(false)
    setPaletteLoaded(true)
    setPaletteOpen(true)
  }, [])

  const announce = useCallback((message: string) => {
    setAnnouncement(message)
    if (announceTimer.current) clearTimeout(announceTimer.current)
    announceTimer.current = setTimeout(() => setAnnouncement(""), 2600)
  }, [])

  useEffect(() => {
    if (/Mac|iPhone|iPad/.test(navigator.platform)) setShortcut("⌘K")
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setPaletteLoaded(true)
        setPaletteOpen((value) => !value)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
      if (announceTimer.current) clearTimeout(announceTimer.current)
    }
  }, [])

  const home = localePath(locale)
  const navItems = [
    { href: `${home}#architecture`, label: dict.nav.architecture },
    { href: `${home}#projects`, label: dict.nav.projects },
    { href: `${home}#skills`, label: dict.nav.skills },
    { href: `${home}#experience`, label: dict.nav.experience },
    ...(showNotes ? [{ href: localePath(locale, "/notes"), label: dict.nav.notes }] : []),
    { href: `${home}#about`, label: dict.nav.about },
  ]

  const path = stripLocale(pathname)
  const localeHrefs = { fr: localePath("fr", path), en: localePath("en", path) } satisfies Record<Locale, string>

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

  const paletteTrigger = (
    <button
      type="button"
      onClick={openPalette}
      aria-label={dict.palette.open}
      aria-keyshortcuts="Control+K Meta+K"
      aria-haspopup="dialog"
      className="inline-flex h-9 items-center gap-2 rounded-full border border-white/10 px-3 text-muted-foreground transition-colors hover:border-white/20 hover:text-champagne focus-ring"
    >
      <CommandIcon className="h-3.5 w-3.5" aria-hidden />
      <span className="hidden font-mono text-[11px] xl:inline" aria-hidden>
        {shortcut}
      </span>
    </button>
  )

  return (
    <>
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
            <span className="ml-2">{paletteTrigger}</span>
            <LanguageSwitcher locale={locale} className="ml-2" />
            <a href={`${home}#contact`} className="btn-primary ml-3 !py-2 !px-4 text-[13px]">
              {dict.cta.contact}
            </a>
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            {paletteTrigger}
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
            open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0 border-t-0 pointer-events-none invisible",
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
            <div className="mt-2 flex items-center justify-between rounded-xl px-4 py-2">
              <span className="text-sm text-muted-foreground" aria-hidden>
                {dict.a11y.language}
              </span>
              <LanguageSwitcher locale={locale} onNavigate={() => setOpen(false)} />
            </div>
            <a href={`${home}#contact`} onClick={() => setOpen(false)} className="btn-primary mt-3 justify-center">
              {dict.cta.contact}
            </a>
          </nav>
        </div>
      </header>

      {paletteLoaded ? (
        <CommandPalette
          locale={locale}
          open={paletteOpen}
          onOpenChange={setPaletteOpen}
          home={home}
          localeHrefs={localeHrefs}
          cv={palette.cv}
          email={profile.email}
          githubUrl={profile.github}
          notesHref={showNotes ? localePath(locale, "/notes") : null}
          projects={palette.projects}
          onAnnounce={announce}
        />
      ) : null}

      <p role="status" aria-live="polite" className="sr-only">
        {announcement}
      </p>
      <div
        aria-hidden
        className={cn(
          "pointer-events-none fixed bottom-6 left-1/2 z-[70] -translate-x-1/2 rounded-full border border-primary/30 bg-[#0b111c]/95 px-4 py-2 text-sm text-foreground shadow-xl transition-all duration-300",
          announcement ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
        )}
      >
        {announcement}
      </div>
    </>
  )
}
