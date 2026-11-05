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
import { Input } from '@/shared/ui/input'
import { Textarea } from '@/shared/ui/textarea'
import {
  CHANGE_REQUEST_CUSTOM_CLAUSES_MAX,
  CHANGE_REQUEST_FIELD_OPTIONS,
  parseChangeInput,
} from '../lib/change-request-labels'
import { getAmendmentFieldLabel } from '../lib/contract-labels'

export interface ChangeRequestDraft {
  changes: Array<{ field: string; after: number | string }>
  reason: string
}

export interface ChangeRequestDialogProps {
  open: boolean
  busy: boolean
  error: string | null
  onOpenChange: (open: boolean) => void
  onSubmit: (draft: ChangeRequestDraft) => void
}

export function ChangeRequestDialog({
  open,
  busy,
  error,
  onOpenChange,
  onSubmit,
}: ChangeRequestDialogProps): React.JSX.Element {
  const [field, setField] = React.useState<string>(
    CHANGE_REQUEST_FIELD_OPTIONS[0].field
  )
  const [value, setValue] = React.useState('')
  const [reason, setReason] = React.useState('')
  const option =
    CHANGE_REQUEST_FIELD_OPTIONS.find(item => item.field === field) ??
    CHANGE_REQUEST_FIELD_OPTIONS[0]
  const parsed = parseChangeInput(option.kind, value)
  const canSubmit = !busy && parsed !== undefined && reason.trim().length > 0

  const handleSubmit = (): void => {
    if (parsed === undefined) return
    onSubmit({ changes: [{ field, after: parsed }], reason: reason.trim() })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-testid="change-request-dialog">
        <DialogHeader>
          <DialogTitle>Yêu cầu chỉnh sửa hợp đồng</DialogTitle>
          <DialogDescription>
            Bên còn lại phải đồng ý thì nội dung mới được cập nhật. Bạn không
            sửa trực tiếp được hợp đồng.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <label className="block space-y-1 text-xs font-semibold">
            Nội dung muốn đổi
            <select
              data-testid="change-request-field"
              className="h-9 w-full rounded-md border border-border bg-surface px-2 text-sm"
              value={field}
              onChange={event => {
                setField(event.target.value)
                setValue('')
              }}
            >
              {CHANGE_REQUEST_FIELD_OPTIONS.map(item => (
                <option key={item.field} value={item.field}>
                  {getAmendmentFieldLabel(item.field)}
                </option>
              ))}
            </select>
          </label>

          <label className="block space-y-1 text-xs font-semibold">
            Giá trị mới
            {option.kind === 'text' ? (
              <Textarea
                data-testid="change-request-value"
                rows={4}
                maxLength={CHANGE_REQUEST_CUSTOM_CLAUSES_MAX}
                value={value}
                onChange={event => setValue(event.target.value)}
              />
            ) : (
              <Input
                data-testid="change-request-value"
                type="number"
                value={value}
                onChange={event => setValue(event.target.value)}
              />
            )}
          </label>
          {option.needsConsent ? (
            <p className="text-[11px] text-muted">
              Nội dung này ảnh hưởng đến quyền lợi của hai bên nên chỉ đổi khi
              bên còn lại đồng ý.
            </p>
          ) : null}

          <label className="block space-y-1 text-xs font-semibold">
            Lý do
            <Textarea
              data-testid="change-request-reason"
              rows={3}
              maxLength={500}
              value={reason}
              onChange={event => setReason(event.target.value)}
            />
          </label>

          {error ? (
            <p role="alert" className="text-xs text-destructive">
              {error}
            </p>
          ) : null}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={busy}
          >
            Đóng
          </Button>
          <Button
            data-testid="change-request-submit"
            onClick={handleSubmit}
            disabled={!canSubmit}
          >
            {busy ? 'Đang gửi...' : 'Gửi yêu cầu'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
