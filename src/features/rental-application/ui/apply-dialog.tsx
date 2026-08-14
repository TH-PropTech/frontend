'use client'

import * as React from 'react'
import { FileText } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog'
import { createRentalApplication } from '../api/rental-application-api'

export function ApplyDialog({
  apartmentId,
}: {
  apartmentId: string
}): React.ReactElement {
  const [open, setOpen] = React.useState(false)
  const [submitting, setSubmitting] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const submit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setSubmitting(true)
    setError(null)
    try {
      await createRentalApplication({
        apartmentId,
        occupants: Number(form.get('occupants')),
        moveInDate: String(form.get('moveInDate')),
        leaseDurationMonths: Number(form.get('leaseDurationMonths')),
        occupation: String(form.get('occupation')),
        hasPets: form.get('hasPets') === 'on',
        ...(String(form.get('notes')).trim()
          ? { notes: String(form.get('notes')).trim() }
          : {}),
      })
      setOpen(false)
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Không thể gửi ứng tuyển'
      )
    } finally {
      setSubmitting(false)
    }
  }
  const fieldClass =
    'mt-1 h-10 w-full rounded-lg border border-border bg-bg px-3 text-sm text-fg'
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <FileText className="h-4 w-4" />
          Ứng tuyển thuê căn
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-surface">
        <DialogHeader>
          <DialogTitle>Hồ sơ ứng tuyển thuê căn</DialogTitle>
          <DialogDescription>
            Gửi các điều kiện thuê dự kiến cho chủ nhà xem xét trước hợp đồng.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-3" onSubmit={event => void submit(event)}>
          <label className="block text-xs text-muted">
            Số người ở
            <input
              required
              aria-label="Số người ở"
              name="occupants"
              type="number"
              min="1"
              max="20"
              className={fieldClass}
            />
          </label>
          <label className="block text-xs text-muted">
            Ngày dự kiến vào ở
            <input
              required
              aria-label="Ngày dự kiến vào ở"
              name="moveInDate"
              type="date"
              className={fieldClass}
            />
          </label>
          <label className="block text-xs text-muted">
            Thời hạn thuê (tháng)
            <input
              required
              aria-label="Thời hạn thuê"
              name="leaseDurationMonths"
              type="number"
              min="1"
              max="60"
              className={fieldClass}
            />
          </label>
          <label className="block text-xs text-muted">
            Nghề nghiệp
            <input
              required
              aria-label="Nghề nghiệp"
              name="occupation"
              maxLength={200}
              className={fieldClass}
            />
          </label>
          <label className="flex items-center gap-2 text-sm text-fg">
            <input name="hasPets" type="checkbox" />
            Có thú cưng
          </label>
          <label className="block text-xs text-muted">
            Ghi chú
            <textarea
              name="notes"
              maxLength={1000}
              className="mt-1 min-h-20 w-full rounded-lg border border-border bg-bg p-3 text-sm text-fg"
            />
          </label>
          {error ? <p className="text-xs text-danger">{error}</p> : null}
          <Button type="submit" loading={submitting}>
            Gửi ứng tuyển
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
