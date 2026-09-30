import { todoText, type Localized } from "./types"

/** 2–3 measurable outcomes per role (e.g. "p95 latency divided by 3"). Hidden while TODO. */
const impactTodo = (): Localized[] => [todoText, todoText, todoText]

export type Experience = {
  id: string
  /** ISO month, e.g. "2024-01" */
  start: string
  /** ISO month, null = current position */
  end: string | null
  company: string
  position: Localized
  location: Localized
  description: Localized
  responsibilities: Localized[]
  impact: Localized[]
  technologies: string[]
}

export const experiences: Experience[] = [
  {
    id: "visiocompte",
    start: "2026-01",
    end: null,
    company: "VISIOcompte",
    position: { fr: "AI Engineer & Data Architect", en: "AI Engineer & Data Architect" },
    location: { fr: "CDI", en: "Permanent contract" },
    description: {
      fr: "Conception et développement de solutions IA auto-hébergées (on-premise) pour logiciels métiers et environnements réglementés, avec focus sur la fiabilité, la sécurité et la conformité.",
      en: "Design and development of self-hosted (on-premise) AI solutions for business software and regulated environments, with a focus on reliability, security and compliance.",
    },
    responsibilities: [
      {
        fr: "Architecture de systèmes IA adaptés aux besoins métier",
        en: "Architecture of AI systems tailored to business needs",
      },
      {
        fr: "Conception de systèmes RAG, bases de connaissances et pipelines de vectorisation",
        en: "Design of RAG systems, knowledge bases and vectorisation pipelines",
      },
      {
        fr: "APIs IA sécurisées pour l'intégration applicative",
        en: "Secured AI APIs for application integration",
      },
      {
        fr: "Prompt engineering et routage intelligent des requêtes",
        en: "Prompt engineering and intelligent request routing",
      },
      {
        fr: "Supervision (monitoring, logs, sécurité) et optimisation des performances",
        en: "Supervision (monitoring, logs, security) and performance optimisation",
      },
    ],
    impact: impactTodo(),
    technologies: [
      "Machine Learning",
      "LLMs",
      "RAG",
      "FastAPI",
      "Docker",
      "PostgreSQL",
      "MySQL",
      "ETL / ELT",
      "Data Architecture",
    ],
  },
  {
    id: "madait",
    start: "2025-09",
    end: "2026-01",
    company: "MadaIT-Lab",
    position: { fr: "Développeur IA & Data Engineering", en: "AI Developer & Data Engineering" },
    location: { fr: "Freelance", en: "Freelance" },
    description: {
      fr: "Conception d'une application de gestion de projet en microservices, avec services IA pour l'analyse, la génération de contenu et l'assistance utilisateur.",
      en: "Design of a microservices project-management application, with AI services for analysis, content generation and user assistance.",
    },
    responsibilities: [
      {
        fr: "Services IA en Python (FastAPI) pour automatisation et assistance",
        en: "Python (FastAPI) AI services for automation and assistance",
      },
      {
        fr: "Agents intelligents pour suivi des tâches et génération de rapports PDF",
        en: "Intelligent agents for task tracking and PDF report generation",
      },
      {
        fr: "Intégration de LLMs (Llama, Mistral) via Ollama en exécution locale",
        en: "Integration of LLMs (Llama, Mistral) through Ollama, running locally",
      },
      {
        fr: "Architecture RAG avec Qdrant pour recherche sémantique",
        en: "RAG architecture with Qdrant for semantic search",
      },
      {
        fr: "Déploiement production avec Docker et pipelines CI/CD",
        en: "Production deployment with Docker and CI/CD pipelines",
      },
    ],
    impact: impactTodo(),
    technologies: ["Python", "FastAPI", "LangChain", "LangGraph", "Qdrant", "Pgvector", "Docker", "Transformers", "Ollama"],
  },
  {
    id: "quark",
    start: "2025-02",
    end: "2025-10",
    company: "Quark développement",
    position: {
      fr: "Développeur Python IA — APIs, LLMs & DevOps",
      en: "Python AI Developer — APIs, LLMs & DevOps",
    },
    location: { fr: "Freelance", en: "Freelance" },
    description: {
      fr: "Solutions logicielles sur mesure combinant Python, IA et automatisation web pour l'exploitation des données et l'optimisation des processus métiers.",
      en: "Custom software combining Python, AI and web automation to exploit data and optimise business processes.",
    },
    responsibilities: [
      {
        fr: "APIs performantes pour orchestrer des traitements complexes",
        en: "High-performance APIs orchestrating complex processing",
      },
      {
        fr: "Agents IA autonomes avec LangChain et outils externes",
        en: "Autonomous AI agents with LangChain and external tools",
      },
      {
        fr: "Extraction de données web pour alimenter des bases de connaissance",
        en: "Web data extraction feeding knowledge bases",
      },
      {
        fr: "Assistants IA et moteurs de recherche sémantique (RAG)",
        en: "AI assistants and semantic search engines (RAG)",
      },
      {
        fr: "Architectures conteneurisées et CI/CD (GitHub Actions)",
        en: "Containerised architectures and CI/CD (GitHub Actions)",
      },
    ],
    impact: impactTodo(),
    technologies: ["Python", "FastAPI", "LangChain", "LLMs", "RAG", "Qdrant", "PostgreSQL", "Docker", "Redis", "GitHub Actions"],
  },
  {
    id: "advences",
    start: "2024-01",
    end: "2025-01",
    company: "Advences (Primanet)",
    position: { fr: "Développeur Python / Odoo", en: "Python / Odoo Developer" },
    location: { fr: "Madagascar", en: "Madagascar" },
    description: {
      fr: "Conception et développement de modules Odoo personnalisés pour automatiser les processus métier, avec intégration d'API et capacités IA.",
      en: "Design and development of custom Odoo modules automating business processes, with API integration and AI capabilities.",
    },
    responsibilities: [
      {
        fr: "Modules Odoo personnalisés (vues, workflows, rapports)",
        en: "Custom Odoo modules (views, workflows, reports)",
      },
      {
        fr: "API RESTful pour connecter Odoo à des modèles d'IA externes",
        en: "RESTful API connecting Odoo to external AI models",
      },
      {
        fr: "Scripts Python de nettoyage et enrichissement de données",
        en: "Python scripts for data cleaning and enrichment",
      },
      {
        fr: "Support utilisateurs et formation des équipes internes",
        en: "User support and internal team training",
      },
      {
        fr: "Migration et adaptation lors des changements de version",
        en: "Migration and adaptation across version upgrades",
      },
    ],
    impact: impactTodo(),
    technologies: ["Python", "Odoo", "Django REST Framework", "Docker", "JavaScript", "PostgreSQL", "OWL", "QWeb"],
  },
  {
    id: "aro",
    start: "2023-07",
    end: "2023-12",
    company: "Assurance ARO",
    position: { fr: "Développeur Python / Django (Stage)", en: "Python / Django Developer (Internship)" },
    location: { fr: "Madagascar", en: "Madagascar" },
    description: {
      fr: "Développement d'une API RESTful pour intégrer les paiements entre le mobile banking et l'assurance ARO en temps réel.",
      en: "Development of a RESTful API integrating real-time payments between mobile banking and ARO insurance.",
    },
    responsibilities: [
      {
        fr: "Communication sécurisée entre ARO et opérateurs Mobile Money",
        en: "Secure communication between ARO and Mobile Money operators",
      },
      {
        fr: "Visualisation instantanée des paiements pour les agents",
        en: "Instant payment visibility for agents",
      },
      {
        fr: "Réduction des erreurs et délais liés à l'intégration des paiements",
        en: "Fewer errors and delays in payment integration",
      },
      {
        fr: "Module de gestion des utilisateurs, rôles et autorisations",
        en: "User, role and permission management module",
      },
    ],
    impact: impactTodo(),
    technologies: ["Python", "Django", "Django REST Framework", "PostgreSQL", "JavaScript", "REST API"],
  },
  {
    id: "andine",
    start: "2022-03",
    end: "2023-06",
    company: "ANDINE Groupe",
    position: { fr: "Développeur Django / React", en: "Django / React Developer" },
    location: { fr: "Madagascar", en: "Madagascar" },
    description: {
      fr: "Développement d'applications web de l'analyse du besoin jusqu'à la mise en production, en collaboration avec les équipes projet.",
      en: "Web application development from requirements analysis to production, working with project teams.",
    },
    responsibilities: [
      {
        fr: "Recueil des besoins fonctionnels et techniques",
        en: "Gathering functional and technical requirements",
      },
      {
        fr: "Optimisation des performances et de la sécurité",
        en: "Performance and security optimisation",
      },
      { fr: "Interfaces modernes selon standards UX/UI", en: "Modern interfaces following UX/UI standards" },
      { fr: "Correction de bugs et amélioration continue", en: "Bug fixing and continuous improvement" },
    ],
    impact: impactTodo(),
    technologies: ["Python", "Django", "PostgreSQL", "React", "Redux", "Docker", "CI/CD", "Agile / Scrum"],
  },
]
