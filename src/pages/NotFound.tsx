import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="text-sm font-semibold tracking-[0.3em] text-brand-accent-2">
        404
      </p>
      <h1 className="text-4xl font-extrabold tracking-tight text-brand-text">
        This story doesn&apos;t exist.
      </h1>
      <p className="max-w-md text-brand-muted">
        The page you&apos;re looking for isn&apos;t part of the ZYVORA catalog.
      </p>
      <Link to="/">
        <Button>Back to Discover</Button>
      </Link>
    </section>
  )
}
