import type { ReactNode } from 'react'

interface MovieGridProps {
  children: ReactNode
}

// Responsive grid shared by movie cards and their loading skeletons.
export default function MovieGrid({ children }: MovieGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {children}
    </div>
  )
}
