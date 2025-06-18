"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ArrowRight, ChevronLeft, ChevronRight, Eye } from "lucide-react"
import ImageCarousel from "@/components/image-carousel"
import { motion } from "framer-motion"
import projectsData from '../../data/projects.json';

interface Project {
  id: number
  title: string
  description: string
  shortDescription: string
  technologies: string[]
  category: string
  gradient: string
  results: string[]
  images: string[]
  duration: string
  team: string
  client: string
  githubUrl: string
  demoUrl: string
  status: string
  year: string
}

export default function ProjectsSection() {
  const projects = projectsData.projects as Project[]
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isCarouselOpen, setIsCarouselOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const projectsPerPage = 3

  const totalPages = Math.ceil(projects.length / projectsPerPage)
  const currentProjects = projects.slice(currentPage * projectsPerPage, (currentPage + 1) * projectsPerPage)

  const handleImageViewer = (project: Project) => {
    setSelectedProject(project)
    setIsCarouselOpen(true)
  }

  const handleViewAllProjects = () => {
    window.open("/projects", "_blank")
  }

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  return (
    <section id="projects" className="py-24 relative bg-gradient-to-b from-background to-muted/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 mb-4">Réalisations</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">Projets Marquants</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Des solutions concrètes qui transforment les processus métier grâce à l'IA
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {currentProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card/80 border-border/50 backdrop-blur-sm hover:bg-card transition-all duration-300 h-full group">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="mb-6">
                    <div
                      className={`bg-gradient-to-r ${project.gradient} p-4 rounded-xl mb-4 relative overflow-hidden`}
                    >
                      <Badge className="bg-white/20 text-white hover:bg-white/30 mb-2">{project.category}</Badge>
                      <div className="text-white/80 text-sm">{project.year}</div>

                      {/* Preview Image */}
                      <div className="mt-3 relative aspect-video rounded-lg overflow-hidden bg-white/10">
                        <img
                          src={project.images[0] || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => handleImageViewer(project)}
                            className="bg-white/90 text-gray-900 hover:bg-white"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Voir captures
                          </Button>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-300">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{project.shortDescription}</p>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-muted-foreground mb-3">Résultats obtenus :</h4>
                    <ul className="space-y-2">
                      {project.results.slice(0, 2).map((result, resultIndex) => (
                        <li key={resultIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6 flex-grow">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="secondary"
                          className="bg-muted text-muted-foreground hover:bg-muted/80 text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 4}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 flex-1"
                      onClick={() => window.open(project.demoUrl, "_blank")}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Démo
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-border text-foreground hover:bg-accent"
                      onClick={() => window.open(project.githubUrl, "_blank")}
                    >
                      <Github className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mb-12">
            <Button
              variant="outline"
              size="icon"
              onClick={prevPage}
              disabled={currentPage === 0}
              className="border-border text-foreground hover:bg-accent"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === currentPage
                      ? "bg-gradient-to-r from-purple-600 to-blue-600"
                      : "bg-muted hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextPage}
              disabled={currentPage === totalPages - 1}
              className="border-border text-foreground hover:bg-accent"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        <div className="text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            onClick={handleViewAllProjects}
          >
            Voir tous mes projets <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Image Carousel */}
      {selectedProject && (
        <ImageCarousel
          images={selectedProject.images}
          title={selectedProject.title}
          isOpen={isCarouselOpen}
          onClose={() => setIsCarouselOpen(false)}
        />
      )}
    </section>
  )
}
