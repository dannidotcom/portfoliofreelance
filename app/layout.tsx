import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import MobileTouchHelper from "@/components/mobile-touch-helper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Donné Alphonse SOLOFONDRAIBE | Expert IA & Développement",
  icons: {
    icon: "/favicon.ico",              // pour navigateur
    shortcut: "/favicon.ico",          // pour raccourcis
    apple: "/favicon.png"              // pour Apple Touch icon
  },
  description:
    "Développeur Fullstack Python spécialisé en IA et automatisation. Transformez vos données en solutions concrètes avec l'intelligence artificielle.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Donné Alphonse - Expert IA",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="dark" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#667eea" />
      </head>
      <body className={inter.className}>
        <MobileTouchHelper />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
