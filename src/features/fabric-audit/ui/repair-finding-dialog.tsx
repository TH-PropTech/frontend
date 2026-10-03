'use client'

import * as React from 'react'
import { Button } from '@/shared/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog'
import { useRepairFinding } from '../api/fabric-audit-hooks'
import { describeFabricAuditError } from '../model/error-messages'
import type {
  ReconciliationFinding,
  RepairFindingResponse,
} from '../model/schemas'
import { InlineError } from './panel-states'

const MIN_REASON = 5
const MAX_REASON = 500

export interface RepairFindingDialogProps {
  finding: ReconciliationFinding | null
  onClose: () => void
  onRepaired: (result: RepairFindingResponse) => void
}

/**
 * Repairs go through the validated outbox path only. The reason is mandatory and audited server-side;
 * the dialog stays open on failure so the operator can read the stable error and retry or cancel.
 */
export function RepairFindingDialog({
  finding,
  onClose,
  onRepaired,
}: RepairFindingDialogProps): React.ReactElement {
  const [reason, setReason] = React.useState('')
  const [error, setError] = React.useState<string | null>(null)
  const repair = useRepairFinding()

  const close = (): void => {
    setReason('')
    setError(null)
    onClose()
  }

  const submit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    if (!finding) return
    const trimmed = reason.trim()
    if (trimmed.length < MIN_REASON || trimmed.length > MAX_REASON) {
      setError(`Lý do phải từ ${MIN_REASON} đến ${MAX_REASON} ký tự.`)
      return
    }
    setError(null)
    try {
      const result = await repair.mutateAsync({
        findingId: finding.id,
        reason: trimmed,
      })
      setReason('')
      onRepaired(result)
    } catch (cause) {
      setError(describeFabricAuditError(cause))
    }
  }

  return (
    <Dialog open={finding !== null} onOpenChange={open => !open && close()}>
      <DialogContent>
        <form onSubmit={event => void submit(event)} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Xác nhận sửa phát hiện</DialogTitle>
            <DialogDescription>
              Hệ thống chỉ tạo mới hoặc thử lại tác vụ ghi sổ cái (outbox). Sổ
              cái, mã giao dịch và nhật ký blockchain không bị sửa trực tiếp.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="repair-reason"
              className="text-xs font-medium text-fg"
            >
              Lý do
            </label>
            <textarea
              id="repair-reason"
              rows={4}
              value={reason}
              maxLength={MAX_REASON}
              aria-required="true"
              onChange={event => setReason(event.target.value)}
              className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-fg outline-none focus:border-primary focus:ring-2 focus:ring-primary-soft"
            />
          </div>
          {error ? <InlineError message={error} /> : null}
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={close}>
              Hủy
            </Button>
            <Button type="submit" loading={repair.isPending}>
              Xác nhận sửa
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
