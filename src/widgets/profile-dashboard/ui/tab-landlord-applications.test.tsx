import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import * as React from 'react'
import { TabLandlordApplications } from './tab-landlord-applications'
import * as rentalHook from '@/features/rental-application/model/use-landlord-applications'

vi.mock(
  '@/features/rental-application/model/use-landlord-applications',
  () => ({
    useLandlordApplications: vi.fn(),
  })
)

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function renderWithClient(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  })
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  )
}

describe('TabLandlordApplications', () => {
  const defaultHookValue = {
    applications: [
      {
        _id: 'app-abc-123',
        apartmentId: 'apt-1',
        landlordId: 'landlord-1',
        tenantId: 'tenant-1',
        packageSnapshot: {
          packageId: 'pkg-1',
          version: 1,
          durationMonths: 12 as const,
          monthlyRent: 15000000,
          resolvedDepositAmount: 15000000,
        },
        status: 'pending' as const,
        reasonCode: null,
        actorId: null,
        actorTimestamp: null,
        occupants: 2,
        moveInDate: '2026-10-01',
        occupation: 'Bác sĩ',
        hasPets: false,
        createdAt: '2026-09-18T00:00:00.000Z',
        updatedAt: '2026-09-18T00:00:00.000Z',
      },
    ],
    allApplications: [],
    counts: { all: 1, pending: 1, accepted: 0, rejected: 0 },
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
    vi.mocked(rentalHook.useLandlordApplications).mockReturnValue(
      defaultHookValue
    )
  })

  it('renders tab landlord applications header and list', () => {
    renderWithClient(<TabLandlordApplications />)

    expect(screen.getByTestId('tab-landlord-applications')).toBeDefined()
    expect(screen.getByText('Hồ sơ đề nghị thuê nhận được')).toBeDefined()
    expect(screen.getByText('Bác sĩ')).toBeDefined()
  })

  it('opens review dialog when review button is clicked', () => {
    renderWithClient(<TabLandlordApplications />)

    const reviewBtn = screen.getByTestId('review-btn-app-abc-123')
    fireEvent.click(reviewBtn)

    expect(defaultHookValue.setSelectedApplication).toHaveBeenCalled()
  })
})
