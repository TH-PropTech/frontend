import { apiClient } from '@/shared/api'

export type PaymentStatus = 'unpaid' | 'paid' | 'overdue'
export type PaymentType = 'deposit' | 'rent' | 'penalty'

export interface PaymentItem {
  _id: string
  contractId: string
  amount: number
  description: string
  dueDate: string
  paidAt: string | null
  status: PaymentStatus
  type: PaymentType
  txHash: string | null
  txRef: string | null
  ledgerStatus: 'not-required' | 'pending' | 'confirmed' | 'failed'
  reminderSentForDate?: string | null
}

export interface PaymentInit {
  provider: 'mock-bank' | 'vnpay' | 'momo' | 'sepay' | 'techcombank'
  txRef: string
  amount: number
  description: string
  qrCode: string
  deepLink: string
  expiresAt: string
  status: 'pending'
}

export interface LinkedWallet {
  userId: string
  provider: 'mock-bank' | 'vnpay' | 'momo' | 'sepay' | 'techcombank'
  externalAccountRef: string
  status: 'linked' | 'unlinked'
  simulation: boolean
  balance: null
}

export async function getPaymentsByContract(
  contractId: string
): Promise<PaymentItem[]> {
  return apiClient.get<PaymentItem[]>(`/payments?contractId=${contractId}`)
}

export async function initDepositPayment(
  depositAgreementId: string
): Promise<PaymentInit> {
  return apiClient.post<PaymentInit>('/bank/deposit/init', {
    depositAgreementId,
  })
}

export async function consentDepositAgreement(
  depositAgreementId: string,
  expectedRevision: number,
  expectedContentHash: string
): Promise<void> {
  await apiClient.post<void>(
    `/deposit-agreements/${depositAgreementId}/consent`,
    {
      expectedRevision,
      expectedContentHash,
    }
  )
}

export async function initRentPayment(paymentId: string): Promise<PaymentInit> {
  return apiClient.post<PaymentInit>('/bank/rent/init', { paymentId })
}

export async function getLinkedWallet(): Promise<LinkedWallet> {
  return apiClient.get<LinkedWallet>('/bank/wallet')
}

export async function linkWallet(): Promise<LinkedWallet> {
  return apiClient.post<LinkedWallet>('/bank/wallet/link', {})
}

export async function getOverduePayments(): Promise<PaymentItem[]> {
  return apiClient.get<PaymentItem[]>('/payments/overdue')
}

export async function processPaymentReminders(): Promise<{
  overdue: number
  reminders: number
}> {
  return apiClient.post('/payments/overdue/process', {})
}

export async function simulateMockPayment(txRef: string): Promise<void> {
  await apiClient.get(`/bank/simulate-success/${txRef}`)
}
