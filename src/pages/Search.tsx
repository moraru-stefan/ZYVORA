import type { ChangeEvent, KeyboardEvent } from 'react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import MovieCard from '../components/movie/MovieCard'
import MovieCardSkeleton from '../components/movie/MovieCardSkeleton'
import MovieGrid from '../components/movie/MovieGrid'
import EmptyState from '../components/ui/EmptyState'
import ErrorState from '../components/ui/ErrorState'
import { useDebounce } from '../hooks/useDebounce'
import { useMoviesByGenre, useSearchMovies } from '../hooks/useMovies'

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const genreId = searchParams.get('genre')
  const genreName = searchParams.get('name')

  const [searchTerm, setSearchTerm] = useState(searchParams.get('query') ?? '')
  const debouncedTerm = useDebounce(searchTerm, 400)

  // Keep the URL in sync so a text search is shareable/bookmarkable.
  useEffect(() => {
    if (genreId) return
    const next = new URLSearchParams(searchParams)
    if (debouncedTerm.trim().length > 1) {
      next.set('query', debouncedTerm)
    } else {
      next.delete('query')
    }
    setSearchParams(next, { replace: true })
    // Only re-sync when the debounced term or genre mode changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTerm, genreId])

  const textResults = useSearchMovies(debouncedTerm)
  const genreResults = useMoviesByGenre(genreId ?? '')

  const isGenreMode = Boolean(genreId)
  const results = isGenreMode ? genreResults : textResults
  const hasQuery = isGenreMode || debouncedTerm.trim().length > 1

  function clearGenreFilter() {
    const next = new URLSearchParams(searchParams)
    next.delete('genre')
    next.delete('name')
    setSearchParams(next, { replace: true })
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value)
    if (isGenreMode) clearGenreFilter()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') event.currentTarget.blur()
  }

  function handleClear() {
    setSearchTerm('')
  }

  return (
    <section className="min-h-screen px-6 pt-32 pb-24 lg:px-12">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl leading-tight font-extrabold tracking-tight text-brand-text sm:text-5xl">
          Find your next story.
        </h1>

        <div className="relative mx-auto mt-8 max-w-xl">
          <input
            type="text"
            value={searchTerm}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Search movies..."
            aria-label="Search movies"
            autoComplete="off"
            className="w-full rounded-full border border-white/10 bg-brand-surface px-6 py-4 pr-12 text-brand-text placeholder:text-brand-muted focus:border-brand-accent-2/50 focus:outline-none"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear search"
              className="absolute top-1/2 right-4 -translate-y-1/2 text-brand-muted transition-colors hover:text-brand-text"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-7xl">
        {isGenreMode && genreName && (
          <p className="mb-6 text-sm text-brand-muted">
            Genre: <span className="text-brand-text">{genreName}</span>
          </p>
        )}
        {!isGenreMode && hasQuery && (
          <p className="mb-6 text-sm text-brand-muted">
            Results for &ldquo;{debouncedTerm}&rdquo;
            {results.data ? ` · ${results.data.total_results}` : ''}
          </p>
        )}

        {!hasQuery ? null : results.isLoading ? (
          <MovieGrid>
            {Array.from({ length: 10 }, (_, index) => (
              <MovieCardSkeleton key={index} />
            ))}
          </MovieGrid>
        ) : results.isError ? (
          <ErrorState
            message="Couldn't complete your search."
            onRetry={results.refetch}
          />
        ) : results.data && results.data.results.length > 0 ? (
          <MovieGrid>
            {results.data.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </MovieGrid>
        ) : (
          <EmptyState
            title="No stories found."
            description="Try a different title or keyword."
          />
        )}
      </div>
    </section>
  )
}
