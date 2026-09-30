import { TODO, type Localized, type Todo } from "@/content/types"

/** Preview mode: `NEXT_PUBLIC_SHOW_TODOS=1 next dev` renders TODO placeholders. Never active in production builds. */
export const SHOW_TODOS = process.env.NODE_ENV !== "production" && process.env.NEXT_PUBLIC_SHOW_TODOS === "1"

function isLocalized(value: unknown): value is Localized {
  return typeof value === "object" && value !== null && "fr" in value && "en" in value
}

export function isTodo(value: unknown): boolean {
  if (value === TODO) return true
  if (isLocalized(value)) return value.fr === TODO || value.en === TODO
  return false
}

export function isShown<T>(value: T): value is Exclude<T, Todo> {
  return SHOW_TODOS || !isTodo(value)
}

export function shown<T>(items: readonly T[], pick: (item: T) => unknown = (item) => item): T[] {
  return items.filter((item) => SHOW_TODOS || !isTodo(pick(item)))
}
