import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

const rowStyles = {
  layout: 'flex items-center gap-2',
  typography: 'text-sm font-medium',
  color: 'text-foreground',
}

const votesStyles = {
  typography: 'font-normal',
  color: 'text-muted-foreground',
}

const join = (styles: Record<string, string>) => Object.values(styles).join(' ')

interface MovieImdbRatingProps {
  voteAverage: number
  votes?: string
  className?: string
}

export function MovieImdbRating({ voteAverage, votes, className }: MovieImdbRatingProps) {
  return (
    <div className={cn(join(rowStyles), className)}>
      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      <span>{voteAverage.toFixed(1)}</span>
      {votes && <span className={join(votesStyles)}>({votes} votes)</span>}
    </div>
  )
}
