import type { MDXContent } from "mdx/types"
import type { Locale } from "../types"
import type { NoteMeta } from "./types"
import RagTenantsFr, { meta as ragTenantsFr } from "./rag-on-premise-tenants/fr.mdx"
import RagTenantsEn, { meta as ragTenantsEn } from "./rag-on-premise-tenants/en.mdx"
import EtlVectorFr, { meta as etlVectorFr } from "./etl-to-vectorisation/fr.mdx"
import EtlVectorEn, { meta as etlVectorEn } from "./etl-to-vectorisation/en.mdx"
import StreamingFr, { meta as streamingFr } from "./fastapi-llm-streaming/fr.mdx"
import StreamingEn, { meta as streamingEn } from "./fastapi-llm-streaming/en.mdx"

export type Note = {
  slug: string
  meta: Record<Locale, NoteMeta>
  Content: Record<Locale, MDXContent>
}

/** Drafts are visible with `next dev` only. */
export const SHOW_DRAFTS = process.env.NODE_ENV !== "production"

const allNotes: Note[] = [
  {
    slug: "rag-on-premise-tenants",
    meta: { fr: ragTenantsFr, en: ragTenantsEn },
    Content: { fr: RagTenantsFr, en: RagTenantsEn },
  },
  {
    slug: "etl-to-vectorisation",
    meta: { fr: etlVectorFr, en: etlVectorEn },
    Content: { fr: EtlVectorFr, en: EtlVectorEn },
  },
  {
    slug: "fastapi-llm-streaming",
    meta: { fr: streamingFr, en: streamingEn },
    Content: { fr: StreamingFr, en: StreamingEn },
  },
]

const isPublished = (note: Note) => !note.meta.fr.draft && !note.meta.en.draft

export function getNotes(): Note[] {
  return allNotes.filter((note) => SHOW_DRAFTS || isPublished(note))
}

export function getNote(slug: string): Note | undefined {
  return getNotes().find((note) => note.slug === slug)
}

/** Published notes only, regardless of environment (sitemap, navigation). */
export function publishedNotes(): Note[] {
  return allNotes.filter(isPublished)
}
