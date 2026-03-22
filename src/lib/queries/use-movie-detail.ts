import { useQuery } from '@tanstack/react-query'
import { moviesApi } from '@/features/movies/services/movies-api'
import { movieKeys } from './movie-keys'

export function useMovieDetail(id: string) {
  return useQuery({
    queryKey: movieKeys.detail(id),
    queryFn: () => moviesApi.getById(id),
    enabled: id.trim().length > 0,
  })
}
