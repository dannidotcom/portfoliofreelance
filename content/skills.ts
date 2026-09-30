import type { Localized } from "./types"

export type SkillCategory = {
  id: string
  title: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: "ai",
    title: "AI & Machine Learning",
    skills: [
      "LLMs",
      "RAG",
      "Embeddings",
      "Prompt engineering",
      "LangChain",
      "LangGraph",
      "Transformers",
      "SpaCy",
      "Ollama",
      "Llama / Mistral",
      "OpenAI API",
      "Inference",
    ],
  },
  {
    id: "backend",
    title: "Backend",
    skills: ["Python", "FastAPI", "Django", "REST APIs", "Microservices", "PostgreSQL", "Redis", "TypeScript", "Next.js"],
  },
  {
    id: "infra",
    title: "Infrastructure",
    skills: ["Docker", "Linux", "CI/CD", "GitHub Actions", "vLLM", "GPU inference", "Nginx", "Monitoring"],
  },
  {
    id: "data",
    title: "Data",
    skills: ["PostgreSQL", "Qdrant", "Pgvector", "Vector databases", "ETL / ELT", "Pandas", "Data pipelines"],
  },
  {
    id: "security",
    title: "Security",
    skills: [
      "JWT",
      "Authentication",
      "Authorization",
      "Multi-tenant isolation",
      "API security",
      "SSO / token exchange",
    ],
  },
]

export const engineeringSteps: { label: Localized; detail: Localized }[] = [
  {
    label: { fr: "Problème", en: "Problem" },
    detail: { fr: "Cadrage métier & contraintes", en: "Business framing & constraints" },
  },
  {
    label: { fr: "Architecture", en: "Architecture" },
    detail: { fr: "Design système & données", en: "System & data design" },
  },
  {
    label: { fr: "Développement", en: "Development" },
    detail: { fr: "APIs, services, UI", en: "APIs, services, UI" },
  },
  {
    label: { fr: "Intégration IA", en: "AI Integration" },
    detail: { fr: "LLM, RAG, agents", en: "LLM, RAG, agents" },
  },
  { label: { fr: "Tests", en: "Testing" }, detail: { fr: "Qualité & isolation", en: "Quality & isolation" } },
  {
    label: { fr: "Déploiement", en: "Deployment" },
    detail: { fr: "Docker, CI/CD, on-prem", en: "Docker, CI/CD, on-prem" },
  },
  {
    label: { fr: "Monitoring", en: "Monitoring" },
    detail: { fr: "Perf, logs, sécurité", en: "Performance, logs, security" },
  },
]
