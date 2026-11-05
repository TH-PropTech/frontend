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

export interface HandoverTemplate {
  key: string
  status: 'draft' | 'published' | 'archived'
  version: number | null
  draftRevision: number
  contentHash: string | null
  publishedAt: string | null
  inventoryDefaults: Array<{ name: string; quantity: number }>
  checklist: Array<{ id: string; label: string }>
}

export interface HandoverTemplateAdminState {
  published: HandoverTemplate | null
  draft: HandoverTemplate | null
}

export interface HandoverTemplateContent {
  inventoryDefaults: HandoverTemplate['inventoryDefaults']
  checklist: HandoverTemplate['checklist']
}

/** Mẫu đang phát hành, dùng để nạp form Nhận nhà. */
export async function getHandoverTemplate(): Promise<HandoverTemplate | null> {
  return apiClient.get<HandoverTemplate | null>('/handover-template')
}

export async function getHandoverTemplateAdmin(): Promise<HandoverTemplateAdminState> {
  return apiClient.get<HandoverTemplateAdminState>('/handover-template/admin')
}

export async function saveHandoverTemplateDraft(
  expectedRevision: number,
  content: HandoverTemplateContent
): Promise<HandoverTemplate> {
  return apiClient.put<HandoverTemplate>('/handover-template/admin/draft', {
    expectedRevision,
    ...content,
  })
}

export async function publishHandoverTemplate(
  expectedRevision: number,
  reason: string
): Promise<HandoverTemplate> {
  return apiClient.post<HandoverTemplate>('/handover-template/admin/publish', {
    expectedRevision,
    reason,
  })
}
