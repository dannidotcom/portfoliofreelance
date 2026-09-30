"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { getDictionary } from "@/content/ui"
import { localePath } from "@/lib/i18n"

export default function NotFound() {
  const pathname = usePathname() ?? "/"
  const locale = pathname.startsWith("/en") ? "en" : "fr"
  const dict = getDictionary(locale)

  return (
    <main id="main" tabIndex={-1} className="outline-none container flex min-h-[70svh] flex-col items-start justify-center gap-6 pt-24">
      <p className="label-caps">404</p>
      <h1 className="font-display text-4xl font-semibold text-champagne">{dict.notFound.title}</h1>
      <p className="text-muted-foreground">{dict.notFound.body}</p>
      <Link href={localePath(locale)} className="btn-primary">
        {dict.notFound.back}
      </Link>
    </main>
  )
}
