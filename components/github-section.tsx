import { ArrowUpRight, Github, Star } from "lucide-react"
import { github } from "@/content/github"
import type { Locale } from "@/content/types"
import { getDictionary } from "@/content/ui"
import { Reveal, SectionHeading } from "@/components/reveal"
import { getRepos } from "@/lib/github"
import { formatMonth } from "@/lib/i18n"
import { isTodo } from "@/lib/todo"

const LANGUAGE_COLOR: Record<string, string> = {
  Python: "bg-[#3572A5]",
  TypeScript: "bg-[#3178c6]",
  JavaScript: "bg-[#f1e05a]",
}

export default async function GithubSection({ locale, index = "07" }: { locale: Locale; index?: string }) {
  const dict = getDictionary(locale)
  const { source, repos } = await getRepos()
  if (repos.length === 0) return null

  const description = (name: string, fallback: string | null) => {
    const curated = github.curated.find((repo) => repo.name === name)?.description
    if (curated && !isTodo(curated) && typeof curated === "object") return curated[locale]
    return source === "pinned" ? fallback : null
  }

  return (
    <section id="github" className="section-shell border-t border-white/[0.05]">
      <div className="container">
        <Reveal>
          <SectionHeading
            index={index}
            eyebrow={dict.github.eyebrow}
            title={dict.github.title}
            description={dict.github.description}
          />
        </Reveal>

        <Reveal>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <p className="label-caps">{dict.github.source[source]}</p>
            <a
              href={github.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-foreground/85 transition-colors hover:text-foreground focus-ring rounded-md"
            >
              <Github className="h-4 w-4" aria-hidden />
              {dict.github.profile}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>
        </Reveal>

        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {repos.map((repo, i) => {
            const text = description(repo.name, repo.description)
            return (
              <li key={repo.name}>
                <Reveal delay={i * 0.04} className="h-full">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="panel group flex h-full flex-col p-5 transition-colors duration-300 hover:bg-white/[0.035] focus-ring"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-mono text-sm font-medium text-champagne break-all">
                        <span className="text-muted-foreground">{github.user}/</span>
                        {repo.name}
                        <span className="sr-only"> {dict.github.opensInNewTab}</span>
                      </p>
                      <ArrowUpRight
                        className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                        aria-hidden
                      />
                    </div>
                    {text ? <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p> : null}
                    <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-4 text-xs text-muted-foreground">
                      {repo.language ? (
                        <span className="inline-flex items-center gap-1.5">
                          <span
                            className={`h-2.5 w-2.5 rounded-full ${LANGUAGE_COLOR[repo.language] ?? "bg-muted-foreground"}`}
                            aria-hidden
                          />
                          {repo.language}
                        </span>
                      ) : null}
                      {repo.stars > 0 ? (
                        <span className="inline-flex items-center gap-1">
                          <Star className="h-3.5 w-3.5" aria-hidden />
                          <span className="sr-only">{dict.github.stars(repo.stars)}</span>
                          <span aria-hidden>{repo.stars}</span>
                        </span>
                      ) : null}
                      <span>{dict.github.updated(formatMonth(repo.pushedAt.slice(0, 7), locale))}</span>
                    </div>
                  </a>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
