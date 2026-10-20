'use client'

import * as React from 'react'
import { Cpu, Sparkles, BookOpen } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { EngineConfigForm } from '@/features/recommendation-engine-config'

export function RecommendationEngineView(): React.ReactElement {
  return (
    <div className="space-y-5">
      {/* ═══ VIEW HEADER ═══ */}
      <Card className="border-border bg-surface shadow-xs">
        <CardHeader className="p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-primary-soft text-primary rounded-lg">
                  <Cpu className="w-5 h-5" />
                </div>
                <CardTitle className="text-base sm:text-lg font-bold text-fg font-marketing">
                  Cấu hình gợi ý căn hộ bằng AI
                </CardTitle>
                <Badge
                  variant="outline"
                  className="text-[10px] text-accent border-accent/30 bg-accent-soft/30 uppercase tracking-wider font-bold"
                >
                  Quản trị viên
                </Badge>
              </div>
              <CardDescription className="text-xs text-muted max-w-2xl leading-relaxed">
                Chọn cách hệ thống chấm điểm và gợi ý căn hộ cho khách thuê, và
                chỉnh mức độ tin vào dữ liệu hay quy tắc. Đổi xong áp dụng ngay,
                không cần cập nhật lại ứng dụng.
              </CardDescription>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
              <Badge
                variant="secondary"
                className="gap-1.5 py-1 px-2.5 text-xs font-normal"
              >
                <BookOpen className="w-3.5 h-3.5 text-primary" />
                <span>Đề tài KLTN</span>
              </Badge>
              <Badge
                variant="outline"
                className="gap-1.5 py-1 px-2.5 text-xs text-primary border-primary/30 bg-primary-soft/40 font-semibold"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Tự học lại ngay</span>
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* ═══ ENGINE CONFIG FORM ═══ */}
      <EngineConfigForm />
    </div>
  )
}
