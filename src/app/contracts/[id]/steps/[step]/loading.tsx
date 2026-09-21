import * as React from 'react'

export default function ContractStepLoading(): React.ReactElement {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <div className="h-20 animate-pulse rounded-xl bg-[var(--surface-muted)]" />
      <div className="h-14 animate-pulse rounded-xl bg-[var(--surface-muted)]" />
      <div className="h-96 animate-pulse rounded-xl bg-[var(--surface-muted)]" />
    </main>
  )
}
