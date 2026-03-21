import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RootLayout } from '@/components/shared/root-layout'
import { HomePage } from '@/pages/home-page'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RootLayout>
        <HomePage />
      </RootLayout>
    ),
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
