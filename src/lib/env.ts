function requireEnv(key: string): string {
  const value = import.meta.env[key] as string | undefined
  if (!value) throw new Error(`Missing required environment variable: ${key}`)
  return value
}

export const env = {
  apiBaseUrl: requireEnv('VITE_API_BASE_URL'),
  omdbApiKey: requireEnv('VITE_OMDB_API_KEY'),
}
