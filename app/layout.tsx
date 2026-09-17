import type React from "react"
import type { Metadata } from "next"
import { Syne, Manrope } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"

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

export const metadata: Metadata = {
  metadataBase: new URL("https://danni-alphonse.vercel.app"),
  title: "Donné Alphonse SOLOFONDRAIBE — AI Engineer & Software Developer",
  description:
    "AI Engineer & Software Developer spécialisé en systèmes IA souverains, RAG, LLM, APIs FastAPI et architectures backend prêtes pour la production.",
  keywords: [
    "AI Engineer",
    "Software Developer",
    "RAG",
    "LLM",
    "FastAPI",
    "Donné Alphonse SOLOFONDRAIBE",
  ],
  authors: [{ name: "Donné Alphonse SOLOFONDRAIBE" }],
  openGraph: {
    title: "Donné Alphonse SOLOFONDRAIBE — AI Engineer & Software Developer",
    description:
      "Systèmes d'IA fiables, souverains et orientés production — RAG, LLM, backend et infrastructure.",
    url: "https://danni-alphonse.vercel.app",
    siteName: "Donné Alphonse SOLOFONDRAIBE",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/images/profile.png",
        width: 500,
        height: 600,
        alt: "Donné Alphonse SOLOFONDRAIBE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Donné Alphonse SOLOFONDRAIBE — AI Engineer & Software Developer",
    description:
      "Systèmes d'IA fiables, souverains et orientés production — RAG, LLM, backend et infrastructure.",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/images/favicon.png",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="dark" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#070b12" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Donné Alphonse SOLOFONDRAIBE",
              jobTitle: "AI Engineer & Software Developer",
              email: "mailto:alphonse.danni@gmail.com",
              telephone: "+261387217907",
              url: "https://danni-alphonse.vercel.app",
              sameAs: ["https://github.com/dannidotcom"],
              knowsAbout: [
                "Artificial Intelligence",
                "RAG",
                "Large Language Models",
                "FastAPI",
                "Backend Engineering",
                "Vector Databases",
              ],
            }),
          }}
        />
      </head>
      <body className={`${display.variable} ${sans.variable} font-sans`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
