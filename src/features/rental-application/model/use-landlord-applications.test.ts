import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import * as React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useLandlordApplications } from './use-landlord-applications'
import * as api from '../api/rental-application-api'
import { toast } from 'sonner'

vi.mock('../api/rental-application-api', () => ({
  getReceivedRentalApplications: vi.fn(),
  respondToRentalApplication: vi.fn(),
  isApplicationRevisionStaleError: vi.fn(),
}))

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return React.createElement(
      QueryClientProvider,
      { client: queryClient },
      children
    )
  }
}

const mockApplications: api.RentalApplicationItem[] = [
  {
    _id: 'app-1',
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
    moveInDate: '2026-10-01',
    occupation: 'Software Engineer',
    hasPets: false,
    createdAt: '2026-09-18T00:00:00.000Z',
    updatedAt: '2026-09-18T00:00:00.000Z',
  },
  {
    _id: 'app-2',
    apartmentId: 'apt-1',
    landlordId: 'landlord-1',
    tenantId: 'tenant-2',
    packageSnapshot: {
      packageId: 'pkg-2',
      version: 1,
      durationMonths: 6,
      monthlyRent: 12000000,
      resolvedDepositAmount: 12000000,
    },
    status: 'accepted',
    reasonCode: null,
    actorId: null,
    actorTimestamp: null,
    occupants: 1,
    moveInDate: '2026-11-01',
    occupation: 'Designer',
    hasPets: true,
    createdAt: '2026-09-17T00:00:00.000Z',
    updatedAt: '2026-09-17T00:00:00.000Z',
  },
  {
    _id: 'app-3',
    apartmentId: 'apt-2',
    landlordId: 'landlord-1',
    tenantId: 'tenant-3',
    packageSnapshot: {
      packageId: 'pkg-3',
      version: 1,
      durationMonths: 3,
      monthlyRent: 8000000,
      resolvedDepositAmount: 8000000,
    },
    status: 'rejected',
    reasonCode: 'OTHER',
    actorId: null,
    actorTimestamp: null,
    occupants: 4,
    moveInDate: '2026-12-01',
    occupation: 'Student',
    hasPets: false,
    createdAt: '2026-09-16T00:00:00.000Z',
    updatedAt: '2026-09-16T00:00:00.000Z',
  },
]

const mockResponse: api.RentalApplicationList = {
  items: mockApplications,
  total: 3,
  page: 1,
  limit: 20,
  totalPages: 1,
}

describe('useLandlordApplications', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches applications and computes counts accurately', async () => {
    vi.mocked(api.getReceivedRentalApplications).mockResolvedValue(mockResponse)

    const { result } = renderHook(() => useLandlordApplications(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.allApplications).toHaveLength(3)
    expect(result.current.applications).toHaveLength(3)
    expect(result.current.counts).toEqual({
      all: 3,
      pending: 1,
      accepted: 1,
      rejected: 1,
    })
  })

  it('filters applications by status', async () => {
    vi.mocked(api.getReceivedRentalApplications).mockResolvedValue(mockResponse)

    const { result } = renderHook(() => useLandlordApplications(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    act(() => {
      result.current.setFilter('pending')
    })

    expect(result.current.applications).toHaveLength(1)
    expect(result.current.applications[0]?._id).toBe('app-1')

    act(() => {
      result.current.setFilter('accepted')
    })
    expect(result.current.applications).toHaveLength(1)
    expect(result.current.applications[0]?._id).toBe('app-2')

    act(() => {
      result.current.setFilter('rejected')
    })
    expect(result.current.applications).toHaveLength(1)
    expect(result.current.applications[0]?._id).toBe('app-3')
  })

  it('handles application selection', () => {
    vi.mocked(api.getReceivedRentalApplications).mockResolvedValue(mockResponse)

    const { result } = renderHook(() => useLandlordApplications(), {
      wrapper: createWrapper(),
    })

    expect(result.current.selectedApplication).toBeNull()

    act(() => {
      result.current.setSelectedApplication(mockApplications[0]!)
    })

    expect(result.current.selectedApplication?._id).toBe('app-1')
  })

  it('responds with approval successfully', async () => {
    vi.mocked(api.getReceivedRentalApplications).mockResolvedValue(mockResponse)
    vi.mocked(api.respondToRentalApplication).mockResolvedValue({
      ...mockApplications[0]!,
      status: 'accepted',
    })

    const { result } = renderHook(() => useLandlordApplications(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    await act(async () => {
      await result.current.respond({
        id: 'app-1',
        status: 'accepted',
        reasonCode: 'APPROVED',
        note: 'Welcome!',
      })
    })

    expect(api.respondToRentalApplication).toHaveBeenCalledWith('app-1', {
      status: 'accepted',
      reasonCode: 'APPROVED',
      note: 'Welcome!',
    })
    expect(toast.success).toHaveBeenCalledWith(
      expect.stringContaining('Đã chấp thuận hồ sơ thuê')
    )
  })

  it('handles revision conflict (stale revision 409) with specific warning', async () => {
    vi.mocked(api.getReceivedRentalApplications).mockResolvedValue(mockResponse)
    const error = new Error('APPLICATION_REVISION_STALE')
    vi.mocked(api.respondToRentalApplication).mockRejectedValue(error)
    vi.mocked(api.isApplicationRevisionStaleError).mockReturnValue(true)

    const { result } = renderHook(() => useLandlordApplications(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    await act(async () => {
      try {
        await result.current.respond({
          id: 'app-1',
          status: 'accepted',
          reasonCode: 'APPROVED',
        })
      } catch {
        // Expected to throw
      }
    })

    expect(toast.error).toHaveBeenCalledWith(
      expect.stringContaining(
        'Hồ sơ đã được cập nhật bởi một phiên làm việc khác'
      )
    )
  })

  it('handles generic error on respond failure', async () => {
    vi.mocked(api.getReceivedRentalApplications).mockResolvedValue(mockResponse)
    const error = new Error('Network failure')
    vi.mocked(api.respondToRentalApplication).mockRejectedValue(error)
    vi.mocked(api.isApplicationRevisionStaleError).mockReturnValue(false)

    const { result } = renderHook(() => useLandlordApplications(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    await act(async () => {
      try {
        await result.current.respond({
          id: 'app-1',
          status: 'rejected',
          reasonCode: 'OTHER',
        })
      } catch {
        // Expected to throw
      }
    })

    expect(toast.error).toHaveBeenCalledWith('Network failure')
  })
})
