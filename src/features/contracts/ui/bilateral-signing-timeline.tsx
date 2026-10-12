'use client'

import * as React from 'react'
import { HelpTip } from './help-tip'
import {
  CheckCircle2,
  Clock,
  Fingerprint,
  PenTool,
  ShieldCheck,
  Sparkles,
  User,
} from 'lucide-react'

export interface BilateralSignerParty {
  name: string
  hasSigned: boolean
  signedAt?: string | null
  signatureHash?: string | null
  maskedCccd?: string | null
  provider?: 'smartca' | 'platform-consent' | 'dev-test' | null
  providerTransactionId?: string | null
  certificateSerial?: string | null
}

export interface BilateralSigningTimelineProps {
  tenant: BilateralSignerParty
  landlord: BilateralSignerParty
  contractStatus?: string | undefined
  currentUserId?: string | undefined
  isEligibleToSign?: boolean | undefined
  userRole?: 'tenant' | 'landlord' | 'staff' | 'other' | undefined
  onSignClick?: (() => void) | undefined
  /** Khi false: panel mờ và không nhận tương tác. Khi true: panel nổi bật. undefined = no change. */
  isActiveStep?: boolean
}

function formatDate(dateStr?: string | null): string {
  if (!dateStr) return '—'
  try {
    const d = new Date(dateStr)
    return d.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return dateStr
  }
}

function truncateHash(hash?: string | null): string {
  if (!hash) return '—'
  if (hash.length <= 16) return hash
  return `${hash.slice(0, 8)}...${hash.slice(-8)}`
}

const PROVIDER_LABELS: Record<string, { label: string; dev?: boolean }> = {
  smartca: { label: 'VNPT SmartCA' },
  'platform-consent': { label: 'Xác nhận trên nền tảng' },
  'dev-test': { label: 'Ký thử nghiệm (dev)', dev: true },
}

function DetailRow({
  label,
  children,
  hint,
}: {
  label: string
  children: React.ReactNode
  hint?: React.ReactNode
}): React.ReactElement {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="inline-flex shrink-0 items-center gap-1">
        {label}
        {hint}
      </span>
      <span className="min-w-0 break-all text-right text-[var(--fg)]">
        {children}
      </span>
    </div>
  )
}

/** Chi tiết chữ ký của một bên: luôn có giá trị đọc được, kể cả khi ký thử nghiệm hoặc thiếu mã. */
function SignedDetails({
  party,
}: {
  party: BilateralSignerParty
}): React.ReactElement {
  const provider = party.provider ? PROVIDER_LABELS[party.provider] : null
  return (
    <>
      {provider ? (
        <DetailRow label="Phương thức:">
          <span
            data-testid="signing-method-label"
            className={
              provider.dev
                ? 'rounded-full border border-[var(--warning)] px-2 py-0.5 text-[10px] font-bold text-[var(--warning)]'
                : 'font-semibold'
            }
          >
            {provider.label}
          </span>
        </DetailRow>
      ) : null}
      <DetailRow label="Thời điểm ký:">
        {party.signedAt ? formatDate(party.signedAt) : 'Đã ghi nhận'}
      </DetailRow>
      <DetailRow
        label="Mã xác thực chữ ký:"
        hint={<HelpTip term="signatureHash" />}
      >
        {party.signatureHash ? (
          <span
            className="font-mono text-[10px] text-[var(--primary)]"
            title={party.signatureHash}
          >
            {truncateHash(party.signatureHash)}
          </span>
        ) : party.provider === 'dev-test' ? (
          <span className="italic text-[var(--muted)]">
            Không áp dụng (ký thử nghiệm)
          </span>
        ) : (
          <span className="italic text-[var(--muted)]">Đang đối soát</span>
        )}
      </DetailRow>
      {party.certificateSerial ? (
        <DetailRow label="Serial chứng thư:">
          <span className="font-mono text-[10px]">
            {party.certificateSerial}
          </span>
        </DetailRow>
      ) : null}
      {party.providerTransactionId ? (
        <DetailRow label="Mã giao dịch:">
          <span className="font-mono text-[10px]">
            {truncateHash(party.providerTransactionId)}
          </span>
        </DetailRow>
      ) : null}
    </>
  )
}

export function BilateralSigningTimeline({
  tenant,
  landlord,
  isEligibleToSign = false,
  userRole = 'other',
  onSignClick,
  isActiveStep,
}: BilateralSigningTimelineProps): React.ReactElement {
  const isBothSigned = Boolean(tenant.hasSigned && landlord.hasSigned)
  const isOneSigned = Boolean(tenant.hasSigned !== landlord.hasSigned)

  const canTenantSign =
    userRole === 'tenant' && !tenant.hasSigned && isEligibleToSign
  const canLandlordSign =
    userRole === 'landlord' && !landlord.hasSigned && isEligibleToSign

  const wrapperClass =
    isActiveStep === true
      ? ''
      : isActiveStep === false
        ? 'opacity-50 pointer-events-none'
        : ''

  return (
    <div
      data-testid="bilateral-signing-timeline-wrapper"
      className={wrapperClass}
    >
      <div
        data-testid="bilateral-signing-timeline"
        className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm space-y-4"
      >
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] pb-3">
          <div className="flex min-w-0 items-center gap-2">
            <PenTool className="h-4 w-4 text-[var(--primary)]" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--fg)]">
              Tiến trình ký số song phương VNPT SmartCA
            </h4>
          </div>
          <span
            data-testid="signing-status-badge"
            className={`inline-flex shrink-0 items-center gap-1 whitespace-nowrap px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
              isBothSigned
                ? 'bg-[var(--surface-muted)] text-[var(--success)] border-[var(--border)]'
                : isOneSigned
                  ? 'bg-[var(--surface-muted)] text-[var(--warning)] border-[var(--border)]'
                  : 'bg-[var(--surface-muted)] text-[var(--muted)] border-[var(--border)]'
            }`}
          >
            {isBothSigned ? (
              <>
                <CheckCircle2 className="h-3 w-3 text-[var(--success)]" />
                Đã ký song phương (2/2)
              </>
            ) : isOneSigned ? (
              <>
                <Clock className="h-3 w-3 text-[var(--warning)]" />
                Chờ đối ứng (1/2)
              </>
            ) : (
              <>
                <Clock className="h-3 w-3 text-[var(--muted)]" />
                Chưa ký (0/2)
              </>
            )}
          </span>
        </div>

        {/* 2-Column Signer Grid */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] gap-4">
          {/* Tenant Card */}
          <div
            data-testid="tenant-signing-card"
            className={`rounded-lg border p-3.5 space-y-2.5 transition-all ${
              tenant.hasSigned
                ? 'border-[var(--border)] bg-[var(--surface-muted)]/40'
                : 'border-[var(--border)] bg-[var(--surface)]'
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <div
                  className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center text-xs font-bold ${
                    tenant.hasSigned
                      ? 'bg-[var(--success)] text-white'
                      : 'bg-[var(--surface-muted)] text-[var(--muted)] border border-[var(--border)]'
                  }`}
                >
                  {tenant.hasSigned ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <p className="text-xs font-bold text-[var(--fg)]">
                    Khách thuê
                  </p>
                  {tenant.name && tenant.name !== 'Khách thuê' ? (
                    <p className="text-[11px] text-[var(--muted)]">
                      {tenant.name}
                    </p>
                  ) : null}
                </div>
              </div>

              <span
                data-testid="tenant-signed-badge"
                className={`shrink-0 whitespace-nowrap text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                  tenant.hasSigned
                    ? 'bg-[var(--surface-muted)] text-[var(--success)] border border-[var(--border)]'
                    : 'bg-[var(--surface-muted)] text-[var(--muted)] border border-[var(--border)]'
                }`}
              >
                {tenant.hasSigned ? 'Đã ký số' : 'Chưa ký'}
              </span>
            </div>

            <div className="space-y-1 text-[11px] text-[var(--muted)] pt-1 border-t border-[var(--border)]">
              {tenant.maskedCccd && (
                <div className="flex items-center justify-between">
                  <span>CCCD / KYC:</span>
                  <span className="font-mono text-[var(--fg)]">
                    {tenant.maskedCccd}
                  </span>
                </div>
              )}
              {tenant.hasSigned ? (
                <SignedDetails party={tenant} />
              ) : (
                <p className="text-[11px] italic text-[var(--muted)]">
                  Chờ xác thực sinh trắc học và SmartCA
                </p>
              )}
            </div>

            {canTenantSign && (
              <button
                type="button"
                data-testid="tenant-sign-now-btn"
                onClick={onSignClick}
                className="w-full mt-2 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-bold bg-[var(--primary)] text-white hover:opacity-90 shadow-sm transition-opacity"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Ký số VNPT SmartCA ngay</span>
              </button>
            )}
          </div>

          {/* Landlord Card */}
          <div
            data-testid="landlord-signing-card"
            className={`rounded-lg border p-3.5 space-y-2.5 transition-all ${
              landlord.hasSigned
                ? 'border-[var(--border)] bg-[var(--surface-muted)]/40'
                : 'border-[var(--border)] bg-[var(--surface)]'
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <div
                  className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center text-xs font-bold ${
                    landlord.hasSigned
                      ? 'bg-[var(--success)] text-white'
                      : 'bg-[var(--surface-muted)] text-[var(--muted)] border border-[var(--border)]'
                  }`}
                >
                  {landlord.hasSigned ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <ShieldCheck className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <p className="text-xs font-bold text-[var(--fg)]">Chủ nhà</p>
                  {landlord.name && landlord.name !== 'Chủ nhà' ? (
                    <p className="text-[11px] text-[var(--muted)]">
                      {landlord.name}
                    </p>
                  ) : null}
                </div>
              </div>

              <span
                data-testid="landlord-signed-badge"
                className={`shrink-0 whitespace-nowrap text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                  landlord.hasSigned
                    ? 'bg-[var(--surface-muted)] text-[var(--success)] border border-[var(--border)]'
                    : 'bg-[var(--surface-muted)] text-[var(--muted)] border border-[var(--border)]'
                }`}
              >
                {landlord.hasSigned ? 'Đã ký số' : 'Chưa ký'}
              </span>
            </div>

            <div className="space-y-1 text-[11px] text-[var(--muted)] pt-1 border-t border-[var(--border)]">
              {landlord.maskedCccd && (
                <div className="flex items-center justify-between">
                  <span>CCCD / KYC:</span>
                  <span className="font-mono text-[var(--fg)]">
                    {landlord.maskedCccd}
                  </span>
                </div>
              )}
              {landlord.hasSigned ? (
                <SignedDetails party={landlord} />
              ) : (
                <p className="text-[11px] italic text-[var(--muted)]">
                  Chờ xác thực định danh và SmartCA chủ nhà
                </p>
              )}
            </div>

            {canLandlordSign && (
              <button
                type="button"
                data-testid="landlord-sign-now-btn"
                onClick={onSignClick}
                className="w-full mt-2 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-bold bg-[var(--primary)] text-white hover:opacity-90 shadow-sm transition-opacity"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Chủ nhà ký số ngay</span>
              </button>
            )}
          </div>
        </div>

        {/* Narrative Footer */}
        <div className="flex items-center gap-2 rounded-lg bg-[var(--surface-muted)] p-2.5 text-xs text-[var(--muted)]">
          <Fingerprint className="h-4 w-4 text-[var(--primary)] shrink-0" />
          <span>
            {isBothSigned
              ? 'Hợp đồng đã hoàn tất ký số song phương pháp lý. Sẵn sàng hoặc đã kích hoạt lưu vết chống sửa đổi.'
              : isOneSigned
                ? 'Đã ghi nhận chữ ký số của một bên. Bên còn lại vui lòng hoàn tất ký số để hợp đồng chính thức có hiệu lực.'
                : 'Hai bên cần hoàn tất xác thực sinh trắc học và chữ ký số an toàn VNPT SmartCA để kích hoạt hợp đồng.'}
          </span>
        </div>
      </div>
    </div>
  )
}
