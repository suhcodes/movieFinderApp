import { Helmet } from 'react-helmet-async'
import type { Movie } from '@/features/movie/types'

interface MovieSeoProps {
  movie: Movie
}

const FALLBACK_IMAGE = 'https://moovle.com.br/app.png'

export function MovieSeo({ movie }: MovieSeoProps) {
  const title = `${movie.title} (${movie.year})`
  const description = movie.overview ?? title
  const image = movie.posterPath ?? FALLBACK_IMAGE

  return (
    <Helmet>
      <title>{title} — Movie Finder</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="video.movie" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}
