import { apiClient } from '@/shared/api'

export type PayoutStatus = 'awaiting-wallet' | 'pending' | 'paid-out' | 'failed'

export interface PayoutItem {
  _id: string
  paymentId: string
  contractId: string | null
  sentAmount: number
  feeAmount: number
  receivedAmount: number
  status: PayoutStatus
  txRef: string | null
  attempts: number
  failureReason: string | null
  paidOutAt: string | null
  createdAt: string
}

export interface PayoutList {
  items: PayoutItem[]
  total: number
  page: number
  limit: number
}

export function getMyPayouts(): Promise<PayoutList> {
  return apiClient.get<PayoutList>('/payouts/me')
}

export function settlePayout(
  txRef: string,
  outcome: 'success' | 'failed'
): Promise<{ payout: PayoutItem; replayed: boolean }> {
  return apiClient.post(
    `/bank/payout/${encodeURIComponent(txRef)}/${outcome}`,
    {}
  )
}
