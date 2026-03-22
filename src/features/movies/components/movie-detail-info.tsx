import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

const containerStyles = {
  layout: 'flex flex-col gap-4',
}

const titleStyles = {
  typography: 'text-2xl font-bold leading-tight',
  color: 'text-foreground',
}

const metaStyles = {
  layout: 'flex items-center gap-2',
  typography: 'text-sm',
  color: 'text-muted-foreground',
}

const ratingStyles = {
  layout: 'flex items-center gap-1',
  typography: 'text-sm font-medium',
  color: 'text-foreground',
}

const overviewStyles = {
  typography: 'text-sm leading-relaxed',
  color: 'text-muted-foreground',
}

const join = (styles: Record<string, string>) => Object.values(styles).join(' ')

interface MovieDetailInfoProps {
  title: string
  year?: string
  type?: string
  overview?: string
  voteAverage?: number
  className?: string
}

export function MovieDetailInfo({
  title,
  year,
  type,
  overview,
  voteAverage,
  className,
}: MovieDetailInfoProps) {
  return (
    <div className={cn(join(containerStyles), className)}>
      <h1 className={join(titleStyles)}>{title}</h1>
      <div className={join(metaStyles)}>
        {type && <span className="capitalize">{type}</span>}
        {type && year && <span>·</span>}
        {year && <span>{year}</span>}
      </div>
      {voteAverage !== undefined && voteAverage > 0 && (
        <div className={join(ratingStyles)}>
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span>{voteAverage.toFixed(1)}</span>
        </div>
      )}
      {overview && <p className={join(overviewStyles)}>{overview}</p>}
    </div>
  )
}
