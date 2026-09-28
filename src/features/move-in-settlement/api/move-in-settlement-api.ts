import { apiClient } from '@/shared/api'
import type {
  HandoverInput,
  MoveInSettlementView,
} from '@/features/contracts/api/contracts-api'

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
