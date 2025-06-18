"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code, Database, Cloud, Bot, ArrowRight, CheckCircle, Zap } from "lucide-react"
import { motion } from "framer-motion"
import servicesData from "../data/services.json"

interface Service {
  id: number
  icon: string
  title: string
  description: string
  skills: string[]
  features: string[]
  gradient: string
  price: string
  duration: string
}

const iconMap = {
  Code: Code,
  Database: Database,
  Cloud: Cloud,
  Bot: Bot,
}

export default function ServicesSection() {
  const services = servicesData.services as Service[]

  // Ajouter cette fonction au début du composant
  const handleQuoteRequest = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="services" className="py-24 relative bg-gradient-to-b from-background to-muted/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 mb-4">Mes Services</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">Solutions sur mesure</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Des services adaptés à vos besoins pour transformer votre entreprise grâce à l'IA et au développement
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap]

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-card/80 border-border/50 backdrop-blur-sm hover:bg-card transition-all duration-300 h-full group">
                  <CardContent className="p-8 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className={`bg-gradient-to-r ${service.gradient} w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">À partir de</div>
                        <div className="text-lg font-bold text-foreground">{service.price}</div>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-300">
                      {service.title}
                    </h3>

                    <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>

                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Inclus dans ce service :
                      </h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6 flex-grow">
                      <h4 className="text-sm font-semibold text-foreground mb-3">Technologies utilisées :</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.skills.map((skill, skillIndex) => (
                          <Badge
                            key={skillIndex}
                            variant="secondary"
                            className="bg-muted text-muted-foreground hover:bg-muted/80 text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Zap className="h-4 w-4 text-yellow-500" />
                        <span>{service.duration}</span>
                      </div>
                      <Button
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 group"
                        onClick={handleQuoteRequest}
                      >
                        Demander un devis
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 p-8 rounded-2xl border border-purple-500/20 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-foreground mb-4">Besoin d'une solution personnalisée ?</h3>
            <p className="text-muted-foreground mb-6">
              Chaque projet est unique. Discutons de vos besoins spécifiques pour créer la solution parfaite.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              onClick={handleQuoteRequest}
            >
              Consultation gratuite
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
