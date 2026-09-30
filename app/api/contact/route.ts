import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { profile, siteUrl } from "@/content/profile"
import type { Locale } from "@/content/types"
import { MIN_FILL_MS, validateContact, type ContactInput, type ContactTraps } from "@/lib/contact"
import { escapeHtml } from "@/lib/escape-html"
import { localePath } from "@/lib/i18n"
import { createRateLimiter } from "@/lib/rate-limit"

const limiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 })

function clientIp(request: NextRequest): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown"
}

const CONFIRMATION: Record<Locale, { subject: string; greeting: string; body: string; next: string; cta: string; auto: string }> =
  {
    fr: {
      subject: `Message bien reçu — ${profile.fullName}`,
      greeting: "Bonjour,",
      body: "J'ai bien reçu votre message via mon portfolio et je vous remercie de votre intérêt.",
      next: "Vous recevrez une réponse personnalisée sous 24 à 48 h.",
      cta: "Voir mes projets",
      auto: "Cet email a été envoyé automatiquement. Merci de ne pas y répondre directement.",
    },
    en: {
      subject: `Message received — ${profile.fullName}`,
      greeting: "Hello,",
      body: "I have received your message through my portfolio and thank you for your interest.",
      next: "You will receive a personal reply within 24 to 48 hours.",
      cta: "See my projects",
      auto: "This email was sent automatically. Please do not reply to it directly.",
    },
  }

function adminEmail(data: ContactInput, ip: string) {
  const name = escapeHtml(data.name)
  const email = escapeHtml(data.email)
  const subject = escapeHtml(data.subject)
  const message = escapeHtml(data.message).replace(/\n/g, "<br>")
  const receivedAt = new Date().toLocaleString("fr-FR", { timeZone: "Indian/Antananarivo" })
  return {
    subject: `Portfolio — ${data.name.replace(/[\r\n]+/g, " ")} : ${data.subject.replace(/[\r\n]+/g, " ")}`,
    text: `De : ${data.name} <${data.email}>\nSujet : ${data.subject}\nLangue : ${data.locale}\n\n${data.message}\n\nReçu le ${receivedAt} (IP ${ip})`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#f6f8fa;border-radius:12px;color:#1f2937">
        <h1 style="font-size:20px;margin:0 0 16px">Nouveau message depuis le portfolio</h1>
        <p style="margin:4px 0"><strong>Nom :</strong> ${name}</p>
        <p style="margin:4px 0"><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
        <p style="margin:4px 0"><strong>Sujet :</strong> ${subject}</p>
        <p style="margin:4px 0"><strong>Langue :</strong> ${data.locale}</p>
        <div style="margin-top:16px;padding:16px;background:#fff;border-radius:8px;line-height:1.6">${message}</div>
        <p style="margin-top:16px;font-size:12px;color:#6b7280">Reçu le ${escapeHtml(receivedAt)} · IP ${escapeHtml(ip)}</p>
      </div>`,
  }
}

/** Contains no user-provided content, so the form cannot be used to relay arbitrary text. */
function confirmationEmail(locale: Locale) {
  const copy = CONFIRMATION[locale]
  const projectsUrl = `${siteUrl}${localePath(locale)}#projects`
  return {
    subject: copy.subject,
    text: `${copy.greeting}\n\n${copy.body}\n${copy.next}\n\n${copy.cta} : ${projectsUrl}\n\n${profile.fullName}\n${profile.title}\n${profile.email}\n\n${copy.auto}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#f6f8fa;border-radius:12px;color:#1f2937">
        <p style="font-size:16px">${copy.greeting}</p>
        <p style="line-height:1.6">${copy.body}</p>
        <p style="line-height:1.6">${copy.next}</p>
        <p style="margin:24px 0"><a href="${projectsUrl}" style="background:#0f766e;color:#fff;padding:10px 20px;border-radius:999px;text-decoration:none;display:inline-block">${copy.cta}</a></p>
        <p style="font-size:14px;color:#4b5563;border-top:1px solid #e5e7eb;padding-top:16px;margin-top:24px">
          <strong>${escapeHtml(profile.fullName)}</strong><br>${escapeHtml(profile.title)}<br>
          <a href="mailto:${profile.email}">${profile.email}</a>
        </p>
        <p style="font-size:12px;color:#6b7280">${copy.auto}</p>
      </div>`,
  }
}

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    body = null
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 })
  }

  const traps = body as ContactTraps
  const tooFast = typeof traps.startedAt === "number" && Date.now() - traps.startedAt < MIN_FILL_MS
  if ((typeof traps.website === "string" && traps.website.length > 0) || tooFast) {
    return NextResponse.json({ success: true })
  }

  const ip = clientIp(request)
  const rate = limiter(ip)
  if (!rate.ok) {
    return NextResponse.json(
      { error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(rate.retryAfter) } },
    )
  }

  const parsed = validateContact(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "validation", errors: parsed.errors }, { status: 400 })
  }
  const data = parsed.data

  const emailUser = process.env.EMAIL_USER
  const emailPass = process.env.EMAIL_PASS
  if (!emailUser || !emailPass) {
    console.error("[contact] EMAIL_USER / EMAIL_PASS are not configured")
    return NextResponse.json({ error: "not_configured" }, { status: 500 })
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: { user: emailUser, pass: emailPass },
  })

  try {
    await Promise.all([
      transporter.sendMail({
        from: emailUser,
        to: process.env.EMAIL_TO || emailUser,
        replyTo: data.email,
        ...adminEmail(data, ip),
      }),
      transporter.sendMail({ from: emailUser, to: data.email, ...confirmationEmail(data.locale) }),
    ])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[contact] send failed:", error instanceof Error ? error.message : error)
    return NextResponse.json({ error: "send_failed" }, { status: 502 })
  }
}
