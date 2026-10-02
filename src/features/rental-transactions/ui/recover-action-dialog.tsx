'use client'

import * as React from 'react'
import { Button } from '@/shared/ui/button'
import {
  recoverRentalTransaction,
  type RecoveryAction,
  type RecoverRentalTransactionResult,
} from '../api/rental-transactions-api'

export interface RecoverActionDialogProps {
  contractId: string
  action: RecoveryAction
  open: boolean
  onClose: () => void
  onRecovered?: (result: RecoverRentalTransactionResult) => void
}

export function RecoverActionDialog({
  contractId,
  action,
  open,
  onClose,
  onRecovered,
}: RecoverActionDialogProps): React.ReactElement | null {
  const [reason, setReason] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  if (!open) return null

  const submit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    if (reason.trim().length < 5) {
      setError('Vui lòng nhập lý do tối thiểu 5 ký tự.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const result = await recoverRentalTransaction(contractId, {
        action,
        reason: reason.trim(),
      })
      onRecovered?.(result)
      setReason('')
      onClose()
    } catch (cause: unknown) {
      setError(
        cause instanceof Error ? cause.message : 'Không thể thực hiện recovery.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="recover-dialog-title"
      className="fixed inset-0 z-50 grid place-items-center bg-fg/40 p-4"
    >
      <form
        onSubmit={event => void submit(event)}
        className="w-full max-w-md space-y-4 rounded-xl border border-line bg-surface p-5 shadow-xl"
      >
        <div>
          <h2 id="recover-dialog-title" className="text-base font-bold text-fg">
            Khôi phục giao dịch
          </h2>
          <p className="mt-1 text-xs text-muted">
            Action: {action}. Recovery luôn cần lý do để audit.
          </p>
        </div>
        <label className="block space-y-1 text-xs font-semibold text-fg">
          Lý do
          <textarea
            value={reason}
            onChange={event => setReason(event.target.value)}
            aria-required="true"
            rows={4}
            className="w-full rounded-lg border border-line bg-surface-muted/30 p-3 text-sm font-normal text-fg outline-none focus:border-primary"
          />
        </label>
        {error ? (
          <p role="alert" className="text-sm text-danger">
            {error}
          </p>
        ) : null}
        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Hủy
          </Button>
          <Button type="submit" loading={loading}>
            Xác nhận recovery
          </Button>
        </div>
      </form>
    </div>
  )
}
