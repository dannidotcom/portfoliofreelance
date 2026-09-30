"use client"

import { useRouter } from "next/navigation"
import type { ComponentType, SVGProps } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { Command } from "cmdk"
import {
  Briefcase,
  Code2,
  Copy,
  Download,
  FileText,
  FolderGit2,
  Github,
  Hash,
  Languages,
  Layers,
  Mail,
  NotebookPen,
  Sparkles,
  User,
  Workflow,
} from "lucide-react"
import type { Locale } from "@/content/types"
import { getDictionary } from "@/content/ui"
import { cn } from "@/lib/utils"

export type PaletteProject = { slug: string; title: string; href: string; caseStudy: boolean; keywords: string }

type Icon = ComponentType<SVGProps<SVGSVGElement>>

type Props = {
  locale: Locale
  open: boolean
  onOpenChange: (open: boolean) => void
  home: string
  switchHref: string
  cv: { href: string; fileName: string }
  email: string
  githubUrl: string
  notesHref: string | null
  projects: PaletteProject[]
  onAnnounce: (message: string) => void
}

function Item({
  value,
  keywords,
  icon: IconComponent,
  label,
  meta,
  onSelect,
}: {
  value: string
  keywords?: string[]
  icon: Icon
  label: string
  meta?: string
  onSelect: () => void
}) {
  return (
    <Command.Item
      value={value}
      keywords={keywords}
      onSelect={onSelect}
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground/85 outline-none",
        "data-[selected=true]:bg-primary/10 data-[selected=true]:text-foreground",
      )}
    >
      <IconComponent className="h-4 w-4 shrink-0 text-primary" aria-hidden />
      <span className="min-w-0 flex-1 truncate">{label}</span>
      {meta ? <span className="shrink-0 text-xs text-muted-foreground">{meta}</span> : null}
    </Command.Item>
  )
}

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()

/** Every search term must appear in the item text (accent-insensitive); keeps the authored order. */
function filterItems(value: string, search: string, keywords: string[] = []) {
  const haystack = normalize([value, ...keywords].join(" "))
  return normalize(search)
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term))
    ? 1
    : 0
}

const groupClass =
  "[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.18em] [&_[cmdk-group-heading]]:text-accent-steel"

export default function CommandPalette({
  locale,
  open,
  onOpenChange,
  home,
  switchHref,
  cv,
  email,
  githubUrl,
  notesHref,
  projects,
  onAnnounce,
}: Props) {
  const router = useRouter()
  const dict = getDictionary(locale)
  const p = dict.palette

  const run = (action: () => void) => {
    onOpenChange(false)
    action()
  }

  const go = (href: string) => run(() => router.push(href))

  const sections: { id: string; label: string; icon: Icon }[] = [
    { id: "featured", label: p.featured, icon: Sparkles },
    { id: "architecture", label: dict.nav.architecture, icon: Workflow },
    { id: "projects", label: dict.nav.projects, icon: FolderGit2 },
    { id: "skills", label: dict.nav.skills, icon: Layers },
    { id: "experience", label: dict.nav.experience, icon: Briefcase },
    { id: "github", label: dict.nav.github, icon: Code2 },
    { id: "about", label: dict.nav.about, icon: User },
    { id: "contact", label: dict.nav.contact, icon: Mail },
  ]

  const copyEmail = () =>
    run(() => {
      navigator.clipboard
        .writeText(email)
        .then(() => onAnnounce(p.emailCopied))
        .catch(() => onAnnounce(`${p.copyFailed}${email}`))
    })

  const downloadCv = () =>
    run(() => {
      const link = document.createElement("a")
      link.href = cv.href
      link.download = cv.fileName
      document.body.appendChild(link)
      link.click()
      link.remove()
    })

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          className="fixed left-1/2 top-[12vh] z-[61] w-[min(40rem,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-[#0b111c]/95 shadow-2xl backdrop-blur-xl data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
        >
          <Dialog.Title className="sr-only">{p.title}</Dialog.Title>
          <Dialog.Description className="sr-only">{p.hint}</Dialog.Description>
          <Command label={p.title} loop filter={filterItems}>
            <div className="flex items-center gap-3 border-b border-white/[0.08] px-4">
              <Hash className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
              <Command.Input
                placeholder={p.placeholder}
                className="h-14 w-full bg-transparent text-[15px] text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <kbd className="hidden shrink-0 rounded border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline">
                Esc
              </kbd>
            </div>
            <Command.List className="max-h-[min(26rem,60vh)] overflow-y-auto overscroll-contain p-2 [scrollbar-color:hsl(210_14%_28%)_transparent] [scrollbar-width:thin]">
              <Command.Empty className="px-3 py-8 text-center text-sm text-muted-foreground">{p.empty}</Command.Empty>

              <Command.Group heading={p.sections} className={groupClass}>
                {sections.map((section) => (
                  <Item
                    key={section.id}
                    value={`section-${section.id}`}
                    keywords={[section.label, section.id]}
                    icon={section.icon}
                    label={section.label}
                    onSelect={() => go(`${home}#${section.id}`)}
                  />
                ))}
                {notesHref ? (
                  <Item
                    value="section-notes"
                    keywords={[dict.nav.notes, "notes", "blog"]}
                    icon={NotebookPen}
                    label={dict.nav.notes}
                    onSelect={() => go(notesHref)}
                  />
                ) : null}
              </Command.Group>

              <Command.Group heading={p.projects} className={groupClass}>
                {projects.map((project) => (
                  <Item
                    key={project.slug}
                    value={`project-${project.slug}`}
                    keywords={[project.title, project.keywords]}
                    icon={project.caseStudy ? FileText : FolderGit2}
                    label={project.title}
                    meta={project.caseStudy ? p.caseStudy : undefined}
                    onSelect={() => go(project.href)}
                  />
                ))}
              </Command.Group>

              <Command.Group heading={p.actions} className={groupClass}>
                <Item
                  value="action-language"
                  keywords={[p.switchLanguage, "language", "langue", "english", "français"]}
                  icon={Languages}
                  label={p.switchLanguage}
                  onSelect={() => go(switchHref)}
                />
                <Item
                  value="action-cv"
                  keywords={[p.downloadCv, "cv", "resume", "pdf"]}
                  icon={Download}
                  label={p.downloadCv}
                  onSelect={downloadCv}
                />
                <Item
                  value="action-email"
                  keywords={[p.copyEmail, "email", "mail", email]}
                  icon={Copy}
                  label={p.copyEmail}
                  meta={email}
                  onSelect={copyEmail}
                />
                <Item
                  value="action-github"
                  keywords={[p.github, "github", "code", "open source"]}
                  icon={Github}
                  label={p.github}
                  onSelect={() => run(() => window.open(githubUrl, "_blank", "noopener,noreferrer"))}
                />
              </Command.Group>
            </Command.List>
            <p className="border-t border-white/[0.08] px-4 py-2.5 text-[11px] text-muted-foreground" aria-hidden>
              {p.hint}
            </p>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
