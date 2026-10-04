import type { ContractStatus } from '../api/contracts-api'

const CONTRACT_STATUS_LABELS: Record<ContractStatus, string> = {
  draft: 'Bản nháp',
  'deposit-pending': 'Chờ đặt cọc',
  'deposit-paid': 'Đã đặt cọc',
  'awaiting-signature': 'Chờ ký',
  'fully-signed-pending-deposit': 'Đã ký, chờ đặt cọc',
  active: 'Đang hiệu lực',
  terminated: 'Đã chấm dứt',
  cancelled: 'Đã hủy',
  completed: 'Hoàn tất',
}

const EXECUTION_STRATEGY_LABELS = {
  DEPOSIT_FIRST: 'Cọc trước, ký sau',
  SIGN_FIRST: 'Ký trước, cọc sau',
} as const

/** Nhãn tiếng Việt cho trạng thái hợp đồng; giá trị lạ trả về nguyên bản. */
export function getContractStatusLabel(status: string): string {
  return CONTRACT_STATUS_LABELS[status as ContractStatus] ?? status
}

export function getExecutionStrategyLabel(
  strategy: keyof typeof EXECUTION_STRATEGY_LABELS
): string {
  return EXECUTION_STRATEGY_LABELS[strategy]
}
