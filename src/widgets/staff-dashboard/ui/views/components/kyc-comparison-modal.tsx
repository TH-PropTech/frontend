'use client'

import * as React from 'react'
import Image from 'next/image'
import type { KycRecord } from '../kyc-approvals-view'
import { CccdMockupCard } from './cccd-mockup-card'
import { apiClient } from '@/shared/api/api-client'
import { AdminCard } from '@/shared/ui/admin-card'
import { formatRecordCode } from '../../../model/admin-labels'

interface KycComparisonModalProps {
  selectedRecord: KycRecord
  onClose: () => void
  onVerify: (id: string) => Promise<void>
  onShowReject: () => void
  /** Ẩn nút xác nhận / yêu cầu chụp lại khi người dùng chỉ được xem. */
  canReview?: boolean
}

export function KycComparisonModal({
  selectedRecord,
  onClose,
  onVerify,
  onShowReject,
  canReview = true,
}: KycComparisonModalProps): React.ReactElement {
  const frontCardUrl = useProtectedKycImage(selectedRecord.id, 'front-card')
  const backCardUrl = useProtectedKycImage(selectedRecord.id, 'back-card')
  const selfieUrl = useProtectedKycImage(selectedRecord.id, 'selfie')

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="kyc-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
    >
      <div
        className="absolute inset-0 bg-fg/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <AdminCard className="relative z-10 flex h-[min(90vh,820px)] w-full max-w-5xl flex-col overflow-hidden shadow-lg animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-border bg-surface-muted/30 px-6 py-4">
          <div>
            <span className="font-display text-[10px] font-bold text-primary">
              {formatRecordCode(selectedRecord.id)}
            </span>
            <h2
              id="kyc-modal-title"
              className="mt-0.5 font-marketing text-sm font-bold text-fg"
            >
              Xác minh KYC: {selectedRecord.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng cửa sổ xác minh KYC"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-subtle transition-colors hover:bg-primary-soft hover:text-fg"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden md:flex-row">
          <div className="min-w-0 flex-1 overflow-y-auto border-r border-border bg-bg/50 p-5 md:overflow-hidden">
            <h3 className="mb-3 font-body text-xs font-bold uppercase tracking-wider text-fg">
              Hình ảnh CCCD & selfie chân dung
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <KycDocumentImage
                label="Mặt trước CCCD"
                url={frontCardUrl}
                record={selectedRecord}
                side="front"
              />
              <KycDocumentImage
                label="Mặt sau CCCD"
                url={backCardUrl}
                record={selectedRecord}
                side="back"
              />
            </div>

            {selfieUrl && (
              <div className="mt-4 flex items-center gap-4 rounded-lg border border-border bg-surface/70 p-3">
                <div>
                  <span className="block font-body text-[10px] font-bold uppercase tracking-wider text-muted">
                    Ảnh chân dung đối chiếu
                  </span>
                  <span className="mt-1 block text-[11px] text-subtle">
                    Selfie người nộp hồ sơ
                  </span>
                </div>
                <AdminCard className="relative ml-auto aspect-square w-20 shrink-0 overflow-hidden">
                  <Image
                    src={selfieUrl}
                    alt="Ảnh selfie chân dung"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </AdminCard>
              </div>
            )}
          </div>

          <div className="flex min-h-0 w-full flex-col md:w-[450px]">
            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-body text-xs font-bold uppercase tracking-wider text-fg">
                  Dữ liệu trích xuất từ OCR
                </h3>
                <span className="shrink-0 rounded-full border border-success/30 bg-success-soft px-2.5 py-1 text-[11px] font-bold text-success">
                  {selectedRecord.ocrScore === null
                    ? 'Không có điểm OCR'
                    : `Trùng khớp ${selectedRecord.ocrScore}%`}
                </span>
              </div>

              <div className="space-y-3">
                <KycField
                  label="Họ và tên (Full name)"
                  value={selectedRecord.name}
                />
                <div className="grid grid-cols-2 gap-3">
                  <KycField
                    label="Số CCCD (ID number)"
                    value={selectedRecord.cccdNumber}
                    mono
                  />
                  <KycField
                    label="Ngày sinh (Date of birth)"
                    value={selectedRecord.dob}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <KycField
                    label="Giới tính (Gender)"
                    value={selectedRecord.gender}
                  />
                  <KycField
                    label="Email liên kết"
                    value={selectedRecord.email}
                    disabled
                  />
                </div>
                <KycField
                  label="Quê quán (Place of origin)"
                  value={selectedRecord.hometown}
                />
                <KycField
                  label="Nơi thường trú (Residence)"
                  value={selectedRecord.address}
                  multiline
                />
              </div>
            </div>

            {selectedRecord.status === 'pending' && canReview && (
              <div className="flex shrink-0 gap-2 border-t border-border bg-surface p-5 pt-4">
                <button
                  type="button"
                  onClick={onShowReject}
                  className="flex-1 rounded-lg border border-primary bg-surface py-2.5 text-xs font-semibold text-primary transition-colors hover:bg-primary-soft"
                >
                  Yêu cầu chụp lại
                </button>
                <button
                  type="button"
                  onClick={() => void onVerify(selectedRecord.id)}
                  className="flex-1 rounded-lg bg-success py-2.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-success/90"
                >
                  Xác nhận KYC
                </button>
              </div>
            )}
          </div>
        </div>
      </AdminCard>
    </div>
  )
}

function KycDocumentImage({
  label,
  url,
  record,
  side,
}: {
  label: string
  url: string | null
  record: KycRecord
  side: 'front' | 'back'
}): React.ReactElement {
  return (
    <div className="space-y-2">
      <span className="block font-body text-[10px] font-bold uppercase tracking-wider text-muted">
        {label}
      </span>
      {url ? (
        <AdminCard className="relative aspect-[1.58/1] w-full overflow-hidden">
          <Image
            src={url}
            alt={label}
            fill
            unoptimized
            className="object-cover"
          />
        </AdminCard>
      ) : (
        <CccdMockupCard record={record} side={side} />
      )}
    </div>
  )
}

function KycField({
  label,
  value,
  disabled = false,
  mono = false,
  multiline = false,
}: {
  label: string
  value: string
  disabled?: boolean
  mono?: boolean
  multiline?: boolean
}): React.ReactElement {
  const className = `mt-1.5 w-full rounded-lg border border-border bg-bg/30 p-2.5 text-xs font-semibold text-fg outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary-soft ${mono ? 'font-mono' : ''}`
  return (
    <div>
      <label className="block font-body text-[10px] font-bold uppercase tracking-wider text-muted">
        {label}
      </label>
      {multiline ? (
        <textarea
          defaultValue={value}
          rows={2}
          className={`${className} resize-none`}
        />
      ) : (
        <input
          type="text"
          defaultValue={value}
          disabled={disabled}
          className={className}
        />
      )}
    </div>
  )
}

function useProtectedKycImage(
  recordId: string,
  field: 'front-card' | 'back-card' | 'selfie'
): string | null {
  const [url, setUrl] = React.useState<string | null>(null)

  React.useEffect(() => {
    let objectUrl: string | null = null
    let active = true
    apiClient
      .getBlob(`/kyc/${recordId}/media/${field}`)
      .then(blob => {
        if (!active) return
        objectUrl = URL.createObjectURL(blob)
        setUrl(objectUrl)
      })
      .catch(error => {
        console.warn(`Could not load protected KYC media: ${field}`, error)
      })
    return () => {
      active = false
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [field, recordId])

  return url
}
