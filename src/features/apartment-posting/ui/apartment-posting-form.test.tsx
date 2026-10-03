import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import * as React from 'react'
import { ApartmentPostingForm } from './apartment-posting-form'

const pushMock = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
}))

vi.mock('../api/apartment-posting-api', () => ({
  createApartment: vi.fn(),
  updateApartment: vi.fn(),
  resubmitApartment: vi.fn(),
  uploadApartmentImages: vi.fn(),
  searchProjects: vi.fn().mockResolvedValue([]),
  searchBuildings: vi.fn().mockResolvedValue([]),
}))

vi.mock('sonner', () => ({
  toast: {
    loading: vi.fn().mockReturnValue('toast-id'),
    success: vi.fn(),
    error: vi.fn(),
  },
}))

describe('ApartmentPostingForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders step 1 by default with form controls', () => {
    render(<ApartmentPostingForm />)

    expect(screen.getByText('Đăng tin cho thuê căn hộ')).toBeDefined()
    expect(screen.getByText('Vị trí & Dự án')).toBeDefined()
    expect(screen.getByText('Tiếp tục')).toBeDefined()
  })

  it('renders edit mode heading when mode is edit', () => {
    render(
      <ApartmentPostingForm
        mode="edit"
        initialData={{
          id: 'apt-123',
          title: 'Căn hộ River Gate',
          category: 'Căn hộ chung cư',
          description: 'Mô tả chi tiết căn hộ...',
          location: '',
          city: 'Hồ Chí Minh',
          district: 'Quận 4',
          ward: 'Phường 1',
          street: 'Bến Vân Đồn',
          address: '151 Bến Vân Đồn',
          priceMonthly: 15000000,
          area: 70,
          bedrooms: 2,
          bathrooms: 2,
          direction: 'Đông',
          balconyDirection: 'Nam',
          furniture: 'Đầy đủ',
          moveInTime: '',
          electricity: 'Giá nhà nước',
          water: 'Giá nhà nước',
          internet: 'Cố định',
          gallery: ['https://example.com/img1.jpg'],
          images360: [],
          vrUrl: '',
          amenities: ['pool'],
          status: 'pending',
          rejectedReason: null,
          submittedAt: null,
          approvedAt: null,
          expiresAt: null,
          projectName: 'River Gate',
          projectId: 'p-1',
          buildingName: 'Tower A',
          buildingId: 'b-1',
          rentalPackages: [],
        }}
      />
    )

    expect(screen.getByText('Chỉnh sửa tin đăng cho thuê')).toBeDefined()
  })
})
