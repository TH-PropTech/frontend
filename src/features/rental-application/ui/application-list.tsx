'use client'

import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import { useQuery } from '@tanstack/react-query'
import {
  AlertCircle,
  ArrowRight,
  Calendar,
  Clock,
  FileSignature,
  FileText,
  RotateCcw,
  Users,
} from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { getMyRentalApplications } from '../api/rental-application-api'
import type { RentalApplicationItem } from '../api/rental-application-api'
import { ApplicationStatusBadge } from './application-status-badge'
import { ApplicationDetailDialog } from './application-detail-dialog'

function formatVnd(amount: number): string {
  return new Intl.NumberFormat('vi-VN').format(amount)
}

export function ApplicationList(): React.ReactElement {
  const [detailApp, setDetailApp] =
    React.useState<RentalApplicationItem | null>(null)
  const applications = useQuery({
    queryKey: ['rental-applications', 'mine'],
    queryFn: getMyRentalApplications,
  })

  if (applications.isLoading) {
    return (
      <div data-testid="application-list-loading" className="space-y-3">
        <div className="h-24 animate-pulse rounded-2xl bg-surface-muted" />
        <div className="h-24 animate-pulse rounded-2xl bg-surface-muted" />
      </div>
    )
  }

  if (applications.isError) {
    return (
      <div
        data-testid="application-list-error"
        className="rounded-2xl border border-danger/30 bg-danger-soft p-5 text-sm text-danger"
      >
        <div className="flex items-center gap-2">
          <AlertCircle aria-hidden="true" className="h-4 w-4 shrink-0" />
          <p>Không tải được danh sách hồ sơ đặt thuê.</p>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="mt-3 border-danger/40 bg-surface"
          onClick={() => applications.refetch()}
        >
          <RotateCcw aria-hidden="true" className="h-4 w-4" />
          <span>Thử lại</span>
        </Button>
      </div>
    )
  }

  if (!applications.data?.items.length) {
    return (
      <div
        data-testid="application-list-empty"
        className="rounded-2xl border border-border bg-surface p-8 text-center"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-surface-muted text-muted">
          <FileText aria-hidden="true" className="h-6 w-6" />
        </div>
        <h3 className="mt-3 font-display text-base font-bold text-fg">
          Chưa có hồ sơ ứng tuyển nào
        </h3>
        <p className="mt-1 text-xs text-muted">
          Bạn chưa gửi hồ sơ ứng tuyển thuê căn hộ nào. Hãy tìm kiếm căn hộ phù
          hợp và gửi hồ sơ đặt thuê.
        </p>
        <div className="mt-5">
          <Button
            asChild
            size="sm"
            className="bg-control text-on-control shadow-sm"
          >
            <Link href={'/properties' as Route}>
              <span>Khám phá căn hộ cho thuê</span>
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div data-testid="application-list" className="space-y-3">
      {applications.data.items.map(item => {
        const snapshot = item.packageSnapshot
        const duration = snapshot?.durationMonths ?? 12
        const rent = snapshot?.monthlyRent ?? 0

        const formattedDate = (() => {
          try {
            return new Date(item.moveInDate).toLocaleDateString('vi-VN')
          } catch {
            return item.moveInDate
          }
        })()

        const hasContract = item.contractHandoff
          ? item.contractHandoff.state === 'ready' &&
            Boolean(item.contractHandoff.href)
          : Boolean(item.contractId)
        const isAccepted = item.status === 'accepted'
        const isRejected = item.status === 'rejected'
        const isProvisioningFailed =
          isAccepted &&
          (item.contractHandoff?.state === 'failed' ||
            item.provisioningStatus === 'failed')
        const needsSigning = isAccepted && hasContract

        return (
          <article
            key={item._id}
            data-testid={`application-item-${item._id}`}
            className={`flex flex-col justify-between gap-4 rounded-2xl border p-5 shadow-sm sm:flex-row sm:items-center ${
              needsSigning
                ? 'border-primary/40 bg-primary-soft/10 ring-1 ring-primary/20'
                : 'border-border bg-surface'
            }`}
          >
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-semibold text-muted">
                  #{item._id.slice(-8)}
                </span>
                <ApplicationStatusBadge status={item.status} />
                {needsSigning && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-on-control">
                    <FileSignature className="h-3 w-3" aria-hidden="true" />
                    Cần ký ngay
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
                <span className="inline-flex items-center gap-1">
                  <Calendar
                    aria-hidden="true"
                    className="h-3.5 w-3.5 text-primary"
                  />
                  Vào ở: <strong className="text-fg">{formattedDate}</strong>
                </span>
                <span className="inline-flex items-center gap-1">
                  <Users
                    aria-hidden="true"
                    className="h-3.5 w-3.5 text-primary"
                  />
                  <strong className="text-fg">{item.occupants}</strong> người
                </span>
                <span>
                  Gói: <strong className="text-fg">{duration} tháng</strong>
                </span>
                {rent > 0 ? (
                  <span>
                    Giá thuê:{' '}
                    <strong className="text-fg">
                      {formatVnd(rent)} ₫/tháng
                    </strong>
                  </span>
                ) : null}
              </div>

              {isRejected && item.reasonCode ? (
                <p className="text-xs text-danger">
                  Lý do từ chối: {item.reasonCode}
                </p>
              ) : null}

              {isProvisioningFailed ? (
                <div className="inline-flex items-center gap-1.5 rounded-lg bg-warning-soft px-2.5 py-1 text-[11px] font-medium text-warning">
                  <Clock aria-hidden="true" className="h-3 w-3" />
                  <span>
                    Hệ thống đang chuẩn bị hợp đồng số, vui lòng chờ trong giây
                    lát…
                  </span>
                </div>
              ) : null}
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="flex items-center gap-1 border-border text-xs"
                onClick={() => setDetailApp(item)}
              >
                <FileText aria-hidden="true" className="h-3.5 w-3.5" />
                <span>Xem hồ sơ</span>
              </Button>

              {needsSigning ? (
                <Button
                  asChild
                  size="sm"
                  className="flex items-center gap-1.5 bg-primary text-on-control shadow-md hover:bg-primary-hover"
                >
                  <Link
                    href={
                      `/rental-applications/${item._id}/contract-invite` as Route
                    }
                  >
                    <FileSignature aria-hidden="true" className="h-4 w-4" />
                    <span>Xem &amp; Ký hợp đồng</span>
                    <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              ) : (
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="flex items-center gap-1 border-border text-xs"
                >
                  <Link href={`/properties/${item.apartmentId}` as Route}>
                    <span>Căn hộ</span>
                  </Link>
                </Button>
              )}
            </div>
          </article>
        )
      })}

      <ApplicationDetailDialog
        application={detailApp}
        open={!!detailApp}
        onOpenChange={open => !open && setDetailApp(null)}
      />
    </div>
  )
}
