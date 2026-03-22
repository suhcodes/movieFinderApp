import { create } from 'zustand'
import type { Movie } from '@/features/movies/types'

interface MovieStore {
  moviesById: Record<string, Movie>
  setMovie: (movie: Movie) => void
}

export const useMovieStore = create<MovieStore>((set) => ({
  moviesById: {},
  setMovie: (movie) => set((state) => ({ moviesById: { ...state.moviesById, [movie.id]: movie } })),
}))
