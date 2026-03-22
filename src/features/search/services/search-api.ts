import { apiClient } from '@/lib/api/client'
import { assertOmdbSuccess } from '@/lib/api/omdb-error'
import type { Movie } from '@/features/movie/types'
import { omdbSearchResponseSchema, type OmdbSearchItem } from '../schemas/search-schemas'

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
    const { data } = await apiClient.get<unknown>('/', {
      params: { s: query, page },
    })
    const parsed = omdbSearchResponseSchema.parse(data)
    assertOmdbSuccess(parsed)
    return {
      movies: (parsed.Search ?? []).map(toMovie),
      total: parseInt(parsed.totalResults ?? '0', 10),
    }
  },
}
