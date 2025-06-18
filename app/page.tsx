"use client"

import { useEffect } from "react"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ExperienceTimeline from "@/components/experience-timeline"
import SkillsSection from "@/components/skills-section"
import ServicesSection from "@/components/services-section"
import ProjectsSection from "@/components/projects-section"
import TestimonialsSection from "@/components/testimonials-section"
import ContactSection from "@/components/contact-section"
import FloatingElements from "@/components/floating-elements"
import AIChatbot from "@/components/ai-chatbot"
import ScrollProgress from "@/components/scroll-progress"
import { initScrollAnimations } from "@/lib/scroll-animations"
import FAQSection from "@/components/faq-section"
import BlogSection from "@/components/blog-section"
import AnimationsProvider from "@/components/animations-provider"

export default function Home() {
  useEffect(() => {
    initScrollAnimations()
  }, [])

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden relative">
      <ScrollProgress />
      <FloatingElements />
      <AnimationsProvider />

      <HeroSection />
      <AboutSection />
      <ExperienceTimeline />
      <SkillsSection />
      <ServicesSection />
      <ProjectsSection />
      {/* <TestimonialsSection /> */}
      <FAQSection />
      {/* <BlogSection /> */}
      <ContactSection />

      <AIChatbot />
    </main>
  )
}
