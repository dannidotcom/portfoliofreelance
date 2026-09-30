import { profile } from "@/content/profile"
import type { Locale } from "@/content/types"
import { isTodo } from "@/lib/todo"

/** Language of the CV actually served: falls back to French while the localized one is not provided. */
function cvLocale(locale: Locale): Locale {
  return isTodo(profile.cv[locale]) ? "fr" : locale
}

export function cvUrl(locale: Locale): string {
  return profile.cv[cvLocale(locale)] as string
}

export function cvFileName(locale: Locale): string {
  return `CV-Donne-Alphonse-Solofondraibe-${cvLocale(locale).toUpperCase()}.pdf`
}
