import { experiences } from "@/content/experience"
import type { Locale } from "@/content/types"
import { getDictionary } from "@/content/ui"
import { formatMonth } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const FIRST_YEAR = 2022
const LAST_YEAR = 2026
const LANE_HEIGHT = 34

const monthIndex = (iso: string) => {
  const [year, month] = iso.split("-").map(Number)
  return year * 12 + (month - 1)
}

export default function ExperienceTimeline({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const rangeStart = FIRST_YEAR * 12
  const rangeEnd = (LAST_YEAR + 1) * 12
  const span = rangeEnd - rangeStart
  const today = new Date()
  const nowIndex = Math.min(today.getFullYear() * 12 + today.getMonth(), rangeEnd - 1)

  const laneEnds: number[] = []
  const bars = [...experiences]
    .sort((a, b) => monthIndex(a.start) - monthIndex(b.start))
    .map((exp) => {
      const start = Math.max(monthIndex(exp.start), rangeStart)
      const end = Math.min((exp.end ? monthIndex(exp.end) : nowIndex) + 1, rangeEnd)
      let lane = laneEnds.findIndex((laneEnd) => laneEnd <= start)
      if (lane === -1) lane = laneEnds.length
      laneEnds[lane] = end
      const period = `${formatMonth(exp.start, locale)} — ${
        exp.end ? formatMonth(exp.end, locale) : dict.experience.present
      }`
      return {
        exp,
        lane,
        period,
        left: ((start - rangeStart) / span) * 100,
        width: ((end - start) / span) * 100,
      }
    })

  const years = Array.from({ length: LAST_YEAR - FIRST_YEAR + 1 }, (_, i) => FIRST_YEAR + i)

  return (
    <div role="group" aria-label={dict.experience.timeline} className="panel mb-10 max-w-4xl px-5 pt-5 pb-3 md:px-6">
      <ol className="relative" style={{ height: laneEnds.length * LANE_HEIGHT }}>
        {bars.map(({ exp, lane, period, left, width }) => (
          <li
            key={exp.id}
            className="absolute"
            style={{ left: `${left}%`, width: `${width}%`, top: lane * LANE_HEIGHT }}
          >
            <a
              href={`#exp-${exp.id}`}
              aria-label={`${exp.company} — ${exp.position[locale]}, ${period}`}
              title={`${exp.company} · ${period}`}
              className={cn(
                "group mr-[3px] flex h-[26px] items-center overflow-hidden rounded-md border px-2 transition-colors focus-ring",
                exp.end === null
                  ? "border-primary/50 bg-primary/20 text-foreground hover:bg-primary/30"
                  : "border-white/10 bg-white/[0.05] text-foreground/80 hover:border-primary/30 hover:bg-primary/10 hover:text-foreground",
              )}
            >
              <span className="hidden truncate text-[11px] font-medium md:block" aria-hidden>
                {exp.company}
              </span>
            </a>
          </li>
        ))}
      </ol>

      <div className="relative mt-2 h-6 border-t border-white/10" aria-hidden>
        {years.map((year) => (
          <span
            key={year}
            className="absolute top-0 flex flex-col items-start"
            style={{ left: `${((year * 12 - rangeStart) / span) * 100}%` }}
          >
            <span className="h-1.5 w-px bg-white/20" />
            <span className="mt-0.5 font-mono text-[10px] text-muted-foreground">{year}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
