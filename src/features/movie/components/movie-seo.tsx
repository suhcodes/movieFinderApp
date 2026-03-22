import { Helmet } from 'react-helmet-async'
import type { Movie } from '@/features/movie/types'

interface MovieSeoProps {
  movie: Movie
}

export function MovieSeo({ movie }: MovieSeoProps) {
  const title = `${movie.title} (${movie.year})`
  const description = movie.overview ?? title

  return (
    <Helmet>
      <title>{title} — Movie Finder</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {movie.posterPath && <meta property="og:image" content={movie.posterPath} />}
      <meta property="og:type" content="video.movie" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {movie.posterPath && <meta name="twitter:image" content={movie.posterPath} />}
    </Helmet>
  )
}
