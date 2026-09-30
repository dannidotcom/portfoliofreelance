export const locales = ["fr", "en"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "fr"

/**
 * Placeholder for any fact that still has to be provided by the owner.
 * Values equal to TODO are never rendered in production (see lib/todo.ts).
 */
export const TODO = "TODO" as const
export type Todo = typeof TODO

export type Localized = { fr: string; en: string }

export const todoText: Localized = { fr: TODO, en: TODO }
