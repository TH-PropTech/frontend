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

export type PayoutSettlement = 'direct' | 'relay' | 'external'

export type GatewayReconcileStatus =
  | 'unverified'
  | 'verified'
  | 'mismatch'
  | 'unavailable'
  | 'not_applicable'

export type GatewayQueryStatus =
  | 'succeeded'
  | 'pending'
  | 'failed'
  | 'not_found'
  | 'unavailable'

export interface AdminPaymentGateway {
  kind: 'external' | 'internal'
  reconcileStatus: GatewayReconcileStatus
  gatewayStatus: GatewayQueryStatus | null
  providerTransactionId: string | null
  checkedAt: string | null
}

export interface AdminPaymentPayout {
  id?: string
  settlement?: PayoutSettlement
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
  gateway?: AdminPaymentGateway
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

export interface PayoutView {
  id: string
  status: PayoutStatus
  settlement?: PayoutSettlement
}

export function markPayoutSettledExternally(
  payoutId: string,
  note?: string
): Promise<PayoutView> {
  return apiClient.post<PayoutView>(
    `/payouts/${encodeURIComponent(payoutId)}/mark-settled-externally`,
    note ? { note } : {}
  )
}
