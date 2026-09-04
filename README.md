# ZYVORA

**Stories that move you.**

A cinematic movie discovery app — browse trending, popular and top-rated
titles, search the TMDB catalog, view rich movie details with cast and
trailers, and keep a personal watchlist. Built as a frontend portfolio
project: no backend, no database, just a well-structured React app talking
directly to a public API.

## Features

- **Discover** trending, popular and top-rated movies, plus a genre browser
- **Search** with debounced input, shareable `?query=` URLs, loading/empty/
  error states
- **Movie details** — backdrop, poster, genres, rating, runtime, overview,
  cast and similar movies
- **Trailers** in a keyboard-accessible modal (Escape to close), with a
  graceful message when none is available
- **Watchlist** persisted in `localStorage` — add, remove, and browse saved
  movies, no account required
- **Cinematic GSAP animations** — hero entrance, scroll-triggered reveals,
  modal transitions — all respecting `prefers-reduced-motion`
- Fully responsive, dark, minimal, typography-first design

## Tech stack

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vite.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [GSAP](https://gsap.com) (+ ScrollTrigger)
- [React Router](https://reactrouter.com)
- [TanStack Query](https://tanstack.com/query)
- [TMDB API](https://www.themoviedb.org/documentation/api)
- ESLint + Prettier

## Screenshots

_Add screenshots of the homepage, search, movie details and watchlist here
once the app is deployed._

## Installation

```bash
git clone https://github.com/moraru-stefan/ZYVORA.git
cd ZYVORA
npm install
```

## Environment variables

ZYVORA needs a TMDB API key to fetch movie data.

1. Create a free account at [themoviedb.org](https://www.themoviedb.org/signup)
   and generate a **v3 API key** at
   [Settings → API](https://www.themoviedb.org/settings/api).
2. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

3. Set your key:

   ```
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   ```

This is a frontend-only project, so any `VITE_`-prefixed variable is bundled
into the client at build time — it's a public key, not a server secret.
Without a key, the app renders normally but shows a clear "missing API key"
message instead of movie data.

## Development

```bash
npm run dev       # start the Vite dev server
npm run lint       # run ESLint
npm run format     # format with Prettier
npm run format:check
```

## Build

```bash
npm run build      # type-check with tsc, then build to dist/
npm run preview    # preview the production build locally
```

## Deployment

The app is a static single-page app and is intended to be deployed to
[Vercel](https://vercel.com). Since routing is handled client-side by React
Router, Vercel's SPA fallback (or a catch-all rewrite to `/index.html`) is
required so deep links like `/movie/123` resolve correctly. Set
`VITE_TMDB_API_KEY` as an environment variable in the Vercel project before
deploying.

## Project structure

```
src/
  animations/     GSAP timelines and ScrollTrigger helpers
  components/
    home/         Homepage-only sections (Hero, Trending, Genres...)
    layout/       Navbar, Footer
    movie/        MovieCard, MovieGrid, CastCard, TrailerModal...
    ui/           Button, LoadingState, ErrorState, EmptyState
  hooks/          useDebounce, useWatchlist, useMovies (TanStack Query)
  lib/            queryClient, formatting helpers
  pages/          Home, Search, MovieDetails, Watchlist, NotFound
  services/       tmdb.ts — the only place that talks to the TMDB API
  types/          Shared TypeScript models
```

## API

All TMDB requests go through `src/services/tmdb.ts`. Data fetching and
caching are handled by TanStack Query via hooks in `src/hooks/useMovies.ts`.

## Credits

This product uses the [TMDB API](https://www.themoviedb.org/documentation/api)
but is not endorsed or certified by TMDB.

## Future improvements

- User accounts / synced watchlists across devices
- Pagination or infinite scroll on search and genre results
- More filtering (year, rating range) on the search page
- Automated tests (component + e2e)

---

Portfolio project by [Stefan Moraru](https://github.com/moraru-stefan) —
built with React, TypeScript, Tailwind CSS, GSAP & TMDB.

Repository: <https://github.com/moraru-stefan/ZYVORA>
