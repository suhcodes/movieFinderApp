export interface Movie {
  id: string
  title: string
  year: string
  posterPath: string | null
  type?: string
  overview?: string
  voteAverage?: number
}
