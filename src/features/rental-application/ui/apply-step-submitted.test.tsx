import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
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
  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  it('renders application confirmation, reference code, pending status, and snapshot metrics', () => {
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
    expect(screen.getByText('#HS-998877')).toBeInTheDocument()
    expect(screen.getByText('Đang chờ chủ nhà phản hồi')).toBeInTheDocument()
    expect(screen.getByText('Căn hộ Landmark 81')).toBeInTheDocument()
    expect(screen.getByText('12.000.000 ₫/tháng')).toBeInTheDocument()
    expect(screen.getByText('24.000.000 ₫')).toBeInTheDocument()
    // Subtotal: 12 * 12m = 144,000,000
    expect(screen.getByText('144.000.000 ₫')).toBeInTheDocument()
  })

  it('renders and expands the 12-article reference framework based on Decree 96/2024/ND-CP', () => {
    render(
      <ApplyStepSubmitted
        application={mockApplication}
        apartmentId="apartment-demo-1"
      />
    )

    const trigger = screen.getByText(
      /12 Điều khoản chuẩn theo Phụ lục II Nghị định 96\/2024\/NĐ-CP/i
    )
    expect(trigger).toBeInTheDocument()
    fireEvent.click(trigger)

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

  it('allows copying full application ID to clipboard', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined)
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    })

    render(
      <ApplyStepSubmitted
        application={mockApplication}
        apartmentId="apartment-demo-1"
      />
    )

    const copyBtn = screen.getByRole('button', { name: /Sao chép mã hồ sơ/i })
    fireEvent.click(copyBtn)

    expect(writeTextMock).toHaveBeenCalledWith('app-998877')
    expect(await screen.findByText('Đã sao chép')).toBeInTheDocument()
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

    expect(screen.getByText('#HS-998877')).toBeInTheDocument()
    expect(screen.getByText('0 ₫/tháng')).toBeInTheDocument()
  })

  it('exposes the real contract CTA only when handoff provisioning is ready', () => {
    render(
      <ApplyStepSubmitted
        application={{
          ...mockApplication,
          status: 'accepted',
          contractHandoff: {
            state: 'ready',
            contractId: 'contract-ready-1',
            href: '/contracts/contract-ready-1',
            reasonCode: null,
          },
        }}
        apartmentId="apartment-demo-1"
      />
    )

    const contractLink = screen.getByRole('link', { name: /Xem hợp đồng số/i })
    expect(contractLink).toHaveAttribute('href', '/contracts/contract-ready-1')
  })

  it('checks landlord response on demand with loading and last-checked feedback', async () => {
    vi.useFakeTimers()
    const onRefreshStatus = vi.fn().mockResolvedValue(undefined)

    render(
      <ApplyStepSubmitted
        application={mockApplication}
        apartmentId="apartment-demo-1"
        onRefreshStatus={onRefreshStatus}
      />
    )

    const refreshButton = screen.getByRole('button', {
      name: /Kiểm tra phản hồi của chủ nhà/i,
    })
    fireEvent.click(refreshButton)

    expect(onRefreshStatus).toHaveBeenCalledTimes(1)
    expect(refreshButton).toBeDisabled()

    await act(async () => {
      await vi.advanceTimersByTimeAsync(600)
    })

    expect(refreshButton).not.toBeDisabled()
    expect(screen.getByTestId('application-last-checked')).toHaveTextContent(
      /Kiểm tra lần cuối lúc:/i
    )
  })
})
