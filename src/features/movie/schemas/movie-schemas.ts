import { z } from 'zod'

export const omdbDetailResponseSchema = z.object({
  Title: z.string(),
  Year: z.string(),
  imdbID: z.string(),
  Type: z.string(),
  Poster: z.string(),
  Plot: z.string(),
  imdbRating: z.string(),
  imdbVotes: z.string().optional(),
  Runtime: z.string().optional(),
  Genre: z.string().optional(),
  Language: z.string().optional(),
  Country: z.string().optional(),
  Awards: z.string().optional(),
  Director: z.string().optional(),
  Writer: z.string().optional(),
  Actors: z.string().optional(),
  Released: z.string().optional(),
  BoxOffice: z.string().optional(),
  DVD: z.string().optional(),
  Website: z.string().optional(),
  Metascore: z.string().optional(),
  Ratings: z.array(z.object({ Source: z.string(), Value: z.string() })).optional(),
  Response: z.union([z.literal('True'), z.literal('False')]),
  Error: z.string().optional(),
})

export type OmdbDetailResponse = z.infer<typeof omdbDetailResponseSchema>
