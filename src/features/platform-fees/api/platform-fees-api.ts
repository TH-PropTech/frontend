import { apiClient } from '@/shared/api'
import type { FeeSnapshot } from '@/features/rental-application/api/rental-application-api'

export type PlatformFeeTier = {
  minDurationMonths: number
  maxDurationMonths: number
  basis: 'MONTHS_OF_RENT' | 'PERCENT_OF_TOTAL_RENT'
  value: number
  minAmount?: number
  maxAmount?: number
}

export type PlatformFeeScheduleRules = {
  landlordCommission: {
    tiers: PlatformFeeTier[]
    dueDaysAfterActivation: number
  }
  tenantServiceFee: {
    basis: 'FIXED' | 'PERCENT_OF_MONTHLY_RENT'
    value: number
    minAmount?: number
    maxAmount?: number
  } | null
  vatRatePercent: number
  pricesIncludeVat: boolean
  roundingUnit: 1000
  disclosure: { tenantText: string; landlordText: string }
}

export interface PlatformFeeSchedule {
  scheduleId: string
  version: number
  status: 'draft' | 'published' | 'archived'
  rules: PlatformFeeScheduleRules
  legalReviewStatus: 'draft' | 'reviewed'
  reviewReference?: string | null
  contentHash?: string | null
  effectiveFrom?: string | null
}

export interface PlatformFeeRevenue {
  paid: number
  unpaid: number
  waived: number
  invoices: number
}

export interface PlatformFeeDraftInput {
  scheduleId: string
  version: number
  rules: PlatformFeeScheduleRules
  legalReviewStatus: 'draft' | 'reviewed'
  reviewReference?: string
  reason: string
}

export async function getPlatformFeeQuote(input: {
  durationMonths: number
  monthlyRent: number
}): Promise<FeeSnapshot | null> {
  const query = new URLSearchParams({
    durationMonths: String(input.durationMonths),
    monthlyRent: String(input.monthlyRent),
  })
  return apiClient.get<FeeSnapshot | null>(`/platform-fees/quote?${query}`)
}

export function savePlatformFeeDraft(
  input: PlatformFeeDraftInput
): Promise<PlatformFeeSchedule> {
  return apiClient.post<PlatformFeeSchedule>(
    '/platform-fees/admin/draft',
    input
  )
}

export function validatePlatformFeeSchedule(
  scheduleId: string,
  version: number
): Promise<{ valid: boolean; errors: string[] }> {
  return apiClient.post<{ valid: boolean; errors: string[] }>(
    `/platform-fees/admin/${encodeURIComponent(scheduleId)}/${version}/validate`,
    {}
  )
}

export function publishPlatformFeeSchedule(input: {
  scheduleId: string
  version: number
  effectiveFrom: string
  reason: string
}): Promise<PlatformFeeSchedule> {
  return apiClient.post<PlatformFeeSchedule>(
    `/platform-fees/admin/${encodeURIComponent(input.scheduleId)}/${input.version}/publish`,
    { effectiveFrom: input.effectiveFrom, reason: input.reason }
  )
}

export function getPlatformFeeRevenue(): Promise<PlatformFeeRevenue> {
  return apiClient.get<PlatformFeeRevenue>('/platform-fees/revenue')
}

export interface LandlordCommissionPackageInput {
  durationMonths: number
  monthlyRent: number
}

export interface LandlordCommissionPackagePreview extends LandlordCommissionPackageInput {
  applicable: boolean
  amountBeforeVat: number | null
  vatAmount: number | null
  amount: number | null
}

export interface LandlordCommissionPreview {
  scheduleAvailable: boolean
  dueDaysAfterActivation: number | null
  vatRatePercent: number | null
  pricesIncludeVat: boolean | null
  landlordText: string | null
  packages: LandlordCommissionPackagePreview[]
}

export function getApartmentCommission(
  apartmentId: string
): Promise<LandlordCommissionPreview> {
  return apiClient.get<LandlordCommissionPreview>(
    `/platform-fees/apartments/${encodeURIComponent(apartmentId)}/commission`
  )
}

export function previewLandlordCommission(
  packages: LandlordCommissionPackageInput[]
): Promise<LandlordCommissionPreview> {
  return apiClient.post<LandlordCommissionPreview>(
    '/platform-fees/landlord-commission/preview',
    { packages }
  )
}
