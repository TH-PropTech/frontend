'use client'

import {
  AlertCircle,
  CheckCircle2,
  KeyRound,
  Lock,
  RefreshCw,
  Smartphone,
  XCircle,
} from 'lucide-react'
import { formatSmartCaCertificateLabel } from '../lib/smartca-certificate-label'
import { useSmartCaV2Signing } from '../model/use-smartca-v2-signing'

interface SmartCaV2SigningPanelProps {
  contractId: string
  disabled: boolean
  /** Gọi khi phiên ký chuyển sang `signed` để workspace làm mới. */
  onSigned?: () => void
}

const STEPS = [
  {
    icon: Smartphone,
    text: 'Mở app VNPT SmartCA trên điện thoại, đăng nhập tài khoản đã đăng ký.',
  },
  {
    icon: KeyRound,
    text: 'Lấy mã OTP 6 số hiện trên app (hoặc trong ứng dụng sinh OTP đã liên kết).',
  },
  {
    icon: Lock,
    text: 'Nhập mật khẩu SmartCA và mã OTP vừa lấy vào ô bên dưới rồi gửi yêu cầu ký.',
  },
] as const

/**
 * Luồng ký VNPT SmartCA v2: người dùng tự nhập mật khẩu tài khoản SmartCA và
 * mã OTP lấy từ app VNPT SmartCA (hoặc ứng dụng sinh OTP đã liên kết), không
 * cần mở app ngoài để duyệt như v1.
 */
export function SmartCaV2SigningPanel({
  contractId,
  disabled,
  onSigned,
}: SmartCaV2SigningPanelProps) {
  const {
    password,
    setPassword,
    otp,
    setOtp,
    certificates,
    certificateSerial,
    setCertificateSerial,
    loadingCertificates,
    needsCertificateChoice,
    certificateProblem,
    session,
    submitting,
    checking,
    cancelling,
    error,
    submit,
    checkStatus,
    cancel,
  } = useSmartCaV2Signing(contractId, onSigned, true)

  const isPending = session?.status === 'pending'
  const isSigned = session?.status === 'signed'
  const isFailed =
    session?.status === 'rejected' ||
    session?.status === 'expired' ||
    session?.status === 'cancelled'

  return (
    <section className="rounded-lg border border-[var(--primary)]/30 bg-[var(--primary-soft)] p-3 text-[11px] text-[var(--fg)]">
      <p className="font-semibold">Ký số VNPT SmartCA (mật khẩu + OTP)</p>
      <p className="mt-1 text-[var(--muted)]">
        Nhập mật khẩu và mã OTP lấy từ ứng dụng VNPT SmartCA trên điện thoại.
      </p>

      {!isSigned ? (
        <ol className="mt-3 space-y-2">
          {STEPS.map((step, index) => (
            <li key={step.text} className="flex items-start gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--primary)]/15 text-[10px] font-bold text-[var(--primary)]">
                {index + 1}
              </span>
              <step.icon
                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--primary)]"
                aria-hidden="true"
              />
              <span className="text-[var(--muted)]">{step.text}</span>
            </li>
          ))}
        </ol>
      ) : null}

      {!isSigned ? (
        <div className="mt-3 space-y-3">
          {loadingCertificates ? (
            <p role="status" className="text-[var(--muted)]">
              Đang tải chứng thư…
            </p>
          ) : certificates && certificates.length > 1 ? (
            <fieldset className="space-y-2">
              <legend className="font-semibold">
                Tài khoản có {certificates.length} chứng thư số, chọn một chứng
                thư để ký:
              </legend>
              {certificates.map(certificate => {
                const label = formatSmartCaCertificateLabel(certificate)
                return (
                  <label
                    key={certificate.serialNumber}
                    className={`flex cursor-pointer items-start gap-2 rounded-lg border p-2 ${
                      certificateSerial === certificate.serialNumber
                        ? 'border-[var(--primary)] bg-[var(--surface)]'
                        : 'border-[var(--border)]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="smartca-v2-certificate"
                      aria-label={`Chọn chứng thư ${label}`}
                      checked={certificateSerial === certificate.serialNumber}
                      onChange={() =>
                        setCertificateSerial(certificate.serialNumber)
                      }
                      disabled={disabled || submitting}
                      className="mt-0.5"
                    />
                    <span className="min-w-0 font-semibold">{label}</span>
                  </label>
                )
              })}
            </fieldset>
          ) : null}
          {certificateProblem ? (
            <p role="alert" className="font-semibold text-[var(--danger)]">
              {certificateProblem}
            </p>
          ) : null}
          <div>
            <label
              className="block font-semibold"
              htmlFor="smartca-v2-password"
            >
              Mật khẩu SmartCA
            </label>
            <input
              id="smartca-v2-password"
              type="password"
              aria-label="Mật khẩu SmartCA"
              autoComplete="current-password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              disabled={disabled || submitting}
              className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-[var(--fg)] disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block font-semibold" htmlFor="smartca-v2-otp">
              OTP SmartCA
            </label>
            <input
              id="smartca-v2-otp"
              type="text"
              inputMode="numeric"
              maxLength={16}
              aria-label="OTP SmartCA"
              autoComplete="one-time-code"
              value={otp}
              onChange={event => setOtp(event.target.value)}
              disabled={disabled || submitting}
              className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 font-mono text-[var(--fg)] disabled:opacity-50"
            />
          </div>

          <button
            type="button"
            onClick={() => void submit()}
            disabled={
              disabled ||
              submitting ||
              !password ||
              !otp ||
              needsCertificateChoice ||
              Boolean(certificateProblem)
            }
            className="inline-flex w-full items-center justify-center rounded-lg bg-[var(--primary)] px-3 py-2 font-semibold text-white disabled:opacity-50"
          >
            {submitting
              ? 'Đang gửi yêu cầu ký…'
              : 'Gửi yêu cầu ký VNPT SmartCA'}
          </button>
        </div>
      ) : null}

      {session ? (
        <div
          data-testid="smartca-v2-session-status"
          role={isFailed ? 'alert' : 'status'}
          className={`mt-3 rounded-lg border bg-[var(--surface-muted)] p-2 ${
            isSigned
              ? 'border-[var(--success)]/30 text-[var(--success)]'
              : isFailed
                ? 'border-[var(--danger)]/30 text-[var(--danger)]'
                : 'border-[var(--primary)]/30 text-[var(--primary)]'
          }`}
        >
          <div className="flex items-start gap-1.5">
            {isSigned ? (
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            ) : (
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            )}
            <div className="min-w-0 flex-1">
              <p className="font-semibold">
                {isSigned
                  ? 'Đã ký: bằng chứng giao dịch SmartCA đã được xác minh.'
                  : isFailed
                    ? 'Giao dịch ký VNPT SmartCA không thành công.'
                    : 'Đang xử lý giao dịch ký VNPT SmartCA…'}
              </p>
              <p className="mt-1 break-all font-mono text-[10px]">
                Giao dịch: {session.providerTransactionId}
              </p>
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
                    {checking ? 'Đang kiểm tra kết quả…' : 'Kiểm tra kết quả'}
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
            </div>
          </div>
        </div>
      ) : null}

      {error ? (
        <p className="mt-3 text-[var(--danger)]" role="alert">
          {error}
        </p>
      ) : null}
    </section>
  )
}
