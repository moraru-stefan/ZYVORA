import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import {
  gsap,
  prefersReducedMotion,
  ScrollTrigger,
} from '../../animations/gsapConfig'

const links = [
  { to: '/', label: 'Discover' },
  { to: '/#trending', label: 'Trending' },
  { to: '/watchlist', label: 'Watchlist' },
]

// Watchlist gets its own icon button on mobile, so skip it in the dropdown.
const mobileMenuLinks = links.filter((link) => link.to !== '/watchlist')

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `relative py-1 text-sm transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-brand-accent-2 after:transition-all after:duration-300 hover:after:w-full ${
    isActive ? 'text-brand-text' : 'text-brand-muted hover:text-brand-text'
  }`

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLUListElement>(null)
  const isFirstRender = useRef(true)
  const location = useLocation()
  const [prevPathname, setPrevPathname] = useState(location.pathname)

  // Close the mobile menu on any navigation, not just its own links.
  if (location.pathname !== prevPathname) {
    setPrevPathname(location.pathname)
    setMenuOpen(false)
  }

  // Nudge the navbar toward a solid surface once the hero scrolls past.
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 0,
      onUpdate: (self) => setScrolled(self.scroll() > 24),
    })
    return () => trigger.kill()
  }, [])

  // Slide the mobile menu open/closed instead of popping it in and out.
  useLayoutEffect(() => {
    if (!menuRef.current) return

    if (isFirstRender.current) {
      isFirstRender.current = false
      gsap.set(menuRef.current, { height: 0, opacity: 0 })
      return
    }

    if (prefersReducedMotion()) {
      gsap.set(menuRef.current, {
        height: menuOpen ? 'auto' : 0,
        opacity: menuOpen ? 1 : 0,
      })
      return
    }

    gsap.to(menuRef.current, {
      height: menuOpen ? 'auto' : 0,
      opacity: menuOpen ? 1 : 0,
      duration: 0.35,
      ease: menuOpen ? 'power3.out' : 'power2.in',
      overwrite: 'auto',
    })
  }, [menuOpen])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-white/5 bg-brand-bg/80 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-12"
        aria-label="Primary"
      >
        <Link
          to="/"
          className="text-lg font-extrabold tracking-[0.2em] text-brand-text"
        >
          ZYVORA
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.label}>
              <NavLink to={link.to} className={linkClass} end={link.to === '/'}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            to="/search"
            aria-label="Search movies"
            className="rounded-full p-2 text-brand-muted transition-colors hover:bg-white/5 hover:text-brand-text"
          >
            <SearchIcon />
          </Link>
          <NavLink
            to="/watchlist"
            aria-label="Watchlist"
            className={({ isActive }) =>
              `rounded-full p-2 transition-colors hover:bg-white/5 hover:text-brand-text md:hidden ${
                isActive ? 'text-brand-text' : 'text-brand-muted'
              }`
            }
          >
            {({ isActive }) => <HeartIcon filled={isActive} />}
          </NavLink>
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="rounded-full p-2 text-brand-muted transition-colors hover:bg-white/5 hover:text-brand-text md:hidden"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      <ul
        id="mobile-menu"
        ref={menuRef}
        className="flex flex-col gap-1 overflow-hidden border-t border-white/5 bg-brand-bg/95 px-6 backdrop-blur-md md:hidden"
      >
        {mobileMenuLinks.map((link) => (
          <li key={link.label} className="py-1 first:pt-4 last:pb-4">
            <NavLink
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm text-brand-muted transition-colors hover:bg-white/5 hover:text-brand-text"
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </header>
  )
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="h-5 w-5"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  )
}

function HeartIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={1.8}
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        d="M12 20.5s-7.5-4.6-10-9.3C.5 7.8 2.4 4.5 6 4c2-.3 3.8.7 6 3 2.2-2.3 4-3.3 6-3 3.6.5 5.5 3.8 4 7.2-2.5 4.7-10 9.3-10 9.3Z"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
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
  )
}
