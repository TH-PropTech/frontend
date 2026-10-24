'use client'

import * as React from 'react'
import { ProcessTimeline } from '@/widgets/process-timeline'

export default function ProcessPage(): React.ReactElement {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen w-full bg-bg flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      }
    >
      <ProcessTimeline />
    </React.Suspense>
  )
}
