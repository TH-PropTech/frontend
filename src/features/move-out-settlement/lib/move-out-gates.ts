import type { ContractFlowAction } from '@/features/contracts/api/contracts-api'
import { getFlowReasonLabel } from '@/features/contracts/lib/contract-labels'
import type { MoveOutActionKey, MoveOutGates } from '../api/move-out-types'

const MOVE_OUT_ACTIONS: ReadonlySet<string> = new Set<MoveOutActionKey>([
  'RECORD_MOVE_OUT_HANDOVER',
  'CONFIRM_MOVE_OUT_HANDOVER',
  'REPORT_MOVE_OUT_DISCREPANCY',
  'CREATE_DEPOSIT_STATEMENT',
  'RESPOND_DEPOSIT_STATEMENT',
  'RECORD_DEPOSIT_REFUND',
  'ACKNOWLEDGE_DEPOSIT_REFUND',
])

export function toMoveOutGates(actions: ContractFlowAction[]): MoveOutGates {
  const gates: MoveOutGates = {}
  for (const item of actions) {
    if (MOVE_OUT_ACTIONS.has(item.action)) {
      gates[item.action as MoveOutActionKey] = {
        enabled: item.enabled,
        reasonCode: item.reasonCode,
      }
    }
  }
  return gates
}

export const isGateBlocked = (
  gates: MoveOutGates | undefined,
  key: MoveOutActionKey
): boolean => gates?.[key]?.enabled === false

/** Các lý do (đã dịch, không trùng) của những thao tác đang bị khóa trong danh sách. */
export function getBlockedReasons(
  gates: MoveOutGates | undefined,
  keys: MoveOutActionKey[]
): string[] {
  const reasons = keys
    .filter(key => isGateBlocked(gates, key))
    .map(key => getFlowReasonLabel(gates?.[key]?.reasonCode))
  return Array.from(new Set(reasons))
}
