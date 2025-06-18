"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles, Brain, Zap, Play, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import TypewriterEffect from "@/components/typewriter-effect"

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 },
    },
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden bg-gradient-to-br from-background via-background to-muted/20"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>

      {/* Animated Background Orbs */}
      <motion.div
        className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="flex flex-col lg:flex-row items-center gap-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Content */}
          <motion.div className="lg:w-1/2 space-y-8" variants={itemVariants}>
            <div className="space-y-6">
              <motion.div variants={itemVariants} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse"></div>
                <Badge className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 text-purple-600 dark:text-purple-300 px-4 py-2 text-sm backdrop-blur-sm">
                  <Brain className="h-4 w-4 mr-2" />
                  Développeur IA & Automatisation
                </Badge>
              </motion.div>

              <motion.div className="space-y-4" variants={itemVariants}>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  <span className="text-foreground">Moi c'est </span>
                  <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Alphonse,
                  </span>
                </h1>

                <div className="text-2xl lg:text-4xl font-semibold text-foreground min-h-[3rem] lg:min-h-[4rem]">
                  <TypewriterEffect
                    words={[
                      "Vous avez une idée ?",
                      "Un projet à automatiser ?",
                      "Des processus à optimiser ?",
                      "Une solution IA à créer ?",
                    ]}
                    className="text-2xl lg:text-4xl font-semibold"
                    speed={80}
                  />
                </div>
              </motion.div>

              <motion.p className="text-xl text-muted-foreground leading-relaxed max-w-2xl" variants={itemVariants}>
                J'aide les entreprises à <strong className="text-foreground">transformer leurs idées</strong> en
                solutions concrètes grâce à l'IA et à l'automatisation de workflow.
              </motion.p>

              <motion.div className="flex items-center gap-8 text-sm" variants={itemVariants}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-purple-500 rounded-lg flex items-center justify-center">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="text-foreground font-medium">Solutions sur-mesure</div>
                    <div className="text-muted-foreground text-xs">adaptées à vos besoins</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg flex items-center justify-center">
                    <Brain className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="text-foreground font-medium">IA & Automatisation</div>
                    <div className="text-muted-foreground text-xs">pour optimiser vos processus</div>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div className="flex flex-col sm:flex-row gap-4" variants={itemVariants}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-4 group shadow-lg shadow-purple-500/25"
              >
                Discutons de votre projet
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-accent text-lg px-8 py-4 group backdrop-blur-sm"
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Voir mes réalisations
              </Button>
            </motion.div>

            <motion.div className="flex items-center gap-4 text-sm text-muted-foreground" variants={itemVariants}>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-yellow-400" />
                <span>Développement personnalisé</span>
              </div>
              <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
              <div className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4 text-green-400" />
                <span>Résultats garantis</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Photo */}
          <motion.div className="lg:w-1/2 relative" variants={imageVariants}>
            <div className="relative max-w-lg mx-auto">
              {/* Floating Elements */}
              <motion.div
                className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl rotate-12 opacity-80"
                animate={{
                  rotate: [12, 25, 12],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-8 -left-8 w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl -rotate-12 opacity-60"
                animate={{
                  rotate: [-12, -25, -12],
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />

              {/* Main Photo Container */}
              <motion.div
                className="relative bg-card/80 backdrop-blur-xl p-2 rounded-3xl border border-border/50 shadow-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-purple-600/20 via-transparent to-blue-600/20"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                  <Image
                    src="/images/profile.png"
                    alt="Donné Alphonse SOLOFONDRAIBE - Développeur IA & Automatisation"
                    width={500}
                    height={600}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>

                {/* Info Card Overlay */}
                <motion.div
                  className="absolute bottom-6 left-6 right-6 bg-card/90 backdrop-blur-md p-4 rounded-xl border border-border/50 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-foreground font-medium">Disponible pour nouveaux projets</span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Spécialisé en développement sur-mesure et automatisation
                  </p>
                </motion.div>
              </motion.div>

              {/* Floating Stats */}
              <motion.div
                className="absolute top-20 -left-16 bg-card/90 backdrop-blur-md p-4 rounded-xl border border-border/50 shadow-lg"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">3+</div>
                  <div className="text-xs text-muted-foreground">Années</div>
                </div>
              </motion.div>

              <motion.div
                className="absolute top-40 -right-16 bg-card/90 backdrop-blur-md p-4 rounded-xl border border-border/50 shadow-lg"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">50+</div>
                  <div className="text-xs text-muted-foreground">Projets</div>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-32 -right-12 bg-card/90 backdrop-blur-md p-4 rounded-xl border border-border/50 shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.8 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">100%</div>
                  <div className="text-xs text-muted-foreground">Satisfaits</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <span className="text-sm text-muted-foreground">Scroll</span>
            <motion.div className="w-6 h-10 border-2 border-border rounded-full flex justify-center">
              <motion.div
                className="w-1.5 h-3 bg-gradient-to-b from-purple-400 to-blue-400 rounded-full mt-2"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
