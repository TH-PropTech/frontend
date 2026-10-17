'use client'

import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  RefreshCw,
  Smartphone,
  XCircle,
} from 'lucide-react'
import { useSmartCaSigning } from '../model/use-smartca-signing'
import type { SmartCaSigningSession } from '../api/contracts-api'
import { formatSmartCaCertificateLabel } from '../lib/smartca-certificate-label'

interface SmartCaSigningPanelProps {
  contractId: string
  disabled: boolean
  /** Gọi khi phiên ký chuyển sang `signed` để workspace làm mới. */
  onSigned?: () => void
}

type Notice = {
  label: string
  guidance: string
  tone: 'info' | 'success' | 'warning' | 'danger'
}

function formatRemaining(ms: number): string {
  const totalSeconds = Math.ceil(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

function sessionNotice(status: SmartCaSigningSession['status']): Notice {
  switch (status) {
    case 'signed':
      return {
        label: 'Đã ký: bằng chứng giao dịch SmartCA đã được xác minh.',
        guidance:
          'Hệ thống đã lưu bằng chứng chữ ký tách rời; trạng thái này không đồng nghĩa đã tạo PDF có chữ ký hiển thị.',
        tone: 'success',
      }
    case 'rejected':
      return {
        label: 'Giao dịch bị VNPT SmartCA từ chối.',
        guidance: 'Bạn có thể bắt đầu một giao dịch ký mới.',
        tone: 'danger',
      }
    case 'expired':
      return {
        label: 'Phiên ký VNPT SmartCA đã hết hạn.',
        guidance: 'Hãy tạo một giao dịch mới trên cùng tài liệu.',
        tone: 'warning',
      }
    case 'cancelled':
      return {
        label: 'Phiên ký VNPT SmartCA đã bị hủy.',
        guidance: 'Bạn có thể bắt đầu một giao dịch ký mới.',
        tone: 'warning',
      }
    case 'pending':
    default:
      return {
        label: 'Đang chờ duyệt trong app VNPT SmartCA.',
        guidance:
          'Mở app VNPT SmartCA đã cài trên điện thoại, kiểm tra đúng mã tài liệu rồi duyệt giao dịch. Hệ thống sẽ tự nhận kết quả.',
        tone: 'info',
      }
  }
}

function noticeClass(tone: Notice['tone']): string {
  switch (tone) {
    case 'success':
      return 'border-[var(--success)]/30 text-[var(--success)]'
    case 'danger':
      return 'border-[var(--danger)]/30 text-[var(--danger)]'
    case 'warning':
      return 'border-[var(--warning)]/30 text-[var(--warning)]'
    case 'info':
      return 'border-[var(--primary)]/30 text-[var(--primary)]'
  }
}

export function SmartCaSigningPanel({
  contractId,
  disabled,
  onSigned,
}: SmartCaSigningPanelProps) {
  const {
    certificates,
    selectedSerial,
    setSelectedSerial,
    session,
    connectionState,
    loadingCertificates,
    submitting,
    cancelling,
    checking,
    error,
    remainingMs,
    loadCertificates,
    submit,
    cancel,
    checkStatus,
  } = useSmartCaSigning(contractId, onSigned)

  const notice = session ? sessionNotice(session.status) : null
  const isPending = session?.status === 'pending'

  return (
    <section className="rounded-lg border border-[var(--primary)]/30 bg-[var(--primary-soft)] p-3 text-[11px] text-[var(--fg)]">
      <p className="font-semibold">Ký số VNPT SmartCA</p>
      <p className="mt-1 text-[var(--muted)]">
        Ký bằng cách duyệt giao dịch trong app VNPT SmartCA trên điện thoại,
        không cần nhập mật khẩu hay OTP SmartCA trên web.
      </p>

      {certificates === null && !error ? (
        <button
          type="button"
          onClick={() => void loadCertificates()}
          disabled={disabled || loadingCertificates}
          className="mt-2 inline-flex w-full items-center justify-center rounded-lg border border-[var(--primary)] px-3 py-2 font-semibold text-[var(--primary)] disabled:opacity-50"
        >
          {loadingCertificates
            ? 'Đang tải chứng thư SmartCA…'
            : 'Chuẩn bị ký VNPT SmartCA'}
        </button>
      ) : null}

      {certificates && certificates.length > 0 && !session ? (
        <div className="mt-3 space-y-3">
          <label className="block font-semibold" htmlFor="smartca-certificate">
            Chứng thư VNPT SmartCA
          </label>
          <select
            id="smartca-certificate"
            value={selectedSerial}
            onChange={event => setSelectedSerial(event.target.value)}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-[var(--fg)]"
          >
            {certificates.length > 1 ? (
              <option value="">Chọn chứng thư</option>
            ) : null}
            {certificates.map(certificate => (
              <option
                key={certificate.serialNumber}
                value={certificate.serialNumber}
              >
                {formatSmartCaCertificateLabel(certificate)}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => void submit()}
            disabled={disabled || submitting || !selectedSerial}
            className="inline-flex w-full items-center justify-center rounded-lg bg-[var(--primary)] px-3 py-2 font-semibold text-white disabled:opacity-50"
          >
            {submitting
              ? 'Đang gửi yêu cầu ký…'
              : 'Gửi yêu cầu ký VNPT SmartCA'}
          </button>
        </div>
      ) : null}

      {notice && session ? (
        <div
          data-testid="smartca-session-status"
          role={notice.tone === 'danger' ? 'alert' : 'status'}
          className={`mt-3 rounded-lg border bg-[var(--surface-muted)] p-2 ${noticeClass(notice.tone)}`}
        >
          <div className="flex items-start gap-1.5">
            {notice.tone === 'success' ? (
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            ) : notice.tone === 'info' ? (
              <Smartphone className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            ) : (
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            )}
            <div className="min-w-0 flex-1">
              <p className="font-semibold">{notice.label}</p>
              <p className="mt-0.5 text-[var(--muted)]">{notice.guidance}</p>
              {session.documentId ? (
                <p className="mt-1 break-all font-mono text-[10px]">
                  Mã tài liệu (doc_id): {session.documentId}
                </p>
              ) : null}
              <p className="mt-1 break-all font-mono text-[10px]">
                Giao dịch: {session.providerTransactionId}
              </p>
              {isPending && remainingMs !== null ? (
                <p className="mt-1 flex items-center gap-1 font-mono text-[10px]">
                  <Clock3 className="h-3 w-3" aria-hidden="true" />
                  Còn lại: {formatRemaining(remainingMs)}
                </p>
              ) : null}
              {isPending ? (
                <p className="mt-2 text-[var(--muted)]">
                  {connectionState === 'disconnected' ||
                  connectionState === 'exhausted'
                    ? 'Mất kết nối – bấm Kiểm tra kết quả.'
                    : 'Đang chờ xác nhận từ VNPT SmartCA…'}
                </p>
              ) : null}
              {isPending ? (
                <div className="mt-2 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => void checkStatus()}
                    disabled={checking}
                    className="inline-flex items-center gap-1.5 font-semibold underline underline-offset-2 disabled:opacity-50"
                  >
                    <RefreshCw
                      className={`h-3 w-3 ${checking ? 'animate-spin' : ''}`}
                      aria-hidden="true"
                    />
                    {checking
                      ? 'Đang kiểm tra kết quả…'
                      : 'Tôi đã ký – Kiểm tra kết quả'}
                  </button>
                  <button
                    type="button"
                    onClick={() => void cancel()}
                    disabled={cancelling}
                    className="inline-flex items-center gap-1.5 font-semibold underline underline-offset-2 disabled:opacity-50"
                  >
                    <XCircle className="h-3 w-3" aria-hidden="true" />
                    {cancelling ? 'Đang hủy…' : 'Hủy giao dịch'}
                  </button>
                </div>
              ) : null}
              {session.status === 'rejected' ||
              session.status === 'expired' ||
              session.status === 'cancelled' ? (
                <button
                  type="button"
                  onClick={() => void submit()}
                  disabled={submitting || !selectedSerial}
                  className="mt-2 inline-flex items-center gap-1.5 font-semibold underline underline-offset-2 disabled:opacity-50"
                >
                  <RefreshCw className="h-3 w-3" aria-hidden="true" />
                  {submitting ? 'Đang gửi lại…' : 'Thử ký lại'}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      {error ? (
        <div className="mt-3 text-[var(--danger)]" role="alert">
          <p>{error}</p>
          {certificates === null || certificates.length === 0 ? (
            <button
              type="button"
              onClick={() => void loadCertificates()}
              disabled={loadingCertificates}
              className="mt-2 inline-flex items-center gap-1.5 font-semibold underline underline-offset-2 disabled:opacity-50"
            >
              <RefreshCw className="h-3 w-3" />
              Thử tải lại chứng thư SmartCA
            </button>
          ) : null}
        </div>
      ) : null}
    </section>
  )
}
