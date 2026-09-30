import type { ReactElement, SVGProps } from "react"
import type { Locale } from "@/content/types"

type FlagProps = SVGProps<SVGSVGElement>

export function FlagFR(props: FlagProps) {
  return (
    <svg viewBox="0 0 30 30" aria-hidden focusable="false" {...props}>
      <rect width="10" height="30" fill="#0055A4" />
      <rect x="10" width="10" height="30" fill="#FFFFFF" />
      <rect x="20" width="10" height="30" fill="#EF4135" />
    </svg>
  )
}

/** Union Jack, cropped to its centre square so it reads well inside a round button. */
export function FlagGB(props: FlagProps) {
  return (
    <svg viewBox="15 0 30 30" aria-hidden focusable="false" {...props}>
      <rect width="60" height="30" fill="#012169" />
      <path d="M0 0 L60 30 M60 0 L0 30" stroke="#FFFFFF" strokeWidth="6" />
      <path d="M0 0 L60 30 M60 0 L0 30" stroke="#C8102E" strokeWidth="2" />
      <path d="M30 0 V30 M0 15 H60" stroke="#FFFFFF" strokeWidth="10" />
      <path d="M30 0 V30 M0 15 H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  )
}

/** English is represented by the United Kingdom flag only (never the US flag), everywhere on the site. */
export const localeFlags: Record<Locale, (props: FlagProps) => ReactElement> = {
  fr: FlagFR,
  en: FlagGB,
}
