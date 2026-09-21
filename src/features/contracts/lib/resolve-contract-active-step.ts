import type { ContractStatus } from '../api/contracts-api'

/** Bước hiện tại của người dùng trong luồng hợp đồng */
export type ContractActiveStep =
  | 'document' // Đang ở bước đọc/xác nhận hợp đồng
  | 'deposit' // Đến lượt đặt cọc
  | 'signing' // Đến lượt ký số SmartCA
  | 'ledger' // Đã xong cả cọc + ký, đang ghi sổ cái
  | 'completed' // Hợp đồng hoàn tất

export interface ResolveActiveStepInput {
  strategy: 'DEPOSIT_FIRST' | 'SIGN_FIRST'
  status: ContractStatus
  depositStatus?: string | null | undefined
  signedByTenant?: boolean | undefined
  signedByLandlord?: boolean | undefined
}

/**
 * Pure function tính bước hiện tại (active step) của luồng hợp đồng.
 * Dùng chung giữa ContractFlowGuide, ContractWorkspace (truyền isActiveStep).
 *
 * [uc_contract_flow_guide]
 */
export function resolveContractActiveStep(
  input: ResolveActiveStepInput
): ContractActiveStep {
  const { strategy, status, signedByTenant, signedByLandlord } = input

  // Hoàn tất hoặc huỷ
  if (
    status === 'completed' ||
    status === 'terminated' ||
    status === 'cancelled'
  ) {
    return 'completed'
  }

  // Đang ghi sổ cái (active nhưng chưa completed)
  if (status === 'active') {
    return 'ledger'
  }

  if (strategy === 'DEPOSIT_FIRST') {
    // Bước 1: draft → cần đọc hợp đồng
    if (status === 'draft') return 'document'
    // Bước 2: deposit-pending → đến lượt cọc
    if (status === 'deposit-pending') return 'deposit'
    // Bước 3: deposit-paid → đến lượt ký
    if (status === 'deposit-paid' || status === 'awaiting-signature')
      return 'signing'
    // fully-signed-pending-deposit không xảy ra trong DEPOSIT_FIRST
    // nhưng nếu có → coi là signing vẫn chưa xong
    if (status === 'fully-signed-pending-deposit') return 'deposit'
    return 'document'
  }

  // SIGN_FIRST
  // Bước 1: draft → đọc hợp đồng
  if (status === 'draft') return 'document'
  // Bước 2: awaiting-signature hoặc deposit-pending chưa ký đủ → ký số
  if (status === 'awaiting-signature' || status === 'deposit-pending') {
    const bothSigned = signedByTenant === true && signedByLandlord === true
    if (!bothSigned) return 'signing'
    return 'deposit'
  }
  // Bước 3: fully-signed-pending-deposit → đến lượt cọc
  if (status === 'fully-signed-pending-deposit') return 'deposit'
  // deposit-paid → ghi sổ cái
  if (status === 'deposit-paid') return 'ledger'

  return 'document'
}
