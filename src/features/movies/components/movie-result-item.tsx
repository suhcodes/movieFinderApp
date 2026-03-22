import { useNavigate } from 'react-router-dom'
import type { Movie } from '@/features/movies/types'
import { MoviePoster } from './movie-poster'
import { MovieDescription } from './movie-description'

const cardStyles = {
  layout: 'flex flex-col',
  shape: 'rounded-lg',
  border: 'border border-border',
  background: 'bg-card',
  spacing: 'gap-5 p-4',
}

const join = (styles: Record<string, string>) => Object.values(styles).join(' ')

interface MovieResultItemProps {
  movie: Movie
}

export function MovieResultItem({ movie }: MovieResultItemProps) {
  const navigate = useNavigate()

  return (
    <div className={join(cardStyles)}>
      <MoviePoster posterPath={movie.posterPath} title={movie.title} />
      <MovieDescription
        title={movie.title}
        type={movie.type}
        year={movie.year}
        onMoreInfo={() => navigate(`/movie?imdbID=${movie.id}`, { viewTransition: true })}
      />
    </div>
  )
}
