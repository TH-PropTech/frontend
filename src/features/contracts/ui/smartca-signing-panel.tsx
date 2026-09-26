'use client'

import { useState } from 'react'
import { AlertCircle, CheckCircle2, Clock3, RefreshCw } from 'lucide-react'
import {
  createSmartCaSigningSession,
  getSmartCaCertificates,
  type SmartCaCertificate,
  type SmartCaSigningSession,
} from '../api/contracts-api'

interface SmartCaSigningPanelProps {
  contractId: string
  disabled: boolean
}

type Notice = {
  label: string
  guidance: string
  tone: 'info' | 'success' | 'warning' | 'danger'
}

function createIdempotencyKey(): string {
  if (typeof globalThis.crypto?.randomUUID === 'function') {
    return globalThis.crypto.randomUUID()
  }

  const random = new Uint32Array(4)
  globalThis.crypto.getRandomValues(random)
  return `smartca-${Array.from(random, value => value.toString(16)).join('-')}`
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
        guidance: 'Kiểm tra thông tin và nhập lại mật khẩu, OTP để thử lại.',
        tone: 'danger',
      }
    case 'expired':
      return {
        label: 'Phiên ký VNPT SmartCA đã hết hạn.',
        guidance:
          'Nhập lại mật khẩu, OTP để tạo giao dịch mới trên cùng tài liệu.',
        tone: 'warning',
      }
    case 'cancelled':
      return {
        label: 'Phiên ký VNPT SmartCA đã bị hủy.',
        guidance: 'Bạn có thể nhập lại thông tin để bắt đầu một giao dịch mới.',
        tone: 'warning',
      }
    case 'pending-user-confirmation':
    case 'pending':
      return {
        label: 'Đang chờ VNPT SmartCA xác nhận giao dịch.',
        guidance:
          'Hoàn tất bước xác nhận theo hướng dẫn của VNPT SmartCA rồi đối soát lại.',
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
}: SmartCaSigningPanelProps) {
  const [certificates, setCertificates] = useState<SmartCaCertificate[] | null>(
    null
  )
  const [selectedSerial, setSelectedSerial] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [session, setSession] = useState<SmartCaSigningSession | null>(null)
  const [loadingCertificates, setLoadingCertificates] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [idempotencyKey] = useState(createIdempotencyKey)

  const loadCertificates = async (): Promise<void> => {
    setLoadingCertificates(true)
    setError(null)
    try {
      const result = await getSmartCaCertificates(contractId)
      setCertificates(result.certificates)
      setSelectedSerial(
        result.certificates.length === 1
          ? (result.certificates[0]?.serialNumber ?? '')
          : ''
      )
      if (result.certificates.length === 0) {
        setError('Không có chứng thư SmartCA hợp lệ.')
      }
    } catch (caught: unknown) {
      setCertificates(null)
      setSelectedSerial('')
      setError(
        caught instanceof Error
          ? caught.message
          : 'Không thể tải chứng thư VNPT SmartCA.'
      )
    } finally {
      setLoadingCertificates(false)
    }
  }

  const submit = async (): Promise<void> => {
    if (!selectedSerial || !password || !otp) return

    setSubmitting(true)
    setError(null)
    try {
      const result = await createSmartCaSigningSession(contractId, {
        idempotencyKey,
        certificateSerial: selectedSerial,
        smartCaPassword: password,
        smartCaOtp: otp,
      })
      setSession(result)
    } catch (caught: unknown) {
      setError(
        caught instanceof Error
          ? caught.message
          : 'Không thể gửi giao dịch đến VNPT SmartCA.'
      )
    } finally {
      setPassword('')
      setOtp('')
      setSubmitting(false)
    }
  }

  const notice = session ? sessionNotice(session.status) : null

  return (
    <section className="rounded-lg border border-[var(--primary)]/30 bg-[var(--primary-soft)] p-3 text-[11px] text-[var(--fg)]">
      <p className="font-semibold">Ký số VNPT SmartCA</p>
      <p className="mt-1 text-[var(--muted)]">
        Mật khẩu và OTP chỉ được dùng cho yêu cầu hiện tại, không được lưu vào
        hồ sơ hợp đồng.
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

      {certificates && certificates.length > 0 ? (
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
                {certificate.serialNumber}
              </option>
            ))}
          </select>

          <label className="block font-semibold" htmlFor="smartca-password">
            Mật khẩu VNPT SmartCA
          </label>
          <input
            id="smartca-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            maxLength={256}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-[var(--fg)]"
          />

          <label className="block font-semibold" htmlFor="smartca-otp">
            OTP VNPT SmartCA
          </label>
          <input
            id="smartca-otp"
            inputMode="numeric"
            autoComplete="one-time-code"
            value={otp}
            onChange={event => setOtp(event.target.value)}
            maxLength={32}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-[var(--fg)]"
          />

          <button
            type="button"
            onClick={() => void submit()}
            disabled={
              disabled || submitting || !selectedSerial || !password || !otp
            }
            className="inline-flex w-full items-center justify-center rounded-lg bg-[var(--primary)] px-3 py-2 font-semibold text-white disabled:opacity-50"
          >
            {submitting
              ? 'Đang xác nhận với SmartCA…'
              : 'Xác nhận ký VNPT SmartCA'}
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
              <Clock3 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            ) : (
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            )}
            <div>
              <p className="font-semibold">{notice.label}</p>
              <p className="mt-0.5 text-[var(--muted)]">{notice.guidance}</p>
              <p className="mt-1 break-all font-mono text-[10px]">
                Giao dịch: {session.providerTransactionId}
              </p>
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
