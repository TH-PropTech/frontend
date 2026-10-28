import * as React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog'

export interface RejectBookingDialogProps {
  open: boolean
  reason: string
  busy: boolean
  onReasonChange: (reason: string) => void
  onConfirm: () => void
  onCancel: () => void
}

export function RejectBookingDialog({
  open,
  reason,
  busy,
  onReasonChange,
  onConfirm,
  onCancel,
}: RejectBookingDialogProps): React.ReactElement {
  return (
    <Dialog
      open={open}
      onOpenChange={nextOpen => {
        if (!nextOpen) onCancel()
      }}
    >
      <DialogContent className="max-w-md rounded-3xl border border-border bg-white p-6 text-left shadow-lg">
        <DialogHeader>
          <DialogTitle className="font-marketing text-lg font-bold text-fg">
            Từ chối lịch hẹn
          </DialogTitle>
          <DialogDescription className="font-body text-xs text-muted">
            Vui lòng nhập lý do từ chối lịch hẹn xem phòng này.
          </DialogDescription>
        </DialogHeader>
        <div className="py-2">
          <textarea
            aria-label="Lý do từ chối"
            value={reason}
            onChange={event => onReasonChange(event.target.value)}
            placeholder="Lý do từ chối..."
            className="min-h-24 w-full rounded-xl border border-border bg-white p-3 font-body text-xs text-fg focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <DialogFooter className="mt-2 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="min-h-11 cursor-pointer rounded-xl border border-border px-4 text-xs text-fg hover:bg-surface-muted"
          >
            Hủy bỏ
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            className="min-h-11 cursor-pointer rounded-xl bg-primary px-4 text-xs font-bold text-white hover:bg-primary-hover disabled:opacity-50"
          >
            Xác nhận từ chối
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
