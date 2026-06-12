'use client'

import * as React from 'react'
import { Button } from '@/shared/ui/button'
import { Badge } from '@/shared/ui/badge'
import { Card } from '@/shared/ui/card'
import { UseProfileReturn } from '../model/use-profile'
import {
  User,
  Briefcase,
  ShieldCheck,
  AlertCircle,
  TrendingUp,
  Copy,
  Wallet,
} from 'lucide-react'

interface ProfileHeaderProps {
  profile: UseProfileReturn
}

export function ProfileHeader({
  profile,
}: ProfileHeaderProps): React.ReactElement {
  const {
    role,
    isKycVerified,
    kycForm,
    isWalletConnected,
    walletAddress,
    usdtBalance,
    escrowBalance,
    handleConnectWallet,
    handleCopyText,
    setShowKycModal,
    handleRoleChange,
  } = profile

  return (
    <>
      {/* Role Switcher */}
      <div className="flex justify-end mb-6">
        <div className="bg-white/80 backdrop-blur-md border border-border p-1 rounded-full flex gap-1 shadow-sm">
          <button
            type="button"
            onClick={() => handleRoleChange('tenant')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
              role === 'tenant'
                ? 'bg-primary text-white shadow-sm'
                : 'text-muted hover:text-fg'
            }`}
          >
            <User className="h-3.5 w-3.5" />
            Khách thuê (Tenant)
          </button>
          <button
            type="button"
            onClick={() => handleRoleChange('landlord')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
              role === 'landlord'
                ? 'bg-primary text-white shadow-sm'
                : 'text-muted hover:text-fg'
            }`}
          >
            <Briefcase className="h-3.5 w-3.5" />
            Chủ nhà (Landlord)
          </button>
        </div>
      </div>

      {/* User Profile Card */}
      <Card className="relative bg-white border border-border rounded-3xl p-6 md:p-8 mb-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden">
        {/* Background accent soft decoration */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center gap-5 relative z-10">
          <div className="h-16 w-16 rounded-full bg-primary-soft border-2 border-primary/20 flex items-center justify-center font-display text-xl font-bold text-primary shadow-inner shrink-0">
            {role === 'tenant' ? (
              <User className="h-7 w-7 text-primary" />
            ) : (
              <Briefcase className="h-7 w-7 text-primary" />
            )}
          </div>
          <div className="space-y-1.5 text-left">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-marketing text-xl font-bold text-fg">
                {role === 'tenant' ? 'Nguyễn Văn A' : 'Lê Hoàng Minh'}
              </h2>
              <Badge
                variant="outline"
                className={`uppercase tracking-wider py-0.5 ${
                  isKycVerified
                    ? 'bg-success-soft text-success border-success/20'
                    : 'bg-warning-soft text-warning border-warning/20'
                }`}
              >
                {isKycVerified ? (
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Đã xác minh KYC (
                    {role === 'tenant' ? 'Khách thuê' : 'Chủ nhà'})
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-warning">
                    <AlertCircle className="h-3.5 w-3.5 text-warning" />
                    Chưa xác minh KYC
                  </span>
                )}
              </Badge>
              <Badge
                variant="secondary"
                className="cursor-help py-0.5"
                title={
                  role === 'tenant'
                    ? 'Lịch sử thanh toán cọc và thuê nhà đúng hạn 100%'
                    : 'Thời gian phản hồi và phê duyệt bảo trì trung bình dưới 2 giờ'
                }
              >
                <TrendingUp className="h-3 w-3 mr-1" />
                Điểm tín dụng:{' '}
                {role === 'tenant'
                  ? '780/850 (Hạng Vàng)'
                  : '820/850 (Hạng Kim Cương)'}
              </Badge>
            </div>
            <p className="font-body text-xs text-muted">
              Email:{' '}
              <span className="text-fg font-medium">
                {role === 'tenant'
                  ? 'tenant@th-proptech.vn'
                  : 'landlord@th-proptech.vn'}
              </span>
            </p>
            {isKycVerified ? (
              <div className="flex items-center gap-1.5 font-body text-xs text-muted">
                <span>CCCD: {kycForm.cccdNumber}</span>
                <Badge
                  variant="outline"
                  className="text-[9px] font-mono py-0.5 bg-success-soft text-success border-success/20"
                >
                  Ledger Verified
                </Badge>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowKycModal(true)}
                className="inline-flex items-center gap-1 text-primary font-bold text-xs hover:underline cursor-pointer group"
              >
                <span>Yêu cầu xác minh danh tính CCCD ngay</span>
              </button>
            )}
          </div>
        </div>

        {/* Wallet Connection Status */}
        <div className="flex flex-col md:items-end gap-3 shrink-0 relative z-10">
          {isWalletConnected ? (
            <div className="bg-surface-muted/40 border border-border p-3 rounded-2xl text-left md:text-right space-y-1.5 min-w-[240px]">
              <div className="flex items-center justify-between md:justify-end gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-success animate-pulse" />
                <span
                  className="font-mono text-xs font-bold text-fg block truncate max-w-[150px]"
                  title={walletAddress}
                >
                  {walletAddress}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyText(walletAddress)}
                  className="text-subtle hover:text-fg transition-colors"
                  title="Sao chép địa chỉ ví"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="border-t border-border/50 pt-1.5 flex justify-between text-[10px] text-muted">
                <span>
                  Số dư:{' '}
                  <strong className="text-fg">
                    {usdtBalance.toLocaleString()} USDT
                  </strong>
                </span>
                <span>
                  {role === 'tenant' ? 'Ký quỹ: ' : 'Nhận ký quỹ: '}
                  <strong className="text-primary">
                    {escrowBalance.toLocaleString()} VND
                  </strong>
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs text-muted">
              <Wallet className="h-4 w-4 text-subtle" />
              <span>Ví Web3 chưa kết nối</span>
            </div>
          )}
          <Button
            onClick={handleConnectWallet}
            variant={isWalletConnected ? 'secondary' : 'primary'}
            className="h-9 text-xs rounded-full px-5 font-bold shadow-sm transition-all flex items-center gap-1.5 self-start md:self-end"
          >
            <Wallet className="h-3.5 w-3.5" />
            {isWalletConnected ? 'Ngắt kết nối ví' : 'Kết nối ví Web3'}
          </Button>
        </div>
      </Card>
    </>
  )
}
