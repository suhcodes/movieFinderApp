import type { MovieFilters } from '@/features/search/types'

export const movieKeys = {
  all: ['movies'] as const,
  list: (filters: MovieFilters) => [...movieKeys.all, 'list', filters] as const,
  detail: (id: string) => [...movieKeys.all, 'detail', id] as const,
} as const
