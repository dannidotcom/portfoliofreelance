import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json()

        if (!email) return NextResponse.json({ error: "Email requis" }, { status: 400 })

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) return NextResponse.json({ error: "Email invalide" }, { status: 400 })

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        })

        await transporter.verify()

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "✅ Inscription Newsletter - Merci !",
            html: `<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; background: #f9fafb; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); overflow: hidden;">
  <div style="background: linear-gradient(90deg, #667eea, #764ba2); padding: 30px; text-align: center; color: white;">
    <h1 style="margin: 0; font-size: 28px;">🚀 Merci pour votre inscription !</h1>
  </div>

  <div style="padding: 30px; color: #333;">
    <p style="font-size: 16px; line-height: 1.6;">
      Bonjour,
    </p>
    <p style="font-size: 16px; line-height: 1.6;">
      Merci de vous être inscrit(e) à ma newsletter dédiée à l’Intelligence Artificielle et à l’automatisation.
      Vous recevrez bientôt mes derniers articles, conseils et astuces pour vous accompagner au mieux.
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="https://alphonse.ai/#newsletter" target="_blank" rel="noopener noreferrer"
        style="background: #764ba2; color: white; text-decoration: none; padding: 14px 36px; border-radius: 30px; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 4px 10px rgba(118,75,162,0.4); transition: background 0.3s ease;">
        📚 Découvrir mes articles
      </a>
    </div>

    <p style="font-size: 14px; color: #666; margin-top: 40px; line-height: 1.4;">
      Vous pouvez vous désabonner à tout moment en cliquant sur le lien ci-dessous.
    </p>
    <p style="text-align: center; margin-top: 10px;">
      <a href="https://dannidotcom/désabonnement?email=${encodeURIComponent(email)}"
         style="font-size: 14px; color: #764ba2; text-decoration: underline;">
         Se désabonner
      </a>
    </p>

    <hr style="border: none; border-top: 1px solid #ddd; margin: 40px 0;" />

    <p style="font-size: 13px; color: #999; text-align: center; line-height: 1.4;">
      © 2025 Donné Alphonse SOLOFONDRAIBE<br />
      Expert IA & Développement Fullstack
    </p>
  </div>
</div>
`,
        }

        await transporter.sendMail(mailOptions)

        return NextResponse.json({ success: true, message: "Inscription réussie. Vérifiez vos emails." }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Erreur serveur, réessayez." }, { status: 500 })
    }
}
