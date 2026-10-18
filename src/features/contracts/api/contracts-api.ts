import { apiClient } from '@/shared/api'
import type { ApiFile } from '@/shared/api'

export type ContractStatus =
  | 'draft'
  | 'deposit-pending'
  | 'deposit-paid'
  | 'awaiting-signature'
  | 'fully-signed-pending-deposit'
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
  provider?: 'smartca' | 'platform-consent' | 'dev-test' | null
  providerTransactionId?: string | null
  certificateSerial?: string | null
  signatureAlgorithm?: string | null
  signatureValueRef?: string | null
  providerStatus?: string | null
  verifiedAt?: string | null
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
  citationIds?: string[]
}

export interface ContractDocumentAnnex {
  id: string
  title: string
  description?: string
  required: boolean
}

export interface ContractDocumentLayoutBlock {
  blockId: string
  order: number
  title: string
  visible: boolean
}

export interface ContractDocumentSupplementaryClause {
  id: string
  title: string
  content: string
  enabled?: boolean
}

export interface ContractDocumentView {
  mode: 'draft' | 'locked'
  revision: number
  lockedAt: string | null
  lockedHash: string | null
  hashSchemaVersion: number
  legalProfile:
    | 'PRIVATE_CIVIL_APARTMENT_LEASE'
    | 'REAL_ESTATE_BUSINESS_STANDARD'
    | null
  templateVersion: string | null
  contentHash?: string | null
  citationIds?: string[]
  amendmentHistory?: ContractAmendmentSummary[]
  governingAmendmentId?: string | null
  canonicalArtifact?: ContractCanonicalArtifactView | null
  sections: ContractDocumentSection[]
  annexes: ContractDocumentAnnex[]
  layout?: {
    profileKey: string
    version: number
    blocks: ContractDocumentLayoutBlock[]
  } | null
  supplementaryClauses?: ContractDocumentSupplementaryClause[]
  integrity: 'not-locked' | 'valid' | 'mismatch' | 'unavailable'
}

export interface ContractCanonicalArtifactView {
  artifactId: string
  revision: number
  templateKey: string
  templateVersion: number
  artifactHash: string
  canonicalContentHash?: string | null
  rendererVersion?: string | null
  sourceSchemaVersion?: number | null
  byteLength?: number | null
  amendmentId?: string | null
  contentType: 'application/pdf'
}

export interface ContractAmendmentSummary {
  id: string
  sequence: number
  status: string
  effectiveFrom: string
  contentHash: string | null
  artifactHash?: string | null
  artifactId?: string | null
  artifactIntegrity?: 'available' | 'missing'
  ledgerStatus?: 'not-requested' | 'pending' | 'confirmed' | 'failed'
  ledgerTxHash?: string | null
  tenantSigned: boolean
  landlordSigned: boolean
}

export interface ContractCommercialDraft {
  monthlyRent: number
  deposit: number
  paymentDay: number
  latePenaltyRate: number
  terminationNoticeDays: number
  durationMonths: number
  utilities?: Record<string, 'tenant' | 'landlord' | 'shared'>
  handoverNotes?: string | null
  inventoryReference?: string | null
  noticePeriodDays?: number | null
  addendaIds?: string[]
}

export interface ContractCommercialEditorResponse {
  contractId: string
  revision: number
  commercial: ContractCommercialDraft | null
  protectedFields: string[]
  locked: boolean
}

export interface ContractCommercialValidation {
  valid: boolean
  errors: string[]
  changedFields: string[]
}

export interface ContractAmendment {
  _id: string
  contractId: string
  sequence: number
  status: string
  revision: number
  changes: Array<{ field: string; before: unknown; after: unknown }>
  beforeSnapshot: ContractCommercialDraft
  afterSnapshot: ContractCommercialDraft
  effectiveFrom: string
  predecessorId: string | null
  contentHash: string | null
  artifactHash?: string | null
  artifactId?: string | null
  artifactRef?: {
    artifactId: string
    revision: number
    artifactHash: string
    canonicalContentHash: string
    rendererVersion: string
    sourceSchemaVersion: number
    byteLength: number
    contentType: 'application/pdf'
    lockedAt: string
  } | null
  ledgerStatus?: 'not-requested' | 'pending' | 'confirmed' | 'failed'
  ledgerTxHash?: string | null
  tenantSignature: ContractSignature | null
  landlordSignature: ContractSignature | null
}

export interface ContractPartyView {
  id: string
  name: string
  role: 'tenant' | 'landlord'
  maskedCccd: string | null
  address: string | null
  kycStatus: 'unverified' | 'pending' | 'verified' | 'rejected'
  hasSigned: boolean
  signedAt?: string | null
  signatureHash?: string | null
  provider?: 'smartca' | 'platform-consent' | 'dev-test' | null
  providerTransactionId?: string | null
  certificateSerial?: string | null
  signatureAlgorithm?: string | null
  signatureValueRef?: string | null
  providerStatus?: string | null
  verifiedAt?: string | null
}

export interface ContractDepositView {
  agreementId: string | null
  agreementCode?: string | null
  amount: number
  currency?: string
  status: 'draft' | 'pending' | 'paid' | 'transferred'
  consentGiven?: boolean
  contentRevision?: number | null
  contentHash?: string | null
  paidAt: string | null
  txHash: string | null
  paymentProofUrl?: string | null
  mockSimulationNotice?: string
}

export interface SigningEligibility {
  eligible: boolean
  reasonCode: string | null
  message: string | null
}

export interface ContractLedgerSummary {
  networkMode: 'simulation' | 'fabric'
  connectionState?: 'disabled' | 'connected' | 'unavailable'
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
  executionPolicy?: ContractExecutionPolicyView | null
}

export interface ContractExecutionPolicyView {
  policyId: string
  version: number
  strategy: 'DEPOSIT_FIRST' | 'SIGN_FIRST'
  depositConfirmed: boolean
  activationReady: boolean
  nextAction: string | null
}

export interface ContractActionsView {
  canPayDeposit: boolean
  paymentReasonCode: string | null
  signingEligibility: SigningEligibility
  canDownloadArtifact: boolean
  artifactReasonCode: string | null
  canEditContent?: boolean
  canLockContent?: boolean
  canLockArtifact?: boolean
}

export interface ContractAccessView {
  canReadWorkspace: boolean
  canSign: boolean
  isOriginalParticipant: boolean
  isSuccessorOwner: boolean
}

export type ContractFlowStageKey =
  | 'document'
  | 'deposit'
  | 'signing'
  | 'ledger'
  | 'move-in'

export type ContractFlowStageStatus =
  | 'done'
  | 'active'
  | 'upcoming'
  | 'blocked'
  | 'skipped'

export type ContractFlowActionKey =
  | 'CONSENT_DEPOSIT'
  | 'PAY_DEPOSIT'
  | 'LOCK_CONTENT'
  | 'LOCK_ARTIFACT'
  | 'COMPLETE_KYC'
  | 'SIGN_SMARTCA'
  | 'SIGN_ECONSENT'
  | 'PAY_SETTLEMENT'
  | 'PAY_FEE'
  | 'RECORD_HANDOVER'
  | 'CONFIRM_HANDOVER'
  | 'VERIFY_LEDGER'

export interface ContractFlowBlocker {
  code: string
  partyRole: 'tenant' | 'landlord' | null
}

export interface ContractFlowStage {
  key: ContractFlowStageKey
  status: ContractFlowStageStatus
  blockers: ContractFlowBlocker[]
  completedAt: string | null
}

export interface ContractFlowAction {
  action: ContractFlowActionKey
  actorRole: 'tenant' | 'landlord' | 'staff'
  enabled: boolean
  reasonCode: string | null
  /** Stage có panel thực hiện hành động này */
  stage: ContractFlowStageKey
}

/** Trạng thái luồng do server tính; `nextActions` đã lọc theo user hiện tại. */
export interface ContractFlowView {
  version: number
  strategy: 'DEPOSIT_FIRST' | 'SIGN_FIRST'
  stages: ContractFlowStage[]
  activeStage: ContractFlowStageKey | 'completed'
  nextActions: ContractFlowAction[]
}

export interface ContractViewDto {
  contract: ContractOverviewSnapshot
  document: ContractDocumentView
  parties: {
    tenant: ContractPartyView
    landlord: ContractPartyView
  }
  deposit: ContractDepositView | null
  actions: ContractActionsView
  access?: ContractAccessView
  ledger: ContractLedgerSummary
  flow?: ContractFlowView
  settlement?: MoveInSettlementView | null
  financialSummary?: ContractFinancialSummaryView
}

export interface ContractFinancialSummaryView {
  initialPaymentTotal: number
  holdingDeposit: number
  securityTopUpAmount: number
  tenantServiceFee: number
  landlordCommission: number
  /** Tiền thuê trả trước ghi trong hợp đồng; null/vắng mặt với hợp đồng cũ. */
  prepaidRent?: {
    policy: 'NONE' | 'MONTHS' | 'FULL'
    months: number
    amount: number
  } | null
}

export interface MoveInSettlementView {
  id: string
  status: 'pending' | 'overdue' | 'paid'
  total: number
  dueAt: string
  statementHash: string
  lines: Array<{
    kind: string
    amount: number
    paymentId: string | null
  }>
  handover: {
    revision: number
    handedOverAt: string
    meterReadings: { electricity: number; water: number }
    keyCount: number
    inventoryReference: string | null
    notes: string | null
    handoverHash: string
    tenantConfirmation: { at: string; hash: string } | null
    landlordConfirmation: { at: string; hash: string } | null
    completedAt: string | null
  } | null
}

export interface HandoverInput {
  handedOverAt: string
  electricity: number
  water: number
  keyCount: number
  inventoryReference?: string
  notes?: string
}

export interface ContractAuditEventDto {
  id: string
  category: 'contract' | 'signature' | 'deposit' | 'payment' | 'ledger'
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

export type LedgerEvidenceStatus =
  | 'pending'
  | 'processing'
  | 'confirmed'
  | 'failed-retryable'
  | 'failed-terminal'

export interface LedgerEvidenceEvent {
  id: string
  eventType: string
  aggregateType: string
  aggregateRef: string
  status: LedgerEvidenceStatus
  networkMode: 'fabric' | 'simulation'
  txId: string | null
  blockNumber: number | null
  recordedAt: string | null
  payloadHash: string
  dependsOn: string | null
  attempts: number
  errorCode: string | null
  explorerUrl: string | null
}

export interface ContractLedgerEvidence {
  networkMode: 'fabric' | 'simulation'
  connectionState: 'disabled' | 'connected' | 'unavailable'
  explorerAvailable: boolean
  events: LedgerEvidenceEvent[]
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
  isValid: boolean | null
  verificationStatus: 'valid' | 'invalid' | 'not-recorded' | 'unavailable'
  currentHash: string
  storedHash: string | null
  blockchainAddress: string | null
  onChain: unknown
  semanticHash?: string | null
  artifactHash?: string | null
  signatureIntegrity?: 'valid' | 'invalid' | 'not-available'
  amendmentChainIntegrity?: 'valid' | 'invalid' | 'not-available'
  layers?: {
    offChain: {
      status: 'valid' | 'mismatch' | 'unavailable' | 'not-recorded'
      hash: string | null
      reason: string | null
    }
    artifact: {
      status: 'valid' | 'mismatch' | 'unavailable' | 'not-recorded'
      hash: string | null
      reason: string | null
    }
    onChain: {
      status: 'valid' | 'mismatch' | 'unavailable' | 'not-recorded'
      hash: string | null
      reason: string | null
    }
  }
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
  purpose: 'temporary-residence' | 'permanent-residence'
  externalProcedureCompleted: false
  officialSourceUrl: string
  executionMethod:
    | 'WET_INK'
    | 'QUALIFIED_DIGITAL_SIGNATURE'
    | 'SMARTCA'
    | 'POC_ECONSENT'
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

export interface SmartCaSigningSession {
  id: string
  contractId: string
  signerId: string
  signerRole: 'tenant' | 'landlord'
  artifactHash: string
  providerTransactionId: string
  status:
    | 'pending'
    | 'pending-user-confirmation'
    | 'signed'
    | 'rejected'
    | 'expired'
    | 'cancelled'
  confirmationUrl?: string | null
  certificateSerial?: string | null
  signatureHash?: string | null
  signatureAlgorithm?: string | null
  providerStatus?: string | null
  documentId?: string | null
  signedAt?: string | null
  verifiedAt?: string | null
  expiresAt: string
}

export interface SmartCaCertificate {
  serialNumber: string
  subject?: string
  issuer?: string
  validFrom?: string
  validTo?: string
}

export interface SmartCaCertificateList {
  certificates: SmartCaCertificate[]
}

export interface CreateSmartCaSigningSessionInput {
  idempotencyKey: string
  certificateSerial?: string
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

/**
 * Ảnh bìa căn hộ dùng để minh họa thẻ tóm tắt hợp đồng. Endpoint apartment
 * là public (`@Public()` trong apartments.controller.ts), gọi thẳng bằng
 * `property.id` của hợp đồng, không cần đổi DTO hợp đồng ở backend.
 */
export async function getApartmentCoverImage(
  apartmentId: string
): Promise<string | null> {
  const res = await apiClient.get<{ image?: string }>(
    `/apartments/${apartmentId}?format=web`
  )
  return res.image || null
}

export async function getContractAuditEvents(
  contractId: string
): Promise<ContractAuditEventDto[]> {
  return apiClient.get<ContractAuditEventDto[]>(
    `/contracts/${contractId}/audit-events`
  )
}

export async function getContractLedgerEvidence(
  contractId: string
): Promise<ContractLedgerEvidence> {
  return apiClient.get<ContractLedgerEvidence>(
    `/contracts/${contractId}/ledger-evidence`
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

export async function createSmartCaSigningSession(
  contractId: string,
  input: CreateSmartCaSigningSessionInput
): Promise<SmartCaSigningSession> {
  return apiClient.post<SmartCaSigningSession>(
    `/contracts/${contractId}/smartca/signing-sessions`,
    input
  )
}

export async function getSmartCaCertificates(
  contractId: string
): Promise<SmartCaCertificateList> {
  return apiClient.get<SmartCaCertificateList>(
    `/contracts/${contractId}/smartca/certificates`
  )
}

export async function getSmartCaSigningSession(
  contractId: string,
  sessionId: string
): Promise<SmartCaSigningSession> {
  return apiClient.get<SmartCaSigningSession>(
    `/contracts/${contractId}/smartca/signing-sessions/${sessionId}`
  )
}

export async function pollSmartCaSigningSession(
  contractId: string,
  sessionId: string
): Promise<SmartCaSigningSession> {
  return apiClient.post<SmartCaSigningSession>(
    `/contracts/${contractId}/smartca/signing-sessions/${sessionId}/poll`,
    {}
  )
}

export async function cancelSmartCaSigningSession(
  contractId: string,
  sessionId: string
): Promise<SmartCaSigningSession> {
  return apiClient.post<SmartCaSigningSession>(
    `/contracts/${contractId}/smartca/signing-sessions/${sessionId}/cancel`,
    {}
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
  purpose: PublicServiceChecklist['purpose'] = 'temporary-residence'
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

export type SigningMethodId =
  | 'smartca_v1'
  | 'smartca_v2'
  | 'biometric_smart_otp'
  | 'dev_sign'

export interface SigningMethodOption {
  id: SigningMethodId
  label: string
  description: string
  available: boolean
  reason?: string
  inputs: string[]
}

/** Danh sách phương thức ký do backend cấu hình (nguồn sự thật cho UI). */
export async function getSigningMethods(
  contractId: string
): Promise<SigningMethodOption[]> {
  return apiClient.get<SigningMethodOption[]>(
    `/contracts/${contractId}/signing-methods`
  )
}

export interface SignSmartCaV2Input {
  smartCaPassword: string
  smartCaOtp: string
  certificateSerial?: string
}

/** SmartCA v2 (tùy chọn): mật khẩu + OTP chỉ gửi một lần, không lưu ở client. */
export async function signSmartCaV2(
  contractId: string,
  input: SignSmartCaV2Input
): Promise<SmartCaSigningSession> {
  return apiClient.post<SmartCaSigningSession>(
    `/contracts/${contractId}/smartca/sign-v2`,
    input
  )
}

/** Dev/test: ký bỏ qua SmartCA (backend phải bật ENABLE_TEST_SIGN_BYPASS). */
export async function testSignContract(
  contractId: string
): Promise<ContractItem> {
  return apiClient.post<ContractItem>(`/contracts/${contractId}/test-sign`, {})
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

/** Hệ thống tự dựng bản PDF chuẩn từ mẫu hợp đồng đã khóa và khóa artifact (idempotent). */
export async function renderAndLockContractArtifact(
  contractId: string
): Promise<unknown> {
  return apiClient.post<unknown>(
    `/contracts/${contractId}/artifacts/render-lock`,
    {}
  )
}

export async function downloadContractArtifact(
  contractId: string,
  format: 'pdf' | 'docx' = 'pdf'
): Promise<Blob> {
  return apiClient.getBlob(`/contracts/${contractId}/pdf?format=${format}`)
}

/** Bản PDF đã ký (PAdES) gần nhất; 404 khi chưa có hoặc backend chưa bật PAdES. */
export async function downloadSignedContractArtifact(
  contractId: string
): Promise<Blob> {
  return apiClient.getBlob(`/contracts/${contractId}/pdf/signed`)
}

export async function downloadContractEvidencePackage(
  contractId: string
): Promise<ApiFile> {
  return apiClient.getFile(
    `/contracts/${encodeURIComponent(contractId)}/evidence-package`
  )
}

export async function getAdminContractEditor(
  contractId: string
): Promise<ContractCommercialEditorResponse> {
  return apiClient.get<ContractCommercialEditorResponse>(
    `/contracts/${contractId}/admin-editor`
  )
}

export async function validateAdminCommercialDraft(
  contractId: string,
  commercial: ContractCommercialDraft
): Promise<ContractCommercialValidation> {
  return apiClient.post<ContractCommercialValidation>(
    `/contracts/${contractId}/commercial-draft/validate`,
    { commercial }
  )
}

export async function saveAdminCommercialDraft(
  contractId: string,
  commercial: ContractCommercialDraft,
  expectedRevision: number
): Promise<ContractCommercialEditorResponse> {
  return apiClient.put<ContractCommercialEditorResponse>(
    `/contracts/${contractId}/commercial-draft`,
    { commercial, expectedRevision }
  )
}

export async function getContractAmendments(
  contractId: string
): Promise<ContractAmendment[]> {
  return apiClient.get<ContractAmendment[]>(
    `/contracts/${contractId}/amendments`
  )
}

export async function createContractAmendment(
  contractId: string,
  input: {
    changes: Array<{ field: string; after: unknown }>
    effectiveFrom: string
    idempotencyKey?: string
  }
): Promise<ContractAmendment> {
  return apiClient.post<ContractAmendment>(
    `/contracts/${contractId}/amendments`,
    input
  )
}

export async function lockContractAmendment(
  contractId: string,
  amendmentId: string,
  expectedRevision: number
): Promise<ContractAmendment> {
  return apiClient.post<ContractAmendment>(
    `/contracts/${contractId}/amendments/${amendmentId}/lock`,
    { expectedRevision }
  )
}

export async function lockContractAmendmentArtifact(
  contractId: string,
  amendmentId: string,
  expectedRevision: number,
  file: File
): Promise<ContractAmendment> {
  const formData = new FormData()
  formData.append('expectedRevision', String(expectedRevision))
  formData.append('artifact', file)
  return apiClient.post<ContractAmendment>(
    `/contracts/${contractId}/amendments/${amendmentId}/artifact`,
    formData
  )
}

export async function signContractAmendment(
  contractId: string,
  amendmentId: string,
  expectedRevision: number,
  signatureHash: string
): Promise<ContractAmendment> {
  return apiClient.post<ContractAmendment>(
    `/contracts/${contractId}/amendments/${amendmentId}/sign`,
    { expectedRevision, signatureHash }
  )
}

export async function downloadContractAmendmentArtifact(
  contractId: string,
  amendmentId: string
): Promise<Blob> {
  return apiClient.getBlob(
    `/contracts/${contractId}/amendments/${amendmentId}/artifact`
  )
}
