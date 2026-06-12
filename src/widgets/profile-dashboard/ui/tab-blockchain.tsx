'use client'

import * as React from 'react'
import { Badge } from '@/shared/ui/badge'
import { Card } from '@/shared/ui/card'
import { UseProfileReturn } from '../model/use-profile'
import { Database, Clock, Copy, Shield } from 'lucide-react'

interface TabBlockchainProps {
  profile: UseProfileReturn
}

export function TabBlockchain({
  profile,
}: TabBlockchainProps): React.ReactElement {
  const { blockchainLogs, handleCopyText } = profile

  return (
    <div className="space-y-6 mt-0 outline-none">
      <Card className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <div className="space-y-1.5 text-left">
          <h3 className="font-marketing text-base font-bold text-fg flex items-center gap-2">
            <Database className="h-4 w-4 text-primary" />
            Nhật ký mật mã chuỗi khối (Blockchain Ledger Log)
          </h3>
          <p className="font-body text-xs text-muted leading-relaxed">
            Các giao dịch hợp đồng thuê nhà được băm bảo mật và cập nhật bất
            biến lên Blockchain để đối chiếu và bảo vệ thông tin pháp lý của
            bạn.
          </p>
        </div>

        {/* Node timeline representation */}
        <div className="space-y-4 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-border/60 text-left">
          {blockchainLogs.map(log => (
            <div key={log.id} className="relative pl-10 space-y-2 group">
              {/* Node point */}
              <div className="absolute left-2.5 top-5 h-3.5 w-3.5 rounded-full bg-white border-2 border-success flex items-center justify-center shadow-sm -translate-x-1/2 z-10 transition-transform group-hover:scale-110">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
              </div>

              <div className="border border-border rounded-2xl p-4 bg-white hover:border-border-strong hover:shadow-sm transition-all space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/50 pb-2">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="text-[9px] font-mono py-0.5 bg-success-soft text-success border-success/20"
                    >
                      NODE VERIFIED
                    </Badge>
                    <h4 className="font-display text-xs font-bold text-fg uppercase tracking-wider">
                      {log.event}
                    </h4>
                  </div>
                  <span className="font-body text-[10px] text-muted flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-subtle" />
                    {log.timestamp}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 font-mono text-[11px] text-muted overflow-hidden">
                    <span className="shrink-0 text-[10px] font-sans text-subtle">
                      TX HASH:
                    </span>
                    <span
                      className="truncate text-primary font-medium"
                      title={log.hash}
                    >
                      {log.hash}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyText(log.hash)}
                      className="text-subtle hover:text-fg transition-colors shrink-0"
                      title="Sao chép Tx Hash"
                    >
                      <Copy className="h-3 w-3" />
                    </button>
                  </div>
                  <Badge
                    variant="outline"
                    className="gap-1 py-0.5 font-mono bg-success-soft text-success border-success/20"
                  >
                    <Shield className="h-3 w-3" />
                    Block Mined
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
