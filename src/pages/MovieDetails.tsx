import { useLayoutEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { revealCards } from '../animations/cardAnimation'
import { animateDetailsEntrance } from '../animations/pageAnimation'
import CastCard from '../components/movie/CastCard'
import MovieCard from '../components/movie/MovieCard'
import MovieGrid from '../components/movie/MovieGrid'
import Rating from '../components/movie/Rating'
import TrailerModal from '../components/movie/TrailerModal'
import { Button } from '../components/ui/Button'
import ErrorState from '../components/ui/ErrorState'
import LoadingState from '../components/ui/LoadingState'
import {
  useMovieCredits,
  useMovieDetails,
  useMovieVideos,
  useSimilarMovies,
} from '../hooks/useMovies'
import { useWatchlist } from '../hooks/useWatchlist'
import { formatRuntime } from '../lib/format'
import { getImageUrl, getTrailer } from '../services/tmdb'
import type { Movie } from '../types/movie'

export default function MovieDetails() {
  const { id = '' } = useParams()
  const [trailerOpen, setTrailerOpen] = useState(false)
  const scopeRef = useRef<HTMLElement>(null)
  const castRowRef = useRef<HTMLDivElement>(null)

  const details = useMovieDetails(id)
  const credits = useMovieCredits(id)
  const videos = useMovieVideos(id)
  const similar = useSimilarMovies(id)
  const { isInWatchlist, toggleMovie } = useWatchlist()
  const cast = credits.data?.cast.slice(0, 12) ?? []

  // Backdrop/poster/content entrance, once the movie has loaded.
  useLayoutEffect(() => {
    if (!scopeRef.current) return
    const ctx = animateDetailsEntrance(scopeRef.current)
    return () => ctx.revert()
  }, [details.data?.id])

  // Reveal cast cards as the row scrolls into view.
  useLayoutEffect(() => {
    if (!castRowRef.current) return
    const ctx = revealCards(castRowRef.current)
    return () => ctx.revert()
  }, [cast.length])

  if (details.isLoading) {
    return <LoadingState label="Loading movie..." />
  }

  if (details.isError || !details.data) {
    return (
      <div className="pt-32">
        <ErrorState
          message="Couldn't load this movie."
          onRetry={details.refetch}
        />
      </div>
    )
  }

  const movie = details.data
  const backdrop = getImageUrl(movie.backdrop_path, 'w1280')
  const poster = getImageUrl(movie.poster_path, 'w500')
  const year = movie.release_date ? movie.release_date.slice(0, 4) : null
  const trailer = videos.data ? getTrailer(videos.data.results) : undefined
  const similarMovies = similar.data?.results.slice(0, 10) ?? []

  // The watchlist stores plain Movie records, so map genres back to ids.
  const watchlistMovie: Movie = {
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    poster_path: movie.poster_path,
    backdrop_path: movie.backdrop_path,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
    vote_count: movie.vote_count,
    genre_ids: movie.genres.map((genre) => genre.id),
  }
  const saved = isInWatchlist(movie.id)

  return (
    <article ref={scopeRef}>
      <div
        data-detail="backdrop"
        className="relative h-[42vh] min-h-[280px] w-full overflow-hidden sm:h-[58vh]"
      >
        {backdrop ? (
          <img src={backdrop} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-brand-accent/30 to-brand-accent-2/20" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/70 to-brand-bg/10" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="-mt-20 flex flex-col items-center gap-6 sm:-mt-28 sm:flex-row sm:items-end sm:gap-8 lg:-mt-36">
          <div
            data-detail="poster"
            className="w-36 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-brand-surface shadow-2xl sm:w-52"
          >
            <div className="aspect-2/3">
              {poster ? (
                <img
                  src={poster}
                  alt={`${movie.title} poster`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center p-4 text-center text-sm text-brand-muted">
                  {movie.title}
                </div>
              )}
            </div>
          </div>

          <div
            data-detail="content"
            className="flex-1 pb-2 text-center sm:text-left"
          >
            <h1 className="text-3xl font-extrabold tracking-tight text-brand-text sm:text-5xl">
              {movie.title}
            </h1>
            {movie.tagline && (
              <p className="mt-2 text-brand-muted italic">{movie.tagline}</p>
            )}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-brand-muted sm:justify-start">
              {year && <span>{year}</span>}
              {movie.runtime ? (
                <span>{formatRuntime(movie.runtime)}</span>
              ) : null}
              <Rating value={movie.vote_average} />
            </div>
          </div>
        </div>

        {movie.genres.length > 0 && (
          <div className="mt-8 flex flex-wrap justify-center gap-2 sm:justify-start">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="rounded-full border border-white/10 px-4 py-1.5 text-xs text-brand-muted"
              >
                {genre.name}
              </span>
            ))}
          </div>
        )}

        <p className="mt-6 max-w-3xl text-center text-brand-muted sm:text-left">
          {movie.overview || 'No overview is available for this movie yet.'}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => setTrailerOpen(true)}
          >
            Watch Trailer
          </Button>
          <Button
            size="lg"
            variant="secondary"
            aria-pressed={saved}
            className="w-full sm:w-auto"
            onClick={() => toggleMovie(watchlistMovie)}
          >
            {saved ? 'In Watchlist' : 'Add to Watchlist'}
          </Button>
        </div>

        {cast.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl font-bold tracking-tight text-brand-text">
              Cast
            </h2>
            <div
              ref={castRowRef}
              className="no-scrollbar mt-6 flex gap-5 overflow-x-auto pb-2"
            >
              {cast.map((member) => (
                <CastCard key={member.id} member={member} />
              ))}
            </div>
          </section>
        )}

        {similarMovies.length > 0 && (
          <section className="mt-16 pb-20">
            <h2 className="text-xl font-bold tracking-tight text-brand-text">
              Similar movies
            </h2>
            <div className="mt-6">
              <MovieGrid>
                {similarMovies.map((similarMovie) => (
                  <MovieCard key={similarMovie.id} movie={similarMovie} />
                ))}
              </MovieGrid>
            </div>
          </section>
        )}
      </div>

      <TrailerModal
        trailer={trailer}
        isOpen={trailerOpen}
        onClose={() => setTrailerOpen(false)}
      />
    </article>
  )
}
