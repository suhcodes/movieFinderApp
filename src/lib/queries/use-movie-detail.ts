import { useQuery } from '@tanstack/react-query'
import { movieApi } from '@/features/movie/services/movie-api'
import { movieKeys } from './movie-keys'

export function useMovieDetail(id: string) {
  return useQuery({
    queryKey: movieKeys.detail(id),
    queryFn: () => movieApi.getById(id),
    enabled: id.trim().length > 0,
  })
}
