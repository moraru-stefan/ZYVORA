import { gsap, prefersReducedMotion, ScrollTrigger } from './gsapConfig'

// Reveal a container's direct children (movie cards, cast cards) as they
// scroll into view, staggered instead of all at once.
export function revealCards(container: HTMLElement) {
  return gsap.context(() => {
    if (prefersReducedMotion()) return

    const cards = gsap.utils.toArray<HTMLElement>(container.children)
    if (cards.length === 0) return

    gsap.set(cards, { opacity: 0, y: 40 })
    ScrollTrigger.batch(cards, {
      start: 'top 92%',
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.08,
        }),
    })
  }, container)
}

// Fade a single element (a section heading) upward as it scrolls into view.
export function revealElement(element: HTMLElement) {
  return gsap.context(() => {
    if (prefersReducedMotion()) return

    gsap.fromTo(
      element,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: element, start: 'top 90%', once: true },
      },
    )
  }, element)
}
