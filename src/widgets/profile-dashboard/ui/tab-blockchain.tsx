'use client'

import * as React from 'react'
import { Badge } from '@/shared/ui/badge'
import { Card } from '@/shared/ui/card'
import { UseProfileReturn } from '../model/use-profile'
import { EVENT_LABELS } from '../model/mock-data'
import type { EventType } from '../model/types'
import {
  Clock,
  Copy,
  CheckCircle2,
  FileText,
  ChevronDown,
  UserCheck,
  Banknote,
  PenTool,
  Landmark,
  KeyRound,
  FileCheck2,
  Wrench,
  File,
} from 'lucide-react'

interface TabBlockchainProps {
  profile: UseProfileReturn
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  'file-text': FileText,
  'user-check': UserCheck,
  banknote: Banknote,
  'pen-tool': PenTool,
  landmark: Landmark,
  'key-round': KeyRound,
  'file-check-2': FileCheck2,
  wrench: Wrench,
}

function getEventIcon(
  iconName: string
): React.ComponentType<{ className?: string }> {
  return ICON_MAP[iconName] ?? File
}

export function TabBlockchain({
  profile,
}: TabBlockchainProps): React.ReactElement {
  const { blockchainLogs, handleCopyText } = profile
  const [expandedId, setExpandedId] = React.useState<string | null>(null)

  const toggleExpand = (id: string): void => {
    setExpandedId(prev => (prev === id ? null : id))
  }

  return (
    <div className="space-y-5 mt-0 outline-none">
      <Card className="bg-white border border-border rounded-3xl p-5 md:p-6 shadow-sm space-y-4">
        <div className="space-y-1.5 text-left">
          <h3 className="font-marketing text-base font-bold text-fg flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            Nhật ký giao dịch
          </h3>
          <p className="font-body text-xs text-muted leading-relaxed">
            Tất cả hoạt động quan trọng trong hợp đồng thuê nhà (đặt cọc, ký hợp
            đồng, bàn giao, thanh toán…) đều được ghi nhận và bảo vệ an toàn,
            không thể sửa đổi hay giả mạo.
          </p>
        </div>

        {/* Timeline */}
        {blockchainLogs.length === 0 ? (
          <div className="py-12 border border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-2 text-center bg-surface-muted/10">
            <FileText className="h-8 w-8 text-muted/50" />
            <p className="font-semibold text-fg text-sm">
              Chưa có nhật ký giao dịch
            </p>
            <p className="text-xs text-muted max-w-sm">
              Các mốc giao dịch (đặt cọc, ký hợp đồng, thanh toán, bàn giao) sẽ
              tự động được lưu vết chống sửa đổi tại đây.
            </p>
          </div>
        ) : (
          <div className="space-y-4 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-border/60 text-left">
            {blockchainLogs.map(log => {
              const config = EVENT_LABELS[log.event as EventType]
              const label = config?.label ?? log.event
              const IconComponent = getEventIcon(config?.iconName ?? '')
              const isExpanded = expandedId === log.id
              const details = config?.details ?? []

              return (
                <div key={log.id} className="relative pl-10 space-y-2 group">
                  {/* Node point */}
                  <div className="absolute left-2.5 top-5 h-3.5 w-3.5 rounded-full bg-white border-2 border-success flex items-center justify-center shadow-sm -translate-x-1/2 z-10 transition-transform group-hover:scale-110">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" />
                  </div>

                  <div className="border border-border rounded-2xl p-4 bg-white hover:border-border-strong hover:shadow-sm transition-all space-y-2.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/50 pb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-lg bg-primary-soft flex items-center justify-center shrink-0">
                          <IconComponent className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <h4 className="font-display text-xs font-bold text-fg">
                          {label}
                        </h4>
                      </div>
                      <span className="font-body text-[11px] text-muted flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-subtle" />
                        {log.timestamp}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2 font-mono text-[11px] text-muted overflow-hidden">
                        <span className="shrink-0 text-[11px] font-sans text-subtle">
                          Mã xác nhận:
                        </span>
                        <span
                          className="truncate text-primary font-medium"
                          title={log.hash}
                        >
                          {log.hash.substring(0, 12)}…
                          {log.hash.substring(log.hash.length - 8)}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyText(log.hash)}
                          className="p-1 text-subtle hover:text-fg transition-colors inline-flex items-center justify-center rounded shrink-0"
                          title="Sao chép mã xác nhận"
                          aria-label="Sao chép mã xác nhận"
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <Badge
                        variant="outline"
                        className="gap-1 py-0.5 bg-success-soft text-success border-success/20"
                      >
                        <CheckCircle2 className="h-3 w-3" />
                        Đã xác nhận
                      </Badge>
                    </div>

                    {/* Nút xem chi tiết */}
                    {details.length > 0 && (
                      <>
                        <button
                          type="button"
                          onClick={() => toggleExpand(log.id)}
                          className="flex items-center gap-1 text-[11px] font-semibold text-primary hover:text-primary/80 transition-colors pt-1"
                        >
                          <ChevronDown
                            className={`h-3.5 w-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                          />
                          {isExpanded
                            ? 'Ẩn chi tiết biên bản'
                            : 'Xem chi tiết biên bản lưu trữ'}
                        </button>

                        {isExpanded && (
                          <div className="bg-surface-muted/30 border border-border/50 rounded-xl p-3.5 space-y-2 mt-1 animate-in fade-in slide-in-from-top-1 duration-200">
                            <div className="flex items-center gap-1.5 pb-2 border-b border-border/40">
                              <FileText className="h-3.5 w-3.5 text-primary" />
                              <span className="text-[11px] font-bold text-fg uppercase tracking-wide">
                                Nội dung biên bản đã ghi nhận
                              </span>
                            </div>
                            {details.map((d, i) => (
                              <div
                                key={i}
                                className="flex flex-col sm:flex-row sm:items-start gap-0.5 sm:gap-3 text-[11px] py-1 border-b border-border/20 last:border-0 last:pb-0"
                              >
                                <span className="text-muted font-medium shrink-0 sm:w-[140px]">
                                  {d.field}:
                                </span>
                                <span className="text-fg font-semibold">
                                  {d.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </Card>
    </div>
  )
}
