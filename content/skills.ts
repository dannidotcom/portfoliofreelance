import { experiences } from "./experience"
import { projects } from "./projects"
import { TODO, type Localized, type Todo } from "./types"

export type SkillLevel = "production" | "solid" | "growing"

export type SkillRef = { type: "experience"; id: string } | { type: "project"; slug: string }

export type Skill = {
  id: string
  label: string
  /** Technology names matched against experience / project technology lists. */
  aliases: string[]
  /** Extra references backed by the text of an experience or project. */
  extraRefs?: SkillRef[]
  level: SkillLevel | Todo
}

export type SkillDomain = {
  id: string
  title: Localized
  description: Localized
  skills: Skill[]
}

const exp = (id: string): SkillRef => ({ type: "experience", id })
const proj = (slug: string): SkillRef => ({ type: "project", slug })

export const skillDomains: SkillDomain[] = [
  {
    id: "python",
    title: { fr: "Python Engineering", en: "Python Engineering" },
    description: {
      fr: "APIs, services backend et intégrations métier en Python.",
      en: "APIs, backend services and business integrations in Python.",
    },
    skills: [
      { id: "python", label: "Python", aliases: ["Python"], extraRefs: [exp("visiocompte")], level: TODO },
      { id: "fastapi", label: "FastAPI", aliases: ["FastAPI"], level: TODO },
      { id: "django", label: "Django", aliases: ["Django"], level: TODO },
      { id: "drf", label: "Django REST Framework", aliases: ["Django REST Framework"], level: TODO },
      {
        id: "rest",
        label: "REST APIs",
        aliases: ["REST API", "REST APIs"],
        extraRefs: [exp("advences")],
        level: TODO,
      },
      { id: "microservices", label: "Microservices", aliases: ["Microservices"], extraRefs: [exp("madait")], level: TODO },
      { id: "odoo", label: "Odoo", aliases: ["Odoo"], level: TODO },
    ],
  },
  {
    id: "data-engineering",
    title: { fr: "Data Engineering", en: "Data Engineering" },
    description: {
      fr: "Ingestion, transformation et pipelines de données de la source au stockage.",
      en: "Ingestion, transformation and data pipelines from source to storage.",
    },
    skills: [
      { id: "etl", label: "ETL / ELT", aliases: ["ETL / ELT"], level: TODO },
      {
        id: "pipelines",
        label: "Data pipelines",
        aliases: [],
        extraRefs: [exp("visiocompte"), proj("ai-data-scraping-agent")],
        level: TODO,
      },
      { id: "pandas", label: "Pandas", aliases: ["Pandas"], level: TODO },
      {
        id: "scraping",
        label: "Web scraping",
        aliases: ["SeleniumBase"],
        extraRefs: [exp("quark")],
        level: TODO,
      },
    ],
  },
  {
    id: "data-architecture",
    title: { fr: "Data Architecture", en: "Data Architecture" },
    description: {
      fr: "Modélisation et choix de stockage : relationnel, vectoriel et cache.",
      en: "Modelling and storage choices: relational, vector and cache.",
    },
    skills: [
      { id: "data-architecture", label: "Data Architecture", aliases: ["Data Architecture"], level: TODO },
      { id: "postgresql", label: "PostgreSQL", aliases: ["PostgreSQL"], level: TODO },
      { id: "mysql", label: "MySQL", aliases: ["MySQL"], level: TODO },
      { id: "qdrant", label: "Qdrant", aliases: ["Qdrant"], level: TODO },
      { id: "pgvector", label: "pgvector", aliases: ["Pgvector", "pgvector"], level: TODO },
      { id: "vector-db", label: "Vector databases", aliases: ["Qdrant", "Pgvector"], level: TODO },
      { id: "redis", label: "Redis", aliases: ["Redis"], level: TODO },
    ],
  },
  {
    id: "ai",
    title: { fr: "AI / LLM Engineering", en: "AI / LLM Engineering" },
    description: {
      fr: "RAG, agents, intégration et service de modèles de langage.",
      en: "RAG, agents, language model integration and serving.",
    },
    skills: [
      { id: "llm", label: "LLMs", aliases: ["LLMs", "LLM"], level: TODO },
      { id: "rag", label: "RAG", aliases: ["RAG"], level: TODO },
      {
        id: "embeddings",
        label: "Embeddings",
        aliases: [],
        extraRefs: [exp("visiocompte"), proj("ai-data-scraping-agent")],
        level: TODO,
      },
      { id: "prompt", label: "Prompt engineering", aliases: [], extraRefs: [exp("visiocompte")], level: TODO },
      {
        id: "agents",
        label: "AI agents",
        aliases: [],
        extraRefs: [exp("madait"), exp("quark"), proj("ai-data-scraping-agent")],
        level: TODO,
      },
      { id: "streaming", label: "LLM streaming", aliases: ["Streaming"], level: TODO },
      { id: "langchain", label: "LangChain", aliases: ["LangChain"], level: TODO },
      { id: "langgraph", label: "LangGraph", aliases: ["LangGraph"], level: TODO },
      { id: "vllm", label: "vLLM", aliases: ["vLLM"], level: TODO },
      { id: "ollama", label: "Ollama", aliases: ["Ollama"], level: TODO },
      { id: "llama-mistral", label: "Llama / Mistral", aliases: [], extraRefs: [exp("madait")], level: TODO },
      { id: "openai", label: "OpenAI API", aliases: ["GPT-4"], level: TODO },
      { id: "transformers", label: "Transformers", aliases: ["Transformers"], level: TODO },
      { id: "spacy", label: "SpaCy", aliases: ["SpaCy"], level: TODO },
      { id: "ml", label: "Machine Learning", aliases: ["Machine Learning"], level: TODO },
    ],
  },
  {
    id: "platform",
    title: { fr: "Platform / DevOps", en: "Platform / DevOps" },
    description: {
      fr: "Conteneurisation, CI/CD, déploiement et supervision.",
      en: "Containerisation, CI/CD, deployment and supervision.",
    },
    skills: [
      { id: "docker", label: "Docker", aliases: ["Docker"], level: TODO },
      { id: "cicd", label: "CI/CD", aliases: ["CI/CD"], extraRefs: [exp("madait"), exp("quark")], level: TODO },
      { id: "github-actions", label: "GitHub Actions", aliases: ["GitHub Actions"], level: TODO },
      { id: "linux", label: "Linux", aliases: ["Linux"], level: TODO },
      { id: "nginx", label: "Nginx", aliases: ["Nginx"], level: TODO },
      { id: "gpu", label: "GPU inference", aliases: [], level: TODO },
      { id: "monitoring", label: "Monitoring", aliases: ["Monitoring"], extraRefs: [exp("visiocompte")], level: TODO },
    ],
  },
  {
    id: "security",
    title: { fr: "Security", en: "Security" },
    description: {
      fr: "Authentification, autorisations et isolation des données.",
      en: "Authentication, authorisation and data isolation.",
    },
    skills: [
      { id: "jwt", label: "JWT", aliases: ["JWT"], level: TODO },
      {
        id: "authn",
        label: "Authentication",
        aliases: [],
        extraRefs: [proj("sovereign-ai-engine")],
        level: TODO,
      },
      { id: "authz", label: "Authorization", aliases: [], extraRefs: [exp("aro"), proj("sovereign-ai-engine")], level: TODO },
      {
        id: "multi-tenant",
        label: "Multi-tenant isolation",
        aliases: [],
        extraRefs: [proj("sovereign-ai-engine")],
        level: TODO,
      },
      {
        id: "api-security",
        label: "API security",
        aliases: [],
        extraRefs: [exp("visiocompte"), exp("aro"), proj("sovereign-ai-engine")],
        level: TODO,
      },
      { id: "sso", label: "SSO / token exchange", aliases: [], level: TODO },
    ],
  },
]

export const allSkills: Skill[] = skillDomains.flatMap((domain) => domain.skills)

function normalize(value: string) {
  return value.trim().toLowerCase()
}

/** Skill ids matching a technology name as written in experiences / projects. */
export function skillIdsForTech(tech: string): string[] {
  const key = normalize(tech)
  return allSkills
    .filter((skill) => skill.id !== "vector-db" && skill.aliases.some((alias) => normalize(alias) === key))
    .map((skill) => skill.id)
}

export function skillRefs(skill: Skill): SkillRef[] {
  const aliases = skill.aliases.map(normalize)
  const matches = (technologies: string[]) => technologies.some((tech) => aliases.includes(normalize(tech)))
  const refs: SkillRef[] = [
    ...experiences.filter((e) => matches(e.technologies)).map((e) => exp(e.id)),
    ...projects.filter((p) => matches(p.technologies)).map((p) => proj(p.slug)),
    ...(skill.extraRefs ?? []),
  ]
  const seen = new Set<string>()
  return refs.filter((ref) => {
    const key = ref.type === "experience" ? `e:${ref.id}` : `p:${ref.slug}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

/**
 * Not rendered. Data skills worth adding to the site only if actually used in production.
 * Items marked "cv" already appear in the current PDF resume but not on the website.
 */
export const candidateSkills: { area: string; items: string[] }[] = [
  { area: "Orchestration", items: ["Airflow (cv)", "Dagster", "Prefect"] },
  { area: "Distributed processing", items: ["PySpark (cv)", "Polars", "DuckDB"] },
  { area: "Transformation & modelling", items: ["dbt", "Kimball / star schema", "Data Vault", "SCD"] },
  { area: "Data quality", items: ["Great Expectations", "Pandera", "Soda", "data contracts"] },
  { area: "Warehouses & lakehouse", items: ["BigQuery", "Snowflake", "ClickHouse", "Delta Lake / Iceberg"] },
  { area: "Legacy ETL / BI", items: ["Talend (cv)", "SSIS / SSRS / SSMS (cv)", "Power BI (cv)"] },
  { area: "Streaming & CDC", items: ["Kafka", "Redpanda", "Debezium"] },
  { area: "Databases", items: ["SQL Server (cv)", "MongoDB / NoSQL (cv)", "MariaDB (cv)"] },
  { area: "Observability", items: ["Prometheus (cv)", "Grafana (cv)", "Zabbix (cv)", "OpenTelemetry", "OpenLineage"] },
  { area: "Platform", items: ["Kubernetes (cv)", "GitLab CI/CD (cv)", "Terraform"] },
  { area: "ML / NLP", items: ["PyTorch (cv)", "TensorFlow (cv)", "Scikit-learn (cv)", "Sentence Transformers (cv)", "NLTK (cv)"] },
  { area: "RAG techniques", items: ["HyDE (cv)", "hybrid search (BM25 + vectors)", "reranking", "RAG evaluation (Ragas)"] },
  { area: "LLM APIs", items: ["API key management / secrets manager", "quotas & rate limiting", "token cost tracking"] },
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
