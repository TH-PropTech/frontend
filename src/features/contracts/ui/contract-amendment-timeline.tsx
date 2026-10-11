'use client'

import { DatePicker } from '@/shared/ui/date-picker'
import * as React from 'react'
import {
  CheckCircle2,
  Clock3,
  Download,
  FilePenLine,
  XCircle,
} from 'lucide-react'
import { Alert, AlertDescription } from '@/shared/ui/alert'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { getAmendmentFieldLabel } from '../lib/contract-labels'
import {
  createContractAmendment,
  downloadContractAmendmentArtifact,
  getContractAmendments,
  lockContractAmendment,
  lockContractAmendmentArtifact,
  signContractAmendment,
  type ContractAmendment,
} from '../api/contracts-api'

export interface ContractAmendmentTimelineProps {
  contractId: string
  canManage: boolean
  canSign: boolean
}

function statusLabel(status: string): string {
  const labels: Record<string, string> = {
    locked: 'Đã khóa nội dung, chờ bản PDF',
    'in-review': 'Đang rà soát',
    draft: 'Bản nháp',
    'pending-signature': 'Chờ hai bên ký',
    effective: 'Đã có hiệu lực',
    'pending-effective': 'Đã ký, chờ ngày hiệu lực',
    rejected: 'Bị từ chối',
    cancelled: 'Đã hủy',
    superseded: 'Đã được thay thế',
  }
  return labels[status] ?? status
}

export function ContractAmendmentTimeline({
  contractId,
  canManage,
  canSign,
}: ContractAmendmentTimelineProps): React.ReactElement {
  const [items, setItems] = React.useState<ContractAmendment[]>([])
  const [monthlyRent, setMonthlyRent] = React.useState('')
  const [effectiveFrom, setEffectiveFrom] = React.useState('')
  const [loading, setLoading] = React.useState(true)
  const [busy, setBusy] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [now] = React.useState(Date.now)
  const [artifactFiles, setArtifactFiles] = React.useState<
    Record<string, File>
  >({})

  const load = React.useCallback(
    async (signal?: AbortSignal): Promise<void> => {
      if (signal?.aborted) return
      setLoading(true)
      try {
        const result = await getContractAmendments(contractId)
        if (signal?.aborted) return
        setItems(result)
      } catch (cause: unknown) {
        if (signal?.aborted) return
        setError(
          cause instanceof Error
            ? cause.message
            : 'Không tải được lịch sử phụ lục.'
        )
      } finally {
        if (!signal?.aborted) setLoading(false)
      }
    },
    [contractId]
  )

  React.useEffect(() => {
    const controller = new AbortController()
    async function run(): Promise<void> {
      await load(controller.signal)
    }
    void run()
    return () => {
      controller.abort()
    }
  }, [load])

  const create = async (): Promise<void> => {
    setBusy(true)
    setError(null)
    try {
      const effectiveDate = new Date(`${effectiveFrom}T00:00:00`)
      if (Number.isNaN(effectiveDate.getTime())) {
        throw new Error('Ngày hiệu lực không hợp lệ.')
      }
      await createContractAmendment(contractId, {
        changes: [{ field: 'monthlyRent', after: Number(monthlyRent) }],
        effectiveFrom: effectiveDate.toISOString(),
      })
      setMonthlyRent('')
      setEffectiveFrom('')
      await load()
    } catch (cause: unknown) {
      setError(
        cause instanceof Error ? cause.message : 'Không tạo được phụ lục.'
      )
    } finally {
      setBusy(false)
    }
  }

  const lock = async (item: ContractAmendment): Promise<void> => {
    setBusy(true)
    try {
      await lockContractAmendment(contractId, item._id, item.revision)
      await load()
    } catch (cause: unknown) {
      setError(
        cause instanceof Error ? cause.message : 'Không khóa được phụ lục.'
      )
    } finally {
      setBusy(false)
    }
  }

  const sign = async (item: ContractAmendment): Promise<void> => {
    if (!item.artifactHash) return
    setBusy(true)
    try {
      await signContractAmendment(
        contractId,
        item._id,
        item.revision,
        item.artifactHash
      )
      await load()
    } catch (cause: unknown) {
      setError(
        cause instanceof Error ? cause.message : 'Không ký được phụ lục.'
      )
    } finally {
      setBusy(false)
    }
  }

  const downloadArtifact = async (item: ContractAmendment): Promise<void> => {
    setBusy(true)
    setError(null)
    try {
      const blob = await downloadContractAmendmentArtifact(contractId, item._id)
      const url = URL.createObjectURL(blob)
      const anchor = document.createElement('a')
      anchor.href = url
      anchor.download = `amendment-${item.sequence}.pdf`
      anchor.click()
      URL.revokeObjectURL(url)
    } catch (cause: unknown) {
      setError(
        cause instanceof Error
          ? cause.message
          : 'Không tải được bản PDF phụ lục.'
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <section
      className="space-y-3 rounded-xl border border-border bg-surface p-4 shadow-sm"
      data-testid="contract-amendment-timeline"
    >
      <header className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-fg">
            Phụ lục và phiên bản thương mại
          </h2>
          {canManage || items.length > 0 ? (
            <p className="mt-1 text-xs leading-relaxed text-muted">
              Hợp đồng gốc không bị sửa; thay đổi chỉ có hiệu lực sau khi đủ chữ
              ký và tới ngày áp dụng.
            </p>
          ) : null}
        </div>
        <FilePenLine
          className="mt-0.5 h-5 w-5 shrink-0 text-primary"
          aria-hidden="true"
        />
      </header>
      {error ? (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      {canManage ? (
        <div className="grid gap-3 rounded-xl border border-border bg-surface-muted p-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
          <Input
            label="Giá thuê mới (VND)"
            type="number"
            min={0}
            value={monthlyRent}
            onChange={event => setMonthlyRent(event.target.value)}
          />
          <DatePicker
            label="Ngày bắt đầu áp dụng"
            value={effectiveFrom}
            onChange={setEffectiveFrom}
          />
          <Button
            type="button"
            disabled={busy || !monthlyRent || !effectiveFrom}
            onClick={() => void create()}
          >
            Tạo phụ lục
          </Button>
        </div>
      ) : null}

      {loading ? <p className="text-xs text-muted">Đang tải lịch sử…</p> : null}
      {!loading && items.length === 0 ? (
        <p className="text-xs text-muted">Chưa có phụ lục nào.</p>
      ) : null}
      <div className="space-y-3">
        {items.map(item => {
          const itemStatus =
            item.status === 'effective' &&
            new Date(item.effectiveFrom).getTime() > now
              ? 'pending-effective'
              : item.status
          return (
            <article
              key={item._id}
              className="rounded-xl border border-border p-4"
            >
              <div className="flex flex-wrap items-center gap-2">
                {itemStatus === 'effective' ? (
                  <CheckCircle2 className="h-4 w-4 text-success" />
                ) : (
                  <Clock3 className="h-4 w-4 text-warning" />
                )}
                <span className="font-semibold text-sm text-fg">
                  Phụ lục #{item.sequence}
                </span>
                <Badge
                  variant={itemStatus === 'effective' ? 'default' : 'outline'}
                >
                  {statusLabel(itemStatus)}
                </Badge>
                <span className="ml-auto text-xs text-muted">
                  Áp dụng:{' '}
                  {new Date(item.effectiveFrom).toLocaleDateString('vi-VN')}
                </span>
              </div>
              <div className="mt-3 grid gap-2 text-xs text-muted md:grid-cols-2">
                <p className="font-mono text-[10px]">
                  Mã bản PDF:{' '}
                  {item.artifactHash
                    ? `${item.artifactHash.slice(0, 12)}...${item.artifactHash.slice(-8)}`
                    : 'Chưa khóa'}
                </p>
                {item.changes.map(change => (
                  <p key={change.field}>
                    <strong className="text-fg">
                      {getAmendmentFieldLabel(change.field)}
                    </strong>
                    : {String(change.before)} → {String(change.after)}
                  </p>
                ))}
                <p>
                  Bên thuê: {item.tenantSignature ? 'Đã ký' : 'Chưa ký'} · Bên
                  cho thuê: {item.landlordSignature ? 'Đã ký' : 'Chưa ký'}
                </p>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {canManage && item.status === 'locked' ? (
                  <>
                    <label className="inline-flex cursor-pointer items-center rounded-md border border-border px-2 py-1 text-xs text-muted">
                      Chọn bản PDF
                      <input
                        type="file"
                        accept="application/pdf"
                        className="sr-only"
                        onChange={event => {
                          const file = event.target.files?.[0]
                          if (file)
                            setArtifactFiles(previous => ({
                              ...previous,
                              [item._id]: file,
                            }))
                        }}
                      />
                    </label>
                    <Button
                      size="sm"
                      variant="secondary"
                      disabled={busy || !artifactFiles[item._id]}
                      onClick={() => {
                        const file = artifactFiles[item._id]
                        if (!file) return
                        setBusy(true)
                        void lockContractAmendmentArtifact(
                          contractId,
                          item._id,
                          item.revision,
                          file
                        )
                          .then(() => load())
                          .catch(cause =>
                            setError(
                              cause instanceof Error
                                ? cause.message
                                : 'Không khóa được bản PDF phụ lục.'
                            )
                          )
                          .finally(() => setBusy(false))
                      }}
                    >
                      Khóa bản PDF{' '}
                    </Button>
                  </>
                ) : null}
                {item.artifactRef ? (
                  <Button
                    size="sm"
                    variant="ghost"
                    disabled={busy}
                    onClick={() => void downloadArtifact(item)}
                  >
                    <Download className="mr-1 h-3.5 w-3.5" /> Tải bản PDF
                  </Button>
                ) : null}
                {canManage && item.status === 'draft' ? (
                  <Button
                    size="sm"
                    variant="secondary"
                    disabled={busy}
                    onClick={() => void lock(item)}
                  >
                    Khóa phụ lục
                  </Button>
                ) : null}
                {canSign && item.status === 'pending-signature' ? (
                  <Button
                    size="sm"
                    disabled={busy}
                    onClick={() => void sign(item)}
                  >
                    Ký phụ lục
                  </Button>
                ) : null}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
