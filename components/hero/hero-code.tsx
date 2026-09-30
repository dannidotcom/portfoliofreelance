import type { Locale } from "@/content/types"
import { getDictionary } from "@/content/ui"
import { CODE_FILE, CODE_SAMPLE, tokenizeLine, type TokenType } from "./code-sample"

const TOKEN_CLASS: Record<TokenType, string> = {
  keyword: "text-[#6fd6c0]",
  string: "text-[#e6bf78]",
  comment: "text-[#7d8d99] italic",
  decorator: "text-[#8ecbff]",
  function: "text-[#8ecbff]",
  class: "text-[#f0dcb4]",
  number: "text-[#f5a97f]",
  plain: "text-[#d2dde6]",
}

export default function HeroCode({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const lines = CODE_SAMPLE.split("\n")

  return (
    <figure aria-label={dict.hero.codeLabel} className="panel panel-glow overflow-hidden bg-[#070d15]/95 backdrop-blur-md">
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" aria-hidden />
        <span className="ml-2 font-mono text-[11px] text-muted-foreground">{CODE_FILE}</span>
        <span className="ml-auto hidden font-mono text-[10px] uppercase tracking-[0.16em] text-accent-steel sm:inline">
          FastAPI · RAG · SSE
        </span>
      </div>
      <pre
        tabIndex={0}
        className="code-block overflow-x-auto py-4 pr-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/60 font-mono text-[11px] leading-[1.7] sm:text-[12px] lg:py-3 lg:text-[11px] lg:leading-[1.6] xl:text-[12px] xl:leading-[1.65]"
      >
        <code>
          {lines.map((line, i) => (
            <span key={i} className="code-line">
              {line.length
                ? tokenizeLine(line).map((token, j) => (
                    <span key={j} className={TOKEN_CLASS[token.type]}>
                      {token.text}
                    </span>
                  ))
                : " "}
            </span>
          ))}
        </code>
      </pre>
      <figcaption className="border-t border-white/[0.06] px-4 py-2.5 text-[12px] leading-relaxed text-muted-foreground">
        {dict.hero.codeNote}
      </figcaption>
    </figure>
  )
}
