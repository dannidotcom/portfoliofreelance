"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, ArrowRight, Calendar, Clock, Tag, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  image: string
  tags: string[]
}

export default function BlogSection() {
  const [currentPage, setCurrentPage] = useState(0)

  const blogPosts: BlogPost[] = [
    {
      id: "post-1",
      title: "Comment l'IA peut transformer vos processus métier",
      excerpt:
        "Découvrez comment l'intelligence artificielle peut automatiser et optimiser vos workflows pour gagner en efficacité.",
      date: "15 mai 2023",
      readTime: "5 min",
      category: "Intelligence Artificielle",
      image: "/placeholder.svg?height=400&width=600&text=IA+Processus",
      tags: ["IA", "Automatisation", "Processus"],
    },
    {
      id: "post-2",
      title: "Les meilleures pratiques pour développer une API REST avec FastAPI",
      excerpt: "Un guide complet pour créer des API performantes, sécurisées et bien documentées avec FastAPI.",
      date: "3 avril 2023",
      readTime: "8 min",
      category: "Développement",
      image: "/placeholder.svg?height=400&width=600&text=FastAPI",
      tags: ["Python", "FastAPI", "API"],
    },
    {
      id: "post-3",
      title: "Intégrer ChatGPT dans vos applications web",
      excerpt: "Comment utiliser l'API d'OpenAI pour ajouter des fonctionnalités conversationnelles à vos projets.",
      date: "21 mars 2023",
      readTime: "6 min",
      category: "IA & Web",
      image: "/placeholder.svg?height=400&width=600&text=ChatGPT+Integration",
      tags: ["ChatGPT", "OpenAI", "Web"],
    },
    {
      id: "post-4",
      title: "Automatiser vos tâches répétitives avec Python",
      excerpt: "Des scripts simples mais puissants pour gagner du temps sur vos tâches quotidiennes.",
      date: "10 février 2023",
      readTime: "4 min",
      category: "Automatisation",
      image: "/placeholder.svg?height=400&width=600&text=Python+Automation",
      tags: ["Python", "Automatisation", "Productivité"],
    },
  ]

  const postsPerPage = 3
  const totalPages = Math.ceil(blogPosts.length / postsPerPage)
  const currentPosts = blogPosts.slice(currentPage * postsPerPage, (currentPage + 1) * postsPerPage)

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  return (
    <section id="blog" className="py-24 relative bg-gradient-to-b from-slate-950 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 mb-4">
              <BookOpen className="h-4 w-4 mr-2" />
              Blog & Ressources
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Articles & Tutoriels
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Découvrez mes derniers articles sur l'IA, l'automatisation et le développement
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/30 border-gray-700/50 backdrop-blur-sm hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 h-full overflow-hidden group">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                  <Badge className="absolute top-4 left-4 bg-purple-600 hover:bg-purple-700">{post.category}</Badge>
                </div>

                <CardContent className="p-6 flex flex-col h-[calc(100%-12rem)]">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-gray-300 mb-4 flex-grow">{post.excerpt}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <div key={tag} className="flex items-center gap-1 text-xs text-gray-400">
                        <Tag className="h-3 w-3" />
                        <span>{tag}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors group-hover:translate-x-1 duration-300"
                  >
                    Lire l'article
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mb-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevPage}
              disabled={currentPage === 0}
              className="border-gray-700 text-white hover:bg-gray-800"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === currentPage ? "bg-gradient-to-r from-purple-600 to-blue-600" : "bg-gray-700 hover:bg-gray-600"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextPage}
              disabled={currentPage === totalPages - 1}
              className="border-gray-700 text-white hover:bg-gray-800"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            size="lg"
          >
            Voir tous les articles
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
