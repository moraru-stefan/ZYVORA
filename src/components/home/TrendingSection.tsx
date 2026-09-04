import MovieCard from '../../components/movie/MovieCard'
import MovieCardSkeleton from '../../components/movie/MovieCardSkeleton'
import MovieRow from '../../components/movie/MovieRow'
import ErrorState from '../../components/ui/ErrorState'
import { useTrendingMovies } from '../../hooks/useMovies'
import SectionHeader from './SectionHeader'

export default function TrendingSection() {
  const { data, isLoading, isError, refetch } = useTrendingMovies()

  return (
    <section
      id="trending"
      className="mx-auto max-w-7xl scroll-mt-24 px-6 py-16 lg:px-12"
    >
      <SectionHeader
        title="Trending now"
        subtitle="What everyone is watching."
      />

      {isError ? (
        <ErrorState
          message="Couldn't load trending movies."
          onRetry={refetch}
        />
      ) : (
        <MovieRow>
          {isLoading
            ? Array.from({ length: 6 }, (_, index) => (
                <MovieCardSkeleton key={index} />
              ))
            : data?.results
                .slice(0, 12)
                .map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </MovieRow>
      )}
    </section>
  )
}
