# ZYVORA — Project Specification

> Internal reference document. This captures the full brief for the ZYVORA
> movie discovery app so implementation stays consistent across sessions.
> Not part of the public-facing README.

## 0. Repository

- GitHub: https://github.com/moraru-stefan/ZYVORA
- Work directly inside this repository. Do not create a new one.
- Vercel deployment happens later, together with the user. Not part of this phase.

## 0.1 Git workflow

- Commit after each meaningful milestone, not only at the end.
- Conventional Commits, English, descriptive (no "update", "fix", "done", etc).
- Several small commits > one huge commit.
- No force push, no history rewrite, no `git reset --hard`, no secrets, no `.env` committed.
- Push to remote only when explicitly requested.

## 1. Project goal

Frontend-only movie discovery web app. No custom backend. Deployable to Vercel
as a static SPA (deployment itself handled later).

Users can: discover popular/trending/top-rated movies, search movies, view
movie details (info, genres, rating, cast), watch a trailer when available,
save/remove movies in a local watchlist, navigate between pages, and enjoy
polished GSAP animations.

## 2. Tech stack

React, Vite, TypeScript, Tailwind CSS, GSAP, React Router, TanStack Query,
TMDB API, ESLint, Prettier. No Next.js. No Redux. Context only where it
genuinely helps.

## 3–4. Design direction & brand

Cinematic, premium, modern, minimal, immersive, slightly futuristic, elegant,
dark, visually impressive. NOT a Netflix clone, not a copy of any existing
site — own identity.

- Brand: **ZYVORA**
- Tagline: "Stories that move you."
- Supporting copy: "Discover films worth remembering."
- Logo: typography-only, uppercase "ZYVORA", no complex SVG.

## 5. Color system

- Background: `#070711`
- Secondary background: `#0D0D18`
- Surface: `#12121F`
- Primary accent: `#7C3AED`
- Secondary accent: `#38BDF8`
- Text: `#F8FAFC`
- Muted text: `#94A3B8`
- Gradients (purple → blue) used sparingly. Elegant and readable over trendy.

## 6. Typography

Inter (or similar clean Google Font). Strong hierarchy, very large desktop
hero heading, tight line-height, minimal copy.

## 7. Responsive design

Mobile is a deliberately different layout, not a shrunk desktop:

- Desktop: large cinematic hero, horizontal nav, grids, horizontal sections.
- Mobile: compact nav, 2-column grid, simplified hero, horizontal scroll
  sections where appropriate. No horizontal overflow anywhere.

## 8. Routes

`/`, `/search`, `/movie/:id`, `/watchlist`, `*` (404).

## 9–10. Home page & Navbar

Home: Navbar → Hero → Trending → Popular → Top Rated → Genres → Footer.

Navbar: transparent/floating, opacity increases on scroll (GSAP or scroll
listener). Desktop: ZYVORA left, Discover/Trending/Watchlist center-right,
search right. Mobile: ZYVORA left, search + menu right, simple.

## 11–12. Hero section & animation

Real TMDB backdrop, "FEATURED MOVIE" label, large title, short overview,
metadata (year, runtime, rating, genres), "Watch Trailer" + "More Details"
buttons. Multiple gradient overlays for readability over any image.

GSAP entrance sequence on load: navbar fade → label fade-up → title reveal-up
→ description fade-up → buttons fade-up → image scale 1.08→1, staggered.
Use `power3.out`/`power4.out`, no bounce, not too fast.

## 13–15. Trending section & Movie card

"Trending now" / "What everyone is watching." Responsive card counts (≈5
desktop, 3–4 tablet, 2 or horizontal-scroll mobile). Hover: scale up slightly,
move up, reveal info, "View details".

Reusable `MovieCard.tsx`, strongly typed props (movie, index, variant), no
duplicated card markup across pages. Premium feel: rounded corners,
overflow-hidden, subtle borders, soft shadows (not huge), dark overlays,
hover transitions.

ScrollTrigger reveal for cards entering viewport: opacity 0→1, y 40→0,
staggered. Respect `prefers-reduced-motion`.

## 16–17. Search page

"Find your next story." heading, search input, debounced (300–500ms) API
search, loading/empty/error states, "No stories found." empty state with
subtle animation.

## 18–20. Movie details page

`/movie/:id`. Large backdrop, dark gradient overlay, poster, title, tagline,
metadata, overview, genres, rating, runtime, release date, "Watch Trailer" +
"Add to Watchlist" buttons, Cast section, Similar Movies section.

Desktop: backdrop near full width, poster left / info right, content overlays
backdrop. Mobile: shorter backdrop, poster above/overlapping content.

GSAP: backdrop opacity+scale, poster fade-up, content fade-up, cast staggered
reveal, similar movies ScrollTrigger reveal.

## 21. Trailer

TMDB videos endpoint → YouTube trailer. Cinematic modal (dark backdrop,
centered video, close button), GSAP open/close animation, keyboard
accessible (Escape closes). Graceful message if no trailer — never break
the page.

## 22–23. Watchlist

`useWatchlist` hook backed by `localStorage` (add/remove/check/read/write),
clean TS interface. Page: "Your Watchlist" / "Movies you want to remember."
grid when populated; "Your watchlist is empty." + "Explore movies" CTA to
home when empty.

## 24–27. API, env vars, TanStack Query, TypeScript

- `src/services/tmdb.ts` centralizes all TMDB calls: `getTrendingMovies`,
  `getPopularMovies`, `getTopRatedMovies`, `searchMovies`, `getMovieDetails`,
  `getMovieCredits`, `getMovieVideos`, `getSimilarMovies`.
- Env var: `VITE_TMDB_API_KEY`, with `.env.example` committed and `.env`
  gitignored. Frontend-only project — this is a build-time public key, not a
  server secret; don't pretend otherwise.
- TanStack Query (`useQuery`) for all data fetching — caching, loading,
  error, refetch handled by the library, not manual state.
- Strict TypeScript, avoid `any`. Types: `Movie`, `MovieDetails`, `Genre`,
  `CastMember`, `Video`, `MovieResponse`, `CreditsResponse`, etc. in
  `src/types/movie.ts`.

## 28–29. Error handling & skeletons

Every API-driven page needs loading/error/empty/success states via reusable
`LoadingState.tsx`, `ErrorState.tsx`, `EmptyState.tsx`. No raw API errors
shown to users. Animated skeleton cards approximating final layout instead of
generic spinners for grids.

## 30–31. GSAP architecture

`src/animations/` (`heroAnimation.ts`, `pageAnimation.ts`, `cardAnimation.ts`).
`useLayoutEffect` + GSAP context + ScrollTrigger, cleaned up on unmount.
Effects: hero entrance, card reveal, navbar scroll behavior, detail page
entrance, trailer modal entrance, subtle poster hover, section heading
reveal. Optional: subtle hero mouse parallax. Animate meaningfully, not
everything.

## 32–33. Performance & accessibility

Lazy loading, React Query caching, optimized image sizes, CSS transitions for
simple hovers, GSAP only where it matters. Semantic HTML, alt text,
accessible buttons, keyboard nav, visible focus states, heading hierarchy,
aria-labels, keyboard-accessible modal with Escape-to-close.

## 34. Footer

ZYVORA + tagline, links (Discover/Trending/Watchlist/GitHub), tech credit
line, honest TMDB attribution (no false affiliation claim).

## 35. Suggested structure

```
src/
  assets/
  components/{layout,movie,ui}/
  hooks/ (useWatchlist.ts, useDebounce.ts)
  pages/ (Home, Search, MovieDetails, Watchlist, NotFound)
  services/tmdb.ts
  types/movie.ts
  animations/ (heroAnimation.ts, cardAnimation.ts, pageAnimation.ts)
  lib/queryClient.ts
  App.tsx, main.tsx, index.css
```

Adjust pragmatically; no unnecessary abstraction.

## 36–37. Routing & Vercel

React Router for all routes incl. 404 catch-all. Vercel deployment is a
later, separate step — for now just ensure `npm run build` succeeds and SPA
routing is deploy-ready (documented, not configured prematurely).

## 38–39. README & repo quality

Professional, honest README (portfolio project, not "enterprise
architecture"): description, features, stack, screenshots section,
install/env/dev/build/deploy instructions, structure, API info, credits, TMDB
attribution, future improvements, repo link. Clean repo: `.gitignore`,
`.env.example`, README, ESLint/Prettier config, no secrets, no unused files,
no leftover `console.log`, no commented-out dead code.

## 40. Comment style

Short, English, above the relevant code, junior-readable. No noise, no
essay-length comments, no obvious comments.

## 41–51. UI & visual rules

Subtle border/blur/gradient/shadow/rounded/hover — not excessive
glassmorphism or neon. Mature, generous spacing, strong hierarchy. Hero is
the strongest section — large imagery, whitespace, typography, layered
gradients, subtle motion. `getImageUrl(path, size)` helper with fallbacks for
missing posters/backdrops — never a broken image icon. Handle every missing
data field gracefully (overview, rating, release date, genres, runtime,
cast, trailer). Debounced search with clear/loading/empty/error states,
Enter-to-search. Subtle micro-interactions only (button hover, card scale,
animated underline links, watchlist button transition). Mobile: no
hover-only critical info, tappable targets, readable text, responsive
trailer modal. Reusable Tailwind patterns via components, not giant
className duplication, but no unnecessary abstraction. No placeholder
content (Lorem ipsum, "Coming soon", TODO, fake data) — and a clear
developer-facing message if the API key is missing, instead of silent
failure. Optional (only after core is stable): genre filtering, URL query
search, watchlist count, recently viewed, page transitions, mouse parallax,
smooth scroll. Must NOT look like a generic Tailwind template.

## 52. Development workflow (phases)

1. Repo inspection (no overwrite of existing work)
2. Project setup (Vite+React+TS, Tailwind, ESLint, Prettier, folders) → commit
3. Design system (global styles, typography, colors, buttons, base UI,
   navbar/footer skeleton) → commit
4. API (env var, types, TMDB service, TanStack Query wiring) → commit
5. Home page (hero, trending, popular, top rated, cards, states) → commit
6. Search (debounce, states) → commit
7. Details (route, credits, similar, trailer, responsive) → commit
8. Watchlist (localStorage, hook, page, interactions) → commit
9. GSAP (hero, ScrollTrigger reveals, detail anims, modal, navbar) → commit
10. Responsive polish (mobile nav/hero/grids, modal, tablet/desktop) → commit
11. Final quality pass (TS, ESLint, a11y, perf, edge cases, `npm run build`) → commit

Continue autonomously through phases, verifying and committing at each
milestone, without asking for confirmation on every small step. Ask only on
real, unresolvable ambiguity.

## 54–56. Final checks

`npm install`/`dev`/`build` all work, no TS errors, no major ESLint errors,
all routes/API/search/watchlist/localStorage/trailer modal work, responsive
with no horizontal overflow, animations respect reduced motion, no hardcoded
API key, no console errors, no broken images, no unnecessary deps, README
complete, `.env` ignored, `.env.example` present, meaningful commit history.
Do NOT deploy to Vercel or configure a Vercel project in this phase — only
confirm the production build works. `git status` clean before wrapping up,
no secrets, no accidental files.

## 57. Most important requirement

Simple architecture + excellent UI + real API + good TypeScript + smooth
GSAP + responsive design + professional code + professional git history.
Goal: a recruiter opens it and thinks "this developer understands modern
frontend development." Prioritize visual quality, UX, clean React
architecture, readability, and a professional workflow over complexity.
