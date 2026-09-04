import { Route, Routes } from 'react-router-dom'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import NotFound from './pages/NotFound'
import Search from './pages/Search'
import Watchlist from './pages/Watchlist'

function App() {
  return (
    <div className="relative isolate flex min-h-screen flex-col bg-brand-bg text-brand-text">
      <AmbientBackground />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

// Soft, fixed accent glows so the page doesn't read as flat black
// once scrolled past the hero's own gradients.
function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute -top-32 left-[8%] h-[26rem] w-[26rem] rounded-full bg-brand-accent/20 blur-[130px]" />
      <div className="absolute top-1/3 -right-32 h-[24rem] w-[24rem] rounded-full bg-brand-accent-2/15 blur-[130px]" />
      <div className="absolute bottom-0 left-1/4 h-[22rem] w-[22rem] rounded-full bg-brand-accent/10 blur-[130px]" />
    </div>
  )
}

export default App
