import type { Todo } from "../types"

export type NoteMeta = {
  title: string
  summary: string
  /** ISO date (YYYY-MM-DD) of publication. */
  date: string | Todo
  /** Drafts are only rendered by `next dev`; never built in production. */
  draft: boolean
  tags: string[]
}
