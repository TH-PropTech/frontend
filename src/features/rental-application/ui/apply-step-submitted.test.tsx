import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { ApplyStepSubmitted } from './apply-step-submitted'
import type { RentalApplicationItem } from '../api/rental-application-api'

const mockApplication: RentalApplicationItem = {
  _id: 'app-998877',
  apartmentId: 'apartment-demo-1',
  tenantId: 'tenant-user-1',
  landlordId: 'landlord-user-2',
  status: 'pending',
  reasonCode: null,
  actorId: null,
  actorTimestamp: null,
  createdAt: '2026-09-13T10:00:00Z',
  updatedAt: '2026-09-13T10:00:00Z',
  occupants: 2,
  moveInDate: '2026-10-01',
  occupation: 'Kỹ sư',
  hasPets: false,
  packageSnapshot: {
    packageId: 'pkg-12m',
    version: 1,
    durationMonths: 12,
    monthlyRent: 12000000,
    resolvedDepositAmount: 24000000,
  },
}

describe('ApplyStepSubmitted Component', () => {
  afterEach(() => cleanup())

  it('renders application confirmation, ID, pending status, and snapshot metrics', () => {
    render(
      <ApplyStepSubmitted
        application={mockApplication}
        apartmentId="apartment-demo-1"
        propertyTitle="Căn hộ Landmark 81"
      />
    )

    expect(
      screen.getByText('Hồ sơ đặt thuê đã được gửi thành công')
    ).toBeInTheDocument()
    expect(screen.getByText('app-998877')).toBeInTheDocument()
    expect(screen.getByText('Đang chờ chủ nhà phản hồi')).toBeInTheDocument()
    expect(screen.getByText('Căn hộ Landmark 81')).toBeInTheDocument()
    expect(screen.getByText('12.000.000 ₫/tháng')).toBeInTheDocument()
    expect(screen.getByText('24.000.000 ₫')).toBeInTheDocument()
    // Subtotal: 12 * 12m = 144,000,000
    expect(screen.getByText('144.000.000 ₫')).toBeInTheDocument()
  })

  it('renders the 12-article reference framework based on Decree 96/2024/ND-CP', () => {
    render(
      <ApplyStepSubmitted
        application={mockApplication}
        apartmentId="apartment-demo-1"
      />
    )

    expect(
      screen.getByText(
        /12 Điều khoản chuẩn theo Phụ lục II Nghị định 96\/2024\/NĐ-CP/i
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Điều 1: Thông tin các bên ký kết/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Điều 12: Hiệu lực thi hành & chữ ký số/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Ghi nhận sổ cái Hyperledger Fabric/i)
    ).toBeInTheDocument()
  })

  it('provides navigation links to /rental-applications and /properties/:id', () => {
    render(
      <ApplyStepSubmitted
        application={mockApplication}
        apartmentId="apartment-demo-1"
      />
    )

    const listLink = screen.getByRole('link', {
      name: /Theo dõi tiến trình hồ sơ của tôi/i,
    })
    expect(listLink).toHaveAttribute('href', '/rental-applications')

    const backLink = screen.getByRole('link', {
      name: /Quay lại chi tiết căn hộ/i,
    })
    expect(backLink).toHaveAttribute('href', '/properties/apartment-demo-1')
  })

  it('handles application without package snapshot gracefully', () => {
    const appWithoutSnapshot: RentalApplicationItem = {
      ...mockApplication,
      packageSnapshot: null,
    }

    render(
      <ApplyStepSubmitted
        application={appWithoutSnapshot}
        apartmentId="apartment-demo-1"
      />
    )

    expect(screen.getByText('app-998877')).toBeInTheDocument()
    expect(screen.getByText('0 ₫/tháng')).toBeInTheDocument()
  })
})
