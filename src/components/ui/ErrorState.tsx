interface ErrorStateProps {
  message?: string
  onRetry?: () => void
}

// Friendly error message shown instead of raw API errors.
export default function ErrorState({
  message = 'Something went wrong while loading this content.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="flex min-h-[40vh] flex-col items-center justify-center gap-4 px-6 text-center"
    >
      <p className="text-brand-muted">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-full border border-white/15 px-5 py-2 text-sm text-brand-text transition-colors hover:bg-white/5"
        >
          Try again
        </button>
      )}
    </div>
  )
}
