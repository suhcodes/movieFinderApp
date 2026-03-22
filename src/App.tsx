import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RootLayout } from '@/components/shared'
import { Loader } from '@/components/ui'

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    HydrateFallback: Loader,
    children: [
      {
        path: '/',
        lazy: async () => {
          const { HomePage } = await import('@/pages/home-page')
          return { Component: HomePage }
        },
      },
      {
        path: '/search',
        lazy: async () => {
          const { SearchPage } = await import('@/pages/search-page')
          return { Component: SearchPage }
        },
      },
      {
        path: '/movie',
        lazy: async () => {
          const { MoviePage } = await import('@/pages/movie-page')
          return { Component: MoviePage }
        },
      },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
