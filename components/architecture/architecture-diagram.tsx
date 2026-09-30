"use client"

import { useId, useState, type KeyboardEvent } from "react"
import { NODE_H, NODE_W, type Diagram, type DiagramEdge, type DiagramNode, type NodeKind } from "@/content/architecture"
import type { Locale } from "@/content/types"
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

function tooltipPosition(node: DiagramNode, diagram: Diagram) {
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
  const uid = useId().replace(/:/g, "")
  const [active, setActive] = useState<string | null>(null)
  const nodesById = Object.fromEntries(diagram.nodes.map((node) => [node.id, node]))
  const activeNode = active ? nodesById[active] : null
  const arrowId = `${uid}-arrow`
  const arrowActiveId = `${uid}-arrow-active`

  const onKeyDown = (event: KeyboardEvent<SVGGElement>, id: string) => {
    if (event.key === "Escape") {
      setActive(null)
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      setActive((current) => (current === id ? null : id))
    }
  }

  return (
    <figure className="space-y-4" aria-label={diagram.title[locale]}>
      <div className="relative hidden lg:block">
        <svg
          viewBox={`0 0 ${diagram.width} ${diagram.height}`}
          className="h-auto w-full select-none overflow-visible"
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
              <path d="M0 0 L10 5 L0 10 z" fill="hsl(168 55% 50%)" />
            </marker>
          </defs>

          <g aria-hidden>
            {diagram.edges.map((edge) => {
              const highlighted = active !== null && (edge.from === active || edge.to === active)
              return (
                <path
                  key={`${edge.from}-${edge.to}`}
                  d={edgePath(edge, nodesById)}
                  fill="none"
                  strokeWidth={highlighted ? 2 : 1.4}
                  strokeLinejoin="round"
                  stroke={highlighted ? "hsl(168 55% 50%)" : "hsl(220 12% 45% / 0.8)"}
                  strokeDasharray={edge.dashed ? "4 5" : highlighted ? "7 5" : undefined}
                  markerEnd={`url(#${highlighted ? arrowActiveId : arrowId})`}
                  className={cn("transition-[stroke] duration-200", highlighted && !edge.dashed && "diagram-flow")}
                />
              )
            })}
          </g>

          {diagram.nodes.map((node) => {
            const style = KIND_STYLE[node.kind]
            const w = nodeWidth(node)
            const isActive = active === node.id
            const dimmed = active !== null && !isActive
            return (
              <g
                key={node.id}
                tabIndex={0}
                role="button"
                aria-expanded={isActive}
                aria-label={`${node.label[locale]} — ${node.sub[locale]}`}
                aria-describedby={`${uid}-${node.id}-desc`}
                className="cursor-default outline-none"
                onMouseEnter={() => setActive(node.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(node.id)}
                onBlur={() => setActive(null)}
                onKeyDown={(event) => onKeyDown(event, node.id)}
                style={{ opacity: dimmed ? 0.55 : 1, transition: "opacity 200ms" }}
              >
                <rect
                  x={node.x}
                  y={node.y}
                  width={w}
                  height={NODE_H}
                  rx={12}
                  fill={style.fill}
                  stroke={isActive ? "hsl(168 55% 55%)" : style.stroke}
                  strokeWidth={isActive ? 2 : 1}
                />
                {isActive ? (
                  <rect
                    x={node.x - 4}
                    y={node.y - 4}
                    width={w + 8}
                    height={NODE_H + 8}
                    rx={15}
                    fill="none"
                    stroke="hsl(168 55% 50% / 0.35)"
                    strokeWidth={2}
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
            style={tooltipPosition(activeNode, diagram)}
          >
            <p className="mb-1 font-semibold text-champagne">{activeNode.label[locale]}</p>
            {activeNode.detail[locale]}
          </div>
        ) : null}
      </div>

      <ol className="space-y-2 lg:hidden">
        {diagram.nodes.map((node) => {
          const style = KIND_STYLE[node.kind]
          return (
            <li key={node.id} className="panel p-4" style={{ borderColor: style.stroke }}>
              <p className="flex items-center gap-2 text-sm font-semibold text-champagne">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: style.accent }} aria-hidden />
                {node.label[locale]}
                <span className="font-mono text-[11px] font-normal text-muted-foreground">· {node.sub[locale]}</span>
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{node.detail[locale]}</p>
            </li>
          )
        })}
      </ol>

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
