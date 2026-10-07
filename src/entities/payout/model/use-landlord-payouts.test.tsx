import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import type { ReactNode } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useLandlordPayouts } from './use-landlord-payouts'

const mocks = vi.hoisted(() => ({ getMyPayouts: vi.fn() }))

vi.mock('../api/payout-api', () => ({ getMyPayouts: mocks.getMyPayouts }))

function createWrapper(): ({ children }: { children: ReactNode }) => ReactNode {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return function PayoutTestWrapper({
    children,
  }: {
    children: ReactNode
  }): ReactNode {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
  }
}

describe('useLandlordPayouts', () => {
  beforeEach(() => vi.clearAllMocks())

  it('starts in a loading state while the API is pending', () => {
    mocks.getMyPayouts.mockReturnValue(new Promise(() => undefined))

    const { result } = renderHook(() => useLandlordPayouts(), {
      wrapper: createWrapper(),
    })

    expect(result.current.isLoading).toBe(true)
  })

  it('exposes loaded payout data', async () => {
    mocks.getMyPayouts.mockResolvedValue({
      items: [{ _id: 'payout-1', status: 'pending' }],
      total: 1,
      page: 1,
      limit: 20,
    })

    const { result } = renderHook(() => useLandlordPayouts(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data?.items).toHaveLength(1)
  })

  it('exposes errors without retrying', async () => {
    mocks.getMyPayouts.mockRejectedValue(new Error('PAYOUTS_UNAVAILABLE'))

    const { result } = renderHook(() => useLandlordPayouts(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(mocks.getMyPayouts).toHaveBeenCalledTimes(1)
  })

  it('exposes an empty payout page', async () => {
    mocks.getMyPayouts.mockResolvedValue({
      items: [],
      total: 0,
      page: 1,
      limit: 20,
    })

    const { result } = renderHook(() => useLandlordPayouts(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data?.items).toEqual([])
  })
})
