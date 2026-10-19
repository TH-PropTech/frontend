import { describe, expect, it, vi } from 'vitest'
import { apiClient } from '@/shared/api'
import {
  getApartmentCommission,
  previewLandlordCommission,
  getPlatformFeeRevenue,
  publishPlatformFeeSchedule,
  savePlatformFeeDraft,
  validatePlatformFeeSchedule,
  type PlatformFeeScheduleRules,
} from './platform-fees-api'

const rules: PlatformFeeScheduleRules = {
  landlordCommission: {
    tiers: [
      {
        minDurationMonths: 3,
        maxDurationMonths: 6,
        basis: 'MONTHS_OF_RENT',
        value: 0.5,
      },
    ],
    dueDaysAfterActivation: 7,
  },
  tenantServiceFee: null,
  vatRatePercent: 10,
  pricesIncludeVat: false,
  roundingUnit: 1000,
  disclosure: { tenantText: 'tenant', landlordText: 'landlord' },
}

describe('platform fees API', () => {
  it('calls the admin draft endpoint with fee rules', async () => {
    const post = vi.spyOn(apiClient, 'post').mockResolvedValueOnce({
      scheduleId: 'fees',
      version: 2,
      status: 'draft',
    })

    await savePlatformFeeDraft({
      scheduleId: 'fees',
      version: 2,
      rules,
      legalReviewStatus: 'draft',
      reason: 'update',
    })

    expect(post).toHaveBeenCalledWith(
      '/platform-fees/admin/draft',
      expect.objectContaining({ scheduleId: 'fees', version: 2 })
    )
    post.mockRestore()
  })

  it('calls validate, publish and revenue endpoints', async () => {
    const post = vi
      .spyOn(apiClient, 'post')
      .mockResolvedValue({ valid: true, errors: [] })
    const get = vi
      .spyOn(apiClient, 'get')
      .mockResolvedValue({ paid: 10, unpaid: 2, waived: 1, invoices: 3 })

    await validatePlatformFeeSchedule('fees/main', 3)
    await publishPlatformFeeSchedule({
      scheduleId: 'fees/main',
      version: 3,
      effectiveFrom: '2026-09-30T00:00:00.000Z',
      reason: 'reviewed',
    })
    await getPlatformFeeRevenue()

    expect(post).toHaveBeenNthCalledWith(
      1,
      '/platform-fees/admin/fees%2Fmain/3/validate',
      {}
    )
    expect(post).toHaveBeenNthCalledWith(
      2,
      '/platform-fees/admin/fees%2Fmain/3/publish',
      expect.objectContaining({ effectiveFrom: '2026-09-30T00:00:00.000Z' })
    )
    expect(get).toHaveBeenCalledWith('/platform-fees/revenue')
    post.mockRestore()
    get.mockRestore()
  })
})

describe('landlord commission preview api', () => {
  it('gets the apartment commission', async () => {
    vi.spyOn(apiClient, 'get').mockResolvedValue({})
    await getApartmentCommission('apt 1')
    expect(apiClient.get).toHaveBeenCalledWith(
      '/platform-fees/apartments/apt%201/commission'
    )
  })

  it('posts draft packages for preview', async () => {
    vi.spyOn(apiClient, 'post').mockResolvedValue({})
    const packages = [{ durationMonths: 6, monthlyRent: 9_000_000 }]
    await previewLandlordCommission(packages)
    expect(apiClient.post).toHaveBeenCalledWith(
      '/platform-fees/landlord-commission/preview',
      { packages }
    )
  })
})
