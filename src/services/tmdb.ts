import type {
  CreditsResponse,
  GenreResponse,
  MovieDetails,
  MovieResponse,
  Video,
  VideosResponse,
} from '../types/movie'

const BASE_URL = 'https://api.themoviedb.org/3'
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

export type PosterSize = 'w185' | 'w342' | 'w500' | 'w780' | 'original'
export type BackdropSize = 'w780' | 'w1280' | 'original'

// Build a full TMDB image URL, or null when the movie has no artwork.
export function getImageUrl(
  path: string | null,
  size: PosterSize | BackdropSize = 'w500',
): string | null {
  if (!path) return null
  return `${IMAGE_BASE_URL}/${size}${path}`
}

// Pick the best trailer to show: prefer an official YouTube trailer.
export function getTrailer(videos: Video[]): Video | undefined {
  const youtube = videos.filter((video) => video.site === 'YouTube')
  return (
    youtube.find((video) => video.type === 'Trailer' && video.official) ??
    youtube.find((video) => video.type === 'Trailer') ??
    youtube[0]
  )
}

async function tmdbFetch<T>(
  path: string,
  params: Record<string, string> = {},
): Promise<T> {
  if (!API_KEY) {
    throw new Error(
      'Missing TMDB API key. Add VITE_TMDB_API_KEY to a .env file (see .env.example) and restart the dev server.',
    )
  }

  const url = new URL(`${BASE_URL}${path}`)
  url.searchParams.set('api_key', API_KEY)
  url.searchParams.set('language', 'en-US')
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value)
  }

  const response = await fetch(url.toString())
  if (!response.ok) {
    throw new Error(`TMDB request failed with status ${response.status}`)
  }

  return response.json() as Promise<T>
}

export function getTrendingMovies() {
  return tmdbFetch<MovieResponse>('/trending/movie/week')
}

export function getPopularMovies() {
  return tmdbFetch<MovieResponse>('/movie/popular')
}

export function getTopRatedMovies() {
  return tmdbFetch<MovieResponse>('/movie/top_rated')
}

export function searchMovies(query: string, page = 1) {
  return tmdbFetch<MovieResponse>('/search/movie', {
    query,
    page: String(page),
  })
}

export function getMovieDetails(id: string) {
  return tmdbFetch<MovieDetails>(`/movie/${id}`)
}

export function getMovieCredits(id: string) {
  return tmdbFetch<CreditsResponse>(`/movie/${id}/credits`)
}

export function getMovieVideos(id: string) {
  return tmdbFetch<VideosResponse>(`/movie/${id}/videos`)
}

export function getSimilarMovies(id: string) {
  return tmdbFetch<MovieResponse>(`/movie/${id}/similar`)
}

export function getGenres() {
  return tmdbFetch<GenreResponse>('/genre/movie/list')
}

export function discoverMoviesByGenre(genreId: string) {
  return tmdbFetch<MovieResponse>('/discover/movie', {
    with_genres: genreId,
    sort_by: 'popularity.desc',
  })
}
