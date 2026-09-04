import { getImageUrl } from '../../services/tmdb'
import type { CastMember } from '../../types/movie'

interface CastCardProps {
  member: CastMember
}

export default function CastCard({ member }: CastCardProps) {
  const photo = getImageUrl(member.profile_path, 'w185')

  return (
    <div className="w-24 shrink-0 sm:w-28">
      <div className="aspect-square overflow-hidden rounded-full border border-white/5 bg-brand-surface">
        {photo ? (
          <img
            src={photo}
            alt={member.name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-brand-muted">
            {member.name.charAt(0)}
          </div>
        )}
      </div>
      <p className="mt-2 truncate text-center text-sm font-medium text-brand-text">
        {member.name}
      </p>
      <p className="truncate text-center text-xs text-brand-muted">
        {member.character}
      </p>
    </div>
  )
}
