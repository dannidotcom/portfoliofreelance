import type { MetadataRoute } from "next"
import { locales } from "@/content/types"
import { siteUrl } from "@/content/profile"
import { localePath } from "@/lib/i18n"
import { publicPaths } from "@/lib/routes"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return publicPaths().flatMap((path) =>
    locales.map((locale) => ({
      url: `${siteUrl}${localePath(locale, path)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${siteUrl}${localePath(l, path)}`])),
      },
    })),
  )
}
