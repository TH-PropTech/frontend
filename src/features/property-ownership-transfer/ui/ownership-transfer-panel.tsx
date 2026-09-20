'use client'

import * as React from 'react'
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardCheck,
  LockKeyhole,
  SearchCheck,
  ShieldCheck,
} from 'lucide-react'
import { Button } from '@/shared/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/ui/alert-dialog'
import { Input } from '@/shared/ui/input'
import {
  applyOwnershipTransfer,
  mapOwnershipTransferError,
  previewOwnershipTransfer,
  type OwnershipTransferCounts,
  type OwnershipTransferPreview,
  type OwnershipTransferResult,
} from '../api/ownership-transfer-api'

const COUNT_LABELS: ReadonlyArray<{
  key: keyof OwnershipTransferCounts
  label: string
}> = [
  { key: 'apartments', label: 'Căn hộ hiện tại' },
  { key: 'openBookings', label: 'Booking đang mở' },
  { key: 'openApplications', label: 'Hồ sơ đang mở' },
  { key: 'contracts', label: 'Contract liên quan' },
  { key: 'depositAgreements', label: 'Thỏa thuận cọc' },
  { key: 'payments', label: 'Thanh toán' },
  { key: 'disputes', label: 'Tranh chấp' },
]

function hasPreviewScope(preview: OwnershipTransferPreview): boolean {
  return preview.affectedCounts.apartments > 0
}

function createIdempotencyKey(transferId: string): string {
  return `admin-transfer-${transferId}`
}

function TransferCounts({
  counts,
}: {
  counts: OwnershipTransferCounts
}): React.ReactElement {
  return (
    <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {COUNT_LABELS.map(item => (
        <div
          key={item.key}
          className="rounded-lg border border-border bg-surface-muted p-3"
        >
          <dt className="text-[11px] text-muted">{item.label}</dt>
          <dd className="mt-1 text-lg font-bold text-fg">{counts[item.key]}</dd>
        </div>
      ))}
    </dl>
  )
}

function PreviewSummary({
  preview,
}: {
  preview: OwnershipTransferPreview
}): React.ReactElement {
  return (
    <section
      aria-labelledby="ownership-transfer-preview-title"
      className="space-y-4 rounded-xl border border-border bg-surface p-5"
      data-testid="ownership-transfer-preview"
    >
      <div className="flex items-start gap-3">
        <SearchCheck
          className="mt-0.5 h-5 w-5 shrink-0 text-primary"
          aria-hidden="true"
        />
        <div>
          <h2
            id="ownership-transfer-preview-title"
            className="text-sm font-bold text-fg"
          >
            Preview phạm vi chuyển quyền
          </h2>
          <p className="mt-1 text-xs text-muted">
            Mục tiêu:{' '}
            <span className="font-semibold text-fg">
              {preview.targetUser.email}
            </span>
          </p>
        </div>
      </div>

      <TransferCounts counts={preview.affectedCounts} />

      {hasPreviewScope(preview) ? (
        <div className="rounded-lg border border-warning/30 bg-warning/10 p-3 text-xs text-fg">
          <div className="flex items-start gap-2">
            <LockKeyhole
              className="mt-0.5 h-4 w-4 shrink-0 text-warning"
              aria-hidden="true"
            />
            <p>
              Contract, chữ ký, thanh toán và bằng chứng blockchain chỉ được
              liên kết audit; không bị ghi đè trong transfer này.
            </p>
          </div>
        </div>
      ) : (
        <p className="rounded-lg border border-border bg-surface-muted p-3 text-xs text-muted">
          Không có căn hộ cần chuyển trong preview này.
        </p>
      )}

      {preview.conflicts.length > 0 ? (
        <div
          className="rounded-lg border border-danger/30 bg-danger/10 p-3"
          role="alert"
        >
          <div className="flex items-start gap-2">
            <AlertTriangle
              className="mt-0.5 h-4 w-4 shrink-0 text-danger"
              aria-hidden="true"
            />
            <div>
              <p className="text-xs font-semibold text-danger">
                Preview có {preview.conflicts.length} xung đột, chưa thể apply.
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-muted">
                {preview.conflicts.map(conflict => (
                  <li key={`${conflict.entityType}-${conflict.entityId}`}>
                    {conflict.message}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : null}

      <p className="break-all text-[11px] text-subtle">
        Preview hash: <code>{preview.previewHash}</code>
      </p>
    </section>
  )
}

function ResultSummary({
  result,
}: {
  result: OwnershipTransferResult
}): React.ReactElement {
  return (
    <section
      className="rounded-xl border border-success/30 bg-success/10 p-5"
      role="status"
    >
      <div className="flex items-start gap-3">
        <CheckCircle2
          className="mt-0.5 h-5 w-5 shrink-0 text-success"
          aria-hidden="true"
        />
        <div className="min-w-0">
          <h2 className="text-sm font-bold text-fg">Transfer đã hoàn tất</h2>
          <p className="mt-1 text-xs text-muted">
            Audit reference:{' '}
            <code className="break-all">{result.transferId}</code>
          </p>
          <p className="mt-1 text-xs text-muted">
            Đã cập nhật {result.affectedCounts.apartments} căn hộ,{' '}
            {result.auditRecordCount} record audit.
          </p>
        </div>
      </div>
    </section>
  )
}

export function OwnershipTransferPanel(): React.ReactElement {
  const [targetEmail, setTargetEmail] = React.useState('')
  const [preview, setPreview] = React.useState<OwnershipTransferPreview | null>(
    null
  )
  const [result, setResult] = React.useState<OwnershipTransferResult | null>(
    null
  )
  const [error, setError] = React.useState<string | null>(null)
  const [validationError, setValidationError] = React.useState<
    string | undefined
  >()
  const [isPreviewLoading, setIsPreviewLoading] = React.useState(false)
  const [isApplyLoading, setIsApplyLoading] = React.useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false)
  const [idempotencyKey, setIdempotencyKey] = React.useState<string | null>(
    null
  )

  const handlePreview = async (): Promise<void> => {
    const normalizedEmail = targetEmail.trim().toLowerCase()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setValidationError('Nhập một email chủ nhà hợp lệ.')
      return
    }

    setValidationError(undefined)
    setError(null)
    setResult(null)
    setPreview(null)
    setIsPreviewLoading(true)
    try {
      setPreview(await previewOwnershipTransfer(normalizedEmail))
    } catch (requestError) {
      setError(mapOwnershipTransferError(requestError).message)
    } finally {
      setIsPreviewLoading(false)
    }
  }

  const handleApply = async (): Promise<void> => {
    if (!preview) return
    const key = idempotencyKey ?? createIdempotencyKey(preview.transferId)
    setIdempotencyKey(key)
    setIsConfirmOpen(false)
    setError(null)
    setIsApplyLoading(true)
    try {
      setResult(
        await applyOwnershipTransfer(
          preview.transferId,
          preview.previewHash,
          key
        )
      )
    } catch (requestError) {
      setError(mapOwnershipTransferError(requestError).message)
    } finally {
      setIsApplyLoading(false)
    }
  }

  const canApply = Boolean(
    preview && hasPreviewScope(preview) && preview.conflicts.length === 0
  )

  return (
    <div className="space-y-6" data-testid="ownership-transfer-panel">
      <header>
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" />
          <h1 className="text-xl font-bold text-fg">
            Chuyển chủ nhà toàn hệ thống
          </h1>
        </div>
        <p className="mt-2 max-w-3xl text-sm text-muted">
          Tạo preview trước, kiểm tra phạm vi và chỉ apply khi audit/legal
          history đã được xác nhận. Luồng này chỉ nhận email tài khoản đích,
          không có ô nhập mật khẩu.
        </p>
      </header>

      <section className="rounded-xl border border-border bg-surface p-5">
        <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
          <Input
            id="ownership-transfer-target-email"
            label="Email chủ nhà kế nhiệm"
            type="email"
            value={targetEmail}
            onChange={event => setTargetEmail(event.target.value)}
            placeholder="owner@example.com"
            autoComplete="email"
            {...(validationError ? { error: validationError } : {})}
            disabled={isPreviewLoading || isApplyLoading}
          />
          <Button
            type="button"
            onClick={() => void handlePreview()}
            loading={isPreviewLoading}
            disabled={isApplyLoading}
            data-testid="ownership-transfer-preview-button"
          >
            <SearchCheck className="h-4 w-4" aria-hidden="true" />
            Tạo preview
          </Button>
        </div>
        <p className="mt-3 text-xs text-subtle">
          Chỉ admin được phép gọi preview/apply. Mỗi apply phải dùng preview
          hash và idempotency key.
        </p>
      </section>

      {error ? (
        <div
          className="flex items-start gap-2 rounded-lg border border-danger/30 bg-danger/10 p-4 text-sm text-danger"
          role="alert"
        >
          <AlertTriangle
            className="mt-0.5 h-4 w-4 shrink-0"
            aria-hidden="true"
          />
          <span>{error}</span>
        </div>
      ) : null}

      {preview ? <PreviewSummary preview={preview} /> : null}

      {canApply ? (
        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="button"
            variant="danger"
            onClick={() => setIsConfirmOpen(true)}
            disabled={isApplyLoading}
            loading={isApplyLoading}
            data-testid="ownership-transfer-confirm-open"
          >
            <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
            Xác nhận apply transfer
          </Button>
          <span className="text-xs text-muted">
            Hành động này cập nhật quyền vận hành hiện tại.
          </span>
        </div>
      ) : null}

      {result ? <ResultSummary result={result} /> : null}

      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Xác nhận chuyển quyền sở hữu vận hành?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Hệ thống sẽ chuyển các căn hộ trong preview cho{' '}
              <strong>{preview?.targetUser.email}</strong>. Contract, chữ ký,
              thanh toán và bằng chứng blockchain vẫn giữ nguyên chủ thể gốc.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Quay lại kiểm tra</AlertDialogCancel>
            <AlertDialogAction
              onClick={event => {
                event.preventDefault()
                void handleApply()
              }}
              data-testid="ownership-transfer-confirm-submit"
            >
              Apply theo preview hash
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
