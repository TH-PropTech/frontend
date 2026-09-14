import { apiClient, ApiClientError } from '@/shared/api'

export type RentalApplicationStatus = 'pending' | 'accepted' | 'rejected'
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
    durationMonths: 1 | 3 | 6 | 12
    monthlyRent: number
    depositPolicy:
      | { type: 'MONTHS_OF_RENT'; months: number }
      | { type: 'FIXED_AMOUNT'; amount: number }
    resolvedDepositAmount: number
    status: 'active' | 'inactive'
    currency: 'VND'
  }>
  disclosure: RentalApplicationDisclosure
}

export interface CreateRentalApplicationInput {
  apartmentId: string
  packageId: string
  packageVersion: number
  occupants: number
  moveInDate: string
  occupation: string
  hasPets: boolean
  notes?: string
  disclosureVersion: string
  acknowledgedDisclosureIds: string[]
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
    durationMonths: 1 | 3 | 6 | 12
    monthlyRent: number
    resolvedDepositAmount: number
  } | null
  contractId?: string | null
  depositAgreementId?: string | null
  provisioningStatus?: 'not-started' | 'ready' | 'failed'
  provisioningErrorCode?: string | null
  applicationRevision?: number
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
    expectedRevision?: number
    idempotencyKey?: string
    note?: string
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
