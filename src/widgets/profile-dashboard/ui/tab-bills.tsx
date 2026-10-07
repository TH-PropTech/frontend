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
import { TrendingUp, Download, FileText, Copy } from 'lucide-react'

import { LandlordEscrow } from './landlord-escrow'
import { LandlordProfit } from './landlord-profit'
import { LandlordPayoutHistory } from './landlord-payout-history'
import { TenantBillsChart } from './components/tenant-bills-chart'
import { LandlordBillsChart } from './components/landlord-bills-chart'

interface TabBillsProps {
  profile: UseProfileReturn
}

export function TabBills({ profile }: TabBillsProps): React.ReactElement {
  const { role, bills, firstMonthPaid, handleCopyText } = profile

  return (
    <div className="space-y-6 mt-0 outline-none">
      {/* Landlord Financial Overviews */}
      {role === 'landlord' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LandlordEscrow />
            <LandlordProfit />
          </div>
          <LandlordPayoutHistory />
        </>
      )}

      {/* Visual Financial Chart Card */}
      <Card className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
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
            onClick={() => {
              toast.success('Báo cáo tài chính đã được xuất tải xuống!', {
                description:
                  'Tệp PDF hóa đơn tháng này đã được lưu vào thiết bị.',
              })
            }}
            variant="secondary"
            className="h-9 text-xs rounded-full px-4 border border-border flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <Download className="h-3.5 w-3.5" />
            Xuất biên lai PDF
          </Button>
        </div>

        {/* SVG Chart Section */}
        <div className="h-64 border border-border/60 bg-surface-muted/10 rounded-2xl flex items-center justify-center p-4">
          {role === 'tenant' ? <TenantBillsChart /> : <LandlordBillsChart />}
        </div>
      </Card>

      {/* Table section (using generic Table UI components) */}
      <Card className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-left">
          <div className="space-y-1">
            <h3 className="font-marketing text-base font-bold text-fg flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              {role === 'tenant'
                ? 'Danh sách hóa đơn thanh toán'
                : 'Quản lý dòng tiền & Doanh thu'}
            </h3>
            <p className="text-xs text-muted">
              Cập nhật theo Smart Contract • Giao dịch được xử lý tự động qua
              cổng ngân hàng liên kết Techcombank
            </p>
            <Badge variant="outline" className="mt-2 w-fit">
              Demo
            </Badge>
          </div>
        </div>

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
                <TableHead className="p-4">Giao dịch (Tx Hash)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {role === 'tenant' ? (
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
                      {b.dueDate}
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
                      {b.txHash ? (
                        <div className="flex items-center gap-1.5 font-mono text-primary max-w-[180px]">
                          <span className="truncate" title={b.txHash}>
                            {b.txHash}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopyText(b.txHash || '')}
                            className="text-subtle hover:text-fg transition-colors"
                            title="Sao chép Tx Hash"
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-muted/60 font-mono italic">
                          N/A
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                /* Landlord Bills/Income View */
                <>
                  <TableRow className="hover:bg-surface-muted/10 transition-colors">
                    <TableCell className="p-4 font-semibold text-fg flex items-center gap-1.5 border-none h-12">
                      <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse shrink-0" />
                      Tiền nhận ký quỹ đặt cọc (Smart Contract)
                    </TableCell>
                    <TableCell className="p-4 text-muted border-none">
                      10/06/2026
                    </TableCell>
                    <TableCell className="p-4 font-bold text-fg text-sm border-none">
                      18.000.000 VND
                    </TableCell>
                    <TableCell className="p-4 border-none">
                      <Badge
                        variant="outline"
                        className="gap-1 py-0.5 bg-success-soft text-success border-success/20"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-success" />
                        Đã ký quỹ (Khóa)
                      </Badge>
                    </TableCell>
                    <TableCell className="p-4 border-none">
                      <div className="flex items-center gap-1.5 font-mono text-primary max-w-[180px]">
                        <span className="truncate">
                          0x2d9a3b8e4f1a4e1272c41e8aa2206b7d
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            handleCopyText('0x2d9a3b8e4f1a4e1272c41e8aa2206b7d')
                          }
                          className="text-subtle hover:text-fg transition-colors"
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-surface-muted/10 transition-colors">
                    <TableCell className="p-4 font-semibold text-fg flex items-center gap-1.5 border-none h-12">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      Tiền thuê nhà tháng 6/2026 (Giải tỏa về tài khoản)
                    </TableCell>
                    <TableCell className="p-4 text-muted border-none">
                      {firstMonthPaid ? 'Vừa xong' : '05/07/2026'}
                    </TableCell>
                    <TableCell className="p-4 font-bold text-fg text-sm border-none">
                      18.000.000 VND
                    </TableCell>
                    <TableCell className="p-4 border-none">
                      <Badge
                        variant="outline"
                        className={`gap-1 py-0.5 ${
                          firstMonthPaid
                            ? 'bg-success-soft text-success border-success/20'
                            : 'bg-destructive/10 text-destructive border-destructive/20'
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${firstMonthPaid ? 'bg-success' : 'bg-destructive'}`}
                        />
                        {firstMonthPaid
                          ? 'Đã nhận tài khoản'
                          : 'Chờ khách đóng'}
                      </Badge>
                    </TableCell>
                    <TableCell className="p-4 border-none">
                      {firstMonthPaid ? (
                        <div className="flex items-center gap-1.5 font-mono text-primary max-w-[180px]">
                          <span className="truncate">
                            0x3a2c91ba40fe93b8219c009d12d4109b
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              handleCopyText(
                                '0x3a2c91ba40fe93b8219c009d12d4109b'
                              )
                            }
                            className="text-subtle hover:text-fg transition-colors"
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-muted/60 font-mono italic">
                          N/A
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}
