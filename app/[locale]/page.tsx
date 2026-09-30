import { notFound } from "next/navigation"
import HeroSection from "@/components/hero-section"
import FocusSection from "@/components/focus-section"
import FeaturedProject from "@/components/featured-project"
import ProjectsSection from "@/components/projects-section"
import SkillsSection from "@/components/skills-section"
import ExperienceSection from "@/components/experience-section"
import EngineeringSection from "@/components/engineering-section"
import AboutSection from "@/components/about-section"
import ContactSection from "@/components/contact-section"
import FocusMusic from "@/components/focus-music"
import { isLocale } from "@/lib/i18n"

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <main id="main" className="min-h-screen overflow-x-hidden">
      <HeroSection locale={locale} />
      <FocusSection locale={locale} />
      <FeaturedProject locale={locale} />
      <ProjectsSection locale={locale} />
      <SkillsSection locale={locale} />
      <ExperienceSection locale={locale} />
      <EngineeringSection locale={locale} />
      <AboutSection locale={locale} />
      <ContactSection locale={locale} />
      <FocusMusic locale={locale} />
    </main>
  )
}
