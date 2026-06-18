'use client'

import * as React from 'react'
import { toast } from 'sonner'
import type {
  Property,
  BlockchainLog,
  EventType,
  UseProfileReturn,
} from './types'
import {
  DEMO_PROPERTIES,
  DEMO_BLOCKCHAIN_LOGS,
  DEMO_BILLS,
  DEMO_SESSIONS,
} from './mock-data'
import { useProfileMaintenance } from './use-profile-maintenance'
import { useProfileAppointments } from './use-profile-appointments'
import { uploadAndProcessCccd } from './ocr-utils'

// Re-export types for convenience
export type {
  Property,
  BlockchainLog,
  RentalBill,
  MaintenanceTicket,
  UseProfileReturn,
} from './types'

const EMPTY_KYC = {
  fullName: '',
  cccdNumber: '',
  dob: '',
  address: '',
  gender: '',
  nationality: '',
  placeOfOrigin: '',
}

export function useProfile(): UseProfileReturn {
  const [role, setRole] = React.useState<'tenant' | 'landlord'>('tenant')
  const [activeTab, setActiveTab] = React.useState<
    'progress' | 'bills' | 'blockchain' | 'maintenance' | 'security'
  >('progress')
  const [activePropertyId, setActivePropertyId] = React.useState('prop-1')
  const properties = React.useMemo(() => DEMO_PROPERTIES, [])

  // Modals
  const [showContractModal, setShowContractModal] = React.useState(false)
  const [contractViewOnly, setContractViewOnly] = React.useState(false)
  const [showHandoverArchiveModal, setShowHandoverArchiveModal] =
    React.useState(false)

  // Security
  const [hasPasskey, setHasPasskey] = React.useState(false)
  const [activeSessions, setActiveSessions] = React.useState(DEMO_SESSIONS)
  const [notifChannels, setNotifChannels] = React.useState({
    email: true,
    sms: true,
    telegram: false,
    zalo: true,
    push: true,
  })

  // Wallet
  const [isWalletConnected, setIsWalletConnected] = React.useState(false)
  const [walletAddress, setWalletAddress] = React.useState('')
  const [usdtBalance, setUsdtBalance] = React.useState(1000)
  const [escrowBalance, setEscrowBalance] = React.useState(0)

  // KYC
  const [isKycVerified, setIsKycVerified] = React.useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('user')
        if (stored) {
          const u = JSON.parse(stored) as { kycStatus?: string }
          return u.kycStatus === 'verified'
        }
      } catch {
        // Ignore JSON parse error
      }
    }
    return false
  })
  const [showKycModal, setShowKycModal] = React.useState(false)
  const [isOcrLoading, setIsOcrLoading] = React.useState(false)
  const [kycForm, setKycForm] = React.useState(EMPTY_KYC)
  const [cccdUploaded, setCccdUploaded] = React.useState(false)

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
  const [blockchainLogs, setBlockchainLogs] =
    React.useState(DEMO_BLOCKCHAIN_LOGS)
  const [bills, setBills] = React.useState(DEMO_BILLS)

  const addBlockchainLog = React.useCallback(
    (event: EventType, hash: string): void => {
      const log: BlockchainLog = {
        id: `LOG-${Date.now()}`,
        event,
        timestamp: 'Vừa xong',
        hash,
        status: 'verified',
      }
      setBlockchainLogs(prev => [log, ...prev])
    },
    []
  )

  const {
    maintenanceTickets,
    newTicketTitle,
    setNewTicketTitle,
    newTicketDesc,
    setNewTicketDesc,
    handleNewMaintenanceTicket,
    handleApproveTicket,
  } = useProfileMaintenance(addBlockchainLog)

  // Lease
  const [leaseTerminated, setLeaseTerminated] = React.useState(false)
  const [damageDeductions] = React.useState(500000)
  const [depositPaid, setDepositPaid] = React.useState(false)
  const [contractSigned, setContractSigned] = React.useState(false)
  const [firstMonthPaid, setFirstMonthPaid] = React.useState(false)

  const { appointments, handleApproveAppointment, handleRejectAppointment } =
    useProfileAppointments(role)

  const activeProperty = React.useMemo(
    () =>
      (properties.find(p => p.id === activePropertyId) ||
        properties[0]) as Property,
    [properties, activePropertyId]
  )

  const handleConnectWallet = (): void => {
    if (isWalletConnected) {
      setIsWalletConnected(false)
      setWalletAddress('')
      setEscrowBalance(0)
      toast.info('Đã hủy liên kết tài khoản ngân hàng')
      return
    }
    setIsWalletConnected(true)
    setWalletAddress(
      role === 'tenant'
        ? 'Techcombank - 19023456789012'
        : 'TPBank - 04382910301'
    )
    setUsdtBalance(role === 'tenant' ? 50000000 : 150000000)
    if (depositPaid && !leaseTerminated) setEscrowBalance(18000000)
    toast.success('Liên kết tài khoản ngân hàng thành công!', {
      description: `Đã liên kết tài khoản ngân hàng qua cổng thanh toán TPBank/Techcombank (PayOS).`,
    })
  }

  const handleUploadCccd = async (imageBase64?: string): Promise<void> => {
    setIsOcrLoading(true)
    try {
      const data = await uploadAndProcessCccd(imageBase64, role)
      setKycForm(data)
      setCccdUploaded(true)
    } finally {
      setIsOcrLoading(false)
    }
  }

  const handleConfirmKyc = (): void => {
    setIsKycVerified(true)
    const event =
      role === 'tenant' ? 'TENANT_KYC_VERIFIED' : 'LANDLORD_KYC_VERIFIED'
    addBlockchainLog(
      event,
      '7b8a109a27e3d09a25b18920138d89f2c1e8aa2206b7d912da98d1a1b2c3d4e5f'
    )
    toast.success('Xác minh danh tính KYC hoàn tất', {
      description: 'Chứng chỉ Fabric CA (X.509) đã được cấp và neo lên Ledger.',
    })
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
    if (isWalletConnected) setEscrowBalance(18000000)
    addBlockchainLog(
      'DEPOSIT_CONFIRMED',
      '2d9a3b8e4f1a4e1272c41e8aa2206b7d27e3d09a25b18920138d89f2c1e8aa22'
    )
    toast.success('Thanh toán tiền đặt cọc thành công!', {
      description:
        'Tiền ký quỹ đã khóa bảo chứng tại ngân hàng Techcombank (giám sát bởi Fabric Ledger).',
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

  const handleTerminateLease = (): void => {
    setLeaseTerminated(true)
    setEscrowBalance(0)
    addBlockchainLog(
      'LEASE_TERMINATED',
      '9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b7c8d9e0f1a2b3c4d5e6f7a8'
    )
    toast.success('Thanh lý hợp đồng thành công!', {
      description:
        'Tiền ký quỹ đặt cọc bảo chứng giữ tại TPBank/Techcombank đã được giải tỏa hoàn trả.',
    })
  }

  const handleCopyText = (text: string): void => {
    navigator.clipboard.writeText(text)
    toast.success('Đã sao chép vào bộ nhớ tạm!')
  }

  const progressPercent = (): number => {
    if (leaseTerminated || handoverSigned) return 100
    if (firstMonthPaid) return 80
    if (contractSigned) return 60
    if (depositPaid) return 40
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
    setContractViewOnly(false)
    setShowContractModal(true)
  }

  const handlePropertyChange = (propertyId: string): void => {
    setActivePropertyId(propertyId)
    if (propertyId === 'prop-1') {
      setDepositPaid(true)
      setContractSigned(true)
      setFirstMonthPaid(true)
      setHandoverSigned(true)
      setLeaseTerminated(false)
      setEscrowBalance(isWalletConnected ? 18000000 : 0)
    } else {
      setDepositPaid(false)
      setContractSigned(false)
      setFirstMonthPaid(false)
      setHandoverSigned(false)
      setLeaseTerminated(false)
      setEscrowBalance(0)
    }
    toast.info(
      `Đã chuyển sang căn hộ: ${properties.find(p => p.id === propertyId)?.name}`
    )
  }

  const handleRoleChange = (newRole: 'tenant' | 'landlord'): void => {
    setRole(newRole)
    setIsWalletConnected(false)
    setWalletAddress('')
    setEscrowBalance(0)
    setIsKycVerified(false)
    setCccdUploaded(false)
    setKycForm(EMPTY_KYC)
    setActivePropertyId('prop-1')
    setActiveTab('progress')
    toast.info(
      `Đã chuyển sang vai trò: ${newRole === 'tenant' ? 'Khách thuê' : 'Chủ nhà'}`
    )
  }

  const handleViewSignedContract = (): void => {
    setContractViewOnly(true)
    setShowContractModal(true)
  }

  return {
    role,
    activeTab,
    setActiveTab,
    activePropertyId,
    properties,
    showContractModal,
    setShowContractModal,
    contractViewOnly,
    handleViewSignedContract,
    showHandoverArchiveModal,
    setShowHandoverArchiveModal,
    hasPasskey,
    setHasPasskey,
    activeSessions,
    setActiveSessions,
    notifChannels,
    setNotifChannels,
    isWalletConnected,
    walletAddress,
    usdtBalance,
    escrowBalance,
    isKycVerified,
    showKycModal,
    setShowKycModal,
    isOcrLoading,
    kycForm,
    setKycForm,
    cccdUploaded,
    setCccdUploaded,
    showHandoverModal,
    setShowHandoverModal,
    handoverSigned,
    setHandoverSigned,
    handoverChecks,
    setHandoverChecks,
    maintenanceTickets,
    newTicketTitle,
    setNewTicketTitle,
    newTicketDesc,
    setNewTicketDesc,
    leaseTerminated,
    damageDeductions,
    depositPaid,
    contractSigned,
    firstMonthPaid,
    blockchainLogs,
    bills,
    activeProperty,
    appointments,
    handleConnectWallet,
    handleUploadCccd,
    handleConfirmKyc,
    handlePayDeposit,
    handleSignContract,
    handlePayRent,
    handleConfirmHandover,
    handleNewMaintenanceTicket,
    handleApproveTicket,
    handleTerminateLease,
    handleCopyText,
    progressPercent,
    handleOpenContractModal,
    handlePropertyChange,
    handleRoleChange,
    handleApproveAppointment,
    handleRejectAppointment,
  }
}
