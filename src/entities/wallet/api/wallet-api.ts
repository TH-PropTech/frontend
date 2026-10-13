import { apiClient } from '@/shared/api'

export interface WalletBank {
  code: string
  name: string
}

export interface Wallet {
  userId: string
  status: 'linked' | 'unlinked'
  simulation: boolean
  bank: WalletBank | null
  accountHolder: string | null
  accountNumberMasked: string | null
  linkedAt: string | null
}

/** Một dòng sao kê dựng từ Payout/Payment (D5); không có balanceAfter, không phải sổ cái. */
export interface WalletStatementItem {
  type: 'payout' | 'platform-fee'
  amount: number
  refType: string
  refId: string
  contractId: string | null
  description: string
  createdAt: string
}

export interface WalletTransactionPage {
  items: WalletStatementItem[]
  total: number
  page: number
  limit: number
}

export interface PayableInvoice {
  paymentId: string
  contractId: string
  amount: number
  vatAmount: number
  description: string
  dueDate: string
  status: string
}

export interface LinkWalletInput {
  bankCode: string
  accountNumber: string
  accountHolder: string
}

export function getWallet(): Promise<Wallet> {
  return apiClient.get<Wallet>('/wallet')
}

export function getWalletBanks(): Promise<WalletBank[]> {
  return apiClient.get<WalletBank[]>('/wallet/banks')
}

export function linkWallet(input: LinkWalletInput): Promise<Wallet> {
  return apiClient.post<Wallet>('/wallet/link', input)
}

export function getWalletTransactions(): Promise<WalletTransactionPage> {
  return apiClient.get<WalletTransactionPage>('/wallet/transactions?limit=10')
}

export function getPayableInvoices(): Promise<PayableInvoice[]> {
  return apiClient.get<PayableInvoice[]>('/wallet/invoices')
}
