"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Quote, ChevronLeft, ChevronRight, Star, TrendingUp, Euro } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import testimonialsData from "../../data/testimonials.json"

interface Testimonial {
  id: number
  quote: string
  author: string
  position: string
  company: string
  avatar: string
  rating: number
  tags: string[]
  projectValue: string
  resultMetric: string
}

export default function TestimonialsSection() {
  const testimonials = testimonialsData.testimonials as Testimonial[]
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const nextTestimonial = () => {
    setDirection(1)
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setDirection(-1)
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  // Modifier les variants pour une meilleure animation
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  }

  // Modifier la fonction de navigation pour éviter les conflits
  const goToTestimonial = (index: number) => {
    if (index === activeIndex) return
    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex(index)
  }

  if (testimonials.length === 0) return null

  const currentTestimonial = testimonials[activeIndex]

  return (
    <section id="testimonials" className="py-24 relative bg-gradient-to-b from-muted/10 to-background">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 mb-4">
            Témoignages Clients
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">Ce que disent mes clients</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez comment mes solutions IA et développement ont transformé les entreprises
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  duration: 0.6,
                }}
                className="w-full"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Testimonial Content */}
                  <div className="lg:col-span-2">
                    <Card className="bg-card/80 border-border/50 backdrop-blur-sm h-full">
                      <CardContent className="p-8">
                        <div className="flex items-start justify-between mb-6">
                          <Quote className="h-12 w-12 text-purple-400 opacity-50" />
                          <div className="flex">
                            {[...Array(currentTestimonial.rating)].map((_, i) => (
                              <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                            ))}
                          </div>
                        </div>

                        <blockquote className="text-xl text-foreground leading-relaxed mb-8 italic">
                          "{currentTestimonial.quote}"
                        </blockquote>

                        <div className="flex items-center gap-4 mb-6">
                          <Avatar className="h-16 w-16 border-2 border-purple-500">
                            <AvatarImage
                              src={currentTestimonial.avatar || "/placeholder.svg"}
                              alt={currentTestimonial.author}
                            />
                            <AvatarFallback className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                              {currentTestimonial.author
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-foreground text-lg">{currentTestimonial.author}</p>
                            <p className="text-muted-foreground">{currentTestimonial.position}</p>
                            <p className="text-sm text-muted-foreground font-medium">{currentTestimonial.company}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {currentTestimonial.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-muted text-muted-foreground hover:bg-muted/80"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Project Metrics */}
                  <div className="space-y-6">
                    <Card className="bg-gradient-to-br from-purple-600/10 to-blue-600/10 border-purple-500/20 backdrop-blur-sm">
                      <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                          <Euro className="h-6 w-6 text-white" />
                        </div>
                        <div className="text-2xl font-bold text-foreground mb-2">{currentTestimonial.projectValue}</div>
                        <div className="text-sm text-muted-foreground">Valeur du projet</div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-600/10 to-blue-600/10 border-green-500/20 backdrop-blur-sm">
                      <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                          <TrendingUp className="h-6 w-6 text-white" />
                        </div>
                        <div className="text-2xl font-bold text-foreground mb-2">{currentTestimonial.resultMetric}</div>
                        <div className="text-sm text-muted-foreground">Résultat obtenu</div>
                      </CardContent>
                    </Card>

                    <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <h4 className="font-semibold text-foreground mb-3">Pourquoi ce projet ?</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Ce projet illustre parfaitement ma capacité à comprendre les enjeux métier et à proposer des
                          solutions IA concrètes qui génèrent un ROI mesurable.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-center mt-12 gap-6">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full border-border text-foreground hover:bg-accent"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <div className="flex items-center gap-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    disabled={index === activeIndex}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 scale-125"
                        : "bg-muted hover:bg-muted-foreground/50"
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full border-border text-foreground hover:bg-accent"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
