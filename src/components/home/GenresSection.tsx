import { Link } from 'react-router-dom'
import { useGenres } from '../../hooks/useMovies'
import SectionHeader from './SectionHeader'

export default function GenresSection() {
  const { data, isLoading, isError } = useGenres()

  if (isError) return null

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
      <SectionHeader
        title="Browse by genre"
        subtitle="Find a mood, find a movie."
      />

      <div className="flex flex-wrap gap-3">
        {isLoading
          ? Array.from({ length: 8 }, (_, index) => (
              <div
                key={index}
                className="h-9 w-24 animate-pulse rounded-full bg-white/5"
              />
            ))
          : data?.genres.map((genre) => (
              <Link
                key={genre.id}
                to={`/search?genre=${genre.id}&name=${encodeURIComponent(genre.name)}`}
                className="rounded-full border border-white/10 px-5 py-2 text-sm text-brand-muted transition-colors hover:border-brand-accent-2/50 hover:text-brand-text"
              >
                {genre.name}
              </Link>
            ))}
      </div>
    </section>
  )
}
