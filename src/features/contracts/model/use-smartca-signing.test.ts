import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { SmartCaEventsClientOptions } from '../api/smartca-events-client'
import { useSmartCaSigning } from './use-smartca-signing'

const {
  cancelSmartCaSigningSession,
  createSmartCaEventsClient,
  createSmartCaSigningSession,
  getSmartCaCertificates,
  getSmartCaSigningSession,
  pollSmartCaSigningSession,
  realtimeClient,
} = vi.hoisted(() => ({
  cancelSmartCaSigningSession: vi.fn(),
  createSmartCaEventsClient: vi.fn(),
  createSmartCaSigningSession: vi.fn(),
  getSmartCaCertificates: vi.fn(),
  getSmartCaSigningSession: vi.fn(),
  pollSmartCaSigningSession: vi.fn(),
  realtimeClient: {
    subscribe: vi.fn(),
    unsubscribe: vi.fn(),
    dispose: vi.fn(),
  },
}))

let realtimeOptions: SmartCaEventsClientOptions | undefined

vi.mock('../api/contracts-api', () => ({
  cancelSmartCaSigningSession,
  createSmartCaSigningSession,
  getSmartCaCertificates,
  getSmartCaSigningSession,
  pollSmartCaSigningSession,
}))

vi.mock('../api/smartca-events-client', () => ({
  createSmartCaEventsClient: (options: SmartCaEventsClientOptions) => {
    realtimeOptions = options
    createSmartCaEventsClient(options)
    return realtimeClient
  },
}))

const certificate = { serialNumber: 'SERIAL-001' }

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

async function createPendingSession(
  onSigned?: () => void,
  overrides: Record<string, unknown> = {}
) {
  createSmartCaSigningSession.mockResolvedValue(pendingSession(overrides))
  const hook = renderHook(() => useSmartCaSigning('contract-1', onSigned))
  await act(() => hook.result.current.loadCertificates())
  await act(() => hook.result.current.submit())
  return hook
}

describe('useSmartCaSigning', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
    realtimeOptions = undefined
    getSmartCaCertificates.mockResolvedValue({ certificates: [certificate] })
    pollSmartCaSigningSession.mockResolvedValue(pendingSession())
    getSmartCaSigningSession.mockResolvedValue(pendingSession())
    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      value: 'visible',
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('subscribes while pending and reloads the session once after a realtime event', async () => {
    const onSigned = vi.fn()
    getSmartCaSigningSession.mockResolvedValue(
      pendingSession({ status: 'signed' })
    )
    const { result } = await createPendingSession(onSigned)

    expect(realtimeClient.subscribe).toHaveBeenCalledWith(
      'contract-1',
      'session-1'
    )
    await act(async () => {
      realtimeOptions?.onSessionUpdated?.({
        contractId: 'contract-1',
        sessionId: 'session-1',
        status: 'signed',
      })
      await Promise.resolve()
    })

    expect(getSmartCaSigningSession).toHaveBeenCalledTimes(1)
    expect(result.current.session?.status).toBe('signed')
    expect(onSigned).toHaveBeenCalledTimes(1)
    expect(realtimeClient.dispose).toHaveBeenCalledTimes(1)
  })

  it('checks provider status once after reconnect', async () => {
    await createPendingSession()

    await act(async () => {
      realtimeOptions?.onReconnected?.()
      await Promise.resolve()
    })

    expect(pollSmartCaSigningSession).toHaveBeenCalledTimes(1)
  })

  it('checks once when visible and enforces a five-second cooldown', async () => {
    await createPendingSession()
    await act(async () => {
      Object.defineProperty(document, 'visibilityState', { value: 'hidden' })
      document.dispatchEvent(new Event('visibilitychange'))
      Object.defineProperty(document, 'visibilityState', { value: 'visible' })
      document.dispatchEvent(new Event('visibilitychange'))
      document.dispatchEvent(new Event('visibilitychange'))
      await Promise.resolve()
    })

    expect(pollSmartCaSigningSession).toHaveBeenCalledTimes(1)

    await act(() => vi.advanceTimersByTimeAsync(5_000))
    await act(async () => {
      document.dispatchEvent(new Event('visibilitychange'))
      await Promise.resolve()
    })
    expect(pollSmartCaSigningSession).toHaveBeenCalledTimes(2)
  })

  it('checks once when the local countdown reaches expiresAt', async () => {
    await createPendingSession(undefined, {
      expiresAt: new Date(Date.now() + 1_000).toISOString(),
    })

    await act(() => vi.advanceTimersByTimeAsync(1_000))

    expect(pollSmartCaSigningSession).toHaveBeenCalledTimes(1)
  })

  it('does not make periodic network requests while time passes', async () => {
    await createPendingSession()

    await act(() => vi.advanceTimersByTimeAsync(30_000))

    expect(pollSmartCaSigningSession).not.toHaveBeenCalled()
    expect(getSmartCaSigningSession).not.toHaveBeenCalled()
  })

  it('supports a manual status check and cleans up on unmount', async () => {
    const { result, unmount } = await createPendingSession()

    await act(() => result.current.checkStatus())
    expect(pollSmartCaSigningSession).toHaveBeenCalledTimes(1)

    unmount()
    expect(realtimeClient.unsubscribe).toHaveBeenCalledWith(
      'contract-1',
      'session-1'
    )
    expect(realtimeClient.dispose).toHaveBeenCalled()
  })
})
