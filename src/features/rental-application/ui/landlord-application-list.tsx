'use client'

import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import {
  AlertCircle,
  Calendar,
  Eye,
  FileSignature,
  FileText,
  RotateCcw,
  Users,
  Briefcase,
  PawPrint,
} from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { getApplicationReasonLabel } from '../lib/application-labels'
import { ApplicationStatusBadge } from './application-status-badge'
import {
  useLandlordApplications,
  type ApplicationFilterStatus,
} from '../model/use-landlord-applications'
import type { RentalApplicationItem } from '../api/rental-application-api'

export interface LandlordApplicationListProps {
  onSelectApplication?: (app: RentalApplicationItem) => void
}

function formatVnd(amount: number): string {
  return new Intl.NumberFormat('vi-VN').format(amount)
}

export function LandlordApplicationList({
  onSelectApplication,
}: LandlordApplicationListProps): React.ReactElement {
  const {
    applications,
    counts,
    filter,
    setFilter,
    isLoading,
    isError,
    refetch,
    setSelectedApplication,
  } = useLandlordApplications()

  const handleOpenDetail = (app: RentalApplicationItem) => {
    setSelectedApplication(app)
    onSelectApplication?.(app)
  }

  const FILTER_TABS: Array<{
    key: ApplicationFilterStatus
    label: string
    count: number
  }> = [
    { key: 'all', label: 'Tất cả', count: counts.all },
    { key: 'pending', label: 'Chờ duyệt', count: counts.pending },
    { key: 'accepted', label: 'Đã chấp thuận', count: counts.accepted },
    { key: 'rejected', label: 'Đã từ chối', count: counts.rejected },
  ]

  return (
    <div className="space-y-4">
      {/* Filter Tabs */}
      <div
        role="tablist"
        aria-label="Lọc hồ sơ"
        className="flex flex-wrap gap-2 border-b border-border pb-3"
      >
        {FILTER_TABS.map(tab => {
          const isActive = filter === tab.key
          return (
            <button
              key={tab.key}
              role="tab"
              aria-selected={isActive}
              type="button"
              onClick={() => setFilter(tab.key)}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                isActive
                  ? 'bg-primary text-on-control shadow-sm'
                  : 'bg-surface-muted text-muted hover:bg-surface-raised hover:text-fg'
              }`}
              data-testid={`filter-tab-${tab.key}`}
            >
              <span>{tab.label}</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                  isActive
                    ? 'bg-black/20 text-white'
                    : 'bg-border text-muted-foreground'
                }`}
              >
                {tab.count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Loading state */}
      {isLoading && (
        <div data-testid="landlord-application-loading" className="space-y-3">
          <div className="h-28 animate-pulse rounded-2xl bg-surface-muted" />
          <div className="h-28 animate-pulse rounded-2xl bg-surface-muted" />
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div
          data-testid="landlord-application-error"
          className="rounded-2xl border border-danger/30 bg-danger-soft p-5 text-sm text-danger"
        >
          <div className="flex items-center gap-2">
            <AlertCircle aria-hidden="true" className="h-4 w-4 shrink-0" />
            <p>Không tải được danh sách hồ sơ đặt thuê gửi tới bạn.</p>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="mt-3 border-danger/40 bg-surface"
            onClick={() => refetch()}
          >
            <RotateCcw aria-hidden="true" className="h-4 w-4" />
            <span>Thử lại</span>
          </Button>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !isError && applications.length === 0 && (
        <div
          data-testid="landlord-application-empty"
          className="rounded-2xl border border-border bg-surface p-8 text-center"
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-surface-muted text-muted">
            <FileText aria-hidden="true" className="h-6 w-6" />
          </div>
          <h3 className="mt-3 font-display text-base font-bold text-fg">
            Chưa có hồ sơ đặt thuê nào
          </h3>
          <p className="mt-1 text-xs text-muted max-w-md mx-auto">
            {filter === 'all'
              ? 'Hiện tại chưa có khách thuê nào gửi hồ sơ cho các căn hộ của bạn. Hồ sơ mới sẽ hiển thị tại đây khi có người đăng ký.'
              : `Không có hồ sơ nào trong trạng thái đã chọn.`}
          </p>
        </div>
      )}

      {/* Applications list */}
      {!isLoading && !isError && applications.length > 0 && (
        <div data-testid="landlord-application-list" className="space-y-3">
          {applications.map(item => {
            const snapshot = item.packageSnapshot
            const duration = snapshot?.durationMonths ?? 12
            const rent = snapshot?.monthlyRent ?? 0
            const deposit = snapshot?.resolvedDepositAmount ?? 0

            const formattedDate = (() => {
              try {
                return new Date(item.moveInDate).toLocaleDateString('vi-VN')
              } catch {
                return item.moveInDate
              }
            })()

            const isPending = item.status === 'pending'
            const isAccepted = item.status === 'accepted'
            const isRejected = item.status === 'rejected'

            return (
              <article
                key={item._id}
                data-testid={`landlord-application-item-${item._id}`}
                className="flex flex-col justify-between gap-4 rounded-2xl border border-border bg-surface p-5 shadow-sm transition-all hover:border-border-strong sm:flex-row sm:items-center"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-muted">
                      #{item._id.slice(-8)}
                    </span>
                    <ApplicationStatusBadge status={item.status} />
                    {item.occupation && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-surface-muted px-2 py-0.5 text-[11px] font-medium text-fg">
                        <Briefcase
                          aria-hidden="true"
                          className="h-3 w-3 text-muted"
                        />
                        <span>{item.occupation}</span>
                      </span>
                    )}
                    {item.hasPets && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-warning-soft px-2 py-0.5 text-[11px] font-medium text-warning">
                        <PawPrint aria-hidden="true" className="h-3 w-3" />
                        <span>Có thú cưng</span>
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
                    <span className="inline-flex items-center gap-1">
                      <Calendar
                        aria-hidden="true"
                        className="h-3.5 w-3.5 text-primary"
                      />
                      Dọn vào:{' '}
                      <strong className="text-fg">{formattedDate}</strong>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Users
                        aria-hidden="true"
                        className="h-3.5 w-3.5 text-primary"
                      />
                      Số người:{' '}
                      <strong className="text-fg">{item.occupants}</strong>
                    </span>
                    <span>
                      Gói: <strong className="text-fg">{duration} tháng</strong>
                    </span>
                    {rent > 0 && (
                      <span>
                        Giá thuê:{' '}
                        <strong className="text-fg">
                          {formatVnd(rent)} ₫/tháng
                        </strong>
                      </span>
                    )}
                    {deposit > 0 && (
                      <span>
                        Cọc:{' '}
                        <strong className="text-fg">
                          {formatVnd(deposit)} ₫
                        </strong>
                      </span>
                    )}
                  </div>

                  {item.notes && (
                    <p className="text-xs text-muted italic line-clamp-1">
                      &quot;{item.notes}&quot;
                    </p>
                  )}

                  {isRejected && item.reasonCode && (
                    <p className="text-xs text-danger">
                      Lý do từ chối:{' '}
                      <strong>
                        {getApplicationReasonLabel(item.reasonCode)}
                      </strong>
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {isPending ? (
                    <Button
                      size="sm"
                      onClick={() => handleOpenDetail(item)}
                      className="flex items-center gap-1.5 bg-control text-on-control shadow-sm hover:opacity-90 cursor-pointer"
                      data-testid={`review-btn-${item._id}`}
                    >
                      <Eye aria-hidden="true" className="h-4 w-4" />
                      <span>Thẩm định hồ sơ</span>
                    </Button>
                  ) : isAccepted && item.contractId ? (
                    <Button
                      asChild
                      size="sm"
                      className="flex items-center gap-1.5 bg-primary text-on-control shadow-sm hover:opacity-90"
                    >
                      <Link href={`/contracts/${item.contractId}` as Route}>
                        <FileSignature aria-hidden="true" className="h-4 w-4" />
                        <span>Xem hợp đồng số</span>
                      </Link>
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleOpenDetail(item)}
                      className="flex items-center gap-1.5 border-border text-xs cursor-pointer"
                    >
                      <Eye aria-hidden="true" className="h-4 w-4" />
                      <span>Chi tiết</span>
                    </Button>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
