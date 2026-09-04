import type { ReactNode } from 'react'

interface EmptyStateProps {
  title: string
  description?: string
  action?: ReactNode
}

export default function EmptyState({
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 px-6 text-center">
      <p className="text-lg font-medium text-brand-text">{title}</p>
      {description && (
        <p className="max-w-sm text-sm text-brand-muted">{description}</p>
      )}
      {action}
    </div>
  )
}
