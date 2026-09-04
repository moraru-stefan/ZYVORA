import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { animateHero } from '../../animations/heroAnimation'
import { buttonClasses, Button } from '../../components/ui/Button'
import ErrorState from '../../components/ui/ErrorState'
import Rating from '../../components/movie/Rating'
import TrailerModal from '../../components/movie/TrailerModal'
import {
  useMovieDetails,
  useMovieVideos,
  useTrendingMovies,
} from '../../hooks/useMovies'
import { formatRuntime } from '../../lib/format'
import { getImageUrl, getTrailer } from '../../services/tmdb'

export default function Hero() {
  const [trailerOpen, setTrailerOpen] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const { data: trending, isLoading, isError, refetch } = useTrendingMovies()

  const featured = trending?.results[0]
  const { data: details } = useMovieDetails(String(featured?.id ?? ''))
  const { data: videos } = useMovieVideos(String(featured?.id ?? ''))

  // Runs the entrance timeline once the real hero (not the skeleton) mounts.
  useLayoutEffect(() => {
    if (!heroRef.current) return
    const ctx = animateHero(heroRef.current)
    return () => ctx.revert()
  }, [featured?.id])

  if (isLoading) return <HeroSkeleton />

  if (isError || !featured) {
    return (
      <div className="pt-32">
        <ErrorState
          message="Couldn't load the featured movie."
          onRetry={refetch}
        />
      </div>
    )
  }

  const backdrop = getImageUrl(featured.backdrop_path, 'w1280')
  const year = featured.release_date?.slice(0, 4)
  const genres = details?.genres
    ?.slice(0, 3)
    .map((genre) => genre.name)
    .join(' · ')
  const trailer = videos ? getTrailer(videos.results) : undefined

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-[92vh] items-end overflow-hidden pb-20 pt-32 lg:pb-28"
    >
      <div data-hero="image" className="absolute inset-0 -z-10">
        {backdrop ? (
          <img src={backdrop} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-brand-accent/30 to-brand-accent-2/20" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/60 to-brand-bg/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-bg/90 via-brand-bg/10 to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        <p
          data-hero="label"
          className="text-xs font-semibold tracking-[0.3em] text-brand-accent-2"
        >
          FEATURED MOVIE
        </p>
        <h1
          data-hero="title"
          className="mt-4 max-w-3xl text-5xl leading-[0.95] font-extrabold tracking-tight text-brand-text sm:text-6xl lg:text-7xl"
        >
          {featured.title}
        </h1>
        <div
          data-hero="meta"
          className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-brand-muted"
        >
          {year && <span>{year}</span>}
          {details?.runtime ? (
            <span>{formatRuntime(details.runtime)}</span>
          ) : null}
          <Rating value={featured.vote_average} />
          {genres && <span className="hidden sm:inline">{genres}</span>}
        </div>
        {featured.overview && (
          <p
            data-hero="description"
            className="mt-5 max-w-xl text-brand-muted line-clamp-3"
          >
            {featured.overview}
          </p>
        )}
        <div data-hero="actions" className="mt-8 flex flex-wrap gap-3">
          <Button size="lg" onClick={() => setTrailerOpen(true)}>
            Watch Trailer
          </Button>
          <Link
            to={`/movie/${featured.id}`}
            className={buttonClasses('secondary', 'lg')}
          >
            More Details
          </Link>
        </div>
      </div>

      <TrailerModal
        trailer={trailer}
        isOpen={trailerOpen}
        onClose={() => setTrailerOpen(false)}
      />
    </section>
  )
}

function HeroSkeleton() {
  return (
    <section className="flex min-h-[92vh] animate-pulse items-end overflow-hidden bg-brand-bg-secondary pb-20 pt-32 lg:pb-28">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        <div className="h-3 w-32 rounded bg-white/5" />
        <div className="mt-5 h-16 w-2/3 rounded bg-white/5" />
        <div className="mt-6 h-4 w-1/3 rounded bg-white/5" />
        <div className="mt-8 h-24 w-1/2 rounded bg-white/5" />
      </div>
    </section>
  )
}
