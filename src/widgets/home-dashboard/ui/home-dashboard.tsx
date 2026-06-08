import { env } from '@/shared/config/env'

const platformSignals = [
  'Feature slices ready for product teams',
  'Typed API boundary configured',
  'CI gates aligned with team workflow',
] as const

export function HomeDashboard(): React.ReactElement {
  return (
    <main className="min-h-screen px-6 py-10 md:px-10">
      <section className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            TH PropTech
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight md:text-5xl">
            Frontend foundation for scalable property workflows
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
            Next.js App Router, Feature-Sliced Design, strict TypeScript, and a
            typed API client are ready for large-team delivery.
          </p>
        </div>

        <aside className="rounded-lg border border-border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Runtime config</h2>
          <dl className="mt-5 space-y-4 text-sm">
            <div>
              <dt className="font-medium text-muted-foreground">API URL</dt>
              <dd className="mt-1 break-all font-mono">{env.apiUrl}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">Environment</dt>
              <dd className="mt-1 font-mono">{env.appEnv}</dd>
            </div>
          </dl>
        </aside>
      </section>

      <section className="mx-auto mt-12 grid max-w-6xl gap-4 md:grid-cols-3">
        {platformSignals.map(signal => (
          <article
            className="rounded-lg border border-border bg-white p-5 shadow-sm"
            key={signal}
          >
            <p className="text-sm font-medium">{signal}</p>
          </article>
        ))}
      </section>
    </main>
  )
}
