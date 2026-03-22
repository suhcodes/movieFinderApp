import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RootLayout } from '@/components/shared/root-layout'
import { HomePage } from '@/pages/home-page'
import { SearchPage } from '@/pages/search-page'
import { MoviePage } from '@/pages/movie-page'

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/search', element: <SearchPage /> },
      { path: '/movie', element: <MoviePage /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
