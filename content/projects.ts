import {
  juribotDiagram,
  scrapingAgentDiagram,
  sovereignEngineDiagram,
  type Adr,
  type Diagram,
} from "./architecture"
import { TODO, todoText, type Localized, type Todo } from "./types"

export type ProjectStatus = "in-progress" | "completed" | "prototype"

export type DataEntity = {
  name: string
  fields: string[]
  note?: Localized
}

export type CaseMetric = {
  label: Localized
  value: string | Todo
}

export type CaseStudy = {
  context: Localized
  constraints: Localized[]
  diagram: Diagram
  /** Entities of the data model — TODO until provided. */
  dataModel: DataEntity[] | Todo
  decisions: Adr[]
  metrics: CaseMetric[]
  nextSteps: Localized[]
}

export type Project = {
  slug: string
  title: Localized
  featured: boolean
  confidential?: boolean
  category: Localized
  subtitle?: Localized
  summary: Localized
  description: Localized
  problem: Localized
  solution: Localized
  role: Localized
  highlights?: Localized[]
  disclaimer?: Localized
  technologies: string[]
  results: Localized[]
  images: string[]
  duration: Localized
  team: Localized
  client: Localized
  /** "" = no public repository, TODO = to be provided. */
  githubUrl: string | Todo
  demoUrl: string | Todo
  status: ProjectStatus
  year: string
  caseStudy?: CaseStudy
}

export const projects: Project[] = [
  {
    slug: "sovereign-ai-engine",
    title: { fr: "Moteur IA souverain", en: "Sovereign AI engine" },
    featured: true,
    confidential: true,
    category: { fr: "AI Infrastructure", en: "AI Infrastructure" },
    subtitle: {
      fr: "Projet entreprise — environnements réglementés",
      en: "Company project — regulated environments",
    },
    summary: {
      fr: "Moteur IA on-premise : RAG, LLM local, FastAPI, multi-tenant.",
      en: "On-premise AI engine: RAG, local LLM, FastAPI, multi-tenant.",
    },
    description: {
      fr: "Contribution à un moteur d'IA auto-hébergé pour un logiciel métier réglementé : RAG, inférence LLM locale, APIs sécurisées et isolation multi-tenant.",
      en: "Contribution to a self-hosted AI engine for regulated business software: RAG, local LLM inference, secured APIs and multi-tenant isolation.",
    },
    problem: {
      fr: "Les logiciels métiers ont besoin d'assistance IA sans exposer les données sensibles à des services cloud externes, tout en respectant sécurité et conformité.",
      en: "Business software needs AI assistance without exposing sensitive data to external cloud services, while meeting security and compliance requirements.",
    },
    solution: {
      fr: "Architecture on-premise : pipeline RAG, API FastAPI, inférence LLM locale, bases vectorielles et relationnelles, streaming des réponses et contrôles d'accès multi-tenant.",
      en: "On-premise architecture: RAG pipeline, FastAPI API, local LLM inference, vector and relational databases, streamed responses and multi-tenant access control.",
    },
    role: {
      fr: "AI Engineer — backend, RAG, sécurité applicative et intégration production",
      en: "AI Engineer — backend, RAG, application security and production integration",
    },
    highlights: [
      {
        fr: "Déploiement on-premise orienté souveraineté des données",
        en: "On-premise deployment focused on data sovereignty",
      },
      {
        fr: "Recherche sémantique (RAG) sur base de connaissances métier",
        en: "Semantic search (RAG) over a business knowledge base",
      },
      { fr: "Isolation multi-tenant et contrôles d'accès", en: "Multi-tenant isolation and access control" },
      {
        fr: "Inférence LLM locale avec réponses en streaming",
        en: "Local LLM inference with streamed responses",
      },
      {
        fr: "Socle API sécurisé (authentification, isolation, intégration)",
        en: "Secured API foundation (authentication, isolation, integration)",
      },
    ],
    disclaimer: {
      fr: "Projet confidentiel d'entreprise — description volontairement générique, sans détail propriétaire.",
      en: "Confidential company project — deliberately generic description, no proprietary details.",
    },
    technologies: ["Python", "FastAPI", "LLM", "RAG", "Qdrant", "PostgreSQL", "vLLM", "Docker", "JWT", "Streaming"],
    results: [
      { fr: "Architecture on-premise orientée production", en: "Production-oriented on-premise architecture" },
      { fr: "Isolation multi-tenant", en: "Multi-tenant isolation" },
      { fr: "Streaming des réponses LLM", en: "Streamed LLM responses" },
    ],
    images: [],
    duration: { fr: "En cours", en: "Ongoing" },
    team: { fr: "Équipe produit / engineering", en: "Product / engineering team" },
    client: { fr: "Entreprise — logiciel métier réglementé", en: "Company — regulated business software" },
    githubUrl: "",
    demoUrl: "",
    status: "in-progress",
    year: "2026",
    caseStudy: {
      context: {
        fr: "Contribution, en tant qu'AI Engineer, à un moteur d'IA auto-hébergé intégré à un logiciel métier utilisé en environnement réglementé. Les utilisateurs ont besoin d'une assistance IA, mais les données sensibles ne peuvent pas être envoyées à des services cloud externes.",
        en: "Contribution, as an AI Engineer, to a self-hosted AI engine integrated into business software used in regulated environments. Users need AI assistance, but sensitive data cannot be sent to external cloud services.",
      },
      constraints: [
        {
          fr: "Souveraineté : aucune donnée métier ne quitte l'infrastructure (inférence et stockage on-premise).",
          en: "Sovereignty: no business data leaves the infrastructure (on-premise inference and storage).",
        },
        {
          fr: "Multi-tenant : isolation stricte des données et contrôles d'accès entre clients.",
          en: "Multi-tenant: strict data isolation and access control between customers.",
        },
        {
          fr: "Sécurité et conformité : authentification, isolation et intégration à un logiciel existant.",
          en: "Security and compliance: authentication, isolation and integration into existing software.",
        },
        {
          fr: "Expérience : réponses streamées pour limiter la latence perçue.",
          en: "Experience: streamed answers to limit perceived latency.",
        },
      ],
      diagram: sovereignEngineDiagram,
      dataModel: TODO,
      decisions: sovereignEngineDiagram.adrs,
      metrics: [
        { label: { fr: "Latence au premier token", en: "Time to first token" }, value: TODO },
        { label: { fr: "Documents indexés", en: "Documents indexed" }, value: TODO },
        { label: { fr: "Tenants servis", en: "Tenants served" }, value: TODO },
      ],
      nextSteps: [todoText, todoText, todoText],
    },
  },
  {
    slug: "juribot",
    title: { fr: "JuriBot Mada Intelligent", en: "JuriBot Mada Intelligent" },
    featured: false,
    category: { fr: "IA Agentique", en: "Agentic AI" },
    summary: {
      fr: "Assistant juridique intelligent (malgache / français).",
      en: "Intelligent legal assistant (Malagasy / French).",
    },
    description: {
      fr: "Plateforme d'IA pour rendre le droit accessible à Madagascar. Réponses intelligentes aux questions juridiques en malgache et en français.",
      en: "AI platform making the law accessible in Madagascar. Intelligent answers to legal questions in Malagasy and French.",
    },
    problem: {
      fr: "Faciliter l'accès au droit pour un public large, dans deux langues.",
      en: "Make legal information accessible to a broad audience, in two languages.",
    },
    solution: {
      fr: "Assistant conversationnel basé sur LLM, API FastAPI et interface Next.js.",
      en: "LLM-based conversational assistant, FastAPI API and Next.js interface.",
    },
    role: { fr: "Développeur full-stack IA", en: "Full-stack AI developer" },
    technologies: ["Python", "FastAPI", "Next.js", "LangChain", "GPT-4", "PostgreSQL", "Tailwind CSS"],
    results: [
      { fr: "Assistant bilingue malgache / français", en: "Bilingual Malagasy / French assistant" },
      {
        fr: "Automatisation des workflows de consultation",
        en: "Automated consultation workflows",
      },
    ],
    images: [
      "/images/jurbot-login.png",
      "/images/jurbot-home.png",
      "/images/dashboard.png",
      "/images/fonctionnement.png",
    ],
    duration: { fr: "Projet livré", en: "Delivered" },
    team: { fr: "Solo", en: "Solo" },
    client: { fr: "Projet IA juridique", en: "Legal AI project" },
    githubUrl: "https://github.com/dannidotcom",
    demoUrl: "",
    status: "completed",
    year: "2024",
    caseStudy: {
      context: {
        fr: "Rendre le droit accessible à Madagascar : un public large doit pouvoir poser des questions juridiques en malgache ou en français et obtenir une réponse compréhensible.",
        en: "Make the law accessible in Madagascar: a broad audience must be able to ask legal questions in Malagasy or French and get an understandable answer.",
      },
      constraints: [
        { fr: "Deux langues : malgache et français.", en: "Two languages: Malagasy and French." },
        {
          fr: "Public non spécialiste : les réponses doivent rester compréhensibles.",
          en: "Non-specialist audience: answers must remain understandable.",
        },
        { fr: "Projet mené en solo, du backend à l'interface.", en: "Solo project, from backend to interface." },
      ],
      diagram: juribotDiagram,
      dataModel: TODO,
      decisions: [],
      metrics: [
        { label: { fr: "Utilisateurs", en: "Users" }, value: TODO },
        { label: { fr: "Questions traitées", en: "Questions answered" }, value: TODO },
      ],
      nextSteps: [todoText, todoText],
    },
  },
  {
    slug: "ai-recruteur",
    title: { fr: "AI-Recruteur — Simulateur d'entretien", en: "AI-Recruteur — Interview simulator" },
    featured: false,
    category: { fr: "IA RH & Formation", en: "HR & Training AI" },
    summary: {
      fr: "Simulateur d'entretien intelligent pour candidats et recruteurs.",
      en: "Intelligent interview simulator for candidates and recruiters.",
    },
    description: {
      fr: "Agent conversationnel qui simule un entretien d'embauche à partir d'une offre, génère des questions techniques et RH, évalue les réponses.",
      en: "Conversational agent that simulates a job interview from a job posting, generates technical and HR questions and evaluates answers.",
    },
    problem: {
      fr: "Préparer efficacement des entretiens techniques à partir d'offres réelles.",
      en: "Prepare efficiently for technical interviews based on real job postings.",
    },
    solution: {
      fr: "Agent FastAPI + LangChain qui analyse l'offre, interagit et produit une évaluation.",
      en: "FastAPI + LangChain agent that analyses the posting, interacts and produces an evaluation.",
    },
    role: { fr: "Développeur IA", en: "AI developer" },
    technologies: ["Python", "FastAPI", "LangChain", "GPT-4", "PostgreSQL"],
    results: [
      {
        fr: "Préparation interactive aux entretiens techniques",
        en: "Interactive technical interview preparation",
      },
      { fr: "Analyse automatisée des offres d'emploi", en: "Automated job posting analysis" },
      { fr: "Évaluation assistée par IA", en: "AI-assisted evaluation" },
    ],
    images: ["/images/ai-recruter.png"],
    duration: { fr: "Prototype", en: "Prototype" },
    team: { fr: "Solo", en: "Solo" },
    client: { fr: "Formateurs & candidats", en: "Trainers & candidates" },
    githubUrl: "https://github.com/dannidotcom/ai-recruteur",
    demoUrl: "",
    status: "prototype",
    year: "2025",
  },
  {
    slug: "ai-data-scraping-agent",
    title: { fr: "Agent IA pour Data Scraping", en: "AI agent for data scraping" },
    featured: false,
    category: { fr: "IA Agentique", en: "Agentic AI" },
    summary: {
      fr: "Agents IA + scraping + recherche sémantique (Qdrant).",
      en: "AI agents + scraping + semantic search (Qdrant).",
    },
    description: {
      fr: "Système d'IA agentique capable de scraper du contenu web et de répondre à partir des données collectées via recherche sémantique.",
      en: "Agentic AI system that scrapes web content and answers questions from the collected data through semantic search.",
    },
    problem: {
      fr: "Collecter et exploiter des données web pour alimenter des réponses contextuelles.",
      en: "Collect and exploit web data to power contextual answers.",
    },
    solution: {
      fr: "Pipeline scraping + vectorisation Qdrant + agents LangChain/LangGraph exposés via FastAPI.",
      en: "Scraping pipeline + Qdrant vectorisation + LangChain/LangGraph agents exposed through FastAPI.",
    },
    role: { fr: "Développeur Python IA", en: "Python AI developer" },
    technologies: ["Python", "FastAPI", "LangChain", "LangGraph", "Qdrant", "SeleniumBase"],
    results: [
      { fr: "Scraping automatisé", en: "Automated scraping" },
      { fr: "Recherche sémantique avancée", en: "Advanced semantic search" },
      { fr: "Réponses contextuelles", en: "Contextual answers" },
    ],
    images: ["/images/img-JNhZdHVVtn9kklFEDp4W5npl.png"],
    duration: { fr: "3 mois", en: "3 months" },
    team: { fr: "Solo", en: "Solo" },
    client: { fr: "Mission freelance", en: "Freelance engagement" },
    githubUrl: "",
    demoUrl: "",
    status: "completed",
    year: "2025",
    caseStudy: {
      context: {
        fr: "Mission freelance de 3 mois : collecter automatiquement du contenu web et permettre de répondre à des questions à partir de ces données, grâce à la recherche sémantique et à des agents IA.",
        en: "Three-month freelance engagement: automatically collect web content and answer questions from that data, using semantic search and AI agents.",
      },
      constraints: [
        {
          fr: "Collecte automatisée de sources web (SeleniumBase).",
          en: "Automated collection of web sources (SeleniumBase).",
        },
        {
          fr: "Réponses contextuelles fondées sur les données collectées.",
          en: "Contextual answers grounded in the collected data.",
        },
        { fr: "Délai de 3 mois, en solo.", en: "Three-month timeline, solo." },
      ],
      diagram: scrapingAgentDiagram,
      dataModel: TODO,
      decisions: [],
      metrics: [
        { label: { fr: "Pages collectées", en: "Pages collected" }, value: TODO },
        { label: { fr: "Temps de réponse moyen", en: "Average response time" }, value: TODO },
      ],
      nextSteps: [todoText, todoText],
    },
  },
  {
    slug: "odoo-erp-ai",
    title: { fr: "Modules ERP Odoo & intégration IA", en: "Odoo ERP modules & AI integration" },
    featured: false,
    category: { fr: "Backend / ERP", en: "Backend / ERP" },
    summary: {
      fr: "Automatisation ERP Odoo et pont vers des modèles IA.",
      en: "Odoo ERP automation and a bridge to AI models.",
    },
    description: {
      fr: "Modules Odoo personnalisés pour automatiser les processus métier, avec API pour connecter l'ERP à des modèles d'IA externes.",
      en: "Custom Odoo modules automating business processes, with an API connecting the ERP to external AI models.",
    },
    problem: {
      fr: "Accélérer les processus métier ERP tout en enrichissant les données via l'IA.",
      en: "Speed up ERP business processes while enriching data with AI.",
    },
    solution: {
      fr: "Modules custom Odoo, workflows natifs, API REST et scripts de transformation de données.",
      en: "Custom Odoo modules, native workflows, REST API and data transformation scripts.",
    },
    role: { fr: "Développeur Python / Odoo", en: "Python / Odoo developer" },
    technologies: ["Python", "Odoo", "PostgreSQL", "OWL", "JavaScript", "Docker"],
    results: [
      { fr: "Automatisation des processus métier", en: "Business process automation" },
      { fr: "Intégration IA via API", en: "AI integration through an API" },
    ],
    images: ["/images/odoo.png"],
    duration: { fr: "1 an", en: "1 year" },
    team: { fr: "Équipe projet", en: "Project team" },
    client: { fr: "Advences (Primanet)", en: "Advences (Primanet)" },
    githubUrl: TODO,
    demoUrl: "",
    status: "completed",
    year: "2024",
  },
]

export const featuredProject = projects.find((project) => project.featured)!

export const caseStudyProjects = projects.filter(
  (project): project is Project & { caseStudy: CaseStudy } => project.caseStudy !== undefined,
)

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}
