"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle, Search, Code, Users, Clock, PenToolIcon as Tool, Wrench, Lightbulb } from "lucide-react"

interface FAQItem {
  id: string
  question: string
  answer: string
  icon: React.ReactNode
}

export default function FAQSection() {
  const [expandedItem, setExpandedItem] = useState<string | null>("item-1")

  const faqs: FAQItem[] = [
    {
      id: "item-1",
      question: "Quels types de projets réalises-tu ?",
      answer:
        "Je développe des solutions IA, des API Python sur-mesure, j'automatise des processus métier, et j'intègre Odoo.",
      icon: <Code className="h-5 w-5 text-purple-400" />,
    },
    {
      id: "item-2",
      question: "Travailles-tu en freelance ou en équipe ?",
      answer:
        "Je travaille en freelance, mais je peux aussi collaborer avec d'autres développeurs ou équipes en place.",
      icon: <Users className="h-5 w-5 text-blue-400" />,
    },
    {
      id: "item-3",
      question: "Comment se déroule une mission avec toi ?",
      answer: "Échange initial, cadrage des besoins, proposition technique, exécution agile avec livrables réguliers.",
      icon: <Clock className="h-5 w-5 text-green-400" />,
    },
    {
      id: "item-4",
      question: "Quels sont tes délais moyens ?",
      answer: "Cela dépend du projet, mais je privilégie des livraisons rapides et itératives.",
      icon: <Clock className="h-5 w-5 text-yellow-400" />,
    },
    {
      id: "item-5",
      question: "Quels outils et technologies utilises-tu ?",
      answer: "Python, FastAPI, Django, LangChain, Odoo, React.js, Docker, PostgreSQL, GPT-4, etc.",
      icon: <Tool className="h-5 w-5 text-cyan-400" />,
    },
    {
      id: "item-6",
      question: "Proposes-tu un accompagnement après livraison ?",
      answer: "Oui, je propose une phase de support et de maintenance si besoin.",
      icon: <Wrench className="h-5 w-5 text-orange-400" />,
    },
    {
      id: "item-7",
      question: "Peux-tu m'aider si je n'ai pas encore d'idée claire ?",
      answer: "Absolument. Je peux t'aider à transformer ton idée en une solution concrète.",
      icon: <Lightbulb className="h-5 w-5 text-amber-400" />,
    },
  ]

  return (
    <section id="faq" className="py-24 relative bg-gradient-to-b from-slate-900 to-slate-950">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 mb-4">
              <HelpCircle className="h-4 w-4 mr-2" />
              Questions fréquentes
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Tout ce que vous devez savoir
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Des réponses claires à vos questions sur ma façon de travailler et mes services
            </p>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Search icon decoration */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full flex items-center justify-center">
              <Search className="h-10 w-10 text-purple-400/50" />
            </div>

            <Accordion
              type="single"
              collapsible
              value={expandedItem || undefined}
              onValueChange={(value) => setExpandedItem(value)}
              className="space-y-4"
            >
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <AccordionItem
                    value={faq.id}
                    className="bg-gradient-to-br from-gray-800/50 to-gray-900/30 border border-gray-700/50 rounded-xl overflow-hidden backdrop-blur-sm"
                  >
                    <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                      <div className="flex items-center gap-3 text-left">
                        <div className="bg-gray-800/80 p-2 rounded-lg group-hover:scale-110 transition-transform">
                          {faq.icon}
                        </div>
                        <span className="text-white text-lg font-medium group-hover:text-purple-300 transition-colors">
                          {faq.question}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 pt-2 text-gray-300">
                      <div className="pl-12">{faq.answer}</div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 p-8 rounded-2xl border border-purple-500/20">
              <h3 className="text-2xl font-bold text-white mb-4">Vous avez d'autres questions ?</h3>
              <p className="text-gray-300 mb-6">
                N'hésitez pas à me contacter directement pour discuter de votre projet ou pour toute autre question.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
              >
                Me contacter
                <HelpCircle className="h-5 w-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
