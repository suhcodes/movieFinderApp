import { apiClient } from '@/lib/api/client'
import type { Movie } from '@/features/movies/types'

interface OmdbSearchItem {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

interface OmdbSearchResponse {
  Search?: OmdbSearchItem[]
  totalResults?: string
  Response: 'True' | 'False'
  Error?: string
}

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

function toMovie(item: OmdbSearchItem): Movie {
  return {
    id: item.imdbID,
    title: item.Title,
    year: item.Year,
    posterPath: item.Poster !== 'N/A' ? item.Poster : null,
    type: item.Type,
  }
}

export const moviesApi = {
  search: async (query: string, page = 1) => {
    const { data } = await apiClient.get<OmdbSearchResponse>('/', {
      params: { s: query, page },
    })
    if (data.Response === 'False') return { movies: [], total: 0 }
    return {
      movies: (data.Search ?? []).map(toMovie),
      total: parseInt(data.totalResults ?? '0', 10),
    }
  },

  getById: async (id: string): Promise<Movie> => {
    const { data } = await apiClient.get<OmdbDetailResponse>('/', {
      params: { i: id },
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
