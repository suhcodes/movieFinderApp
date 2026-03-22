export interface Movie {
  id: string
  title: string
  year: string
  posterPath: string | null
  type?: string
  overview?: string
  voteAverage?: number
  votes?: string
  runtime?: string
  language?: string
  country?: string
  genres?: string[]
  awards?: string
  director?: string
  writers?: string
  actors?: string
  released?: string
  boxOffice?: string
  dvd?: string
  rottenTomatoes?: string
  metacritic?: string
}
