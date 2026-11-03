'use client'

import { useState } from 'react'
import {
  X,
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  ArrowRight,
} from 'lucide-react'
import { testSignContract } from '../api/contracts-api'
import { useSigningCeremony } from '../model/use-signing-ceremony'
import { useSigningMethods } from '../model/use-signing-methods'
import { FaceVerifyCamera } from './face-verify-camera'
import { SmartOtpStep } from './smart-otp-step'
import { SignatureAnimation } from './signature-animation'
import { SmartCaSigningPanel } from './smartca-signing-panel'
import { SmartCaV2SigningPanel } from './smartca-v2-signing-panel'
import { describeSigningMethodReason } from '../lib/signing-method-reason'

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
  const [smartCaPanelKey, setSmartCaPanelKey] = useState(0)
  const [testSigning, setTestSigning] = useState(false)
  const [testSignError, setTestSignError] = useState<string | null>(null)

  const handleTestSign = async (): Promise<void> => {
    setTestSigning(true)
    setTestSignError(null)
    try {
      await testSignContract(contractId)
      onSigningSuccess?.()
    } catch (error: unknown) {
      setTestSignError(
        error instanceof Error ? error.message : 'Không thể ký ở chế độ test.'
      )
    } finally {
      setTestSigning(false)
    }
  }

  const methodsState = useSigningMethods(contractId, isOpen)

  const ceremony = useSigningCeremony({
    contractId,
    onSuccess: onSigningSuccess,
  })

  if (!isOpen) return null

  const handleClose = () => {
    ceremony.reset()
    setConsentChecked(false)
    setSmartCaPanelKey(current => current + 1)
    onClose()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="signing-ceremony-title"
      data-testid="signing-ceremony-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        className={`relative w-full ${ceremony.step === 'INTRO' ? 'max-w-4xl' : 'max-w-lg'} rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xl max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain flex flex-col gap-5`}
      >
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
            <div className="grid gap-4 text-left lg:grid-cols-2 lg:items-start lg:gap-6">
              <div className="flex flex-col gap-4">
                <div className="p-4 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] space-y-2.5 text-xs text-[var(--fg)]">
                  <div className="flex items-center gap-2 font-bold text-[var(--fg)]">
                    <FileCheck className="w-4 h-4 text-[var(--primary)] shrink-0" />
                    <span>Điều kiện xác nhận ký kết điện tử (thử nghiệm)</span>
                  </div>
                  <p className="text-[11px] text-[var(--muted)] leading-relaxed">
                    Quy trình ký kết tuân thủ nghị định về giao dịch điện tử
                    trong môi trường thử nghiệm công nghệ bất động sản (PropTech
                    Sandbox).
                  </p>
                  <ul className="space-y-1.5 pl-1 text-[11px]">
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--success)] shrink-0 mt-0.5" />
                      <span>
                        Nội dung hợp đồng 12 điều khoản và 4 phụ lục đã được
                        chốt khóa.
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
                    Tôi xác nhận đã đọc, hiểu rõ toàn bộ nội dung hợp đồng và
                    đồng ý tiến hành ký xác nhận điện tử{' '}
                    {methodsState.selected === 'biometric_smart_otp'
                      ? 'bằng sinh trắc học và Smart OTP'
                      : methodsState.selected === 'dev_sign'
                        ? '(chế độ thử nghiệm)'
                        : 'bằng VNPT SmartCA'}
                    .
                  </span>
                </label>
              </div>

              <div className="flex flex-col gap-4">
                <fieldset className="space-y-2">
                  <legend className="text-[11px] font-bold uppercase text-[var(--muted)]">
                    Chọn phương thức ký
                  </legend>
                  {methodsState.loading ? (
                    <p className="text-[11px] text-[var(--muted)]">
                      Đang tải phương thức ký...
                    </p>
                  ) : null}
                  {methodsState.error ? (
                    <div role="alert" className="space-y-1">
                      <p className="text-[11px] text-[var(--danger)]">
                        {methodsState.error}
                      </p>
                      <button
                        type="button"
                        onClick={methodsState.reload}
                        className="text-[11px] font-bold text-[var(--primary)] underline"
                      >
                        Thử lại
                      </button>
                    </div>
                  ) : null}
                  <div
                    role="radiogroup"
                    aria-label="Chọn phương thức ký"
                    className="space-y-1.5"
                  >
                    {methodsState.methods.map(method => (
                      <label
                        key={method.id}
                        className={`flex items-start gap-2 rounded-lg border p-2.5 text-xs cursor-pointer ${
                          methodsState.selected === method.id
                            ? 'border-[var(--primary)] bg-[var(--surface-muted)]'
                            : 'border-[var(--border)]'
                        } ${method.available ? '' : 'opacity-50 cursor-not-allowed'}`}
                      >
                        <input
                          type="radio"
                          name="signing-method"
                          value={method.id}
                          checked={methodsState.selected === method.id}
                          disabled={!method.available}
                          onChange={() => methodsState.select(method.id)}
                          className="mt-0.5"
                        />
                        <span>
                          <span className="block font-bold text-[var(--fg)]">
                            {method.label}
                          </span>
                          <span className="block text-[11px] text-[var(--muted)]">
                            {method.description}
                          </span>
                          {!method.available && method.reason ? (
                            <span className="block text-[11px] text-[var(--warning)]">
                              Chưa dùng được:{' '}
                              {describeSigningMethodReason(method.reason)}
                            </span>
                          ) : null}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                {methodsState.selected === 'biometric_smart_otp' ? (
                  <button
                    type="button"
                    onClick={ceremony.startCeremony}
                    disabled={!consentChecked}
                    aria-label="Bắt đầu ký kết"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold rounded-lg bg-[var(--primary)] text-white hover:opacity-90 disabled:opacity-50 transition-opacity shadow-sm"
                  >
                    <span>Bắt đầu xác thực ký hợp đồng</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : null}

                {methodsState.selected === 'smartca_v1' ? (
                  <SmartCaSigningPanel
                    key={smartCaPanelKey}
                    contractId={contractId}
                    disabled={!consentChecked}
                    {...(onSigningSuccess
                      ? { onSigned: onSigningSuccess }
                      : {})}
                  />
                ) : null}

                {methodsState.selected === 'smartca_v2' ? (
                  <SmartCaV2SigningPanel
                    key={smartCaPanelKey}
                    contractId={contractId}
                    disabled={!consentChecked}
                    {...(onSigningSuccess
                      ? { onSigned: onSigningSuccess }
                      : {})}
                  />
                ) : null}

                {methodsState.selected === 'dev_sign' ? (
                  <div className="rounded-xl border border-dashed border-[var(--warning)] p-3 space-y-2">
                    <p className="text-[11px] text-[var(--muted)] leading-relaxed">
                      Chế độ test: bỏ qua sinh trắc, Smart OTP và VNPT SmartCA,
                      chỉ ghi nhận bạn đã ký để đi tiếp các bước sau. Không phải
                      chữ ký số có chứng thư.
                    </p>
                    <button
                      type="button"
                      onClick={() => void handleTestSign()}
                      disabled={!consentChecked || testSigning}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold rounded-lg border border-[var(--warning)] text-[var(--fg)] hover:bg-[var(--surface-muted)] disabled:opacity-50 transition-colors"
                    >
                      {testSigning
                        ? 'Đang xác nhận...'
                        : 'Xác nhận ký (chế độ test)'}
                    </button>
                    {testSignError ? (
                      <p
                        role="alert"
                        className="text-[11px] text-[var(--danger)]"
                      >
                        {testSignError}
                      </p>
                    ) : null}
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
                  Bằng chứng giao dịch VNPT SmartCA và dữ liệu đối soát sinh
                  trắc học đã được ghi nhận. Thông báo này không khẳng định PDF
                  đã có chữ ký hiển thị.
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
