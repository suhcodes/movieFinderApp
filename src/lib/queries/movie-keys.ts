import type { MovieFilters } from '@/features/search/types'

export const movieKeys = {
  all: () => ['movies'] as const,
  lists: () => [...movieKeys.all(), 'list'] as const,
  list: (filters: MovieFilters) => [...movieKeys.lists(), filters] as const,
  details: () => [...movieKeys.all(), 'detail'] as const,
  detail: (id: string) => [...movieKeys.details(), id] as const,
}
