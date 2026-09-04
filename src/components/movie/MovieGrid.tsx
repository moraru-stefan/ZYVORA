import { useLayoutEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { revealCards } from '../../animations/cardAnimation'

interface MovieGridProps {
  children: ReactNode
}

// Responsive grid shared by movie cards and their loading skeletons.
export default function MovieGrid({ children }: MovieGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!gridRef.current) return
    const ctx = revealCards(gridRef.current)
    return () => ctx.revert()
  }, [children])

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
    >
      {children}
    </div>
  )
}
