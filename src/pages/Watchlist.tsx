import { Link } from 'react-router-dom'
import MovieCard from '../components/movie/MovieCard'
import MovieGrid from '../components/movie/MovieGrid'
import { Button } from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import { useWatchlist } from '../hooks/useWatchlist'

export default function Watchlist() {
  const { movies, removeMovie } = useWatchlist()

  return (
    <section className="min-h-screen px-6 pt-32 pb-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {movies.length === 0 ? (
          <EmptyState
            title="Your watchlist is empty."
            description="Movies you save will show up here."
            action={
              <Link to="/">
                <Button>Explore movies</Button>
              </Link>
            }
          />
        ) : (
          <>
            <h1 className="text-4xl font-extrabold tracking-tight text-brand-text sm:text-5xl">
              Your Watchlist
            </h1>
            <p className="mt-2 text-brand-muted">
              Movies you want to remember.
            </p>

            <div className="mt-10">
              <MovieGrid>
                {movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onRemove={() => removeMovie(movie.id)}
                  />
                ))}
              </MovieGrid>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
