import { Star } from 'lucide-react'

interface MovieDescriptionProps {
  title: string
  overview?: string
  voteAverage?: number
  year?: string
}

export function MovieDescription({ title, overview, voteAverage, year }: MovieDescriptionProps) {
  const rating = voteAverage ? voteAverage.toFixed(1) : null

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-2">
      <h2 className="text-base font-semibold leading-tight text-foreground">{title}</h2>
      {overview && <p className="line-clamp-3 text-sm text-muted-foreground">{overview}</p>}
      {(rating !== null || year) && (
        <div className="mt-auto flex items-center gap-3 text-xs text-muted-foreground">
          {rating !== null && (
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-current" />
              {rating}
            </span>
          )}
          {year && <span>{year}</span>}
        </div>
      )}
    </div>
  )
}
