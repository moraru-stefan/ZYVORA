import { gsap, prefersReducedMotion } from './gsapConfig'

// Staggered entrance for the hero: image scale-down, then label, title,
// metadata, description and actions each fade upward in sequence.
export function animateHero(scope: HTMLElement) {
  return gsap.context(() => {
    if (prefersReducedMotion()) return

    gsap
      .timeline({ defaults: { ease: 'power3.out', duration: 0.9 } })
      .fromTo(
        '[data-hero="image"]',
        { scale: 1.08 },
        { scale: 1, duration: 1.6, ease: 'power4.out' },
        0,
      )
      .from('[data-hero="label"]', { opacity: 0, y: 16 }, 0.15)
      .from('[data-hero="title"]', { opacity: 0, y: 36 }, 0.28)
      .from('[data-hero="meta"]', { opacity: 0, y: 18 }, 0.42)
      .from('[data-hero="description"]', { opacity: 0, y: 18 }, 0.5)
      .from('[data-hero="actions"]', { opacity: 0, y: 18 }, 0.58)
  }, scope)
}
