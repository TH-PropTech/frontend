import { apiClient, ApiClientError } from '@/shared/api'
import type { FlowProfileSteps } from '@/features/rental-flow-config'

export type RentalApplicationStatus = 'pending' | 'accepted' | 'rejected'
export type RentalExecutionStrategy = 'DEPOSIT_FIRST' | 'SIGN_FIRST'

export interface RentalExecutionPolicyRef {
  policyId: string
  version: number
  strategy: RentalExecutionStrategy
  contentHash: string
}
export type RentalApplicationContextReason =
  | 'RENTAL_FLOW_DISABLED'
  | 'LISTING_UNAVAILABLE'
  | 'LEGACY_PRICING'
  | 'NO_ACTIVE_PACKAGE'
  | 'OWNER_NOT_ELIGIBLE'

export interface RentalApplicationDisclosure {
  version: string
  hash: string
  items: Array<{ id: string; title: string; body: string; required: boolean }>
}

export interface RentalApplicationContext {
  enabled: boolean
  eligible: boolean
  reasonCode: RentalApplicationContextReason | null
  listing: {
    id: string
    title: string
    address: string
    area: number
    status: string
    landlordDisplayName: string | null
  }
  pricingRevision: number
  packages: Array<{
    packageId: string
    version: number
    durationMonths: 1 | 3 | 6 | 12 | 24
    monthlyRent: number
    depositPolicy:
      | { type: 'MONTHS_OF_RENT'; months: number }
      | { type: 'FIXED_AMOUNT'; amount: number }
    resolvedDepositAmount: number
    status: 'active' | 'inactive'
    currency: 'VND'
    allowedExecutionPolicies?: RentalExecutionPolicyRef[]
    defaultExecutionPolicy?: RentalExecutionPolicyRef
  }>
  disclosure: RentalApplicationDisclosure
  terms?: {
    key: string
    version: number
    hash: string
    url: string
  } | null
  flowProfile?: {
    profileId: string
    name: string
    version: number
    hash: string
    precedence: string
    steps: FlowProfileSteps
  } | null
}

export interface CreateRentalApplicationInput {
  apartmentId: string
  packageId: string
  packageVersion: number
  occupants: number
  moveInDate: string
  occupation: string
  hasPets: boolean
  notes?: string | undefined
  disclosureVersion: string
  acknowledgedDisclosureIds: string[]
  acceptedTermsVersion?: number | undefined
  acceptedTermsHash?: string | undefined
  flowProfileVersion?: number | undefined
  flowProfileHash?: string | undefined
  selectedExecutionPolicy?: RentalExecutionPolicyRef | undefined
}
export interface RentalApplicationItem {
  _id: string
  apartmentId: string
  tenantId: string
  landlordId: string
  status: RentalApplicationStatus
  reasonCode: string | null
  actorId: string | null
  actorTimestamp: string | null
  createdAt: string
  updatedAt: string
  occupants: number
  moveInDate: string
  occupation: string
  hasPets: boolean
  notes?: string
  packageSnapshot?: {
    packageId: string
    version: number
    durationMonths: 1 | 3 | 6 | 12 | 24
    monthlyRent: number
    resolvedDepositAmount: number
    allowedExecutionPolicies?: RentalExecutionPolicyRef[]
    defaultExecutionPolicy?: RentalExecutionPolicyRef
  } | null
  executionPolicySnapshot?: RentalExecutionPolicyRef | null
  contractId?: string | null
  depositAgreementId?: string | null
  provisioningStatus?: 'not-started' | 'ready' | 'failed'
  provisioningErrorCode?: string | null
  applicationRevision?: number
  contractHandoff?: {
    state: 'pending' | 'provisioning' | 'ready' | 'failed' | 'rejected'
    contractId: string | null
    href: string | null
    reasonCode: string | null
  }
}
export interface RentalApplicationList {
  items: RentalApplicationItem[]
  total: number
  page: number
  limit: number
  totalPages: number
}
export async function createRentalApplication(
  input: CreateRentalApplicationInput
): Promise<RentalApplicationItem> {
  return apiClient.post<RentalApplicationItem>('/rental-applications', input)
}
export async function getRentalApplicationContext(
  apartmentId: string
): Promise<RentalApplicationContext> {
  return apiClient.get<RentalApplicationContext>(
    `/rental-applications/context/${apartmentId}`
  )
}
export async function getMyRentalApplications(): Promise<RentalApplicationList> {
  return apiClient.get<RentalApplicationList>(
    '/rental-applications/mine?page=1&limit=20'
  )
}
export async function getReceivedRentalApplications(): Promise<RentalApplicationList> {
  return apiClient.get<RentalApplicationList>(
    '/rental-applications/received?page=1&limit=20'
  )
}
export async function respondToRentalApplication(
  id: string,
  input: {
    status: 'accepted' | 'rejected'
    reasonCode: string
    expectedRevision?: number | undefined
    idempotencyKey?: string | undefined
    note?: string | undefined
  }
): Promise<RentalApplicationItem> {
  return apiClient.patch<RentalApplicationItem>(
    `/rental-applications/${id}/respond`,
    input
  )
}

export function isRentalPackageStaleError(error: unknown): boolean {
  if (!(error instanceof ApiClientError)) return false
  return (
    error.message.includes('PACKAGE_STALE') ||
    error.body?.code === 'PACKAGE_STALE'
  )
}

export function isRentalTermsStaleError(error: unknown): boolean {
  if (!(error instanceof ApiClientError)) return false
  return (
    error.message.includes('TERMS_STALE') || error.body?.code === 'TERMS_STALE'
  )
}

export function isFlowConfigStaleError(error: unknown): boolean {
  if (!(error instanceof ApiClientError)) return false
  return (
    error.message.includes('FLOW_CONFIG_STALE') ||
    error.body?.code === 'FLOW_CONFIG_STALE'
  )
}

export function isRentalExecutionPolicyStaleError(error: unknown): boolean {
  if (!(error instanceof ApiClientError)) return false
  return (
    error.message.includes('RENTAL_EXECUTION_POLICY_INVALID') ||
    error.message.includes('RENTAL_EXECUTION_POLICY_SELECTION_REQUIRED') ||
    error.body?.code === 'RENTAL_EXECUTION_POLICY_INVALID' ||
    error.body?.code === 'RENTAL_EXECUTION_POLICY_SELECTION_REQUIRED'
  )
}

export function isApplicationRevisionStaleError(error: unknown): boolean {
  if (!(error instanceof ApiClientError)) return false
  return (
    error.status === 409 ||
    error.message.includes('APPLICATION_REVISION_STALE') ||
    error.body?.code === 'APPLICATION_REVISION_STALE'
  )
}
