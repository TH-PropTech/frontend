'use client'

import { useEffect, useState, type ReactElement } from 'react'
import { Building2, CalendarDays, Landmark, Users, Wallet } from 'lucide-react'
import {
  getApartmentCoverImage,
  type ContractLedgerSummary,
  type ContractOverviewSnapshot,
  type ContractPartyView,
  type ContractFinancialSummaryView,
} from '../api/contracts-api'
import type { ContractActiveStep } from '../lib/resolve-contract-active-step'
import { describePrepaidRent } from '@/shared/lib/prepaid-rent'

export interface ContractSummaryCardProps {
  contract: ContractOverviewSnapshot
  parties: { tenant: ContractPartyView; landlord: ContractPartyView }
  ledger: ContractLedgerSummary
  activeStage: ContractActiveStep
  financialSummary?: ContractFinancialSummaryView
  viewerRole?: 'tenant' | 'landlord'
}

const STAGE_LABELS: Record<ContractActiveStep, string> = {
  document: 'Hợp đồng',
  deposit: 'Đặt cọc',
  signing: 'Ký số',
  ledger: 'Lưu vết',
  'move-in': 'Nhận nhà',
  'move-out': 'Trả nhà & hoàn cọc',
  completed: 'Hoàn tất',
}

const LEDGER_LABELS: Record<ContractLedgerSummary['status'], string> = {
  'not-requested': 'Chưa lưu vết',
  pending: 'Đang chờ lưu vết',
  processing: 'Đang lưu vết',
  'confirmed-simulation': 'Đã ghi nhận',
  'confirmed-fabric': 'Đã lưu vết chống sửa đổi',
  'failed-retryable': 'Lưu vết lỗi, đang thử lại',
  'failed-terminal': 'Lưu vết thất bại, không tự thử lại',
  'integrity-mismatch': 'Sai lệch toàn vẹn',
}

const formatVnd = (value: number): string =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
    value
  )

const formatDate = (value: string): string =>
  value ? new Date(value).toLocaleDateString('vi-VN') : '—'

/** Thẻ tóm tắt đầu workspace; trạng thái nghiệp vụ tách khỏi trạng thái sổ cái. */
export function ContractSummaryCard({
  contract,
  parties,
  ledger,
  activeStage,
  financialSummary,
  viewerRole,
}: ContractSummaryCardProps): ReactElement {
  const { commercial, property } = contract
  const ledgerLabel = `${LEDGER_LABELS[ledger.status]}${
    ledger.networkMode === 'simulation' ? ' (mô phỏng)' : ''
  }`

  // Ảnh bìa lấy từ apartment thật (endpoint public), không snapshot trên
  // contract nên phải gọi riêng; lỗi hay rỗng thì rơi về icon toà nhà như cũ.
  // Kết quả gắn theo property.id nên đổi căn hộ thì ảnh cũ tự mất, không cần reset state trong effect.
  const [cover, setCover] = useState<{ id: string; url: string | null }>()
  const [failedId, setFailedId] = useState<string>()
  useEffect(() => {
    let active = true
    getApartmentCoverImage(property.id)
      .then(url => {
        if (active) setCover({ id: property.id, url })
      })
      .catch(() => {
        if (active) setFailedId(property.id)
      })
    return () => {
      active = false
    }
  }, [property.id])
  const coverImage = cover?.id === property.id ? cover.url : null
  const showPhoto = Boolean(coverImage) && failedId !== property.id

  // Chia 2 nhóm: thông tin các bên/thời hạn (đọc trước) và tài chính (số tiền,
  // cần nổi bật). Trộn chung 1 lưới phẳng như trước làm các số 0đ chiếm chỗ
  // ngang hàng với số tiền chính, khó quét mắt.
  const partyRows = [
    { label: 'Bên thuê', value: parties.tenant.name },
    { label: 'Bên cho thuê', value: parties.landlord.name },
    {
      label: 'Thời hạn',
      value: commercial.durationMonths
        ? `${commercial.durationMonths} tháng`
        : 'Chưa xác định',
    },
    {
      label: 'Hiệu lực',
      value: `${formatDate(contract.startDate)} – ${formatDate(contract.endDate)}`,
    },
  ]

  const financialRows = [
    { label: 'Tiền thuê/tháng', value: commercial.monthlyRent, primary: true },
    { label: 'Tiền cọc', value: commercial.deposit, primary: true },
    ...(financialSummary
      ? [
          {
            label: 'Thanh toán ban đầu',
            value: financialSummary.initialPaymentTotal,
            primary: false,
          },
          ...(financialSummary.prepaidRent
            ? [
                {
                  label: describePrepaidRent(financialSummary.prepaidRent),
                  value: financialSummary.prepaidRent.amount,
                  primary: false,
                },
              ]
            : []),
          {
            label: 'Cọc giữ chỗ',
            value: financialSummary.holdingDeposit,
            primary: false,
          },
          {
            label: 'Bù cọc bảo đảm',
            value: financialSummary.securityTopUpAmount,
            primary: false,
          },
          ...(viewerRole === 'tenant'
            ? [
                {
                  label: 'Phí dịch vụ tenant',
                  value: financialSummary.tenantServiceFee,
                  primary: false,
                },
              ]
            : []),
          ...(viewerRole === 'landlord'
            ? [
                {
                  label: 'Hoa hồng chủ nhà',
                  value: financialSummary.landlordCommission,
                  primary: false,
                },
              ]
            : []),
        ]
      : []),
  ]

  return (
    <section
      data-testid="contract-summary-card"
      className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {showPhoto ? (
            <img
              src={coverImage ?? undefined}
              alt={property.title}
              onError={() => setFailedId(property.id)}
              className="h-16 w-16 shrink-0 rounded-md border border-[var(--border)] object-cover sm:h-20 sm:w-20"
            />
          ) : (
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md bg-[var(--primary-soft)] sm:h-20 sm:w-20"
              aria-hidden="true"
            >
              <Building2 className="h-7 w-7 text-[var(--primary)]" />
            </div>
          )}
          <div>
            <p className="font-mono text-xs font-bold text-[var(--fg)]">
              {contract.code}
            </p>
            <h2 className="text-sm font-bold text-[var(--fg)]">
              {property.title}
            </h2>
            {property.address ? (
              <p className="text-xs text-[var(--muted)]">{property.address}</p>
            ) : null}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 text-[11px]">
          <span
            data-testid="summary-business-status"
            className="rounded-full border border-[var(--primary)] bg-[var(--primary-soft)] px-2.5 py-1 font-semibold text-[var(--primary)]"
          >
            Bước: <span>{STAGE_LABELS[activeStage]}</span>
          </span>
          <span
            data-testid="summary-ledger-status"
            className="inline-flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-2.5 py-1 font-semibold text-[var(--fg)]"
          >
            <Landmark className="h-3 w-3" aria-hidden="true" />
            <span>{ledgerLabel}</span>
          </span>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-1.5 border-t border-[var(--border)] pt-3 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">
        <Users className="h-3 w-3" aria-hidden="true" />
        Các bên &amp; thời hạn
      </div>
      <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-xs sm:grid-cols-4">
        {partyRows.map(row => (
          <div key={row.label}>
            <dt className="flex items-center gap-1 text-[var(--muted)]">
              {row.label === 'Hiệu lực' ? (
                <CalendarDays className="h-3 w-3" aria-hidden="true" />
              ) : null}
              {row.label}
            </dt>
            <dd className="font-semibold text-[var(--fg)]">{row.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-4 flex items-center gap-1.5 border-t border-[var(--border)] pt-3 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">
        <Wallet className="h-3 w-3" aria-hidden="true" />
        Tài chính
      </div>
      <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4">
        {financialRows.map(row => (
          <div key={row.label}>
            <dt className="text-xs text-[var(--muted)]">{row.label}</dt>
            <dd
              className={
                row.primary
                  ? 'text-sm font-bold text-[var(--fg)]'
                  : row.value === 0
                    ? 'text-xs font-medium text-[var(--muted)]'
                    : 'text-xs font-semibold text-[var(--fg)]'
              }
            >
              {formatVnd(row.value)}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
