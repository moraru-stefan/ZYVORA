interface SectionHeaderProps {
  title: string
  subtitle?: string
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold tracking-tight text-brand-text sm:text-3xl">
        {title}
      </h2>
      {subtitle && <p className="mt-1 text-sm text-brand-muted">{subtitle}</p>}
    </div>
  )
}
