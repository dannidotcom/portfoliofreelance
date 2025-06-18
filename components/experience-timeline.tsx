"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Building, ChevronDown, ExternalLink } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Experience {
  id: string
  period: string
  company: string
  position: string
  location: string
  description: string
  achievements: string[]
  technologies: string[]
  current: boolean
  logo?: string
}

export default function ExperienceTimeline() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const experiences: Experience[] = [
    {
      id: "freelance",
      period: "Février 2025 - Aujourd'hui",
      company: "Freelance",
      position: "Développeur Python - IA agentique et Data Scraping",
      location: "Remote",
      description:
        "Développement d'API REST pour automatiser le scraping et fournir les résultats aux utilisateurs. Conception d'agents IA capables de répondre aux questions en s'appuyant sur les données récupérées avec LLMs.",
      achievements: [
        "Développement de 10+ agents IA autonomes",
        "Traitement de 1M+ de données par jour",
        "Amélioration de 90% de la précision des réponses",
        "Déploiement sur 5 environnements cloud",
      ],
      technologies: ["Python", "FastAPI", "SeleniumBase", "GPT-4 (via OpenAI API)","LangChain", "LangGraph", "SpaCy", "Docker", "Qdrant", "PostgreSQL"],
      current: true,
    },
    {
      id: "advences",
      period: "Janvier 2024 - Janvier 2025",
      company: "Advences (Primanet)",
      position: "Développeur Python / Odoo",
      location: "Madagascar",
      description:
        "Conception et développement de modules personnalisés Odoo pour automatiser les processus métier. Développement d'API RESTful pour connecter Odoo à des modèles d'IA externes.",
      achievements: [
        "Automatisation de 80% des processus RH",
        "Réduction de 60% du temps de traitement",
        "Intégration de 5 modèles d'IA prédictive",
        "Formation de 15 utilisateurs finaux",
      ],
      technologies: ["Python", "Odoo", "Django REST Framework", "Docker", "JavaScript", "PostgreSQL", "Git"],
      current: false,
    },
    
    {
      id: "aro",
      period: "Juillet 2023 à Décembre 2023",
      company: "Assurance ARO",
      position: "Développeur Python / Django (Stage)",
      location: "Madagascar",
      description:
        "Développement d'une API RESTful avec Django REST Framework pour intégrer les paiements entre le mobile banking et l'assurance ARO en temps réel.",
      achievements: [
        "Intégration de 3 systèmes de paiement",
        "Détection d'anomalies avec 95% de précision",
        "Réduction de 70% des transactions frauduleuses",
        "Interface utilisateur React.js moderne",
      ],
      technologies: ["Python", "Django", "Django REST Framework", "PostgreSQL", "React.js", "Docker", "Git"],
      current: false,
    },
    {
      id: "tanit",
      period: "Mars 2022 - Juin 2023",
      company: "Tan’IT Technologie",
      position: "Développeur Web",
      location: "Madagascar",
      description:
        "Collaboration avec les équipes projet pour le développement d’applications web, depuis l’analyse du cahier des charges jusqu’à la mise en production.",
      achievements: [
        "Compréhension des besoins fonctionnels et techniques avec les parties prenantes",
        "Définition des exigences, contraintes, performances attendues et critères de sécurité",
        "Optimisation des performances et de la sécurité des applications",
        "Conception d’interfaces modernes, intuitives et accessibles selon les standards UX/UI",
        "Intégration des maquettes graphiques en interfaces fonctionnelles en collaboration avec les designers",
        "Correction des bugs et amélioration continue des applications",
        "Veille technologique et mise à jour régulière des compétences",
      ],
      technologies: ["Python", "Django", "Django REST Framework", "PostgreSQL", "React.js", "Docker", "Git"],
      current: false,
    },
  ]

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section id="experience" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 mb-4">
            Parcours Professionnel
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
            Mon Expérience
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Un parcours riche en projets d'IA et d'automatisation, de l'ERP aux solutions d'IA agentique
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 via-blue-600 to-cyan-600"></div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-6 w-4 h-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full border-4 border-background"
                  whileHover={{ scale: 1.2 }}
                />

                <Card className="ml-16 bg-card/50 border-border/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-foreground">{exp.position}</h3>
                          {exp.current && (
                            <Badge className="bg-green-600 hover:bg-green-700 text-white text-xs">En cours</Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-3">
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4" />
                            <span className="font-medium">{exp.company}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span className="text-sm">{exp.period}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm">{exp.location}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => toggleExpanded(exp.id)} className="ml-4">
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${expandedId === exp.id ? "rotate-180" : ""}`}
                        />
                      </Button>
                    </div>

                    <p className="text-muted-foreground leading-relaxed mb-4">{exp.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {exp.technologies.slice(0, 5).map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="secondary"
                          className="bg-muted text-muted-foreground hover:bg-muted/80"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {exp.technologies.length > 5 && (
                        <Badge variant="outline" className="border-border text-muted-foreground">
                          +{exp.technologies.length - 5} autres
                        </Badge>
                      )}
                    </div>

                    <AnimatePresence>
                      {expandedId === exp.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-border pt-4 mt-4"
                        >
                          <h4 className="font-semibold text-foreground mb-3">Réalisations clés :</h4>
                          <ul className="space-y-2 mb-4">
                            {exp.achievements.map((achievement, achievementIndex) => (
                              <li key={achievementIndex} className="flex items-start gap-2 text-muted-foreground">
                                <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                                {achievement}
                              </li>
                            ))}
                          </ul>

                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className="text-sm font-medium text-foreground">Technologies complètes :</span>
                            {exp.technologies.map((tech, techIndex) => (
                              <Badge
                                key={techIndex}
                                variant="outline"
                                className="border-border text-muted-foreground text-xs"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>

                          <Button variant="outline" size="sm" className="border-border text-foreground hover:bg-accent">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Voir les détails
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
