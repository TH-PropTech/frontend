import * as React from 'react'

export default function ContractPageLoading(): React.ReactElement {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="space-y-4">
        <div className="h-6 w-1/4 animate-pulse rounded bg-surface-muted" />
        <div className="h-10 w-1/2 animate-pulse rounded-2xl bg-surface-muted" />
        <div className="h-64 animate-pulse rounded-3xl bg-surface-muted" />
      </div>
    </main>
  )
}
