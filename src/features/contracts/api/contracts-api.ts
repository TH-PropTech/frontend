import { apiClient } from '@/shared/api'

export type ContractStatus =
  | 'draft'
  | 'deposit-pending'
  | 'deposit-paid'
  | 'awaiting-signature'
  | 'active'
  | 'terminated'
  | 'cancelled'
  | 'completed'

export interface ContractSignature {
  signerId: string
  role: 'tenant' | 'landlord'
  signedAt: string
  contentHash: string
  biometricGrantId: string
  otpSessionId: string
  deviceId?: string | null
}

export interface ContractItem {
  _id: string
  contractCode: string
  propertyId: string
  propertyTitle: string
  tenantId: string
  landlordId: string
  startDate: string
  endDate: string
  monthlyRent: number
  deposit: number
  paymentDay: number
  status: ContractStatus
  contractHash: string | null
  blockchainAddress: string | null
  signedByTenant: boolean
  signedByLandlord: boolean
  contentRevision?: number | null
  editorContent?: Record<string, unknown> | null
  contentLockedHash?: string | null
  tenantSignature?: ContractSignature | null
  landlordSignature?: ContractSignature | null
}

export interface ContractIntegrityResult {
  isValid: boolean
  currentHash: string
  storedHash: string | null
  blockchainAddress: string | null
  onChain: unknown
}

export type PublicServiceChecklistItem = {
  id:
    | 'locked-contract-copy'
    | 'signing-evidence'
    | 'notarization-or-authentication'
  status: 'available' | 'required-before-submission' | 'evidence-present'
  required: boolean
}

export interface PublicServiceChecklist {
  purpose: 'permanent-residence'
  externalProcedureCompleted: false
  officialSourceUrl: string
  executionMethod: 'WET_INK' | 'QUALIFIED_DIGITAL_SIGNATURE' | 'POC_ECONSENT'
  notarizationStatus:
    | 'not-requested'
    | 'pending'
    | 'notarized'
    | 'authenticated'
    | 'rejected'
  disclaimer: string
  items: PublicServiceChecklistItem[]
}

export interface SigningGrant {
  grantId: string
  expiresAt: string
}

export async function getMyContracts(): Promise<ContractItem[]> {
  return apiClient.get<ContractItem[]>('/contracts')
}

export async function getContract(contractId: string): Promise<ContractItem> {
  return apiClient.get<ContractItem>(`/contracts/${contractId}`)
}

export async function getPublicServiceChecklist(
  contractId: string,
  purpose: PublicServiceChecklist['purpose'] = 'permanent-residence'
): Promise<PublicServiceChecklist> {
  return apiClient.get<PublicServiceChecklist>(
    `/contracts/${contractId}/public-service-checklist?purpose=${purpose}`
  )
}

export async function verifyContractIntegrity(
  contractId: string
): Promise<ContractIntegrityResult> {
  return apiClient.get<ContractIntegrityResult>(
    `/contracts/${contractId}/verify`
  )
}

export async function issueSigningGrant(
  contractId: string,
  input: { biometricGrantId: string; otpSessionId: string }
): Promise<SigningGrant> {
  return apiClient.post<SigningGrant>(
    `/contracts/${contractId}/signing-grant`,
    input
  )
}

export async function signContract(
  contractId: string,
  signingGrantId: string
): Promise<ContractItem> {
  return apiClient.put<ContractItem>(`/contracts/${contractId}/sign`, {
    signingGrantId,
  })
}

export async function saveContractContent(
  contractId: string,
  content: Record<string, unknown>,
  expectedRevision: number
): Promise<ContractItem> {
  return apiClient.put<ContractItem>(`/contracts/${contractId}/content`, {
    content,
    expectedRevision,
  })
}

export async function lockContractContent(
  contractId: string,
  expectedRevision: number
): Promise<ContractItem> {
  return apiClient.post<ContractItem>(`/contracts/${contractId}/lock-content`, {
    expectedRevision,
  })
}

export async function downloadContractArtifact(
  contractId: string,
  format: 'pdf' | 'docx' = 'pdf'
): Promise<Blob> {
  return apiClient.getBlob(`/contracts/${contractId}/pdf?format=${format}`)
}
