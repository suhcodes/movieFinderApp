import { useEffect } from 'react'
import { useQueryState } from 'nuqs'
import { MovieResultList } from '@/features/search/components/movie-result-list'
import { useMovieSearch } from '@/lib/queries/use-movie-search'
import { useMinLoading } from '@/lib/hooks/use-min-loading'
import { ErrorDisplay } from '@/components/shared'

export function SearchPage() {
  const [q] = useQueryState('q', { defaultValue: '' })
  const [pageParam, setPageParam] = useQueryState('page', { defaultValue: '1' })
  const page = Math.max(1, parseInt(pageParam, 10) || 1)

  // Reset to page 1 whenever the search query changes
  useEffect(() => {
    if (page !== 1) setPageParam('1')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q])

  const { data, isLoading, isError, error } = useMovieSearch(q, page)
  const showLoading = useMinLoading(isLoading)
  const totalPages = Math.ceil((data?.total ?? 0) / 10)

  if (isError) {
    return <ErrorDisplay {...error} />
  }

  return (
    <div className="mx-auto w-full px-8 py-6">
      <MovieResultList
        movies={data?.movies ?? []}
        isLoading={showLoading}
        total={data?.total}
        page={page}
        totalPages={totalPages}
        onPageChange={(p) => setPageParam(String(p))}
      />
    </div>
  )
}
