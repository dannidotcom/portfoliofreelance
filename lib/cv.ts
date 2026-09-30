import { profile } from "@/content/profile"
import type { Locale } from "@/content/types"
import { isTodo } from "@/lib/todo"

/** Falls back to the French CV while the localized one is not provided. */
export function cvUrl(locale: Locale): string {
  const url = profile.cv[locale]
  return isTodo(url) ? profile.cv.fr : url
}
