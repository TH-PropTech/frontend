'use client'

import { useState, type FormEvent, type ReactElement } from 'react'
import { CheckCircle2, ClipboardList, Loader2 } from 'lucide-react'
import type { MoveInSettlementView } from '@/features/contracts/api/contracts-api'
import { Button } from '@/shared/ui/button'
import { confirmHandover, updateHandover } from '../api/move-in-settlement-api'

export interface MoveInSettlementPanelProps {
  settlement: MoveInSettlementView | null
  role: 'tenant' | 'landlord'
  onRefresh: () => void
  onOpenInvoices: () => void
}

const formatMoney = (amount: number): string =>
  `${new Intl.NumberFormat('vi-VN').format(amount)} đ`

export function MoveInSettlementPanel({
  settlement,
  role,
  onRefresh,
  onOpenInvoices,
}: MoveInSettlementPanelProps): ReactElement {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [handedOverAt, setHandedOverAt] = useState('')
  const [electricity, setElectricity] = useState('')
  const [water, setWater] = useState('')
  const [keyCount, setKeyCount] = useState('')
  const [inventoryReference, setInventoryReference] = useState('')
  const [notes, setNotes] = useState('')

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
  const handleRecord = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    setBusy(true)
    setError(null)
    try {
      await updateHandover(settlement.id, {
        handedOverAt,
        electricity: Number(electricity),
        water: Number(water),
        keyCount: Number(keyCount),
        ...(inventoryReference ? { inventoryReference } : {}),
        ...(notes ? { notes } : {}),
      })
      onRefresh()
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : 'Không ghi được biên bản bàn giao.'
      )
    } finally {
      setBusy(false)
    }
  }

  const handleConfirm = async (): Promise<void> => {
    if (!handover) return
    setBusy(true)
    setError(null)
    try {
      await confirmHandover(settlement.id, handover.handoverHash, role)
      onRefresh()
    } catch (confirmError) {
      setError(
        confirmError instanceof Error
          ? confirmError.message
          : 'Không xác nhận được bàn giao.'
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <section
      data-testid="move-in-settlement-panel"
      className="space-y-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5"
    >
      <header className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-[var(--fg)]">
            Quyết toán nhận nhà
          </h2>
          <p className="mt-1 text-xs text-[var(--muted)]">
            Hạn thanh toán{' '}
            {new Date(settlement.dueAt).toLocaleDateString('vi-VN')}
          </p>
        </div>
        <span className="rounded-full bg-[var(--surface-muted)] px-2.5 py-1 text-[11px] font-semibold text-[var(--warning)]">
          {settlement.status}
        </span>
      </header>
      <ul className="space-y-2">
        {settlement.lines.map((line, index) => (
          <li
            key={`${line.kind}-${line.paymentId ?? index}`}
            className="flex justify-between gap-3 text-xs"
          >
            <span className="text-[var(--muted)]">
              {line.kind.replaceAll('_', ' ')}
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
        <Button type="button" variant="secondary" onClick={onOpenInvoices}>
          Mở hóa đơn cần thanh toán
        </Button>
      ) : null}
      {role === 'landlord' && !handover?.completedAt ? (
        <form
          onSubmit={event => void handleRecord(event)}
          className="grid gap-3 border-t border-[var(--border)] pt-4 sm:grid-cols-2"
        >
          <label className="text-xs">
            Thời gian bàn giao
            <input
              required
              type="datetime-local"
              value={handedOverAt}
              onChange={event => setHandedOverAt(event.target.value)}
              className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2"
            />
          </label>
          <label className="text-xs">
            Chỉ số điện
            <input
              required
              type="number"
              min="0"
              value={electricity}
              onChange={event => setElectricity(event.target.value)}
              className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2"
            />
          </label>
          <label className="text-xs">
            Chỉ số nước
            <input
              required
              type="number"
              min="0"
              value={water}
              onChange={event => setWater(event.target.value)}
              className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2"
            />
          </label>
          <label className="text-xs">
            Số chìa khóa
            <input
              required
              type="number"
              min="0"
              value={keyCount}
              onChange={event => setKeyCount(event.target.value)}
              className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2"
            />
          </label>
          <label className="text-xs sm:col-span-2">
            Mã danh mục tài sản
            <input
              value={inventoryReference}
              onChange={event => setInventoryReference(event.target.value)}
              className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2"
            />
          </label>
          <label className="text-xs sm:col-span-2">
            Ghi chú
            <textarea
              value={notes}
              onChange={event => setNotes(event.target.value)}
              className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2"
            />
          </label>
          <Button type="submit" disabled={busy} className="sm:col-span-2">
            {busy ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ClipboardList className="h-4 w-4" />
            )}
            Ghi biên bản bàn giao
          </Button>
        </form>
      ) : null}
      {handover ? (
        <div className="space-y-2 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] p-3 text-xs">
          <div className="flex items-center justify-between gap-2">
            <strong>Biên bản v{handover.revision}</strong>
            <span className="font-mono text-[var(--muted)]">
              {handover.handoverHash.slice(0, 12)}
            </span>
          </div>
          <p>
            Điện {handover.meterReadings.electricity} · Nước{' '}
            {handover.meterReadings.water} · {handover.keyCount} chìa khóa
          </p>
          <p>
            Tenant:{' '}
            {handover.tenantConfirmation ? 'Đã xác nhận' : 'Chưa xác nhận'} ·
            Landlord:{' '}
            {handover.landlordConfirmation ? 'Đã xác nhận' : 'Chưa xác nhận'}
          </p>
          {handover.completedAt ? (
            <p className="inline-flex items-center gap-1 text-[var(--success)]">
              <CheckCircle2 className="h-4 w-4" />
              Bàn giao hoàn tất
            </p>
          ) : (
            <Button
              type="button"
              variant="secondary"
              disabled={
                busy ||
                Boolean(
                  handover[
                    role === 'tenant'
                      ? 'tenantConfirmation'
                      : 'landlordConfirmation'
                  ]
                )
              }
              onClick={() => void handleConfirm()}
            >
              Xác nhận biên bản
            </Button>
          )}
        </div>
      ) : null}
      {error ? (
        <p role="alert" className="text-xs text-[var(--danger)]">
          {error}
        </p>
      ) : null}
    </section>
  )
}
