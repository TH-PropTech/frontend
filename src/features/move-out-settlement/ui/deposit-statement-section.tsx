'use client'

import type { ReactElement } from 'react'
import {
  acknowledgeDepositRefund,
  disputeDepositStatement,
  recordDepositRefund,
  respondDepositStatement,
  saveDepositStatementDraft,
  submitDepositStatement,
} from '../api/move-out-api'
import type { DeductionLineInput, MoveOutGates } from '../api/move-out-types'
import { getBlockedReasons, isGateBlocked } from '../lib/move-out-gates'
import { useDepositStatement } from '../model/use-move-out-resources'
import { DeductionStatementEditor } from './deduction-statement-editor'
import { DeductionStatementView } from './deduction-statement-view'
import { DepositRefundSection } from './deposit-refund-section'
import type { MoveOutRole } from './move-out-handover-section'
import { NoteAction } from './note-action'
import { SectionState } from './section-state'

export interface DepositStatementSectionProps {
  contractId: string
  role: MoveOutRole
  /** Chỉ mở khi biên bản trả nhà đã hoàn tất. */
  enabled: boolean
  gates?: MoveOutGates | undefined
  /** Gọi sau mỗi thao tác ghi thành công để cha tải lại hợp đồng. */
  onChanged?: (() => unknown) | undefined
  /** Tiền cọc của hợp đồng, dùng khi chưa có bảng để kiểm tra tổng khấu trừ. */
  depositAmount: number
}

const DISPUTABLE = new Set(['awaiting-tenant', 'accepted', 'refund-recorded'])

export function DepositStatementSection({
  contractId,
  role,
  enabled,
  gates,
  onChanged,
  depositAmount,
}: DepositStatementSectionProps): ReactElement {
  const { statement, isLoading, isError, refetch, busy, error, run } =
    useDepositStatement(contractId, enabled, onChanged)

  const saveDraft = (lines: DeductionLineInput[]): Promise<boolean> =>
    run(
      () => saveDepositStatementDraft(contractId, lines),
      'Không lưu được bảng khấu trừ.'
    )
  const saveAndSubmit = (lines: DeductionLineInput[]): void => {
    void run(async () => {
      await saveDepositStatementDraft(contractId, lines)
      await submitDepositStatement(contractId)
    }, 'Không gửi được bảng khấu trừ cho khách thuê.')
  }

  const createBusy = busy || isGateBlocked(gates, 'CREATE_DEPOSIT_STATEMENT')
  const respondBusy = busy || isGateBlocked(gates, 'RESPOND_DEPOSIT_STATEMENT')
  const recordBusy = busy || isGateBlocked(gates, 'RECORD_DEPOSIT_REFUND')
  const ackBusy = busy || isGateBlocked(gates, 'ACKNOWLEDGE_DEPOSIT_REFUND')
  const blockedReasons = getBlockedReasons(gates, [
    'CREATE_DEPOSIT_STATEMENT',
    'RESPOND_DEPOSIT_STATEMENT',
    'RECORD_DEPOSIT_REFUND',
    'ACKNOWLEDGE_DEPOSIT_REFUND',
  ])
  const isEditing =
    role === 'landlord' && (!statement || statement.status === 'draft')

  return (
    <section
      data-testid="deposit-statement"
      aria-labelledby="deposit-statement-title"
      className="space-y-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
    >
      <h2
        id="deposit-statement-title"
        className="text-sm font-bold text-[var(--fg)]"
      >
        Khấu trừ và hoàn cọc
      </h2>
      {!enabled ? (
        <p className="text-xs text-[var(--muted)]">
          Bảng khấu trừ cọc sẽ mở sau khi biên bản trả nhà hoàn tất.
        </p>
      ) : (
        <SectionState
          isLoading={isLoading}
          isError={isError}
          onRetry={() => void refetch()}
          loadingText="Đang tải bảng khấu trừ cọc..."
          errorText="Không tải được bảng khấu trừ cọc."
        >
          {!statement && role === 'tenant' ? (
            <p className="text-xs text-[var(--muted)]">
              Chủ nhà chưa lập bảng khấu trừ cọc. Khi có, bạn sẽ đồng ý hoặc
              phản đối từng khoản tại đây.
            </p>
          ) : null}
          {isEditing ? (
            <DeductionStatementEditor
              depositAmount={statement?.depositAmount ?? depositAmount}
              initialLines={(statement?.lines ?? []).map(line => ({
                reason: line.reason,
                amount: line.amount,
                evidenceUrls: line.evidenceUrls,
              }))}
              busy={createBusy}
              onSave={lines => void saveDraft(lines)}
              onSubmit={saveAndSubmit}
            />
          ) : null}
          {statement && !isEditing ? (
            <>
              <DeductionStatementView
                statement={statement}
                canRespond={
                  role === 'tenant' && statement.status === 'awaiting-tenant'
                }
                busy={respondBusy}
                onRespond={responses =>
                  void run(
                    () => respondDepositStatement(contractId, responses),
                    'Không gửi được phản hồi.'
                  )
                }
              />
              {DISPUTABLE.has(statement.status) && !statement.dispute ? (
                <NoteAction
                  openLabel="Yêu cầu tranh chấp"
                  fieldLabel="Lý do tranh chấp"
                  submitLabel="Gửi yêu cầu tranh chấp"
                  busy={busy}
                  onSubmit={note =>
                    void run(
                      () => disputeDepositStatement(contractId, note),
                      'Không gửi được yêu cầu tranh chấp.'
                    )
                  }
                />
              ) : null}
              <DepositRefundSection
                statement={statement}
                role={role}
                busy={recordBusy}
                ackBusy={ackBusy}
                onRecord={input =>
                  void run(
                    () => recordDepositRefund(contractId, input),
                    'Không ghi nhận được khoản hoàn cọc.'
                  )
                }
                onAcknowledge={refundId =>
                  void run(
                    () => acknowledgeDepositRefund(contractId, refundId),
                    'Không xác nhận được khoản hoàn cọc.'
                  )
                }
              />
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
      )}
    </section>
  )
}
