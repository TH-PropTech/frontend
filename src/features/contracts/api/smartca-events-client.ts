import { env } from '@/shared/config/env'

export type SmartCaConnectionState =
  | 'idle'
  | 'connecting'
  | 'connected'
  | 'disconnected'
  | 'exhausted'

export type SmartCaSessionUpdatedEvent = Readonly<{
  contractId: string
  sessionId: string
  status: 'signed' | 'rejected' | 'expired' | 'cancelled'
}>

export interface SmartCaEventsClientOptions {
  apiUrl?: string
  getAccessToken?: () => string | null
  onSessionUpdated?: (event: SmartCaSessionUpdatedEvent) => void
  onConnectionStateChange?: (state: SmartCaConnectionState) => void
  onReconnected?: () => void
}

export interface SmartCaEventsClient {
  subscribe(contractId: string, sessionId: string): void
  unsubscribe(contractId: string, sessionId: string): void
  dispose(): void
}

const RECONNECT_DELAYS_MS = [1_000, 2_000, 5_000, 10_000, 10_000] as const
const TERMINAL_STATUSES = new Set([
  'signed',
  'rejected',
  'expired',
  'cancelled',
])

function defaultAccessToken(): string | null {
  return typeof window === 'undefined'
    ? null
    : window.localStorage.getItem('accessToken')
}

function createWebSocketUrl(apiUrl: string): string {
  const url = new URL(apiUrl)
  url.protocol = url.protocol === 'https:' ? 'wss:' : 'ws:'
  url.pathname = '/ws/contracts/smartca'
  url.search = ''
  url.hash = ''
  return url.toString().replace(/\/$/, '')
}

function isSessionUpdatedEvent(
  value: unknown
): value is SmartCaSessionUpdatedEvent {
  if (!value || typeof value !== 'object') return false
  const data = value as Record<string, unknown>
  return (
    typeof data.contractId === 'string' &&
    typeof data.sessionId === 'string' &&
    typeof data.status === 'string' &&
    TERMINAL_STATUSES.has(data.status)
  )
}

class BrowserSmartCaEventsClient implements SmartCaEventsClient {
  private readonly subscriptions = new Map<string, string>()
  private readonly getAccessToken: () => string | null
  private socket: WebSocket | undefined
  private reconnectTimer: ReturnType<typeof setTimeout> | undefined
  private reconnectAttempt = 0
  private disposed = false

  constructor(private readonly options: SmartCaEventsClientOptions) {
    this.getAccessToken = options.getAccessToken ?? defaultAccessToken
  }

  subscribe(contractId: string, sessionId: string): void {
    this.subscriptions.set(sessionId, contractId)
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.sendSubscription('subscribe', contractId, sessionId)
      return
    }
    this.connect()
  }

  unsubscribe(contractId: string, sessionId: string): void {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.sendSubscription('unsubscribe', contractId, sessionId)
    }
    this.subscriptions.delete(sessionId)
    if (this.subscriptions.size === 0) this.disconnectIdleSocket()
  }

  dispose(): void {
    this.disposed = true
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer)
    this.reconnectTimer = undefined
    this.subscriptions.clear()
    this.socket?.close()
    this.socket = undefined
    this.updateState('idle')
  }

  private connect(): void {
    if (
      this.disposed ||
      this.subscriptions.size === 0 ||
      (this.socket !== undefined &&
        (this.socket.readyState === WebSocket.OPEN ||
          this.socket.readyState === WebSocket.CONNECTING))
    ) {
      return
    }

    this.updateState('connecting')
    const socket = new WebSocket(
      createWebSocketUrl(this.options.apiUrl ?? env.apiUrl)
    )
    this.socket = socket
    socket.onopen = () => this.handleOpen(socket)
    socket.onmessage = event => this.handleMessage(event.data)
    socket.onerror = () => this.updateState('disconnected')
    socket.onclose = () => this.handleClose(socket)
  }

  private handleOpen(socket: WebSocket): void {
    if (socket !== this.socket || this.disposed) return
    const token = this.getAccessToken()
    if (!token) {
      this.updateState('exhausted')
      socket.close()
      return
    }

    const reconnected = this.reconnectAttempt > 0
    socket.send(JSON.stringify({ event: 'auth', data: { token } }))
    for (const [sessionId, contractId] of this.subscriptions) {
      this.sendSubscription('subscribe', contractId, sessionId)
    }
    this.reconnectAttempt = 0
    this.updateState('connected')
    if (reconnected) this.options.onReconnected?.()
  }

  private handleClose(socket: WebSocket): void {
    if (socket !== this.socket) return
    this.socket = undefined
    if (this.disposed || this.subscriptions.size === 0) return
    this.updateState('disconnected')
    this.scheduleReconnect()
  }

  private scheduleReconnect(): void {
    if (this.reconnectAttempt >= RECONNECT_DELAYS_MS.length) {
      this.updateState('exhausted')
      return
    }
    const delay = RECONNECT_DELAYS_MS[this.reconnectAttempt]
    this.reconnectAttempt += 1
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = undefined
      this.connect()
    }, delay)
  }

  private handleMessage(raw: unknown): void {
    if (typeof raw !== 'string') return
    try {
      const message = JSON.parse(raw) as unknown
      if (!message || typeof message !== 'object') return
      const envelope = message as Record<string, unknown>
      if (
        envelope.event === 'smartca.session.updated' &&
        isSessionUpdatedEvent(envelope.data)
      ) {
        this.options.onSessionUpdated?.(envelope.data)
      }
    } catch {
      console.warn('Ignored an invalid SmartCA realtime message')
    }
  }

  private sendSubscription(
    event: 'subscribe' | 'unsubscribe',
    contractId: string,
    sessionId: string
  ): void {
    this.socket?.send(
      JSON.stringify({ event, data: { contractId, sessionId } })
    )
  }

  private disconnectIdleSocket(): void {
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer)
    this.reconnectTimer = undefined
    this.reconnectAttempt = 0
    this.socket?.close()
    this.socket = undefined
    this.updateState('idle')
  }

  private updateState(state: SmartCaConnectionState): void {
    this.options.onConnectionStateChange?.(state)
  }
}

export function createSmartCaEventsClient(
  options: SmartCaEventsClientOptions = {}
): SmartCaEventsClient {
  return new BrowserSmartCaEventsClient(options)
}
