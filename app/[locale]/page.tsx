import { notFound } from "next/navigation"
import HeroSection from "@/components/hero-section"
import FocusSection from "@/components/focus-section"
import FeaturedProject from "@/components/featured-project"
import ArchitectureSection from "@/components/architecture-section"
import ProjectsSection from "@/components/projects-section"
import SkillsSection from "@/components/skills-section"
import ExperienceSection from "@/components/experience-section"
import GithubSection from "@/components/github-section"
import EngineeringSection from "@/components/engineering-section"
import AboutSection from "@/components/about-section"
import ContactSection from "@/components/contact-section"
import FocusMusic from "@/components/focus-music"
import { isLocale } from "@/lib/i18n"

export const revalidate = 3600

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <main id="main" tabIndex={-1} className="outline-none min-h-screen overflow-x-hidden">
      <HeroSection locale={locale} />
      <FocusSection locale={locale} />
      <FeaturedProject locale={locale} />
      <ArchitectureSection locale={locale} index="03" />
      <ProjectsSection locale={locale} index="04" />
      <SkillsSection locale={locale} index="05" />
      <ExperienceSection locale={locale} index="06" />
      <GithubSection locale={locale} index="07" />
      <EngineeringSection locale={locale} index="08" />
      <AboutSection locale={locale} index="09" />
      <ContactSection locale={locale} index="10" />
      <FocusMusic locale={locale} />
    </main>
  )
}
