"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageSquare, Send, X, Minimize2, Maximize2, Bot, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Bonjour ! Je suis l'assistant IA de Donné Alphonse. Comment puis-je vous aider aujourd'hui ?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isOpen])

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      let response = ""

      if (input.toLowerCase().includes("service") || input.toLowerCase().includes("prestation")) {
        response =
          "Je propose des services de développement web, ERP Odoo, IA agentique et DevOps. Quel domaine vous intéresse particulièrement ?"
      } else if (input.toLowerCase().includes("contact") || input.toLowerCase().includes("rendez-vous")) {
        response =
          "Vous pouvez me contacter par email à alphonse.danni@gmail.com ou par téléphone au +261 38 72 179 07. Souhaitez-vous que je vous aide à préparer votre demande ?"
      } else if (input.toLowerCase().includes("ia") || input.toLowerCase().includes("intelligence artificielle")) {
        response =
          "Je suis spécialisé en IA agentique, LangChain, LangGraph et intégration de modèles de langage. Je peux vous aider à automatiser vos processus ou créer des assistants IA sur mesure."
      } else if (input.toLowerCase().includes("odoo") || input.toLowerCase().includes("erp")) {
        response =
          "Je développe des modules Odoo personnalisés et j'intègre des fonctionnalités IA pour optimiser vos processus métier. Avez-vous un projet spécifique en tête ?"
      } else {
        response =
          "Merci pour votre message ! Je serais ravi d'en discuter davantage. Pouvez-vous me donner plus de détails sur votre projet ou vos besoins ?"
      }

      const botMessage: Message = {
        id: `assistant-${Date.now()}`,
        content: response,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <>
      {/* Chat button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          onClick={toggleChat}
          className={`rounded-full w-14 h-14 p-0 ${
            isOpen ? "bg-red-600 hover:bg-red-700" : "bg-gradient-to-r from-purple-600 to-blue-600"
          }`}
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        </Button>
      </motion.div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-80 md:w-96"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border border-gray-700 overflow-hidden shadow-2xl">
              {/* Chat header */}
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-white" />
                  <h3 className="font-semibold text-white">Assistant IA</h3>
                  <Badge variant="outline" className="text-xs text-white border-white/30 bg-white/10">
                    En ligne
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-white" onClick={toggleMinimize}>
                    {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Chat messages */}
              {!isMinimized && (
                <CardContent className="p-0">
                  <div className="h-80 overflow-y-auto p-4 bg-gray-900/50 backdrop-blur-sm">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`mb-4 flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.role === "user"
                              ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                              : "bg-gray-800 text-gray-100"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {message.role === "assistant" ? (
                              <Bot className="h-4 w-4 text-gray-300" />
                            ) : (
                              <User className="h-4 w-4 text-gray-300" />
                            )}
                            <span className="text-xs text-gray-300">
                              {message.role === "assistant" ? "Assistant" : "Vous"}
                            </span>
                          </div>
                          <p className="text-sm">{message.content}</p>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="mb-4 flex justify-start">
                        <div className="max-w-[80%] rounded-lg p-3 bg-gray-800 text-gray-100">
                          <div className="flex items-center gap-2 mb-1">
                            <Bot className="h-4 w-4 text-gray-300" />
                            <span className="text-xs text-gray-300">Assistant</span>
                          </div>
                          <div className="flex gap-1">
                            <span className="animate-bounce">.</span>
                            <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
                              .
                            </span>
                            <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>
                              .
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Chat input */}
                  <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-700 bg-gray-800">
                    <div className="flex gap-2">
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Posez votre question..."
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      />
                      <Button
                        type="submit"
                        size="icon"
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </CardContent>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
