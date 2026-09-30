import { profile } from "./profile"
import { TODO, type Localized, type Todo } from "./types"

export type CuratedRepo = {
  name: string
  /** Overrides the GitHub description (which is single-language). Hidden while TODO. */
  description: Localized | Todo
  /** Snapshot used when the GitHub API is unreachable at build / revalidation time. */
  snapshot: { language: string | null; stars: number; pushedAt: string; description: string | null }
}

export const github = {
  user: profile.githubUser,
  profileUrl: profile.github,
  /** Pinned repos (GraphQL, needs GITHUB_TOKEN) are shown first; these repos are never listed. */
  excluded: ["dannidotcom", "portfoliofreelance"],
  limit: 6,
  /** Used when GITHUB_TOKEN is not set or returns no pinned repo. Order = display order. */
  curated: [
    {
      name: "chat-RAG",
      description: TODO,
      snapshot: { language: "Python", stars: 0, pushedAt: "2025-04-26T08:33:29Z", description: null },
    },
    {
      name: "sale_etl_dwh",
      description: TODO,
      snapshot: { language: "Python", stars: 0, pushedAt: "2025-05-12T01:32:38Z", description: null },
    },
    {
      name: "ai-recruteur",
      description: TODO,
      snapshot: { language: "Python", stars: 0, pushedAt: "2025-05-27T13:11:52Z", description: null },
    },
    {
      name: "rh-assistant",
      description: TODO,
      snapshot: { language: "Python", stars: 1, pushedAt: "2025-06-21T07:46:17Z", description: null },
    },
    {
      name: "ai-content-generator-api",
      description: TODO,
      snapshot: { language: "Python", stars: 0, pushedAt: "2025-06-25T07:26:15Z", description: null },
    },
    {
      name: "chess-learning-app",
      description: {
        fr: "Application web pour apprendre les échecs avec l'IA : analyse Stockfish + LLM (Ollama), jeu contre l'IA ou en local à deux joueurs.",
        en: "Web app to learn chess with AI: Stockfish + LLM (Ollama) analysis, play against the AI or locally with two players.",
      },
      snapshot: {
        language: "Python",
        stars: 0,
        pushedAt: "2026-07-03T09:31:16Z",
        description:
          "Application web professionnelle pour apprendre les échecs avec IA. Interface premium, analyse Stockfish + LLM (Ollama), jeu contre IA ou local 2 joueurs.",
      },
    },
  ] satisfies CuratedRepo[],
}
