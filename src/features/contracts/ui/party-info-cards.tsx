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
import { Badge } from '@/shared/ui/badge'
import type { ContractPartyView } from '../api/contracts-api'

export interface PartyInfoCardsProps {
  tenant: ContractPartyView
  landlord: ContractPartyView
  currentUserId?: string | undefined
  layout?: 'stack' | 'grid'
}

export function PartyInfoCards({
  tenant,
  landlord,
  currentUserId,
  layout = 'stack',
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
        className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5 shadow-sm flex flex-col justify-between gap-3"
      >
        <div>
          {/* Header row: role + identity badge */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[var(--surface-muted)] flex items-center justify-center text-[var(--primary)] border border-[var(--border)] shrink-0">
                <IconComponent className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--fg)] truncate">
                  {roleTitle}
                </h4>
                <p className="text-[11px] text-[var(--muted)] truncate">
                  {roleDesc}
                </p>
              </div>
            </div>

            {isCurrentUser && (
              <Badge
                data-testid="current-user-badge"
                variant="default"
                className="text-[10px] font-semibold px-2 py-0.5 shrink-0 bg-[var(--primary)] text-white"
              >
                Bạn
              </Badge>
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
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-[var(--muted)] shrink-0">
                <Shield className="w-3.5 h-3.5 shrink-0" />
                <span className="whitespace-nowrap">CCCD/ĐDPL:</span>
              </span>
              {party.maskedCccd ? (
                <span className="font-mono font-medium text-[var(--fg)] text-right">
                  {party.maskedCccd}
                </span>
              ) : (
                <span className="italic text-[var(--muted)] text-right">
                  Chưa cung cấp
                </span>
              )}
            </div>

            {/* Address */}
            <div className="flex items-start justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-[var(--muted)] shrink-0 mt-0.5">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span className="whitespace-nowrap">Địa chỉ:</span>
              </span>
              <span
                className={`min-w-0 break-words text-right ${
                  party.address
                    ? 'text-[var(--fg)]'
                    : 'italic text-[var(--muted)]'
                }`}
              >
                {party.address || 'Chưa cập nhật'}
              </span>
            </div>
          </div>
        </div>

        {/* Status badges footer */}
        <div className="pt-3 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-2">
          {/* KYC Status */}
          <Badge
            variant="outline"
            className={`text-[11px] font-medium gap-1 px-2.5 py-0.5 whitespace-nowrap ${
              isKycVerified
                ? 'bg-[var(--surface-muted)] text-[var(--success)] border-[var(--border)]'
                : 'bg-[var(--surface-muted)] text-[var(--warning)] border-[var(--border)]'
            }`}
          >
            {isKycVerified ? (
              <>
                <CheckCircle2 className="w-3 h-3 text-[var(--success)]" />
                <span>Đã xác thực KYC</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-3 h-3 text-[var(--warning)]" />
                <span>Chưa hoàn tất KYC</span>
              </>
            )}
          </Badge>

          {/* Signature status */}
          <div className="flex items-center gap-1 text-[11px] font-medium whitespace-nowrap">
            {party.hasSigned ? (
              <span className="inline-flex items-center gap-1 text-[var(--success)]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Đã ký xác nhận</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[var(--muted)]">
                <Clock className="w-3.5 h-3.5" />
                <span>Chưa ký</span>
              </span>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={
        layout === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 gap-4 w-full'
          : 'flex flex-col gap-4 w-full'
      }
    >
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
