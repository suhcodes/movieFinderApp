import { z } from 'zod'

export const omdbDetailResponseSchema = z.object({
  Title: z.string(),
  Year: z.string(),
  imdbID: z.string(),
  Type: z.string(),
  Poster: z.string(),
  Plot: z.string(),
  imdbRating: z.string(),
  imdbVotes: z.string(),
  Runtime: z.string(),
  Genre: z.string(),
  Language: z.string(),
  Country: z.string(),
  Awards: z.string(),
  Director: z.string(),
  Writer: z.string(),
  Actors: z.string(),
  Released: z.string(),
  BoxOffice: z.string(),
  DVD: z.string(),
  Website: z.string(),
  Metascore: z.string(),
  Ratings: z.array(z.object({ Source: z.string(), Value: z.string() })),
  Response: z.union([z.literal('True'), z.literal('False')]),
  Error: z.string().optional(),
})

export type OmdbDetailResponse = z.infer<typeof omdbDetailResponseSchema>
