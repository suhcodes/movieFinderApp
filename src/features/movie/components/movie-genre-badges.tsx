import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

const rowStyles = {
  layout: 'flex flex-wrap gap-2',
}

const join = (styles: Record<string, string>) => Object.values(styles).join(' ')

interface MovieGenreBadgesProps {
  genres: string[]
  className?: string
}

export function MovieGenreBadges({ genres, className }: MovieGenreBadgesProps) {
  if (genres.length === 0) return null

  return (
    <div className={cn(join(rowStyles), className)}>
      {genres.map((genre) => (
        <Badge key={genre} variant="secondary">
          {genre}
        </Badge>
      ))}
    </div>
  )
}
