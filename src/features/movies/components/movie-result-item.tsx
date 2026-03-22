import type { Movie } from '@/features/movies/types'
import { MoviePoster } from './movie-poster'
import { MovieDescription } from './movie-description'

interface MovieResultItemProps {
  movie: Movie
}

export function MovieResultItem({ movie }: MovieResultItemProps) {
  return (
    <div className="flex gap-5 rounded-lg border border-border bg-card p-4">
      <MoviePoster posterPath={movie.posterPath} title={movie.title} />
      <MovieDescription
        title={movie.title}
        overview={movie.overview}
        voteAverage={movie.voteAverage}
        year={movie.year}
      />
    </div>
  )
}
