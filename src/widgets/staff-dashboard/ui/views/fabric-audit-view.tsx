'use client'

import * as React from 'react'
import { FabricAuditCenter } from '@/features/fabric-audit'

/**
 * Hosts the Audit Center inside the admin/staff shell. The Suspense boundary is required because the
 * center keeps its tab and filters in the URL (`useSearchParams`).
 */
export function FabricAuditView(): React.ReactElement {
  return (
    <React.Suspense
      fallback={
        <div
          role="status"
          aria-label="Đang tải Fabric Audit Center"
          className="h-40 animate-pulse rounded-xl bg-surface-muted"
        />
      }
    >
      <FabricAuditCenter />
    </React.Suspense>
  )
}
