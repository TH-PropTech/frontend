'use client'

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  useSyncExternalStore,
} from 'react'
import {
  getContractView,
  getContractAuditEvents,
  downloadContractArtifact,
  verifyContractIntegrity,
  isDepositPaid,
  type ContractViewDto,
  type ContractAuditEventDto,
  type ContractIntegrityResult,
} from '@/features/contracts'
import {
  readPaymentReturnParam,
  stripPaymentReturnParam,
  type PaymentReturnStatus,
} from '@/features/payments'

/** Notice shown after a gateway return; paid state comes only from the server view. */
export function paymentReturnNotice(
  hint: PaymentReturnStatus,
  depositStatus: string | null | undefined
): string {
  if (isDepositPaid(depositStatus)) {
    return 'Thanh toán đã được hệ thống xác nhận.'
  }
  return hint === 'succeeded'
    ? 'Đã quay lại từ cổng thanh toán. Hệ thống đang chờ cổng xác nhận giao dịch; trạng thái sẽ tự cập nhật.'
    : 'Thanh toán chưa hoàn tất hoặc đã bị hủy. Bạn có thể thử lại.'
}

export interface UseContractWorkspaceOptions {
  contractId: string
  currentUserId?: string | undefined
  enablePolling?: boolean | undefined
}

function subscribeToStoredUser(onStoreChange: () => void): () => void {
  window.addEventListener('storage', onStoreChange)
  return () => window.removeEventListener('storage', onStoreChange)
}

function getStoredUser(): string | null {
  return window.localStorage.getItem('user')
}

function getServerUser(): null {
  return null
}

function parseStoredUserId(raw: string | null): string | undefined {
  if (!raw) return undefined
  try {
    const user = JSON.parse(raw) as { _id?: string; id?: string } | null
    return user?._id || user?.id || undefined
  } catch {
    return undefined
  }
}

export function useContractWorkspace({
  contractId,
  currentUserId: currentUserIdProp,
  enablePolling = true,
}: UseContractWorkspaceOptions) {
  // Route pages không truyền currentUserId → lấy user đăng nhập từ localStorage
  const storedUser = useSyncExternalStore(
    subscribeToStoredUser,
    getStoredUser,
    getServerUser
  )
  const storedUserId = useMemo(
    () => parseStoredUserId(storedUser),
    [storedUser]
  )
  const currentUserId = currentUserIdProp ?? storedUserId

  const [data, setData] = useState<ContractViewDto | null>(null)
  const [auditEvents, setAuditEvents] = useState<ContractAuditEventDto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [isSigningModalOpen, setIsSigningModalOpen] = useState(false)
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false)
  const [isDownloadingDocx, setIsDownloadingDocx] = useState(false)
  const [isVerifyingIntegrity, setIsVerifyingIntegrity] = useState(false)
  const [integrityResult, setIntegrityResult] = useState<{
    isValid: boolean | null
    verificationStatus?: 'valid' | 'invalid' | 'not-recorded' | 'unavailable'
    message?: string
  } | null>(null)
  const [explicitNotice, setExplicitNotice] = useState<string | null>(null)
  // Gateway return hint (?payment=): read once, then strip it from the URL.
  // The notice itself is derived from the server view below.
  const [paymentReturn, setPaymentReturn] =
    useState<PaymentReturnStatus | null>(readPaymentReturnParam)
  useEffect(() => {
    if (paymentReturn) stripPaymentReturnParam()
  }, [paymentReturn])
  const setNoticeMessage = useCallback((message: string | null): void => {
    setPaymentReturn(null)
    setExplicitNotice(message)
  }, [])

  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const loadData = useCallback(
    async (isBackground = false) => {
      try {
        if (!isBackground) setIsLoading(true)
        setError(null)

        const [viewRes, auditRes] = await Promise.all([
          getContractView(contractId),
          getContractAuditEvents(contractId).catch(() => []),
        ])

        setData(viewRes)
        setAuditEvents(auditRes)
      } catch (err: unknown) {
        if (!isBackground) {
          const msg =
            err instanceof Error
              ? err.message
              : 'Không thể tải thông tin hợp đồng'
          setError(msg)
        }
      } finally {
        if (!isBackground) setIsLoading(false)
      }
    },
    [contractId]
  )

  // Initial load
  useEffect(() => {
    let active = true
    const init = async () => {
      try {
        const [viewRes, auditRes] = await Promise.all([
          getContractView(contractId),
          // Audit trail là thông tin phụ: lỗi không được chặn cả workspace.
          getContractAuditEvents(contractId).catch(() => []),
        ])
        if (active) {
          setData(viewRes)
          setAuditEvents(auditRes)
          setIsLoading(false)
        }
      } catch (err: unknown) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : 'Không thể tải thông tin hợp đồng'
          )
          setIsLoading(false)
        }
      }
    }

    void init()

    return () => {
      active = false
    }
  }, [contractId])

  const noticeMessage =
    explicitNotice ??
    (paymentReturn && data
      ? paymentReturnNotice(paymentReturn, data.deposit?.status)
      : null)

  /** Làm mới nền: không bật spinner toàn trang, không remount panel. */
  const refresh = useCallback(() => loadData(true), [loadData])

  // Quay lại tab (ví dụ sau khi thanh toán ở cổng khác) thì tải lại view.
  useEffect(() => {
    const handleFocus = (): void => {
      void refresh()
    }
    const handleVisibility = (): void => {
      if (document.visibilityState === 'visible') void refresh()
    }
    window.addEventListener('focus', handleFocus)
    document.addEventListener('visibilitychange', handleVisibility)
    return () => {
      window.removeEventListener('focus', handleFocus)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [refresh])

  // Polling for status transitions and ledger convergence
  const flowActiveStage = data?.flow?.activeStage
  useEffect(() => {
    if (!enablePolling) return

    const status = data?.contract?.status
    const ledgerStatus = data?.ledger?.status
    const shouldPoll =
      status === 'deposit-pending' ||
      status === 'awaiting-signature' ||
      flowActiveStage === 'deposit' ||
      flowActiveStage === 'ledger' ||
      flowActiveStage === 'move-in' ||
      flowActiveStage === 'move-out' ||
      ledgerStatus === 'pending' ||
      ledgerStatus === 'processing' ||
      ledgerStatus === 'failed-retryable'

    if (shouldPoll) {
      pollIntervalRef.current = setInterval(() => {
        loadData(true)
      }, 4000)
    }

    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current)
      }
    }
  }, [
    data?.contract?.status,
    data?.ledger?.status,
    flowActiveStage,
    enablePolling,
    loadData,
  ])

  // Download PDF
  const handleDownloadPdf = async () => {
    try {
      setIsDownloadingPdf(true)
      setNoticeMessage(null)
      const blob = await downloadContractArtifact(contractId, 'pdf')
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `Hop-dong-${data?.contract?.code || contractId}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Không thể tải bản PDF hợp đồng'
      setNoticeMessage(msg)
    } finally {
      setIsDownloadingPdf(false)
    }
  }

  // Download DOCX
  const handleDownloadDocx = async () => {
    try {
      setIsDownloadingDocx(true)
      setNoticeMessage(null)
      const blob = await downloadContractArtifact(contractId, 'docx')
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `Hop-dong-${data?.contract?.code || contractId}.docx`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Không thể tải bản DOCX hợp đồng'
      setNoticeMessage(msg)
    } finally {
      setIsDownloadingDocx(false)
    }
  }

  // Verify integrity with explicit tri-state preservation
  const handleVerifyIntegrity = async () => {
    try {
      setIsVerifyingIntegrity(true)
      const res: ContractIntegrityResult =
        await verifyContractIntegrity(contractId)
      if (res.isValid === true || res.verificationStatus === 'valid') {
        setIntegrityResult({
          isValid: true,
          verificationStatus: 'valid',
          message:
            'Nội dung hợp đồng toàn vẹn: mã xác thực khớp tuyệt đối với bản đã lưu vết.',
        })
      } else if (res.verificationStatus === 'not-recorded') {
        setIntegrityResult({
          isValid: null,
          verificationStatus: 'not-recorded',
          message: 'Chưa lưu vết: hợp đồng chưa có bản ghi xác nhận.',
        })
      } else if (res.verificationStatus === 'unavailable') {
        setIntegrityResult({
          isValid: null,
          verificationStatus: 'unavailable',
          message:
            'Hệ thống lưu vết tạm thời không khả dụng: không thể kết nối để đối soát.',
        })
      } else {
        setIntegrityResult({
          isValid: false,
          verificationStatus: 'invalid',
          message:
            'Cảnh báo: phát hiện sai lệch giữa mã xác thực hiện tại và bản đã lưu vết!',
        })
      }
    } catch {
      setIntegrityResult({
        isValid: null,
        verificationStatus: 'unavailable',
        message: 'Không thể kết nối hệ thống lưu vết để đối soát.',
      })
    } finally {
      setIsVerifyingIntegrity(false)
    }
  }

  // Determine signer name and role based on authenticated currentUserId
  const isTenant = Boolean(
    currentUserId && data?.parties?.tenant?.id === currentUserId
  )
  const isLandlord = Boolean(
    currentUserId && data?.parties?.landlord?.id === currentUserId
  )
  const currentParty = isTenant
    ? data?.parties?.tenant
    : isLandlord
      ? data?.parties?.landlord
      : (data?.parties?.tenant ?? null)
  const signerName =
    currentParty?.name ||
    (isTenant ? 'Bên thuê' : isLandlord ? 'Bên cho thuê' : 'Bên tham gia')
  const signerRole: 'tenant' | 'landlord' = isLandlord ? 'landlord' : 'tenant'

  return {
    currentUserId,
    data,
    auditEvents,
    isLoading,
    error,
    isSigningModalOpen,
    isDownloadingPdf,
    isDownloadingDocx,
    isVerifyingIntegrity,
    integrityResult,
    noticeMessage,
    isTenant,
    signerName,
    signerRole,
    setIsSigningModalOpen,
    setNoticeMessage,
    loadData,
    refresh,
    handleDownloadPdf,
    handleDownloadDocx,
    handleVerifyIntegrity,
  }
}
