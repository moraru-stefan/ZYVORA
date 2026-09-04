export interface Genre {
  id: number
  name: string
}

export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
}

export interface MovieDetails extends Omit<Movie, 'genre_ids'> {
  genres: Genre[]
  runtime: number | null
  tagline: string | null
}

export interface CastMember {
  id: number
  name: string
  character: string
  profile_path: string | null
  order: number
}

export interface Video {
  id: string
  key: string
  name: string
  site: string
  type: string
  official: boolean
}

export interface MovieResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export interface CreditsResponse {
  id: number
  cast: CastMember[]
}

export interface VideosResponse {
  id: number
  results: Video[]
}

export interface GenreResponse {
  genres: Genre[]
}
