import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryState } from 'nuqs'
import { ArrowLeft } from 'lucide-react'
import { useMovieDetail } from '@/lib/queries/use-movie-detail'
import { useMinLoading } from '@/lib/hooks/use-min-loading'
import { MoviePoster, ErrorDisplay } from '@/components/shared'
import { MovieDetailInfo } from '@/features/movie/components/movie-detail-info'
import { MovieSeo } from '@/features/movie/components/movie-seo'
import { Loader, Button } from '@/components/ui'
import { cn } from '@/lib/utils'

const pageStyles = {
  layout: 'flex flex-1 flex-col gap-6',
  spacing: 'px-4 py-6 md:px-8',
}

const contentStyles = {
  layout: 'flex flex-col md:flex-row gap-8',
}

const posterWrapperStyles = {
  layout: 'w-[300px] shrink-0 mx-auto md:mx-0',
}

const posterStyles = {
  width: 'mx-none',
}

const join = (styles: Record<string, string>) => Object.values(styles).join(' ')

export function MoviePage() {
  const navigate = useNavigate()
  const [imdbID] = useQueryState('imdbID', { defaultValue: '' })
  const { data: movie, isLoading, isError, error } = useMovieDetail(imdbID)
  const showLoading = useMinLoading(isLoading)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!imdbID) {
    return (
      <>
        <div className="flex flex-1 items-center justify-center text-muted-foreground">
          Movie not found.
        </div>
      </>
    )
  }

  if (isError) {
    return (
      <>
        <ErrorDisplay {...error} />
      </>
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

      {showLoading ? (
        <Loader />
      ) : movie ? (
        <>
          <MovieSeo movie={movie} />
          <div className={cn(join(contentStyles), 'animate-card-enter')}>
            <div className={join(posterWrapperStyles)}>
              <MoviePoster
                posterPath={movie.posterPath}
                title={movie.title}
                className={join(posterStyles)}
              />
            </div>
            <MovieDetailInfo movie={movie} />
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-1 items-center justify-center text-muted-foreground">
            Movie not found.
          </div>
        </>
      )}
    </div>
  )
}
