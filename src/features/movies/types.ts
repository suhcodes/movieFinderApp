export interface Movie {
  id: string
  title: string
  overview: string
  releaseDate: string
  posterPath: string | null
  voteAverage: number
}
export interface MovieFilters {
  query: string
  page: number
}
