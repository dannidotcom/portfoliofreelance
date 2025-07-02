"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { ArrowRight, Mail, Github, Linkedin, Twitter, Send, Brain } from "lucide-react"
import { useState } from "react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage("✅ Inscription réussie ! Vérifiez votre email.")
        setEmail("")
      } else {
        setMessage(`❌ ${data.error || "Erreur lors de l'inscription."}`)
      }
    } catch (error) {
      setMessage("❌ Erreur réseau. Veuillez réessayer.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 relative overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        style={{ backgroundSize: "200% 200%" }}
      />

      {/* Background dots pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Brand & Description */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 w-8 h-8 rounded-lg flex items-center justify-center">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold">
                Alphonse<span className="text-blue-400">.ai</span>
              </h3>
            </div>
            <p className="text-slate-400">
              Expert freelance en développement sur-mesure, IA et automatisation de processus métier.
            </p>
            <div className="flex space-x-4 pt-2">
              <motion.a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Github className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Linkedin className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Twitter className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="mailto:alphonse.danni@gmail.com"
                className="text-slate-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Mail className="h-5 w-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-4 text-lg">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#about"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:scale-125 transition-transform"></span>
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full group-hover:scale-125 transition-transform"></span>
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="#projects"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full group-hover:scale-125 transition-transform"></span>
                  Projets
                </Link>
              </li>
              <li>
                <Link
                  href="#faq"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full group-hover:scale-125 transition-transform"></span>
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full group-hover:scale-125 transition-transform"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-4 text-lg">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                  Développement IA
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                  API Python sur-mesure
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                  Automatisation de processus
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                  Intégration Odoo
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                  Conseil & Formation
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-4 text-lg">Newsletter</h4>
            <p className="text-slate-400 mb-4">
              Recevez mes derniers articles et conseils sur l'IA et l'automatisation.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex">
          <Input
            type="email"
            placeholder="Votre email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 rounded-r-none focus:ring-1 focus:ring-purple-500"
          />
          <Button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-l-none"
            disabled={loading}
          >
            {loading ? "..." : <Send className="h-4 w-4" />}
          </Button>
        </div>
        {message && (
          <p className={`text-sm ${message.startsWith("✅") ? "text-green-400" : "text-red-400"}`}>
            {message}
          </p>
        )}
        <p className="text-xs text-slate-500">Je respecte votre vie privée. Désabonnez-vous à tout moment.</p>
      </form>
          </motion.div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-slate-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">© {currentYear} Donné Alphonse. Tous droits réservés.</p>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                Mentions légales
              </Link>
              <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                Politique de confidentialité
              </Link>
              <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                CGU
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <motion.a
        href="#home"
        className="absolute bottom-8 right-8 bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-full shadow-lg shadow-purple-900/20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <ArrowRight className="h-5 w-5 text-white rotate-[-90deg]" />
      </motion.a>
    </footer>
  )
}
