'use client'

import { Loader2, Receipt } from 'lucide-react'
import {
  usePayableInvoices,
  usePayInvoiceFromWallet,
  useWalletTransactions,
  type WalletTransactionType,
} from '@/entities/wallet'
import { Button } from '@/shared/ui/button'
import { describeWalletError, formatVnd } from './wallet-error'

const TYPE_LABEL: Record<WalletTransactionType, string> = {
  'payout-credit': 'Nhận tiền thuê',
  'platform-fee-debit': 'Trả phí sàn',
  'platform-fee-refund': 'Hoàn tiền',
}

export function WalletInvoices({
  balance,
}: {
  balance: number
}): React.ReactElement | null {
  const invoices = usePayableInvoices()
  const pay = usePayInvoiceFromWallet()
  if (!invoices.data?.length) return null

  return (
    <section aria-label="Hóa đơn phí sàn" className="space-y-2">
      <h3 className="text-sm font-bold text-fg">Hóa đơn phí sàn cần trả</h3>
      {pay.isError ? (
        <p role="alert" className="text-sm text-danger">
          {describeWalletError(pay.error)}
        </p>
      ) : null}
      <ul className="space-y-2">
        {invoices.data.map(invoice => {
          const enough = balance >= invoice.amount
          const paying = pay.isPending && pay.variables === invoice.paymentId
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
                {!enough ? (
                  <p className="text-xs text-warning">Số dư chưa đủ.</p>
                ) : null}
              </div>
              <Button
                size="sm"
                disabled={!enough || pay.isPending}
                onClick={() => pay.mutate(invoice.paymentId)}
              >
                {paying ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Trả bằng số dư ví
              </Button>
            </li>
          )
        })}
      </ul>
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
          const isOut = item.type === 'platform-fee-debit'
          return (
            <li
              key={item._id}
              className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface-raised p-3"
            >
              <div>
                <p className="text-sm font-semibold text-fg">
                  {TYPE_LABEL[item.type]}
                </p>
                <p className="text-xs text-muted">
                  {new Date(item.createdAt).toLocaleString('vi-VN')} · Số dư{' '}
                  {formatVnd(item.balanceAfter)}
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
