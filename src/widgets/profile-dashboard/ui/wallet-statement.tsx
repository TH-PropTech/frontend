'use client'

import * as React from 'react'
import { Banknote, Loader2, Receipt } from 'lucide-react'
import { usePayableInvoices, useWalletTransactions } from '@/entities/wallet'
import type { WalletStatementItem } from '@/entities/wallet'
import {
  initInvoicePayment,
  isExternalGateway,
  type PaymentInit,
} from '@/features/payments/api/payments-api'
import {
  PaymentProviderPicker,
  choiceLimitNote,
  usePaymentProviders,
} from '@/features/payments/ui/payment-provider-picker'
import { Button } from '@/shared/ui/button'
import { describeWalletError, formatVnd } from './wallet-error'

const TYPE_LABEL: Record<WalletStatementItem['type'], string> = {
  payout: 'Nhận tiền thuê',
  'platform-fee': 'Trả phí sàn',
}

export function WalletInvoices(): React.ReactElement | null {
  const invoices = usePayableInvoices()
  const [busyPaymentId, setBusyPaymentId] = React.useState<string | null>(null)
  const [paymentRequest, setPaymentRequest] =
    React.useState<PaymentInit | null>(null)
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null)
  const {
    providers,
    selected,
    setSelected,
    momoMethod,
    setMomoMethod,
    brand,
    setBrand,
    choice,
  } = usePaymentProviders()

  if (!invoices.data?.length) return null

  const handlePay = async (paymentId: string) => {
    setBusyPaymentId(paymentId)
    setErrorMsg(null)
    setPaymentRequest(null)
    try {
      const init = await initInvoicePayment(paymentId, choice)
      if (isExternalGateway(init) && init.deepLink) {
        window.location.assign(init.deepLink)
        return
      }
      setPaymentRequest(init)
    } catch (err: unknown) {
      setErrorMsg(describeWalletError(err))
    } finally {
      setBusyPaymentId(null)
    }
  }

  return (
    <section aria-label="Hóa đơn phí sàn" className="space-y-2">
      <h3 className="text-sm font-bold text-fg">Hóa đơn phí sàn cần trả</h3>
      <p className="text-xs text-muted">
        Trả hóa đơn qua cổng thanh toán liên kết; nền tảng không trừ số dư.
      </p>
      <PaymentProviderPicker
        providers={providers}
        value={selected}
        onChange={setSelected}
        momoMethod={momoMethod}
        onMomoMethodChange={setMomoMethod}
        brand={brand}
        onBrandChange={setBrand}
        disabled={busyPaymentId !== null}
      />
      {errorMsg ? (
        <p role="alert" className="text-sm text-danger">
          {errorMsg}
        </p>
      ) : null}
      <ul className="space-y-2">
        {invoices.data.map(invoice => {
          const paying = busyPaymentId === invoice.paymentId
          const limitNote = choiceLimitNote(providers, choice, invoice.amount)
          return (
            <li
              key={invoice.paymentId}
              className="flex flex-col gap-2 rounded-xl border border-border bg-surface-raised p-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="flex items-center gap-2 text-sm font-semibold text-fg">
                  <Receipt className="h-4 w-4" aria-hidden="true" />
                  {formatVnd(invoice.amount)}
                </p>
                <p className="text-xs text-muted">
                  {invoice.description} · gồm VAT {formatVnd(invoice.vatAmount)}{' '}
                  · hạn {new Date(invoice.dueDate).toLocaleDateString('vi-VN')}
                </p>
                {limitNote ? (
                  <p className="text-xs text-warning">{limitNote}</p>
                ) : null}
              </div>
              <Button
                size="sm"
                disabled={busyPaymentId !== null || limitNote !== null}
                onClick={() => void handlePay(invoice.paymentId)}
              >
                {paying ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Banknote className="h-4 w-4" />
                )}
                Trả hóa đơn
              </Button>
            </li>
          )
        })}
      </ul>
      {paymentRequest ? (
        <div className="space-y-2 rounded-lg border border-border bg-surface-muted p-3 text-xs">
          <p className="text-muted">
            Mã giao dịch:{' '}
            <span className="font-mono text-fg">{paymentRequest.txRef}</span>
          </p>
          {paymentRequest.deepLink ? (
            <a
              href={paymentRequest.deepLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-lg border border-border px-3 py-2 font-semibold text-fg"
            >
              Mở cổng thanh toán
            </a>
          ) : null}
        </div>
      ) : null}
    </section>
  )
}

export function WalletStatement(): React.ReactElement {
  const transactions = useWalletTransactions()
  const items = transactions.data?.items ?? []

  return (
    <section aria-label="Sao kê ví" className="space-y-2">
      <h3 className="text-sm font-bold text-fg">Sao kê gần đây</h3>
      {transactions.isLoading ? (
        <p className="text-sm text-muted">Đang tải sao kê…</p>
      ) : null}
      {!transactions.isLoading && items.length === 0 ? (
        <p className="text-sm text-muted">Chưa có giao dịch nào.</p>
      ) : null}
      <ul className="space-y-2">
        {items.map(item => {
          const isOut = item.type === 'platform-fee'
          return (
            <li
              key={`${item.refType}-${item.refId}`}
              className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface-raised p-3"
            >
              <div>
                <p className="text-sm font-semibold text-fg">
                  {TYPE_LABEL[item.type]}
                </p>
                <p className="text-xs text-muted">
                  {new Date(item.createdAt).toLocaleString('vi-VN')} ·{' '}
                  {item.description}
                </p>
              </div>
              <span
                className={
                  isOut ? 'font-bold text-danger' : 'font-bold text-success'
                }
              >
                {isOut ? '−' : '+'}
                {formatVnd(item.amount)}
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
