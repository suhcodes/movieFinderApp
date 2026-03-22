import { useNavigate } from 'react-router-dom'
import { useQueryState } from 'nuqs'
import { ArrowLeft } from 'lucide-react'
import { useMovieDetail } from '@/lib/queries/use-movie-detail'
import { MoviePoster } from '@/components/shared'
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
    return (
      <div className="flex flex-1 items-center justify-center text-destructive text-sm">
        {error instanceof Error ? error.message : 'Failed to load movie.'}
      </div>
    )
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
        <div className={join(contentStyles)}>
          <div className={join(posterWrapperStyles)}>
            <MoviePoster posterPath={movie.posterPath} title={movie.title} />
          </div>
          <MovieDetailInfo movie={movie} />
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center text-muted-foreground">
          Movie not found.
        </div>
      )}
    </div>
  )
}
