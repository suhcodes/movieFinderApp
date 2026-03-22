import { useNavigate } from 'react-router-dom'
import { useQueryState } from 'nuqs'
import { ArrowLeft } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useMovieDetail } from '@/lib/queries/use-movie-detail'
import { MoviePoster, ErrorDisplay } from '@/components/shared'
import { MovieDetailInfo } from '@/features/movie/components/movie-detail-info'
import { Loader, Button } from '@/components/ui'

const pageStyles = {
  layout: 'flex flex-col gap-6',
  spacing: 'px-4 py-6 md:px-8',
}

const contentStyles = {
  layout: 'flex flex-col md:flex-row gap-8',
}

const posterWrapperStyles = {
  layout: 'w-[150px] mx-auto md:w-[300px] shrink-0',
}

const join = (styles: Record<string, string>) => Object.values(styles).join(' ')

export function MoviePage() {
  const navigate = useNavigate()
  const [imdbID] = useQueryState('imdbID', { defaultValue: '' })
  const { data: movie, isLoading, isError, error } = useMovieDetail(imdbID)

  if (!imdbID) {
    return (
      <div className="flex flex-1 items-center justify-center text-muted-foreground">
        Movie not found.
      </div>
    )
  }

  if (isError) {
    return <ErrorDisplay {...error} />
  }

  return (
    <div className={join(pageStyles)}>
      <div>
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      {isLoading ? (
        <Loader className="flex-1 py-20" />
      ) : movie ? (
        <>
          <Helmet>
            <title>
              {movie.title} ({movie.year}) — Movie Finder
            </title>
            <meta name="description" content={movie.overview ?? `${movie.title} (${movie.year})`} />
            <meta property="og:title" content={`${movie.title} (${movie.year})`} />
            <meta
              property="og:description"
              content={movie.overview ?? `${movie.title} (${movie.year})`}
            />
            {movie.posterPath && <meta property="og:image" content={movie.posterPath} />}
            <meta property="og:type" content="video.movie" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={`${movie.title} (${movie.year})`} />
            <meta
              name="twitter:description"
              content={movie.overview ?? `${movie.title} (${movie.year})`}
            />
            {movie.posterPath && <meta name="twitter:image" content={movie.posterPath} />}
          </Helmet>
          <div className={join(contentStyles)}>
            <div className={join(posterWrapperStyles)}>
              <MoviePoster posterPath={movie.posterPath} title={movie.title} />
            </div>
            <MovieDetailInfo movie={movie} />
          </div>
        </>
      ) : (
        <div className="flex flex-1 items-center justify-center text-muted-foreground">
          Movie not found.
        </div>
      )}
    </div>
  )
}
