'use client'

import * as React from 'react'
import { toast } from 'sonner'

export interface Property {
  id: string
  name: string
  status: 'Đang thuê' | 'Đang chờ cọc' | 'Trống'
  code: string
  price: number
}

export interface BlockchainLog {
  id: string
  event: string
  timestamp: string
  hash: string
  status: 'verified' | 'pending'
}

export interface RentalBill {
  id: string
  title: string
  dueDate: string
  amount: number
  status: 'paid' | 'unpaid'
  txHash?: string
}

export interface MaintenanceTicket {
  id: string
  title: string
  description: string
  status: 'pending' | 'processing' | 'completed'
  createdAt: string
  cost?: number
}
export interface UseProfileReturn {
  role: 'tenant' | 'landlord'
  activeTab: 'progress' | 'bills' | 'blockchain' | 'maintenance' | 'security'
  setActiveTab: React.Dispatch<
    React.SetStateAction<
      'progress' | 'bills' | 'blockchain' | 'maintenance' | 'security'
    >
  >
  activePropertyId: string
  properties: Property[]
  showContractModal: boolean
  setShowContractModal: React.Dispatch<React.SetStateAction<boolean>>
  showHandoverArchiveModal: boolean
  setShowHandoverArchiveModal: React.Dispatch<React.SetStateAction<boolean>>
  hasPasskey: boolean
  setHasPasskey: React.Dispatch<React.SetStateAction<boolean>>
  activeSessions: Array<{
    id: string
    device: string
    ip: string
    location: string
    lastActive: string
  }>
  setActiveSessions: React.Dispatch<
    React.SetStateAction<
      Array<{
        id: string
        device: string
        ip: string
        location: string
        lastActive: string
      }>
    >
  >
  notifChannels: {
    email: boolean
    sms: boolean
    telegram: boolean
    zalo: boolean
    push: boolean
  }
  setNotifChannels: React.Dispatch<
    React.SetStateAction<{
      email: boolean
      sms: boolean
      telegram: boolean
      zalo: boolean
      push: boolean
    }>
  >
  isWalletConnected: boolean
  walletAddress: string
  usdtBalance: number
  escrowBalance: number
  isKycVerified: boolean
  showKycModal: boolean
  setShowKycModal: React.Dispatch<React.SetStateAction<boolean>>
  isOcrLoading: boolean
  kycForm: {
    fullName: string
    cccdNumber: string
    dob: string
    address: string
  }
  setKycForm: React.Dispatch<
    React.SetStateAction<{
      fullName: string
      cccdNumber: string
      dob: string
      address: string
    }>
  >
  cccdUploaded: boolean
  setCccdUploaded: React.Dispatch<React.SetStateAction<boolean>>
  showHandoverModal: boolean
  setShowHandoverModal: React.Dispatch<React.SetStateAction<boolean>>
  handoverSigned: boolean
  setHandoverSigned: React.Dispatch<React.SetStateAction<boolean>>
  handoverChecks: {
    livingRoom: string
    bedroom: string
    kitchen: string
    bathroom: string
  }
  setHandoverChecks: React.Dispatch<
    React.SetStateAction<{
      livingRoom: string
      bedroom: string
      kitchen: string
      bathroom: string
    }>
  >
  maintenanceTickets: MaintenanceTicket[]
  newTicketTitle: string
  setNewTicketTitle: React.Dispatch<React.SetStateAction<string>>
  newTicketDesc: string
  setNewTicketDesc: React.Dispatch<React.SetStateAction<string>>
  leaseTerminated: boolean
  damageDeductions: number
  depositPaid: boolean
  contractSigned: boolean
  firstMonthPaid: boolean
  blockchainLogs: BlockchainLog[]
  bills: RentalBill[]
  activeProperty: Property
  handleConnectWallet: () => void
  handleUploadCccd: () => void
  handleConfirmKyc: () => void
  handlePayDeposit: () => void
  handleSignContract: () => void
  handlePayRent: () => void
  handleConfirmHandover: () => void
  handleNewMaintenanceTicket: (e: React.FormEvent) => void
  handleApproveTicket: (id: string) => void
  handleTerminateLease: () => void
  handleCopyText: (text: string) => void
  progressPercent: () => number
  handleOpenContractModal: () => void
  handlePropertyChange: (propertyId: string) => void
  handleRoleChange: (newRole: 'tenant' | 'landlord') => void
}

export function useProfile(): UseProfileReturn {
  const [role, setRole] = React.useState<'tenant' | 'landlord'>('tenant')
  const [activeTab, setActiveTab] = React.useState<
    'progress' | 'bills' | 'blockchain' | 'maintenance' | 'security'
  >('progress')

  // Property Selector states
  const [activePropertyId, setActivePropertyId] = React.useState('prop-1')
  const properties: Property[] = React.useMemo(
    () => [
      {
        id: 'prop-1',
        name: 'Vinhomes Central Park - Căn hộ #102',
        status: 'Đang thuê',
        code: 'CTR-2026-0048',
        price: 18000000,
      },
      {
        id: 'prop-2',
        name: 'Masteri Thảo Điền - Studio #204',
        status: 'Đang chờ cọc',
        code: 'CTR-2026-0112',
        price: 12000000,
      },
      {
        id: 'prop-3',
        name: 'Sunrise City - Căn hộ #403',
        status: 'Trống',
        code: 'CTR-2026-0250',
        price: 15000000,
      },
    ],
    []
  )

  // Modals visibility
  const [showContractModal, setShowContractModal] = React.useState(false)
  const [showHandoverArchiveModal, setShowHandoverArchiveModal] =
    React.useState(false)

  // Security Configuration states
  const [hasPasskey, setHasPasskey] = React.useState(false)
  const [activeSessions, setActiveSessions] = React.useState([
    {
      id: 's1',
      device: 'Windows PC • Chrome (Thiết bị hiện tại)',
      ip: '113.161.45.102',
      location: 'TP. Hồ Chí Minh',
      lastActive: 'Đang hoạt động',
    },
    {
      id: 's2',
      device: 'iPhone 15 Pro • Safari',
      ip: '14.162.210.55',
      location: 'Bình Dương',
      lastActive: '2 giờ trước',
    },
    {
      id: 's3',
      device: 'MacBook Pro • Chrome',
      ip: '27.79.155.8',
      location: 'TP. Hồ Chí Minh',
      lastActive: '3 ngày trước',
    },
  ])
  const [notifChannels, setNotifChannels] = React.useState({
    email: true,
    sms: true,
    telegram: false,
    zalo: true,
    push: true,
  })

  // Wallet Connection states
  const [isWalletConnected, setIsWalletConnected] = React.useState(false)
  const [walletAddress, setWalletAddress] = React.useState('')
  const [usdtBalance, setUsdtBalance] = React.useState(1000)
  const [escrowBalance, setEscrowBalance] = React.useState(0)

  // KYC States
  const [isKycVerified, setIsKycVerified] = React.useState(false)
  const [showKycModal, setShowKycModal] = React.useState(false)
  const [isOcrLoading, setIsOcrLoading] = React.useState(false)
  const [kycForm, setKycForm] = React.useState({
    fullName: '',
    cccdNumber: '',
    dob: '',
    address: '',
  })
  const [cccdUploaded, setCccdUploaded] = React.useState(false)

  // Handover states
  const [showHandoverModal, setShowHandoverModal] = React.useState(false)
  const [handoverSigned, setHandoverSigned] = React.useState(false)
  const [handoverChecks, setHandoverChecks] = React.useState({
    livingRoom: 'good',
    bedroom: 'good',
    kitchen: 'good',
    bathroom: 'good',
  })

  // Maintenance States
  const [maintenanceTickets, setMaintenanceTickets] = React.useState<
    MaintenanceTicket[]
  >([
    {
      id: 'TCK-001',
      title: 'Hỏng vòi nước nhà tắm',
      description: 'Vòi hoa sen bị rò rỉ nước liên tục gây lãng phí nước sạch.',
      status: 'completed',
      createdAt: '08/06/2026',
      cost: 250000,
    },
  ])
  const [newTicketTitle, setNewTicketTitle] = React.useState('')
  const [newTicketDesc, setNewTicketDesc] = React.useState('')

  // Lease termination states
  const [leaseTerminated, setLeaseTerminated] = React.useState(false)
  const [damageDeductions] = React.useState(500000) // Deduct 500k for minor wear

  // Demo progress states
  const [depositPaid, setDepositPaid] = React.useState(false)
  const [contractSigned, setContractSigned] = React.useState(false)
  const [firstMonthPaid, setFirstMonthPaid] = React.useState(false)

  const [blockchainLogs, setBlockchainLogs] = React.useState<BlockchainLog[]>([
    {
      id: 'LOG-001',
      event: 'LEASE_DEPLOYED',
      timestamp: '10/06/2026 16:15',
      hash: '0x498abf10927e3d09a25b18920138d89f2c1e8aa2206b7d',
      status: 'verified',
    },
  ])

  const [bills, setBills] = React.useState<RentalBill[]>([
    {
      id: 'BILL-DEP-001',
      title: 'Tiền đặt cọc giữ chỗ căn hộ',
      dueDate: '15/06/2026',
      amount: 18000000,
      status: 'unpaid',
    },
    {
      id: 'BILL-RENT-001',
      title: 'Tiền thuê nhà tháng 6/2026',
      dueDate: '05/07/2026',
      amount: 18000000,
      status: 'unpaid',
    },
  ])

  const activeProperty = React.useMemo(() => {
    return (properties.find(p => p.id === activePropertyId) ||
      properties[0]) as Property
  }, [properties, activePropertyId])

  // Handlers
  const handleConnectWallet = (): void => {
    if (isWalletConnected) {
      setIsWalletConnected(false)
      setWalletAddress('')
      setEscrowBalance(0)
      toast.info('Đã ngắt kết nối ví Web3')
    } else {
      setIsWalletConnected(true)
      setWalletAddress(
        role === 'tenant' ? '0x1A2b3c4D5e6F7g8H9i0J' : '0x9E8d7C6B5a4F3e2D1c0B'
      )
      setUsdtBalance(role === 'tenant' ? 50000 : 150000)
      if (depositPaid && !leaseTerminated) {
        setEscrowBalance(18000000)
      }
      toast.success('Kết nối ví Web3 thành công!', {
        description: `Đã liên kết ví ${role === 'tenant' ? 'Khách thuê' : 'Chủ nhà'} với mạng Sepolia Testnet.`,
      })
    }
  }

  const handleUploadCccd = (): void => {
    setIsOcrLoading(true)
    setTimeout(() => {
      setIsOcrLoading(false)
      setCccdUploaded(true)
      setKycForm({
        fullName: role === 'tenant' ? 'NGUYỄN VĂN A' : 'LÊ HOÀNG MINH',
        cccdNumber: role === 'tenant' ? '038096001234' : '012093005678',
        dob: role === 'tenant' ? '15/08/1996' : '20/12/1985',
        address:
          role === 'tenant'
            ? '720A Điện Biên Phủ, Phường 22, Bình Thạnh, TP.HCM'
            : '100 Nguyễn Hữu Cảnh, Phường 22, Bình Thạnh, TP.HCM',
      })
      toast.success('Trích xuất OCR CCCD thành công!')
    }, 2500)
  }

  const handleConfirmKyc = (): void => {
    setIsKycVerified(true)
    setShowKycModal(false)
    const newLog: BlockchainLog = {
      id: `LOG-${Date.now()}`,
      event:
        role === 'tenant' ? 'TENANT_KYC_VERIFIED' : 'LANDLORD_KYC_VERIFIED',
      timestamp: 'Vừa xong',
      hash: '0x7b8a109a27e3d09a25b18920138d89f2c1e8aa2206b7d912da9',
      status: 'verified',
    }
    setBlockchainLogs(prev => [newLog, ...prev])
    toast.success('Xác minh danh tính KYC hoàn tất', {
      description: 'Dữ liệu băm mật mã đã được neo lên chuỗi khối blockchain.',
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
              txHash: '0x2d9a3b8e4f1a4e1272c41e8aa2206b7d',
            }
          : b
      )
    )
    if (isWalletConnected) {
      setEscrowBalance(18000000)
    }
    const newLog: BlockchainLog = {
      id: `LOG-${Date.now()}`,
      event: 'DEPOSIT_CONFIRMED',
      timestamp: 'Vừa xong',
      hash: '0x2d9a3b8e4f1a4e1272c41e8aa2206b7d',
      status: 'verified',
    }
    setBlockchainLogs(prev => [newLog, ...prev])
    toast.success('Thanh toán tiền đặt cọc thành công!', {
      description: 'Số tiền ký quỹ đã khóa an toàn trên Smart Contract.',
    })
  }

  const handleSignContract = (): void => {
    setContractSigned(true)
    const newLog: BlockchainLog = {
      id: `LOG-${Date.now()}`,
      event: role === 'tenant' ? 'TENANT_SIGNED' : 'LANDLORD_SIGNED',
      timestamp: 'Vừa xong',
      hash: '0x8f319a9213cd990112d430a0be1c99f1',
      status: 'verified',
    }
    setBlockchainLogs(prev => [newLog, ...prev])
    toast.success(
      role === 'tenant'
        ? 'Ký hợp đồng số thành công!'
        : 'Ký duyệt hợp đồng thành công!',
      {
        description: 'Bản hợp đồng thông minh đã được băm bảo mật.',
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
              txHash: '0x3a2c91ba40fe93b8219c009d12d4109b',
            }
          : b
      )
    )
    const newLog: BlockchainLog = {
      id: `LOG-${Date.now()}`,
      event: 'RENT_PAID_CONFIRMED',
      timestamp: 'Vừa xong',
      hash: '0x3a2c91ba40fe93b8219c009d12d4109b',
      status: 'verified',
    }
    setBlockchainLogs(prev => [newLog, ...prev])
    toast.success('Thanh toán tiền nhà tháng đầu tiên thành công!', {
      description:
        'Mã số mở khóa phòng điện tử đã gửi tới hòm thư của khách thuê.',
    })
  }

  const handleConfirmHandover = (): void => {
    setHandoverSigned(true)
    setShowHandoverModal(false)
    const newLog: BlockchainLog = {
      id: `LOG-${Date.now()}`,
      event: 'HANDOVER_SIGNED',
      timestamp: 'Vừa xong',
      hash: '0x5c9f9a9213cd990112d430a0be1c99f1a2098bcfd',
      status: 'verified',
    }
    setBlockchainLogs(prev => [newLog, ...prev])
    toast.success(
      role === 'tenant'
        ? 'Ký biên bản nhận bàn giao thành công!'
        : 'Xác nhận bàn giao căn hộ thành công!',
      {
        description:
          'Lịch sử kiểm kê trạng thái căn hộ đã được ghi lại bất biến.',
      }
    )
  }

  const handleNewMaintenanceTicket = (e: React.FormEvent): void => {
    e.preventDefault()
    if (!newTicketTitle.trim() || !newTicketDesc.trim()) return
    const newTicket: MaintenanceTicket = {
      id: `TCK-${Date.now()}`,
      title: newTicketTitle,
      description: newTicketDesc,
      status: 'pending',
      createdAt: 'Vừa xong',
    }
    setMaintenanceTickets(prev => [newTicket, ...prev])
    setNewTicketTitle('')
    setNewTicketDesc('')
    toast.success('Đã gửi yêu cầu bảo trì sự cố thiết bị!', {
      description:
        'Chủ nhà và đội ngũ kỹ thuật sẽ được thông báo ngay lập tức.',
    })
  }

  const handleApproveTicket = (id: string): void => {
    setMaintenanceTickets(prev =>
      prev.map(t =>
        t.id === id ? { ...t, status: 'processing', cost: t.cost || 350000 } : t
      )
    )
    const newLog: BlockchainLog = {
      id: `LOG-${Date.now()}`,
      event: 'MAINTENANCE_APPROVED_BY_LANDLORD',
      timestamp: 'Vừa xong',
      hash:
        '0x' +
        Math.random().toString(16).substring(2, 10) +
        '27e3d09a25b18920138d89f2c1e8aa2206b7d',
      status: 'verified',
    }
    setBlockchainLogs(prev => [newLog, ...prev])
    toast.success('Đã phê duyệt yêu cầu sửa chữa!', {
      description:
        'Hệ thống đã tự động liên hệ kỹ thuật viên đến bảo trì thiết bị.',
    })
  }

  const handleTerminateLease = (): void => {
    setLeaseTerminated(true)
    setEscrowBalance(0)
    const newLog: BlockchainLog = {
      id: `LOG-${Date.now()}`,
      event: 'LEASE_TERMINATED',
      timestamp: 'Vừa xong',
      hash: '0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b',
      status: 'verified',
    }
    setBlockchainLogs(prev => [newLog, ...prev])
    toast.success('Thanh lý hợp đồng thành công!', {
      description:
        'Tiền ký quỹ đặt cọc đã được giải tỏa hoàn trả tự động qua chuỗi.',
    })
  }

  const handleCopyText = (text: string): void => {
    navigator.clipboard.writeText(text)
    toast.success('Đã sao chép vào bộ nhớ tạm!')
  }

  // Calculate progress percent
  const progressPercent = (): number => {
    if (leaseTerminated) return 100
    if (handoverSigned) return 100
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
      toast.warning('Vui lòng kết nối ví Web3 để thực hiện chữ ký số!')
      return
    }
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
    } else if (propertyId === 'prop-2') {
      setDepositPaid(false)
      setContractSigned(false)
      setFirstMonthPaid(false)
      setHandoverSigned(false)
      setLeaseTerminated(false)
      setEscrowBalance(0)
    } else if (propertyId === 'prop-3') {
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

  // Switch role reset connected states for demo
  const handleRoleChange = (newRole: 'tenant' | 'landlord'): void => {
    setRole(newRole)
    setIsWalletConnected(false)
    setWalletAddress('')
    setEscrowBalance(0)
    setIsKycVerified(false)
    setCccdUploaded(false)
    setKycForm({
      fullName: '',
      cccdNumber: '',
      dob: '',
      address: '',
    })
    setActivePropertyId('prop-1')
    setActiveTab('progress')
    toast.info(
      `Đã chuyển sang vai trò: ${newRole === 'tenant' ? 'Khách thuê' : 'Chủ nhà'}`
    )
  }

  return {
    role,
    activeTab,
    setActiveTab,
    activePropertyId,
    properties,
    showContractModal,
    setShowContractModal,
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
  }
}
