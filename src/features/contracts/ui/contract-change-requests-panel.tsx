'use client'

import * as React from 'react'
import { Alert, AlertDescription } from '@/shared/ui/alert'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Textarea } from '@/shared/ui/textarea'
import {
  acceptContractChangeRequest,
  cancelContractChangeRequest,
  createContractChangeRequest,
  getContractChangeRequests,
  rejectContractChangeRequest,
  type ContractChangeRequest,
  type ContractChangeRequestList,
} from '../api/contract-change-requests-api'
import {
  CHANGE_REQUEST_STATUS_LABELS,
  formatChangeValue,
} from '../lib/change-request-labels'
import { getAmendmentFieldLabel } from '../lib/contract-labels'
import {
  ChangeRequestDialog,
  type ChangeRequestDraft,
} from './change-request-dialog'

export interface ContractChangeRequestsPanelProps {
  contractId: string
  /** Vai trò của người đang xem trong hợp đồng; vắng mặt = quản trị chỉ xem và hòa giải. */
  viewerRole?: 'tenant' | 'landlord' | undefined
  currentUserId?: string | undefined
  /** Admin hoặc staff được từ chối và đóng yêu cầu, không được đồng ý thay. */
  canModerate?: boolean
  onApplied?: () => void
}

type PendingDecision = { id: string; action: 'reject' | 'cancel' }

function messageOf(cause: unknown, fallback: string): string {
  return cause instanceof Error ? cause.message : fallback
}

export function ContractChangeRequestsPanel({
  contractId,
  viewerRole,
  currentUserId,
  canModerate = false,
  onApplied,
}: ContractChangeRequestsPanelProps): React.JSX.Element | null {
  const [list, setList] = React.useState<ContractChangeRequestList | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [busy, setBusy] = React.useState(false)
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [decision, setDecision] = React.useState<PendingDecision | null>(null)
  const [decisionReason, setDecisionReason] = React.useState('')

  const load = React.useCallback(async (): Promise<void> => {
    try {
      setList(await getContractChangeRequests(contractId))
    } catch (cause: unknown) {
      setError(messageOf(cause, 'Không tải được yêu cầu chỉnh sửa.'))
    }
  }, [contractId])

  React.useEffect(() => {
    let cancelled = false
    queueMicrotask(() => {
      if (!cancelled) void load()
    })
    return () => {
      cancelled = true
    }
  }, [load])

  const run = async (
    action: () => Promise<unknown>,
    refreshContract: boolean
  ): Promise<boolean> => {
    setBusy(true)
    setError(null)
    try {
      await action()
      await load()
      if (refreshContract) onApplied?.()
      return true
    } catch (cause: unknown) {
      setError(messageOf(cause, 'Không thực hiện được thao tác.'))
      return false
    } finally {
      setBusy(false)
    }
  }

  const handleCreate = async (draft: ChangeRequestDraft): Promise<void> => {
    if (!list) return
    const saved = await run(
      () =>
        createContractChangeRequest(contractId, {
          ...draft,
          expectedRevision: list.commercialRevision,
          idempotencyKey: crypto.randomUUID(),
        }),
      false
    )
    if (saved) setDialogOpen(false)
  }

  const handleDecision = async (): Promise<void> => {
    if (!decision || decisionReason.trim().length === 0) return
    const reason = decisionReason.trim()
    const call =
      decision.action === 'reject'
        ? () => rejectContractChangeRequest(contractId, decision.id, reason)
        : () => cancelContractChangeRequest(contractId, decision.id, reason)
    if (await run(call, false)) {
      setDecision(null)
      setDecisionReason('')
    }
  }

  const items = list?.items ?? []
  const hasOpen = items.some(item => item.status === 'pending-counterparty')
  const canCreate = Boolean(viewerRole) && list !== null && !list.locked

  const renderActions = (item: ContractChangeRequest): React.ReactNode => {
    if (item.status !== 'pending-counterparty') return null
    const isParticipant = Boolean(viewerRole)
    const isRequester = currentUserId === item.requestedBy
    return (
      <div className="flex flex-wrap gap-2">
        {isParticipant && !isRequester ? (
          <Button
            size="sm"
            disabled={busy}
            data-testid={`change-request-accept-${item._id}`}
            onClick={() =>
              void run(
                () => acceptContractChangeRequest(contractId, item._id),
                true
              )
            }
          >
            Đồng ý
          </Button>
        ) : null}
        {(isParticipant && !isRequester) || canModerate ? (
          <Button
            size="sm"
            variant="outline"
            disabled={busy}
            data-testid={`change-request-reject-${item._id}`}
            onClick={() => setDecision({ id: item._id, action: 'reject' })}
          >
            Từ chối
          </Button>
        ) : null}
        {(isParticipant && isRequester) || canModerate ? (
          <Button
            size="sm"
            variant="ghost"
            disabled={busy}
            data-testid={`change-request-cancel-${item._id}`}
            onClick={() => setDecision({ id: item._id, action: 'cancel' })}
          >
            {isRequester ? 'Rút yêu cầu' : 'Đóng yêu cầu'}
          </Button>
        ) : null}
      </div>
    )
  }

  if (list?.locked && items.length === 0) return null

  return (
    <section
      className="space-y-3 rounded-xl border border-border bg-surface p-4"
      data-testid="change-requests-panel"
      aria-labelledby="change-requests-title"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 id="change-requests-title" className="text-sm font-bold">
            Yêu cầu chỉnh sửa hợp đồng nháp
          </h3>
          <p className="text-[11px] text-muted">
            Hai bên cùng đồng ý thì nội dung mới được cập nhật.
          </p>
        </div>
        {canCreate ? (
          <Button
            size="sm"
            disabled={busy || hasOpen}
            data-testid="change-request-open"
            onClick={() => setDialogOpen(true)}
          >
            Yêu cầu chỉnh sửa
          </Button>
        ) : null}
      </div>

      {list?.locked ? (
        <Alert>
          <AlertDescription>
            Hợp đồng đã khóa nội dung. Muốn thay đổi, hãy dùng phụ lục hợp đồng.
          </AlertDescription>
        </Alert>
      ) : null}
      {hasOpen && canCreate ? (
        <p className="text-[11px] text-muted">
          Đang có một yêu cầu chờ phản hồi, chưa gửi thêm được.
        </p>
      ) : null}
      {error ? (
        <p role="alert" className="text-xs text-destructive">
          {error}
        </p>
      ) : null}

      {list && items.length === 0 ? (
        <p className="text-xs text-muted" data-testid="change-requests-empty">
          Chưa có yêu cầu chỉnh sửa nào.
        </p>
      ) : null}

      <ul className="space-y-3">
        {items.map(item => (
          <li
            key={item._id}
            data-testid={`change-request-${item._id}`}
            className="space-y-2 rounded-lg border border-border/70 p-3 text-xs"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold">
                {item.requestedRole === 'landlord' ? 'Chủ nhà' : 'Khách thuê'}{' '}
                đề nghị
              </span>
              <Badge variant="outline">
                {CHANGE_REQUEST_STATUS_LABELS[item.status]}
              </Badge>
            </div>
            <ul className="space-y-1">
              {item.changes.map(change => (
                <li key={change.field}>
                  <span className="font-medium">
                    {getAmendmentFieldLabel(change.field)}:
                  </span>{' '}
                  {formatChangeValue(change.field, change.before)} →{' '}
                  {formatChangeValue(change.field, change.after)}
                </li>
              ))}
            </ul>
            <p className="text-muted">Lý do: {item.reason}</p>
            {item.decisionReason ? (
              <p className="text-muted">Phản hồi: {item.decisionReason}</p>
            ) : null}
            {renderActions(item)}
            {decision?.id === item._id ? (
              <div className="space-y-2">
                <Textarea
                  rows={2}
                  maxLength={500}
                  placeholder="Nhập lý do"
                  data-testid="change-request-decision-reason"
                  value={decisionReason}
                  onChange={event => setDecisionReason(event.target.value)}
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    disabled={busy || decisionReason.trim().length === 0}
                    data-testid="change-request-decision-confirm"
                    onClick={() => void handleDecision()}
                  >
                    Xác nhận
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setDecision(null)}
                  >
                    Bỏ qua
                  </Button>
                </div>
              </div>
            ) : null}
          </li>
        ))}
      </ul>

      <ChangeRequestDialog
        open={dialogOpen}
        busy={busy}
        error={dialogOpen ? error : null}
        onOpenChange={setDialogOpen}
        onSubmit={draft => void handleCreate(draft)}
      />
    </section>
  )
}
