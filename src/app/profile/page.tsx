'use client'

import * as React from 'react'
import { HomeHeader } from '@/widgets/home-dashboard/ui/home-header'
import { Footer } from '@/shared/ui/footer'
import { Button } from '@/shared/ui/button'

interface BlockchainLog {
  id: string
  event: string
  timestamp: string
  hash: string
  status: 'verified' | 'pending'
}

interface RentalBill {
  id: string
  title: string
  dueDate: string
  amount: number
  status: 'paid' | 'unpaid'
  txHash?: string
}

interface MaintenanceTicket {
  id: string
  title: string
  description: string
  status: 'pending' | 'processing' | 'completed'
  createdAt: string
  cost?: number
}

export default function ProfilePage(): React.ReactElement {
  const [activeTab, setActiveTab] = React.useState<
    'progress' | 'bills' | 'blockchain' | 'maintenance'
  >('progress')

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
      title: 'Hong voi nuoc nha tam',
      description: 'Voi hoa sen bi ro ri nuoc lien tuc gay lang phi.',
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
      title: 'Tien dat coc giu cho',
      dueDate: '15/06/2026',
      amount: 18000000,
      status: 'unpaid',
    },
    {
      id: 'BILL-RENT-001',
      title: 'Tien thue nha thang 6/2026',
      dueDate: '05/07/2026',
      amount: 18000000,
      status: 'unpaid',
    },
  ])

  // Handlers
  const handleConnectWallet = (): void => {
    if (isWalletConnected) {
      setIsWalletConnected(false)
      setWalletAddress('')
      setEscrowBalance(0)
    } else {
      setIsWalletConnected(true)
      setWalletAddress('0x1A2b3c4D5e6F7g8H9i0J')
      setUsdtBalance(50000)
      if (depositPaid && !leaseTerminated) {
        setEscrowBalance(18000000)
      }
    }
  }

  const handleUploadCccd = (): void => {
    setIsOcrLoading(true)
    setTimeout(() => {
      setIsOcrLoading(false)
      setCccdUploaded(true)
      setKycForm({
        fullName: 'NGUYEN VAN A',
        cccdNumber: '038096001234',
        dob: '15/08/1996',
        address: '720A Dien Bien Phu, Phuong 22, Binh Thanh, TP.HCM',
      })
    }, 1500)
  }

  const handleConfirmKyc = (): void => {
    setIsKycVerified(true)
    setShowKycModal(false)
    const newLog: BlockchainLog = {
      id: `LOG-${Date.now()}`,
      event: 'KYC_VERIFIED',
      timestamp: 'Vua xong',
      hash: '0x7b8a109a27e3d09a25b18920138d89f2c1e8aa2206b7d912da9',
      status: 'verified',
    }
    setBlockchainLogs(prev => [newLog, ...prev])
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
      timestamp: 'Vua xong',
      hash: '0x2d9a3b8e4f1a4e1272c41e8aa2206b7d',
      status: 'verified',
    }
    setBlockchainLogs(prev => [newLog, ...prev])
  }

  const handleSignContract = (): void => {
    setContractSigned(true)
    const newLog: BlockchainLog = {
      id: `LOG-${Date.now()}`,
      event: 'CONTRACT_SIGNED',
      timestamp: 'Vua xong',
      hash: '0x8f319a9213cd990112d430a0be1c99f1',
      status: 'verified',
    }
    setBlockchainLogs(prev => [newLog, ...prev])
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
      timestamp: 'Vua xong',
      hash: '0x3a2c91ba40fe93b8219c009d12d4109b',
      status: 'verified',
    }
    setBlockchainLogs(prev => [newLog, ...prev])
  }

  const handleConfirmHandover = (): void => {
    setHandoverSigned(true)
    setShowHandoverModal(false)
    const newLog: BlockchainLog = {
      id: `LOG-${Date.now()}`,
      event: 'HANDOVER_SIGNED',
      timestamp: 'Vua xong',
      hash: '0x5c9f9a9213cd990112d430a0be1c99f1a2098bcfd',
      status: 'verified',
    }
    setBlockchainLogs(prev => [newLog, ...prev])
  }

  const handleNewMaintenanceTicket = (e: React.FormEvent): void => {
    e.preventDefault()
    if (!newTicketTitle.trim() || !newTicketDesc.trim()) return
    const newTicket: MaintenanceTicket = {
      id: `TCK-${Date.now()}`,
      title: newTicketTitle,
      description: newTicketDesc,
      status: 'pending',
      createdAt: 'Vua xong',
    }
    setMaintenanceTickets(prev => [newTicket, ...prev])
    setNewTicketTitle('')
    setNewTicketDesc('')
  }

  const handleTerminateLease = (): void => {
    setLeaseTerminated(true)
    setEscrowBalance(0)
    const newLog: BlockchainLog = {
      id: `LOG-${Date.now()}`,
      event: 'LEASE_TERMINATED',
      timestamp: 'Vua xong',
      hash: '0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b',
      status: 'verified',
    }
    setBlockchainLogs(prev => [newLog, ...prev])
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

  return (
    <div className="min-h-screen bg-bg text-fg selection:bg-primary/20 selection:text-primary relative overflow-x-hidden flex flex-col justify-between">
      <div>
        <HomeHeader />

        <main className="w-full pt-36 pb-20">
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            {/* User Profile Card */}
            <div className="bg-white border border-border rounded-3xl p-6 md:p-8 mb-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="h-16 w-16 rounded-full bg-primary-soft flex items-center justify-center font-display text-xl font-bold text-primary">
                  TN
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className="font-marketing text-xl font-bold text-fg">
                      Nguyen Van A
                    </h2>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        isKycVerified
                          ? 'bg-success/10 text-success'
                          : 'bg-warning/10 text-warning'
                      }`}
                    >
                      {isKycVerified ? 'Da xac minh KYC' : 'Chua xac minh KYC'}
                    </span>
                  </div>
                  <p className="font-body text-xs text-muted">
                    Email: tenant@th-proptech.vn
                  </p>
                  {isKycVerified ? (
                    <p className="font-body text-xs text-muted">
                      CCCD: {kycForm.cccdNumber} (Ledger Hash Verified)
                    </p>
                  ) : (
                    <button
                      onClick={() => setShowKycModal(true)}
                      className="text-primary font-bold text-xs hover:underline cursor-pointer"
                    >
                      Yeu cau xac minh danh tinh CCCD ngay
                    </button>
                  )}
                </div>
              </div>

              {/* Wallet Connection Status */}
              <div className="flex flex-col md:items-end gap-2">
                <div className="flex items-center gap-3">
                  {isWalletConnected ? (
                    <div className="text-right">
                      <span className="font-mono text-xs font-bold bg-surface border border-border px-3 py-1.5 rounded-lg text-fg block max-w-[150px] truncate">
                        {walletAddress}
                      </span>
                      <span className="text-[10px] text-muted block mt-1">
                        So du: {usdtBalance.toLocaleString()} USDT | Ký quy:{' '}
                        {escrowBalance.toLocaleString()} VND
                      </span>
                    </div>
                  ) : (
                    <span className="font-body text-xs text-muted">
                      Vi chua ket noi
                    </span>
                  )}
                  <Button
                    onClick={handleConnectWallet}
                    variant={isWalletConnected ? 'secondary' : 'default'}
                    className="h-9 text-xs"
                  >
                    {isWalletConnected ? 'Ngat ket noi' : 'Ket noi Vi Web3'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-border mb-8 gap-6 text-sm font-semibold overflow-x-auto whitespace-nowrap pb-2">
              <button
                onClick={() => setActiveTab('progress')}
                className={`pb-3 transition-all relative cursor-pointer ${
                  activeTab === 'progress'
                    ? 'text-primary border-b-2 border-primary font-bold'
                    : 'text-muted hover:text-fg'
                }`}
              >
                Tien trinh thue nha
              </button>
              <button
                onClick={() => setActiveTab('bills')}
                className={`pb-3 transition-all relative cursor-pointer ${
                  activeTab === 'bills'
                    ? 'text-primary border-b-2 border-primary font-bold'
                    : 'text-muted hover:text-fg'
                }`}
              >
                Hoa don & Giao dich
              </button>
              <button
                onClick={() => setActiveTab('maintenance')}
                className={`pb-3 transition-all relative cursor-pointer ${
                  activeTab === 'maintenance'
                    ? 'text-primary border-b-2 border-primary font-bold'
                    : 'text-muted hover:text-fg'
                }`}
              >
                Bao cao su co & Bao tri
              </button>
              <button
                onClick={() => setActiveTab('blockchain')}
                className={`pb-3 transition-all relative cursor-pointer ${
                  activeTab === 'blockchain'
                    ? 'text-primary border-b-2 border-primary font-bold'
                    : 'text-muted hover:text-fg'
                }`}
              >
                So cai Blockchain
              </button>
            </div>

            {/* Tab content */}
            {activeTab === 'progress' && (
              <div className="space-y-8">
                {/* Progress Card */}
                <div className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-marketing text-lg font-bold text-fg">
                      Vinhomes Central Park - Can ho #102
                    </h3>
                    <span className="text-xs text-muted">
                      Hop dong: CTR-2026-0048
                    </span>
                  </div>

                  {/* Progress Line */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted font-bold uppercase tracking-wider">
                      <span>Tien do hoan thanh</span>
                      <span>{progressPercent()}%</span>
                    </div>
                    <div className="h-2.5 w-full bg-surface-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: `${progressPercent()}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions & Alerts */}
                  {!depositPaid && (
                    <div className="bg-warning/5 border border-warning/20 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <h4 className="font-marketing text-sm font-bold text-warning-hover">
                          Yeu cau thanh toan dat coc
                        </h4>
                        <p className="font-body text-xs text-muted">
                          Vui long thanh toan khoan tien dat coc de khoa giu cho
                          va bat dau ky ket hop dong.
                        </p>
                      </div>
                      <Button
                        onClick={handlePayDeposit}
                        className="h-10 bg-primary text-white text-xs font-bold rounded-full px-5 cursor-pointer"
                      >
                        Thanh toan coc 18.000.000d
                      </Button>
                    </div>
                  )}

                  {depositPaid && !contractSigned && (
                    <div className="bg-accent-2-soft border border-accent-2/20 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <h4 className="font-marketing text-sm font-bold text-accent-2">
                          Hop dong cho ky ket
                        </h4>
                        <p className="font-body text-xs text-muted">
                          Tien coc da duoc khoa tren Blockchain. Vui long doc va
                          ky so hop dong dien tu.
                        </p>
                      </div>
                      <Button
                        onClick={handleSignContract}
                        className="h-10 bg-accent-2 text-white text-xs font-bold rounded-full px-5 cursor-pointer"
                      >
                        Ky hop dong so
                      </Button>
                    </div>
                  )}

                  {contractSigned && !firstMonthPaid && (
                    <div className="bg-success/5 border border-success/20 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <h4 className="font-marketing text-sm font-bold text-success">
                          Thanh toan tien nha thang dau tien
                        </h4>
                        <p className="font-body text-xs text-muted">
                          Hop dong da duoc ky va bam bao mat. Vui long thanh
                          toan tien nha thang dau de nhan nha.
                        </p>
                      </div>
                      <Button
                        onClick={handlePayRent}
                        className="h-10 bg-success text-white text-xs font-bold rounded-full px-5 cursor-pointer"
                      >
                        Thanh toan thang dau 18.000.000d
                      </Button>
                    </div>
                  )}

                  {firstMonthPaid && !handoverSigned && (
                    <div className="bg-primary-soft border border-primary/20 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <h4 className="font-marketing text-sm font-bold text-primary">
                          Ký bien ban ban giao can ho
                        </h4>
                        <p className="font-body text-xs text-muted">
                          Vui long kiem tra hien trang can ho thuc te va ky bien
                          ban ban giao dien tu.
                        </p>
                      </div>
                      <Button
                        onClick={() => setShowHandoverModal(true)}
                        className="h-10 bg-primary text-white text-xs font-bold rounded-full px-5 cursor-pointer"
                      >
                        Xem & Ky bien ban ban giao
                      </Button>
                    </div>
                  )}

                  {handoverSigned && !leaseTerminated && (
                    <div className="bg-success/5 border border-success/20 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <h4 className="font-marketing text-sm font-bold text-success">
                          Quy trinh ban giao hoan tat
                        </h4>
                        <p className="font-body text-xs text-muted">
                          Hien tai ban dang o trong can ho. Den cuoi thoi han
                          thue ban co the gui yeu cau thanh ly hop dong.
                        </p>
                      </div>
                      <Button
                        onClick={handleTerminateLease}
                        variant="danger"
                        className="h-10 text-xs font-bold rounded-full px-5 cursor-pointer"
                      >
                        Yeu cau thanh ly hop dong & Rut coc
                      </Button>
                    </div>
                  )}

                  {leaseTerminated && (
                    <div className="bg-success/5 border border-success/20 rounded-2xl p-5">
                      <h4 className="font-marketing text-sm font-bold text-success mb-1">
                        Hop dong da thanh ly thanh cong
                      </h4>
                      <p className="font-body text-xs text-muted">
                        So tien dat coc (co khau tru thiet hai{' '}
                        {damageDeductions.toLocaleString()}d neu co) da duoc rut
                        ra tu Smart Contract va tra ve vi cua ban.
                      </p>
                    </div>
                  )}
                </div>

                {/* Progress Steps Timeline */}
                <div className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                  <h3 className="font-marketing text-base font-bold text-fg">
                    Cac buoc hanh trinh
                  </h3>
                  <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
                    {/* Step 1 */}
                    <div className="flex gap-4 relative">
                      <div className="h-6.5 w-6.5 rounded-full bg-success text-white flex items-center justify-center text-[10px] font-bold z-10">
                        1
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-marketing text-sm font-bold text-fg">
                          Dat lich hen xem nha
                        </h4>
                        <p className="font-body text-xs text-muted">
                          Lich hen da duoc xac nhan vao ngay 09/06/2026 luc
                          14:00.
                        </p>
                      </div>
                    </div>
                    {/* Step 2 */}
                    <div className="flex gap-4 relative">
                      <div
                        className={`h-6.5 w-6.5 rounded-full flex items-center justify-center text-[10px] font-bold z-10 ${
                          depositPaid
                            ? 'bg-success text-white'
                            : 'bg-primary text-white'
                        }`}
                      >
                        2
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-marketing text-sm font-bold text-fg">
                          Thanh toan tien coc giu cho
                        </h4>
                        <p className="font-body text-xs text-muted">
                          {depositPaid
                            ? 'Da thanh toan coc va khoa tren Ledger.'
                            : 'Cho khach hang thanh toan.'}
                        </p>
                      </div>
                    </div>
                    {/* Step 3 */}
                    <div className="flex gap-4 relative">
                      <div
                        className={`h-6.5 w-6.5 rounded-full flex items-center justify-center text-[10px] font-bold z-10 ${
                          contractSigned
                            ? 'bg-success text-white'
                            : depositPaid
                              ? 'bg-primary text-white'
                              : 'bg-surface-muted text-muted border border-border'
                        }`}
                      >
                        3
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-marketing text-sm font-bold text-fg">
                          Ky ket Hop dong dien tu
                        </h4>
                        <p className="font-body text-xs text-muted">
                          {contractSigned
                            ? 'Hop dong da duoc ky va bam bao mat.'
                            : 'Cho hai ben ky duyet sau khi nhan coc.'}
                        </p>
                      </div>
                    </div>
                    {/* Step 4 */}
                    <div className="flex gap-4 relative">
                      <div
                        className={`h-6.5 w-6.5 rounded-full flex items-center justify-center text-[10px] font-bold z-10 ${
                          handoverSigned
                            ? 'bg-success text-white'
                            : firstMonthPaid
                              ? 'bg-primary text-white'
                              : 'bg-surface-muted text-muted border border-border'
                        }`}
                      >
                        4
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-marketing text-sm font-bold text-fg">
                          Ky bien ban ban giao can ho
                        </h4>
                        <p className="font-body text-xs text-muted">
                          {handoverSigned
                            ? 'Da ky bien ban va ban giao khoa phong.'
                            : 'Cho kiem tra va ky xac nhan.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'bills' && (
              <div className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                <h3 className="font-marketing text-base font-bold text-fg">
                  Danh sach hoa don thanh toan
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-surface-muted/30 border-b border-border text-muted uppercase font-semibold">
                        <th className="p-4">Hoa don</th>
                        <th className="p-4">Han thanh toan</th>
                        <th className="p-4">So tien</th>
                        <th className="p-4">Trang thai</th>
                        <th className="p-4">Giao dich (Tx Hash)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {bills.map(b => (
                        <tr
                          key={b.id}
                          className="hover:bg-surface-muted/10 transition-colors"
                        >
                          <td className="p-4 font-semibold text-fg">
                            {b.title}
                          </td>
                          <td className="p-4 text-muted">{b.dueDate}</td>
                          <td className="p-4 font-bold text-fg">
                            {b.amount.toLocaleString('vi-VN')} VND
                          </td>
                          <td className="p-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                b.status === 'paid'
                                  ? 'bg-success/10 text-success'
                                  : 'bg-danger/10 text-danger'
                              }`}
                            >
                              {b.status === 'paid'
                                ? 'Da thanh toan'
                                : 'Chua thanh toan'}
                            </span>
                          </td>
                          <td
                            className="p-4 font-mono text-primary truncate max-w-[150px]"
                            title={b.txHash}
                          >
                            {b.txHash ? b.txHash : 'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'maintenance' && (
              <div className="space-y-8">
                {/* Submit new issue */}
                <div className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-4">
                  <h3 className="font-marketing text-base font-bold text-fg">
                    Bao cao su co thiet bi trong can ho
                  </h3>
                  <form
                    onSubmit={handleNewMaintenanceTicket}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-fg">
                          Tieu de loi
                        </label>
                        <input
                          type="text"
                          value={newTicketTitle}
                          onChange={e => setNewTicketTitle(e.target.value)}
                          placeholder="Vi du: Hong cua so, ro ri nuoc..."
                          className="w-full border border-border rounded-xl px-4 py-2.5 text-xs text-fg bg-surface-muted/30 focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-fg">
                          Anh dinh kem
                        </label>
                        <div className="border border-dashed border-border rounded-xl p-2.5 flex items-center justify-center bg-surface-muted/20 text-xs text-muted cursor-pointer hover:bg-surface-muted/30">
                          Click de upload anh loi
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-fg">
                        Mo ta chi tiet su co
                      </label>
                      <textarea
                        value={newTicketDesc}
                        onChange={e => setNewTicketDesc(e.target.value)}
                        placeholder="Nhap chi tiet vi tri loi, tinh trang loi de chu nha va ki thuat vien nam duoc..."
                        rows={3}
                        className="w-full border border-border rounded-xl px-4 py-2.5 text-xs text-fg bg-surface-muted/30 focus:outline-none focus:border-primary resize-none"
                      />
                    </div>
                    <Button type="submit" className="h-10 text-xs px-6">
                      Gui yeu cau bao tri
                    </Button>
                  </form>
                </div>

                {/* Tickets list */}
                <div className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                  <h3 className="font-marketing text-base font-bold text-fg">
                    Lich su yeu cau sua chua
                  </h3>
                  <div className="space-y-4">
                    {maintenanceTickets.map(t => (
                      <div
                        key={t.id}
                        className="border border-border rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-fg">
                              {t.title}
                            </span>
                            <span className="text-[10px] text-muted">
                              ({t.createdAt})
                            </span>
                          </div>
                          <p className="text-xs text-muted font-body leading-5">
                            {t.description}
                          </p>
                          {t.cost && (
                            <span className="text-[10px] font-bold text-primary block mt-1">
                              Chi phi: {t.cost.toLocaleString('vi-VN')} VND (Da
                              thanh toan)
                            </span>
                          )}
                        </div>
                        <div>
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              t.status === 'completed'
                                ? 'bg-success/10 text-success'
                                : t.status === 'processing'
                                  ? 'bg-primary-soft text-primary'
                                  : 'bg-warning/10 text-warning'
                            }`}
                          >
                            {t.status === 'completed'
                              ? 'Da hoan thanh'
                              : t.status === 'processing'
                                ? 'Dang sua'
                                : 'Cho duyet'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'blockchain' && (
              <div className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                <div className="space-y-1">
                  <h3 className="font-marketing text-base font-bold text-fg">
                    Nhat ky mat ma chuoi khoi (Blockchain Ledger Log)
                  </h3>
                  <p className="font-body text-xs text-muted">
                    Cac giao dich hop dong thue nha duoc bat bien hoa tren
                    Blockchain de doi chieu va bao mat.
                  </p>
                </div>
                <div className="space-y-4">
                  {blockchainLogs.map(log => (
                    <div
                      key={log.id}
                      className="border border-border rounded-2xl p-5 space-y-3 hover:shadow-sm transition-all bg-white"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-success" />
                          <h4 className="font-marketing text-sm font-bold text-fg uppercase tracking-wider">
                            {log.event}
                          </h4>
                        </div>
                        <span className="font-body text-xs text-muted">
                          {log.timestamp}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-border/60 pt-3 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-muted">Transaction Hash:</span>
                          <span
                            className="font-mono text-primary truncate max-w-[200px] sm:max-w-md"
                            title={log.hash}
                          >
                            {log.hash}
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-success/10 text-success text-[10px] font-bold uppercase">
                          Verified
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* KYC / OCR Modal */}
      {showKycModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-xl p-6 md:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setShowKycModal(false)}
              className="absolute top-5 right-5 h-8 w-8 rounded-full border border-border flex items-center justify-center bg-surface-muted/30 cursor-pointer hover:bg-surface-muted/50"
            >
              x
            </button>
            <div className="border-b border-border pb-3">
              <h3 className="font-marketing text-lg font-bold text-fg">
                Xac minh danh tinh bang CCCD dien tu
              </h3>
              <p className="text-xs text-muted">
                Su dung cong nghe nhan dien OCR va bam ma bao mat chuoi khoi
              </p>
            </div>

            {!cccdUploaded ? (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-2xl p-10 flex flex-col items-center justify-center gap-3 bg-surface-muted/10">
                  <span className="text-xs text-muted">
                    Keo tha hoac click de tai len mat truoc va sau CCCD
                  </span>
                  <Button
                    onClick={handleUploadCccd}
                    className="h-10 text-xs px-5 cursor-pointer"
                  >
                    {isOcrLoading
                      ? 'Dang xu ly OCR...'
                      : 'Tai anh len & Quet thong tin'}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-primary uppercase">
                  Thong tin tu dong trich xuat tu CCCD
                </h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-muted">
                        Ho va ten
                      </label>
                      <input
                        type="text"
                        value={kycForm.fullName}
                        onChange={e =>
                          setKycForm({ ...kycForm, fullName: e.target.value })
                        }
                        className="w-full border border-border rounded-xl px-4 py-2 text-xs text-fg"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-muted">
                        So CCCD
                      </label>
                      <input
                        type="text"
                        value={kycForm.cccdNumber}
                        onChange={e =>
                          setKycForm({ ...kycForm, cccdNumber: e.target.value })
                        }
                        className="w-full border border-border rounded-xl px-4 py-2 text-xs text-fg"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-muted">
                        Ngay sinh
                      </label>
                      <input
                        type="text"
                        value={kycForm.dob}
                        onChange={e =>
                          setKycForm({ ...kycForm, dob: e.target.value })
                        }
                        className="w-full border border-border rounded-xl px-4 py-2 text-xs text-fg"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-muted">
                        Dia chi thuong tru
                      </label>
                      <input
                        type="text"
                        value={kycForm.address}
                        onChange={e =>
                          setKycForm({ ...kycForm, address: e.target.value })
                        }
                        className="w-full border border-border rounded-xl px-4 py-2 text-xs text-fg"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-success/5 border border-success/20 rounded-2xl p-4 text-[10px] text-muted leading-5">
                  Thong tin CCCD khi duoc bam se luu tru mat ma tren chuoi de
                  bao ve thong tin rieng tu. Ban ghi co gia tri phap li doi
                  chieu khi ky hop dong.
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={() => setCccdUploaded(false)}
                    variant="secondary"
                    className="flex-1 h-10 text-xs"
                  >
                    Quet lai
                  </Button>
                  <Button
                    onClick={handleConfirmKyc}
                    className="flex-1 h-10 text-xs bg-success"
                  >
                    Xac nhan & Ky bam Blockchain
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Handover Checklist Modal */}
      {showHandoverModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-xl p-6 md:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setShowHandoverModal(false)}
              className="absolute top-5 right-5 h-8 w-8 rounded-full border border-border flex items-center justify-center bg-surface-muted/30 cursor-pointer hover:bg-surface-muted/50"
            >
              x
            </button>
            <div className="border-b border-border pb-3">
              <h3 className="font-marketing text-lg font-bold text-fg">
                Bien ban ban giao can ho dien tu
              </h3>
              <p className="text-xs text-muted">
                Xac nhan tinh trang thuc te cac phong va trang thiet bi can ho
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-border/60">
                  <span className="text-xs font-semibold text-fg">
                    Phong khach (Sofa, den dien)
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setHandoverChecks({
                          ...handoverChecks,
                          livingRoom: 'good',
                        })
                      }
                      className={`px-3 py-1 rounded-lg text-[10px] font-bold ${
                        handoverChecks.livingRoom === 'good'
                          ? 'bg-success text-white'
                          : 'bg-surface border border-border text-muted'
                      }`}
                    >
                      Tot
                    </button>
                    <button
                      onClick={() =>
                        setHandoverChecks({
                          ...handoverChecks,
                          livingRoom: 'bad',
                        })
                      }
                      className={`px-3 py-1 rounded-lg text-[10px] font-bold ${
                        handoverChecks.livingRoom === 'bad'
                          ? 'bg-danger text-white'
                          : 'bg-surface border border-border text-muted'
                      }`}
                    >
                      Co loi
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-border/60">
                  <span className="text-xs font-semibold text-fg">
                    Phong ngu (Giuong, dieu hoa)
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setHandoverChecks({
                          ...handoverChecks,
                          bedroom: 'good',
                        })
                      }
                      className={`px-3 py-1 rounded-lg text-[10px] font-bold ${
                        handoverChecks.bedroom === 'good'
                          ? 'bg-success text-white'
                          : 'bg-surface border border-border text-muted'
                      }`}
                    >
                      Tot
                    </button>
                    <button
                      onClick={() =>
                        setHandoverChecks({ ...handoverChecks, bedroom: 'bad' })
                      }
                      className={`px-3 py-1 rounded-lg text-[10px] font-bold ${
                        handoverChecks.bedroom === 'bad'
                          ? 'bg-danger text-white'
                          : 'bg-surface border border-border text-muted'
                      }`}
                    >
                      Co loi
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-border/60">
                  <span className="text-xs font-semibold text-fg">
                    Phong bep (Tu lanh, bep tu)
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setHandoverChecks({
                          ...handoverChecks,
                          kitchen: 'good',
                        })
                      }
                      className={`px-3 py-1 rounded-lg text-[10px] font-bold ${
                        handoverChecks.kitchen === 'good'
                          ? 'bg-success text-white'
                          : 'bg-surface border border-border text-muted'
                      }`}
                    >
                      Tot
                    </button>
                    <button
                      onClick={() =>
                        setHandoverChecks({ ...handoverChecks, kitchen: 'bad' })
                      }
                      className={`px-3 py-1 rounded-lg text-[10px] font-bold ${
                        handoverChecks.kitchen === 'bad'
                          ? 'bg-danger text-white'
                          : 'bg-surface border border-border text-muted'
                      }`}
                    >
                      Co loi
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-border/60">
                  <span className="text-xs font-semibold text-fg">
                    Nha ve sinh (He thong nuoc)
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setHandoverChecks({
                          ...handoverChecks,
                          bathroom: 'good',
                        })
                      }
                      className={`px-3 py-1 rounded-lg text-[10px] font-bold ${
                        handoverChecks.bathroom === 'good'
                          ? 'bg-success text-white'
                          : 'bg-surface border border-border text-muted'
                      }`}
                    >
                      Tot
                    </button>
                    <button
                      onClick={() =>
                        setHandoverChecks({
                          ...handoverChecks,
                          bathroom: 'bad',
                        })
                      }
                      className={`px-3 py-1 rounded-lg text-[10px] font-bold ${
                        handoverChecks.bathroom === 'bad'
                          ? 'bg-danger text-white'
                          : 'bg-surface border border-border text-muted'
                      }`}
                    >
                      Co loi
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-primary-soft/30 border border-primary/20 rounded-2xl p-4 text-[10px] text-muted leading-5">
                Sau khi ca 2 ben thong nhat va cung ky so xac nhan bien ban ban
                giao can ho dien tu, du lieu bam (hash) se duoc luu tren
                blockchain lam bang chung phap li bat bien.
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  onClick={() => setShowHandoverModal(false)}
                  variant="secondary"
                  className="flex-1 h-10 text-xs"
                >
                  Huy
                </Button>
                <Button
                  onClick={handleConfirmHandover}
                  className="flex-1 h-10 text-xs"
                >
                  Ky & Ban giao Can ho
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
