import MovieCard from '../../components/movie/MovieCard'
import MovieCardSkeleton from '../../components/movie/MovieCardSkeleton'
import MovieGrid from '../../components/movie/MovieGrid'
import ErrorState from '../../components/ui/ErrorState'
import { useTopRatedMovies } from '../../hooks/useMovies'
import SectionHeader from './SectionHeader'

export default function TopRatedSection() {
  const { data, isLoading, isError, refetch } = useTopRatedMovies()

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
      <SectionHeader title="Top rated" subtitle="Films worth remembering." />

      {isError ? (
        <ErrorState
          message="Couldn't load top rated movies."
          onRetry={refetch}
        />
      ) : (
        <MovieGrid>
          {isLoading
            ? Array.from({ length: 10 }, (_, index) => (
                <MovieCardSkeleton key={index} />
              ))
            : data?.results
                .slice(0, 10)
                .map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </MovieGrid>
      )}
    </section>
  )
}
