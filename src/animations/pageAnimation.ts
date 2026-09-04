import { gsap, prefersReducedMotion } from './gsapConfig'

// Entrance for the movie details page: backdrop scales down while the
// poster and info column fade upward shortly after.
export function animateDetailsEntrance(scope: HTMLElement) {
  return gsap.context(() => {
    if (prefersReducedMotion()) return

    gsap
      .timeline({ defaults: { ease: 'power3.out', duration: 0.9 } })
      .fromTo(
        '[data-detail="backdrop"]',
        { opacity: 0, scale: 1.08 },
        { opacity: 1, scale: 1, duration: 1.2 },
        0,
      )
      .from('[data-detail="poster"]', { opacity: 0, y: 40 }, 0.25)
      .from('[data-detail="content"]', { opacity: 0, y: 30 }, 0.35)
  }, scope)
}
