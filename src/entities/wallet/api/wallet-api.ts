import { apiClient } from '@/shared/api'

export interface WalletBank {
  code: string
  name: string
}

export type WalletBrand = 'mocbank' | 'momo' | 'zalopay'

/** Tài khoản mô phỏng thuộc thương hiệu khác (Momo/ZaloPay) trong Ví Mộc. */
export interface WalletExtraAccount {
  brand: Exclude<WalletBrand, 'mocbank'>
  accountHolder: string
  accountNumberMasked: string
  /** Full number, present only in the owner's own view (for QR). */
  accountNumber?: string | null
  linkedAt: string | null
}

export interface Wallet {
  userId: string
  status: 'linked' | 'unlinked'
  simulation: boolean
  bank: WalletBank | null
  accountHolder: string | null
  accountNumberMasked: string | null
  /** Full Ví Mộc account number, present only in the owner's own view (for QR). */
  accountNumber: string | null
  linkedAt: string | null
  /** Empty when none; treat missing as empty. */
  extraAccounts?: WalletExtraAccount[]
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
  accountNumber: string
  /** Omitted or 'mocbank' = primary wallet. */
  brand?: WalletBrand
}

export function getWallet(): Promise<Wallet> {
  return apiClient.get<Wallet>('/wallet')
}

export function linkWallet(input: LinkWalletInput): Promise<Wallet> {
  return apiClient.post<Wallet>('/wallet/link', {
    accountNumber: input.accountNumber,
    ...(input.brand ? { brand: input.brand } : {}),
  })
}

export function getWalletTransactions(): Promise<WalletTransactionPage> {
  return apiClient.get<WalletTransactionPage>('/wallet/transactions?limit=10')
}

export function getPayableInvoices(): Promise<PayableInvoice[]> {
  return apiClient.get<PayableInvoice[]>('/wallet/invoices')
}

export type ReceivingAccountState =
  | 'active'
  | 'not_found'
  | 'unreachable'
  | 'brand_mismatch'

export interface ReceivingAccount {
  brand: WalletBrand
  accountNumberMasked: string
  accountHolder: string | null
  state: ReceivingAccountState
  message: string
}

export interface ReceivingLastReceived {
  payoutId: string
  contractId: string | null
  amount: number
  paidOutAt: string
  reference: string | null
}

export type ReceivingIssueStatus = 'awaiting-wallet' | 'pending' | 'failed'

export interface ReceivingIssue {
  payoutId: string
  contractId: string | null
  amount: number
  status: ReceivingIssueStatus
  reasonCode: string | null
  reason: string
  createdAt: string
  reportedAt: string | null
}

export interface ReceivingStatus {
  checkedAt: string
  hasLinkedWallet: boolean
  accounts?: ReceivingAccount[]
  lastReceived?: ReceivingLastReceived | null
  counts?: { awaitingWallet: number; pending: number; failed: number }
  issues?: ReceivingIssue[]
}

export function getReceivingStatus(refresh = false): Promise<ReceivingStatus> {
  return apiClient.get<ReceivingStatus>(
    `/wallet/receiving-status?refresh=${refresh ? 'true' : 'false'}`
  )
}

export function reportPayoutIssue(
  payoutId: string,
  note?: string
): Promise<{ reportedAt: string }> {
  return apiClient.post<{ reportedAt: string }>(
    `/payouts/${encodeURIComponent(payoutId)}/report-issue`,
    note ? { note } : {}
  )
}
