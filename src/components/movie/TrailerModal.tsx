import { useEffect } from 'react'
import type { Video } from '../../types/movie'

interface TrailerModalProps {
  trailer: Video | undefined
  isOpen: boolean
  onClose: () => void
}

// Cinematic modal for playing a movie's YouTube trailer.
export default function TrailerModal({
  trailer,
  isOpen,
  onClose,
}: TrailerModalProps) {
  // Close on Escape and lock page scroll while the modal is open.
  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Movie trailer"
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close trailer"
          className="absolute -top-10 right-0 rounded-full p-1 text-brand-muted transition-colors hover:text-brand-text"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            className="h-6 w-6"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
          </svg>
        </button>

        {trailer ? (
          <div className="aspect-video overflow-hidden rounded-xl bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              title={trailer.name}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        ) : (
          <div className="flex aspect-video items-center justify-center rounded-xl bg-brand-surface p-6 text-center text-brand-muted">
            No trailer is available for this movie yet.
          </div>
        )}
      </div>
    </div>
  )
}
