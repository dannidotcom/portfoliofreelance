"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { locales, type Locale } from "@/content/types"
import { getDictionary } from "@/content/ui"
import { localeFlags } from "@/components/flags"
import { localeNames, localePath, rememberLocale, stripLocale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

export default function LanguageSwitcher({
  locale,
  onNavigate,
  className,
}: {
  locale: Locale
  onNavigate?: () => void
  className?: string
}) {
  const dict = getDictionary(locale)
  const path = stripLocale(usePathname() ?? "/")

  return (
    <div role="group" aria-label={dict.a11y.language} className={cn("flex items-center gap-1.5", className)}>
      {locales.map((target) => {
        const active = target === locale
        const Flag = localeFlags[target]
        return (
          <Link
            key={target}
            href={localePath(target, path)}
            prefetch={false}
            hrefLang={target}
            lang={target}
            aria-label={localeNames[target]}
            aria-current={active ? "true" : undefined}
            title={localeNames[target]}
            onClick={() => {
              rememberLocale(target)
              onNavigate?.()
            }}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full border transition-[opacity,border-color,box-shadow] duration-200 focus-ring",
              active
                ? "border-primary/70 bg-primary/10 opacity-100 shadow-[0_0_0_3px_hsl(var(--primary)/0.18)]"
                : "border-white/10 opacity-55 hover:border-white/30 hover:opacity-100",
            )}
          >
            <span className="block h-[22px] w-[22px] overflow-hidden rounded-full ring-1 ring-white/15">
              <Flag className="h-full w-full" />
            </span>
          </Link>
        )
      })}
    </div>
  )
}
