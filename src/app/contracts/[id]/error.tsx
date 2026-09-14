'use client'

import * as React from 'react'
import { AlertCircle, RotateCcw } from 'lucide-react'
import { Button } from '@/shared/ui/button'

export default function ContractPageError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}): React.ReactElement {
  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.error('ContractPage Error:', error)
    }
  }, [error])

  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <div className="rounded-3xl border border-danger/30 bg-danger-soft p-8 text-center shadow-sm">
        <AlertCircle
          aria-hidden="true"
          className="mx-auto h-10 w-10 text-danger"
        />
        <h1 className="mt-4 font-display text-xl font-bold text-fg">
          Không thể hiển thị hợp đồng số
        </h1>
        <p className="mt-2 text-sm text-muted">
          {error.message || 'Đã xảy ra sự cố khi tải chi tiết hợp đồng.'}
        </p>
        <div className="mt-6 flex justify-center">
          <Button
            type="button"
            onClick={reset}
            className="flex items-center gap-2 bg-control text-on-control shadow-sm"
          >
            <RotateCcw aria-hidden="true" className="h-4 w-4" />
            <span>Thử lại</span>
          </Button>
        </div>
      </div>
    </main>
  )
}
