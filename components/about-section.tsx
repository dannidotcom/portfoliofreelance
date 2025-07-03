"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRight,
  Code,
  MessageSquare,
  TrendingUp,
  Brain,
  Zap,
  Target,
  Download,
  Lightbulb,
  Rocket,
} from "lucide-react"
import { motion } from "framer-motion"
import CountUp from "@/components/count-up"

export default function AboutSection() {
  return (
    <section id="about" className="py-24 relative bg-gradient-to-b from-slate-950 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            className="lg:w-1/2 space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse"></div>
                <Badge className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 text-purple-300 px-4 py-2 backdrop-blur-sm">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Développeur Freelance
                </Badge>
              </div>

              <h2 className="text-4xl lg:text-6xl font-bold">
                <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                  Des idées aux
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  solutions concrètes
                </span>
              </h2>

              <div className="space-y-4">
                <p className="text-xl text-gray-300 leading-relaxed">
                  En tant que <strong className="text-white">développeur freelance</strong>, je conçois des applications
                  sur-mesure pour optimiser vos processus métier, automatiser les tâches répétitives, et accélérer la
                  croissance de votre activité.
                </p>

                <p className="text-lg text-gray-400 leading-relaxed">
                  Mon approche ? Comprendre vos défis, analyser vos besoins, et créer des solutions qui s'intègrent
                  parfaitement dans votre écosystème existant.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <motion.div
                className="space-y-3 p-4 rounded-xl bg-gradient-to-br from-purple-600/10 to-purple-600/5 border border-purple-500/20"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-purple-500 rounded-lg flex items-center justify-center">
                    <Brain className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-400">Spécialité</span>
                </div>
                <p className="text-white font-medium">IA & Automatisation</p>
              </motion.div>

              <motion.div
                className="space-y-3 p-4 rounded-xl bg-gradient-to-br from-blue-600/10 to-blue-600/5 border border-blue-500/20"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg flex items-center justify-center">
                    <Code className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-400">Approche</span>
                </div>
                <p className="text-white font-medium">Sur-mesure</p>
              </motion.div>

              <motion.div
                className="space-y-3 p-4 rounded-xl bg-gradient-to-br from-green-600/10 to-green-600/5 border border-green-500/20"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-green-500 rounded-lg flex items-center justify-center">
                    <Rocket className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-400">Objectif</span>
                </div>
                <p className="text-white font-medium">Croissance</p>
              </motion.div>

              <motion.div
                className="space-y-3 p-4 rounded-xl bg-gradient-to-br from-orange-600/10 to-orange-600/5 border border-orange-500/20"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-600 to-orange-500 rounded-lg flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-400">Contact</span>
                </div>
                <p className="text-white font-medium">+261 38 72 179 07</p>
              </motion.div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 group shadow-lg shadow-purple-500/25"
              >
                Voir mes projets
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-white hover:bg-gray-800 backdrop-blur-sm"
              >
                <a
                    href="https://drive.google.com/file/d/1oOm3CbSNTy1K7_IZi6GIz7ic9KJ03V_L/view?usp=drive_link"
                    target="_blank"
                    rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger CV
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/30 border-gray-700/50 backdrop-blur-sm hover:from-gray-800/70 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-purple-400 mb-2">
                    <CountUp end={3} duration={2} />+
                  </div>
                  <div className="text-sm text-gray-400">Années d'expertise</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/30 border-gray-700/50 backdrop-blur-sm hover:from-gray-800/70 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    <CountUp end={50} duration={2} />+
                  </div>
                  <div className="text-sm text-gray-400">Solutions créées</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/30 border-gray-700/50 backdrop-blur-sm hover:from-gray-800/70 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    <CountUp end={100} duration={2} />%
                  </div>
                  <div className="text-sm text-gray-400">Clients satisfaits</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/30 border-gray-700/50 backdrop-blur-sm hover:from-gray-800/70 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-orange-400 mb-2">24/7</div>
                  <div className="text-sm text-gray-400">Support disponible</div>
                </CardContent>
              </Card>
            </div>

            {/* Floating Achievement Badge */}
            <motion.div
              className="absolute -top-8 -right-8 bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-2xl shadow-lg shadow-purple-500/25"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <div className="text-center text-white">
                <div className="text-lg font-bold">Freelance</div>
                <div className="text-xs opacity-90">Expert</div>
              </div>
            </motion.div>

            {/* New floating card */}
            <motion.div
              className="absolute -bottom-6 -left-6 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 backdrop-blur-md p-4 rounded-xl border border-cyan-500/30"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <div className="text-sm font-semibold text-cyan-300 mb-1">🚀 Prêt à démarrer</div>
                <div className="text-xs text-gray-300">Votre projet aujourd'hui</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
