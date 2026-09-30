import type React from "react"
import type { Metadata, Viewport } from "next"
import { notFound } from "next/navigation"
import { Syne, Manrope } from "next/font/google"
import "../globals.css"
import Header, { type HeaderPalette } from "@/components/header"
import Footer from "@/components/footer"
import { locales, type Locale } from "@/content/types"
import { publishedNotes } from "@/content/notes"
import { profile, siteUrl } from "@/content/profile"
import { projects } from "@/content/projects"
import { getDictionary } from "@/content/ui"
import { cvFileName, cvUrl } from "@/lib/cv"
import { alternatesFor, isLocale, localePath, ogLocale } from "@/lib/i18n"
import { caseStudyPath } from "@/lib/routes"
import { isShown } from "@/lib/todo"

const display = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "800"],
})

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export const viewport: Viewport = {
  themeColor: "#070b12",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

const siteTitle = `${profile.fullName} — ${profile.title}`

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)

  return {
    metadataBase: new URL(siteUrl),
    title: { default: siteTitle, template: `%s — ${profile.shortName}` },
    description: dict.meta.description,
    keywords: [
      "Python Developer",
      "Data Architect",
      "Data Architecture",
      "Data Engineering",
      "Data Engineer",
      "AI Engineer",
      "ETL",
      "ELT",
      "ETL/ELT",
      "Data pipelines",
      "RAG",
      "LLM",
      "FastAPI",
      "PostgreSQL",
      "Qdrant",
      "Vector databases",
      profile.fullName,
    ],
    authors: [{ name: profile.fullName, url: siteUrl }],
    creator: profile.fullName,
    alternates: alternatesFor(locale),
    openGraph: {
      title: siteTitle,
      description: dict.meta.ogDescription,
      url: alternatesFor(locale).canonical,
      siteName: profile.fullName,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: dict.meta.ogDescription,
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/images/favicon.png",
    },
  }
}

function personJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    jobTitle: profile.title,
    description: profile.tagline[locale],
    email: `mailto:${profile.email}`,
    telephone: profile.phone.replace(/\s/g, ""),
    url: siteUrl,
    image: `${siteUrl}/images/profile.png`,
    address: { "@type": "PostalAddress", addressCountry: profile.countryCode },
    sameAs: [profile.github, profile.linkedin].filter((url) => isShown(url)),
    knowsAbout: profile.knowsAbout,
    alumniOf: profile.education.map((edu) => ({ "@type": "EducationalOrganization", name: edu.school })),
    knowsLanguage: ["fr", "en"],
  }
}

function paletteData(locale: Locale): HeaderPalette {
  const home = localePath(locale)
  return {
    projects: projects.map((project) => ({
      slug: project.slug,
      title: project.title[locale],
      href: project.caseStudy ? localePath(locale, caseStudyPath(project.slug)) : `${home}#project-${project.slug}`,
      caseStudy: Boolean(project.caseStudy),
      keywords: project.technologies.join(" "),
    })),
    cv: { href: cvUrl(locale), fileName: cvFileName(locale) },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)

  return (
    <html lang={locale} className="dark" suppressHydrationWarning>
      <body className={`${display.variable} ${sans.variable} font-sans`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(locale)) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
        >
          {dict.a11y.skipToContent}
        </a>
        <Header locale={locale} showNotes={publishedNotes().length > 0} palette={paletteData(locale)} />
        {children}
        <Footer locale={locale} />
      </body>
    </html>
  )
}
