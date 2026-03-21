export const movieKeys = {
  all: ['movies'] as const,
  list: (filters: Record<string, unknown>) => [...movieKeys.all, 'list', filters] as const,
  detail: (id: string) => [...movieKeys.all, 'detail', id] as const,
} as const
