import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api/client'
import { movieKeys } from './movie-keys'

interface Movie {
  id: string
  title: string
}
interface MoviesResponse {
  movies: Movie[]
}

export function useMovies() {
  return useQuery({
    queryKey: movieKeys.list({}),
    queryFn: async () => {
      const { data } = await apiClient.get<MoviesResponse>('/movies')
      return data
    },
  })
}
