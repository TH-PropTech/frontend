import { apiClient } from '@/shared/api'

export type PaymentProviderName =
  | 'mock-bank'
  | 'vnpay'
  | 'momo'
  | 'zalopay'
  | 'mocbank'
  | 'sepay'
  | 'techcombank'

/** Ví nhận tiền của chủ nhà khi thanh toán qua Ví Mộc. */
export type WalletBrand = 'mocbank' | 'momo' | 'zalopay' | 'vnpay'

export interface WalletBrandOption {
  brand: WalletBrand
  label: string
}

export type PaymentStatus = 'unpaid' | 'paid' | 'overdue' | 'waived'
export type PaymentType =
  | 'deposit'
  | 'rent'
  | 'penalty'
  | 'deposit-topup'
  | 'platform-fee'

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
  provider: PaymentProviderName
  txRef: string
  amount: number
  description: string
  qrCode: string
  deepLink: string
  expiresAt: string
  status: 'pending'
}

export type MomoPaymentMethod = 'wallet' | 'atm' | 'card'

/** MoMo payment method with its per-order VND limits (from the backend). */
export interface MomoMethodOption {
  method: MomoPaymentMethod
  label: string
  minAmount: number
  maxAmount: number
}

/** Gateways the backend allow-list exposes for the picker (no credentials). */
export interface PaymentProviderOption {
  provider: PaymentProviderName
  label: string
  simulation: boolean
  /** MoMo only. */
  methods?: MomoMethodOption[]
  /** Ví Mộc only: landlord wallet brands the money can be routed to. */
  brands?: WalletBrandOption[]
}

/** True when `amount` fits the method's limits (unknown amount = allowed). */
export function isMomoMethodAvailable(
  option: Pick<MomoMethodOption, 'minAmount' | 'maxAmount'>,
  amount?: number
): boolean {
  return (
    amount === undefined ||
    (amount >= option.minAmount && amount <= option.maxAmount)
  )
}

export interface GatewayPaymentResult {
  txRef: string
  provider: PaymentProviderName
  paymentType: 'deposit' | 'rent' | 'settlement' | 'invoice'
  attemptStatus: 'pending' | 'processing' | 'succeeded' | 'failed' | 'expired'
  targetPaid: boolean
  contractId: string | null
}

export async function getGatewayPaymentResult(
  txRef: string
): Promise<GatewayPaymentResult> {
  return apiClient.get<GatewayPaymentResult>(
    `/bank/attempts/${encodeURIComponent(txRef)}/result`
  )
}

/** Tenant's gateway choice; the server enforces the allow-list. */
export interface PaymentChoice {
  provider?: PaymentProviderName
  /** Only sent when `provider` is MoMo. */
  momoMethod?: MomoPaymentMethod
  /** Only sent when `provider` is Ví Mộc and the brand is set. */
  brand?: WalletBrand
}

function choiceBody(choice: PaymentChoice): {
  provider?: PaymentProviderName
  momoMethod?: MomoPaymentMethod
  brand?: WalletBrand
  clientChannel: 'web'
} {
  if (!choice.provider) return { clientChannel: 'web' }
  if (choice.provider === 'momo' && choice.momoMethod) {
    return {
      provider: choice.provider,
      momoMethod: choice.momoMethod,
      clientChannel: 'web',
    }
  }
  if (choice.provider === 'mocbank' && choice.brand) {
    return {
      provider: choice.provider,
      brand: choice.brand,
      clientChannel: 'web',
    }
  }
  return { provider: choice.provider, clientChannel: 'web' }
}

export async function getPaymentProviders(
  purpose?: 'invoice'
): Promise<PaymentProviderOption[]> {
  return apiClient.get<PaymentProviderOption[]>(
    purpose ? `/bank/providers?purpose=${purpose}` : '/bank/providers'
  )
}

export async function getPaymentsByContract(
  contractId: string
): Promise<PaymentItem[]> {
  return apiClient.get<PaymentItem[]>(`/payments?contractId=${contractId}`)
}

export async function initDepositPayment(
  depositAgreementId: string,
  choice: PaymentChoice = {}
): Promise<PaymentInit> {
  return apiClient.post<PaymentInit>('/bank/deposit/init', {
    depositAgreementId,
    ...choiceBody(choice),
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

export async function initRentPayment(
  paymentId: string,
  choice: PaymentChoice = {}
): Promise<PaymentInit> {
  return apiClient.post<PaymentInit>('/bank/rent/init', {
    paymentId,
    ...choiceBody(choice),
  })
}

export async function initInvoicePayment(
  paymentId: string,
  choice: PaymentChoice = {}
): Promise<PaymentInit> {
  return apiClient.post<PaymentInit>('/bank/invoice/init', {
    paymentId,
    ...choiceBody(choice),
  })
}

/** True when the init URL points at a real external gateway page. */
const EXTERNAL_GATEWAYS: readonly PaymentProviderName[] = [
  'vnpay',
  'momo',
  'zalopay',
  'mocbank',
]

export function isExternalGateway(
  init: Partial<Pick<PaymentInit, 'provider'>>
): boolean {
  return (
    init.provider !== undefined && EXTERNAL_GATEWAYS.includes(init.provider)
  )
}

export type PaymentReturnStatus = 'succeeded' | 'failed'

/**
 * Reads the `?payment=` hint the backend appends after a gateway return. The
 * hint only selects a notice; paid state always comes from the server view.
 */
export function readPaymentReturnParam(): PaymentReturnStatus | null {
  if (typeof window === 'undefined') return null
  const status = new URL(window.location.href).searchParams.get('payment')
  return status === 'succeeded' || status === 'failed' ? status : null
}

/** Removes the gateway return hint so a reload does not repeat the notice. */
export function stripPaymentReturnParam(): void {
  if (typeof window === 'undefined') return
  const url = new URL(window.location.href)
  url.searchParams.delete('payment')
  url.searchParams.delete('provider')
  window.history.replaceState(window.history.state, '', url.toString())
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
