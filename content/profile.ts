import { TODO, type Localized, type Todo } from "./types"

export const siteUrl = "https://danni-alphonse.vercel.app"

export type Metric = {
  id: string
  value: string | Todo
  label: Localized
}

export const profile = {
  fullName: "Donné Alphonse SOLOFONDRAIBE",
  shortName: "Donné Alphonse",
  title: "Python Developer · Data Architect · AI Engineer",
  tagline: {
    fr: "Je conçois des plateformes de données et des systèmes d'IA fiables, de l'ingestion au serving LLM.",
    en: "I design reliable data platforms and AI systems, from ingestion to LLM serving.",
  } satisfies Localized,
  location: {
    fr: "Madagascar · Remote disponible",
    en: "Madagascar · Available remotely",
  } satisfies Localized,
  countryCode: "MG",
  email: "alphonse.danni@gmail.com",
  phone: "+261 38 72 179 07",
  github: "https://github.com/dannidotcom",
  githubUser: "dannidotcom",
  linkedin: TODO as string | Todo,
  cv: {
    fr: "/cv-fr.pdf",
    /** Drop the English PDF at public/cv-en.pdf, then set "/cv-en.pdf". Falls back to the French CV. */
    en: TODO as string | Todo,
  },
  about: [
    {
      fr: "Software Engineer spécialisé en Machine Learning et IA, avec plus de 4 ans d'expérience en développement backend. Je construis des API performantes, des pipelines de données et des services IA déployables avec Docker, CI/CD et une architecture pensée pour la production.",
      en: "Software engineer specialised in machine learning and AI, with more than 4 years of backend development experience. I build high-performance APIs, data pipelines and AI services shipped with Docker, CI/CD and a production-minded architecture.",
    },
    {
      fr: "Mon travail actuel porte sur des moteurs IA auto-hébergés (RAG, LLM, isolation multi-tenant, sécurité) intégrés à des logiciels métiers réglementés. Je privilégie la fiabilité, la clarté d'architecture et des livrables mesurables plutôt que des prototypes jetables.",
      en: "My current work focuses on self-hosted AI engines (RAG, LLMs, multi-tenant isolation, security) integrated into regulated business software. I favour reliability, clear architecture and measurable deliverables over throwaway prototypes.",
    },
  ] satisfies Localized[],
  focusAreas: [
    "Python Engineering",
    "Data Architecture",
    "Data Engineering · ETL / ELT",
    "Data pipelines",
    "LLM / Generative AI",
    "RAG",
    "AI Infrastructure",
    "Backend Engineering",
    "API / Microservices",
    "PostgreSQL",
    "Vector Databases",
    "Docker",
    "Security",
  ],
  education: [
    {
      degree: {
        fr: "Master en Informatique — Management des Systèmes d'Information",
        en: "Master's degree in Computer Science — Information Systems Management",
      },
      school: "E-media Madagascar",
    },
    {
      degree: {
        fr: "Licence en Informatique — Développement d'Applications Internet / Intranet",
        en: "Bachelor's degree in Computer Science — Internet / Intranet Application Development",
      },
      school: "EMIT",
    },
  ] satisfies { degree: Localized; school: string }[],
  languages: [
    { fr: "Français", en: "French" },
    { fr: "Anglais technique", en: "Technical English" },
  ] satisfies Localized[],
  knowsAbout: [
    "Python",
    "Data Architecture",
    "Data Engineering",
    "ETL/ELT",
    "Data pipelines",
    "Retrieval-Augmented Generation (RAG)",
    "Large Language Models",
    "FastAPI",
    "PostgreSQL",
    "Vector databases",
    "Docker",
    "Multi-tenant security",
  ],
  /** Hero metrics — entries whose value is TODO are hidden automatically. */
  metrics: [
    { id: "years", value: "4+", label: { fr: "années d'expérience", en: "years of experience" } },
    { id: "production", value: TODO, label: { fr: "projets en production", en: "projects in production" } },
    { id: "services", value: TODO, label: { fr: "APIs / services IA livrés", en: "AI APIs / services shipped" } },
    { id: "documents", value: TODO, label: { fr: "documents indexés (RAG)", en: "documents indexed (RAG)" } },
  ] satisfies Metric[],
}
