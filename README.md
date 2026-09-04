# ZYVORA

Stories that move you.

A movie discovery app built with React, TypeScript and the TMDB API. Browse
trending/popular/top-rated movies, search, check out details with cast and
trailer, and save movies to a watchlist. Frontend only, no backend — the
watchlist just lives in localStorage.

Personal portfolio project.

## Stack

React, TypeScript, Vite, Tailwind CSS, GSAP, React Router, TanStack Query,
TMDB API

## Running it locally

```bash
git clone https://github.com/moraru-stefan/ZYVORA.git
cd ZYVORA
npm install
cp .env.example .env
```

You'll need a free TMDB API key (get one at
[themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)) —
add it to `.env`:

```
VITE_TMDB_API_KEY=your_key_here
```

Then:

```bash
npm run dev     # start dev server
npm run build   # production build
npm run lint    # eslint
```

## Features

- Trending / popular / top-rated sections + genre browsing
- Debounced search
- Movie details page (cast, trailer modal, similar movies)
- Watchlist (add/remove, saved in localStorage)
- GSAP animations, respects `prefers-reduced-motion`
- Responsive, dark UI

## Notes

- `VITE_` env vars are public/bundled at build time, not real secrets.
- Uses the TMDB API but isn't endorsed or certified by TMDB.
