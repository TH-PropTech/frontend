import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { apiClient } from '@/shared/api/api-client'
import { DetailDrawer } from './detail-drawer'
import type { StaffApartment } from './types'

vi.mock('@/shared/api/api-client', () => ({
  apiClient: {
    post: vi.fn(),
    patch: vi.fn(),
  },
}))

vi.mock('sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn(), info: vi.fn() },
}))

const apartment: StaffApartment = {
  id: '507f1f77bcf86cd799439011',
  title: 'Căn hộ kiểm thử',
  location: 'Quận 7, TP.HCM',
  city: 'TP.HCM',
  district: 'Quận 7',
  priceMonthly: 15_000_000,
  area: 80,
  bedrooms: 2,
  bathrooms: 2,
  gallery: ['/normal.jpg'],
  images360: ['/panorama.jpg'],
  vrUrl: '',
  amenities: [],
  status: 'available',
  isVerified: true,
  landlordId: 'landlord-1',
  rejectedReason: null,
  submittedAt: null,
  approvedAt: null,
  expiresAt: null,
  projectName: null,
  buildingName: null,
}

function renderDrawer(onMediaChange = vi.fn()): void {
  render(
    <DetailDrawer
      apartment={apartment}
      onClose={vi.fn()}
      onStatusChange={vi.fn()}
      onApprove={vi.fn()}
      onReject={vi.fn()}
      onMediaChange={onMediaChange}
    />
  )
}

describe('DetailDrawer VR tour and editing', () => {
  it('saves the VR tour link staff captured through the media endpoint', async () => {
    const updated = {
      ...apartment,
      vrUrl: 'https://my.matterport.com/show/?m=abc',
    }
    vi.mocked(apiClient.patch).mockResolvedValue(updated)
    const onMediaChange = vi.fn()
    renderDrawer(onMediaChange)

    fireEvent.change(screen.getByLabelText('Link VR Tour'), {
      target: { value: '  https://my.matterport.com/show/?m=abc  ' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Lưu link VR' }))

    await waitFor(() =>
      expect(apiClient.patch).toHaveBeenCalledWith(
        `/apartments/${apartment.id}/media`,
        { vrUrl: 'https://my.matterport.com/show/?m=abc' }
      )
    )
    expect(onMediaChange).toHaveBeenCalledWith(updated)
  })

  it('disables saving the VR link until it changes', () => {
    renderDrawer()

    expect(
      (screen.getByRole('button', { name: 'Lưu link VR' }) as HTMLButtonElement)
        .disabled
    ).toBe(true)
  })

  it('lets staff open the edit dialog for an approved listing', () => {
    renderDrawer()

    fireEvent.click(screen.getByRole('button', { name: 'Chỉnh sửa thông tin' }))

    expect(screen.getByText('Chỉnh sửa thông tin căn hộ')).toBeTruthy()
  })
})

describe('DetailDrawer media views', () => {
  it('keeps normal and 360 images in separate views', () => {
    renderDrawer()
    expect(screen.getByAltText('Ảnh căn hộ 1')).toHaveAttribute(
      'src',
      '/normal.jpg'
    )

    fireEvent.click(screen.getByRole('button', { name: 'Ảnh 360° (1)' }))

    expect(screen.getByAltText('Ảnh căn hộ 1')).toHaveAttribute(
      'src',
      '/panorama.jpg'
    )
  })

  it('persists uploaded files to the selected 360 collection', async () => {
    const updated = { ...apartment, images360: ['/new-360.jpg'] }
    vi.mocked(apiClient.post).mockResolvedValue({ urls: ['/new-360.jpg'] })
    vi.mocked(apiClient.patch).mockResolvedValue(updated)
    const onMediaChange = vi.fn()
    renderDrawer(onMediaChange)
    fireEvent.click(screen.getByRole('button', { name: 'Ảnh 360° (1)' }))

    fireEvent.change(screen.getByLabelText('Tải lên ảnh căn hộ'), {
      target: {
        files: [new File(['image'], 'room.jpg', { type: 'image/jpeg' })],
      },
    })

    await waitFor(() =>
      expect(apiClient.patch).toHaveBeenCalledWith(
        `/apartments/${apartment.id}/media`,
        { images360: ['/new-360.jpg'] }
      )
    )
    expect(onMediaChange).toHaveBeenCalledWith(updated)
  })
})
