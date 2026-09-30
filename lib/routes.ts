import { publishedNotes } from "@/content/notes"
import { caseStudyProjects } from "@/content/projects"

export function caseStudyPath(slug: string) {
  return `/projects/${slug}`
}

export const notesPath = "/notes"

export function notePath(slug: string) {
  return `${notesPath}/${slug}`
}

/** Locale-agnostic public paths, used by the sitemap. */
export function publicPaths(): string[] {
  const notes = publishedNotes()
  return [
    "/",
    ...caseStudyProjects.map((project) => caseStudyPath(project.slug)),
    ...(notes.length ? [notesPath, ...notes.map((note) => notePath(note.slug))] : []),
  ]
}
