"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Brain } from "lucide-react"
import { motion } from "framer-motion"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 z-50 w-full bg-slate-950/80 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 w-8 h-8 rounded-lg flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <Link href="/" className="text-xl font-bold text-white">
              Donné{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Alphonse
              </span>
            </Link>
          </motion.div>

          <motion.nav
            className="hidden md:flex items-center space-x-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.a
              href="#home"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Accueil
            </motion.a>
            <motion.a
              href="#about"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              À propos
            </motion.a>
            <motion.a
              href="#experience"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Expérience
            </motion.a>
            <motion.a
              href="#skills"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Compétences
            </motion.a>
            <motion.a
              href="#services"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Services
            </motion.a>

            <motion.a
              href="#faq"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
            FAQ
            </motion.a>

            <motion.a
              href="#contact"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Contact
            </motion.a>
          </motion.nav>

          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
              onClick={() => window.location.href = "#contact"}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Discutons de votre projet
              </Button>
            </motion.div>
          </motion.div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="flex flex-col space-y-4 px-4 py-6 bg-slate-950/95 backdrop-blur-md border-t border-gray-800">
            <a
              href="#home"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </a>
            <a
              href="#about"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              À propos
            </a>
            <a
              href="#experience"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Expérience
            </a>
            <a
              href="#skills"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Compétences
            </a>
            <a
              href="#services"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </a>
            <a
              href="#testimonials"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Témoignages
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
            <Button
                onClick={() => {
                    setIsMenuOpen(false)
                    window.location.href = "#contact"
                }}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 w-full">
              Discutons de votre projet
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
