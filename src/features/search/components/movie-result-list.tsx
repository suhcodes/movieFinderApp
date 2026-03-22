import { Loader } from '@/components/ui/loader'
import { Pagination } from '@/components/ui/pagination'
import type { Movie } from '@/features/movie/types'
import { MovieResultItem } from './movie-result-item'

interface MovieResultListProps {
  movies: Movie[]
  isLoading: boolean
  total?: number
  page?: number
  totalPages?: number
  onPageChange?: (page: number) => void
}

export function MovieResultList({
  movies,
  isLoading,
  total,
  page = 1,
  totalPages = 0,
  onPageChange,
}: MovieResultListProps) {
  if (isLoading) {
    return <Loader className="py-16" />
  }

  if (movies.length === 0) {
    return <p className="text-sm text-muted-foreground">No results found.</p>
  }

  const cardWrapperStyles = {
    animation: 'animate-card-enter',
  }

  const join = (styles: Record<string, string>) => Object.values(styles).join(' ')

  return (
    <div className="flex flex-col gap-2">
      {total !== undefined && (
        <p className="mb-2 text-sm text-muted-foreground">About {total.toLocaleString()} results</p>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {movies.map((movie, i) => (
          <div
            key={movie.id}
            className={join(cardWrapperStyles)}
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <MovieResultItem movie={movie} />
          </div>
        ))}
      </div>
      {onPageChange && (
        <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
      )}
    </div>
  )
}
