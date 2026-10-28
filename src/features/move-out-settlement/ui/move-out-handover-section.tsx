'use client'

import { useEffect, useState, type ReactElement } from 'react'
import { FileDown } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/shared/ui/button'
import {
  confirmMoveOutHandover,
  disputeMoveOutHandover,
  downloadMoveOutHandoverPdf,
  objectMoveOutHandover,
  recordMoveOutHandover,
  reviseMoveOutHandover,
} from '../api/move-out-api'
import type { MoveOutGates, MoveOutHandoverInput } from '../api/move-out-types'
import { getBlockedReasons, isGateBlocked } from '../lib/move-out-gates'
import { useMoveOutHandover } from '../model/use-move-out-resources'
import { MoveOutHandoverForm } from './move-out-handover-form'
import { MoveOutHandoverView } from './move-out-handover-view'
import { NoteAction } from './note-action'
import { SectionState } from './section-state'

export type MoveOutRole = 'tenant' | 'landlord'

export interface MoveOutHandoverSectionProps {
  contractId: string
  role: MoveOutRole
  gates?: MoveOutGates | undefined
  /** Gọi sau mỗi thao tác ghi thành công để cha tải lại hợp đồng. */
  onChanged?: (() => unknown) | undefined
  /** Báo lên cha khi biên bản đã hoàn tất để mở bảng khấu trừ. */
  onCompletedChange: (completed: boolean) => void
}

export function MoveOutHandoverSection({
  contractId,
  role,
  gates,
  onChanged,
  onCompletedChange,
}: MoveOutHandoverSectionProps): ReactElement {
  const { handover, isLoading, isError, refetch, busy, error, run } =
    useMoveOutHandover(contractId, onChanged)
  const [downloading, setDownloading] = useState(false)
  const [showRevise, setShowRevise] = useState(false)

  const isCompleted = handover?.status === 'completed'
  const recordBusy = busy || isGateBlocked(gates, 'RECORD_MOVE_OUT_HANDOVER')
  const confirmBusy = busy || isGateBlocked(gates, 'CONFIRM_MOVE_OUT_HANDOVER')
  const objectBusy = busy || isGateBlocked(gates, 'REPORT_MOVE_OUT_DISCREPANCY')
  const blockedReasons = getBlockedReasons(gates, [
    'RECORD_MOVE_OUT_HANDOVER',
    'CONFIRM_MOVE_OUT_HANDOVER',
    'REPORT_MOVE_OUT_DISCREPANCY',
  ])
  useEffect(() => {
    onCompletedChange(Boolean(isCompleted))
  }, [isCompleted, onCompletedChange])

  const handleDownload = async (): Promise<void> => {
    setDownloading(true)
    try {
      const blob = await downloadMoveOutHandoverPdf(contractId)
      const url = URL.createObjectURL(blob)
      const anchor = document.createElement('a')
      anchor.href = url
      anchor.download = `bien-ban-tra-nha-${contractId}.pdf`
      anchor.click()
      URL.revokeObjectURL(url)
    } catch (downloadError) {
      toast.error(
        downloadError instanceof Error
          ? 'Không tải được bản PDF biên bản trả nhà.'
          : 'Không tải được bản PDF.'
      )
    } finally {
      setDownloading(false)
    }
  }

  const handleRecord = (input: MoveOutHandoverInput): void => {
    void run(
      () =>
        handover
          ? reviseMoveOutHandover(contractId, input)
          : recordMoveOutHandover(contractId, input),
      'Không ghi được biên bản trả nhà.'
    ).then(ok => ok && setShowRevise(false))
  }

  return (
    <section
      data-testid="move-out-handover"
      aria-labelledby="move-out-handover-title"
      className="space-y-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
    >
      <h2
        id="move-out-handover-title"
        className="text-sm font-bold text-[var(--fg)]"
      >
        Biên bản trả nhà
      </h2>
      <SectionState
        isLoading={isLoading}
        isError={isError}
        onRetry={() => void refetch()}
        loadingText="Đang tải biên bản trả nhà..."
        errorText="Không tải được biên bản trả nhà."
      >
        {!handover && role === 'tenant' ? (
          <p className="text-xs text-[var(--muted)]">
            Chủ nhà chưa lập biên bản trả nhà. Khi có, bạn sẽ xác nhận hoặc phản
            đối tại đây.
          </p>
        ) : null}
        {!handover && role === 'landlord' ? (
          <>
            <p className="text-xs text-[var(--muted)]">
              Ghi lại hiện trạng căn hộ khi khách trả nhà. Khách thuê sẽ xác
              nhận hoặc phản đối trong hạn đã ghi trong hợp đồng.
            </p>
            <MoveOutHandoverForm busy={recordBusy} onSubmit={handleRecord} />
          </>
        ) : null}
        {handover ? (
          <>
            <MoveOutHandoverView handover={handover} />
            {role === 'tenant' && handover.status === 'recorded' ? (
              <TenantActions
                confirmBusy={confirmBusy}
                objectBusy={objectBusy}
                alreadyObjected={handover.discrepancies.some(
                  item => item.revision === handover.revision
                )}
                alreadyConfirmed={Boolean(handover.tenantConfirmation)}
                onConfirm={() =>
                  void run(
                    () =>
                      confirmMoveOutHandover(contractId, handover.handoverHash),
                    'Không xác nhận được biên bản trả nhà.'
                  )
                }
                onObject={note =>
                  void run(
                    () =>
                      objectMoveOutHandover(
                        contractId,
                        handover.handoverHash,
                        note
                      ),
                    'Không gửi được phản đối.'
                  )
                }
              />
            ) : null}
            {role === 'landlord' && handover.status === 'recorded' ? (
              <div className="space-y-2">
                <Button
                  type="button"
                  variant="secondary"
                  className="min-h-11"
                  aria-expanded={showRevise}
                  onClick={() => setShowRevise(open => !open)}
                >
                  Sửa biên bản (tạo bản mới, khách xác nhận lại)
                </Button>
                {showRevise ? (
                  <MoveOutHandoverForm
                    busy={recordBusy}
                    initial={handover}
                    onSubmit={handleRecord}
                  />
                ) : null}
              </div>
            ) : null}
            {handover.status === 'recorded' ? (
              <NoteAction
                openLabel="Yêu cầu tranh chấp"
                fieldLabel="Lý do tranh chấp"
                submitLabel="Gửi yêu cầu tranh chấp"
                busy={busy}
                onSubmit={note =>
                  void run(
                    () => disputeMoveOutHandover(contractId, note),
                    'Không gửi được yêu cầu tranh chấp.'
                  )
                }
              />
            ) : null}
            {isCompleted ? (
              <Button
                type="button"
                variant="secondary"
                className="min-h-11"
                disabled={downloading}
                onClick={() => void handleDownload()}
              >
                <FileDown className="h-4 w-4" aria-hidden="true" />
                {downloading ? 'Đang tải...' : 'Tải PDF biên bản'}
              </Button>
            ) : null}
          </>
        ) : null}
        {blockedReasons.map(reason => (
          <p
            key={reason}
            data-testid="move-out-blocked-reason"
            className="text-xs text-[var(--muted)]"
          >
            {reason}
          </p>
        ))}
        {error ? (
          <p role="alert" className="text-xs text-[var(--danger)]">
            {error}
          </p>
        ) : null}
      </SectionState>
    </section>
  )
}

interface TenantActionsProps {
  confirmBusy: boolean
  objectBusy: boolean
  alreadyObjected: boolean
  alreadyConfirmed: boolean
  onConfirm: () => void
  onObject: (note: string) => void
}

function TenantActions({
  confirmBusy,
  objectBusy,
  alreadyObjected,
  alreadyConfirmed,
  onConfirm,
  onObject,
}: TenantActionsProps): ReactElement {
  if (alreadyConfirmed) {
    return (
      <p className="text-xs text-[var(--success)]">
        Bạn đã xác nhận biên bản này.
      </p>
    )
  }
  if (alreadyObjected) {
    return (
      <p className="text-xs text-[var(--warning)]">
        Đã gửi phản đối. Chờ chủ nhà sửa biên bản.
      </p>
    )
  }
  return (
    <div className="flex flex-wrap items-start gap-2">
      <Button
        type="button"
        className="min-h-11"
        disabled={confirmBusy}
        onClick={onConfirm}
      >
        Xác nhận biên bản
      </Button>
      <NoteAction
        openLabel="Phản đối biên bản"
        fieldLabel="Điểm chưa đúng"
        submitLabel="Gửi phản đối"
        busy={objectBusy}
        onSubmit={onObject}
      />
    </div>
  )
}
