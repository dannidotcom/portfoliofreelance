import { github } from "@/content/github"

export const GITHUB_REVALIDATE = 3600

export type Repo = {
  name: string
  url: string
  description: string | null
  language: string | null
  stars: number
  pushedAt: string
}

export type RepoSource = "pinned" | "curated" | "snapshot"

type GraphQLRepo = {
  name: string
  url: string
  description: string | null
  stargazerCount: number
  pushedAt: string
  isFork: boolean
  primaryLanguage: { name: string } | null
}

type RestRepo = {
  name: string
  html_url: string
  description: string | null
  stargazers_count: number
  pushed_at: string
  language: string | null
  fork: boolean
}

const PINNED_QUERY = `query($login: String!) {
  user(login: $login) {
    pinnedItems(first: 6, types: REPOSITORY) {
      nodes { ... on Repository { name url description stargazerCount pushedAt isFork primaryLanguage { name } } }
    }
  }
}`

async function fetchPinned(token: string): Promise<Repo[]> {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query: PINNED_QUERY, variables: { login: github.user } }),
    next: { revalidate: GITHUB_REVALIDATE },
  })
  if (!response.ok) throw new Error(`GitHub GraphQL ${response.status}`)
  const json = (await response.json()) as { data?: { user?: { pinnedItems?: { nodes?: GraphQLRepo[] } } } }
  return (json.data?.user?.pinnedItems?.nodes ?? [])
    .filter((repo) => !repo.isFork && !github.excluded.includes(repo.name))
    .map((repo) => ({
      name: repo.name,
      url: repo.url,
      description: repo.description,
      language: repo.primaryLanguage?.name ?? null,
      stars: repo.stargazerCount,
      pushedAt: repo.pushedAt,
    }))
}

async function fetchCurated(): Promise<Repo[]> {
  const response = await fetch(`https://api.github.com/users/${github.user}/repos?per_page=100&type=owner`, {
    headers: { Accept: "application/vnd.github+json" },
    next: { revalidate: GITHUB_REVALIDATE },
  })
  if (!response.ok) throw new Error(`GitHub REST ${response.status}`)
  const repos = (await response.json()) as RestRepo[]
  return github.curated.flatMap((curated) => {
    const repo = repos.find((r) => r.name === curated.name && !r.fork)
    if (!repo) return []
    return [
      {
        name: repo.name,
        url: repo.html_url,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        pushedAt: repo.pushed_at,
      },
    ]
  })
}

function snapshot(): Repo[] {
  return github.curated.map((repo) => ({
    name: repo.name,
    url: `${github.profileUrl}/${repo.name}`,
    description: repo.snapshot.description,
    language: repo.snapshot.language,
    stars: repo.snapshot.stars,
    pushedAt: repo.snapshot.pushedAt,
  }))
}

/** Pinned repos when GITHUB_TOKEN is set, else the curated selection with live metadata, else a static snapshot. */
export async function getRepos(): Promise<{ source: RepoSource; repos: Repo[] }> {
  const token = process.env.GITHUB_TOKEN
  if (token) {
    try {
      const pinned = await fetchPinned(token)
      if (pinned.length > 0) return { source: "pinned", repos: pinned.slice(0, github.limit) }
    } catch {
      // fall through to the curated selection
    }
  }
  try {
    const curated = await fetchCurated()
    if (curated.length > 0) return { source: "curated", repos: curated.slice(0, github.limit) }
  } catch {
    // fall through to the snapshot
  }
  return { source: "snapshot", repos: snapshot().slice(0, github.limit) }
}
