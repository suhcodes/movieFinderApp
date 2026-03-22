import { z } from 'zod'

const omdbSearchItemSchema = z.object({
  Title: z.string(),
  Year: z.string(),
  imdbID: z.string(),
  Type: z.string(),
  Poster: z.string(),
})

export const omdbSearchResponseSchema = z.object({
  Response: z.union([z.literal('True'), z.literal('False')]),
  Error: z.string().optional(),
  Search: z.array(omdbSearchItemSchema).optional(),
  totalResults: z.string().optional(),
})

export type OmdbSearchResponse = z.infer<typeof omdbSearchResponseSchema>
export type OmdbSearchItem = z.infer<typeof omdbSearchItemSchema>
