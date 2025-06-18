import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ReactNode } from "react"

interface ServiceCardProps {
  icon: ReactNode
  title: string
  description: string
  skills: string[]
}

export default function ServiceCard({ icon, title, description, skills }: ServiceCardProps) {
  return (
    <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/30 border-gray-700/50 backdrop-blur-sm hover:from-gray-800/70 hover:to-gray-900/50 transition-all duration-300 h-full">
      <CardContent className="p-6 h-full flex flex-col">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 mb-6">{description}</p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {skills.map((skill, index) => (
            <Badge key={index} variant="secondary" className="bg-gray-700/50 text-gray-300 hover:bg-gray-700">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
