import { Loader } from '@/components/ui/loader'
import { Pagination } from '@/components/ui/pagination'
import type { Movie } from '@/features/movies/types'
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

  return (
    <div className="flex flex-col gap-2">
      {total !== undefined && (
        <p className="mb-2 text-sm text-muted-foreground">About {total.toLocaleString()} results</p>
      )}
      <div className="flex flex-col gap-3">
        {movies.map((movie, i) => (
          <div
            key={movie.id}
            className="animate-card-enter"
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
