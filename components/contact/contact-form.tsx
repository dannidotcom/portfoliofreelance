"use client"

import { useEffect, useRef, useState, type FormEvent } from "react"
import { Loader2, Send } from "lucide-react"
import type { Locale } from "@/content/types"
import { getDictionary } from "@/content/ui"
import {
  CONTACT_FIELDS,
  CONTACT_LIMITS,
  type ContactErrorCode,
  type ContactErrors as Errors,
  type ContactField,
} from "@/lib/contact-fields"
import { cn } from "@/lib/utils"

type Status = "idle" | "sending" | "sent"

const loadValidator = () => import("@/lib/contact").then((mod) => mod.validateContact)

export default function ContactForm({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const c = dict.contact
  const [status, setStatus] = useState<Status>("idle")
  const [errors, setErrors] = useState<Errors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const startedAt = useRef(0)
  const formRef = useRef<HTMLFormElement>(null)
  const successRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    startedAt.current = Date.now()
  }, [status])

  useEffect(() => {
    if (status === "sent") successRef.current?.focus()
  }, [status])

  const values = (form: HTMLFormElement) => {
    const data = new FormData(form)
    return {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      subject: String(data.get("subject") ?? ""),
      message: String(data.get("message") ?? ""),
      locale,
    }
  }

  const focusFirstError = (errs: Errors) => {
    const first = CONTACT_FIELDS.find((field) => errs[field])
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
  }

  const revalidate = async (field: ContactField) => {
    if (!errors[field] || !formRef.current) return
    const validate = await loadValidator()
    const result = validate(values(formRef.current))
    const next = result.success ? {} : result.errors
    setErrors((current) => ({ ...current, [field]: next[field] }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    setFormError(null)

    const validate = await loadValidator().catch(() => null)
    if (!validate) {
      setFormError(c.errorNetwork)
      return
    }
    const parsed = validate(values(form))
    if (!parsed.success) {
      setErrors(parsed.errors)
      focusFirstError(parsed.errors)
      return
    }
    setErrors({})
    setStatus("sending")

    const website = String(new FormData(form).get("website") ?? "")
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, website, startedAt: startedAt.current }),
      })
      if (response.ok) {
        form.reset()
        setStatus("sent")
        return
      }
      const body = (await response.json().catch(() => ({}))) as { errors?: Errors }
      setStatus("idle")
      if (response.status === 400 && body.errors && Object.keys(body.errors).length) {
        setErrors(body.errors)
        focusFirstError(body.errors)
      } else if (response.status === 429) {
        setFormError(c.errorRateLimited)
      } else {
        setFormError(c.errorGeneric)
      }
    } catch {
      setStatus("idle")
      setFormError(c.errorNetwork)
    }
  }

  if (status === "sent") {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="panel panel-glow p-8 md:p-10 focus:outline-none">
        <p className="font-display text-2xl font-semibold text-champagne">{c.sentTitle}</p>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{c.sentBody}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 text-sm text-primary hover:underline focus-ring rounded-md"
        >
          {c.sendAnother}
        </button>
      </div>
    )
  }

  const errorCount = Object.values(errors).filter(Boolean).length
  const fields: {
    name: ContactField
    label: string
    placeholder: string
    type?: string
    autoComplete?: string
    multiline?: boolean
  }[] = [
    { name: "name", label: c.name, placeholder: c.namePlaceholder, autoComplete: "name" },
    { name: "email", label: c.email, placeholder: c.emailPlaceholder, type: "email", autoComplete: "email" },
    { name: "subject", label: c.subject, placeholder: c.subjectPlaceholder },
    { name: "message", label: c.message, placeholder: c.messagePlaceholder, multiline: true },
  ]

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      onFocus={() => void loadValidator()}
      noValidate
      aria-describedby={errorCount ? "contact-error-summary" : undefined}
      className="panel panel-glow relative space-y-4 p-6 md:p-8"
    >
      {errorCount ? (
        <p id="contact-error-summary" role="alert" className="text-sm text-red-300">
          {c.errorSummary(errorCount)}
        </p>
      ) : null}

      <div className="grid sm:grid-cols-2 gap-4">
        {fields.slice(0, 2).map((field) => (
          <Field key={field.name} {...field} error={errors[field.name]} dict={c} onChange={revalidate} />
        ))}
      </div>
      {fields.slice(2).map((field) => (
        <Field key={field.name} {...field} error={errors[field.name]} dict={c} onChange={revalidate} />
      ))}

      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
        <label>
          {c.honeypot}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      {formError ? (
        <p className="text-sm text-red-300" role="alert">
          {formError}
        </p>
      ) : null}

      <p className="sr-only" role="status" aria-live="polite">
        {status === "sending" ? c.sending : ""}
      </p>

      <button type="submit" disabled={status === "sending"} className="btn-primary disabled:opacity-60">
        {status === "sending" ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        ) : (
          <Send className="h-4 w-4" aria-hidden />
        )}
        {status === "sending" ? c.sending : c.send}
      </button>
    </form>
  )
}

function Field({
  name,
  label,
  placeholder,
  type = "text",
  autoComplete,
  multiline,
  error,
  dict,
  onChange,
}: {
  name: ContactField
  label: string
  placeholder: string
  type?: string
  autoComplete?: string
  multiline?: boolean
  error?: ContactErrorCode
  dict: ReturnType<typeof getDictionary>["contact"]
  onChange: (field: ContactField) => void
}) {
  const id = `contact-${name}`
  const errorId = `${id}-error`
  const common = {
    id,
    name,
    required: true,
    "aria-required": true,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    maxLength: CONTACT_LIMITS[name],
    placeholder,
    onChange: () => onChange(name),
    className: cn("input-field", error && "!border-red-400/70 focus:!ring-red-400/40"),
  }

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-xs text-muted-foreground">
        {label} <span aria-hidden>*</span>
        <span className="sr-only"> ({dict.required})</span>
      </label>
      {multiline ? (
        <textarea {...common} rows={5} className={cn(common.className, "resize-y min-h-[130px]")} />
      ) : (
        <input {...common} type={type} autoComplete={autoComplete} />
      )}
      {error ? (
        <p id={errorId} className="text-xs text-red-300">
          {dict.errors[error]}
        </p>
      ) : null}
    </div>
  )
}
