'use client'

import { useState } from 'react'
import {
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Clock,
  ExternalLink,
  Info,
} from 'lucide-react'
import type { ContractDepositView } from '@/features/contracts/api/contracts-api'
import {
  consentDepositAgreement,
  initDepositPayment,
} from '../api/payments-api'

export interface DepositPaymentPanelProps {
  deposit: ContractDepositView | null
  isTenant: boolean
  contractId: string
  onPaymentSuccess?: () => void
  /** Tải lại workspace sau lỗi (ví dụ revision cọc đã đổi); không tự gửi lại. */
  onRefresh?: () => void
  /** Khi false: panel mờ và không nhận tương tác. Khi true: panel nổi bật. undefined = no change. */
  isActiveStep?: boolean
}

export function DepositPaymentPanel({
  deposit,
  isTenant,
  contractId,
  onPaymentSuccess,
  onRefresh,
  isActiveStep,
}: DepositPaymentPanelProps) {
  const [loading, setLoading] = useState(false)
  const [consenting, setConsenting] = useState(false)
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  if (!deposit) {
    return (
      <div
        data-testid="deposit-empty"
        className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 text-sm text-[var(--muted)]"
      >
        Hợp đồng không áp dụng khoản đặt cọc.
      </div>
    )
  }

  const isPaid = deposit.status === 'paid' || deposit.status === 'transferred'
  const hasConsent = deposit.consentGiven !== false
  const canConsent =
    isTenant &&
    !hasConsent &&
    Boolean(deposit.agreementId) &&
    Number.isInteger(deposit.contentRevision) &&
    Boolean(deposit.contentHash)
  const formattedAmount = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(deposit.amount)

  const handleInitPayment = async () => {
    const targetAgreementId = deposit.agreementId
    if (!targetAgreementId) {
      setErrorMsg('Không tìm thấy mã thỏa thuận đặt cọc hợp lệ')
      return
    }
    try {
      setLoading(true)
      setErrorMsg(null)
      const res = await initDepositPayment(targetAgreementId)
      if (res?.deepLink) {
        setPaymentUrl(res.deepLink)
      } else {
        // Mock payment completed simulation
        onPaymentSuccess?.()
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Không thể khởi tạo cổng thanh toán cọc'
      setErrorMsg(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleConsent = async () => {
    const targetAgreementId = deposit.agreementId
    const expectedRevision = deposit.contentRevision
    const expectedContentHash = deposit.contentHash
    if (
      !targetAgreementId ||
      typeof expectedRevision !== 'number' ||
      !Number.isInteger(expectedRevision) ||
      !expectedContentHash
    ) {
      setErrorMsg('Không thể xác nhận vì thiếu thông tin thỏa thuận cọc')
      return
    }
    try {
      setConsenting(true)
      setErrorMsg(null)
      await consentDepositAgreement(
        targetAgreementId,
        expectedRevision,
        expectedContentHash
      )
      onPaymentSuccess?.()
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Không thể xác nhận thỏa thuận cọc'
      setErrorMsg(msg)
      onRefresh?.()
    } finally {
      setConsenting(false)
    }
  }

  const wrapperClass =
    isActiveStep === true
      ? 'ring-2 ring-[var(--primary)] rounded-xl'
      : isActiveStep === false
        ? 'opacity-50 pointer-events-none'
        : ''

  return (
    <div data-testid="deposit-payment-panel-wrapper" className={wrapperClass}>
      <div
        data-testid="deposit-payment-panel"
        data-contract-id={contractId}
        className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm flex flex-col gap-4"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[var(--primary)]" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--fg)]">
              Tiền đặt cọc bảo đảm
            </h4>
          </div>
          <div>
            {isPaid ? (
              <span
                data-testid="deposit-status-paid"
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[var(--surface-muted)] text-[var(--success)] border border-[var(--border)]"
              >
                <CheckCircle2 className="w-3 h-3 text-[var(--success)]" />
                Đã thanh toán
              </span>
            ) : (
              <span
                data-testid="deposit-status-pending"
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[var(--surface-muted)] text-[var(--warning)] border border-[var(--border)]"
              >
                <Clock className="w-3 h-3 text-[var(--warning)]" />
                Chờ thanh toán
              </span>
            )}
          </div>
        </div>

        {/* Amount Display Card */}
        <div className="p-4 rounded-lg bg-[var(--surface-muted)] border border-[var(--border)] flex flex-col gap-1">
          <span className="text-[11px] text-[var(--muted)]">
            Số tiền đặt cọc
          </span>
          <span className="text-xl font-extrabold text-[var(--fg)] tracking-tight">
            {formattedAmount}
          </span>
        </div>

        {/* PoC Mock Bank Simulation Note */}
        <div className="flex items-start gap-2 p-3 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] text-xs text-[var(--fg)]">
          <Info className="w-4 h-4 text-[var(--primary)] shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            {deposit.mockSimulationNotice ||
              'Môi trường thử nghiệm PoC: Thanh toán cọc qua ngân hàng mô phỏng để bảo đảm an toàn giao dịch trước khi kích hoạt quy trình ký e-Consent.'}
          </p>
        </div>

        {/* Paid Details */}
        {isPaid && (
          <div className="space-y-2 text-xs border-t border-[var(--border)] pt-3">
            {deposit.paidAt && (
              <div className="flex justify-between items-center text-[var(--fg)]">
                <span className="text-[var(--muted)]">Thời gian ghi nhận:</span>
                <span>{new Date(deposit.paidAt).toLocaleString('vi-VN')}</span>
              </div>
            )}
            {deposit.txHash && (
              <div className="flex justify-between items-center text-[var(--fg)]">
                <span className="text-[var(--muted)]">Mã giao dịch:</span>
                <span className="font-mono text-[11px] text-[var(--primary)] truncate max-w-[180px]">
                  {deposit.txHash}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Action / CTA for Pending */}
        {!isPaid && (
          <div className="space-y-3 pt-2">
            {errorMsg && (
              <div className="flex items-center gap-1.5 text-xs text-[var(--danger)]">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {isTenant && hasConsent ? (
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleInitPayment}
                  disabled={loading || consenting}
                  aria-label="Thanh toán cọc ngay"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold rounded-lg bg-[var(--primary)] text-white hover:opacity-90 disabled:opacity-50 transition-opacity shadow-sm"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>
                    {loading
                      ? 'Đang tạo giao dịch...'
                      : 'Thanh toán cọc ngay (Mock Bank)'}
                  </span>
                </button>

                {paymentUrl && (
                  <a
                    href={paymentUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] text-[var(--fg)] hover:bg-[var(--surface)] transition-colors"
                  >
                    <span>Mở cổng thanh toán Mock Bank</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            ) : isTenant && canConsent ? (
              <button
                type="button"
                onClick={handleConsent}
                disabled={consenting}
                aria-label="Đồng ý thỏa thuận cọc"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold rounded-lg bg-[var(--primary)] text-white hover:opacity-90 disabled:opacity-50 transition-opacity shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {consenting
                    ? 'Đang xác nhận thỏa thuận...'
                    : 'Đồng ý thỏa thuận cọc'}
                </span>
              </button>
            ) : isTenant ? (
              <div className="p-3 rounded-lg bg-[var(--surface-muted)] text-center text-xs text-[var(--muted)]">
                Thỏa thuận cọc chưa có đủ thông tin để xác nhận. Vui lòng tải
                lại hợp đồng.
              </div>
            ) : (
              <div className="p-3 rounded-lg bg-[var(--surface-muted)] text-center text-xs text-[var(--muted)]">
                Đang chờ Bên thuê hoàn tất nộp tiền đặt cọc để mở khóa điều kiện
                ký kết hợp đồng.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
