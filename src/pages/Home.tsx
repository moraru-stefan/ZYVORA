import GenresSection from '../components/home/GenresSection'
import Hero from '../components/home/Hero'
import PopularSection from '../components/home/PopularSection'
import TopRatedSection from '../components/home/TopRatedSection'
import TrendingSection from '../components/home/TrendingSection'

export default function Home() {
  return (
    <>
      <Hero />
      <TrendingSection />
      <PopularSection />
      <TopRatedSection />
      <GenresSection />
    </>
  )
}
