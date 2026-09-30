import { caseStudyProjects } from "@/content/projects"

export function caseStudyPath(slug: string) {
  return `/projects/${slug}`
}

/** Locale-agnostic public paths, used by the sitemap. */
export function publicPaths(): string[] {
  return ["/", ...caseStudyProjects.map((project) => caseStudyPath(project.slug))]
}
