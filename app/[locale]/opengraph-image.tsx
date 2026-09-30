import { ImageResponse } from "next/og"
import { profile, siteUrl } from "@/content/profile"
import { isLocale } from "@/lib/i18n"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = `${profile.fullName} — ${profile.title}`

const TAGS = ["Python", "Data Architecture", "ETL / ELT", "RAG", "FastAPI", "LLM serving"]

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale = isLocale(raw) ? raw : "fr"

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#070b12",
          backgroundImage:
            "radial-gradient(ellipse 70% 60% at 10% 0%, rgba(49,160,136,0.28), transparent 60%), radial-gradient(ellipse 60% 50% at 100% 10%, rgba(45,95,140,0.22), transparent 55%)",
          color: "#f2efe9",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, color: "#6fd6c0" }}>
          <div style={{ width: 12, height: 12, borderRadius: 999, backgroundColor: "#31a088" }} />
          {siteUrl.replace("https://", "")}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05, color: "#ece6da" }}>
            {profile.fullName}
          </div>
          <div style={{ fontSize: 36, fontWeight: 600, color: "#6fd6c0" }}>{profile.title}</div>
          <div style={{ fontSize: 28, lineHeight: 1.35, color: "#a3a9b5", maxWidth: 980 }}>
            {profile.tagline[locale]}
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          {TAGS.map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                fontSize: 22,
                padding: "10px 20px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.14)",
                backgroundColor: "rgba(255,255,255,0.04)",
                color: "#dfe4ea",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  )
}
