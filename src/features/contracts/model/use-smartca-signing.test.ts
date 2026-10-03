import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useSmartCaSigning } from './use-smartca-signing'

const {
  cancelSmartCaSigningSession,
  createSmartCaSigningSession,
  getSmartCaCertificates,
  pollSmartCaSigningSession,
} = vi.hoisted(() => ({
  cancelSmartCaSigningSession: vi.fn(),
  createSmartCaSigningSession: vi.fn(),
  getSmartCaCertificates: vi.fn(),
  pollSmartCaSigningSession: vi.fn(),
}))

vi.mock('../api/contracts-api', () => ({
  cancelSmartCaSigningSession,
  createSmartCaSigningSession,
  getSmartCaCertificates,
  pollSmartCaSigningSession,
}))

const certificate = {
  serialNumber: 'SERIAL-001',
  subject: 'CN=Test Tenant',
  issuer: 'CN=VNPT Test CA',
  validFrom: '2026-01-01T00:00:00.000Z',
  validTo: '2099-01-01T00:00:00.000Z',
}

function pendingSession(overrides: Record<string, unknown> = {}) {
  return {
    id: 'session-1',
    contractId: 'contract-1',
    signerId: 'tenant-1',
    signerRole: 'tenant' as const,
    artifactHash: 'a'.repeat(64),
    providerTransactionId: 'provider-tx-1',
    status: 'pending' as const,
    documentId: 'contract-contract-1-r1',
    expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    ...overrides,
  }
}

describe('useSmartCaSigning', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
    getSmartCaCertificates.mockResolvedValue({ certificates: [certificate] })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('stops polling once the session is signed and calls onSigned once', async () => {
    createSmartCaSigningSession.mockResolvedValue(pendingSession())
    pollSmartCaSigningSession.mockResolvedValue(
      pendingSession({ status: 'signed' })
    )
    const onSigned = vi.fn()
    const { result } = renderHook(() =>
      useSmartCaSigning('contract-1', onSigned)
    )

    await act(() => result.current.loadCertificates())
    await act(() => result.current.submit())
    expect(result.current.session?.status).toBe('pending')

    await act(() => vi.advanceTimersByTimeAsync(3000))
    expect(result.current.session?.status).toBe('signed')
    expect(onSigned).toHaveBeenCalledTimes(1)

    pollSmartCaSigningSession.mockClear()
    await act(() => vi.advanceTimersByTimeAsync(9000))
    expect(pollSmartCaSigningSession).not.toHaveBeenCalled()
  })

  it('stops polling on unmount', async () => {
    createSmartCaSigningSession.mockResolvedValue(pendingSession())
    pollSmartCaSigningSession.mockResolvedValue(pendingSession())
    const { result, unmount } = renderHook(() =>
      useSmartCaSigning('contract-1')
    )

    await act(() => result.current.loadCertificates())
    await act(() => result.current.submit())
    unmount()

    pollSmartCaSigningSession.mockClear()
    await act(() => vi.advanceTimersByTimeAsync(9000))
    expect(pollSmartCaSigningSession).not.toHaveBeenCalled()
  })

  it('stops polling once expiresAt has passed', async () => {
    createSmartCaSigningSession.mockResolvedValue(
      pendingSession({ expiresAt: new Date(Date.now() - 1000).toISOString() })
    )
    const { result } = renderHook(() => useSmartCaSigning('contract-1'))

    await act(() => result.current.loadCertificates())
    await act(() => result.current.submit())

    pollSmartCaSigningSession.mockClear()
    await act(() => vi.advanceTimersByTimeAsync(9000))
    expect(pollSmartCaSigningSession).not.toHaveBeenCalled()
  })

  it('calls onSigned exactly once even if multiple poll ticks resolve signed', async () => {
    createSmartCaSigningSession.mockResolvedValue(pendingSession())
    pollSmartCaSigningSession.mockResolvedValue(
      pendingSession({ status: 'signed' })
    )
    const onSigned = vi.fn()
    const { result } = renderHook(() =>
      useSmartCaSigning('contract-1', onSigned)
    )

    await act(() => result.current.loadCertificates())
    await act(() => result.current.submit())
    await act(() => vi.advanceTimersByTimeAsync(3000))
    await act(() => vi.advanceTimersByTimeAsync(9000))

    expect(onSigned).toHaveBeenCalledTimes(1)
  })

  it('uses a new idempotency key after a terminal retryable status, keeps it while pending', async () => {
    createSmartCaSigningSession
      .mockResolvedValueOnce(pendingSession({ id: 'session-1' }))
      .mockResolvedValueOnce(pendingSession({ id: 'session-2' }))
    pollSmartCaSigningSession.mockResolvedValue(
      pendingSession({ id: 'session-1', status: 'expired' })
    )
    const { result } = renderHook(() => useSmartCaSigning('contract-1'))

    await act(() => result.current.loadCertificates())
    await act(() => result.current.submit())
    await act(() => vi.advanceTimersByTimeAsync(3000))
    expect(result.current.session?.status).toBe('expired')

    await act(() => result.current.submit())
    expect(createSmartCaSigningSession).toHaveBeenCalledTimes(2)
    const keys = createSmartCaSigningSession.mock.calls.map(
      call => (call[1] as { idempotencyKey: string }).idempotencyKey
    )
    expect(keys[0]).not.toBe(keys[1])
  })

  it('cancels a pending session', async () => {
    createSmartCaSigningSession.mockResolvedValue(pendingSession())
    cancelSmartCaSigningSession.mockResolvedValue(
      pendingSession({ status: 'cancelled' })
    )
    const { result } = renderHook(() => useSmartCaSigning('contract-1'))

    await act(() => result.current.loadCertificates())
    await act(() => result.current.submit())
    await act(() => result.current.cancel())

    expect(result.current.session?.status).toBe('cancelled')
    expect(cancelSmartCaSigningSession).toHaveBeenCalledWith(
      'contract-1',
      'session-1'
    )
  })
})
