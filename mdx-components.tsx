import type { MDXComponents } from "mdx/types"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => (
      <h2 className="font-display text-2xl font-semibold text-champagne mt-12 mb-4 scroll-mt-24" {...props} />
    ),
    h3: (props) => <h3 className="font-display text-lg font-semibold text-foreground mt-8 mb-3" {...props} />,
    p: (props) => <p className="text-base leading-relaxed text-muted-foreground my-4" {...props} />,
    ul: (props) => <ul className="my-4 space-y-2 pl-5 list-disc marker:text-primary text-muted-foreground" {...props} />,
    ol: (props) => (
      <ol className="my-4 space-y-2 pl-5 list-decimal marker:text-primary text-muted-foreground" {...props} />
    ),
    li: (props) => <li className="leading-relaxed" {...props} />,
    a: (props) => (
      <a className="text-primary underline underline-offset-4 hover:text-foreground focus-ring rounded-sm" {...props} />
    ),
    code: (props) => (
      <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.85em] text-foreground" {...props} />
    ),
    pre: (props) => (
      <pre
        className="my-6 overflow-x-auto rounded-xl border border-white/10 bg-[#0b111c] p-4 font-mono text-sm [&>code]:bg-transparent [&>code]:p-0"
        {...props}
      />
    ),
    blockquote: (props) => (
      <blockquote className="my-6 border-l-2 border-primary/60 pl-4 italic text-foreground/80" {...props} />
    ),
    strong: (props) => <strong className="font-semibold text-foreground" {...props} />,
    ...components,
  }
}
