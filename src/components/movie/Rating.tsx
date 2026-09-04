interface RatingProps {
  value: number
  className?: string
}

// Compact star rating badge. TMDB scores are out of 10.
export default function Rating({ value, className = '' }: RatingProps) {
  if (!value) return null

  return (
    <span
      className={`inline-flex items-center gap-1 text-sm font-medium text-brand-text ${className}`}
    >
      <svg
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-3.5 w-3.5 text-brand-accent-2"
        aria-hidden="true"
      >
        <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3-5.4 3 1.3-6L1.3 7.7l6.1-.6L10 1.5z" />
      </svg>
      {value.toFixed(1)}
    </span>
  )
}
