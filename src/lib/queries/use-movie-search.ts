import { useQuery } from '@tanstack/react-query'
import type { ErrorFormat } from '@/lib/api/api-error'
import type { Movie } from '@/features/movie/types'
import { searchApi } from '@/features/search/services/search-api'
import { movieKeys } from './movie-keys'

export function useMovieSearch(query: string, page = 1) {
  return useQuery<{ movies: Movie[]; total: number }, ErrorFormat>({
    queryKey: movieKeys.list({ query, page }),
    queryFn: () => searchApi.search(query, page),
    enabled: query.trim().length > 0,
  })
}
