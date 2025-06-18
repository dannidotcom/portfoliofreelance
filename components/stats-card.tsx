import { Card, CardContent } from "@/components/ui/card"

interface StatsCardProps {
  value: string
  label: string
}

export default function StatsCard({ value, label }: StatsCardProps) {
  return (
    <Card>
      <CardContent className="p-4 text-center">
        <p className="text-3xl font-bold text-blue-600">{value}</p>
        <p className="text-sm text-slate-600">{label}</p>
      </CardContent>
    </Card>
  )
}
