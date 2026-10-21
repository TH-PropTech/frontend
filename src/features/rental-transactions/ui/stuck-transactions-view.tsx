'use client'

import * as React from 'react'
import { RefreshCw } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import {
  getStuckRentalTransactions,
  isRecoveryAction,
  type RecoveryAction,
  type StuckRentalTransaction,
} from '../api/rental-transactions-api'
import { RecoverActionDialog } from './recover-action-dialog'

export interface StuckTransactionsViewProps {
  initialData?: StuckRentalTransaction[]
}

export function StuckTransactionsView({
  initialData,
}: StuckTransactionsViewProps): React.ReactElement {
  const [rows, setRows] = React.useState(initialData ?? [])
  const [loading, setLoading] = React.useState(initialData === undefined)
  const [error, setError] = React.useState<string | null>(null)
  const [selected, setSelected] = React.useState<{
    contractId: string
    action: RecoveryAction
  } | null>(null)

  const load = React.useCallback(async (): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      setRows(await getStuckRentalTransactions())
    } catch (cause: unknown) {
      setError(
        cause instanceof Error
          ? cause.message
          : 'Không thể tải hàng đợi giao dịch kẹt.'
      )
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    if (initialData !== undefined) return
    const timer = window.setTimeout(() => {
      void load()
    }, 0)
    return () => window.clearTimeout(timer)
  }, [initialData, load])

  return (
    <section
      data-testid="stuck-transactions"
      className="space-y-4 rounded-xl border border-line bg-surface p-5"
    >
      <header className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-fg">
            Giao dịch cần vận hành
          </h2>
          <p className="mt-1 text-xs text-muted">
            Staff/Admin xem mã lý do, ngưỡng và action recovery.
          </p>
        </div>
        <Button
          type="button"
          size="sm"
          variant="secondary"
          loading={loading}
          onClick={() => void load()}
          aria-label="Làm mới giao dịch kẹt"
        >
          <RefreshCw className="h-4 w-4" />
          Làm mới
        </Button>
      </header>
      {error ? (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      ) : null}
      {loading && rows.length === 0 ? (
        <p role="status" className="text-sm text-muted">
          Đang tải hàng đợi...
        </p>
      ) : null}
      {!loading && !error && rows.length === 0 ? (
        <p role="status" className="text-sm text-muted">
          Không có giao dịch kẹt.
        </p>
      ) : null}
      <div className="space-y-3">
        {rows.map((row, index) => {
          const action = isRecoveryAction(row.suggestedAction)
            ? row.suggestedAction
            : null
          return (
            <article
              key={`${row.reasonCode}-${row.aggregateRef ?? index}`}
              className="rounded-lg border border-line bg-surface-muted/30 p-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-fg">
                  {row.reasonCode}
                </span>
                <span className="text-[10px] text-muted">
                  {row.ageMinutes} phút
                </span>
              </div>
              <p className="mt-1 text-xs text-muted">
                Contract: {row.contractId ?? 'Chưa có hợp đồng'}
                {!action ? ` · Gợi ý: ${row.suggestedAction}` : ''}
              </p>
              {action && row.contractId ? (
                <Button
                  type="button"
                  size="sm"
                  className="mt-3"
                  onClick={() =>
                    setSelected({
                      contractId: row.contractId as string,
                      action,
                    })
                  }
                >
                  Mở recovery
                </Button>
              ) : null}
            </article>
          )
        })}
      </div>
      {selected ? (
        <RecoverActionDialog
          contractId={selected.contractId}
          action={selected.action}
          open
          onClose={() => setSelected(null)}
          onRecovered={() => void load()}
        />
      ) : null}
    </section>
  )
}
