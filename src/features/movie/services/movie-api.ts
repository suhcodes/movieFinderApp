import { apiClient } from '@/lib/api/client'
import type { Movie } from '@/features/movie/types'

interface OmdbDetailResponse {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
  Plot: string
  imdbRating: string
  Response: 'True' | 'False'
  Error?: string
}

export const movieApi = {
  getById: async (id: string): Promise<Movie> => {
    const { data } = await apiClient.get<OmdbDetailResponse>('/', {
      params: { i: id, plot: 'full', r: 'json' },
    })
    return {
      id: data.imdbID,
      title: data.Title,
      year: data.Year,
      posterPath: data.Poster !== 'N/A' ? data.Poster : null,
      type: data.Type,
      overview: data.Plot !== 'N/A' ? data.Plot : undefined,
      voteAverage: data.imdbRating !== 'N/A' ? parseFloat(data.imdbRating) : undefined,
    }
  },
}
