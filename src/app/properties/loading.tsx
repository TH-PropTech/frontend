import * as React from 'react'

export default function PropertiesLoading(): React.ReactElement {
  return (
    <main className="min-h-screen bg-bg text-fg pb-20">
      {/* Hero Skeleton */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-surface to-bg pt-20 pb-16 px-6 text-center">
        <div className="mx-auto max-w-2xl space-y-4 flex flex-col items-center">
          <div className="h-4 w-36 rounded-full bg-surface-muted animate-pulse" />
          <div className="h-10 w-72 sm:w-96 rounded-2xl bg-surface-muted animate-pulse" />
          <div className="h-4 w-64 sm:w-80 rounded-xl bg-surface-muted animate-pulse" />
        </div>
      </section>

      {/* Search Console Skeleton */}
      <section className="mx-auto -mt-10 max-w-5xl px-4 sm:px-6 relative z-30">
        <div className="rounded-[24px] lg:rounded-full bg-white border border-border p-3 shadow-lg flex items-center justify-between gap-4 h-16 animate-pulse">
          <div className="flex-1 h-8 rounded-full bg-surface-muted" />
          <div className="hidden lg:block w-32 h-8 rounded-full bg-surface-muted" />
          <div className="hidden lg:block w-32 h-8 rounded-full bg-surface-muted" />
          <div className="hidden lg:block w-32 h-8 rounded-full bg-surface-muted" />
          <div className="w-11 h-11 rounded-full bg-primary/20 shrink-0" />
        </div>
      </section>

      {/* Tab Switcher Skeleton */}
      <section className="mx-auto max-w-lg mt-12 px-6">
        <div className="h-11 rounded-full bg-surface-muted animate-pulse" />
      </section>

      {/* Results Header Skeleton */}
      <section className="mx-auto max-w-6xl px-6 py-12 md:px-10">
        <div className="mb-10 flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-3 w-28 rounded bg-surface-muted animate-pulse" />
            <div className="h-8 w-48 rounded-xl bg-surface-muted animate-pulse" />
          </div>
          <div className="h-8 w-36 rounded-xl bg-surface-muted animate-pulse" />
        </div>

        {/* 6 Cards Skeleton Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-border bg-white p-4 shadow-sm space-y-3 animate-pulse"
            >
              <div className="h-32 w-full rounded-lg bg-surface-muted" />
              <div className="h-5 w-3/4 rounded bg-surface-muted" />
              <div className="h-4 w-1/3 rounded bg-primary/20" />
              <div className="h-3 w-1/2 rounded bg-surface-muted" />
              <div className="flex items-center gap-3 pt-2 border-t border-border/50">
                <div className="h-3 w-16 rounded bg-surface-muted" />
                <div className="h-3 w-20 rounded bg-surface-muted" />
              </div>
              <div className="h-9 w-full rounded-xl bg-surface-muted mt-2" />
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
