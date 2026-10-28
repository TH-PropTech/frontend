'use client'

import { useState, type ReactElement } from 'react'
import type { ContractMoveOutPhase } from '@/features/contracts/api/contracts-api'
import { getMoveOutPhaseLabel } from '@/features/contracts/lib/contract-labels'
import type { MoveOutGates } from '../api/move-out-types'
import { DepositStatementSection } from './deposit-statement-section'
import {
  MoveOutHandoverSection,
  type MoveOutRole,
} from './move-out-handover-section'

export interface MoveOutPanelProps {
  contractId: string
  role: MoveOutRole
  /** Tiền cọc của hợp đồng (đồng). */
  depositAmount: number
  /** Quyền thao tác từ flow của hợp đồng; vắng thì không chặn thêm. */
  gates?: MoveOutGates
  /** Gọi sau mỗi thao tác ghi thành công để cha tải lại hợp đồng. */
  onChanged?: () => unknown
  /** Giai đoạn do server tính, hiện thành nhãn tiếng Việt. */
  phase?: ContractMoveOutPhase | undefined
}

/** Trả nhà và hoàn cọc: biên bản trả nhà trước, bảng khấu trừ và hoàn cọc sau. */
export function MoveOutPanel({
  contractId,
  role,
  depositAmount,
  gates,
  onChanged,
  phase,
}: MoveOutPanelProps): ReactElement {
  const [handoverCompleted, setHandoverCompleted] = useState(false)
  return (
    <div data-testid="move-out-panel" className="space-y-4">
      {phase ? (
        <p className="text-xs font-semibold text-[var(--fg)]">
          Giai đoạn: {getMoveOutPhaseLabel(phase)}
        </p>
      ) : null}
      <MoveOutHandoverSection
        contractId={contractId}
        role={role}
        gates={gates}
        onChanged={onChanged}
        onCompletedChange={setHandoverCompleted}
      />
      <DepositStatementSection
        contractId={contractId}
        role={role}
        enabled={handoverCompleted}
        gates={gates}
        onChanged={onChanged}
        depositAmount={depositAmount}
      />
    </div>
  )
}
