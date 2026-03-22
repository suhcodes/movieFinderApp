import { useNavigate } from 'react-router-dom'

export function useLuckyMovie() {
  const navigate = useNavigate()

  return function navigateToLuckyMovie() {
    const num = Math.floor(Math.random() * 9899898) + 1
    const imdbId = `tt${String(num).padStart(7, '0')}`
    navigate(`/movie?id=${imdbId}`, { viewTransition: true })
  }
}
