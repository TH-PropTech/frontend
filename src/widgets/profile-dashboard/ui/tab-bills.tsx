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

interface TabBillsProps {
  profile: UseProfileReturn
}

export function TabBills({ profile }: TabBillsProps): React.ReactElement {
  const { role, bills, firstMonthPaid, handleCopyText } = profile

  return (
    <div className="space-y-8 mt-0 outline-none">
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
          {role === 'tenant' ? (
            /* Bar Chart for Tenant */
            <svg className="w-full h-full max-w-lg" viewBox="0 0 400 200">
              <line
                x1="40"
                y1="20"
                x2="40"
                y2="160"
                stroke="#E5E9F0"
                strokeWidth="2"
              />
              <line
                x1="40"
                y1="160"
                x2="380"
                y2="160"
                stroke="#E5E9F0"
                strokeWidth="2"
              />
              <line
                x1="40"
                y1="55"
                x2="380"
                y2="55"
                stroke="#E5E9F0"
                strokeWidth="1"
                strokeDasharray="4"
              />
              <line
                x1="40"
                y1="90"
                x2="380"
                y2="90"
                stroke="#E5E9F0"
                strokeWidth="1"
                strokeDasharray="4"
              />
              <line
                x1="40"
                y1="125"
                x2="380"
                y2="125"
                stroke="#E5E9F0"
                strokeWidth="1"
                strokeDasharray="4"
              />

              <text
                x="30"
                y="60"
                textAnchor="end"
                fill="#A49389"
                className="text-[9px] font-mono"
              >
                18M
              </text>
              <text
                x="30"
                y="95"
                textAnchor="end"
                fill="#A49389"
                className="text-[9px] font-mono"
              >
                5M
              </text>
              <text
                x="30"
                y="130"
                textAnchor="end"
                fill="#A49389"
                className="text-[9px] font-mono"
              >
                1M
              </text>
              <text
                x="30"
                y="165"
                textAnchor="end"
                fill="#A49389"
                className="text-[9px] font-mono"
              >
                0
              </text>

              <rect
                x="70"
                y="55"
                width="45"
                height="105"
                rx="4"
                fill="#C65A3A"
                className="hover:opacity-90 transition-opacity cursor-pointer"
              />
              <text
                x="92.5"
                y="45"
                textAnchor="middle"
                fill="#C65A3A"
                className="text-[10px] font-bold"
              >
                18.0M
              </text>
              <text
                x="92.5"
                y="180"
                textAnchor="middle"
                fill="#2E3440"
                className="text-[9px] font-semibold"
              >
                Tiền nhà
              </text>

              <rect
                x="150"
                y="145"
                width="45"
                height="15"
                rx="4"
                fill="#EBCB8B"
                className="hover:opacity-90 transition-opacity cursor-pointer"
              />
              <text
                x="172.5"
                y="135"
                textAnchor="middle"
                fill="#D08770"
                className="text-[10px] font-bold"
              >
                850k
              </text>
              <text
                x="172.5"
                y="180"
                textAnchor="middle"
                fill="#2E3440"
                className="text-[9px] font-semibold"
              >
                Tiền điện
              </text>

              <rect
                x="230"
                y="155"
                width="45"
                height="5"
                rx="4"
                fill="#88C0D0"
                className="hover:opacity-90 transition-opacity cursor-pointer"
              />
              <text
                x="252.5"
                y="145"
                textAnchor="middle"
                fill="#5E81AC"
                className="text-[10px] font-bold"
              >
                250k
              </text>
              <text
                x="252.5"
                y="180"
                textAnchor="middle"
                fill="#2E3440"
                className="text-[9px] font-semibold"
              >
                Tiền nước
              </text>

              <rect
                x="310"
                y="152"
                width="45"
                height="8"
                rx="4"
                fill="#A3BE8C"
                className="hover:opacity-90 transition-opacity cursor-pointer"
              />
              <text
                x="332.5"
                y="142"
                textAnchor="middle"
                fill="#5E81AC"
                className="text-[10px] font-bold"
              >
                450k
              </text>
              <text
                x="332.5"
                y="180"
                textAnchor="middle"
                fill="#2E3440"
                className="text-[9px] font-semibold"
              >
                Phí QL
              </text>
            </svg>
          ) : (
            /* Area Chart for Landlord */
            <svg className="w-full h-full max-w-lg" viewBox="0 0 400 200">
              <line
                x1="45"
                y1="20"
                x2="45"
                y2="160"
                stroke="#E5E9F0"
                strokeWidth="2"
              />
              <line
                x1="45"
                y1="160"
                x2="380"
                y2="160"
                stroke="#E5E9F0"
                strokeWidth="2"
              />
              <line
                x1="45"
                y1="50"
                x2="380"
                y2="50"
                stroke="#E5E9F0"
                strokeWidth="1"
                strokeDasharray="4"
              />
              <line
                x1="45"
                y1="100"
                x2="380"
                y2="100"
                stroke="#E5E9F0"
                strokeWidth="1"
                strokeDasharray="4"
              />

              <text
                x="35"
                y="55"
                textAnchor="end"
                fill="#A49389"
                className="text-[9px] font-mono"
              >
                20M
              </text>
              <text
                x="35"
                y="105"
                textAnchor="end"
                fill="#A49389"
                className="text-[9px] font-mono"
              >
                10M
              </text>
              <text
                x="35"
                y="165"
                textAnchor="end"
                fill="#A49389"
                className="text-[9px] font-mono"
              >
                0
              </text>

              <path
                d="M 65 160 L 65 60 L 125 60 L 185 62 L 245 60 L 305 60 L 365 72 L 365 160 Z"
                fill="rgba(198, 90, 58, 0.1)"
              />
              <path
                d="M 65 60 L 125 60 L 185 62 L 245 60 L 305 60 L 365 72"
                fill="none"
                stroke="#C65A3A"
                strokeWidth="3"
              />

              <circle cx="65" cy="60" r="4" fill="#C65A3A" />
              <circle cx="125" cy="60" r="4" fill="#C65A3A" />
              <circle cx="185" cy="62" r="4" fill="#C65A3A" />
              <circle cx="245" cy="60" r="4" fill="#C65A3A" />
              <circle cx="305" cy="60" r="4" fill="#C65A3A" />
              <circle cx="365" cy="72" r="4" fill="#C65A3A" />

              <text
                x="65"
                y="45"
                textAnchor="middle"
                fill="#C65A3A"
                className="text-[9px] font-bold"
              >
                18M
              </text>
              <text
                x="125"
                y="45"
                textAnchor="middle"
                fill="#C65A3A"
                className="text-[9px] font-bold"
              >
                18M
              </text>
              <text
                x="185"
                y="47"
                textAnchor="middle"
                fill="#C65A3A"
                className="text-[9px] font-bold"
              >
                17.7M
              </text>
              <text
                x="245"
                y="45"
                textAnchor="middle"
                fill="#C65A3A"
                className="text-[9px] font-bold"
              >
                18M
              </text>
              <text
                x="305"
                y="45"
                textAnchor="middle"
                fill="#C65A3A"
                className="text-[9px] font-bold"
              >
                18M
              </text>
              <text
                x="365"
                y="57"
                textAnchor="middle"
                fill="#C65A3A"
                className="text-[9px] font-bold"
              >
                15.5M
              </text>

              <text
                x="65"
                y="178"
                textAnchor="middle"
                fill="#2E3440"
                className="text-[9px] font-bold"
              >
                Th1
              </text>
              <text
                x="125"
                y="178"
                textAnchor="middle"
                fill="#2E3440"
                className="text-[9px] font-bold"
              >
                Th2
              </text>
              <text
                x="185"
                y="178"
                textAnchor="middle"
                fill="#2E3440"
                className="text-[9px] font-bold"
              >
                Th3
              </text>
              <text
                x="245"
                y="178"
                textAnchor="middle"
                fill="#2E3440"
                className="text-[9px] font-bold"
              >
                Th4
              </text>
              <text
                x="305"
                y="178"
                textAnchor="middle"
                fill="#2E3440"
                className="text-[9px] font-bold"
              >
                Th5
              </text>
              <text
                x="365"
                y="178"
                textAnchor="middle"
                fill="#2E3440"
                className="text-[9px] font-bold"
              >
                Th6
              </text>
            </svg>
          )}
        </div>
      </Card>

      {/* Table section (using generic Table UI components) */}
      <Card className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex justify-between items-center text-left">
          <h3 className="font-marketing text-base font-bold text-fg flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            {role === 'tenant'
              ? 'Danh sách hóa đơn thanh toán'
              : 'Quản lý dòng tiền & Doanh thu'}
          </h3>
          <span className="text-xs text-muted">
            Cập nhật theo Smart Contract
          </span>
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
                      Tiền thuê nhà tháng 6/2026 (Giải tỏa về ví)
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
                        {firstMonthPaid ? 'Đã thu về ví' : 'Chờ khách đóng'}
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
