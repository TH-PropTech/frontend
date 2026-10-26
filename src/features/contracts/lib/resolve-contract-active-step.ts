import type { ContractFlowView, ContractStatus } from '../api/contracts-api'

/** Bước hiện tại của người dùng trong luồng hợp đồng */
export type ContractActiveStep =
  | 'document' // Đang ở bước đọc/xác nhận hợp đồng
  | 'deposit' // Đến lượt đặt cọc
  | 'signing' // Đến lượt ký số SmartCA
  | 'ledger' // Đã xong cả cọc + ký, đang ghi sổ cái
  | 'move-in' // Quyết toán và bàn giao nhận nhà (chỉ khi server trả stage này)
  | 'move-out' // Trả nhà, khấu trừ và hoàn cọc (chỉ khi server trả stage này)
  | 'completed' // Hợp đồng hoàn tất

export interface ResolveActiveStepInput {
  status: ContractStatus
  depositStatus?: string | null | undefined
  signedByTenant?: boolean | undefined
  signedByLandlord?: boolean | undefined
  /** Khối `flow` của Contract View; khi có thì là nguồn sự thật duy nhất. */
  serverFlow?: ContractFlowView | null | undefined
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
  const { status, signedByTenant, signedByLandlord, serverFlow } = input

  if (serverFlow) return serverFlow.activeStage

  // Fallback cho response cũ không có `flow`. Hoàn tất hoặc huỷ
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

  // Luồng duy nhất: ký trước, cọc sau (mọi strategy cũ từ API đều coi là ký trước)
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
