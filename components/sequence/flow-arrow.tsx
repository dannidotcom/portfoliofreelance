import { cn } from "@/lib/utils"

/** Connector that draws itself (stroke-dashoffset) then reveals its head. Vertical below lg unless `vertical`. */
export default function FlowArrow({ drawn, vertical = false }: { drawn: boolean; vertical?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn("flex h-8 shrink-0 items-center justify-center", !vertical && "lg:h-auto lg:w-7 lg:self-center")}
    >
      <svg viewBox="0 0 24 24" fill="none" className={cn("h-6 w-6 rotate-90", !vertical && "lg:rotate-0")}>
        <path d="M2 12 H19" className="flow-arrow-track" />
        <path d="M2 12 H19" pathLength={1} className={cn("flow-arrow-line", drawn && "is-drawn")} />
        <path d="M14 7 L20 12 L14 17" className={cn("flow-arrow-head", drawn && "is-drawn")} />
      </svg>
    </span>
  )
}
