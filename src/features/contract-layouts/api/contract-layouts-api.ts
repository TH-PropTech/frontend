import { apiClient } from '@/shared/api'

export type ContractLayoutBlock = {
  blockId: string
  order: number
  title: string
  visible: boolean
}

export type ContractLayoutProfile = {
  profileKey: string
  version: number
  status: 'draft' | 'published' | 'archived'
  legalProfile:
    | 'PRIVATE_CIVIL_APARTMENT_LEASE'
    | 'REAL_ESTATE_BUSINESS_STANDARD'
  templateKey?: string | null
  blocks: ContractLayoutBlock[]
  supplementaryClauses: Array<{
    id: string
    title: string
    content: string
    enabled: boolean
  }>
}

export type ContractLayoutDraftInput = Pick<
  ContractLayoutProfile,
  'legalProfile' | 'templateKey' | 'blocks' | 'supplementaryClauses'
> & { expectedRevision: number }

export async function previewContractLayout(
  profileKey: string
): Promise<ContractLayoutProfile> {
  return apiClient.post<ContractLayoutProfile>(
    `/contract-layouts/admin/${encodeURIComponent(profileKey)}/preview`,
    {}
  )
}

export async function saveContractLayoutDraft(
  profileKey: string,
  input: ContractLayoutDraftInput
): Promise<ContractLayoutProfile> {
  return apiClient.post<ContractLayoutProfile>(
    `/contract-layouts/admin/${encodeURIComponent(profileKey)}/draft`,
    input
  )
}
