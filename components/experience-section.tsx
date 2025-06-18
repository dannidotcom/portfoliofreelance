import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Building } from "lucide-react"

export default function ExperienceSection() {
  const experiences = [
    
    {
      period: "Février 2025 - Aujourd'hui",
      company: "Freelance",
      position: "Développeur Python - IA agentique et Data Scraping",
      location: "Full remote",
      description:
        "Développement d'API REST pour automatiser le scraping et fournir les résultats aux utilisateurs. Conception d'agents IA capables de répondre aux questions en s'appuyant sur les données récupérées avec LLMs.",
      technologies: ["Python", "FastAPI", "SeleniumBase", "GPT-4 (via OpenAI API)", "LangChain", "LangGraph", "SpaCy", "Docker", "Qdrant"],
      current: true,
    },
    {
      period: "Janvier 2024 - Janvier 2025",
      company: "Advences (Primanet)",
      position: "Développeur Python / Odoo",
      location: "Full remote",
      description:
        "Conception et développement de modules personnalisés Odoo pour automatiser les processus métier. Développement d'API RESTful pour connecter Odoo à des modèles d'IA externes.",
      technologies: ["Python", "Odoo", "Django REST Framework", "Docker", "JavaScript", "PostgreSQL", "Git"],
      current: false,
    },
    {
      period: "Juillet 2023 - Décembre 2023",
      company: "Assurance ARO",
      position: "Développeur Python / Django (Stage)",
      location: "Madagascar",
      description:
        "Développement d'une API RESTful avec Django REST Framework pour intégrer les paiements entre le mobile banking et l'assurance ARO en temps réel.",
      technologies: ["Python", "Django", "Django REST Framework", "PostgreSQL", "SQL Server", "React.js", "Docker", "Git"],
      current: false,
    },
    {
      period: "Mars 2022 - Juin 2023",
      company: "Tan’IT Technologie",
      position: "Développeur Web",
      location: "Madagascar",
      description:
        "Collaboration avec les équipes projet pour le développement d’applications web, depuis l’analyse du cahier des charges jusqu’à la mise en production.",
      technologies: ["Python", "Django", "Django REST Framework", "PostgreSQL", "React.js", "Docker", "Git"],
      current: false,
    },
  ]

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 mb-4">
            Parcours Professionnel
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Mon Expérience
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Un parcours riche en projets d'IA et d'automatisation, de l'ERP aux solutions d'IA agentique
          </p>
        </div>

        <div className="space-y-8 max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/30 border-gray-700/50 backdrop-blur-sm hover:from-gray-800/70 hover:to-gray-900/50 transition-all duration-300"
            >
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="lg:w-1/3 space-y-3">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{exp.period}</span>
                    </div>
                    {exp.current && <Badge className="bg-green-600 hover:bg-green-700 text-white">En cours</Badge>}
                  </div>

                  <div className="lg:w-2/3 space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{exp.position}</h3>
                      <div className="flex items-center gap-4 text-gray-300 mb-3">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4" />
                          <span>{exp.company}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-300 leading-relaxed">{exp.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="secondary"
                          className="bg-gray-700/50 text-gray-300 hover:bg-gray-700"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
