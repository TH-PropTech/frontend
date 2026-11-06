'use client'

import { useState, type ReactElement } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Loader2, UserPlus, Users } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import {
  createOccupantRequest,
  decideOccupantRequest,
  getOccupantRequests,
  respondToOccupantCounter,
  type CreateOccupantRequestInput,
  type OccupantRequest,
} from '../api/occupant-requests-api'
import {
  STATUS_LABELS,
  formatDate,
  formatMoney,
  getOccupantRequestErrorMessage,
} from '../lib/occupant-request-labels'
import { OccupantRequestForm } from './occupant-request-form'

export interface OccupantRequestsPanelProps {
  contractId: string
  role: 'tenant' | 'landlord'
  /** Chỉ hợp đồng đang có hiệu lực mới nhận yêu cầu mới. */
  contractActive: boolean
  /** Tiền thuê hằng tháng hiện tại (đồng). */
  currentRent: number
  /** Gọi sau thao tác thành công để cha tải lại hợp đồng và phụ lục. */
  onChanged?: (() => unknown) | undefined
}

const FIELD_CLASS =
  'mt-1 min-h-11 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2'

function RequestSummary({
  request,
}: {
  request: OccupantRequest
}): ReactElement {
  const fee =
    request.agreedSurcharge ??
    request.counterSurcharge ??
    request.proposedSurcharge
  return (
    <div
      data-testid="occupant-request"
      className="space-y-1 rounded-lg border border-[var(--border)] p-3 text-xs"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <strong className="text-[var(--fg)]">
          Thêm {request.occupants.length} người ở, chuyển vào{' '}
          {formatDate(request.moveInDate)}
        </strong>
        <span className="rounded-full bg-[var(--surface-muted)] px-2.5 py-1 font-semibold text-[var(--warning)]">
          {STATUS_LABELS[request.status]}
        </span>
      </div>
      <ul className="list-inside list-disc text-[var(--fg)]">
        {request.occupants.map(person => (
          <li key={`${person.fullName}-${person.birthYear}`}>
            {person.fullName}, sinh năm {person.birthYear} (
            {person.relationship})
          </li>
        ))}
      </ul>
      <p className="text-[var(--muted)]">Lý do: {request.reason}</p>
      <p className="text-[var(--fg)]">
        Phụ phí hằng tháng: <strong>{formatMoney(fee)}</strong>
        {request.status === 'pending-tenant' &&
        request.counterSurcharge !== null
          ? ` (Chủ nhà đề xuất lại, bạn đề xuất ${formatMoney(request.proposedSurcharge)})`
          : ''}
      </p>
      {request.decisionReason ? (
        <p className="text-[var(--muted)]">
          Ghi chú của Chủ nhà: {request.decisionReason}
        </p>
      ) : null}
    </div>
  )
}

export function OccupantRequestsPanel({
  contractId,
  role,
  contractActive,
  currentRent,
  onChanged,
}: OccupantRequestsPanelProps): ReactElement {
  const query = useQuery({
    queryKey: ['occupant-requests', contractId],
    queryFn: () => getOccupantRequests(contractId),
  })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [countering, setCountering] = useState(false)
  const [counterFee, setCounterFee] = useState('')
  const [rejecting, setRejecting] = useState(false)
  const [reason, setReason] = useState('')

  const run = async (
    action: () => Promise<unknown>,
    fallback: string
  ): Promise<boolean> => {
    setBusy(true)
    setError(null)
    try {
      await action()
      await query.refetch()
      await onChanged?.()
      return true
    } catch (actionError) {
      setError(getOccupantRequestErrorMessage(actionError, fallback))
      return false
    } finally {
      setBusy(false)
    }
  }

  const data = query.data
  const open = data?.openRequest ?? null
  const history = (data?.requests ?? []).filter(item => item._id !== open?._id)

  const handleCreate = (input: CreateOccupantRequestInput): void => {
    void run(
      () => createOccupantRequest(contractId, input),
      'Không gửi được yêu cầu thêm người ở. Vui lòng thử lại.'
    ).then(ok => ok && setShowForm(false))
  }

  const decide = (
    request: OccupantRequest,
    decision: Parameters<typeof decideOccupantRequest>[2]
  ): void => {
    void run(
      () => decideOccupantRequest(contractId, request._id, decision),
      'Không xử lý được yêu cầu. Vui lòng thử lại.'
    ).then(ok => {
      if (!ok) return
      setCountering(false)
      setRejecting(false)
      setReason('')
    })
  }

  return (
    <section
      data-testid="occupant-requests-panel"
      aria-labelledby="occupant-requests-title"
      className="space-y-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2
          id="occupant-requests-title"
          className="flex items-center gap-2 text-sm font-bold text-[var(--fg)]"
        >
          <Users className="h-4 w-4" aria-hidden="true" />
          Người ở cùng
        </h2>
        {data ? (
          <span className="text-xs text-[var(--muted)]">
            Hiện có {data.currentOccupants} người
            {data.maxOccupants !== null
              ? `, căn hộ cho phép tối đa ${data.maxOccupants}`
              : ''}
          </span>
        ) : null}
      </div>

      {query.isLoading ? (
        <p
          role="status"
          className="flex items-center gap-2 text-xs text-[var(--muted)]"
        >
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          Đang tải yêu cầu thêm người ở...
        </p>
      ) : null}
      {query.isError ? (
        <div role="alert" className="space-y-2 text-xs text-[var(--danger)]">
          <p>Không tải được yêu cầu thêm người ở.</p>
          <Button
            type="button"
            variant="secondary"
            className="min-h-11"
            onClick={() => void query.refetch()}
          >
            Thử lại
          </Button>
        </div>
      ) : null}

      {data && !open && history.length === 0 ? (
        <p className="text-xs text-[var(--muted)]">
          Chưa có yêu cầu thêm người ở nào.
          {role === 'tenant'
            ? ' Khi có người dọn vào ở cùng, bạn gửi yêu cầu để Chủ nhà đồng ý và ghi vào hợp đồng.'
            : ''}
        </p>
      ) : null}

      {open ? (
        <div className="space-y-3">
          <RequestSummary request={open} />
          {role === 'landlord' && open.status === 'pending-landlord' ? (
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  className="min-h-11"
                  disabled={busy}
                  onClick={() => decide(open, { action: 'approve' })}
                >
                  Đồng ý (phụ phí {formatMoney(open.proposedSurcharge)})
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="min-h-11"
                  disabled={busy}
                  onClick={() => {
                    setCountering(value => !value)
                    setRejecting(false)
                  }}
                >
                  Đề xuất lại phụ phí
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="min-h-11"
                  disabled={busy}
                  onClick={() => {
                    setRejecting(value => !value)
                    setCountering(false)
                  }}
                >
                  Từ chối
                </Button>
              </div>
              {countering ? (
                <div className="grid gap-2 sm:grid-cols-2">
                  <label className="text-xs">
                    Phụ phí đề xuất lại (đồng/tháng)
                    <input
                      type="number"
                      min="0"
                      max="10000000"
                      step="1000"
                      value={counterFee}
                      onChange={event => setCounterFee(event.target.value)}
                      className={FIELD_CLASS}
                    />
                  </label>
                  <label className="text-xs">
                    Ghi chú cho Khách thuê
                    <input
                      maxLength={500}
                      value={reason}
                      onChange={event => setReason(event.target.value)}
                      className={FIELD_CLASS}
                    />
                  </label>
                  <Button
                    type="button"
                    className="min-h-11 sm:col-span-2"
                    disabled={busy || counterFee === ''}
                    onClick={() =>
                      decide(open, {
                        action: 'counter',
                        counterSurcharge: Math.max(
                          0,
                          Math.floor(Number(counterFee) || 0)
                        ),
                        ...(reason.trim() ? { reason: reason.trim() } : {}),
                      })
                    }
                  >
                    Gửi đề xuất
                  </Button>
                </div>
              ) : null}
              {rejecting ? (
                <div className="space-y-2">
                  <label className="block text-xs">
                    Lý do từ chối
                    <textarea
                      maxLength={500}
                      value={reason}
                      onChange={event => setReason(event.target.value)}
                      className={FIELD_CLASS}
                    />
                  </label>
                  <Button
                    type="button"
                    className="min-h-11"
                    disabled={busy}
                    onClick={() =>
                      decide(open, {
                        action: 'reject',
                        ...(reason.trim() ? { reason: reason.trim() } : {}),
                      })
                    }
                  >
                    Xác nhận từ chối
                  </Button>
                </div>
              ) : null}
            </div>
          ) : null}
          {role === 'tenant' && open.status === 'pending-tenant' ? (
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                className="min-h-11"
                disabled={busy}
                onClick={() =>
                  void run(
                    () => respondToOccupantCounter(contractId, open._id, true),
                    'Không gửi được câu trả lời. Vui lòng thử lại.'
                  )
                }
              >
                Chấp nhận phụ phí {formatMoney(open.counterSurcharge ?? 0)}
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="min-h-11"
                disabled={busy}
                onClick={() =>
                  void run(
                    () => respondToOccupantCounter(contractId, open._id, false),
                    'Không gửi được câu trả lời. Vui lòng thử lại.'
                  )
                }
              >
                Không đồng ý
              </Button>
            </div>
          ) : null}
          {role === 'tenant' && open.status === 'pending-landlord' ? (
            <p className="text-xs text-[var(--muted)]">
              Đang chờ Chủ nhà phản hồi. Bạn sẽ nhận thông báo khi có kết quả.
            </p>
          ) : null}
        </div>
      ) : null}

      {data && history.length > 0 ? (
        <details className="text-xs">
          <summary className="min-h-11 cursor-pointer py-2 font-semibold text-[var(--fg)]">
            Lịch sử yêu cầu ({history.length})
          </summary>
          <div className="space-y-2">
            {history.map(item => (
              <RequestSummary key={item._id} request={item} />
            ))}
          </div>
        </details>
      ) : null}

      {role === 'tenant' && contractActive && data && !open ? (
        showForm ? (
          <OccupantRequestForm
            busy={busy}
            currentOccupants={data.currentOccupants}
            maxOccupants={data.maxOccupants}
            currentRent={currentRent}
            onSubmit={handleCreate}
            onCancel={() => setShowForm(false)}
          />
        ) : (
          <Button
            type="button"
            className="min-h-11"
            onClick={() => setShowForm(true)}
          >
            <UserPlus className="h-4 w-4" aria-hidden="true" />
            Gửi yêu cầu thêm người ở
          </Button>
        )
      ) : null}

      {error ? (
        <p role="alert" className="text-xs text-[var(--danger)]">
          {error}
        </p>
      ) : null}
    </section>
  )
}
