import { useQuery } from '@tanstack/react-query'
import { movieApi } from '@/features/movie/services/movie-api'
import { useMovieStore } from '@/lib/stores/movie-store'
import { movieKeys } from './movie-keys'

export function useMovieDetail(id: string) {
  const moviesById = useMovieStore((s) => s.moviesById)
  const setMovie = useMovieStore((s) => s.setMovie)

  return useQuery({
    queryKey: movieKeys.detail(id),
    queryFn: async () => {
      const movie = await movieApi.getById(id)
      setMovie(movie)
      return movie
    },
    enabled: id.trim().length > 0 && !moviesById[id],
    initialData: moviesById[id],
  })
}
