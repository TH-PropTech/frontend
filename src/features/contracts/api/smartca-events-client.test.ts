import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createSmartCaEventsClient } from './smartca-events-client'

class FakeWebSocket {
  static readonly instances: FakeWebSocket[] = []
  static readonly OPEN = 1

  readonly send = vi.fn()
  readonly close = vi.fn(() => {
    this.readyState = 3
  })
  readyState = 0
  onopen: (() => void) | null = null
  onclose: (() => void) | null = null
  onerror: (() => void) | null = null
  onmessage: ((event: MessageEvent<string>) => void) | null = null

  constructor(readonly url: string) {
    FakeWebSocket.instances.push(this)
  }

  open(): void {
    this.readyState = FakeWebSocket.OPEN
    this.onopen?.()
  }

  disconnect(): void {
    this.readyState = 3
    this.onclose?.()
  }

  receive(data: unknown): void {
    this.onmessage?.({ data: JSON.stringify(data) } as MessageEvent<string>)
  }
}

describe('SmartCA events client', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    FakeWebSocket.instances.length = 0
    vi.stubGlobal('WebSocket', FakeWebSocket)
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it('authenticates by message and subscribes without putting the token in the URL', () => {
    const client = createSmartCaEventsClient({
      apiUrl: 'https://api.example.com/api/v1',
      getAccessToken: () => 'secret-access-token',
    })

    client.subscribe('contract-1', 'session-1')
    const socket = FakeWebSocket.instances[0]
    expect(socket?.url).toBe('wss://api.example.com/ws/contracts/smartca')
    expect(socket?.url).not.toContain('secret-access-token')

    socket?.open()
    expect(socket?.send).toHaveBeenNthCalledWith(
      1,
      JSON.stringify({
        event: 'auth',
        data: { token: 'secret-access-token' },
      })
    )
    expect(socket?.send).toHaveBeenNthCalledWith(
      2,
      JSON.stringify({
        event: 'subscribe',
        data: { contractId: 'contract-1', sessionId: 'session-1' },
      })
    )

    client.unsubscribe('contract-1', 'session-1')
    expect(socket?.send).toHaveBeenLastCalledWith(
      JSON.stringify({
        event: 'unsubscribe',
        data: { contractId: 'contract-1', sessionId: 'session-1' },
      })
    )
  })

  it('validates messages and forwards only SmartCA session updates', () => {
    const onSessionUpdated = vi.fn()
    const client = createSmartCaEventsClient({
      apiUrl: 'http://localhost:3001/api/v1',
      getAccessToken: () => 'token',
      onSessionUpdated,
    })
    client.subscribe('contract-1', 'session-1')
    const socket = FakeWebSocket.instances[0]
    socket?.open()

    socket?.receive({ event: 'unknown', data: { sessionId: 'session-1' } })
    socket?.receive({
      event: 'smartca.session.updated',
      data: { contractId: 1, sessionId: 'session-1', status: 'signed' },
    })
    socket?.receive({
      event: 'smartca.session.updated',
      data: {
        contractId: 'contract-1',
        sessionId: 'session-1',
        status: 'signed',
      },
    })

    expect(onSessionUpdated).toHaveBeenCalledTimes(1)
    expect(onSessionUpdated).toHaveBeenCalledWith({
      contractId: 'contract-1',
      sessionId: 'session-1',
      status: 'signed',
    })
  })

  it('reconnects with bounded backoff and reports exhaustion after five attempts', async () => {
    const onConnectionStateChange = vi.fn()
    const client = createSmartCaEventsClient({
      apiUrl: 'http://localhost:3001/api/v1',
      getAccessToken: () => 'token',
      onConnectionStateChange,
    })
    client.subscribe('contract-1', 'session-1')
    FakeWebSocket.instances[0]?.disconnect()

    for (const delay of [1_000, 2_000, 5_000, 10_000, 10_000]) {
      await vi.advanceTimersByTimeAsync(delay)
      FakeWebSocket.instances.at(-1)?.disconnect()
    }

    expect(FakeWebSocket.instances).toHaveLength(6)
    expect(onConnectionStateChange).toHaveBeenLastCalledWith('exhausted')
  })

  it('notifies after a successful reconnect and disposes all resources', async () => {
    const onReconnected = vi.fn()
    const client = createSmartCaEventsClient({
      apiUrl: 'http://localhost:3001/api/v1',
      getAccessToken: () => 'token',
      onReconnected,
    })
    client.subscribe('contract-1', 'session-1')
    FakeWebSocket.instances[0]?.disconnect()
    await vi.advanceTimersByTimeAsync(1_000)
    const reconnected = FakeWebSocket.instances[1]
    reconnected?.open()

    expect(onReconnected).toHaveBeenCalledTimes(1)
    client.dispose()
    expect(reconnected?.close).toHaveBeenCalledTimes(1)

    reconnected?.disconnect()
    await vi.advanceTimersByTimeAsync(20_000)
    expect(FakeWebSocket.instances).toHaveLength(2)
  })
})
