import { Outlet, useMatch } from 'react-router-dom'
import { AppHeader } from '@/components/shared/app-header'
import { AppFooter } from '@/components/shared/app-footer'

export function RootLayout() {
  const isSearch = useMatch('/search')

  return (
    <div className="flex min-h-screen flex-col">
      {isSearch && <AppHeader />}
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
      <AppFooter />
    </div>
  )
}
