import { useState } from 'react'
import { ImageOff } from 'lucide-react'
import { cn } from '@/lib/utils'

const posterContainerStyles = {
  layout: 'w-full aspect-[3/4] overflow-hidden',
  shape: 'rounded-lg',
  background: 'bg-muted',
}

const placeholderStyles = {
  layout: 'flex h-full w-full items-center justify-center',
}

const join = (styles: Record<string, string>) => Object.values(styles).join(' ')

interface MoviePosterProps {
  posterPath: string | null
  title: string
  className?: string
}

export function MoviePoster({ posterPath, title, className }: MoviePosterProps) {
  const [error, setError] = useState(false)

  return (
    <div className={cn(join(posterContainerStyles), className)}>
      {posterPath && !error ? (
        <img
          src={posterPath}
          alt={title}
          className="h-full w-full object-cover"
          onError={() => setError(true)}
        />
      ) : (
        <div className={join(placeholderStyles)}>
          <ImageOff className="h-8 w-8 text-muted-foreground" />
        </div>
      )}
    </div>
  )
}
