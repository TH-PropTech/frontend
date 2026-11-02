'use client'

import * as React from 'react'
import { Download, Loader2 } from 'lucide-react'
import { downloadContractEvidencePackage } from '../api/contracts-api'
import {
  describeEvidencePackageError,
  resolveEvidencePackageFilename,
  saveBlobAsFile,
} from '../lib/evidence-package'

interface EvidencePackageDownloadProps {
  contractId: string
  disabled?: boolean
  /** Nút gọn, không kéo giãn, dùng trong dòng bảng. */
  compact?: boolean
}

export function EvidencePackageDownload({
  contractId,
  disabled = false,
  compact = false,
}: EvidencePackageDownloadProps): React.ReactElement {
  const [isDownloading, setIsDownloading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState<string | null>(null)

  const handleDownload = async (): Promise<void> => {
    if (disabled || isDownloading) return

    setIsDownloading(true)
    setError(null)
    setSuccess(null)
    try {
      const file = await downloadContractEvidencePackage(contractId)
      const filename = resolveEvidencePackageFilename(file.filename, contractId)
      saveBlobAsFile(file.blob, filename)
      setSuccess(`Đã tải ${filename}`)
    } catch (downloadError: unknown) {
      setError(describeEvidencePackageError(downloadError))
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => void handleDownload()}
        disabled={disabled || isDownloading}
        aria-busy={isDownloading}
        className={`${compact ? 'inline-flex whitespace-nowrap px-3 py-1.5' : 'w-full inline-flex px-4 py-2'} items-center justify-center gap-2 text-xs font-semibold rounded-lg bg-[var(--surface-muted)] border border-[var(--border)] text-[var(--fg)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors disabled:opacity-50`}
      >
        {isDownloading ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <Download className="h-3.5 w-3.5" />
        )}
        {isDownloading ? 'Đang tạo gói bằng chứng...' : 'Tải gói bằng chứng'}
      </button>
      {error ? (
        <p role="alert" className="text-xs text-[var(--danger)]">
          {error}
        </p>
      ) : null}
      {success ? (
        <p role="status" className="text-xs text-[var(--success)]">
          {success}
        </p>
      ) : null}
    </div>
  )
}
