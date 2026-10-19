'use client'

import * as React from 'react'
import { Info } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog'
import type { LandlordCommissionPackageInput } from '../api/platform-fees-api'
import {
  useLandlordCommission,
  type LandlordCommissionSource,
} from '../model/use-landlord-commission'

export type LandlordCommissionDialogProps = {
  disabled?: boolean
  className?: string
} & (
  | { apartmentId: string; packages?: undefined }
  | { packages: LandlordCommissionPackageInput[]; apartmentId?: undefined }
)

function formatVnd(amount: number | null): string {
  return amount === null
    ? '—'
    : `${new Intl.NumberFormat('vi-VN').format(amount)} ₫`
}

function CommissionBody({
  source,
}: {
  source: LandlordCommissionSource
}): React.ReactElement | null {
  const query = useLandlordCommission(source, true)
  const data = query.data

  let body: React.ReactNode
  if (query.isLoading) {
    body = <p className="text-sm text-muted">Đang tải phí hoa hồng…</p>
  } else if (query.isError) {
    body = (
      <p role="alert" className="text-sm text-danger">
        Không tải được phí hoa hồng, vui lòng thử lại.
      </p>
    )
  } else if (data && !data.scheduleAvailable) {
    body = <p className="text-sm text-muted">Chưa có biểu phí áp dụng.</p>
  } else if (data && data.packages.length === 0) {
    body = <p className="text-sm text-muted">Căn hộ chưa cấu hình gói thuê.</p>
  } else if (data) {
    body = (
      <div className="space-y-3">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-muted">
              <tr>
                <th className="py-1 pr-2 font-semibold">Thời hạn</th>
                <th className="py-1 pr-2 font-semibold">Tiền thuê/tháng</th>
                <th className="py-1 pr-2 font-semibold">
                  Hoa hồng (trước VAT)
                </th>
                <th className="py-1 pr-2 font-semibold">VAT</th>
                <th className="py-1 font-semibold">Tổng phải trả</th>
              </tr>
            </thead>
            <tbody>
              {data.packages.map(pkg => (
                <tr
                  key={`${pkg.durationMonths}-${pkg.monthlyRent}`}
                  className="border-t border-border"
                >
                  <td className="py-1.5 pr-2">{pkg.durationMonths} tháng</td>
                  <td className="py-1.5 pr-2">{formatVnd(pkg.monthlyRent)}</td>
                  {pkg.applicable ? (
                    <>
                      <td className="py-1.5 pr-2">
                        {formatVnd(pkg.amountBeforeVat)}
                      </td>
                      <td className="py-1.5 pr-2">
                        {formatVnd(pkg.vatAmount)}
                      </td>
                      <td className="py-1.5 font-semibold">
                        {formatVnd(pkg.amount)}
                      </td>
                    </>
                  ) : (
                    <td colSpan={3} className="py-1.5 text-muted">
                      Không thu phí
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {data.landlordText ? (
          <p className="text-xs text-muted">{data.landlordText}</p>
        ) : null}
        <p className="text-xs text-fg">
          Thanh toán một lần sau khi hợp đồng kích hoạt, trong vòng{' '}
          {data.dueDaysAfterActivation ?? '—'} ngày. Chủ nhà nộp cho sàn bằng
          cách quét mã QR Ví Mộc.
        </p>
      </div>
    )
  }

  return <>{body}</>
}

export function LandlordCommissionDialog(
  props: LandlordCommissionDialogProps
): React.ReactElement {
  const { disabled, className } = props
  const [open, setOpen] = React.useState(false)
  const source: LandlordCommissionSource = props.apartmentId
    ? { apartmentId: props.apartmentId }
    : { packages: props.packages ?? [] }

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        aria-label="Xem phí hoa hồng"
        title="Xem phí hoa hồng"
        disabled={disabled}
        className={className}
        onClick={() => setOpen(true)}
      >
        <Info className="h-4 w-4" aria-hidden="true" />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Phí hoa hồng nền tảng</DialogTitle>
            <DialogDescription>
              Phí chủ nhà trả cho sàn theo từng gói thuê.
            </DialogDescription>
          </DialogHeader>
          {open ? <CommissionBody source={source} /> : null}
        </DialogContent>
      </Dialog>
    </>
  )
}
