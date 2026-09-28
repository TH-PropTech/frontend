'use client'

import type { ReactElement } from 'react'
import { Building2, Landmark } from 'lucide-react'
import type {
  ContractLedgerSummary,
  ContractOverviewSnapshot,
  ContractPartyView,
  ContractFinancialSummaryView,
} from '../api/contracts-api'
import type { ContractActiveStep } from '../lib/resolve-contract-active-step'

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
  ledger: 'Ghi sổ cái',
  'move-in': 'Nhận nhà',
  completed: 'Hoàn tất',
}

const LEDGER_LABELS: Record<ContractLedgerSummary['status'], string> = {
  'not-requested': 'Chưa ghi sổ cái',
  pending: 'Đang chờ ghi sổ cái',
  processing: 'Đang ghi sổ cái',
  'confirmed-simulation': 'Đã ghi nhận',
  'confirmed-fabric': 'Đã xác nhận trên Fabric',
  'failed-retryable': 'Ghi sổ cái lỗi, đang thử lại',
  'failed-terminal': 'Ghi sổ cái thất bại, không tự thử lại',
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
  const rows = [
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
    { label: 'Tiền thuê/tháng', value: formatVnd(commercial.monthlyRent) },
    { label: 'Tiền cọc', value: formatVnd(commercial.deposit) },
    ...(financialSummary
      ? [
          {
            label: 'Thanh toán ban đầu',
            value: formatVnd(financialSummary.initialPaymentTotal),
          },
          {
            label: 'Cọc giữ chỗ',
            value: formatVnd(financialSummary.holdingDeposit),
          },
          {
            label: 'Bù cọc bảo đảm',
            value: formatVnd(financialSummary.securityTopUpAmount),
          },
          ...(viewerRole === 'tenant'
            ? [
                {
                  label: 'Phí dịch vụ tenant',
                  value: formatVnd(financialSummary.tenantServiceFee),
                },
              ]
            : []),
          ...(viewerRole === 'landlord'
            ? [
                {
                  label: 'Hoa hồng chủ nhà',
                  value: formatVnd(financialSummary.landlordCommission),
                },
              ]
            : []),
        ]
      : []),
  ]

  return (
    <section
      data-testid="contract-summary-card"
      className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <Building2
            className="mt-0.5 h-5 w-5 shrink-0 text-[var(--primary)]"
            aria-hidden="true"
          />
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
      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-xs sm:grid-cols-3">
        {rows.map(row => (
          <div key={row.label}>
            <dt className="text-[var(--muted)]">{row.label}</dt>
            <dd className="font-semibold text-[var(--fg)]">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
