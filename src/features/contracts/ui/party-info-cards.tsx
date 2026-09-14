'use client'

import {
  User,
  Shield,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Clock,
  Building,
} from 'lucide-react'
import type { ContractPartyView } from '../api/contracts-api'

export interface PartyInfoCardsProps {
  tenant: ContractPartyView
  landlord: ContractPartyView
  currentUserId?: string | undefined
}

export function PartyInfoCards({
  tenant,
  landlord,
  currentUserId,
}: PartyInfoCardsProps) {
  const renderPartyCard = (
    party: ContractPartyView,
    roleTitle: string,
    roleDesc: string,
    IconComponent: typeof User
  ) => {
    const isCurrentUser = Boolean(currentUserId && party.id === currentUserId)
    const isKycVerified = party.kycStatus === 'verified'

    return (
      <div
        data-testid={`party-card-${party.role}`}
        className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm flex flex-col justify-between gap-4"
      >
        <div>
          {/* Header row: role + identity badge */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[var(--surface-muted)] flex items-center justify-center text-[var(--primary)] border border-[var(--border)]">
                <IconComponent className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                  {roleTitle}
                </h4>
                <p className="text-[11px] text-[var(--muted)]">{roleDesc}</p>
              </div>
            </div>

            {isCurrentUser && (
              <span
                data-testid="current-user-badge"
                className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-[var(--primary)] text-white"
              >
                Bạn
              </span>
            )}
          </div>

          {/* Party Name */}
          <div className="mb-3">
            <h3 className="text-sm font-bold text-[var(--fg)] tracking-tight">
              {party.name || 'Đang cập nhật'}
            </h3>
          </div>

          {/* Info list */}
          <div className="space-y-2 text-xs">
            {/* Masked CCCD */}
            <div className="flex items-center gap-2 text-[var(--fg)]">
              <Shield className="w-3.5 h-3.5 text-[var(--muted)] shrink-0" />
              <span className="text-[var(--muted)]">CCCD/ĐDPL:</span>
              <span className="font-mono font-medium">
                {party.maskedCccd || 'Chưa cung cấp'}
              </span>
            </div>

            {/* Address */}
            <div className="flex items-start gap-2 text-[var(--fg)]">
              <MapPin className="w-3.5 h-3.5 text-[var(--muted)] shrink-0 mt-0.5" />
              <span className="text-[var(--muted)]">Địa chỉ:</span>
              <span
                className="truncate max-w-[200px]"
                title={party.address || ''}
              >
                {party.address || 'Chưa cập nhật'}
              </span>
            </div>
          </div>
        </div>

        {/* Status badges footer */}
        <div className="pt-3 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-2">
          {/* KYC Status */}
          <div className="flex items-center gap-1.5">
            {isKycVerified ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[var(--surface-muted)] text-[var(--success)] border border-[var(--border)]">
                <CheckCircle2 className="w-3 h-3 text-[var(--success)]" />
                Đã xác thực KYC
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[var(--surface-muted)] text-[var(--warning)] border border-[var(--border)]">
                <AlertCircle className="w-3 h-3 text-[var(--warning)]" />
                Chưa hoàn tất KYC
              </span>
            )}
          </div>

          {/* Signature status */}
          <div>
            {party.hasSigned ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[var(--success)]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Đã ký e-Consent
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[var(--muted)]">
                <Clock className="w-3.5 h-3.5" />
                Chưa ký
              </span>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      {renderPartyCard(
        landlord,
        'Bên Cho Thuê (Bên A)',
        'Chủ sở hữu hoặc đại diện hợp pháp',
        Building
      )}
      {renderPartyCard(
        tenant,
        'Bên Thuê (Bên B)',
        'Người đại diện ký hợp đồng thuê',
        User
      )}
    </div>
  )
}
