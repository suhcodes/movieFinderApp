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
  imdbVotes: string
  Runtime: string
  Genre: string
  Language: string
  Country: string
  Awards: string
  Director: string
  Writer: string
  Actors: string
  Released: string
  BoxOffice: string
  DVD: string
  Website: string
  Metascore: string
  Ratings: { Source: string; Value: string }[]
  Response: 'True' | 'False'
  Error?: string
}

const na = (value: string): string | undefined => (value === 'N/A' ? undefined : value)

export const movieApi = {
  getById: async (id: string): Promise<Movie> => {
    const { data } = await apiClient.get<OmdbDetailResponse>('/', {
      params: { i: id, plot: 'full', r: 'json' },
    })

    const rtRating = data.Ratings?.find((r) => r.Source === 'Rotten Tomatoes')

    return {
      id: data.imdbID,
      title: data.Title,
      year: data.Year,
      posterPath: data.Poster !== 'N/A' ? data.Poster : null,
      type: na(data.Type),
      overview: na(data.Plot),
      voteAverage: data.imdbRating !== 'N/A' ? parseFloat(data.imdbRating) : undefined,
      votes: na(data.imdbVotes),
      runtime: na(data.Runtime),
      language: na(data.Language),
      country: na(data.Country),
      genres: data.Genre !== 'N/A' ? data.Genre.split(', ') : undefined,
      awards: na(data.Awards),
      director: na(data.Director),
      writers: na(data.Writer),
      actors: na(data.Actors),
      released: na(data.Released),
      boxOffice: na(data.BoxOffice),
      dvd: na(data.DVD),
      rottenTomatoes: rtRating?.Value,
      metacritic: na(data.Metascore),
    }
  },
}
