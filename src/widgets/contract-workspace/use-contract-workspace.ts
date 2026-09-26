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
  type ContractViewDto,
  type ContractAuditEventDto,
  type ContractIntegrityResult,
} from '@/features/contracts'

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
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null)

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
          getContractAuditEvents(contractId),
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

  // Polling for status transitions and ledger convergence
  useEffect(() => {
    if (!enablePolling) return

    const status = data?.contract?.status
    const ledgerStatus = data?.ledger?.status
    const shouldPoll =
      status === 'deposit-pending' ||
      status === 'awaiting-signature' ||
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
  }, [data?.contract?.status, data?.ledger?.status, enablePolling, loadData])

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
            'Tính toàn vẹn hợp lệ: Hash đối soát khớp tuyệt đối với sổ cái Hyperledger Fabric.',
        })
      } else if (res.verificationStatus === 'not-recorded') {
        setIntegrityResult({
          isValid: null,
          verificationStatus: 'not-recorded',
          message:
            'Chưa ghi nhận trên sổ cái: Hợp đồng chưa có bản ghi xác nhận trên blockchain.',
        })
      } else if (res.verificationStatus === 'unavailable') {
        setIntegrityResult({
          isValid: null,
          verificationStatus: 'unavailable',
          message:
            'Hệ thống sổ cái tạm thời không khả dụng: Không thể kết nối tới nút mạng Hyperledger Fabric.',
        })
      } else {
        setIntegrityResult({
          isValid: false,
          verificationStatus: 'invalid',
          message:
            'Cảnh báo: Phát hiện sai lệch giữa mã băm hiện tại và bản ghi trên sổ cái!',
        })
      }
    } catch {
      setIntegrityResult({
        isValid: null,
        verificationStatus: 'unavailable',
        message: 'Không thể kết nối đến node sổ cái để đối soát mã băm.',
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
    handleDownloadPdf,
    handleDownloadDocx,
    handleVerifyIntegrity,
  }
}
