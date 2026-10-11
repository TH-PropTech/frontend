'use client'

import * as React from 'react'
import { FileText, RefreshCw } from 'lucide-react'
import { downloadContractArtifact } from '../api/contracts-api'

export interface ContractPdfPreviewProps {
  contractId: string
  contractCode: string
}

/** Xem bản PDF chuẩn ngay trên trang (không phải tải về); chỉ dùng khi PDF đã được khóa. */
export function ContractPdfPreview({
  contractId,
  contractCode,
}: ContractPdfPreviewProps): React.ReactElement {
  const [url, setUrl] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [attempt, setAttempt] = React.useState(0)

  React.useEffect(() => {
    let cancelled = false
    let objectUrl: string | null = null
    downloadContractArtifact(contractId, 'pdf')
      .then(blob => {
        if (cancelled) return
        objectUrl = URL.createObjectURL(
          new Blob([blob], { type: 'application/pdf' })
        )
        setUrl(objectUrl)
      })
      .catch((cause: unknown) => {
        if (cancelled) return
        setError(
          cause instanceof Error
            ? cause.message
            : 'Không thể tải bản PDF hợp đồng.'
        )
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [contractId, attempt])

  return (
    <section
      data-testid="contract-pdf-preview"
      className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm"
    >
      <div className="mb-3 flex items-center gap-2">
        <FileText
          className="h-5 w-5 text-[var(--primary)]"
          aria-hidden="true"
        />
        <h2 className="text-sm font-bold">Xem bản PDF hợp đồng</h2>
      </div>
      {loading ? (
        <p className="text-xs text-[var(--muted)]" role="status">
          Đang tải bản PDF...
        </p>
      ) : null}
      {error ? (
        <div
          role="alert"
          className="flex items-center gap-3 text-xs text-[var(--danger)]"
        >
          <span>{error}</span>
          <button
            type="button"
            onClick={() => {
              setLoading(true)
              setError(null)
              setAttempt(value => value + 1)
            }}
            className="inline-flex items-center gap-1 rounded-md border border-[var(--border)] px-2 py-1 text-[var(--fg)]"
          >
            <RefreshCw className="h-3 w-3" aria-hidden="true" /> Thử lại
          </button>
        </div>
      ) : null}
      {url ? (
        <iframe
          title={`Bản PDF hợp đồng ${contractCode}`}
          src={`${url}#view=FitH`}
          className="h-[80vh] w-full rounded-lg border border-[var(--border)] bg-white"
        />
      ) : null}
    </section>
  )
}
