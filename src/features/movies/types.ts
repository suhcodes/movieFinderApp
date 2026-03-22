export interface Movie {
  id: string
  title: string
  year: string
  posterPath: string | null
  type?: string
  overview?: string
  voteAverage?: number
}
export interface MovieFilters {
  query: string
  page: number
}
