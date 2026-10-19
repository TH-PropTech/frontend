import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  createApartment,
  resubmitApartment,
  uploadApartmentImages,
  searchProjects,
  getMyListings,
  renewApartment,
} from './apartment-posting-api'
import { apiClient } from '@/shared/api/api-client'
import type { ApartmentFormValues, LandlordApartmentItem } from '../model/types'
import type { RentalPackagePostingSchemaType } from '../model/apartment-posting-schema'

vi.mock('@/shared/api/api-client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
  },
}))

describe('apartment-posting-api', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const sampleValues: ApartmentFormValues = {
    title: 'Căn hộ cao cấp 2PN view hồ',
    category: 'Căn hộ chung cư',
    description: 'Mô tả căn hộ chi tiết đầy đủ tiện nghi...',
    location: 'Hà Nội',
    city: 'Hà Nội',
    district: 'Nam Từ Liêm',
    ward: 'Tây Mỗ',
    street: 'Đại Lộ Thăng Long',
    address: 'Vinhomes Smart City',
    priceMonthly: 4.5, // 4.5 triệu/tháng
    area: 65,
    bedrooms: 2,
    bathrooms: 1,
    direction: 'Đông Bắc',
    balconyDirection: 'Đông Bắc',
    furniture: 'Đầy đủ nội thất hiện đại',
    moveInTime: 'Ngay lập tức',
    electricity: 'Giá nhà nước',
    water: 'Giá nhà nước',
    internet: 'Cố định',
    gallery: ['https://example.com/img1.jpg'],
    amenities: ['pool', 'gym'],
    projectName: 'Vinhomes Smart City',
    projectId: 'proj-1',
    rentalPackages: [
      {
        packageId: 'pkg-12m',
        version: 1,
        durationMonths: 12,
        monthlyRent: 4500000,
        depositPolicy: {
          type: 'MONTHS_OF_RENT',
          months: 1,
        },
        status: 'active',
        // Computed fields that should be stripped
        resolvedDepositAmount: 4500000,
        resolvedHoldingDepositAmount: 1000000,
        resolvedSecurityTopUpAmount: 3500000,
      } as unknown as RentalPackagePostingSchemaType,
    ],
  }

  it('createApartment strips resolvedDepositAmount and converts priceMonthly to VND', async () => {
    vi.mocked(apiClient.post).mockResolvedValueOnce({
      id: 'apt-1',
    } as unknown as LandlordApartmentItem)

    await createApartment(sampleValues)

    expect(apiClient.post).toHaveBeenCalledWith(
      '/apartments',
      expect.objectContaining({
        priceMonthly: 4500000,
        rentalPackages: [
          expect.not.objectContaining({
            resolvedDepositAmount: 4500000,
            resolvedHoldingDepositAmount: 1000000,
            resolvedSecurityTopUpAmount: 3500000,
          }),
        ],
      })
    )
  })

  it('resubmitApartment strips computed fields and sends patch request', async () => {
    vi.mocked(apiClient.patch).mockResolvedValueOnce({
      id: 'apt-1',
    } as unknown as LandlordApartmentItem)

    await resubmitApartment('apt-1', sampleValues)

    expect(apiClient.patch).toHaveBeenCalledWith(
      '/apartments/apt-1/resubmit',
      expect.objectContaining({
        priceMonthly: 4500000,
        rentalPackages: [
          expect.objectContaining({
            packageId: 'pkg-12m',
            monthlyRent: 4500000,
          }),
        ],
      })
    )
  })

  it('uploadApartmentImages creates formData and posts to /apartments/upload', async () => {
    vi.mocked(apiClient.post).mockResolvedValueOnce({
      urls: ['https://example.com/uploaded.jpg'],
    } as unknown as { urls: string[] })
    const file = new File(['image-content'], 'test.png', { type: 'image/png' })

    const result = await uploadApartmentImages([file])

    expect(result).toEqual(['https://example.com/uploaded.jpg'])
    expect(apiClient.post).toHaveBeenCalledWith(
      '/apartments/upload',
      expect.any(FormData)
    )
  })

  it('searchProjects queries with search param', async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce([])

    await searchProjects('Vinhomes')

    expect(apiClient.get).toHaveBeenCalledWith('/projects?search=Vinhomes')
  })

  it('renewApartment sends patch to /apartments/:id/renew', async () => {
    vi.mocked(apiClient.patch).mockResolvedValueOnce({
      id: 'apt-1',
    } as unknown as LandlordApartmentItem)

    await renewApartment('apt-1')

    expect(apiClient.patch).toHaveBeenCalledWith('/apartments/apt-1/renew', {})
  })

  it('getMyListings requests format=landlord', async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce([])

    await getMyListings()

    expect(apiClient.get).toHaveBeenCalledWith(
      '/apartments/my-listings?format=landlord'
    )
  })
})
