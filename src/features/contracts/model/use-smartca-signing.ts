import { useCallback, useEffect, useRef, useState } from 'react'
import {
  cancelSmartCaSigningSession,
  createSmartCaSigningSession,
  getSmartCaCertificates,
  pollSmartCaSigningSession,
  type SmartCaCertificate,
  type SmartCaSigningSession,
} from '../api/contracts-api'

/** Sau các trạng thái này, lần thử kế tiếp phải là giao dịch mới. */
const RETRYABLE_TERMINAL_STATUSES: ReadonlySet<
  SmartCaSigningSession['status']
> = new Set(['rejected', 'expired', 'cancelled'])
const TERMINAL_STATUSES: ReadonlySet<SmartCaSigningSession['status']> = new Set(
  ['signed', 'rejected', 'expired', 'cancelled']
)

const POLL_INTERVAL_MS = 3000

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
  session: SmartCaSigningSession | null
  loadingCertificates: boolean
  submitting: boolean
  cancelling: boolean
  error: string | null
  remainingMs: number | null
  loadCertificates: () => Promise<void>
  submit: () => Promise<void>
  cancel: () => Promise<void>
}

/**
 * Luồng ký VNPT SmartCA v1: tạo phiên `pending`, tự poll mỗi 3s cho tới khi
 * phiên kết thúc (signed/rejected/expired/cancelled), hết hạn hoặc unmount.
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
  const [loadingCertificates, setLoadingCertificates] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [cancelling, setCancelling] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [idempotencyKey, setIdempotencyKey] = useState(createIdempotencyKey)
  const [now, setNow] = useState(() => Date.now())
  const onSignedRef = useRef(onSigned)
  useEffect(() => {
    onSignedRef.current = onSigned
  }, [onSigned])

  const applySession = useCallback((next: SmartCaSigningSession): void => {
    setSession(next)
    if (next.status === 'signed') onSignedRef.current?.()
    if (RETRYABLE_TERMINAL_STATUSES.has(next.status)) {
      setIdempotencyKey(createIdempotencyKey())
    }
  }, [])

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
    if (new Date(session.expiresAt).getTime() <= Date.now()) return

    let cancelled = false
    const interval = setInterval(() => {
      void pollSmartCaSigningSession(contractId, session.id)
        .then(next => {
          if (!cancelled) applySession(next)
        })
        .catch(() => {
          // Lỗi mạng tạm thời: để lần poll kế tiếp thử lại.
        })
    }, POLL_INTERVAL_MS)

    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [contractId, session, applySession])

  const loadCertificates = useCallback(async (): Promise<void> => {
    setLoadingCertificates(true)
    setError(null)
    try {
      const result = await getSmartCaCertificates(contractId)
      setCertificates(result.certificates)
      setSelectedSerial(
        result.certificates.length === 1
          ? (result.certificates[0]?.serialNumber ?? '')
          : ''
      )
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

  const submit = useCallback(async (): Promise<void> => {
    if (!selectedSerial) return

    setSubmitting(true)
    setError(null)
    try {
      const result = await createSmartCaSigningSession(contractId, {
        idempotencyKey,
        certificateSerial: selectedSerial,
      })
      applySession(result)
    } catch (caught: unknown) {
      setError(
        caught instanceof Error
          ? caught.message
          : 'Không thể gửi giao dịch đến VNPT SmartCA.'
      )
    } finally {
      setSubmitting(false)
    }
  }, [contractId, idempotencyKey, selectedSerial, applySession])

  const cancel = useCallback(async (): Promise<void> => {
    if (!session) return
    setCancelling(true)
    setError(null)
    try {
      applySession(await cancelSmartCaSigningSession(contractId, session.id))
    } catch (caught: unknown) {
      setError(
        caught instanceof Error
          ? caught.message
          : 'Không thể hủy phiên ký VNPT SmartCA.'
      )
    } finally {
      setCancelling(false)
    }
  }, [contractId, session, applySession])

  return {
    certificates,
    selectedSerial,
    setSelectedSerial,
    session,
    loadingCertificates,
    submitting,
    cancelling,
    error,
    remainingMs,
    loadCertificates,
    submit,
    cancel,
  }
}
