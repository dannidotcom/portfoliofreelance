export type Experience = {
  id: string
  period: string
  company: string
  position: string
  location: string
  description: string
  responsibilities: string[]
  technologies: string[]
  current: boolean
}

export const experiences: Experience[] = [
  {
    id: "visiocompte",
    period: "Janvier 2026 — Aujourd'hui",
    company: "VISIOcompte",
    position: "AI Engineer & Data Architect",
    location: "CDI",
    description:
      "Conception et développement de solutions IA auto-hébergées (on-premise) pour logiciels métiers et environnements réglementés, avec focus sur la fiabilité, la sécurité et la conformité.",
    responsibilities: [
      "Architecture de systèmes IA adaptés aux besoins métier",
      "Conception de systèmes RAG, bases de connaissances et pipelines de vectorisation",
      "APIs IA sécurisées pour l'intégration applicative",
      "Prompt engineering et routage intelligent des requêtes",
      "Supervision (monitoring, logs, sécurité) et optimisation des performances",
    ],
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
    current: true,
  },
  {
    id: "madait",
    period: "Septembre 2025 — Janvier 2026",
    company: "MadaIT-Lab",
    position: "Développeur IA & Data Engineering",
    location: "Freelance",
    description:
      "Conception d'une application de gestion de projet en microservices, avec services IA pour l'analyse, la génération de contenu et l'assistance utilisateur.",
    responsibilities: [
      "Services IA en Python (FastAPI) pour automatisation et assistance",
      "Agents intelligents pour suivi des tâches et génération de rapports PDF",
      "Intégration de LLMs (Llama, Mistral) via Ollama en exécution locale",
      "Architecture RAG avec Qdrant pour recherche sémantique",
      "Déploiement production avec Docker et pipelines CI/CD",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "LangChain",
      "LangGraph",
      "Qdrant",
      "Pgvector",
      "Docker",
      "Transformers",
      "Ollama",
    ],
    current: false,
  },
  {
    id: "quark",
    period: "Février 2025 — Octobre 2025",
    company: "Quark développement",
    position: "Développeur Python IA — APIs, LLMs & DevOps",
    location: "Freelance",
    description:
      "Solutions logicielles sur mesure combinant Python, IA et automatisation web pour l'exploitation des données et l'optimisation des processus métiers.",
    responsibilities: [
      "APIs performantes pour orchestrer des traitements complexes",
      "Agents IA autonomes avec LangChain et outils externes",
      "Extraction de données web pour alimenter des bases de connaissance",
      "Assistants IA et moteurs de recherche sémantique (RAG)",
      "Architectures conteneurisées et CI/CD (GitHub Actions)",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "LangChain",
      "LLMs",
      "RAG",
      "Qdrant",
      "PostgreSQL",
      "Docker",
      "Redis",
      "GitHub Actions",
    ],
    current: false,
  },
  {
    id: "advences",
    period: "Janvier 2024 — Janvier 2025",
    company: "Advences (Primanet)",
    position: "Développeur Python / Odoo",
    location: "Madagascar",
    description:
      "Conception et développement de modules Odoo personnalisés pour automatiser les processus métier, avec intégration d'API et capacités IA.",
    responsibilities: [
      "Modules Odoo personnalisés (vues, workflows, rapports)",
      "API RESTful pour connecter Odoo à des modèles d'IA externes",
      "Scripts Python de nettoyage et enrichissement de données",
      "Support utilisateurs et formation des équipes internes",
      "Migration et adaptation lors des changements de version",
    ],
    technologies: [
      "Python",
      "Odoo",
      "Django REST Framework",
      "Docker",
      "JavaScript",
      "PostgreSQL",
      "OWL",
      "QWeb",
    ],
    current: false,
  },
  {
    id: "aro",
    period: "Juillet 2023 — Décembre 2023",
    company: "Assurance ARO",
    position: "Développeur Python / Django (Stage)",
    location: "Madagascar",
    description:
      "Développement d'une API RESTful pour intégrer les paiements entre le mobile banking et l'assurance ARO en temps réel.",
    responsibilities: [
      "Communication sécurisée entre ARO et opérateurs Mobile Money",
      "Visualisation instantanée des paiements pour les agents",
      "Réduction des erreurs et délais liés à l'intégration des paiements",
      "Module de gestion des utilisateurs, rôles et autorisations",
    ],
    technologies: [
      "Python",
      "Django",
      "Django REST Framework",
      "PostgreSQL",
      "JavaScript",
      "REST API",
    ],
    current: false,
  },
  {
    id: "andine",
    period: "Mars 2022 — Juin 2023",
    company: "ANDINE Groupe",
    position: "Développeur Django / React",
    location: "Madagascar",
    description:
      "Développement d'applications web de l'analyse du besoin jusqu'à la mise en production, en collaboration avec les équipes projet.",
    responsibilities: [
      "Recueil des besoins fonctionnels et techniques",
      "Optimisation des performances et de la sécurité",
      "Interfaces modernes selon standards UX/UI",
      "Correction de bugs et amélioration continue",
    ],
    technologies: [
      "Python",
      "Django",
      "PostgreSQL",
      "React",
      "Redux",
      "Docker",
      "CI/CD",
      "Agile / Scrum",
    ],
    current: false,
  },
]
