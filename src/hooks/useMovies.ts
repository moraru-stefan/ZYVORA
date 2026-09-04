import { useQuery } from '@tanstack/react-query'
import * as tmdb from '../services/tmdb'

// Centralized query keys so cache entries stay consistent across hooks.
export const movieKeys = {
  trending: ['movies', 'trending'] as const,
  popular: ['movies', 'popular'] as const,
  topRated: ['movies', 'top-rated'] as const,
  search: (query: string) => ['movies', 'search', query] as const,
  details: (id: string) => ['movie', id, 'details'] as const,
  credits: (id: string) => ['movie', id, 'credits'] as const,
  videos: (id: string) => ['movie', id, 'videos'] as const,
  similar: (id: string) => ['movie', id, 'similar'] as const,
  genres: ['genres'] as const,
  byGenre: (genreId: string) => ['movies', 'genre', genreId] as const,
}

export function useTrendingMovies() {
  return useQuery({
    queryKey: movieKeys.trending,
    queryFn: tmdb.getTrendingMovies,
  })
}

export function usePopularMovies() {
  return useQuery({
    queryKey: movieKeys.popular,
    queryFn: tmdb.getPopularMovies,
  })
}

export function useTopRatedMovies() {
  return useQuery({
    queryKey: movieKeys.topRated,
    queryFn: tmdb.getTopRatedMovies,
  })
}

export function useSearchMovies(query: string) {
  return useQuery({
    queryKey: movieKeys.search(query),
    queryFn: () => tmdb.searchMovies(query),
    enabled: query.trim().length > 1,
  })
}

export function useMovieDetails(id: string) {
  return useQuery({
    queryKey: movieKeys.details(id),
    queryFn: () => tmdb.getMovieDetails(id),
    enabled: Boolean(id),
  })
}

export function useMovieCredits(id: string) {
  return useQuery({
    queryKey: movieKeys.credits(id),
    queryFn: () => tmdb.getMovieCredits(id),
    enabled: Boolean(id),
  })
}

export function useMovieVideos(id: string) {
  return useQuery({
    queryKey: movieKeys.videos(id),
    queryFn: () => tmdb.getMovieVideos(id),
    enabled: Boolean(id),
  })
}

export function useSimilarMovies(id: string) {
  return useQuery({
    queryKey: movieKeys.similar(id),
    queryFn: () => tmdb.getSimilarMovies(id),
    enabled: Boolean(id),
  })
}

export function useGenres() {
  return useQuery({ queryKey: movieKeys.genres, queryFn: tmdb.getGenres })
}

export function useMoviesByGenre(genreId: string) {
  return useQuery({
    queryKey: movieKeys.byGenre(genreId),
    queryFn: () => tmdb.discoverMoviesByGenre(genreId),
    enabled: Boolean(genreId),
  })
}
