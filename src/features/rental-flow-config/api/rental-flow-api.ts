import { apiClient } from '@/shared/api'

export interface FlowStep1Config {
  moveInDateLabel: string
  minMoveInLeadDays: number
  maxMoveInLeadDays: number
  minOccupants: number
  maxOccupants: number
  allowNotes: boolean
  notesMaxLength: number
}

export interface BadgeRule {
  durationMonths: number
  badgeText: string
  colorVariant: string
}

export interface FlowStep2Config {
  headerTitle: string
  depositNoticeBody: string
  badgeRules: BadgeRule[]
}

export interface FlowDisclosure {
  id: string
  title: string
  body: string
  required: boolean
  immutablePolicy?: boolean
}

export interface FlowStep3Config {
  consentCheckboxLabel: string
  consentStatement: string
  disclosures: FlowDisclosure[]
}

export interface TimelineStepItem {
  key: string
  title: string
  description: string
}

export interface FlowStep4Config {
  heroSuccessTitle: string
  timelineSteps: TimelineStepItem[]
}

export interface FlowProfileSteps {
  step1: FlowStep1Config
  step2: FlowStep2Config
  step3: FlowStep3Config
  step4: FlowStep4Config
}

export interface RentalFlowProfile {
  profileId: string
  name: string
  description?: string
  status: 'draft' | 'published' | 'archived'
  version: number
  draftRevision: number
  contentHash: string
  steps: FlowProfileSteps
  isSystemDefault: boolean
  publishedAt?: string | null
  updatedAt?: string
  createdAt?: string
}

export interface RentalFlowAssignment {
  assignmentId: string
  scope: 'GLOBAL' | 'DURATION' | 'PACKAGE'
  scopeValue?: string | null
  targetProfile: {
    profileId: string
    version: number
    contentHash: string
  }
  effectiveAt: string
  supersededAt?: string | null
  activatedBy: string
  createdAt: string
}

export interface ContractImpactReport {
  eligibleUnsignedDrafts: number
  partiallySigned: number
  immutableSigned: number
  totalContractsEvaluated: number
}

export interface SaveFlowProfileDraftInput {
  profileId?: string
  name: string
  description?: string
  steps: FlowProfileSteps
  expectedRevision?: number
}

export interface ActivateAssignmentInput {
  scope: 'GLOBAL' | 'DURATION' | 'PACKAGE'
  scopeValue?: string | undefined
  profileId: string
  version: number
  contentHash: string
  effectiveAt?: string | undefined
}

export interface PreviewFlowAssignmentResult {
  effectiveConfig: FlowProfileSteps
  resolvedFrom: {
    scope: string
    scopeValue: string | null
    profileId: string
    profileName: string
    version: number
    contentHash: string
    assignmentId?: string | null
  }
}

export async function getRentalFlowProfiles(): Promise<RentalFlowProfile[]> {
  return apiClient.get<RentalFlowProfile[]>('/admin/rental-flow/profiles')
}

export async function getRentalFlowProfile(
  profileId: string
): Promise<RentalFlowProfile> {
  return apiClient.get<RentalFlowProfile>(
    `/admin/rental-flow/profiles/${profileId}`
  )
}

export async function getRentalFlowProfileVersions(
  profileId: string
): Promise<RentalFlowProfile[]> {
  return apiClient.get<RentalFlowProfile[]>(
    `/admin/rental-flow/profiles/${profileId}/versions`
  )
}

export async function saveRentalFlowProfileDraft(
  data: SaveFlowProfileDraftInput
): Promise<RentalFlowProfile> {
  return apiClient.post<RentalFlowProfile>(
    '/admin/rental-flow/profiles/draft',
    data
  )
}

export async function publishRentalFlowProfile(
  profileId: string,
  expectedRevision: number
): Promise<RentalFlowProfile> {
  return apiClient.post<RentalFlowProfile>(
    `/admin/rental-flow/profiles/${profileId}/publish`,
    { expectedRevision }
  )
}

export async function restoreRentalFlowProfileVersion(
  profileId: string,
  version: number
): Promise<RentalFlowProfile> {
  return apiClient.post<RentalFlowProfile>(
    `/admin/rental-flow/profiles/${profileId}/restore/${version}`,
    {}
  )
}

export async function getRentalFlowAssignments(): Promise<
  RentalFlowAssignment[]
> {
  return apiClient.get<RentalFlowAssignment[]>('/admin/rental-flow/assignments')
}

export async function activateRentalFlowAssignment(
  data: ActivateAssignmentInput
): Promise<RentalFlowAssignment> {
  return apiClient.post<RentalFlowAssignment>(
    '/admin/rental-flow/assignments/activate',
    data
  )
}

export async function previewRentalFlowAssignment(options: {
  durationMonths?: number | undefined
  packageId?: string | undefined
}): Promise<PreviewFlowAssignmentResult> {
  return apiClient.post<PreviewFlowAssignmentResult>(
    '/admin/rental-flow/assignments/preview',
    options
  )
}

export async function getContractImpactReport(): Promise<ContractImpactReport> {
  return apiClient.get<ContractImpactReport>(
    '/admin/rental-flow/assignments/contract-impact'
  )
}
