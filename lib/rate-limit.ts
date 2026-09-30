type Bucket = { hits: number[] }

/**
 * In-memory sliding-window limiter. Best effort on serverless (one store per instance),
 * combined with the honeypot and timing trap it stops casual abuse without extra services.
 */
export function createRateLimiter({ limit, windowMs }: { limit: number; windowMs: number }) {
  const buckets = new Map<string, Bucket>()

  return function check(key: string, now = Date.now()): { ok: boolean; retryAfter: number } {
    const bucket = buckets.get(key) ?? { hits: [] }
    bucket.hits = bucket.hits.filter((time) => now - time < windowMs)
    if (bucket.hits.length >= limit) {
      buckets.set(key, bucket)
      return { ok: false, retryAfter: Math.ceil((windowMs - (now - bucket.hits[0])) / 1000) }
    }
    bucket.hits.push(now)
    buckets.set(key, bucket)
    if (buckets.size > 5000) {
      for (const [k, b] of buckets) if (b.hits.every((time) => now - time >= windowMs)) buckets.delete(k)
    }
    return { ok: true, retryAfter: 0 }
  }
}
