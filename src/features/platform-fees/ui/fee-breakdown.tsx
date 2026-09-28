import type { FeeSnapshot } from '@/features/rental-application/api/rental-application-api'

export interface FeeBreakdownProps {
  snapshot?: FeeSnapshot | null
  payerRole?: 'tenant' | 'landlord' | 'all'
}

function formatVnd(amount: number): string {
  return new Intl.NumberFormat('vi-VN').format(amount)
}

export function FeeBreakdown({
  snapshot,
  payerRole = 'tenant',
}: FeeBreakdownProps): React.ReactElement | null {
  const lines =
    snapshot?.quote.filter(
      line => payerRole === 'all' || line.payerRole === payerRole
    ) ?? []
  if (lines.length === 0) return null

  return (
    <section
      data-testid="fee-breakdown"
      className="space-y-2 rounded-xl border border-border bg-surface-muted/30 p-3"
      aria-label="Ước tính phí nền tảng"
    >
      <h3 className="text-xs font-semibold text-fg">Phí nền tảng dự kiến</h3>
      <ul className="space-y-1.5">
        {lines.map(line => (
          <li
            key={`${line.feeKind}-${line.payerRole}`}
            className="flex items-center justify-between gap-3 text-xs"
          >
            <span className="text-muted">
              {line.feeKind === 'TENANT_SERVICE'
                ? 'Phí dịch vụ người thuê'
                : 'Hoa hồng chủ nhà'}
            </span>
            <span className="font-semibold text-fg">
              {formatVnd(line.amount)} ₫
            </span>
          </li>
        ))}
      </ul>
      <p className="text-[11px] text-subtle">
        Phí được thanh toán riêng theo hóa đơn sau khi hợp đồng kích hoạt.
      </p>
    </section>
  )
}
