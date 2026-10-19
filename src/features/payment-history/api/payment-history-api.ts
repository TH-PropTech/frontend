import { apiClient } from '@/shared/api'
import type { PaymentProviderName } from '@/features/payments/api/payments-api'

export type PaymentAttemptStatus =
  | 'pending'
  | 'processing'
  | 'succeeded'
  | 'failed'
  | 'expired'

export type PayoutStatus = 'awaiting-wallet' | 'pending' | 'paid-out' | 'failed'

export interface AdminPaymentParty {
  id: string
  name: string
  email: string
}

export interface AdminPaymentPayout {
  status: PayoutStatus
  relayRef: string | null
  failureReason: string | null
  paidOutAt: string | null
}

export interface AdminPaymentRow {
  txRef: string
  provider: PaymentProviderName
  attemptStatus: PaymentAttemptStatus
  amount: number
  paymentType: 'deposit' | 'rent' | 'settlement' | 'invoice'
  contractId: string | null
  createdAt: string
  payer: AdminPaymentParty | null
  landlord: AdminPaymentParty | null
  payeeRole: 'landlord' | 'platform' | 'unknown'
  paymentStatus: string | null
  paidAt: string | null
  payout: AdminPaymentPayout | null
  anomalies: string[]
}

export interface AdminPaymentsPage {
  items: AdminPaymentRow[]
  total: number
  page: number
  limit: number
}

export interface AdminPaymentsFilter {
  page?: number
  limit?: number
  provider?: PaymentProviderName
  status?: PaymentAttemptStatus
  payoutStatus?: PayoutStatus
  from?: string
  to?: string
  q?: string
}

function toQueryString(filter: AdminPaymentsFilter): string {
  const params = new URLSearchParams()
  if (filter.page) params.set('page', String(filter.page))
  if (filter.limit) params.set('limit', String(filter.limit))
  if (filter.provider) params.set('provider', filter.provider)
  if (filter.status) params.set('status', filter.status)
  if (filter.payoutStatus) params.set('payoutStatus', filter.payoutStatus)
  if (filter.from) params.set('from', filter.from)
  if (filter.to) params.set('to', filter.to)
  if (filter.q) params.set('q', filter.q)
  return params.toString()
}

export function getAdminPayments(
  filter: AdminPaymentsFilter
): Promise<AdminPaymentsPage> {
  const qs = toQueryString(filter)
  return apiClient.get<AdminPaymentsPage>(
    `/admin/payments${qs ? `?${qs}` : ''}`
  )
}

export function recheckAdminPayment(txRef: string): Promise<AdminPaymentRow> {
  return apiClient.post<AdminPaymentRow>(
    `/admin/payments/${encodeURIComponent(txRef)}/recheck`,
    {}
  )
}
