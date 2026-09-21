'use client'

import * as React from 'react'
import { AlertCircle, RotateCcw } from 'lucide-react'

export default function ContractStepError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}): React.ReactElement {
  React.useEffect(() => {
    console.error('Contract step page error:', error)
  }, [error])

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-4 py-16 sm:px-6">
      <section className="w-full max-w-md rounded-xl border border-[var(--danger)] bg-[var(--surface)] p-8 text-center shadow-sm">
        <AlertCircle
          aria-hidden="true"
          className="mx-auto h-10 w-10 text-[var(--danger)]"
        />
        <h1 className="mt-4 text-lg font-bold text-[var(--fg)]">
          Không thể hiển thị bước hợp đồng
        </h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          {error.message || 'Đã xảy ra sự cố khi tải bước hợp đồng.'}
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 inline-flex min-h-10 items-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-xs font-bold text-white hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
        >
          <RotateCcw aria-hidden="true" className="h-4 w-4" />
          Thử lại
        </button>
      </section>
    </main>
  )
}
