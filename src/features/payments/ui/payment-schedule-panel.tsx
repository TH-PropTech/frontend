'use client'

import * as React from 'react'
import { Banknote, Loader2, RefreshCw } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import {
  getPaymentsByContract,
  initInvoicePayment,
  initRentPayment,
  isExternalGateway,
  type PaymentItem,
} from '../api/payments-api'
import {
  PaymentProviderPicker,
  choiceLimitNote,
  usePaymentProviders,
} from './payment-provider-picker'

export interface PaymentSchedulePanelProps {
  contractId: string
}

export function PaymentSchedulePanel({
  contractId,
}: PaymentSchedulePanelProps): React.ReactElement {
  const [payments, setPayments] = React.useState<PaymentItem[]>([])
  const [loading, setLoading] = React.useState(true)
  const [busyPaymentId, setBusyPaymentId] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [lastPaymentRef, setLastPaymentRef] = React.useState<string | null>(
    null
  )
  const [lastPaymentUrl, setLastPaymentUrl] = React.useState<string | null>(
    null
  )
  const {
    providers,
    selected,
    setSelected,
    momoMethod,
    setMomoMethod,
    zalopayMethod,
    setZalopayMethod,
    brand,
    setBrand,
    choice,
  } = usePaymentProviders()

  const load = React.useCallback(async (): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      setPayments(await getPaymentsByContract(contractId))
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : 'Không tải được lịch thanh toán.'
      )
    } finally {
      setLoading(false)
    }
  }, [contractId])

  React.useEffect(() => {
    const scheduleLoad = window.setTimeout(() => {
      void load()
    }, 0)

    return () => window.clearTimeout(scheduleLoad)
  }, [load])

  React.useEffect(() => {
    const refreshWhenVisible = (): void => {
      if (document.visibilityState === 'visible') void load()
    }
    window.addEventListener('focus', refreshWhenVisible)
    document.addEventListener('visibilitychange', refreshWhenVisible)
    return () => {
      window.removeEventListener('focus', refreshWhenVisible)
      document.removeEventListener('visibilitychange', refreshWhenVisible)
    }
  }, [load])

  const handlePay = async (payment: PaymentItem): Promise<void> => {
    setBusyPaymentId(payment._id)
    setError(null)
    try {
      const init =
        payment.type === 'platform-fee'
          ? await initInvoicePayment(payment._id, choice)
          : await initRentPayment(payment._id, choice)
      if (isExternalGateway(init) && init.deepLink) {
        window.location.assign(init.deepLink)
        return
      }
      setLastPaymentRef(init.txRef)
      setLastPaymentUrl(init.deepLink)
    } catch (paymentError) {
      setError(
        paymentError instanceof Error
          ? paymentError.message
          : 'Không tạo được phiên thanh toán.'
      )
    } finally {
      setBusyPaymentId(null)
    }
  }

  if (loading) {
    return <p className="text-sm text-muted">Đang tải lịch thanh toán…</p>
  }
  if (error && payments.length === 0) {
    return (
      <div className="space-y-3 rounded-2xl border border-danger/30 bg-danger/10 p-4">
        <p className="text-sm text-danger">{error}</p>
        <Button type="button" variant="secondary" onClick={() => void load()}>
          <RefreshCw className="h-4 w-4" /> Thử lại
        </Button>
      </div>
    )
  }

  return (
    <section
      id="payment-schedule"
      data-testid="payment-schedule-panel"
      className="space-y-4 rounded-2xl border border-border bg-surface p-5"
    >
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-semibold text-fg">Lịch thanh toán</h3>
          <p className="text-xs text-muted">
            Thanh toán qua cổng liên kết; nền tảng không giữ hoặc tự động trừ
            tiền.
          </p>
        </div>
        <span className="rounded-full bg-warning/10 px-2.5 py-1 text-[11px] font-semibold text-warning">
          Mô phỏng sandbox
        </span>
      </header>

      <PaymentProviderPicker
        providers={providers}
        value={selected}
        onChange={setSelected}
        momoMethod={momoMethod}
        onMomoMethodChange={setMomoMethod}
        zalopayMethod={zalopayMethod}
        onZalopayMethodChange={setZalopayMethod}
        brand={brand}
        onBrandChange={setBrand}
        disabled={busyPaymentId !== null}
      />

      {payments.length === 0 ? (
        <p className="rounded-xl border border-border bg-surface-muted p-4 text-sm text-muted">
          Chưa có kỳ thanh toán.
        </p>
      ) : (
        <div className="space-y-2">
          {payments.map(payment => (
            <div
              key={payment._id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border p-3"
            >
              <div>
                <p className="text-sm font-semibold text-fg">
                  {payment.description}
                </p>
                <p className="text-xs text-muted">
                  Hạn {new Date(payment.dueDate).toLocaleDateString('vi-VN')} ·{' '}
                  {payment.amount.toLocaleString('vi-VN')} đ
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-muted">
                  {payment.status}
                </span>
                {payment.status === 'unpaid' || payment.status === 'overdue' ? (
                  <PayButton
                    busy={busyPaymentId === payment._id}
                    disabled={busyPaymentId !== null}
                    limitNote={choiceLimitNote(
                      providers,
                      choice,
                      payment.amount
                    )}
                    onPay={() => void handlePay(payment)}
                  />
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}

      {lastPaymentRef ? (
        <div className="space-y-2 text-xs text-info">
          <p>
            Đã tạo payment intent {lastPaymentRef}; chờ callback sandbox xác
            nhận.
          </p>
          {lastPaymentUrl ? (
            <a
              href={lastPaymentUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-lg border border-border px-3 py-2 font-semibold"
            >
              Mở ngân hàng mô phỏng
            </a>
          ) : null}
        </div>
      ) : null}
      {error ? <p className="text-sm text-danger">{error}</p> : null}
    </section>
  )
}

interface PayButtonProps {
  busy: boolean
  disabled: boolean
  /** Set when the chosen MoMo method cannot cover this amount. */
  limitNote: string | null
  onPay: () => void
}

function PayButton({
  busy,
  disabled,
  limitNote,
  onPay,
}: PayButtonProps): React.ReactElement {
  return (
    <span className="flex flex-col items-end gap-1">
      <Button
        type="button"
        size="sm"
        disabled={disabled || limitNote !== null}
        onClick={onPay}
      >
        {busy ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Banknote className="h-4 w-4" />
        )}
        Thanh toán
      </Button>
      {limitNote ? (
        <span className="text-[10px] text-warning">{limitNote}</span>
      ) : null}
    </span>
  )
}
