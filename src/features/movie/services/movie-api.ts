import { apiClient } from '@/lib/api/client'
import { assertOmdbSuccess } from '@/lib/api/omdb-error'
import type { Movie } from '@/features/movie/types'
import { omdbDetailResponseSchema } from '../schemas/movie-schemas'

const na = (value: string | undefined): string | undefined =>
  value === undefined || value === 'N/A' ? undefined : value

export const movieApi = {
  getById: async (id: string): Promise<Movie> => {
    const { data } = await apiClient.get<unknown>('/', {
      params: { i: id, plot: 'full', r: 'json' },
    })
    const parsed = omdbDetailResponseSchema.parse(data)
    assertOmdbSuccess(parsed)

    const rtRating = parsed.Ratings?.find((r) => r.Source === 'Rotten Tomatoes')

    return {
      id: parsed.imdbID,
      title: parsed.Title,
      year: parsed.Year,
      posterPath: parsed.Poster !== 'N/A' ? parsed.Poster : null,
      type: na(parsed.Type),
      overview: na(parsed.Plot),
      voteAverage: parsed.imdbRating !== 'N/A' ? parseFloat(parsed.imdbRating) : undefined,
      votes: na(parsed.imdbVotes),
      runtime: na(parsed.Runtime),
      language: na(parsed.Language),
      country: na(parsed.Country),
      genres: parsed.Genre && parsed.Genre !== 'N/A' ? parsed.Genre.split(', ') : undefined,
      awards: na(parsed.Awards),
      director: na(parsed.Director),
      writers: na(parsed.Writer),
      actors: na(parsed.Actors),
      released: na(parsed.Released),
      boxOffice: na(parsed.BoxOffice),
      dvd: na(parsed.DVD),
      rottenTomatoes: rtRating?.Value,
      metacritic: na(parsed.Metascore),
    }
  },
}
