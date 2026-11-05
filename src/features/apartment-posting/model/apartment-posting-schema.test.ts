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

  describe('description (không bắt buộc, nhập thì tối thiểu 10 ký tự)', () => {
    it('accepts a missing description', () => {
      const { description: _description, ...withoutDescription } = baseValidData
      void _description
      expect(apartmentPostingSchema.safeParse(withoutDescription).success).toBe(
        true
      )
    })

    it('accepts an empty or whitespace-only description', () => {
      for (const description of ['', '    ']) {
        expect(
          apartmentPostingSchema.safeParse({ ...baseValidData, description })
            .success
        ).toBe(true)
      }
    })

    it('accepts exactly 10 characters and rejects 1 to 9 characters', () => {
      expect(
        apartmentPostingSchema.safeParse({
          ...baseValidData,
          description: 'a'.repeat(10),
        }).success
      ).toBe(true)
      expect(
        apartmentPostingSchema.safeParse({
          ...baseValidData,
          description: 'a'.repeat(9),
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

  describe('moveOutPolicy', () => {
    const base = {
      packageId: 'pkg-3m',
      version: 1,
      durationMonths: 3,
      monthlyRent: 5000000,
      depositPolicy: { type: 'MONTHS_OF_RENT', months: 1 },
      status: 'active',
    }

    it('accepts 1..15 days and a package without the field', () => {
      expect(rentalPackagePostingSchema.safeParse(base).success).toBe(true)
      for (const responseDays of [1, 15]) {
        expect(
          rentalPackagePostingSchema.safeParse({
            ...base,
            moveOutPolicy: { responseDays },
          }).success
        ).toBe(true)
      }
    })

    it('rejects out-of-range and non-integer days', () => {
      for (const responseDays of [0, 16, 2.5]) {
        expect(
          rentalPackagePostingSchema.safeParse({
            ...base,
            moveOutPolicy: { responseDays },
          }).success
        ).toBe(false)
      }
    })
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

  describe('rent and deposit bounds', () => {
    const pkg = {
      packageId: 'pkg-12m',
      version: 1,
      durationMonths: 12 as const,
      monthlyRent: 12_000_000,
      depositPolicy: { type: 'MONTHS_OF_RENT' as const, months: 1 },
      status: 'active' as const,
    }

    it('accepts rents from a few hundred thousand to tens of millions', () => {
      for (const monthlyRent of [
        100_000, 300_000, 500_000, 12_000_000, 45_000_000,
      ]) {
        expect(
          rentalPackagePostingSchema.safeParse({ ...pkg, monthlyRent }).success
        ).toBe(true)
      }
      for (const priceMonthly of [0.1, 0.3, 0.5, 12.5, 45]) {
        expect(
          apartmentPostingSchema.safeParse({ ...baseValidData, priceMonthly })
            .success
        ).toBe(true)
      }
    })

    it('rejects a rent that cannot be real, which is a slip in the unit', () => {
      const listing = apartmentPostingSchema.safeParse({
        ...baseValidData,
        priceMonthly: 10_000,
      })
      expect(listing.success).toBe(false)
      expect(JSON.stringify(listing.error?.issues)).toContain('Giá thuê tối đa')

      expect(
        rentalPackagePostingSchema.safeParse({
          ...pkg,
          monthlyRent: 100_000_000_000,
        }).success
      ).toBe(false)
    })

    it('limits the deposit to 12 months of rent, by months or by amount', () => {
      expect(
        rentalPackagePostingSchema.safeParse({
          ...pkg,
          depositPolicy: { type: 'MONTHS_OF_RENT', months: 12 },
        }).success
      ).toBe(true)
      expect(
        rentalPackagePostingSchema.safeParse({
          ...pkg,
          depositPolicy: { type: 'MONTHS_OF_RENT', months: 13 },
        }).success
      ).toBe(false)
      expect(
        rentalPackagePostingSchema.safeParse({
          ...pkg,
          depositPolicy: { type: 'FIXED_AMOUNT', amount: 12_000_000 * 12 },
        }).success
      ).toBe(true)

      const tooMuch = rentalPackagePostingSchema.safeParse({
        ...pkg,
        depositPolicy: { type: 'FIXED_AMOUNT', amount: 12_000_000 * 13 },
      })
      expect(tooMuch.success).toBe(false)
      expect(tooMuch.error?.issues[0]?.path).toEqual([
        'depositPolicy',
        'amount',
      ])
    })
  })

  describe('lease terms on a rental package', () => {
    const basePackage = {
      packageId: 'pkg-12',
      version: 1,
      durationMonths: 12 as const,
      monthlyRent: 12_000_000,
      depositPolicy: { type: 'MONTHS_OF_RENT' as const, months: 2 },
      status: 'active' as const,
    }
    const parse = (extra: Record<string, unknown>): boolean =>
      rentalPackagePostingSchema.safeParse({ ...basePackage, ...extra }).success

    it('accepts a legacy package without terms and in-range terms', () => {
      expect(parse({})).toBe(true)
      expect(
        parse({
          paymentDay: 5,
          latePenaltyRate: 10,
          terminationNoticeDays: 45,
          customClauses: 'Không nuôi thú cưng.',
        })
      ).toBe(true)
    })

    it.each([
      ['payment day 0', { paymentDay: 0 }],
      ['payment day 32', { paymentDay: 32 }],
      ['penalty above 20', { latePenaltyRate: 21 }],
      ['negative penalty', { latePenaltyRate: -1 }],
      ['notice below 30', { terminationNoticeDays: 29 }],
      ['clauses over 2000 characters', { customClauses: 'a'.repeat(2001) }],
    ])('rejects %s', (_label, extra) => {
      expect(parse(extra)).toBe(false)
    })
  })
})
