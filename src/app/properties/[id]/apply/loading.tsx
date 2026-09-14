import * as React from 'react'

export default function ApplyPageLoading(): React.ReactElement {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="space-y-6">
        <div className="h-6 w-1/4 animate-pulse rounded bg-surface-muted" />
        <div className="h-10 w-2/3 animate-pulse rounded-2xl bg-surface-muted" />
        <div className="h-16 animate-pulse rounded-2xl bg-surface-muted" />
        <div className="h-72 animate-pulse rounded-3xl bg-surface-muted" />
      </div>
    </main>
  )
}
