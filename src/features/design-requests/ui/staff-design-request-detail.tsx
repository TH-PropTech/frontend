'use client'

import * as React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Box } from 'lucide-react'
import { ApiClientError, apiClient, readApiErrorCode } from '@/shared/api'
import { appToast } from '@/shared/ui/app-toast'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Textarea } from '@/shared/ui/textarea'
import {
  ApartmentDesignsManager,
  listAdminDesigns,
  type DesignableApartment,
} from '@/features/apartment-floorplan'
import type {
  DesignRequest,
  DesignRequestEvent,
} from '../api/design-requests-api'
import {
  STAFF_EVENT_LABELS,
  STAFF_KIND_LABELS,
  STAFF_ROLE_LABELS,
  STAFF_STATUS_LABELS,
  STAFF_STATUS_TONE,
} from '../model/staff-design-request-labels'
import {
  useDeliverDesignRequest,
  useDesignRequestDetail,
  useRejectDesignRequest,
  useRequestInfoDesignRequest,
  useStartDesignRequest,
} from '../model/staff-design-requests'

type OnDone = (error: unknown, success?: string) => void

const dateTime = (iso: string): string => new Date(iso).toLocaleString('vi-VN')

function describeError(error: unknown): { message: string; stale: boolean } {
  const code = readApiErrorCode(error)
  if (code === 'DESIGN_REQUEST_INVALID_STATE') {
    return { message: 'Yêu cầu đã đổi trạng thái, đang tải lại…', stale: true }
  }
  if (code === 'DESIGN_REQUEST_NOT_ASSIGNEE') {
    return {
      message:
        'Yêu cầu này do đồng nghiệp khác nhận. Chỉ người nhận mới giao được thiết kế.',
      stale: true,
    }
  }
  if (code === 'DESIGN_NOT_FOUND') {
    return {
      message: 'Không tìm thấy thiết kế đã chọn. Vui lòng chọn lại.',
      stale: false,
    }
  }
  if (error instanceof ApiClientError && error.status === 403) {
    return {
      message: 'Bạn không có quyền thực hiện thao tác này.',
      stale: false,
    }
  }
  return {
    message:
      error instanceof Error && error.message
        ? error.message
        : 'Thao tác thất bại. Vui lòng thử lại.',
    stale: false,
  }
}

function Attachments({ urls }: { urls: string[] }): React.ReactElement | null {
  if (!urls.length) return null
  return (
    <ul className="mt-2 flex flex-wrap gap-2">
      {urls.map(url => (
        <li key={url}>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <img
              src={url}
              alt="Ảnh đính kèm"
              className="h-16 w-16 rounded-lg border border-line object-cover"
            />
          </a>
        </li>
      ))}
    </ul>
  )
}

function Timeline({
  events,
}: {
  events: DesignRequestEvent[]
}): React.ReactElement {
  return (
    <ol className="space-y-3" aria-label="Lịch sử yêu cầu">
      {events.map((event, index) => (
        <li
          key={`${event.at}-${index}`}
          className="rounded-xl border border-line bg-surface p-3"
          data-testid="design-request-event"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-semibold text-fg">
              {STAFF_EVENT_LABELS[event.type]}
            </span>
            <span className="text-muted">
              {dateTime(event.at)} · Vòng {event.revision}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-muted">
            {event.actorName ?? 'Không rõ'} ·{' '}
            {STAFF_ROLE_LABELS[event.actorRole]}
          </p>
          {event.note ? (
            <p className="mt-2 whitespace-pre-wrap text-sm text-fg">
              {event.note}
            </p>
          ) : null}
          <Attachments urls={event.attachmentUrls} />
        </li>
      ))}
    </ol>
  )
}

type NoteMode = 'info' | 'reject' | null

function TriageActions({
  request,
  onDone,
}: {
  request: DesignRequest
  onDone: OnDone
}): React.ReactElement {
  const [mode, setMode] = React.useState<NoteMode>(null)
  const [note, setNote] = React.useState('')
  const requestInfo = useRequestInfoDesignRequest()
  const reject = useRejectDesignRequest()
  const busy = requestInfo.isPending || reject.isPending
  const trimmed = note.trim()
  const isSubmitted = request.status === 'submitted'
  // 'escalated' chỉ còn ở dữ liệu cũ: vẫn cho từ chối.
  const canReject = isSubmitted || request.status === 'escalated'

  const open = (next: NoteMode): void => {
    setMode(next)
    setNote('')
  }

  const submit = async (): Promise<void> => {
    try {
      if (mode === 'info') {
        await requestInfo.mutateAsync({
          id: request.id,
          input: { note: trimmed },
        })
        onDone(null, 'Đã gửi yêu cầu bổ sung cho chủ nhà.')
      } else if (mode === 'reject') {
        await reject.mutateAsync({ id: request.id, input: { note: trimmed } })
        onDone(null, 'Đã từ chối yêu cầu.')
      }
      setMode(null)
      setNote('')
    } catch (error) {
      onDone(error)
    }
  }

  const submitLabel =
    mode === 'info' ? 'Gửi yêu cầu bổ sung' : 'Xác nhận từ chối'

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {isSubmitted ? (
          <Button
            type="button"
            size="sm"
            variant={mode === 'info' ? 'default' : 'secondary'}
            onClick={() => open('info')}
          >
            Yêu cầu bổ sung
          </Button>
        ) : null}
        {canReject ? (
          <Button
            type="button"
            size="sm"
            variant={mode === 'reject' ? 'danger' : 'secondary'}
            onClick={() => open('reject')}
          >
            Từ chối
          </Button>
        ) : null}
      </div>
      {mode ? (
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-fg">
            Ghi chú (bắt buộc)
            <Textarea
              className="mt-1"
              value={note}
              onChange={event => setNote(event.target.value)}
              maxLength={2000}
              aria-label="Ghi chú"
            />
          </label>
          <div className="flex gap-2">
            <Button
              type="button"
              size="sm"
              variant={mode === 'reject' ? 'danger' : 'default'}
              loading={busy}
              disabled={!trimmed}
              onClick={() => void submit()}
            >
              {submitLabel}
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              disabled={busy}
              onClick={() => setMode(null)}
            >
              Hủy
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

interface ManagedApartment extends DesignableApartment {
  location?: string
}

function DesignerLauncher({
  apartmentId,
}: {
  apartmentId: string
}): React.ReactElement {
  const [apartment, setApartment] = React.useState<ManagedApartment | null>(
    null
  )
  const [failed, setFailed] = React.useState(false)

  const launch = async (): Promise<void> => {
    setFailed(false)
    try {
      const list = await apiClient.get<ManagedApartment[]>('/apartments/manage')
      const found = list.find(item => item.id === apartmentId)
      if (found) setApartment(found)
      else setFailed(true)
    } catch {
      setFailed(true)
    }
  }

  return (
    <div className="space-y-2">
      <Button
        type="button"
        size="sm"
        variant="secondary"
        onClick={() => void launch()}
      >
        <Box className="h-4 w-4" aria-hidden="true" />
        Mở trình thiết kế 3D
      </Button>
      <p className="text-[11px] text-muted">
        Tạo thiết kế mới ở trạng thái ẩn (không bật hiển thị), sau đó chọn thiết
        kế đó để giao cho chủ nhà.
      </p>
      {failed ? (
        <p role="alert" className="text-xs text-danger">
          Không tải được dữ liệu căn hộ để mở trình thiết kế.
        </p>
      ) : null}
      {apartment ? (
        <ApartmentDesignsManager
          apartment={apartment}
          onClose={() => setApartment(null)}
        />
      ) : null}
    </div>
  )
}

function DeliverForm({
  request,
  onDone,
}: {
  request: DesignRequest
  onDone: OnDone
}): React.ReactElement {
  const deliver = useDeliverDesignRequest()
  const [selected, setSelected] = React.useState<string | null>(null)
  const [note, setNote] = React.useState('')
  const designsQuery = useQuery({
    queryKey: ['design-requests', 'admin-designs', request.apartmentId],
    queryFn: () => listAdminDesigns(request.apartmentId),
    refetchOnWindowFocus: true,
  })
  const designs = designsQuery.data

  const defaultId = React.useMemo(() => {
    const hidden = (designs ?? [])
      .filter(design => !design.visible)
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    return hidden[0]?.id ?? ''
  }, [designs])
  const designId = selected ?? defaultId

  const submit = async (): Promise<void> => {
    if (!designId) return
    const trimmed = note.trim()
    try {
      await deliver.mutateAsync({
        id: request.id,
        input: trimmed ? { designId, note: trimmed } : { designId },
      })
      onDone(null, 'Đã giao thiết kế cho chủ nhà.')
    } catch (error) {
      onDone(error)
    }
  }

  return (
    <div className="space-y-3">
      <DesignerLauncher apartmentId={request.apartmentId} />
      <div className="space-y-2">
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => void designsQuery.refetch()}
        >
          Tải lại danh sách thiết kế
        </Button>
        <label className="block text-xs font-semibold text-fg">
          Thiết kế giao cho chủ nhà
          <select
            className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm"
            value={designId}
            onChange={event => setSelected(event.target.value)}
            disabled={designsQuery.isPending}
          >
            <option value="">— Chọn thiết kế —</option>
            {(designs ?? []).map(design => (
              <option key={design.id} value={design.id}>
                {design.name} · {design.visible ? 'Đang hiện' : 'Đang ẩn'} ·{' '}
                {dateTime(design.updatedAt)}
              </option>
            ))}
          </select>
        </label>
        {designsQuery.isError ? (
          <p role="alert" className="text-xs text-danger">
            Không tải được danh sách thiết kế của căn hộ.
          </p>
        ) : null}
        {designs && designs.length === 0 ? (
          <p className="text-xs text-muted">
            Căn hộ chưa có thiết kế nào. Hãy mở trình thiết kế 3D để tạo.
          </p>
        ) : null}
        <label className="block text-xs font-semibold text-fg">
          Ghi chú cho chủ nhà (không bắt buộc)
          <Textarea
            className="mt-1"
            value={note}
            onChange={event => setNote(event.target.value)}
            maxLength={2000}
            aria-label="Ghi chú giao thiết kế"
          />
        </label>
        <Button
          type="button"
          size="sm"
          loading={deliver.isPending}
          disabled={!designId}
          onClick={() => void submit()}
        >
          Giao thiết kế cho chủ nhà
        </Button>
      </div>
    </div>
  )
}

function ReadOnlyNote({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <p className="rounded-xl bg-surface-muted/60 px-3 py-2 text-sm text-muted">
      {children}
    </p>
  )
}

function ActionArea({
  request,
  onDone,
}: {
  request: DesignRequest
  onDone: OnDone
}): React.ReactElement {
  const start = useStartDesignRequest()
  const handleStart = async (): Promise<void> => {
    try {
      await start.mutateAsync({ id: request.id, input: undefined })
      onDone(
        null,
        request.status === 'changes_requested'
          ? 'Đã nhận chỉnh sửa. Bạn có thể mở trình thiết kế 3D.'
          : 'Đã nhận thiết kế. Bạn có thể mở trình thiết kế 3D.'
      )
    } catch (error) {
      onDone(error)
    }
  }

  switch (request.status) {
    case 'submitted':
    case 'escalated':
      return (
        <div className="space-y-3">
          <Button
            type="button"
            size="sm"
            loading={start.isPending}
            onClick={() => void handleStart()}
          >
            Nhận thiết kế
          </Button>
          <TriageActions request={request} onDone={onDone} />
        </div>
      )
    case 'needs_info':
      return <ReadOnlyNote>Đang chờ chủ nhà bổ sung</ReadOnlyNote>
    case 'changes_requested':
      return (
        <Button
          type="button"
          size="sm"
          loading={start.isPending}
          onClick={() => void handleStart()}
        >
          Nhận chỉnh sửa
        </Button>
      )
    case 'in_progress':
      return (
        <div className="space-y-3">
          <ReadOnlyNote>
            {request.assignee
              ? `Đang do ${request.assignee.name} thiết kế. Chỉ người nhận mới giao được.`
              : 'Đang có người thiết kế.'}
          </ReadOnlyNote>
          <DeliverForm request={request} onDone={onDone} />
        </div>
      )
    case 'delivered':
      return (
        <div className="space-y-1">
          <ReadOnlyNote>Đã giao thiết kế, đang chờ chủ nhà duyệt.</ReadOnlyNote>
          {request.deliveredDesign ? (
            <p className="text-xs text-fg">
              Thiết kế đã giao:{' '}
              <span className="font-semibold">
                {request.deliveredDesign.name}
              </span>
            </p>
          ) : null}
        </div>
      )
    default:
      return <ReadOnlyNote>Yêu cầu đã kết thúc.</ReadOnlyNote>
  }
}

export interface StaffDesignRequestDetailProps {
  requestId: string
}

export function StaffDesignRequestDetail({
  requestId,
}: StaffDesignRequestDetailProps): React.ReactElement {
  const detail = useDesignRequestDetail(requestId)
  const refetch = detail.refetch

  const handleDone = React.useCallback<OnDone>(
    (error, success) => {
      if (error === null) {
        if (success) appToast.success(success)
        return
      }
      const { message, stale } = describeError(error)
      appToast.error(message)
      if (stale) void refetch()
    },
    [refetch]
  )

  if (detail.isPending) {
    return (
      <p role="status" className="text-sm text-muted">
        Đang tải...
      </p>
    )
  }
  if (detail.isError || !detail.data) {
    return (
      <p role="alert" className="text-sm text-danger">
        Không tải được chi tiết yêu cầu.
      </p>
    )
  }

  const request = detail.data
  const feedback =
    request.status === 'changes_requested'
      ? [...request.events].reverse().find(event => event.type === 'feedback')
      : undefined

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline" className={STAFF_STATUS_TONE[request.status]}>
          {STAFF_STATUS_LABELS[request.status]}
        </Badge>
        <span className="text-xs text-muted">
          {STAFF_KIND_LABELS[request.kind]} · Vòng {request.revision}
        </span>
      </div>

      <dl className="grid gap-2 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-[11px] text-muted">Căn hộ</dt>
          <dd className="font-semibold text-fg">
            {request.apartment?.title ?? request.apartmentId}
          </dd>
        </div>
        <div>
          <dt className="text-[11px] text-muted">Chủ nhà</dt>
          <dd className="font-semibold text-fg">
            {request.landlord?.name ?? '—'}
            {request.landlord?.email ? (
              <span className="ml-1 text-xs font-normal text-muted">
                ({request.landlord.email})
              </span>
            ) : null}
          </dd>
        </div>
        {request.kind === 'edit' && request.targetDesignId ? (
          <div className="sm:col-span-2">
            <dt className="text-[11px] text-muted">Thiết kế cần chỉnh sửa</dt>
            <dd className="font-mono text-xs text-fg">
              {request.targetDesignId}
            </dd>
          </div>
        ) : null}
      </dl>

      <section>
        <h3 className="text-xs font-semibold text-fg">Nội dung yêu cầu</h3>
        <p className="mt-1 whitespace-pre-wrap text-sm text-fg">
          {request.brief}
        </p>
        <Attachments urls={request.attachmentUrls} />
      </section>

      {feedback ? (
        <section
          className="rounded-xl border border-orange-300 bg-orange-50 p-3"
          data-testid="latest-feedback"
        >
          <h3 className="text-xs font-semibold text-orange-900">
            Phản hồi mới nhất của chủ nhà
          </h3>
          <p className="mt-1 whitespace-pre-wrap text-sm text-orange-950">
            {feedback.note ?? '(Không có ghi chú)'}
          </p>
          <Attachments urls={feedback.attachmentUrls} />
        </section>
      ) : null}

      <section className="space-y-2">
        <h3 className="text-xs font-semibold text-fg">Thao tác</h3>
        <ActionArea
          key={request.status}
          request={request}
          onDone={handleDone}
        />
      </section>

      <section className="space-y-2">
        <h3 className="text-xs font-semibold text-fg">Lịch sử</h3>
        <Timeline events={request.events} />
      </section>
    </div>
  )
}
