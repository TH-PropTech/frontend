'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import type { Route } from 'next'
import { toast } from 'sonner'
import type {
  Property,
  BlockchainLog,
  RentalBill,
  EventType,
  UseProfileReturn,
} from './types'
import { useProfileMaintenance } from './use-profile-maintenance'
import { useProfileAppointments } from './use-profile-appointments'
import { useLandlordPortfolio } from './use-landlord-portfolio'
import { useTenantPortfolio } from './use-tenant-portfolio'
import { progressFlags } from './landlord-portfolio'
import { uploadAndProcessCccd } from './ocr-utils'
import { getMyKyc } from '../api/kyc-api'

// Re-export types for convenience
export type {
  Property,
  BlockchainLog,
  RentalBill,
  MaintenanceTicket,
  UseProfileReturn,
} from './types'

const EMPTY_PROPERTY: Property = {
  id: '',
  name: 'Chưa có căn hộ nào',
  status: 'Trống',
  code: '—',
  price: 0,
}

const EMPTY_KYC = {
  fullName: '',
  cccdNumber: '',
  dob: '',
  address: '',
  gender: '',
  nationality: '',
  placeOfOrigin: '',
  issueDate: '',
  placeOfIssue: '',
}

export function useProfile(): UseProfileReturn {
  const router = useRouter()
  const [role, setRole] = React.useState<'tenant' | 'landlord'>('tenant')
  const [activeTab, setActiveTabState] = React.useState<
    | 'progress'
    | 'bills'
    | 'wallet'
    | 'blockchain'
    | 'maintenance'
    | 'security'
    | 'listings'
    | 'saved-searches'
    | 'safety-reports'
    | 'support-tickets'
    | 'rental-applications'
  >('progress')

  const setActiveTab = React.useCallback(
    (action: React.SetStateAction<typeof activeTab>) => {
      // Tính next ngoài updater của setState: router.replace là side effect,
      // gọi trong updater sẽ chạy lúc render và báo lỗi setState-in-render.
      const next = typeof action === 'function' ? action(activeTab) : action
      setActiveTabState(next)
      try {
        if (typeof window !== 'undefined') {
          const params = new URLSearchParams(window.location.search)
          if (params.get('tab') !== next) {
            params.set('tab', next)
            if (!params.has('role') && role) {
              params.set('role', role)
            }
            const search = params.toString()
            const query = search ? `?${search}` : ''
            router.replace(`/profile${query}` as Route, { scroll: false })
          }
        }
      } catch (e) {
        console.error(e)
      }
    },
    [router, role, activeTab]
  )
  const [activePropertyId, setActivePropertyId] = React.useState('prop-1')
  const portfolio = useLandlordPortfolio(role === 'landlord')
  const tenantPortfolio = useTenantPortfolio(role === 'tenant')
  const properties = React.useMemo(() => {
    if (role === 'landlord') {
      return portfolio.properties
    }
    return tenantPortfolio.properties
  }, [role, portfolio.properties, tenantPortfolio.properties])

  // Modals
  const [showContractModal, setShowContractModal] = React.useState(false)
  const [contractViewOnly] = React.useState(false)
  const [showHandoverArchiveModal, setShowHandoverArchiveModal] =
    React.useState(false)

  // Security
  const [notifChannels, setNotifChannels] = React.useState({
    email: true,
    push: true,
  })

  // Wallet
  const [isWalletConnected, setIsWalletConnected] = React.useState(false)
  const [walletAddress, setWalletAddress] = React.useState('')
  const [usdtBalance, setUsdtBalance] = React.useState(0)

  // KYC
  const [kycStatus, setKycStatus] = React.useState<
    'not-started' | 'pending' | 'verified' | 'rejected'
  >('not-started')
  const isKycVerified = kycStatus === 'verified'
  const [showKycModal, setShowKycModal] = React.useState(false)
  const [isOcrLoading, setIsOcrLoading] = React.useState(false)
  const [kycForm, setKycForm] = React.useState(EMPTY_KYC)
  const [cccdUploaded, setCccdUploaded] = React.useState(false)
  const [isAuthLoaded, setIsAuthLoaded] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const stored = localStorage.getItem('user')
        if (stored) {
          const u = JSON.parse(stored) as {
            roles?: string[]
            kycStatus?: 'not-started' | 'pending' | 'verified' | 'rejected'
          }
          // Backend gán ['tenant', 'landlord'] cho cả khách thuê lẫn chủ nhà nên
          // chỉ mở vai trò chủ nhà mặc định khi tài khoản không có vai trò khách thuê.
          if (u.roles?.includes('landlord') && !u.roles.includes('tenant')) {
            setRole('landlord')
          }
          if (
            u.kycStatus === 'pending' ||
            u.kycStatus === 'verified' ||
            u.kycStatus === 'rejected'
          ) {
            setKycStatus(u.kycStatus)
          }
        }
      } catch (e) {
        console.error(e)
      } finally {
        setIsAuthLoaded(true)
      }

      const params = new URLSearchParams(window.location.search)
      const tabParam = params.get('tab')
      const roleParam = params.get('role')

      if (roleParam === 'landlord' || roleParam === 'tenant') {
        setRole(roleParam)
      } else if (tabParam === 'listings') {
        setRole('landlord')
      }

      if (tabParam) {
        setActiveTabState(tabParam as typeof activeTab)
      }
    }, 0)

    return () => clearTimeout(timer)
  }, [])

  React.useEffect(() => {
    const handlePopState = () => {
      try {
        const params = new URLSearchParams(window.location.search)
        const tab = params.get('tab')
        if (tab) {
          setActiveTabState(tab as typeof activeTab)
        }
        const r = params.get('role')
        if (r === 'landlord' || r === 'tenant') {
          setRole(r)
        }
      } catch {
        // ignore
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const refreshKycStatus = React.useCallback(async (): Promise<void> => {
    const record = await getMyKyc()
    setKycStatus(record?.status ?? 'not-started')
    if (record) {
      setKycForm({
        fullName: record.fullName ?? '',
        cccdNumber: record.idCardNumber,
        dob: record.dateOfBirth ?? '',
        address: record.placeOfResidence ?? '',
        gender: record.gender ?? '',
        nationality: record.nationality ?? '',
        placeOfOrigin: record.placeOfOrigin ?? '',
        issueDate: record.issueDate ?? '',
        placeOfIssue: record.placeOfIssue ?? '',
      })
    }
  }, [])

  React.useEffect(() => {
    if (typeof window === 'undefined' || !localStorage.getItem('accessToken')) {
      return
    }
    const timer = setTimeout(() => {
      void refreshKycStatus().catch(error => {
        console.warn('Could not load current KYC status', error)
      })
    }, 0)
    return () => clearTimeout(timer)
  }, [refreshKycStatus])

  React.useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      if (params.get('kyc') === 'true' && !isKycVerified) {
        timer = setTimeout(() => {
          setShowKycModal(true)
        }, 0)
      }
    }
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [isKycVerified])

  // Handover
  const [showHandoverModal, setShowHandoverModal] = React.useState(false)
  const [handoverSigned, setHandoverSigned] = React.useState(false)
  const [handoverChecks, setHandoverChecks] = React.useState({
    livingRoom: 'good',
    bedroom: 'good',
    kitchen: 'good',
    bathroom: 'good',
  })

  // Blockchain & Bills
  const [localBlockchainLogs, setLocalBlockchainLogs] = React.useState<
    BlockchainLog[]
  >([])
  const [bills, setBills] = React.useState<RentalBill[]>([])

  const addBlockchainLog = React.useCallback(
    (event: EventType, hash: string): void => {
      const log: BlockchainLog = {
        id: `LOG-${Date.now()}`,
        event,
        timestamp: 'Vừa xong',
        hash,
        status: 'verified',
      }
      setLocalBlockchainLogs(prev => [log, ...prev])
    },
    []
  )

  const {
    maintenanceTickets,
    status: maintenanceStatus,
    retry: retryMaintenance,
    newTicketTitle,
    setNewTicketTitle,
    newTicketDesc,
    setNewTicketDesc,
    handleNewMaintenanceTicket,
    handleApproveTicket,
  } = useProfileMaintenance(addBlockchainLog)

  // Lease
  const [depositPaid, setDepositPaid] = React.useState(false)
  const [contractSigned, setContractSigned] = React.useState(false)
  const [firstMonthPaid, setFirstMonthPaid] = React.useState(false)

  const {
    appointments,
    handleApproveAppointment,
    handleRejectAppointment,
    handleCancelAppointment,
    handleCompleteAppointment,
  } = useProfileAppointments(role)

  const activeProperty = React.useMemo(
    () =>
      (properties.find(p => p.id === activePropertyId) ||
        properties[0] ||
        EMPTY_PROPERTY) as Property,
    [properties, activePropertyId]
  )

  const liveContract = React.useMemo(() => {
    if (role === 'landlord' && portfolio.isLive) {
      return portfolio.contractByProperty[activeProperty.id] || null
    }
    if (role === 'tenant' && tenantPortfolio.isLive) {
      return (
        tenantPortfolio.contracts.find(
          c =>
            c._id === activeProperty.contractId ||
            c.propertyId === activeProperty.id
        ) ||
        tenantPortfolio.activeContract ||
        null
      )
    }
    return null
  }, [
    role,
    portfolio.isLive,
    portfolio.contractByProperty,
    activeProperty,
    tenantPortfolio.isLive,
    tenantPortfolio.contracts,
    tenantPortfolio.activeContract,
  ])

  // Tiến độ của căn đang chọn: chủ nhà/khách thuê đăng nhập thì suy ra từ hợp đồng thật, còn lại là trạng thái demo cục bộ
  const live = liveContract ? progressFlags(liveContract) : null
  const effDepositPaid = live ? live.depositPaid : depositPaid
  const effContractSigned = live ? live.contractSigned : contractSigned
  const effFirstMonthPaid = live ? live.firstMonthPaid : firstMonthPaid
  const effHandoverSigned = live ? live.handoverSigned : handoverSigned
  const effLeaseTerminated = live ? live.leaseTerminated : false

  const blockchainLogs = React.useMemo(() => {
    const logs: BlockchainLog[] = [...localBlockchainLogs]
    if (liveContract) {
      if (liveContract.contractHash) {
        logs.push({
          id: `LOG-${liveContract.contractCode}`,
          event: 'LEASE_DEPLOYED',
          timestamp: liveContract.startDate || '—',
          hash: liveContract.contractHash,
          status: 'verified',
        })
      }
      if (liveContract.signedByTenant) {
        logs.push({
          id: `LOG-SIG-${liveContract.contractCode}`,
          event: 'TENANT_SIGNED',
          timestamp:
            liveContract.tenantSignature?.signedAt ||
            liveContract.startDate ||
            '—',
          hash:
            liveContract.tenantSignature?.contentHash ||
            liveContract.contractHash ||
            `TX-SIG-${liveContract.contractCode}`,
          status: 'verified',
        })
      }
      if (
        liveContract.deposit &&
        [
          'deposit-paid',
          'awaiting-signature',
          'active',
          'completed',
          'terminated',
        ].includes(liveContract.status)
      ) {
        logs.push({
          id: `LOG-DEP-${liveContract.contractCode}`,
          event: 'DEPOSIT_CONFIRMED',
          timestamp: liveContract.startDate || '—',
          hash:
            liveContract.contractHash || `TX-DEP-${liveContract.contractCode}`,
          status: 'verified',
        })
      }
    }
    return logs
  }, [liveContract, localBlockchainLogs])

  const isInitialLoading =
    !isAuthLoaded ||
    (role === 'tenant' ? tenantPortfolio.isLoading : portfolio.isLoading)

  const effBills = React.useMemo(() => {
    if (role === 'tenant') {
      return tenantPortfolio.bills
    }
    return bills
  }, [role, tenantPortfolio.bills, bills])

  const billsStatus =
    role === 'tenant' ? tenantPortfolio.status : portfolio.status
  const retryBills = role === 'tenant' ? tenantPortfolio.retry : portfolio.retry

  const handleConnectWallet = (): void => {
    if (isWalletConnected) {
      setIsWalletConnected(false)
      setWalletAddress('')
      toast.info('Đã hủy liên kết ví')
      return
    }
    setIsWalletConnected(true)
    setWalletAddress(
      role === 'tenant' ? 'Ví Mộc - VM1902345678' : 'Ví Mộc - VM0438291030'
    )
    setUsdtBalance(role === 'tenant' ? 50000000 : 150000000)
    toast.success('Liên kết ví thành công!', {
      description: 'Đã liên kết tài khoản qua cổng thanh toán Ví Mộc.',
    })
  }

  const handleUploadCccd = async (imageBase64?: string): Promise<void> => {
    setIsOcrLoading(true)
    try {
      const data = await uploadAndProcessCccd(imageBase64, role)
      if (data) {
        setKycForm(data)
        setCccdUploaded(true)
      }
    } finally {
      setIsOcrLoading(false)
    }
  }

  const handlePayDeposit = (): void => {
    setDepositPaid(true)
    setBills(prev =>
      prev.map(b =>
        b.id === 'BILL-DEP-001'
          ? {
              ...b,
              status: 'paid',
              txHash:
                '2d9a3b8e4f1a4e1272c41e8aa2206b7d27e3d09a25b18920138d89f2c1e8aa22',
            }
          : b
      )
    )
    addBlockchainLog(
      'DEPOSIT_CONFIRMED',
      '2d9a3b8e4f1a4e1272c41e8aa2206b7d27e3d09a25b18920138d89f2c1e8aa22'
    )
    toast.success('Thanh toán tiền đặt cọc thành công!', {
      description:
        'Khoản cọc được ghi nhận và lưu vết chống sửa đổi. Tiền cọc chuyển trực tiếp cho chủ nhà.',
    })
  }

  const handleSignContract = (): void => {
    setContractSigned(true)
    const event = role === 'tenant' ? 'TENANT_SIGNED' : 'LANDLORD_SIGNED'
    addBlockchainLog(
      event,
      '8f319a9213cd990112d430a0be1c99f109b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1'
    )
    toast.success(
      role === 'tenant'
        ? 'Ký hợp đồng số thành công!'
        : 'Ký duyệt hợp đồng thành công!',
      {
        description:
          'Bản hợp đồng số đã được ký bằng chứng chỉ Fabric CA X.509.',
      }
    )
  }

  const handlePayRent = (): void => {
    setFirstMonthPaid(true)
    setBills(prev =>
      prev.map(b =>
        b.id === 'BILL-RENT-001'
          ? {
              ...b,
              status: 'paid',
              txHash:
                '3a2c91ba40fe93b8219c009d12d4109b7d8e9f0a1b2c3d4e5f6g7h8i9j0k1l2m',
            }
          : b
      )
    )
    addBlockchainLog(
      'RENT_PAID_CONFIRMED',
      '3a2c91ba40fe93b8219c009d12d4109b7d8e9f0a1b2c3d4e5f6g7h8i9j0k1l2m'
    )
    toast.success('Thanh toán tiền nhà tháng đầu tiên thành công!', {
      description:
        'Mã số mở khóa phòng điện tử đã gửi tới hòm thư của khách thuê.',
    })
  }

  const handleConfirmHandover = (): void => {
    setHandoverSigned(true)
    setShowHandoverModal(false)
    addBlockchainLog(
      'HANDOVER_SIGNED',
      '5c9f9a9213cd990112d430a0be1c99f1a2098bcfd8e9f0a1b2c3d4e5f6g7h8i'
    )
    toast.success(
      role === 'tenant'
        ? 'Ký biên bản nhận bàn giao thành công!'
        : 'Xác nhận bàn giao căn hộ thành công!',
      { description: 'Biên bản bàn giao thiết bị được ký số X.509 bất biến.' }
    )
  }

  const handleCopyText = (text: string): void => {
    navigator.clipboard.writeText(text)
    toast.success('Đã sao chép vào bộ nhớ tạm!')
  }

  const progressPercent = (): number => {
    if (effLeaseTerminated || effHandoverSigned) return 100
    if (effFirstMonthPaid) return 80
    if (effContractSigned) return 60
    if (effDepositPaid) return 40
    return 20
  }

  const handleOpenContractModal = (): void => {
    if (!isKycVerified) {
      toast.warning('Vui lòng hoàn tất xác minh KYC trước khi ký hợp đồng!')
      return
    }
    if (!isWalletConnected) {
      toast.warning(
        'Vui lòng liên kết tài khoản ngân hàng để thực hiện thanh toán & ký hợp đồng!'
      )
      return
    }
    const realContractId =
      activeProperty?.contractId ||
      (activeProperty?.id && activeProperty.id.length === 24
        ? activeProperty.id
        : null)
    if (realContractId) {
      router.push(`/contracts/${realContractId}` as Route)
    } else {
      toast.info(
        'Đang chuyển hướng tới danh sách hồ sơ thuê để xem và ký hợp đồng thật...'
      )
      router.push('/rental-applications' as Route)
    }
  }

  const handlePropertyChange = (propertyId: string): void => {
    setActivePropertyId(propertyId)
    if (portfolio.isLive) {
      // dữ liệu thật: tiến độ đã suy ra từ hợp đồng của căn được chọn
    } else if (propertyId === 'prop-1') {
      setDepositPaid(true)
      setContractSigned(true)
      setFirstMonthPaid(true)
      setHandoverSigned(true)
    } else {
      setDepositPaid(false)
      setContractSigned(false)
      setFirstMonthPaid(false)
      setHandoverSigned(false)
    }
    toast.info(
      `Đã chuyển sang căn hộ: ${properties.find(p => p.id === propertyId)?.name}`
    )
  }

  const handleRoleChange = (newRole: 'tenant' | 'landlord'): void => {
    setRole(newRole)
    setIsWalletConnected(false)
    setWalletAddress('')
    setKycStatus('not-started')
    setCccdUploaded(false)
    setKycForm(EMPTY_KYC)
    setActivePropertyId('prop-1')
    const targetTab =
      newRole === 'tenant' && activeTab === 'listings' ? 'progress' : activeTab
    setActiveTab(targetTab)

    try {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search)
        params.set('role', newRole)
        params.set('tab', targetTab)
        const query = params.toString() ? `?${params.toString()}` : ''
        router.replace(`/profile${query}` as Route, { scroll: false })
      }
    } catch {
      // ignore
    }

    toast.info(
      `Đã chuyển sang vai trò: ${newRole === 'tenant' ? 'Khách thuê' : 'Chủ nhà'}`
    )
  }

  const handleViewSignedContract = (): void => {
    const realContractId =
      activeProperty?.contractId ||
      (activeProperty?.id && activeProperty.id.length === 24
        ? activeProperty.id
        : null)
    if (realContractId) {
      router.push(`/contracts/${realContractId}` as Route)
    } else {
      toast.info(
        'Đang chuyển hướng tới danh sách hồ sơ thuê để xem hợp đồng đã cấp...'
      )
      router.push('/rental-applications' as Route)
    }
  }

  return {
    role,
    activeTab,
    setActiveTab,
    activePropertyId: activeProperty.id || activePropertyId,
    properties,
    portfolio,
    tenantPortfolio,
    liveContract,
    showContractModal,
    setShowContractModal,
    contractViewOnly,
    handleViewSignedContract,
    showHandoverArchiveModal,
    setShowHandoverArchiveModal,
    notifChannels,
    setNotifChannels,
    isWalletConnected,
    walletAddress,
    usdtBalance,
    isKycVerified,
    kycStatus,
    showKycModal,
    setShowKycModal,
    isOcrLoading,
    kycForm,
    setKycForm,
    cccdUploaded,
    setCccdUploaded,
    showHandoverModal,
    setShowHandoverModal,
    handoverSigned: effHandoverSigned,
    setHandoverSigned,
    handoverChecks,
    setHandoverChecks,
    maintenanceTickets,
    maintenanceStatus,
    retryMaintenance,
    newTicketTitle,
    setNewTicketTitle,
    newTicketDesc,
    setNewTicketDesc,
    leaseTerminated: effLeaseTerminated,
    depositPaid: effDepositPaid,
    contractSigned: effContractSigned,
    firstMonthPaid: effFirstMonthPaid,
    isInitialLoading,
    blockchainLogs,
    bills: effBills,
    billsStatus,
    retryBills,
    activeProperty,
    appointments,
    handleConnectWallet,
    handleUploadCccd,
    refreshKycStatus,
    handlePayDeposit,
    handleSignContract,
    handlePayRent,
    handleConfirmHandover,
    handleNewMaintenanceTicket,
    handleApproveTicket,
    handleCopyText,
    progressPercent,
    handleOpenContractModal,
    handlePropertyChange,
    handleRoleChange,
    handleApproveAppointment,
    handleRejectAppointment,
    handleCancelAppointment,
    handleCompleteAppointment,
  }
}
