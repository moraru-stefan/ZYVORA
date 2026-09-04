// Skeleton placeholder matching MovieCard's layout while data loads.
export default function MovieCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-white/5 bg-brand-surface">
      <div className="aspect-[2/3] bg-white/5" />
      <div className="space-y-2 p-3">
        <div className="h-3.5 w-3/4 rounded bg-white/5" />
        <div className="h-3 w-1/2 rounded bg-white/5" />
      </div>
    </div>
  )
}
