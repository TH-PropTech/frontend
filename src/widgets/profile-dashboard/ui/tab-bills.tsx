'use client'

import * as React from 'react'
import { Button } from '@/shared/ui/button'
import { Badge } from '@/shared/ui/badge'
import { Card } from '@/shared/ui/card'
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/shared/ui/table'
import { UseProfileReturn } from '../model/use-profile'
import { toast } from 'sonner'
import {
  TrendingUp,
  Download,
  FileText,
  RefreshCw,
  AlertCircle,
} from 'lucide-react'

import { TenantBillsChart } from './components/tenant-bills-chart'
import { LandlordBillsChart } from './components/landlord-bills-chart'
import { LandlordRevenueChart } from './components/landlord-revenue-chart'
import { CASHFLOW_STATUS, LandlordCashflowRows } from './landlord-cashflow-rows'
import { useLandlordCashflow } from '../model/use-landlord-cashflow'
import {
  cashflowCsv,
  countCashflow,
  filterCashflow,
  paginate,
  type CashflowFilter,
} from '../model/landlord-cashflow'
import { CashflowFilterChips, CashflowPager } from './landlord-cashflow-pager'
import { buildMonthlyCostBreakdown } from '../model/cost-breakdown'
import { formatDate } from '../lib/format-date'
import { TechnicalDetails } from './components/technical-details'

interface TabBillsProps {
  profile: UseProfileReturn
}

export function TabBills({ profile }: TabBillsProps): React.ReactElement {
  const {
    role,
    bills,
    handleCopyText,
    portfolio,
    liveContract,
    billsStatus = 'ready',
    retryBills,
  } = profile
  const live = role === 'landlord' && portfolio.isLive
  const cashflow = useLandlordCashflow(portfolio)
  const [filter, setFilter] = React.useState<CashflowFilter>('all')
  const [page, setPage] = React.useState(1)
  const filtered = React.useMemo(
    () => filterCashflow(cashflow.rows, filter),
    [cashflow.rows, filter]
  )
  const counts = React.useMemo(
    () => countCashflow(cashflow.rows),
    [cashflow.rows]
  )
  const current = paginate(filtered, page)

  const costBreakdown = React.useMemo(
    () => buildMonthlyCostBreakdown(liveContract, bills),
    [liveContract, bills]
  )

  const handleExport = (): void => {
    if (role === 'tenant') {
      if (bills.length === 0) {
        toast.info('Chưa có hóa đơn nào để xuất biên lai.')
        return
      }
      toast.success('Báo cáo tài chính đã được xuất tải xuống!', {
        description: 'Tệp PDF hóa đơn tháng này đã được lưu vào thiết bị.',
      })
      return
    }

    if (cashflow.rows.length === 0) {
      toast.info('Chưa có khoản thu nào để xuất.')
      return
    }
    const csv = cashflowCsv(cashflow.rows, st => CASHFLOW_STATUS[st].label)
    const url = URL.createObjectURL(
      new Blob([csv], { type: 'text/csv;charset=utf-8' })
    )
    const a = document.createElement('a')
    a.href = url
    a.download = `dong-tien-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Đã xuất dòng tiền ra tệp CSV.')
  }

  return (
    <div className="space-y-5 mt-0 outline-none">
      {/* Visual Financial Chart Card */}
      <Card className="bg-white border border-border rounded-3xl p-5 md:p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-left">
          <div className="space-y-1">
            <h3 className="font-marketing text-base font-bold text-fg flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              {role === 'tenant'
                ? 'Phân bổ chi phí thuê nhà hàng tháng'
                : 'Báo cáo doanh thu ròng tích lũy'}
            </h3>
            <p className="text-xs text-muted">
              {role === 'tenant'
                ? 'Tổng chi phí ước tính trung bình hàng tháng bao gồm tiền nhà và phí dịch vụ.'
                : 'Doanh thu thuần nhận được từ các căn hộ cho thuê sau khi trừ chi phí.'}
            </p>
          </div>
          <Button
            type="button"
            onClick={handleExport}
            variant="secondary"
            className="h-9 text-xs rounded-full px-4 border border-border flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <Download className="h-3.5 w-3.5" />
            {role === 'landlord' ? 'Xuất CSV dòng tiền' : 'Xuất biên lai PDF'}
          </Button>
        </div>

        {/* SVG Chart Section */}
        <div className="min-h-64 border border-border/60 bg-surface-muted/10 rounded-2xl flex items-center justify-center p-4">
          {role === 'tenant' ? (
            <TenantBillsChart breakdown={costBreakdown} />
          ) : live ? (
            <LandlordRevenueChart series={cashflow.series} />
          ) : (
            <LandlordBillsChart />
          )}
        </div>
      </Card>

      {/* Table section (using generic Table UI components) */}
      <Card className="bg-white border border-border rounded-3xl p-5 md:p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-left">
          <div className="space-y-1">
            <h3 className="font-marketing text-base font-bold text-fg flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              {role === 'tenant'
                ? 'Danh sách hóa đơn thanh toán'
                : 'Quản lý dòng tiền & Doanh thu'}
            </h3>
            <p className="text-xs text-muted">
              Cập nhật theo Hợp đồng điện tử • Giao dịch được xử lý tự động qua
              đối tác thanh toán và cổng ngân hàng liên kết
            </p>
          </div>
        </div>

        {role === 'landlord' && (
          <CashflowFilterChips
            value={filter}
            counts={counts}
            onChange={next => {
              setFilter(next)
              setPage(1)
            }}
          />
        )}

        <div className="overflow-x-auto -mx-2 px-2 scrollbar-thin">
          <Table className="w-full text-left border-collapse text-xs min-w-[650px]">
            <TableHeader>
              <TableRow className="bg-surface-muted/30 border-b border-border text-muted uppercase font-semibold">
                <TableHead className="p-4">
                  {role === 'tenant' ? 'Hóa đơn' : 'Khoản thu'}
                </TableHead>
                <TableHead className="p-4">
                  {role === 'tenant' ? 'Hạn thanh toán' : 'Thời gian nhận'}
                </TableHead>
                <TableHead className="p-4">Số tiền</TableHead>
                <TableHead className="p-4">Trạng thái</TableHead>
                <TableHead className="p-4">Mã giao dịch lưu vết</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {role === 'tenant' ? (
                billsStatus === 'loading' ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="py-12 text-center border-none"
                    >
                      <div className="flex flex-col items-center justify-center gap-2 text-muted">
                        <RefreshCw className="h-6 w-6 animate-spin text-primary" />
                        <p className="text-xs">Đang tải danh sách hóa đơn...</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : billsStatus === 'error' ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="py-10 text-center border-none"
                    >
                      <div className="flex flex-col items-center justify-center gap-3">
                        <AlertCircle className="h-7 w-7 text-destructive" />
                        <p className="text-xs font-semibold text-destructive">
                          Không thể tải danh sách hóa đơn.
                        </p>
                        {retryBills && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={retryBills}
                            className="h-8 text-xs rounded-full gap-1.5"
                          >
                            <RefreshCw className="h-3.5 w-3.5" />
                            Thử lại
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : bills.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="py-12 text-center border-none"
                    >
                      <div className="flex flex-col items-center justify-center gap-2">
                        <FileText className="h-8 w-8 text-muted/50" />
                        <p className="font-semibold text-fg text-sm">
                          Chưa có hóa đơn nào phát sinh
                        </p>
                        <p className="text-xs text-muted max-w-sm">
                          Các khoản phí thuê nhà, điện nước và dịch vụ sẽ tự
                          động hiển thị tại đây khi tới kỳ thanh toán.
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  bills.map(b => (
                    <TableRow
                      key={b.id}
                      className="hover:bg-surface-muted/10 transition-colors"
                    >
                      <TableCell className="p-4 font-semibold text-fg flex items-center gap-1.5 border-none h-12">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        {b.title}
                      </TableCell>
                      <TableCell className="p-4 text-muted border-none">
                        {b.dueDate.includes('T') || b.dueDate.includes('-')
                          ? formatDate(b.dueDate)
                          : b.dueDate}
                      </TableCell>
                      <TableCell className="p-4 font-bold text-fg text-sm border-none">
                        {b.amount.toLocaleString('vi-VN')} VND
                      </TableCell>
                      <TableCell className="p-4 border-none">
                        <Badge
                          variant="outline"
                          className={`gap-1 py-0.5 ${
                            b.status === 'paid'
                              ? 'bg-success-soft text-success border-success/20'
                              : 'bg-destructive/10 text-destructive border-destructive/20 animate-pulse-subtle'
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${b.status === 'paid' ? 'bg-success' : 'bg-destructive animate-ping'}`}
                          />
                          {b.status === 'paid'
                            ? 'Đã thanh toán'
                            : 'Chưa thanh toán'}
                        </Badge>
                      </TableCell>
                      <TableCell className="p-4 border-none">
                        {b.txHash || b.contractCode ? (
                          <div className="flex flex-col gap-1 items-start">
                            {b.contractCode && (
                              <TechnicalDetails
                                value={b.contractCode}
                                label="Mã HĐ"
                              />
                            )}
                            {b.txHash && (
                              <TechnicalDetails
                                value={b.txHash}
                                label="Mã băm lưu vết"
                              />
                            )}
                          </div>
                        ) : (
                          <span className="text-muted/60 font-mono italic">
                            N/A
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )
              ) : (
                <LandlordCashflowRows
                  rows={current.items}
                  isLoading={cashflow.isLoading}
                  isError={cashflow.isError}
                  onCopy={handleCopyText}
                />
              )}
            </TableBody>
          </Table>
        </div>
        {role === 'landlord' && (
          <CashflowPager
            page={current.page}
            total={filtered.length}
            onPage={setPage}
          />
        )}
      </Card>
    </div>
  )
}
