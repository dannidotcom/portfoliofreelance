import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, Award, Zap } from "lucide-react"

export default function StatsSection() {
  const stats = [
    {
      icon: <TrendingUp className="h-8 w-8" />,
      value: "3+",
      label: "Années d'expérience",
      color: "from-purple-600 to-purple-500",
    },
    {
      icon: <Users className="h-8 w-8" />,
      value: "50+",
      label: "Projets réalisés",
      color: "from-blue-600 to-blue-500",
    },
    {
      icon: <Award className="h-8 w-8" />,
      value: "100%",
      label: "Clients satisfaits",
      color: "from-green-600 to-green-500",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      value: "24/7",
      label: "Support disponible",
      color: "from-orange-600 to-orange-500",
    },
  ]

  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300"
            >
              <CardContent className="p-6 text-center">
                <div
                  className={`bg-gradient-to-r ${stat.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4`}
                >
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
