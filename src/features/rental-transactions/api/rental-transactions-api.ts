import { apiClient } from '@/shared/api'

export interface RentalTransactionEvent {
  id: string
  applicationId?: string | null
  contractId?: string | null
  eventType: string
  status: 'completed' | 'blocked' | 'failed' | 'pending'
  occurredAt: string
  actorRole?: string | null
  summary?: string | null
}

/** Khớp `StuckRentalTransaction` của backend (`GET /rental-transactions/admin/stuck`). */
export interface StuckRentalTransaction {
  reasonCode: string
  applicationId: string | null
  contractId: string | null
  aggregateRef: string | null
  ageMinutes: number
  /** Có thể là action backend chưa cho recover thủ công (vd RETRY_HANDOVER). */
  suggestedAction: string
}

export type RecoveryAction =
  | 'RETRY_ACTIVATION'
  | 'REISSUE_DEPOSIT_REQUEST'
  | 'EXPIRE_DEPOSIT'
  | 'RETRY_PROVISIONING'
  | 'RETRY_LEDGER'

export const RECOVERY_ACTIONS: readonly RecoveryAction[] = [
  'RETRY_ACTIVATION',
  'REISSUE_DEPOSIT_REQUEST',
  'EXPIRE_DEPOSIT',
  'RETRY_PROVISIONING',
  'RETRY_LEDGER',
]

export function isRecoveryAction(value: string): value is RecoveryAction {
  return (RECOVERY_ACTIONS as readonly string[]).includes(value)
}

export interface RecoverRentalTransactionResult {
  action: RecoveryAction
  contractId: string
  status: string
}

export function getRentalTransactionTimeline(
  applicationId: string
): Promise<RentalTransactionEvent[]> {
  return apiClient.get<RentalTransactionEvent[]>(
    `/rental-transactions/${encodeURIComponent(applicationId)}/timeline`
  )
}

export function getStuckRentalTransactions(): Promise<
  StuckRentalTransaction[]
> {
  return apiClient.get<StuckRentalTransaction[]>(
    '/rental-transactions/admin/stuck'
  )
}

export function recoverRentalTransaction(
  contractId: string,
  input: { action: RecoveryAction; reason: string }
): Promise<RecoverRentalTransactionResult> {
  return apiClient.post<RecoverRentalTransactionResult>(
    `/rental-transactions/${encodeURIComponent(contractId)}/recover`,
    input
  )
}
