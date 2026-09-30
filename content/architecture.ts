import { TODO, type Localized, type Todo } from "./types"

export type NodeKind = "client" | "service" | "store" | "model" | "ops"

export type DiagramNode = {
  id: string
  label: Localized
  sub: Localized
  detail: Localized
  kind: NodeKind
  x: number
  y: number
  w?: number
}

type Side = "top" | "bottom" | "left" | "right"

export type DiagramEdge = {
  from: string
  to: string
  fromSide?: Side
  toSide?: Side
  /** Absolute coordinate along the target side (x for top/bottom, y for left/right). Defaults to the side centre. */
  toAt?: number
  via?: [number, number][]
  dashed?: boolean
}

export type Adr = {
  id: string
  title: Localized
  context: Localized
  decision: Localized
  tradeoffs: Localized
  /** TODO = hidden in production until the owner confirms it matches the real project. */
  validated: true | Todo
}

export type Diagram = {
  id: string
  title: Localized
  description: Localized
  width: number
  height: number
  nodes: DiagramNode[]
  edges: DiagramEdge[]
  adrs: Adr[]
}

export const NODE_W = 160
export const NODE_H = 64

const col = (i: number) => 20 + i * 185

export const sovereignEngineDiagram: Diagram = {
  id: "sovereign-engine",
  title: { fr: "Moteur IA on-premise", en: "On-premise AI engine" },
  description: {
    fr: "Vue générique du moteur IA souverain : de la requête du client à la réponse streamée, sans qu'aucune donnée ne quitte l'infrastructure.",
    en: "Generic view of the sovereign AI engine: from the client request to the streamed answer, without any data leaving the infrastructure.",
  },
  width: 1125,
  height: 430,
  nodes: [
    {
      id: "client",
      label: { fr: "Client", en: "Client" },
      sub: { fr: "Application métier", en: "Business application" },
      detail: {
        fr: "Le logiciel métier consomme le moteur IA via API. Les données restent dans l'infrastructure de l'entreprise.",
        en: "The business software consumes the AI engine through an API. Data stays inside the company's infrastructure.",
      },
      kind: "client",
      x: col(0),
      y: 190,
    },
    {
      id: "api",
      label: { fr: "API FastAPI", en: "FastAPI API" },
      sub: { fr: "Auth JWT", en: "JWT auth" },
      detail: {
        fr: "Point d'entrée unique : authentification JWT, validation des requêtes et endpoints d'intégration.",
        en: "Single entry point: JWT authentication, request validation and integration endpoints.",
      },
      kind: "service",
      x: col(1),
      y: 190,
    },
    {
      id: "tenant",
      label: { fr: "Isolation tenant", en: "Tenant isolation" },
      sub: { fr: "Contrôles d'accès", en: "Access control" },
      detail: {
        fr: "Chaque requête est confinée au périmètre de son tenant : contrôles d'accès et isolation des données entre clients.",
        en: "Every request is confined to its tenant's scope: access control and data isolation between customers.",
      },
      kind: "service",
      x: col(2),
      y: 190,
    },
    {
      id: "rag",
      label: { fr: "Pipeline RAG", en: "RAG pipeline" },
      sub: { fr: "Retrieval · prompt", en: "Retrieval · prompt" },
      detail: {
        fr: "Recherche sémantique dans la base de connaissances métier, puis construction du contexte et du prompt envoyés au modèle.",
        en: "Semantic search over the business knowledge base, then assembly of the context and prompt sent to the model.",
      },
      kind: "service",
      x: col(3),
      y: 190,
    },
    {
      id: "vector",
      label: { fr: "Qdrant · pgvector", en: "Qdrant · pgvector" },
      sub: { fr: "Index vectoriel", en: "Vector index" },
      detail: {
        fr: "Index des documents découpés et vectorisés (embeddings), interrogé par similarité pour la recherche sémantique.",
        en: "Index of chunked, embedded documents, queried by similarity for semantic search.",
      },
      kind: "store",
      x: col(3),
      y: 346,
    },
    {
      id: "postgres",
      label: { fr: "PostgreSQL", en: "PostgreSQL" },
      sub: { fr: "Base relationnelle", en: "Relational DB" },
      detail: {
        fr: "Données relationnelles de l'application, consultées par le pipeline en complément de la recherche vectorielle.",
        en: "Application relational data, read by the pipeline alongside vector search.",
      },
      kind: "store",
      x: col(4),
      y: 346,
    },
    {
      id: "llm",
      label: { fr: "Inférence LLM", en: "LLM inference" },
      sub: { fr: "vLLM · on-premise", en: "vLLM · on-premise" },
      detail: {
        fr: "Modèle de langage servi localement avec vLLM : aucune donnée n'est envoyée à un service cloud externe.",
        en: "Language model served locally with vLLM: no data is sent to an external cloud service.",
      },
      kind: "model",
      x: col(4),
      y: 190,
    },
    {
      id: "stream",
      label: { fr: "Streaming", en: "Streaming" },
      sub: { fr: "Token par token", en: "Token by token" },
      detail: {
        fr: "La réponse est renvoyée au client au fil de la génération, ce qui réduit fortement la latence perçue.",
        en: "The answer is sent back to the client as it is generated, which strongly reduces perceived latency.",
      },
      kind: "service",
      x: col(5),
      y: 190,
    },
    {
      id: "monitoring",
      label: { fr: "Monitoring · logs", en: "Monitoring · logs" },
      sub: { fr: "Perf · logs · sécurité", en: "Perf · logs · security" },
      detail: {
        fr: "Supervision de toute la chaîne : logs, performances et événements de sécurité.",
        en: "Supervision of the whole chain: logs, performance and security events.",
      },
      kind: "ops",
      x: col(0),
      y: 346,
      w: 345,
    },
  ],
  edges: [
    { from: "client", to: "api" },
    { from: "api", to: "tenant" },
    { from: "tenant", to: "rag" },
    { from: "rag", to: "vector", fromSide: "bottom", toSide: "top" },
    { from: "rag", to: "postgres", fromSide: "bottom", toSide: "top", via: [[col(3) + 80, 300], [col(4) + 80, 300]] },
    { from: "rag", to: "llm" },
    { from: "llm", to: "stream" },
    { from: "stream", to: "client", fromSide: "top", toSide: "top", via: [[col(5) + 80, 70], [col(0) + 80, 70]] },
    { from: "api", to: "monitoring", fromSide: "bottom", toSide: "top", toAt: col(1) + 80, dashed: true },
    { from: "tenant", to: "monitoring", fromSide: "bottom", toSide: "right", via: [[col(2) + 80, 378]], dashed: true },
  ],
  adrs: [
    {
      id: "A1",
      title: { fr: "Inférence LLM locale plutôt qu'API cloud", en: "Local LLM inference instead of a cloud API" },
      context: {
        fr: "Les données métier sont sensibles et le logiciel cible des environnements réglementés : elles ne doivent pas quitter l'infrastructure.",
        en: "Business data is sensitive and the software targets regulated environments: it must not leave the infrastructure.",
      },
      decision: {
        fr: "Servir des modèles open-weight en local avec vLLM, derrière l'API interne.",
        en: "Serve open-weight models locally with vLLM, behind the internal API.",
      },
      tradeoffs: {
        fr: "Capacité GPU à dimensionner et à exploiter soi-même ; choix limité aux modèles open-weight, parfois en retrait des modèles propriétaires sur certaines tâches ; mises à jour des modèles et des drivers à la charge de l'équipe.",
        en: "GPU capacity must be sized and operated in-house; choice limited to open-weight models, sometimes behind proprietary models on some tasks; model and driver upgrades are the team's responsibility.",
      },
      validated: true,
    },
    {
      id: "A2",
      title: { fr: "Isolation des tenants dès le retrieval", en: "Tenant isolation enforced at retrieval" },
      context: {
        fr: "Plusieurs clients partagent le même moteur ; une fuite de contexte entre tenants via la recherche vectorielle serait critique.",
        en: "Several customers share the same engine; leaking context between tenants through vector search would be critical.",
      },
      decision: {
        fr: "Le filtre tenant est dérivé de l'identité JWT côté serveur et imposé à chaque requête vectorielle et SQL — jamais fourni par le client.",
        en: "The tenant filter is derived server-side from the JWT identity and enforced on every vector and SQL query — never supplied by the client.",
      },
      tradeoffs: {
        fr: "Collection partagée + filtre : simple à opérer, mais un filtre oublié suffit à fuiter des données (tests d'isolation obligatoires). Collection par tenant : isolation plus forte, mais multiplication des collections, des index et du coût de réindexation.",
        en: "Shared collection + filter: simple to operate, but one missing filter leaks data (isolation tests are mandatory). Collection per tenant: stronger isolation, but more collections, more indexes and higher reindexing cost.",
      },
      validated: TODO,
    },
    {
      id: "A3",
      title: { fr: "Streaming des réponses token par token", en: "Token-by-token response streaming" },
      context: {
        fr: "Une génération LLM complète peut prendre plusieurs secondes ; attendre la fin dégrade fortement l'expérience utilisateur.",
        en: "A full LLM generation can take several seconds; waiting for completion badly hurts the user experience.",
      },
      decision: {
        fr: "Streamer les tokens depuis l'inférence jusqu'au client via une réponse HTTP en flux.",
        en: "Stream tokens from inference to the client through a streamed HTTP response.",
      },
      tradeoffs: {
        fr: "Erreurs possibles en milieu de flux, à signaler proprement au client ; buffering et timeouts des reverse proxies (Nginx) à configurer ; journalisation et tests plus complexes qu'une réponse unique.",
        en: "Errors can happen mid-stream and must be surfaced cleanly to the client; reverse-proxy buffering and timeouts (Nginx) must be tuned; logging and testing are harder than with a single response.",
      },
      validated: true,
    },
  ],
}

export const dataPipelineDiagram: Diagram = {
  id: "data-pipeline",
  title: { fr: "Pipeline data de bout en bout", en: "End-to-end data pipeline" },
  description: {
    fr: "Architecture de référence générique, assemblée à partir des briques utilisées dans mes missions : de la source brute jusqu'au serving API.",
    en: "Generic reference architecture built from the components used in my engagements: from raw sources to API serving.",
  },
  width: 1125,
  height: 430,
  nodes: [
    {
      id: "sources",
      label: { fr: "Sources", en: "Sources" },
      sub: { fr: "MySQL · PgSQL · Web", en: "MySQL · PgSQL · Web" },
      detail: {
        fr: "Bases relationnelles MySQL / PostgreSQL et contenus web.",
        en: "MySQL / PostgreSQL relational databases and web content.",
      },
      kind: "client",
      x: col(0),
      y: 190,
    },
    {
      id: "ingestion",
      label: { fr: "Ingestion", en: "Ingestion" },
      sub: { fr: "ETL / ELT · scraping", en: "ETL / ELT · scraping" },
      detail: {
        fr: "Extraction et chargement ETL/ELT depuis les bases ; scraping (SeleniumBase) pour les sources web.",
        en: "ETL/ELT extraction and loading from databases; scraping (SeleniumBase) for web sources.",
      },
      kind: "service",
      x: col(1),
      y: 190,
    },
    {
      id: "transform",
      label: { fr: "Transformation", en: "Transformation" },
      sub: { fr: "Nettoyage · Pandas", en: "Cleaning · Pandas" },
      detail: {
        fr: "Nettoyage, normalisation et enrichissement des données avec Pandas.",
        en: "Data cleaning, normalisation and enrichment with Pandas.",
      },
      kind: "service",
      x: col(2),
      y: 190,
    },
    {
      id: "embed",
      label: { fr: "Vectorisation", en: "Embedding" },
      sub: { fr: "Embeddings", en: "Embeddings" },
      detail: {
        fr: "Découpage des contenus et calcul des embeddings pour la recherche sémantique.",
        en: "Content chunking and embedding computation for semantic search.",
      },
      kind: "model",
      x: col(3),
      y: 60,
    },
    {
      id: "vector",
      label: { fr: "Qdrant · pgvector", en: "Qdrant · pgvector" },
      sub: { fr: "Stockage vectoriel", en: "Vector store" },
      detail: {
        fr: "Index des embeddings, interrogé par similarité.",
        en: "Embedding index, queried by similarity.",
      },
      kind: "store",
      x: col(4),
      y: 60,
    },
    {
      id: "relational",
      label: { fr: "PostgreSQL", en: "PostgreSQL" },
      sub: { fr: "Stockage relationnel", en: "Relational store" },
      detail: {
        fr: "Données structurées et nettoyées, servies aux requêtes applicatives.",
        en: "Structured, cleaned data served to application queries.",
      },
      kind: "store",
      x: col(4),
      y: 320,
    },
    {
      id: "api",
      label: { fr: "Serving API", en: "Serving API" },
      sub: { fr: "FastAPI", en: "FastAPI" },
      detail: {
        fr: "API FastAPI qui expose la recherche et les données aux applications et aux agents IA.",
        en: "FastAPI API exposing search and data to applications and AI agents.",
      },
      kind: "service",
      x: col(5),
      y: 190,
    },
    {
      id: "monitoring",
      label: { fr: "Logs · monitoring", en: "Logs · monitoring" },
      sub: { fr: "Runs · erreurs · latence", en: "Runs · errors · latency" },
      detail: {
        fr: "Logs d'exécution et monitoring des pipelines et de l'API.",
        en: "Execution logs and monitoring of pipelines and the API.",
      },
      kind: "ops",
      x: col(0),
      y: 346,
      w: 345,
    },
  ],
  edges: [
    { from: "sources", to: "ingestion" },
    { from: "ingestion", to: "transform" },
    { from: "transform", to: "embed", fromSide: "top", toSide: "left", via: [[col(2) + 80, 92]] },
    { from: "embed", to: "vector" },
    { from: "transform", to: "relational", fromSide: "right", toSide: "left", via: [[col(3) + 40, 222], [col(3) + 40, 352]] },
    { from: "vector", to: "api", fromSide: "right", toSide: "top", via: [[col(5) + 80, 92]] },
    { from: "relational", to: "api", fromSide: "right", toSide: "bottom", via: [[col(5) + 80, 352]] },
    { from: "ingestion", to: "monitoring", fromSide: "bottom", toSide: "top", toAt: col(1) + 80, dashed: true },
    { from: "transform", to: "monitoring", fromSide: "bottom", toSide: "right", via: [[col(2) + 80, 378]], dashed: true },
  ],
  adrs: [
    {
      id: "B1",
      title: { fr: "Transformations Python (Pandas) avant chargement", en: "Python (Pandas) transformations before loading" },
      context: {
        fr: "Sources hétérogènes (bases relationnelles, contenus web) aux formats et à la qualité variables.",
        en: "Heterogeneous sources (relational databases, web content) with varying formats and quality.",
      },
      decision: {
        fr: "Nettoyer et normaliser en Python/Pandas dans le pipeline (ETL), puis charger des données propres.",
        en: "Clean and normalise in Python/Pandas inside the pipeline (ETL), then load clean data.",
      },
      tradeoffs: {
        fr: "Simple, lisible et testable, mais borné par la mémoire d'une seule machine : au-delà, traitement par lots ou moteur distribué. Rejouer une transformation implique de relancer le pipeline depuis la source.",
        en: "Simple, readable and testable, but bounded by a single machine's memory: beyond that, batching or a distributed engine is needed. Replaying a transformation means re-running the pipeline from the source.",
      },
      validated: TODO,
    },
    {
      id: "B2",
      title: { fr: "Stockages relationnel et vectoriel séparés", en: "Separate relational and vector stores" },
      context: {
        fr: "Les requêtes applicatives exigent des données structurées fiables ; la recherche sémantique exige un index de similarité.",
        en: "Application queries need reliable structured data; semantic search needs a similarity index.",
      },
      decision: {
        fr: "PostgreSQL comme source de vérité ; l'index vectoriel (Qdrant) est une projection reconstructible depuis PostgreSQL.",
        en: "PostgreSQL as the source of truth; the vector index (Qdrant) is a projection that can be rebuilt from PostgreSQL.",
      },
      tradeoffs: {
        fr: "Double écriture et risque de désynchronisation à surveiller. pgvector éviterait un système supplémentaire, mais offre moins d'options de recherche et de scaling qu'un moteur vectoriel dédié.",
        en: "Dual writes and a risk of drift to monitor. pgvector would avoid an extra system, but offers fewer search and scaling options than a dedicated vector engine.",
      },
      validated: TODO,
    },
    {
      id: "B3",
      title: { fr: "Ingestion idempotente, embeddings versionnés", en: "Idempotent ingestion, versioned embeddings" },
      context: {
        fr: "Les pipelines sont relancés : échecs, nouvelles données, changement de modèle d'embedding.",
        en: "Pipelines get re-run: failures, new data, embedding model changes.",
      },
      decision: {
        fr: "Identifiant déterministe par chunk (hash du contenu + source) pour des upserts idempotents, et version du modèle d'embedding stockée avec chaque vecteur.",
        en: "Deterministic ID per chunk (content hash + source) for idempotent upserts, and the embedding model version stored with every vector.",
      },
      tradeoffs: {
        fr: "Évite les doublons et permet une réindexation progressive, mais changer de modèle impose de recalculer tous les vecteurs et de faire cohabiter temporairement deux index.",
        en: "Prevents duplicates and allows progressive reindexing, but switching models means recomputing every vector and running two indexes side by side for a while.",
      },
      validated: TODO,
    },
  ],
}

export const diagrams = [sovereignEngineDiagram, dataPipelineDiagram]
