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

export interface ContractPropertySnapshot {
  id: string
  title: string
  address: string | null
  area: number | null
  furniture: string | null
  value: number
}

export interface ContractCommercialSnapshot {
  monthlyRent: number
  deposit: number
  paymentDay: number
  durationMonths?: number | null
  latePenaltyRate: number
  terminationNoticeDays: number
}

export interface ContractDocumentSection {
  id: string
  number: number
  title: string
  content: string
  protected: boolean
  hash: string
}

export interface ContractDocumentAnnex {
  id: string
  title: string
  description?: string
  required: boolean
}

export interface ContractDocumentView {
  mode: 'draft' | 'locked'
  revision: number
  lockedAt: string | null
  lockedHash: string | null
  hashSchemaVersion: number
  legalProfile: unknown | null
  templateVersion: string | null
  sections: ContractDocumentSection[]
  annexes: ContractDocumentAnnex[]
  integrity: 'not-locked' | 'valid' | 'mismatch' | 'unavailable'
}

export interface ContractPartyView {
  id: string
  name: string
  role: 'tenant' | 'landlord'
  maskedCccd: string | null
  address: string | null
  kycStatus: 'unverified' | 'pending' | 'verified' | 'rejected'
  hasSigned: boolean
}

export interface ContractDepositView {
  depositAgreementId: string | null
  status: 'draft' | 'pending' | 'signed' | 'paid' | 'transferred' | 'refunded'
  amount: number
  paidAt: string | null
  paymentProofUrl: string | null
  txHash: string | null
  mockSimulationNotice: string
}

export type SigningEligibilityReasonCode =
  | 'ELIGIBLE'
  | 'NOT_PARTICIPANT'
  | 'INVALID_STATUS'
  | 'CONTENT_NOT_LOCKED'
  | 'DEPOSIT_NOT_PAID'
  | 'KYC_NOT_VERIFIED'
  | 'ALREADY_SIGNED'

export interface SigningEligibility {
  canSign: boolean
  reasonCode: SigningEligibilityReasonCode
  requiresBiometric: boolean
  requiresOtp: boolean
  isContentLocked: boolean
}

export interface ContractLedgerSummary {
  networkMode: 'simulation' | 'fabric'
  status:
    | 'not-requested'
    | 'pending'
    | 'processing'
    | 'confirmed-simulation'
    | 'confirmed-fabric'
    | 'failed-retryable'
    | 'failed-terminal'
    | 'integrity-mismatch'
  txHash: string | null
  blockNumber: number | null
  verifiedAt: string | null
  onChainValid?: boolean | null
}

export interface ContractOverviewSnapshot {
  id: string
  code: string
  status: ContractStatus
  property: ContractPropertySnapshot
  commercial: ContractCommercialSnapshot
  startDate: string
  endDate: string
  executionMethod: string
  notarizationStatus: string
}

export interface ContractViewDto {
  contract: ContractOverviewSnapshot
  document: ContractDocumentView
  parties: {
    tenant: ContractPartyView
    landlord: ContractPartyView
  }
  deposit: ContractDepositView | null
  actions: {
    canEditContent: boolean
    canLockContent: boolean
    canDownloadDraft: boolean
    canDownloadSignedPdf: boolean
    canDownloadDocx: boolean
    signingEligibility: SigningEligibility
  }
  ledger: ContractLedgerSummary
}

export interface ContractAuditEventDto {
  id: string
  category: 'ledger' | 'blockchain_log'
  eventType: string
  status: string
  occurredAt: string
  actorRole: string
  networkMode: 'simulation' | 'fabric'
  txHash: string | null
  blockNumber: number | null
  retryable: boolean
  displayCode: string
  description: string
}

export interface VerifySignerResponseDto {
  verified: boolean
  faceMatch: boolean
  liveness: boolean
  spoofScore: number | null
  biometricEvidenceId?: string
}

export interface OtpChallengeResponseDto {
  sessionId: string
  challenge: string
  expiredAt: string
  otpCode?: string
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

// ── API Functions ──

export async function getMyContracts(): Promise<ContractItem[]> {
  return apiClient.get<ContractItem[]>('/contracts')
}

export async function getContract(contractId: string): Promise<ContractItem> {
  return apiClient.get<ContractItem>(`/contracts/${contractId}`)
}

export async function getContractView(
  contractId: string
): Promise<ContractViewDto> {
  return apiClient.get<ContractViewDto>(`/contracts/${contractId}/view`)
}

export async function getContractAuditEvents(
  contractId: string
): Promise<ContractAuditEventDto[]> {
  return apiClient.get<ContractAuditEventDto[]>(
    `/contracts/${contractId}/audit-events`
  )
}

export async function initiateContractOtp(
  contractId: string,
  deviceId?: string
): Promise<OtpChallengeResponseDto> {
  return apiClient.post<OtpChallengeResponseDto>(
    `/contracts/${contractId}/otp-challenge`,
    { deviceId }
  )
}

export async function verifyContractOtp(
  contractId: string,
  input: { sessionId: string; otpCode: string; signature?: string }
): Promise<{ success: boolean; message: string }> {
  return apiClient.post<{ success: boolean; message: string }>(
    `/contracts/${contractId}/verify-otp`,
    input
  )
}

export async function verifySigner(
  contractId: string,
  file: File | Blob
): Promise<VerifySignerResponseDto> {
  const formData = new FormData()
  formData.append('selfie', file)
  return apiClient.post<VerifySignerResponseDto>(
    `/contracts/${contractId}/verify-signer`,
    formData
  )
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
