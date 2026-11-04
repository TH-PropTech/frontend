import { useCallback, useEffect, useRef, useState } from 'react'
import {
  cancelSmartCaSigningSession,
  createSmartCaSigningSession,
  getSmartCaCertificates,
  getSmartCaSigningSession,
  pollSmartCaSigningSession,
  type SmartCaCertificate,
  type SmartCaSigningSession,
} from '../api/contracts-api'
import {
  createSmartCaEventsClient,
  type SmartCaConnectionState,
} from '../api/smartca-events-client'
import {
  certificateChoiceProblem,
  defaultCertificateSerial,
} from '../lib/smartca-certificate-label'

const RECONCILIATION_COOLDOWN_MS = 5_000
const RETRYABLE_TERMINAL_STATUSES: ReadonlySet<
  SmartCaSigningSession['status']
> = new Set(['rejected', 'expired', 'cancelled'])
const TERMINAL_STATUSES: ReadonlySet<SmartCaSigningSession['status']> = new Set(
  ['signed', 'rejected', 'expired', 'cancelled']
)

function createIdempotencyKey(): string {
  if (typeof globalThis.crypto?.randomUUID === 'function') {
    return globalThis.crypto.randomUUID()
  }
  const random = new Uint32Array(4)
  globalThis.crypto.getRandomValues(random)
  return `smartca-${Array.from(random, value => value.toString(16)).join('-')}`
}

export type UseSmartCaSigningResult = {
  certificates: SmartCaCertificate[] | null
  selectedSerial: string
  setSelectedSerial: (serial: string) => void
  /** Set when an ordinary certificate is chosen although an integrated one exists. */
  certificateProblem: string | null
  session: SmartCaSigningSession | null
  connectionState: SmartCaConnectionState
  loadingCertificates: boolean
  submitting: boolean
  cancelling: boolean
  checking: boolean
  error: string | null
  remainingMs: number | null
  loadCertificates: () => Promise<void>
  submit: () => Promise<void>
  cancel: () => Promise<void>
  checkStatus: () => Promise<void>
}

/**
 * Luồng ký SmartCA theo sự kiện: realtime trên web, visible/reconnect/expiry và
 * nút kiểm tra thủ công chỉ đối soát một lần; không có network polling timer.
 */
export function useSmartCaSigning(
  contractId: string,
  onSigned?: () => void
): UseSmartCaSigningResult {
  const [certificates, setCertificates] = useState<SmartCaCertificate[] | null>(
    null
  )
  const [selectedSerial, setSelectedSerial] = useState('')
  const [session, setSession] = useState<SmartCaSigningSession | null>(null)
  const [connectionState, setConnectionState] =
    useState<SmartCaConnectionState>('idle')
  const [loadingCertificates, setLoadingCertificates] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [cancelling, setCancelling] = useState(false)
  const [checking, setChecking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [idempotencyKey, setIdempotencyKey] = useState(createIdempotencyKey)
  const [now, setNow] = useState(() => Date.now())
  const sessionRef = useRef<SmartCaSigningSession | null>(null)
  const onSignedRef = useRef(onSigned)
  const inFlightRef = useRef<Promise<void> | null>(null)
  const lastCheckAtRef = useRef(Number.NEGATIVE_INFINITY)
  const expiryCheckedSessionRef = useRef<string | null>(null)
  const signedNotifiedRef = useRef(new Set<string>())

  useEffect(() => {
    onSignedRef.current = onSigned
  }, [onSigned])

  const applySession = useCallback((next: SmartCaSigningSession): void => {
    sessionRef.current = next
    setSession(next)
    if (next.status === 'signed' && !signedNotifiedRef.current.has(next.id)) {
      signedNotifiedRef.current.add(next.id)
      onSignedRef.current?.()
    }
    if (RETRYABLE_TERMINAL_STATUSES.has(next.status)) {
      setIdempotencyKey(createIdempotencyKey())
    }
  }, [])

  const runSessionRequest = useCallback(
    (request: () => Promise<SmartCaSigningSession>): Promise<void> => {
      if (inFlightRef.current) return inFlightRef.current
      setChecking(true)
      setError(null)
      const task = request()
        .then(applySession)
        .catch((caught: unknown) => {
          setError(
            caught instanceof Error
              ? caught.message
              : 'Không thể kiểm tra kết quả ký VNPT SmartCA.'
          )
        })
        .finally(() => {
          setChecking(false)
          inFlightRef.current = null
        })
      inFlightRef.current = task
      return task
    },
    [applySession]
  )

  const checkStatus = useCallback((): Promise<void> => {
    const current = sessionRef.current
    if (!current || TERMINAL_STATUSES.has(current.status)) {
      return Promise.resolve()
    }
    lastCheckAtRef.current = Date.now()
    return runSessionRequest(() =>
      pollSmartCaSigningSession(contractId, current.id)
    )
  }, [contractId, runSessionRequest])

  const refreshSession = useCallback((): Promise<void> => {
    const current = sessionRef.current
    if (!current || TERMINAL_STATUSES.has(current.status)) {
      return Promise.resolve()
    }
    return runSessionRequest(() =>
      getSmartCaSigningSession(contractId, current.id)
    )
  }, [contractId, runSessionRequest])

  const isActive = session !== null && !TERMINAL_STATUSES.has(session.status)
  const remainingMs =
    isActive && session
      ? Math.max(0, new Date(session.expiresAt).getTime() - now)
      : null

  useEffect(() => {
    if (!isActive) return
    const timer = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(timer)
  }, [isActive])

  useEffect(() => {
    if (!session || TERMINAL_STATUSES.has(session.status)) return
    const client = createSmartCaEventsClient({
      onConnectionStateChange: setConnectionState,
      onReconnected: () => void checkStatus(),
      onSessionUpdated: event => {
        if (event.contractId === contractId && event.sessionId === session.id) {
          void refreshSession()
        }
      },
    })
    client.subscribe(contractId, session.id)
    return () => {
      client.unsubscribe(contractId, session.id)
      client.dispose()
    }
  }, [checkStatus, contractId, refreshSession, session])

  useEffect(() => {
    if (!isActive) return
    const handleVisibilityChange = (): void => {
      if (document.visibilityState !== 'visible') return
      if (Date.now() - lastCheckAtRef.current < RECONCILIATION_COOLDOWN_MS) {
        return
      }
      void checkStatus()
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () =>
      document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [checkStatus, isActive])

  useEffect(() => {
    if (!session || !isActive || remainingMs !== 0) return
    if (expiryCheckedSessionRef.current === session.id) return
    expiryCheckedSessionRef.current = session.id
    void checkStatus()
  }, [checkStatus, isActive, remainingMs, session])

  const loadCertificates = useCallback(async (): Promise<void> => {
    setLoadingCertificates(true)
    setError(null)
    try {
      const result = await getSmartCaCertificates(contractId)
      setCertificates(result.certificates)
      setSelectedSerial(defaultCertificateSerial(result.certificates))
      if (result.certificates.length === 0) {
        setError('Không có chứng thư SmartCA hợp lệ.')
      }
    } catch (caught: unknown) {
      setCertificates(null)
      setSelectedSerial('')
      setError(
        caught instanceof Error
          ? caught.message
          : 'Không thể tải chứng thư VNPT SmartCA.'
      )
    } finally {
      setLoadingCertificates(false)
    }
  }, [contractId])

  const certificateProblem = certificateChoiceProblem(
    certificates,
    selectedSerial
  )

  const submit = useCallback(async (): Promise<void> => {
    if (!selectedSerial || certificateProblem) return
    setSubmitting(true)
    setError(null)
    try {
      applySession(
        await createSmartCaSigningSession(contractId, {
          idempotencyKey,
          certificateSerial: selectedSerial,
        })
      )
    } catch (caught: unknown) {
      setError(
        caught instanceof Error
          ? caught.message
          : 'Không thể gửi giao dịch đến VNPT SmartCA.'
      )
    } finally {
      setSubmitting(false)
    }
  }, [
    applySession,
    certificateProblem,
    contractId,
    idempotencyKey,
    selectedSerial,
  ])

  const cancel = useCallback(async (): Promise<void> => {
    const current = sessionRef.current
    if (!current) return
    setCancelling(true)
    setError(null)
    try {
      applySession(await cancelSmartCaSigningSession(contractId, current.id))
    } catch (caught: unknown) {
      setError(
        caught instanceof Error
          ? caught.message
          : 'Không thể hủy phiên ký VNPT SmartCA.'
      )
    } finally {
      setCancelling(false)
    }
  }, [applySession, contractId])

  return {
    certificates,
    selectedSerial,
    setSelectedSerial,
    certificateProblem,
    session,
    connectionState,
    loadingCertificates,
    submitting,
    cancelling,
    checking,
    error,
    remainingMs,
    loadCertificates,
    submit,
    cancel,
    checkStatus,
  }
}
