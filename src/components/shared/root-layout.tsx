import { Outlet, useMatch } from 'react-router-dom'
import { AppHeader } from '@/components/shared/app-header'
import { AppFooter } from '@/components/shared/app-footer'

export function RootLayout() {
  const isSearch = useMatch('/search')
  const isMovie = useMatch('/movie')

  return (
    <div className="flex min-h-screen flex-col">
      {(isSearch || isMovie) && <AppHeader />}
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
      <AppFooter />
    </div>
  )
}
