import { useEffect, useState } from 'react'
import type { Movie } from '../types/movie'

const STORAGE_KEY = 'zyvora:watchlist'

function readWatchlist(): Movie[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Movie[]) : []
  } catch {
    return []
  }
}

// Persist the user's watchlist in localStorage. No backend involved.
export function useWatchlist() {
  const [movies, setMovies] = useState<Movie[]>(readWatchlist)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(movies))
  }, [movies])

  function isInWatchlist(id: number) {
    return movies.some((movie) => movie.id === id)
  }

  function addMovie(movie: Movie) {
    setMovies((prev) =>
      prev.some((item) => item.id === movie.id) ? prev : [...prev, movie],
    )
  }

  function removeMovie(id: number) {
    setMovies((prev) => prev.filter((movie) => movie.id !== id))
  }

  function toggleMovie(movie: Movie) {
    if (isInWatchlist(movie.id)) {
      removeMovie(movie.id)
    } else {
      addMovie(movie)
    }
  }

  return { movies, isInWatchlist, addMovie, removeMovie, toggleMovie }
}
