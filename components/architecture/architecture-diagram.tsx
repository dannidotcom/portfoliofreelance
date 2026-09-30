"use client"

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react"
import { NODE_H, NODE_W, type Diagram, type DiagramEdge, type DiagramNode, type NodeKind } from "@/content/architecture"
import type { Locale } from "@/content/types"
import { getDictionary } from "@/content/ui"
import FlowArrow from "@/components/sequence/flow-arrow"
import SequenceControls from "@/components/sequence/sequence-controls"
import { stepFromKey, useStepSequence } from "@/hooks/use-step-sequence"
import { cn } from "@/lib/utils"

type Point = [number, number]
type Side = "top" | "bottom" | "left" | "right"

const KIND_STYLE: Record<NodeKind, { fill: string; stroke: string; accent: string }> = {
  client: { fill: "hsl(40 18% 94% / 0.04)", stroke: "hsl(40 18% 94% / 0.22)", accent: "hsl(40 24% 88%)" },
  service: { fill: "hsl(168 55% 42% / 0.10)", stroke: "hsl(168 55% 42% / 0.45)", accent: "hsl(168 48% 58%)" },
  store: { fill: "hsl(210 50% 50% / 0.10)", stroke: "hsl(210 55% 60% / 0.45)", accent: "hsl(210 70% 72%)" },
  model: { fill: "hsl(38 70% 55% / 0.10)", stroke: "hsl(38 70% 60% / 0.45)", accent: "hsl(38 85% 70%)" },
  ops: { fill: "hsl(220 14% 60% / 0.06)", stroke: "hsl(220 14% 60% / 0.30)", accent: "hsl(220 12% 72%)" },
}

const EDGE_COLOR = "hsl(168 55% 50%)"
const TRACK_COLOR = "hsl(220 12% 45% / 0.35)"

function nodeWidth(node: DiagramNode) {
  return node.w ?? NODE_W
}

function anchor(node: DiagramNode, side: Side, at?: number): Point {
  const w = nodeWidth(node)
  switch (side) {
    case "top":
      return [at ?? node.x + w / 2, node.y]
    case "bottom":
      return [at ?? node.x + w / 2, node.y + NODE_H]
    case "left":
      return [node.x, at ?? node.y + NODE_H / 2]
    case "right":
      return [node.x + w, at ?? node.y + NODE_H / 2]
  }
}

function autoSides(from: DiagramNode, to: DiagramNode): [Side, Side] {
  const dx = to.x + nodeWidth(to) / 2 - (from.x + nodeWidth(from) / 2)
  const dy = to.y - from.y
  if (Math.abs(dx) >= Math.abs(dy)) return dx >= 0 ? ["right", "left"] : ["left", "right"]
  return dy >= 0 ? ["bottom", "top"] : ["top", "bottom"]
}

function edgePath(edge: DiagramEdge, nodes: Record<string, DiagramNode>) {
  const from = nodes[edge.from]
  const to = nodes[edge.to]
  const [autoFrom, autoTo] = autoSides(from, to)
  const points: Point[] = [
    anchor(from, edge.fromSide ?? autoFrom),
    ...(edge.via ?? []),
    anchor(to, edge.toSide ?? autoTo, edge.toAt),
  ]
  return points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y}`).join(" ")
}

/** Forward edges draw just before their target lights up; edges going back draw right after their source. */
function edgePhase(edge: DiagramEdge, order: Record<string, number>) {
  const from = order[edge.from]
  const to = order[edge.to]
  return to > from ? 2 * to - 1 : 2 * from + 1
}

function overlayPosition(node: DiagramNode, diagram: Diagram) {
  const centerX = (node.x + nodeWidth(node) / 2) / diagram.width
  const below = node.y < diagram.height * 0.35
  const shiftX = centerX < 0.15 ? "-15%" : centerX > 0.85 ? "-85%" : "-50%"
  return {
    left: `${centerX * 100}%`,
    top: `${((below ? node.y + NODE_H : node.y) / diagram.height) * 100}%`,
    transform: below ? `translate(${shiftX}, 12px)` : `translate(${shiftX}, calc(-100% - 12px))`,
  }
}

export default function ArchitectureDiagram({
  diagram,
  locale,
  hint,
}: {
  diagram: Diagram
  locale: Locale
  hint: string
}) {
  const s = getDictionary(locale).sequence
  const uid = useId().replace(/:/g, "")
  const [active, setActive] = useState<string | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const nodeRefs = useRef<(SVGGElement | null)[]>([])
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])

  const nodesById = Object.fromEntries(diagram.nodes.map((node) => [node.id, node]))
  const order = Object.fromEntries(diagram.nodes.map((node, i) => [node.id, i]))
  const edges = diagram.edges.map((edge) => ({ edge, d: edgePath(edge, nodesById), phase: edgePhase(edge, order) }))
  const sequence = useStepSequence<HTMLElement>({
    steps: diagram.nodes.length,
    maxPhase: Math.max(...edges.map((item) => item.phase)),
  })
  const running = sequence.started && !sequence.reduced
  const currentNode = sequence.step >= 0 ? diagram.nodes[sequence.step] : null
  const caption = (node: DiagramNode) => diagram.captions?.[node.id]?.[locale] ?? node.sub[locale]
  const activeNode = active ? nodesById[active] : null
  const arrowId = `${uid}-arrow`
  const arrowActiveId = `${uid}-arrow-active`

  useEffect(() => {
    const svg = svgRef.current
    if (!svg || typeof svg.pauseAnimations !== "function") return
    if (sequence.visible) svg.unpauseAnimations()
    else svg.pauseAnimations()
  }, [sequence.visible])

  const moveTo = (target: number, focusables: (SVGGElement | HTMLButtonElement | null)[]) => {
    sequence.goTo(target)
    focusables[target]?.focus()
  }

  const onNodeKeyDown = (event: KeyboardEvent<SVGGElement>, id: string, index: number) => {
    const target = stepFromKey(event.key, index, diagram.nodes.length)
    if (target !== null) {
      event.preventDefault()
      moveTo(target, nodeRefs.current)
    } else if (event.key === "Escape") {
      setActive(null)
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      sequence.goTo(index)
      setActive((current) => (current === id ? null : id))
    }
  }

  const onItemKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const target = stepFromKey(event.key, index, diagram.nodes.length)
    if (target === null) return
    event.preventDefault()
    moveTo(target, itemRefs.current)
  }

  return (
    <figure
      ref={sequence.ref}
      className="space-y-5"
      aria-label={diagram.title[locale]}
      data-sequence={running ? "running" : "idle"}
    >
      <p className="sr-only">
        {s.flow(diagram.nodes.map((node) => node.label[locale]))} {s.keyboard}
      </p>

      <div className="relative hidden lg:block">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${diagram.width} ${diagram.height}`}
          className="mx-auto h-auto w-full select-none overflow-visible"
          style={{ maxWidth: diagram.width }}
          role="group"
          aria-label={`${diagram.title[locale]} — ${hint}`}
        >
          <defs>
            <marker id={arrowId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0 0 L10 5 L0 10 z" fill="hsl(220 12% 55%)" />
            </marker>
            <marker
              id={arrowActiveId}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 z" fill={EDGE_COLOR} />
            </marker>
          </defs>

          <g aria-hidden>
            {edges.map(({ edge, d, phase }) => {
              const drawn = sequence.isDrawn(phase)
              const headVisible = sequence.phase > phase || sequence.done
              const highlighted = active !== null && (edge.from === active || edge.to === active)
              return (
                <g key={`${edge.from}-${edge.to}`}>
                  <path d={d} fill="none" strokeWidth={1.4} strokeLinejoin="round" stroke={TRACK_COLOR} strokeDasharray={edge.dashed ? "4 5" : undefined} />
                  {edge.dashed ? (
                    <path
                      d={d}
                      fill="none"
                      strokeWidth={1.4}
                      strokeDasharray="4 5"
                      stroke="hsl(220 12% 55% / 0.9)"
                      markerEnd={headVisible ? `url(#${arrowId})` : undefined}
                      className="diagram-edge"
                      style={{ opacity: drawn ? 1 : 0 }}
                    />
                  ) : (
                    <path
                      d={d}
                      pathLength={1}
                      fill="none"
                      strokeWidth={1.6}
                      strokeLinejoin="round"
                      stroke={EDGE_COLOR}
                      strokeOpacity={0.75}
                      strokeDasharray="1"
                      markerEnd={headVisible ? `url(#${arrowActiveId})` : undefined}
                      className="diagram-edge"
                      style={{ strokeDashoffset: drawn ? 0 : 1 }}
                    />
                  )}
                  {highlighted ? (
                    <path
                      d={d}
                      fill="none"
                      strokeWidth={2}
                      strokeLinejoin="round"
                      stroke={EDGE_COLOR}
                      strokeDasharray="7 5"
                      className="diagram-flow"
                    />
                  ) : null}
                  {running && drawn && !edge.dashed ? (
                    <circle r={3.2} fill="hsl(168 70% 62%)" style={{ filter: "drop-shadow(0 0 4px hsl(168 70% 55%))" }}>
                      <animateMotion dur="1.8s" repeatCount="indefinite" path={d} rotate="auto" />
                    </circle>
                  ) : null}
                </g>
              )
            })}
          </g>

          {diagram.nodes.map((node, index) => {
            const style = KIND_STYLE[node.kind]
            const w = nodeWidth(node)
            const isHovered = active === node.id
            const isCurrent = running && sequence.step === index
            const lit = !running || sequence.isLit(index)
            const opacity = !lit ? 0.35 : active !== null && !isHovered ? 0.55 : 1
            return (
              <g
                key={node.id}
                ref={(element) => {
                  nodeRefs.current[index] = element
                }}
                tabIndex={0}
                role="button"
                aria-expanded={isHovered}
                aria-current={isCurrent ? "step" : undefined}
                aria-label={`${node.label[locale]} — ${node.sub[locale]}`}
                aria-describedby={`${uid}-${node.id}-desc`}
                className="diagram-node cursor-pointer outline-none"
                onMouseEnter={() => setActive(node.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(node.id)}
                onBlur={() => setActive(null)}
                onClick={() => sequence.goTo(index)}
                onKeyDown={(event) => onNodeKeyDown(event, node.id, index)}
                style={{ opacity, transform: isCurrent ? "scale(1.04)" : undefined }}
              >
                <rect
                  x={node.x}
                  y={node.y}
                  width={w}
                  height={NODE_H}
                  rx={12}
                  fill={style.fill}
                  stroke={isHovered || isCurrent ? "hsl(168 55% 55%)" : style.stroke}
                  strokeWidth={isHovered || isCurrent ? 2 : 1}
                />
                {isHovered || isCurrent ? (
                  <rect
                    x={node.x - 4}
                    y={node.y - 4}
                    width={w + 8}
                    height={NODE_H + 8}
                    rx={15}
                    fill="none"
                    stroke="hsl(168 55% 50% / 0.35)"
                    strokeWidth={2}
                    style={isCurrent ? { filter: "drop-shadow(0 0 8px hsl(168 55% 50% / 0.6))" } : undefined}
                  />
                ) : null}
                <circle cx={node.x + 16} cy={node.y + 22} r={3.5} fill={style.accent} />
                <text
                  x={node.x + 28}
                  y={node.y + 27}
                  fill="hsl(40 24% 90%)"
                  fontSize={14}
                  fontWeight={600}
                  className="font-sans"
                >
                  {node.label[locale]}
                </text>
                <text x={node.x + 16} y={node.y + 49} fill="hsl(220 12% 72%)" fontSize={11} className="font-mono">
                  {node.sub[locale]}
                </text>
              </g>
            )
          })}
        </svg>

        {activeNode ? (
          <div
            role="tooltip"
            className="pointer-events-none absolute z-20 w-64 rounded-xl border border-white/10 bg-background/95 p-3.5 text-xs leading-relaxed text-foreground/90 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.8)] backdrop-blur-md"
            style={overlayPosition(activeNode, diagram)}
          >
            <p className="mb-1 font-semibold text-champagne">{activeNode.label[locale]}</p>
            {activeNode.detail[locale]}
          </div>
        ) : running && currentNode ? (
          <div
            aria-hidden
            className="pointer-events-none absolute z-10 whitespace-nowrap rounded-full border border-primary/40 bg-background/90 px-3 py-1 text-[11px] font-medium text-champagne shadow-[0_8px_30px_-12px_hsl(168_55%_40%/0.6)] backdrop-blur-md"
            style={overlayPosition(currentNode, diagram)}
          >
            {caption(currentNode)}
          </div>
        ) : null}
      </div>

      <ol className="lg:hidden">
        {diagram.nodes.map((node, index) => {
          const style = KIND_STYLE[node.kind]
          const isCurrent = running && sequence.step === index
          return (
            <li key={node.id}>
              <div
                className={cn("step-card panel relative p-4", sequence.isLit(index) && "is-lit", isCurrent && "is-current")}
                style={isCurrent ? undefined : { borderColor: style.stroke }}
              >
                <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold text-champagne">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: style.accent }} aria-hidden />
                  <button
                    ref={(element) => {
                      itemRefs.current[index] = element
                    }}
                    type="button"
                    aria-current={isCurrent ? "step" : undefined}
                    onClick={() => sequence.goTo(index)}
                    onKeyDown={(event) => onItemKeyDown(event, index)}
                    className="text-left after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-inset focus-visible:after:ring-ring"
                  >
                    {node.label[locale]}
                  </button>
                  <span className="font-mono text-[11px] font-normal text-muted-foreground">· {node.sub[locale]}</span>
                </p>
                {isCurrent ? (
                  <p className="mt-2 inline-flex rounded-full border border-primary/40 px-2.5 py-0.5 text-[11px] text-champagne" aria-hidden>
                    {caption(node)}
                  </p>
                ) : null}
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{node.detail[locale]}</p>
              </div>
              {index < diagram.nodes.length - 1 ? <FlowArrow vertical drawn={sequence.isDrawn(2 * index + 1)} /> : null}
            </li>
          )
        })}
      </ol>

      <SequenceControls
        sequence={sequence}
        locale={locale}
        stepLabel={currentNode ? `${currentNode.label[locale]} — ${caption(currentNode)}` : ""}
      />

      <div className="sr-only">
        {diagram.nodes.map((node) => (
          <p key={node.id} id={`${uid}-${node.id}-desc`}>
            {node.detail[locale]}
          </p>
        ))}
      </div>

      <figcaption className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
        {diagram.description[locale]} <span className="hidden lg:inline text-muted-foreground">{hint}</span>
      </figcaption>
    </figure>
  )
}
