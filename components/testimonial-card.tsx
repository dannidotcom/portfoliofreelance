import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Quote } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  position: string
  avatar: string
}

export default function TestimonialCard({ quote, author, position, avatar }: TestimonialCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <Quote className="h-8 w-8 text-blue-600 mb-4" />
        <p className="text-slate-700 italic flex-grow">{quote}</p>
        <div className="flex items-center gap-3 mt-6">
          <Avatar>
            <AvatarImage src={avatar || "/placeholder.svg"} alt={author} />
            <AvatarFallback>{author.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{author}</p>
            <p className="text-sm text-slate-500">{position}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
