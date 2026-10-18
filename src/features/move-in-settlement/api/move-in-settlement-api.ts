import { apiClient } from '@/shared/api'
import type {
  HandoverInput,
  MoveInSettlementView,
} from '@/features/contracts/api/contracts-api'

export interface SettlementPaymentRequest {
  txRef: string
  deepLink: string
  expiresAt: string
  status: 'pending'
}

export async function initSettlementPayment(
  settlementId: string
): Promise<SettlementPaymentRequest> {
  return apiClient.post<SettlementPaymentRequest>('/bank/settlement/init', {
    settlementId,
  })
}

export async function updateHandover(
  settlementId: string,
  input: HandoverInput
): Promise<MoveInSettlementView> {
  return apiClient.put<MoveInSettlementView>(
    `/move-in-settlements/${settlementId}/handover`,
    input
  )
}

export async function confirmHandover(
  settlementId: string,
  handoverHash: string,
  role: 'tenant' | 'landlord'
): Promise<MoveInSettlementView> {
  return apiClient.post<MoveInSettlementView>(
    `/move-in-settlements/${settlementId}/handover/confirm`,
    { handoverHash, role }
  )
}

export async function downloadHandoverPdf(settlementId: string): Promise<Blob> {
  return apiClient.getBlob(`/move-in-settlements/${settlementId}/handover/pdf`)
}

export async function reportHandoverDiscrepancy(
  settlementId: string,
  handoverHash: string,
  note: string
): Promise<MoveInSettlementView> {
  return apiClient.post<MoveInSettlementView>(
    `/move-in-settlements/${settlementId}/handover/discrepancy`,
    { handoverHash, note }
  )
}
