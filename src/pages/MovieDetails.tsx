import { useParams } from 'react-router-dom'

export default function MovieDetails() {
  const { id } = useParams()

  return (
    <section className="min-h-screen px-6 pt-32 lg:px-12">
      <h1 className="text-4xl font-extrabold tracking-tight text-brand-text">
        Movie #{id}
      </h1>
    </section>
  )
}
