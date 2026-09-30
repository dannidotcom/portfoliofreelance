/** Only rendered in TODO preview mode (NEXT_PUBLIC_SHOW_TODOS=1 in dev). */
export default function TodoMark({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-md border border-dashed border-amber-400/60 px-2 py-0.5 font-mono text-[11px] text-amber-300">
      TODO · {label}
    </span>
  )
}
