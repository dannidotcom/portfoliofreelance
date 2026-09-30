import { deploymentComparison, type ComparisonRow } from "@/content/architecture"
import type { Locale } from "@/content/types"
import { getDictionary } from "@/content/ui"
import TodoMark from "@/components/todo-mark"
import { SHOW_TODOS, shown } from "@/lib/todo"

export default function DeploymentComparison({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const c = dict.architecture.comparison
  const rows = shown(deploymentComparison, (row) => row.validated)
  if (!rows.length) return null

  const todo = (row: ComparisonRow) =>
    SHOW_TODOS && row.validated !== true ? <TodoMark label={dict.architecture.toValidate} /> : null

  return (
    <div className="space-y-4">
      <h4 id="deployment-comparison" className="label-caps">
        {c.title}
      </h4>

      <div className="panel hidden overflow-hidden md:block">
        <table className="w-full text-left text-sm" aria-labelledby="deployment-comparison">
          <thead>
            <tr className="border-b border-white/10 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              <th scope="col" className="w-1/5 px-5 py-3 font-medium">
                {c.criterion}
              </th>
              <th scope="col" className="px-5 py-3 font-medium">
                {c.onPremise}
              </th>
              <th scope="col" className="px-5 py-3 font-medium">
                {c.api}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-white/[0.06] align-top last:border-0">
                <th scope="row" className="px-5 py-4 font-medium text-champagne">
                  <span className="flex flex-col items-start gap-2">
                    {row.criterion[locale]}
                    {todo(row)}
                  </span>
                </th>
                <td className="px-5 py-4 leading-relaxed text-foreground/85">{row.onPremise[locale]}</td>
                <td className="px-5 py-4 leading-relaxed text-foreground/85">{row.api[locale]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="grid gap-4 md:hidden">
        {rows.map((row) => (
          <li key={row.id} className="panel p-5">
            <h5 className="flex flex-wrap items-center gap-2 font-display text-base font-semibold text-champagne">
              {row.criterion[locale]}
              {todo(row)}
            </h5>
            <dl className="mt-3 space-y-3 text-sm leading-relaxed">
              <div>
                <dt className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{c.onPremise}</dt>
                <dd className="mt-1 text-foreground/85">{row.onPremise[locale]}</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{c.api}</dt>
                <dd className="mt-1 text-foreground/85">{row.api[locale]}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </div>
  )
}
