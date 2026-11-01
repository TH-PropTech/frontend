import * as React from 'react'

export function ProfileSkeleton(): React.ReactElement {
  return (
    <div className="space-y-6 animate-pulse text-left">
      {/* Top Bar: Title & role switcher skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div className="h-7 w-48 rounded-lg bg-surface-muted" />
        <div className="h-10 w-52 rounded-full bg-surface-muted" />
      </div>

      {/* Profile Header Card Skeleton */}
      <div className="bg-white border border-border rounded-3xl p-5 md:p-6 mb-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="h-16 w-16 rounded-full bg-surface-muted shrink-0" />
          <div className="space-y-2">
            <div className="h-6 w-40 rounded bg-surface-muted" />
            <div className="h-4 w-56 rounded bg-surface-muted" />
          </div>
        </div>
        <div className="h-10 w-40 rounded-full bg-surface-muted" />
      </div>

      {/* 2-Column Layout Skeleton: Sidebar + Content */}
      <div className="flex flex-col lg:flex-row gap-5 items-start w-full">
        {/* Left Sidebar Nav Skeleton */}
        <div className="w-full lg:w-64 space-y-2 shrink-0">
          <div className="h-11 rounded-2xl bg-surface-muted" />
          <div className="h-11 rounded-2xl bg-surface-muted" />
          <div className="h-11 rounded-2xl bg-surface-muted" />
          <div className="h-11 rounded-2xl bg-surface-muted" />
          <div className="h-11 rounded-2xl bg-surface-muted" />
        </div>

        {/* Right Main Content Skeleton */}
        <div className="flex-1 min-w-0 w-full space-y-5">
          <div className="bg-white border border-border rounded-3xl p-6 shadow-sm space-y-4">
            <div className="h-5 w-48 rounded bg-surface-muted" />
            <div className="h-24 rounded-2xl bg-surface-muted/60" />
            <div className="h-32 rounded-2xl bg-surface-muted/40" />
          </div>
        </div>
      </div>
    </div>
  )
}
