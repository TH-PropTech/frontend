import { apiClient } from '@/shared/api'

export type ContractTemplateKey =
  | 'VN_INDIVIDUAL_RESIDENTIAL_LEASE'
  | 'VN_RE_BUSINESS_ND96_APPENDIX_II'

export interface ContractTemplateClauseDto {
  id?: string
  number: number
  heading: string
  content?: string
  variableRefs?: string[]
  contentHash: string
  citationIds: string[]
  protected: boolean
}

export interface ContractTemplateAnnexDto {
  id: string
  title: string
  description?: string
  required: boolean
}

export interface ContractTemplateAddendumDto {
  id: string
  title: string
  content: string
  enabled: boolean
}

export interface ContractTemplateDto {
  templateKey: string
  version: number
  status: 'draft' | 'published' | 'retired'
  legalProfile:
    | 'PRIVATE_CIVIL_APARTMENT_LEASE'
    | 'REAL_ESTATE_BUSINESS_STANDARD'
  clauses: ContractTemplateClauseDto[]
  schemaVersion: number
  effectiveFrom?: string | null
  referenceOnly?: boolean
  reviewReference?: string | null
  annexDefinitions?: ContractTemplateAnnexDto[] | null
  allowedVariables: string[]
  addenda: ContractTemplateAddendumDto[]
  citationIds: string[]
  contentHash: string
  createdBy?: string
  publishedBy?: string | null
  publishedAt?: string | null
}

export interface ContractTemplateAuditDto {
  id?: string
  templateKey: string
  version: number
  action: string
  actorId: string
  reason?: string | null
  reviewReference?: string | null
  afterHash?: string | null
  createdAt?: string
}

export interface LegalReleasePayload {
  legalProfile: ContractTemplateDto['legalProfile']
  clauses: ContractTemplateClauseDto[]
  allowedVariables: string[]
  addenda: ContractTemplateAddendumDto[]
  citationIds: string[]
  annexDefinitions: ContractTemplateAnnexDto[]
  schemaVersion: number
  referenceOnly: boolean
  reviewReference: string
}

export async function getPublishedContractTemplate(
  key: string
): Promise<ContractTemplateDto> {
  return apiClient.get<ContractTemplateDto>(
    `/contract-templates/${encodeURIComponent(key)}`
  )
}

export async function getContractTemplateVersion(
  key: string,
  version: number
): Promise<ContractTemplateDto> {
  return apiClient.get<ContractTemplateDto>(
    `/contract-templates/${encodeURIComponent(key)}/versions/${version}`
  )
}

export async function getContractTemplateAudits(
  key: string
): Promise<ContractTemplateAuditDto[]> {
  return apiClient.get<ContractTemplateAuditDto[]>(
    `/contract-templates/${encodeURIComponent(key)}/audits`
  )
}

/** Phát hành bản pháp lý mới (phiên bản kế tiếp); bản cũ và các hợp đồng đã khóa không bị đổi. */
export async function publishContractTemplateRelease(
  key: string,
  payload: LegalReleasePayload
): Promise<ContractTemplateDto> {
  return apiClient.post<ContractTemplateDto>(
    `/contract-templates/legal-release/${encodeURIComponent(key)}`,
    payload
  )
}
