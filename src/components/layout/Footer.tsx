import { Link } from 'react-router-dom'

const links = [
  { to: '/', label: 'Discover' },
  { to: '/#trending', label: 'Trending' },
  { to: '/watchlist', label: 'Watchlist' },
  {
    to: 'https://github.com/moraru-stefan/ZYVORA',
    label: 'GitHub',
    external: true,
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-brand-bg-secondary">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-14 lg:flex-row lg:items-start lg:justify-between lg:px-12">
        <div>
          <p className="text-lg font-extrabold tracking-[0.2em] text-brand-text">
            ZYVORA
          </p>
          <p className="mt-2 max-w-xs text-sm text-brand-muted">
            Stories that move you.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-brand-muted">
            {links.map((link) =>
              link.external ? (
                <li key={link.label}>
                  <a
                    href={link.to}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-brand-text"
                  >
                    {link.label}
                  </a>
                </li>
              ) : (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="transition-colors hover:text-brand-text"
                  >
                    {link.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-xs text-brand-muted sm:flex-row sm:items-center sm:justify-between lg:px-12">
          <p>Built with React, TypeScript, Tailwind CSS, GSAP &amp; TMDB.</p>
          <p>
            This product uses the TMDB API but is not endorsed or certified by
            TMDB.
          </p>
        </div>
      </div>
    </footer>
  )
}
