import { defaultLocale, locales, type Locale, type Localized } from "@/content/types"

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

export function t(value: Localized, locale: Locale): string {
  return value[locale]
}

/** `/` for the default locale, `/en/...` for the others. `path` must start with `/`. */
export function localePath(locale: Locale, path = "/"): string {
  if (locale === defaultLocale) return path
  return path === "/" ? `/${locale}` : `/${locale}${path}`
}

export function stripLocale(pathname: string): string {
  const match = pathname.match(/^\/(fr|en)(?=\/|$)/)
  if (!match) return pathname || "/"
  return pathname.slice(match[0].length) || "/"
}

export const ogLocale: Record<Locale, string> = { fr: "fr_FR", en: "en_US" }

/** Each language is named in its own language, whatever the current locale. */
export const localeNames: Record<Locale, string> = { fr: "Français", en: "English" }

/** Explicit language choice (flag click). Read by middleware.ts for unprefixed URLs. */
export const LOCALE_COOKIE = "NEXT_LOCALE"
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365

export function rememberLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax`
}

export function alternatesFor(locale: Locale, path = "/") {
  return {
    canonical: localePath(locale, path),
    languages: {
      fr: localePath("fr", path),
      en: localePath("en", path),
      "x-default": localePath(defaultLocale, path),
    },
  }
}

export function formatMonth(isoMonth: string, locale: Locale): string {
  const [year, month] = isoMonth.split("-").map(Number)
  const label = new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, 1)))
  return label.charAt(0).toUpperCase() + label.slice(1)
}
