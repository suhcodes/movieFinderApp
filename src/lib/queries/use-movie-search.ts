import { useQuery } from '@tanstack/react-query'
import { moviesApi } from '@/features/movies/services/movies-api'
import { movieKeys } from './movie-keys'

export function useMovieSearch(query: string, page = 1) {
  return useQuery({
    queryKey: movieKeys.list({ query, page }),
    queryFn: () => moviesApi.search(query, page),
    enabled: query.trim().length > 0,
  })
}
