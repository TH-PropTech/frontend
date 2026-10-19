'use client'

import * as React from 'react'
import { Banknote, Loader2, Receipt } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { usePayableInvoices, useWalletTransactions } from '@/entities/wallet'
import type { WalletStatementItem } from '@/entities/wallet'
import {
  initInvoicePayment,
  type PaymentChoice,
  type PaymentInit,
} from '@/features/payments/api/payments-api'
import {
  PaymentProviderPicker,
  choiceLimitNote,
  usePaymentProviders,
} from '@/features/payments/ui/payment-provider-picker'
import { Button } from '@/shared/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog'
import { describeWalletError, formatVnd } from './wallet-error'

const TYPE_LABEL: Record<WalletStatementItem['type'], string> = {
  payout: 'Nhận tiền thuê',
  'platform-fee': 'Trả phí sàn',
}

const INVOICE_POLL_MS = 4000

export function WalletInvoices(): React.ReactElement | null {
  const [busyPaymentId, setBusyPaymentId] = React.useState<string | null>(null)
  const [paymentRequest, setPaymentRequest] =
    React.useState<PaymentInit | null>(null)
  const [payingInvoiceId, setPayingInvoiceId] = React.useState<string | null>(
    null
  )
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null)
  // Poll only while the QR dialog is open so the row flips to paid.
  const invoices = usePayableInvoices({
    refetchIntervalMs: paymentRequest ? INVOICE_POLL_MS : false,
  })
  const {
    providers,
    selected,
    setSelected,
    momoMethod,
    setMomoMethod,
    brand,
    setBrand,
    choice,
  } = usePaymentProviders('invoice')

  // The invoice endpoint only offers Ví Mộc, so the picker is hidden then.
  const hasGatewayChoice = providers.length > 1
  const invoiceChoice: PaymentChoice = hasGatewayChoice
    ? choice
    : { provider: 'mocbank' }

  const closeDialog = (): void => {
    setPaymentRequest(null)
    setPayingInvoiceId(null)
  }

  // Invoice no longer payable => it was paid; close the dialog.
  const stillPayable =
    payingInvoiceId === null ||
    (invoices.data ?? []).some(i => i.paymentId === payingInvoiceId)

  if (!invoices.data?.length && !paymentRequest) return null

  const handlePay = async (paymentId: string, amount: number) => {
    setBusyPaymentId(paymentId)
    setErrorMsg(null)
    setPaymentRequest(null)
    try {
      const init = await initInvoicePayment(paymentId, invoiceChoice)
      setPayingInvoiceId(paymentId)
      setPaymentRequest({ ...init, amount: init.amount ?? amount })
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
        Quét mã QR bằng Ví Mộc để trả phí hoa hồng cho sàn; nền tảng không trừ
        số dư.
      </p>
      {hasGatewayChoice ? (
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
      ) : null}
      {errorMsg ? (
        <p role="alert" className="text-sm text-danger">
          {errorMsg}
        </p>
      ) : null}
      <ul className="space-y-2">
        {(invoices.data ?? []).map(invoice => {
          const paying = busyPaymentId === invoice.paymentId
          const limitNote = choiceLimitNote(
            providers,
            invoiceChoice,
            invoice.amount
          )
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
                onClick={() =>
                  void handlePay(invoice.paymentId, invoice.amount)
                }
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
      <Dialog
        open={paymentRequest !== null && stillPayable}
        onOpenChange={open => {
          if (!open) closeDialog()
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thanh toán phí hoa hồng</DialogTitle>
            <DialogDescription>
              Quét mã bằng Ví Mộc để thanh toán phí hoa hồng cho sàn
            </DialogDescription>
          </DialogHeader>
          {paymentRequest ? (
            <div className="flex flex-col items-center gap-3 text-center">
              <div
                className="rounded-xl bg-white p-3"
                data-testid="invoice-qr"
                data-value={paymentRequest.deepLink}
              >
                <QRCodeSVG value={paymentRequest.deepLink} size={192} />
              </div>
              <p className="text-lg font-bold text-fg">
                {formatVnd(paymentRequest.amount)}
              </p>
              <p className="text-xs text-muted">
                Mã giao dịch:{' '}
                <span className="font-mono text-fg">
                  {paymentRequest.txRef}
                </span>
              </p>
              <a
                href={paymentRequest.deepLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-lg border border-border px-3 py-2 text-sm font-semibold text-fg"
              >
                Mở Ví Mộc
              </a>
              <p className="text-xs text-muted">
                Đang chờ thanh toán… hóa đơn sẽ tự cập nhật khi hoàn tất.
              </p>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
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
