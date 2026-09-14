export default function TermsLoading(): React.ReactElement {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:py-12 animate-pulse">
      {/* Header Skeleton */}
      <div className="mb-10 rounded-2xl border border-border bg-surface p-6 md:p-8">
        <div className="h-4 w-32 rounded bg-surface-muted" />
        <div className="mt-3 h-8 w-3/4 rounded bg-surface-muted" />
        <div className="mt-4 h-16 w-full rounded bg-surface-muted" />
        <div className="mt-6 h-10 w-full rounded-xl bg-surface-muted" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="h-64 rounded-2xl border border-border bg-surface p-5" />
        </div>
        <div className="space-y-8 lg:col-span-8">
          <div className="h-48 rounded-2xl border border-border bg-surface p-6" />
          <div className="h-48 rounded-2xl border border-border bg-surface p-6" />
        </div>
      </div>
    </div>
  )
}
