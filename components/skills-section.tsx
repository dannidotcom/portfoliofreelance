import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Code, Database, Cloud, Cog, Globe } from "lucide-react"

export default function SkillsSection() {
  const skillCategories = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Intelligence Artificielle & NLP",
      color: "from-purple-600 to-purple-500",
      skills: [
        "Pandas",
        "NumPy",
        "Scikit-learn",
        "SpaCy",
        "NLTK",
        "Transformers",
        "LangChain",
        "llama-index",
        "OpenAI API",
        "Llama",
        "Mistral",
        "GPT-3/4",
        "DALL-E",
      ],
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Développement",
      color: "from-blue-600 to-blue-500",
      skills: [
        "Python",
        "Java",
        "JavaScript",
        "TypeScript",
        "Django",
        "FastAPI",
        "SpringBoot",
        "React",
        "Angular",
        "Microservices",
        "REST API",
        "SOAP",
      ],
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Bases de Données",
      color: "from-green-600 to-green-500",
      skills: ["PostgreSQL", "MySQL", "MongoDB", "Oracle", "SQL Server", "Qdrant", "Vector Databases"],
    },
    {
      icon: <Cloud className="h-8 w-8" />,
      title: "DevOps & Cloud",
      color: "from-orange-600 to-orange-500",
      skills: ["Docker", "Kubernetes", "GitHub Actions", "GitLab CI/CD", "Linux", "Ubuntu", "CentOS", "RHEL"],
    },
    {
      icon: <Cog className="h-8 w-8" />,
      title: "ERP & Automatisation",
      color: "from-red-600 to-red-500",
      skills: ["Odoo", "QWeb", "OWL", "Workflow Automation", "Business Process", "Custom Modules"],
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Méthodologies",
      color: "from-cyan-600 to-cyan-500",
      skills: ["Agile", "Scrum", "Kanban", "Git", "Jira", "Trello", "Project Management"],
    },
  ]

  return (
    <section id="skills" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 mb-4">
            Expertise Technique
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
            Compétences Techniques
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Une expertise complète en IA, développement et automatisation pour transformer vos idées en solutions
            concrètes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <Card
              key={index}
              className="bg-card/50 border-border/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300 h-full"
            >
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`bg-gradient-to-r ${category.color} w-12 h-12 rounded-xl flex items-center justify-center`}
                  >
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{category.title}</h3>
                </div>

                <div className="flex flex-wrap gap-2 flex-grow">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge
                      key={skillIndex}
                      variant="secondary"
                      className="bg-muted text-muted-foreground hover:bg-muted/80 text-xs"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
