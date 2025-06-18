"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  MessageCircle,
  Calendar,
  Clock,
} from "lucide-react"

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
        // Scroll vers le haut du formulaire sur mobile
        const contactSection = document.getElementById("contact")
        if (contactSection && window.innerWidth < 768) {
          contactSection.scrollIntoView({ behavior: "smooth", block: "center" })
        }
        // Réinitialiser le formulaire
        e.currentTarget.reset()
      } else {
        setError(result.error || "Erreur lors de l'envoi du message")
      }
    } catch (error) {
      console.error("Erreur:", error)
      setError("Erreur de connexion. Veuillez vérifier votre connexion internet et réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-12 md:py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-16">
          <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1.5 md:px-4 md:py-2 mb-3 md:mb-4 text-sm">
            Contact
          </Badge>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-tight">
            Prêt à transformer votre entreprise ?
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Contactez-moi pour discuter de votre projet IA ou obtenir un audit gratuit de vos processus
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* Contact Info - Optimisé mobile */}
          <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
            <div className="text-center lg:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Parlons de votre projet</h3>
              <p className="text-gray-300 leading-relaxed mb-6 md:mb-8 text-sm md:text-base">
                Que vous souhaitiez automatiser vos processus, intégrer l'IA dans vos workflows ou développer une
                solution sur-mesure, je suis là pour vous accompagner dans votre transformation digitale.
              </p>
            </div>

            {/* Contact Cards - Stack sur mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6">
              <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/30 border-gray-700/50 backdrop-blur-sm hover:from-gray-800/70 transition-all duration-300">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="bg-gradient-to-r from-purple-600 to-purple-500 w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 md:h-6 md:w-6 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-white text-sm md:text-base">Email</h4>
                      <a
                        href="mailto:alphonse.danni@gmail.com"
                        className="text-gray-300 hover:text-purple-400 transition-colors text-sm md:text-base break-all"
                      >
                        alphonse.danni@gmail.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/30 border-gray-700/50 backdrop-blur-sm hover:from-gray-800/70 transition-all duration-300">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-500 w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 md:h-6 md:w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm md:text-base">Téléphone</h4>
                      <a
                        href="tel:+261387217907"
                        className="text-gray-300 hover:text-blue-400 transition-colors text-sm md:text-base"
                      >
                        +261 38 72 179 07
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/30 border-gray-700/50 backdrop-blur-sm hover:from-gray-800/70 transition-all duration-300 sm:col-span-2 lg:col-span-1">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="bg-gradient-to-r from-green-600 to-green-500 w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 md:h-6 md:w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm md:text-base">Localisation</h4>
                      <p className="text-gray-300 text-sm md:text-base">Madagascar (Remote disponible)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Audit gratuit - Plus compact sur mobile */}
            <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 p-4 md:p-6 rounded-xl border border-purple-500/30">
              <div className="flex items-start gap-3">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-4 w-4 md:h-5 md:w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1 md:mb-2 text-sm md:text-base">
                    🎯 Audit gratuit disponible
                  </h4>
                  <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                    Je propose un audit gratuit de vos processus pour identifier les opportunités d'automatisation et
                    d'intégration IA.
                  </p>
                </div>
              </div>
            </div>

            {/* Temps de réponse - Nouveau sur mobile */}
            <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 p-4 rounded-xl border border-blue-500/30 lg:hidden">
              <div className="flex items-center gap-3 text-center justify-center">
                <Clock className="h-5 w-5 text-blue-400" />
                <span className="text-white font-medium text-sm">Réponse sous 24-48h garantie</span>
              </div>
            </div>
          </div>

          {/* Contact Form - Optimisé mobile */}
          <div className="order-1 lg:order-2">
            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/30 border-gray-700/50 backdrop-blur-sm">
              <CardContent className="p-4 md:p-8">
                {isSubmitted ? (
                  <div className="text-center space-y-4 md:space-y-6 py-4 md:py-8">
                    <div className="mx-auto w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-green-600 to-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 md:h-8 md:w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Message envoyé !</h3>
                      <p className="text-gray-300 mb-3 md:mb-4 text-sm md:text-base">
                        Merci pour votre message. Vous recevrez une réponse sous 24-48h.
                      </p>
                      <p className="text-xs md:text-sm text-gray-400">
                        💡 Vérifiez aussi vos spams et ajoutez mon email à vos contacts.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsSubmitted(false)
                        setError(null)
                      }}
                      className="border-gray-600 text-white hover:bg-gray-800 w-full sm:w-auto"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Envoyer un autre message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    {error && (
                      <div className="bg-red-600/20 border border-red-500/30 p-3 md:p-4 rounded-lg flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <p className="text-red-300 text-sm leading-relaxed">{error}</p>
                      </div>
                    )}

                    {/* Nom et Email - Stack sur très petit écran */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-white text-sm md:text-base">
                          Nom *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Votre nom"
                          required
                          maxLength={100}
                          onFocus={() => setFocusedField("name")}
                          onBlur={() => setFocusedField(null)}
                          className={`bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 transition-all duration-200 h-11 md:h-12 text-base ${
                            focusedField === "name"
                              ? "border-purple-500 ring-1 ring-purple-500/20"
                              : "focus:border-purple-500"
                          }`}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white text-sm md:text-base">
                          Email *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="votre@email.com"
                          required
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => setFocusedField(null)}
                          className={`bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 transition-all duration-200 h-11 md:h-12 text-base ${
                            focusedField === "email"
                              ? "border-purple-500 ring-1 ring-purple-500/20"
                              : "focus:border-purple-500"
                          }`}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-white text-sm md:text-base">
                        Sujet *
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="Sujet de votre message"
                        required
                        maxLength={200}
                        onFocus={() => setFocusedField("subject")}
                        onBlur={() => setFocusedField(null)}
                        className={`bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 transition-all duration-200 h-11 md:h-12 text-base ${
                          focusedField === "subject"
                            ? "border-purple-500 ring-1 ring-purple-500/20"
                            : "focus:border-purple-500"
                        }`}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-white text-sm md:text-base">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Détaillez votre projet ou votre demande..."
                        className={`min-h-[100px] md:min-h-[120px] bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 transition-all duration-200 text-base resize-none ${
                          focusedField === "message"
                            ? "border-purple-500 ring-1 ring-purple-500/20"
                            : "focus:border-purple-500"
                        }`}
                        required
                        maxLength={2000}
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField(null)}
                      />
                      <p className="text-xs text-gray-400">Maximum 2000 caractères</p>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 h-12 md:h-14 text-base md:text-lg font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          Envoyer le message <Send className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-gray-400 text-center leading-relaxed px-2">
                      En envoyant ce message, vous acceptez d'être contacté concernant votre demande.
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
