import { apiClient } from '@/lib/api/client'
import type { Movie } from '@/features/movie/types'

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

function toMovie(item: OmdbSearchItem): Movie {
  return {
    id: item.imdbID,
    title: item.Title,
    year: item.Year,
    posterPath: item.Poster !== 'N/A' ? item.Poster : null,
    type: item.Type,
  }
}

export const searchApi = {
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
}
