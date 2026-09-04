import type { ReactNode } from 'react'

interface MovieRowProps {
  children: ReactNode
}

// Horizontally scrollable shelf used for the trending section.
export default function MovieRow({ children }: MovieRowProps) {
  return (
    <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [&>*]:w-[45vw] [&>*]:shrink-0 [&>*]:snap-start sm:[&>*]:w-52 md:[&>*]:w-56 lg:[&>*]:w-60">
      {children}
    </div>
  )
}
