'use client'

import * as React from 'react'
import { Button } from '@/shared/ui/button'
import { Textarea } from '@/shared/ui/textarea'
import { appToast } from '@/shared/ui/app-toast'
import type {
  DesignRequest,
  DesignRequestEvent,
} from '../api/design-requests-api'
import {
  DESIGN_REQUEST_EVENT_LABEL,
  DESIGN_REQUEST_ROLE_LABEL,
  DESIGN_REQUEST_STATUS_META,
  designRequestErrorMessage,
  isTerminalDesignRequestStatus,
} from '../model/design-request-status'
import {
  useApproveDesignRequest,
  useCancelDesignRequest,
  useFeedbackDesignRequest,
  useReplyDesignRequest,
} from '../model/use-landlord-design-requests'
import {
  AttachmentPicker,
  AttachmentThumbs,
} from './design-request-attachments'
import {
  DesignRequestPreview,
  type DesignRequestApartmentInfo,
} from './design-request-preview'

const NOTE_MAX = 2000

export function DesignRequestStatusBadge({
  status,
}: {
  status: DesignRequest['status']
}): React.ReactElement {
  const meta = DESIGN_REQUEST_STATUS_META[status]
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${meta.className}`}
    >
      {meta.label}
    </span>
  )
}

function formatDate(value: string): string {
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? ''
    : date.toLocaleString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
}

function Timeline({
  events,
}: {
  events: DesignRequestEvent[]
}): React.ReactElement {
  return (
    <ol aria-label="Dòng thời gian" className="space-y-3">
      {events.map((event, index) => {
        const roleLabel = DESIGN_REQUEST_ROLE_LABEL[event.actorRole]
        const showRevision =
          event.revision > 0 &&
          (event.type === 'delivered' || event.type === 'feedback')
        return (
          <li
            key={`${event.at}-${index}`}
            className="rounded-xl border border-border/60 p-3 text-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-1">
              <span className="font-semibold text-fg">
                {DESIGN_REQUEST_EVENT_LABEL[event.type]}
                {showRevision ? ` (lần ${event.revision})` : ''}
              </span>
              <span className="text-[11px] text-muted">
                {formatDate(event.at)}
              </span>
            </div>
            <p className="text-[11px] text-muted">
              {event.actorName
                ? `${event.actorName} · ${roleLabel}`
                : roleLabel}
            </p>
            {event.note ? (
              <p className="mt-1 whitespace-pre-wrap text-fg">{event.note}</p>
            ) : null}
            <AttachmentThumbs urls={event.attachmentUrls} />
          </li>
        )
      })}
    </ol>
  )
}

interface NoteFormProps {
  label: string
  submitLabel: string
  pending: boolean
  onSubmit: (note: string, urls: string[]) => Promise<void>
  onCancel?: () => void
}

function NoteForm({
  label,
  submitLabel,
  pending,
  onSubmit,
  onCancel,
}: NoteFormProps): React.ReactElement {
  const [note, setNote] = React.useState('')
  const [urls, setUrls] = React.useState<string[]>([])
  const [error, setError] = React.useState<string | null>(null)

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    const trimmed = note.trim()
    if (!trimmed) {
      setError('Vui lòng nhập nội dung.')
      return
    }
    setError(null)
    try {
      await onSubmit(trimmed, urls)
      setNote('')
      setUrls([])
    } catch (err) {
      setError(designRequestErrorMessage(err))
    }
  }

  return (
    <form
      onSubmit={event => void handleSubmit(event)}
      className="space-y-3"
      noValidate
    >
      <div>
        <label htmlFor="design-request-note" className="text-xs font-bold">
          {label}
        </label>
        <Textarea
          id="design-request-note"
          value={note}
          maxLength={NOTE_MAX}
          onChange={event => setNote(event.target.value)}
          className="mt-1 min-h-24"
        />
        <p className="mt-1 text-right text-[11px] text-muted">
          {note.length}/{NOTE_MAX}
        </p>
      </div>
      <AttachmentPicker value={urls} onChange={setUrls} disabled={pending} />
      {error ? (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      ) : null}
      <div className="flex gap-2">
        <Button type="submit" disabled={pending}>
          {submitLabel}
        </Button>
        {onCancel ? (
          <Button type="button" variant="outline" onClick={onCancel}>
            Quay lại
          </Button>
        ) : null}
      </div>
    </form>
  )
}

type Mode = 'idle' | 'approve' | 'feedback' | 'cancel'

interface ActiveViewProps {
  request: DesignRequest
  apartment: DesignRequestApartmentInfo | undefined
}

export function DesignRequestActiveView({
  request,
  apartment,
}: ActiveViewProps): React.ReactElement {
  const [mode, setMode] = React.useState<Mode>('idle')
  const reply = useReplyDesignRequest()
  const approve = useApproveDesignRequest()
  const feedback = useFeedbackDesignRequest()
  const cancel = useCancelDesignRequest()
  const terminal = isTerminalDesignRequestStatus(request.status)

  const run = async (
    action: () => Promise<unknown>,
    success: string
  ): Promise<void> => {
    try {
      await action()
      appToast.success(success)
      setMode('idle')
    } catch (err) {
      appToast.error(designRequestErrorMessage(err))
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <DesignRequestStatusBadge status={request.status} />
        <span className="text-xs text-muted">
          {request.kind === 'edit' ? 'Chỉnh sửa thiết kế' : 'Thiết kế mới'}
        </span>
      </div>

      <section>
        <h3 className="text-xs font-bold text-fg">Yêu cầu của bạn</h3>
        <p className="mt-1 whitespace-pre-wrap text-sm">{request.brief}</p>
        <AttachmentThumbs urls={request.attachmentUrls} />
      </section>

      {request.status === 'delivered' && request.deliveredDesign ? (
        <section className="space-y-2">
          <h3 className="text-xs font-bold text-fg">
            Thiết kế đã bàn giao: {request.deliveredDesign.name}
          </h3>
          <DesignRequestPreview
            apartmentId={request.apartmentId}
            apartment={apartment}
            design={request.deliveredDesign}
          />
        </section>
      ) : null}

      <section>
        <h3 className="mb-2 text-xs font-bold text-fg">Lịch sử xử lý</h3>
        <Timeline events={request.events} />
      </section>

      {request.status === 'needs_info' ? (
        <NoteForm
          label="Nội dung bổ sung"
          submitLabel="Gửi bổ sung"
          pending={reply.isPending}
          onSubmit={async (note, urls) => {
            await reply.mutateAsync({
              id: request.id,
              input: {
                note,
                ...(urls.length > 0 ? { attachmentUrls: urls } : {}),
              },
            })
            appToast.success('Đã gửi thông tin bổ sung.')
          }}
        />
      ) : null}

      {request.status === 'delivered' && mode === 'idle' ? (
        <div className="flex flex-wrap gap-2">
          <Button type="button" onClick={() => setMode('approve')}>
            Đúng ý – Duyệt thiết kế
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setMode('feedback')}
          >
            Chưa ưng ý – Gửi phản hồi
          </Button>
        </div>
      ) : null}

      {request.status === 'delivered' && mode === 'approve' ? (
        <div className="space-y-2 rounded-xl border border-border p-3">
          <p className="text-sm">
            Thiết kế sẽ được công khai trên tin đăng sau khi duyệt. Xác nhận
            duyệt?
          </p>
          <div className="flex gap-2">
            <Button
              type="button"
              disabled={approve.isPending}
              onClick={() =>
                void run(
                  () => approve.mutateAsync(request.id),
                  'Đã duyệt thiết kế.'
                )
              }
            >
              Xác nhận duyệt
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setMode('idle')}
            >
              Quay lại
            </Button>
          </div>
        </div>
      ) : null}

      {request.status === 'delivered' && mode === 'feedback' ? (
        <NoteForm
          label="Nội dung phản hồi"
          submitLabel="Gửi phản hồi"
          pending={feedback.isPending}
          onCancel={() => setMode('idle')}
          onSubmit={async (note, urls) => {
            await feedback.mutateAsync({
              id: request.id,
              input: {
                note,
                ...(urls.length > 0 ? { attachmentUrls: urls } : {}),
              },
            })
            appToast.success('Đã gửi phản hồi cho nhân viên thiết kế.')
            setMode('idle')
          }}
        />
      ) : null}

      {!terminal && mode !== 'cancel' ? (
        <Button
          type="button"
          variant="outline"
          className="border-rose-300 text-rose-600"
          onClick={() => setMode('cancel')}
        >
          Hủy yêu cầu
        </Button>
      ) : null}

      {!terminal && mode === 'cancel' ? (
        <div className="space-y-2 rounded-xl border border-rose-200 p-3">
          <p className="text-sm">Bạn chắc chắn muốn hủy yêu cầu này?</p>
          <div className="flex gap-2">
            <Button
              type="button"
              disabled={cancel.isPending}
              className="bg-rose-600 hover:bg-rose-700"
              onClick={() =>
                void run(
                  () => cancel.mutateAsync(request.id),
                  'Đã hủy yêu cầu.'
                )
              }
            >
              Xác nhận hủy
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setMode('idle')}
            >
              Giữ lại
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
