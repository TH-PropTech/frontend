import Link from 'next/link'

export default function NotFound(): React.ReactElement {
  return (
    <main className="grid min-h-screen place-items-center px-6">
      <section className="max-w-md text-center">
        <h1 className="text-2xl font-semibold">Page not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The route you requested does not exist.
        </p>
        <Link
          className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          href="/"
        >
          Go home
        </Link>
      </section>
    </main>
  )
}
