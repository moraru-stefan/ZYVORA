import { useLayoutEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { revealCards } from '../../animations/cardAnimation'

interface MovieRowProps {
  children: ReactNode
}

// Horizontally scrollable shelf used for the trending section.
export default function MovieRow({ children }: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!rowRef.current) return
    const ctx = revealCards(rowRef.current)
    return () => ctx.revert()
  }, [children])

  return (
    <div
      ref={rowRef}
      className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [&>*]:w-[45vw] [&>*]:shrink-0 [&>*]:snap-start sm:[&>*]:w-52 md:[&>*]:w-56 lg:[&>*]:w-60"
    >
      {children}
    </div>
  )
}
