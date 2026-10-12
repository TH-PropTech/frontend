'use client'

import * as React from 'react'
import { FileText, FileX2, RefreshCw } from 'lucide-react'
import { ApiClientError } from '@/shared/api/api-client'
import {
  downloadContractArtifact,
  downloadSignedContractArtifact,
} from '../api/contracts-api'

export interface ContractPdfPreviewProps {
  contractId: string
  contractCode: string
  /** `signed`: bản PDF đã ký PAdES (artifact riêng); mặc định bản canonical. */
  variant?: 'canonical' | 'signed'
}

/** Xem bản PDF chuẩn ngay trên trang (không phải tải về); chỉ dùng khi PDF đã được khóa. */
export function ContractPdfPreview({
  contractId,
  contractCode,
  variant = 'canonical',
}: ContractPdfPreviewProps): React.ReactElement {
  const [url, setUrl] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [missing, setMissing] = React.useState(false)
  const [attempt, setAttempt] = React.useState(0)

  React.useEffect(() => {
    let cancelled = false
    let objectUrl: string | null = null
    // Đổi tab/phiên bản: bỏ trạng thái của lần tải trước để không hiện lỗi cũ trên bản mới.
    /* eslint-disable react-hooks/set-state-in-effect */
    setUrl(null)
    setError(null)
    setMissing(false)
    setLoading(true)
    /* eslint-enable react-hooks/set-state-in-effect */
    const request =
      variant === 'signed'
        ? downloadSignedContractArtifact(contractId)
        : downloadContractArtifact(contractId, 'pdf')
    request
      .then(blob => {
        if (cancelled) return
        objectUrl = URL.createObjectURL(
          new Blob([blob], { type: 'application/pdf' })
        )
        setUrl(objectUrl)
      })
      .catch((cause: unknown) => {
        if (cancelled) return
        if (
          variant === 'signed' &&
          cause instanceof ApiClientError &&
          cause.status === 404
        ) {
          setMissing(true)
          return
        }
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
  }, [contractId, variant, attempt])

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
        <h2 className="text-sm font-bold">
          {variant === 'signed' ? 'Xem bản PDF đã ký' : 'Xem bản PDF hợp đồng'}
        </h2>
      </div>
      {loading ? (
        <p className="text-xs text-[var(--muted)]" role="status">
          Đang tải bản PDF...
        </p>
      ) : null}
      {missing ? (
        <div
          role="status"
          data-testid="signed-pdf-missing"
          className="flex items-start gap-3 rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface-muted)] p-4 text-xs text-[var(--muted)]"
        >
          <FileX2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <div className="space-y-1">
            <p className="font-semibold text-[var(--fg)]">
              Chưa có bản PDF đã ký
            </p>
            <p>
              Bản này chỉ được tạo khi hợp đồng được ký bằng chứng thư số VNPT
              SmartCA có bật chế độ PAdES. Ký thử nghiệm hoặc ký xác nhận trên
              nền tảng không tạo bản đã ký; bạn vẫn xem được bản gốc ở tab bên
              cạnh.
            </p>
          </div>
        </div>
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
          title={
            variant === 'signed'
              ? `Bản PDF đã ký ${contractCode}`
              : `Bản PDF hợp đồng ${contractCode}`
          }
          src={`${url}#view=FitH`}
          className="h-[80vh] w-full rounded-lg border border-[var(--border)] bg-white"
        />
      ) : null}
    </section>
  )
}
