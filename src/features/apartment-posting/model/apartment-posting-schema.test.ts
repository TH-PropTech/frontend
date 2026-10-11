import { describe, it, expect } from 'vitest'
import {
  apartmentPostingSchema,
  rentalPackagePostingSchema,
  ensureRentalPackagesFallback,
} from './apartment-posting-schema'

describe('apartmentPostingSchema & rentalPackagePostingSchema', () => {
  const baseValidData = {
    title: 'Căn hộ cao cấp Masteri Thảo Điền 2PN',
    category: 'Căn hộ chung cư',
    description:
      'Căn hộ view sông thoáng mát, đầy đủ tiện nghi cao cấp, dọn vào ở ngay trong tháng này.',
    city: 'Hồ Chí Minh',
    district: 'Thành phố Thủ Đức',
    ward: 'Thảo Điền',
    street: 'Xa Lộ Hà Nội',
    address: '159 Xa Lộ Hà Nội',
    priceMonthly: 18.5,
    area: 72,
    bedrooms: 2,
    bathrooms: 2,
  }

  describe('ownershipCertificate (không bắt buộc)', () => {
    it('accepts a missing or filled certificate number', () => {
      expect(apartmentPostingSchema.safeParse(baseValidData).success).toBe(true)
      expect(
        apartmentPostingSchema.safeParse({
          ...baseValidData,
          ownershipCertificate: 'CS 12345',
        }).success
      ).toBe(true)
    })

    it('rejects a certificate longer than 200 characters', () => {
      expect(
        apartmentPostingSchema.safeParse({
          ...baseValidData,
          ownershipCertificate: 'a'.repeat(201),
        }).success
      ).toBe(false)
    })
  })

  it('validates base apartment without explicit rentalPackages, defaulting to empty array', () => {
    const result = apartmentPostingSchema.safeParse(baseValidData)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.rentalPackages).toEqual([])
    }
  })

  it('validates valid rental packages with MONTHS_OF_RENT and FIXED_AMOUNT policies', () => {
    const validPackages = [
      {
        packageId: 'pkg-12m',
        version: 1,
        durationMonths: 12,
        monthlyRent: 18000000,
        depositPolicy: { type: 'MONTHS_OF_RENT' as const, months: 1 },
        status: 'active' as const,
      },
      {
        packageId: 'pkg-6m',
        version: 1,
        durationMonths: 6,
        monthlyRent: 19500000,
        depositPolicy: { type: 'FIXED_AMOUNT' as const, amount: 20000000 },
        status: 'active' as const,
      },
    ]

    const result = apartmentPostingSchema.safeParse({
      ...baseValidData,
      rentalPackages: validPackages,
    })

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.rentalPackages).toHaveLength(2)
      expect(result.data.rentalPackages[0]?.durationMonths).toBe(12)
      expect(result.data.rentalPackages[1]?.durationMonths).toBe(6)
    }
  })

  it('rejects unsupported duration (e.g. 5 months)', () => {
    const invalidPackage = {
      packageId: 'pkg-5m',
      version: 1,
      durationMonths: 5, // Invalid: must be 3, 6, 12, 24
      monthlyRent: 15000000,
      depositPolicy: { type: 'MONTHS_OF_RENT', months: 1 },
      status: 'active',
    }

    const result = rentalPackagePostingSchema.safeParse(invalidPackage)
    expect(result.success).toBe(false)
  })

  it('rejects monthlyRent <= 0 in package', () => {
    const invalidPackage = {
      packageId: 'pkg-3m',
      version: 1,
      durationMonths: 3,
      monthlyRent: 0,
      depositPolicy: { type: 'MONTHS_OF_RENT', months: 1 },
      status: 'active',
    }

    const result = rentalPackagePostingSchema.safeParse(invalidPackage)
    expect(result.success).toBe(false)
  })

  describe('ensureRentalPackagesFallback', () => {
    it('generates a 12-month default package when no packages provided', () => {
      const fallback = ensureRentalPackagesFallback(15) // 15 million VND
      expect(fallback).toHaveLength(1)
      expect(fallback[0]).toEqual({
        packageId: 'pkg-default-12m',
        version: 1,
        durationMonths: 12,
        monthlyRent: 15000000,
        depositPolicy: {
          type: 'MONTHS_OF_RENT',
          months: 1,
        },
        status: 'active',
      })
    })

    it('preserves existing active packages without overwriting', () => {
      const customPackages = [
        {
          packageId: 'custom-6m',
          version: 1,
          durationMonths: 6 as const,
          monthlyRent: 12000000,
          depositPolicy: { type: 'MONTHS_OF_RENT' as const, months: 2 },
          status: 'active' as const,
        },
      ]

      const fallback = ensureRentalPackagesFallback(10, customPackages)
      expect(fallback).toHaveLength(1)
      expect(fallback[0]?.packageId).toBe('custom-6m')
      expect(fallback[0]?.durationMonths).toBe(6)
    })
  })
})
