interface LoadingStateProps {
  label?: string
}

// Full-section loading indicator for non-grid content (details, hero).
export default function LoadingState({
  label = 'Loading...',
}: LoadingStateProps) {
  return (
    <div
      role="status"
      className="flex min-h-[40vh] flex-col items-center justify-center gap-3 text-brand-muted"
    >
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-brand-accent-2" />
      <span className="text-sm">{label}</span>
    </div>
  )
}
