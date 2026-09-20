import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import * as React from 'react'
import { ApplicationDetailDialog } from './application-detail-dialog'
import type { RentalApplicationItem } from '../api/rental-application-api'

const mockApp: RentalApplicationItem = {
  _id: 'app-detail-12345678',
  apartmentId: 'apt-1',
  landlordId: 'landlord-1',
  tenantId: 'tenant-1',
  packageSnapshot: {
    packageId: 'pkg-1',
    version: 2,
    durationMonths: 12,
    monthlyRent: 15000000,
    resolvedDepositAmount: 15000000,
  },
  applicationRevision: 2,
  status: 'pending',
  reasonCode: null,
  actorId: null,
  actorTimestamp: null,
  occupants: 2,
  moveInDate: '2026-10-01',
  occupation: 'Kỹ sư phần mềm',
  hasPets: true,
  notes: 'Đăng ký tạm trú dài hạn',
  createdAt: '2026-09-18T00:00:00.000Z',
  updatedAt: '2026-09-18T00:00:00.000Z',
}

describe('ApplicationDetailDialog', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders null when application is null', () => {
    const { container } = render(
      <ApplicationDetailDialog
        application={null}
        open={true}
        onOpenChange={vi.fn()}
      />
    )
    expect(container.firstChild).toBeNull()
  })

  it('renders application details properly when open', () => {
    render(
      <ApplicationDetailDialog
        application={mockApp}
        open={true}
        onOpenChange={vi.fn()}
      />
    )

    expect(screen.getByTestId('application-detail-dialog')).toBeDefined()
    expect(screen.getByText(/Chi tiết hồ sơ đề nghị thuê nhà/i)).toBeDefined()
    expect(screen.getByText('2 người')).toBeDefined()
    expect(screen.getByText('Kỹ sư phần mềm')).toBeDefined()
    expect(screen.getByText('Có nuôi thú cưng')).toBeDefined()
    expect(screen.getByText(/"Đăng ký tạm trú dài hạn"/i)).toBeDefined()
  })

  it('switches between stepper tabs correctly', () => {
    render(
      <ApplicationDetailDialog
        application={mockApp}
        open={true}
        onOpenChange={vi.fn()}
      />
    )

    // Click B1 tab
    const step1Btn = screen.getByRole('button', {
      name: /b1: thông tin đã nộp/i,
    })
    fireEvent.click(step1Btn)
    expect(screen.getByText(/bước 1: thông tin người thuê/i)).toBeDefined()

    // Click B2 tab
    const step2Btn = screen.getByRole('button', {
      name: /b2: gói thuê & tài chính/i,
    })
    fireEvent.click(step2Btn)
    expect(
      screen.getByText(/bước 2: gói thuê & nghĩa vụ tài chính/i)
    ).toBeDefined()

    // Click B3 tab
    const step3Btn = screen.getByRole('button', {
      name: /b3: điều khoản & pccc/i,
    })
    fireEvent.click(step3Btn)
    expect(
      screen.getByText(/bước 3: điều khoản & cam kết pháp lý/i)
    ).toBeDefined()

    // Click B4 tab
    const step4Btn = screen.getByRole('button', {
      name: /b4: tiến trình & ký hđ/i,
    })
    fireEvent.click(step4Btn)
    expect(screen.getByText(/bước 4: tiến trình xét duyệt/i)).toBeDefined()
  })

  it('calls onOpenChange(false) when close button is clicked', () => {
    const onOpenChangeMock = vi.fn()
    render(
      <ApplicationDetailDialog
        application={mockApp}
        open={true}
        onOpenChange={onOpenChangeMock}
      />
    )

    const closeBtn = screen.getByRole('button', { name: /đóng/i })
    fireEvent.click(closeBtn)
    expect(onOpenChangeMock).toHaveBeenCalledWith(false)
  })

  it('renders contract link when application is accepted and has contractId', () => {
    const acceptedApp: RentalApplicationItem = {
      ...mockApp,
      status: 'accepted',
      contractId: 'contract-abc-123',
    }

    render(
      <ApplicationDetailDialog
        application={acceptedApp}
        open={true}
        onOpenChange={vi.fn()}
      />
    )

    const viewContractLink = screen.getByRole('link', {
      name: /xem & ký hợp đồng/i,
    })
    expect(viewContractLink).toBeDefined()
    expect(viewContractLink.getAttribute('href')).toBe(
      '/contracts/contract-abc-123'
    )
  })
})
