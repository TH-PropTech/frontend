import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import * as React from 'react'
import { LandlordApplicationList } from './landlord-application-list'
import * as hook from '../model/use-landlord-applications'
import type { RentalApplicationItem } from '../api/rental-application-api'

vi.mock('../model/use-landlord-applications', () => ({
  useLandlordApplications: vi.fn(),
}))

const mockItems: RentalApplicationItem[] = [
  {
    _id: 'app-pending-1',
    apartmentId: 'apt-1',
    landlordId: 'landlord-1',
    tenantId: 'tenant-1',
    packageSnapshot: {
      packageId: 'pkg-1',
      version: 1,
      durationMonths: 12,
      monthlyRent: 15000000,
      resolvedDepositAmount: 15000000,
    },
    status: 'pending',
    reasonCode: null,
    actorId: null,
    actorTimestamp: null,
    occupants: 2,
    moveInDate: '2026-10-15',
    occupation: 'Kỹ sư phần mềm',
    hasPets: false,
    notes: 'Muốn dọn vào sớm',
    createdAt: '2026-09-18T00:00:00.000Z',
    updatedAt: '2026-09-18T00:00:00.000Z',
  },
  {
    _id: 'app-accepted-2',
    apartmentId: 'apt-2',
    landlordId: 'landlord-1',
    tenantId: 'tenant-2',
    contractId: 'contract-123',
    packageSnapshot: {
      packageId: 'pkg-2',
      version: 1,
      durationMonths: 6,
      monthlyRent: 10000000,
      resolvedDepositAmount: 10000000,
    },
    status: 'accepted',
    reasonCode: null,
    actorId: null,
    actorTimestamp: null,
    occupants: 1,
    moveInDate: '2026-11-01',
    occupation: 'Nhân viên văn phòng',
    hasPets: true,
    createdAt: '2026-09-17T00:00:00.000Z',
    updatedAt: '2026-09-17T00:00:00.000Z',
  },
]

describe('LandlordApplicationList', () => {
  const defaultHookValue = {
    applications: mockItems,
    allApplications: mockItems,
    counts: { all: 2, pending: 1, accepted: 1, rejected: 0 },
    filter: 'all' as const,
    setFilter: vi.fn(),
    selectedApplication: null,
    setSelectedApplication: vi.fn(),
    isLoading: false,
    isError: false,
    error: null,
    refetch: vi.fn(),
    respond: vi.fn(),
    isResponding: false,
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(hook.useLandlordApplications).mockReturnValue(defaultHookValue)
  })

  it('renders loading skeleton when loading', () => {
    vi.mocked(hook.useLandlordApplications).mockReturnValue({
      ...defaultHookValue,
      isLoading: true,
    })

    render(<LandlordApplicationList />)
    expect(screen.getByTestId('landlord-application-loading')).toBeDefined()
  })

  it('renders error message and retry button when error occurs', () => {
    const refetchMock = vi.fn()
    vi.mocked(hook.useLandlordApplications).mockReturnValue({
      ...defaultHookValue,
      isError: true,
      refetch: refetchMock,
    })

    render(<LandlordApplicationList />)
    expect(screen.getByTestId('landlord-application-error')).toBeDefined()

    const retryBtn = screen.getByRole('button', { name: /thử lại/i })
    fireEvent.click(retryBtn)
    expect(refetchMock).toHaveBeenCalled()
  })

  it('renders empty state when no applications found', () => {
    vi.mocked(hook.useLandlordApplications).mockReturnValue({
      ...defaultHookValue,
      applications: [],
    })

    render(<LandlordApplicationList />)
    expect(screen.getByTestId('landlord-application-empty')).toBeDefined()
    expect(screen.getByText(/chưa có hồ sơ đặt thuê nào/i)).toBeDefined()
  })

  it('renders list of applications and allows clicking review button', () => {
    const onSelectMock = vi.fn()
    render(<LandlordApplicationList onSelectApplication={onSelectMock} />)

    expect(screen.getByTestId('landlord-application-list')).toBeDefined()
    expect(screen.getByText('Kỹ sư phần mềm')).toBeDefined()
    expect(screen.getByText('Có thú cưng')).toBeDefined()

    const reviewBtn = screen.getByTestId('review-btn-app-pending-1')
    fireEvent.click(reviewBtn)

    expect(defaultHookValue.setSelectedApplication).toHaveBeenCalledWith(
      mockItems[0]
    )
    expect(onSelectMock).toHaveBeenCalledWith(mockItems[0])
  })

  it('changes filter tab when tab is clicked', () => {
    render(<LandlordApplicationList />)

    const pendingTab = screen.getByTestId('filter-tab-pending')
    fireEvent.click(pendingTab)

    expect(defaultHookValue.setFilter).toHaveBeenCalledWith('pending')
  })
})
