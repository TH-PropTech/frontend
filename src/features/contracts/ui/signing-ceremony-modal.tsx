'use client'

import { useState } from 'react'
import {
  X,
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  ArrowRight,
  AlertCircle,
  Clock3,
  RefreshCw,
} from 'lucide-react'
import { useSigningCeremony } from '../model/use-signing-ceremony'
import { FaceVerifyCamera } from './face-verify-camera'
import { SmartOtpStep } from './smart-otp-step'
import { SignatureAnimation } from './signature-animation'
import {
  createSmartCaSigningSession,
  type SmartCaSigningSession,
} from '../api/contracts-api'

function smartCaStatusCopy(status: SmartCaSigningSession['status']): {
  label: string
  guidance: string
  tone: 'info' | 'success' | 'warning' | 'danger'
  retryable: boolean
} {
  switch (status) {
    case 'signed':
      return {
        label: 'Đã ký và đã nhận bằng chứng chứng thư.',
        guidance: 'Giữ nguyên digest này khi đối soát chữ ký còn lại.',
        tone: 'success',
        retryable: false,
      }
    case 'rejected':
      return {
        label: 'Bị từ chối bởi VNPT SmartCA.',
        guidance:
          'Bạn có thể mở lại một giao dịch ký mới; OTP/eKYC không thay thế chữ ký SmartCA.',
        tone: 'danger',
        retryable: true,
      }
    case 'expired':
      return {
        label: 'Phiên ký đã hết hạn.',
        guidance:
          'Mở lại phiên để nhận giao dịch SmartCA mới trên cùng artifact đang khóa.',
        tone: 'warning',
        retryable: true,
      }
    case 'pending-user-confirmation':
    case 'pending':
      return {
        label: 'Đang chờ xác nhận trên VNPT SmartCA.',
        guidance:
          'Hoàn tất xác nhận trong ứng dụng/portal SmartCA rồi quay lại đối soát.',
        tone: 'info',
        retryable: false,
      }
  }
}

export interface SigningCeremonyModalProps {
  isOpen: boolean
  onClose: () => void
  contractId: string
  contractCode: string
  signerName: string
  signerRole: 'tenant' | 'landlord'
  onSigningSuccess?: () => void
}

export function SigningCeremonyModal({
  isOpen,
  onClose,
  contractId,
  contractCode,
  signerName,
  signerRole,
  onSigningSuccess,
}: SigningCeremonyModalProps) {
  const [consentChecked, setConsentChecked] = useState(false)
  const [smartCaSession, setSmartCaSession] =
    useState<SmartCaSigningSession | null>(null)
  const [smartCaLoading, setSmartCaLoading] = useState(false)
  const [smartCaError, setSmartCaError] = useState<string | null>(null)

  const ceremony = useSigningCeremony({
    contractId,
    onSuccess: onSigningSuccess,
  })

  if (!isOpen) return null

  const handleClose = () => {
    ceremony.reset()
    setSmartCaSession(null)
    setSmartCaError(null)
    onClose()
  }

  const handleSmartCaStart = async (): Promise<void> => {
    setSmartCaLoading(true)
    setSmartCaError(null)
    try {
      const session = await createSmartCaSigningSession(contractId)
      setSmartCaSession(session)
      if (session.confirmationUrl)
        window.open(session.confirmationUrl, '_blank', 'noopener,noreferrer')
    } catch (error: unknown) {
      setSmartCaError(
        error instanceof Error
          ? error.message
          : 'Không thể khởi tạo phiên ký VNPT SmartCA.'
      )
    } finally {
      setSmartCaLoading(false)
    }
  }

  const smartCaStatus = smartCaSession
    ? smartCaStatusCopy(smartCaSession.status)
    : null

  const smartCaStatusClass =
    smartCaStatus?.tone === 'success'
      ? 'text-[var(--success)] border-[var(--success)]/30 bg-[var(--surface-muted)]'
      : smartCaStatus?.tone === 'danger'
        ? 'text-[var(--danger)] border-[var(--danger)]/30 bg-[var(--surface-muted)]'
        : smartCaStatus?.tone === 'warning'
          ? 'text-[var(--warning)] border-[var(--warning)]/30 bg-[var(--surface-muted)]'
          : 'text-[var(--primary)] border-[var(--primary)]/30 bg-[var(--surface-muted)]'

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="signing-ceremony-title"
      data-testid="signing-ceremony-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xl overflow-hidden flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--surface-muted)] flex items-center justify-center text-[var(--primary)] border border-[var(--border)]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3
                id="signing-ceremony-title"
                className="text-sm font-bold text-[var(--fg)] tracking-tight"
              >
                Xác nhận ký số VNPT SmartCA
              </h3>
              <p className="text-[11px] text-[var(--muted)]">
                Hợp đồng số:{' '}
                <span className="font-semibold text-[var(--fg)]">
                  {contractCode}
                </span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Đóng cửa sổ"
            className="p-1.5 rounded-lg text-[var(--muted)] hover:text-[var(--fg)] hover:bg-[var(--surface-muted)] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Indicator Bar */}
        <div className="grid grid-cols-4 gap-1.5">
          {[
            { id: 'INTRO', label: '1. Đồng thuận' },
            { id: 'FACE_VERIFY', label: '2. Khuôn mặt' },
            { id: 'SMART_OTP', label: '3. Smart OTP' },
            { id: 'ANIMATING', label: '4. Ký số' },
          ].map((item, idx) => {
            const stepOrder = [
              'INTRO',
              'FACE_VERIFY',
              'SMART_OTP',
              'ANIMATING',
              'SUCCESS',
            ]
            const currentIdx = stepOrder.indexOf(ceremony.step)
            const isFinished = currentIdx > idx
            const isCurrent = ceremony.step === item.id

            return (
              <div
                key={item.id}
                className={`h-1.5 rounded-full transition-all ${
                  isFinished || ceremony.step === 'SUCCESS'
                    ? 'bg-[var(--success)]'
                    : isCurrent
                      ? 'bg-[var(--primary)]'
                      : 'bg-[var(--surface-muted)]'
                }`}
                title={item.label}
              />
            )
          })}
        </div>

        {/* Dynamic Step Content */}
        <div className="py-2">
          {ceremony.step === 'INTRO' && (
            <div className="flex flex-col gap-4 text-left">
              <div className="p-4 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] space-y-2.5 text-xs text-[var(--fg)]">
                <div className="flex items-center gap-2 font-bold text-[var(--fg)]">
                  <FileCheck className="w-4 h-4 text-[var(--primary)] shrink-0" />
                  <span>Điều kiện xác nhận ký kết điện tử (PoC)</span>
                </div>
                <p className="text-[11px] text-[var(--muted)] leading-relaxed">
                  Quy trình ký kết tuân thủ nghị định về giao dịch điện tử trong
                  môi trường thử nghiệm công nghệ bất động sản (PropTech
                  Sandbox).
                </p>
                <ul className="space-y-1.5 pl-1 text-[11px]">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--success)] shrink-0 mt-0.5" />
                    <span>
                      Nội dung hợp đồng 12 điều khoản và 4 phụ lục đã được chốt
                      khóa.
                    </span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--success)] shrink-0 mt-0.5" />
                    <span>
                      Khoản tiền đặt cọc đã được thanh toán an toàn qua ngân
                      hàng mô phỏng.
                    </span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--success)] shrink-0 mt-0.5" />
                    <span>
                      Hồ sơ định danh KYC của bạn đã được kiểm duyệt hợp lệ.
                    </span>
                  </li>
                </ul>
              </div>

              <label className="flex items-start gap-2 text-xs text-[var(--fg)] cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={consentChecked}
                  onChange={e => setConsentChecked(e.target.checked)}
                  aria-label="Xác nhận đồng thuận"
                  className="mt-0.5 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]"
                />
                <span>
                  Tôi xác nhận đã đọc, hiểu rõ toàn bộ nội dung hợp đồng và đồng
                  ý tiến hành ký xác nhận điện tử bằng sinh trắc học và Smart
                  OTP.
                </span>
              </label>

              <button
                type="button"
                onClick={ceremony.startCeremony}
                disabled={!consentChecked}
                aria-label="Bắt đầu ký kết"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold rounded-lg bg-[var(--primary)] text-white hover:opacity-90 disabled:opacity-50 transition-opacity shadow-sm mt-2"
              >
                <span>Bắt đầu xác thực ký hợp đồng</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="rounded-lg border border-[var(--primary)]/30 bg-[var(--primary-soft)] p-3 text-[11px] text-[var(--fg)]">
                <p className="font-semibold">Ký số VNPT SmartCA</p>
                <p className="mt-1 text-[var(--muted)]">
                  SmartCA tạo giao dịch ký riêng cho từng bên trên đúng mã băm
                  hợp đồng. OTP/eKYC bên dưới chỉ là xác thực hỗ trợ.
                </p>
                <button
                  type="button"
                  onClick={() => void handleSmartCaStart()}
                  disabled={!consentChecked || smartCaLoading}
                  aria-label="Mở phiên ký VNPT SmartCA"
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[var(--primary)] px-3 py-2 font-semibold text-[var(--primary)] disabled:opacity-50"
                >
                  {smartCaLoading
                    ? 'Đang kết nối SmartCA…'
                    : 'Mở phiên ký VNPT SmartCA'}
                </button>
                {smartCaSession && smartCaStatus ? (
                  <div
                    data-testid="smartca-session-status"
                    role={smartCaStatus.retryable ? 'alert' : 'status'}
                    className={`mt-2 rounded-lg border p-2 ${smartCaStatusClass}`}
                  >
                    <div className="flex items-start gap-1.5">
                      {smartCaStatus.tone === 'success' ? (
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      ) : smartCaStatus.retryable ? (
                        <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      ) : (
                        <Clock3 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      )}
                      <div>
                        <p className="font-semibold">{smartCaStatus.label}</p>
                        <p className="mt-0.5 text-[var(--muted)]">
                          {smartCaStatus.guidance}
                        </p>
                        <p className="mt-1 break-all font-mono text-[10px]">
                          Giao dịch: {smartCaSession.providerTransactionId}
                        </p>
                      </div>
                    </div>
                    {smartCaStatus.retryable ? (
                      <button
                        type="button"
                        onClick={() => void handleSmartCaStart()}
                        disabled={smartCaLoading}
                        aria-label="Mở lại phiên ký VNPT SmartCA"
                        className="mt-2 inline-flex items-center gap-1.5 font-semibold underline underline-offset-2 disabled:opacity-50"
                      >
                        <RefreshCw className="h-3 w-3" />
                        Mở lại phiên ký
                      </button>
                    ) : null}
                  </div>
                ) : null}
                {smartCaError ? (
                  <div className="mt-2 text-[var(--danger)]" role="alert">
                    <p>
                      Không thể kết nối VNPT SmartCA: {smartCaError}. Hãy thử
                      lại; hệ thống không chuyển sang OTP để gắn nhãn SmartCA.
                    </p>
                    <button
                      type="button"
                      onClick={() => void handleSmartCaStart()}
                      disabled={smartCaLoading}
                      aria-label="Mở lại phiên ký VNPT SmartCA"
                      className="mt-2 inline-flex items-center gap-1.5 font-semibold underline underline-offset-2 disabled:opacity-50"
                    >
                      <RefreshCw className="h-3 w-3" />
                      Thử lại kết nối
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          )}

          {ceremony.step === 'FACE_VERIFY' && (
            <FaceVerifyCamera
              contractId={contractId}
              onVerified={ceremony.handleFaceVerified}
              onCancel={handleClose}
            />
          )}

          {ceremony.step === 'SMART_OTP' && (
            <SmartOtpStep
              challenge={ceremony.otpChallenge ?? ''}
              otpCodeHint={ceremony.otpCodeHint}
              onSubmit={ceremony.handleOtpVerified}
              onCancel={() => ceremony.setStep('FACE_VERIFY')}
              isLoading={ceremony.loading}
              error={ceremony.error}
            />
          )}

          {ceremony.step === 'ANIMATING' && (
            <SignatureAnimation
              signerName={signerName}
              role={signerRole}
              onComplete={ceremony.handleAnimationComplete}
            />
          )}

          {ceremony.step === 'SUCCESS' && (
            <div className="flex flex-col items-center justify-center p-6 text-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[var(--surface-muted)] flex items-center justify-center text-[var(--success)] border-2 border-[var(--success)] animate-in zoom-in-50 duration-300">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[var(--fg)] tracking-tight">
                  Ký hợp đồng thành công!
                </h4>
                <p className="text-xs text-[var(--muted)] mt-1 max-w-sm">
                  Chữ ký số VNPT SmartCA và bằng chứng đối soát sinh trắc học đã
                  được ghi nhận vào hồ sơ hợp đồng.
                </p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                aria-label="Hoàn tất và đóng"
                className="w-full max-w-xs inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold rounded-lg bg-[var(--primary)] text-white hover:opacity-90 transition-opacity shadow-sm"
              >
                Hoàn tất & Đóng
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
