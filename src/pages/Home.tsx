import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import GenresSection from '../components/home/GenresSection'
import Hero from '../components/home/Hero'
import PopularSection from '../components/home/PopularSection'
import TopRatedSection from '../components/home/TopRatedSection'
import TrendingSection from '../components/home/TrendingSection'

export default function Home() {
  const location = useLocation()

  // React Router doesn't auto-scroll to a hash on navigation, so the
  // navbar's "Trending" link (/#trending) needs a manual nudge here.
  useEffect(() => {
    if (location.hash !== '#trending') return
    document
      .getElementById('trending')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [location.hash])

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
