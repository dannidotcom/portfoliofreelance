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
    skills: [
      "Python",
      "FastAPI",
      "Django",
      "REST APIs",
      "Microservices",
      "PostgreSQL",
      "Redis",
      "TypeScript",
      "Next.js",
    ],
  },
  {
    id: "infra",
    title: "Infrastructure",
    skills: [
      "Docker",
      "Linux",
      "CI/CD",
      "GitHub Actions",
      "vLLM",
      "GPU inference",
      "Nginx",
      "Monitoring",
    ],
  },
  {
    id: "data",
    title: "Data",
    skills: [
      "PostgreSQL",
      "Qdrant",
      "Pgvector",
      "Vector databases",
      "ETL / ELT",
      "Pandas",
      "Data pipelines",
    ],
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

export const engineeringSteps = [
  { label: "Problem", detail: "Cadrage métier & contraintes" },
  { label: "Architecture", detail: "Design système & données" },
  { label: "Development", detail: "APIs, services, UI" },
  { label: "AI Integration", detail: "LLM, RAG, agents" },
  { label: "Testing", detail: "Qualité & isolation" },
  { label: "Deployment", detail: "Docker, CI/CD, on-prem" },
  { label: "Monitoring", detail: "Perf, logs, sécurité" },
] as const
