'use client'

import { useState, type ReactElement } from 'react'
import { ClipboardList, Loader2 } from 'lucide-react'
import type {
  HandoverInput,
  MoveInSettlementView,
} from '@/features/contracts/api/contracts-api'
import { Button } from '@/shared/ui/button'
import type { UtilityRatesView } from '@/entities/legal-source'
import {
  confirmHandover,
  initSettlementPayment,
  reportHandoverDiscrepancy,
  updateHandover,
} from '../api/move-in-settlement-api'
import {
  getHandoverErrorMessage,
  getSettlementLineLabel,
  getSettlementStatusLabel,
} from '../lib/move-in-labels'
import { HandoverRecordForm } from './handover-record-form'
import { HandoverRecordView } from './handover-record-view'

export interface MoveInSettlementPanelProps {
  settlement: MoveInSettlementView | null
  role: 'tenant' | 'landlord'
  /** Cọc đã xác nhận (ký hợp đồng + chuyển cọc) — đủ để mở biên bản bàn giao, không cần chờ quyết toán nhận nhà. */
  depositConfirmed: boolean
  onRefresh: () => void
  onOpenInvoices: () => void
  /** Đơn giá điện nước trong hợp đồng; hợp đồng cũ không có. */
  utilityRates?: UtilityRatesView | undefined
}

const formatMoney = (amount: number): string =>
  `${new Intl.NumberFormat('vi-VN').format(amount)} đ`

export function MoveInSettlementPanel({
  settlement,
  role,
  depositConfirmed,
  onRefresh,
  onOpenInvoices,
  utilityRates,
}: MoveInSettlementPanelProps): ReactElement {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [paymentRequest, setPaymentRequest] = useState<{
    txRef: string
    deepLink: string
    expiresAt: string
  } | null>(null)

  if (!settlement) {
    return (
      <section
        data-testid="move-in-settlement-empty"
        className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 text-sm text-[var(--muted)]"
      >
        Hợp đồng này chưa có quyết toán nhận nhà.
      </section>
    )
  }

  const handover = settlement.handover
  const run = async (
    action: () => Promise<unknown>,
    fallback: string,
    refresh = true
  ): Promise<void> => {
    setBusy(true)
    setError(null)
    try {
      await action()
      if (refresh) onRefresh()
    } catch (actionError) {
      setError(getHandoverErrorMessage(actionError, fallback))
    } finally {
      setBusy(false)
    }
  }

  const handleRecord = (input: HandoverInput): void =>
    void run(
      () => updateHandover(settlement.id, input),
      'Không ghi được biên bản bàn giao.'
    )
  const handleConfirm = (): void => {
    if (!handover) return
    void run(
      () => confirmHandover(settlement.id, handover.handoverHash, role),
      'Không xác nhận được biên bản bàn giao.'
    )
  }
  const handleReport = (note: string): void => {
    if (!handover) return
    void run(
      () =>
        reportHandoverDiscrepancy(settlement.id, handover.handoverHash, note),
      'Không gửi được phản hồi sai lệch.'
    )
  }
  const handleSettlementPayment = (): void =>
    void run(
      async () => {
        setPaymentRequest(await initSettlementPayment(settlement.id))
        onOpenInvoices()
      },
      'Không tạo được yêu cầu thanh toán.',
      false
    )

  const canRecord =
    role === 'landlord' &&
    (settlement.status === 'paid' || depositConfirmed) &&
    !handover?.completedAt

  return (
    <section
      data-testid="move-in-settlement-panel"
      className="space-y-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5"
    >
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-[var(--fg)]">
            Quyết toán nhận nhà
          </h2>
          <p className="mt-1 text-xs text-[var(--muted)]">
            Hạn thanh toán{' '}
            {new Date(settlement.dueAt).toLocaleDateString('vi-VN')}
          </p>
        </div>
        <span className="shrink-0 whitespace-nowrap rounded-full bg-[var(--surface-muted)] px-2.5 py-1 text-[11px] font-semibold text-[var(--warning)]">
          {getSettlementStatusLabel(settlement.status)}
        </span>
      </header>
      <ul className="space-y-2">
        {settlement.lines.map((line, index) => (
          <li
            key={`${line.kind}-${line.paymentId ?? index}`}
            className="flex justify-between gap-3 text-xs"
          >
            <span className="text-[var(--muted)]">
              {getSettlementLineLabel(line.kind)}
            </span>
            <strong className="text-[var(--fg)]">
              {formatMoney(line.amount)}
            </strong>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between border-t border-[var(--border)] pt-3 text-sm">
        <strong>Tổng quyết toán</strong>
        <strong>{formatMoney(settlement.total)}</strong>
      </div>
      {role === 'tenant' && settlement.status !== 'paid' ? (
        <Button
          type="button"
          variant="secondary"
          className="min-h-11"
          disabled={busy}
          onClick={handleSettlementPayment}
        >
          {busy ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ClipboardList className="h-4 w-4" />
          )}
          Tạo yêu cầu thanh toán
        </Button>
      ) : null}
      {paymentRequest ? (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] p-3 text-xs">
          <p className="text-[var(--muted)]">
            Mã giao dịch {paymentRequest.txRef} · hết hạn{' '}
            {new Date(paymentRequest.expiresAt).toLocaleString('vi-VN')}
          </p>
          <a
            href={paymentRequest.deepLink}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex min-h-11 items-center rounded-lg border border-[var(--border)] px-3 py-2 font-semibold text-[var(--fg)]"
          >
            Mở cổng thanh toán
          </a>
        </div>
      ) : null}
      {handover ? (
        <HandoverRecordView
          settlementId={settlement.id}
          handover={handover}
          role={role}
          busy={busy}
          onConfirm={handleConfirm}
          onReportDiscrepancy={handleReport}
          utilityRates={utilityRates}
        />
      ) : null}
      {canRecord && !handover ? (
        <HandoverRecordForm
          busy={busy}
          isRevision={false}
          utilityRates={utilityRates}
          onSubmit={handleRecord}
        />
      ) : null}
      {canRecord && handover ? (
        <details className="text-xs">
          <summary className="min-h-11 cursor-pointer py-2 font-semibold text-[var(--fg)]">
            Sửa biên bản (tạo bản mới, khách thuê xác nhận lại)
          </summary>
          <HandoverRecordForm
            busy={busy}
            isRevision
            utilityRates={utilityRates}
            onSubmit={handleRecord}
          />
        </details>
      ) : null}
      {error ? (
        <p role="alert" className="text-xs text-[var(--danger)]">
          {error}
        </p>
      ) : null}
    </section>
  )
}
