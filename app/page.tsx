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

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <HeroSection />
      <FocusSection />
      <FeaturedProject />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <EngineeringSection />
      <AboutSection />
      <ContactSection />
      <FocusMusic />
    </main>
  )
}
