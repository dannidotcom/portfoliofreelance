"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Calendar, Users, Target } from "lucide-react"
import Image from "next/image"

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project: {
    title: string
    description: string
    technologies: string[]
    category: string
    gradient: string
    results: string[]
    fullDescription?: string
    images?: string[]
    duration?: string
    team?: string
    client?: string
    githubUrl?: string
    liveUrl?: string
  }
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <div className={`bg-gradient-to-r ${project.gradient} p-6 rounded-xl mb-6 -mx-6 -mt-6`}>
            <Badge className="bg-white/20 text-white hover:bg-white/30 mb-4">{project.category}</Badge>
            <DialogTitle className="text-3xl font-bold text-white mb-2">{project.title}</DialogTitle>
            <p className="text-white/90">{project.description}</p>
          </div>
        </DialogHeader>

        <div className="space-y-8">
          {/* Project Images */}
          {project.images && project.images.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">Captures d'écran</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.images.map((image, index) => (
                  <div key={index} className="relative aspect-video rounded-lg overflow-hidden border border-border">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${project.title} - Screenshot ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Project Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Durée</span>
              </div>
              <p className="font-medium text-foreground">{project.duration || "3 mois"}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span className="text-sm">Équipe</span>
              </div>
              <p className="font-medium text-foreground">{project.team || "Solo"}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Target className="h-4 w-4" />
                <span className="text-sm">Client</span>
              </div>
              <p className="font-medium text-foreground">{project.client || "Confidentiel"}</p>
            </div>
          </div>

          {/* Full Description */}
          {project.fullDescription && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">Description détaillée</h3>
              <p className="text-muted-foreground leading-relaxed">{project.fullDescription}</p>
            </div>
          )}

          {/* Results */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Résultats obtenus</h3>
            <ul className="space-y-3">
              {project.results.map((result, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">{result}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Technologies utilisées</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <Badge key={index} variant="secondary" className="bg-muted text-muted-foreground hover:bg-muted/80">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-border">
            {project.liveUrl && (
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 flex-1">
                <ExternalLink className="h-4 w-4 mr-2" />
                Voir le projet en ligne
              </Button>
            )}
            {project.githubUrl && (
              <Button
                variant="outline"
                className="border-border text-foreground hover:bg-accent"
                onClick={() => window.open(project.githubUrl, "_blank")}
              >
                <Github className="h-4 w-4 mr-2" />
                Code source
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
