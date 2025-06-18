import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validation des données
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 })
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Format d'email invalide" }, { status: 400 })
    }

    // Validation de la longueur des champs
    if (name.length > 100 || subject.length > 200 || message.length > 2000) {
      return NextResponse.json({ error: "Un ou plusieurs champs sont trop longs" }, { status: 400 })
    }

    // Configuration du transporteur Nodemailer
    const transporter = nodemailer.createTransport({
      //service: "gmail",
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // Vérification de la configuration
    await transporter.verify()

    // Email pour vous (notification)
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: "alphonse.danni@gmail.com",
      subject: `🚀 Nouveau message de ${name}: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; border-radius: 10px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
            <h1 style="color: white; margin: 0; font-size: 24px;">📧 Nouveau Message de Contact</h1>
          </div>

          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="margin-bottom: 20px; padding: 15px; background-color: #e3f2fd; border-left: 4px solid #2196f3; border-radius: 5px;">
              <h3 style="margin: 0 0 10px 0; color: #1976d2;">Informations du contact</h3>
              <p style="margin: 5px 0;"><strong>Nom:</strong> ${name}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #2196f3;">${email}</a></p>
              <p style="margin: 5px 0;"><strong>Sujet:</strong> ${subject}</p>
            </div>

            <div style="margin-bottom: 20px;">
              <h3 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Message:</h3>
              <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin-top: 15px; line-height: 1.6;">
                ${message.replace(/\n/g, "<br>")}
              </div>
            </div>

            <div style="text-align: center; margin-top: 30px;">
              <a href="mailto:${email}?subject=Re: ${subject}"
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        padding: 12px 30px;
                        text-decoration: none;
                        border-radius: 25px;
                        font-weight: bold;
                        display: inline-block;">
                💬 Répondre directement
              </a>
            </div>
          </div>

          <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
            <p>Message reçu le ${new Date().toLocaleString("fr-FR", {
              timeZone: "Europe/Paris",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}</p>
          </div>
        </div>
      `,
    }

    // Email de confirmation pour le client
    const clientMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "✅ Message reçu - Donné Alphonse | Expert IA & Développement",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; border-radius: 10px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
            <h1 style="color: white; margin: 0; font-size: 24px;">🚀 Merci pour votre message !</h1>
          </div>

          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <p style="font-size: 16px; color: #333; margin-bottom: 20px;">Bonjour <strong>${name}</strong>,</p>

            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              J'ai bien reçu votre message concernant "<strong>${subject}</strong>" et je vous remercie pour votre intérêt pour mes services.
            </p>

            <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; border-left: 4px solid #4caf50; margin: 20px 0;">
              <h3 style="color: #2e7d32; margin: 0 0 10px 0;">⚡ Prochaines étapes</h3>
              <ul style="color: #333; margin: 0; padding-left: 20px;">
                <li>Je vais analyser votre demande en détail</li>
                <li>Vous recevrez une réponse personnalisée sous <strong>24-48h</strong></li>
                <li>Nous pourrons planifier un appel de découverte gratuit</li>
              </ul>
            </div>

            <div style="background-color: #f3e5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #7b1fa2; margin: 0 0 15px 0;">🎯 En attendant, découvrez :</h3>
              <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                <a href="https://alphonse.ai/#projects" style="background-color: #9c27b0; color: white; padding: 8px 16px; text-decoration: none; border-radius: 20px; font-size: 14px; display: inline-block;">📊 Mes projets</a>
                <a href="https://alphonse.ai/#services" style="background-color: #673ab7; color: white; padding: 8px 16px; text-decoration: none; border-radius: 20px; font-size: 14px; display: inline-block;">🛠️ Mes services</a>
                <a href="https://alphonse.ai/#testimonials" style="background-color: #3f51b5; color: white; padding: 8px 16px; text-decoration: none; border-radius: 20px; font-size: 14px; display: inline-block;">⭐ Témoignages</a>
              </div>
            </div>

            <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px;">
              <p style="color: #666; font-size: 14px; margin: 0;">
                <strong>Donné Alphonse SOLOFONDRAIBE</strong><br>
                Expert IA & Développement Fullstack<br>
                📧 <a href="mailto:alphonse.danni@gmail.com" style="color: #667eea;">alphonse.danni@gmail.com</a><br>
                📱 <a href="tel:+261387217907" style="color: #667eea;">+261 38 72 179 07</a>
              </p>
            </div>
          </div>

          <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
            <p>Cet email a été envoyé automatiquement. Merci de ne pas y répondre directement.</p>
          </div>
        </div>
      `,
    }

    // Envoi des emails
    await Promise.all([transporter.sendMail(adminMailOptions), transporter.sendMail(clientMailOptions)])

    // Log pour le suivi
    console.log("✅ Emails envoyés avec succès:", {
      from: email,
      name,
      subject,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(
      {
        success: true,
        message: "Message envoyé avec succès! Vous recevrez une réponse sous 24-48h. Vérifiez aussi vos spams.",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("❌ Erreur lors de l'envoi du message:", error)

    // Gestion spécifique des erreurs Nodemailer
    if (error instanceof Error) {
      if (error.message.includes("Invalid login")) {
        return NextResponse.json(
          { error: "Erreur de configuration email. Veuillez réessayer plus tard." },
          { status: 500 },
        )
      }
      if (error.message.includes("Network")) {
        return NextResponse.json({ error: "Erreur de réseau. Veuillez vérifier votre connexion." }, { status: 500 })
      }
    }

    return NextResponse.json(
      { error: "Erreur lors de l'envoi du message. Veuillez réessayer ou me contacter directement." },
      { status: 500 },
    )
  }
}
