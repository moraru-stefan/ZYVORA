import { Link } from 'react-router-dom'
import { getImageUrl } from '../../services/tmdb'
import type { Movie } from '../../types/movie'
import Rating from './Rating'

interface MovieCardProps {
  movie: Movie
  className?: string
}

export default function MovieCard({ movie, className = '' }: MovieCardProps) {
  const poster = getImageUrl(movie.poster_path, 'w342')
  const year = movie.release_date ? movie.release_date.slice(0, 4) : null

  return (
    <Link
      to={`/movie/${movie.id}`}
      className={`group relative block overflow-hidden rounded-2xl border border-white/5 bg-brand-surface transition-transform duration-300 hover:-translate-y-1 ${className}`}
    >
      <div className="aspect-[2/3] overflow-hidden bg-brand-bg-secondary">
        {poster ? (
          <img
            src={poster}
            alt={`${movie.title} poster`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <PosterFallback title={movie.title} />
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <span className="pointer-events-none absolute inset-x-4 bottom-4 hidden translate-y-2 text-xs font-medium tracking-wide text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:block">
          View details &rarr;
        </span>
      </div>

      <div className="space-y-1 p-3">
        <h3 className="truncate text-sm font-medium text-brand-text">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between text-xs text-brand-muted">
          <span>{year ?? 'Unknown'}</span>
          <Rating value={movie.vote_average} />
        </div>
      </div>
    </Link>
  )
}

function PosterFallback({ title }: { title: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center p-4 text-center text-xs font-medium text-brand-muted">
      {title}
    </div>
  )
}
