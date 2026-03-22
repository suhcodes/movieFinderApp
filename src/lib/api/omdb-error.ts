export function assertOmdbSuccess(data: { Response: string; Error?: string }): void {
  if (data.Response === 'False') {
    throw new Error(data.Error ?? 'OMDB request failed')
  }
}
