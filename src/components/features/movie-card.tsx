import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

interface MovieCardProps {
  title: string
  overview: string
}

export function MovieCard({ title, overview }: MovieCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{overview}</CardDescription>
      </CardHeader>
    </Card>
  )
}
