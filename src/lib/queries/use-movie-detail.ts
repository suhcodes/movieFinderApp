import { useQuery } from '@tanstack/react-query'
import type { ErrorFormat } from '@/lib/api/api-error'
import type { Movie } from '@/features/movie/types'
import { movieApi } from '@/features/movie/services/movie-api'
import { movieKeys } from './movie-keys'

export function useMovieDetail(id: string) {
  return useQuery<Movie, ErrorFormat>({
    queryKey: movieKeys.detail(id),
    queryFn: () => movieApi.getById(id),
    enabled: id.trim().length > 0,
    retryOnMount: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
}
