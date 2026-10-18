import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import type { ReactNode } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useContractPayoutSummary } from './use-contract-payout-summary'

const mocks = vi.hoisted(() => ({ getContractPayoutSummary: vi.fn() }))

vi.mock('../api/payout-api', () => ({
  getContractPayoutSummary: mocks.getContractPayoutSummary,
}))

function createWrapper(): ({ children }: { children: ReactNode }) => ReactNode {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return function PayoutSummaryTestWrapper({
    children,
  }: {
    children: ReactNode
  }): ReactNode {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
  }
}

describe('useContractPayoutSummary', () => {
  beforeEach(() => vi.clearAllMocks())

  it('starts in a loading state while the API is pending', () => {
    mocks.getContractPayoutSummary.mockReturnValue(new Promise(() => undefined))

    const { result } = renderHook(() => useContractPayoutSummary('c1'), {
      wrapper: createWrapper(),
    })

    expect(result.current.isLoading).toBe(true)
  })

  it('exposes loaded summary data', async () => {
    mocks.getContractPayoutSummary.mockResolvedValue({
      contractId: 'c1',
      wallet: { linked: true },
      items: [],
      totals: { received: 0, pending: 0 },
    })

    const { result } = renderHook(() => useContractPayoutSummary('c1'), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data?.wallet.linked).toBe(true)
    expect(mocks.getContractPayoutSummary).toHaveBeenCalledWith('c1')
  })

  it('exposes errors without retrying', async () => {
    mocks.getContractPayoutSummary.mockRejectedValue(
      new Error('CONTRACT_NOT_FOUND')
    )

    const { result } = renderHook(() => useContractPayoutSummary('c1'), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(mocks.getContractPayoutSummary).toHaveBeenCalledTimes(1)
  })

  it('does not call the API when disabled or without a contractId', () => {
    renderHook(() => useContractPayoutSummary(null), {
      wrapper: createWrapper(),
    })
    renderHook(() => useContractPayoutSummary('c1', false), {
      wrapper: createWrapper(),
    })

    expect(mocks.getContractPayoutSummary).not.toHaveBeenCalled()
  })
})
