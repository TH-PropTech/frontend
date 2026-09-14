'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
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
}

export function useContractWorkspace({
  contractId,
  currentUserId,
}: UseContractWorkspaceOptions) {
  const [data, setData] = useState<ContractViewDto | null>(null)
  const [auditEvents, setAuditEvents] = useState<ContractAuditEventDto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [isSigningModalOpen, setIsSigningModalOpen] = useState(false)
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false)
  const [isDownloadingDocx, setIsDownloadingDocx] = useState(false)
  const [isVerifyingIntegrity, setIsVerifyingIntegrity] = useState(false)
  const [integrityResult, setIntegrityResult] = useState<{
    isValid: boolean
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

  // Polling for status transitions
  useEffect(() => {
    const status = data?.contract?.status
    const shouldPoll =
      status === 'deposit-pending' || status === 'awaiting-signature'

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
  }, [data?.contract?.status, loadData])

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
    } catch {
      // Tech lead fail-closed notice
      setNoticeMessage(
        'Bản xuất PDF đang chờ phê duyệt Tech Lead (ARTIFACT_RENDERER_NOT_CONFIGURED). Vui lòng xem bản thể hiện điện tử trực tiếp trên màn hình hoặc tải bản DOCX.'
      )
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
      const msg = err instanceof Error ? err.message : 'Không thể tải bản DOCX'
      setNoticeMessage(msg)
    } finally {
      setIsDownloadingDocx(false)
    }
  }

  // Verify integrity
  const handleVerifyIntegrity = async () => {
    try {
      setIsVerifyingIntegrity(true)
      const res: ContractIntegrityResult =
        await verifyContractIntegrity(contractId)
      if (res.isValid) {
        setIntegrityResult({
          isValid: true,
          message:
            'Tính toàn vẹn hợp lệ: Hash đối soát khớp tuyệt đối với sổ cái Hyperledger Fabric.',
        })
      } else {
        setIntegrityResult({
          isValid: false,
          message:
            'Cảnh báo: Phát hiện sai lệch giữa mã băm hiện tại và bản ghi trên sổ cái!',
        })
      }
    } catch {
      setIntegrityResult({
        isValid: false,
        message: 'Không thể kết nối đến node sổ cái để đối soát mã băm.',
      })
    } finally {
      setIsVerifyingIntegrity(false)
    }
  }

  // Determine signer name and role
  const isTenant =
    Boolean(currentUserId && data?.parties?.tenant?.id === currentUserId) ||
    (!currentUserId && true) // Default tenant in simulation view if unauthenticated
  const currentParty = isTenant
    ? data?.parties?.tenant
    : data?.parties?.landlord
  const signerName =
    currentParty?.name || (isTenant ? 'Bên thuê' : 'Bên cho thuê')
  const signerRole: 'tenant' | 'landlord' = isTenant ? 'tenant' : 'landlord'

  return {
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
