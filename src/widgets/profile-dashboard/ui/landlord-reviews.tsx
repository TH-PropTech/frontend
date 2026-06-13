'use client'

import * as React from 'react'
import { Card } from '@/shared/ui/card'
import { Star, MessageSquare } from 'lucide-react'
import { DEMO_TENANT_REVIEW } from '../model/mock-data'

export function LandlordReviews(): React.ReactElement {
  const review = DEMO_TENANT_REVIEW

  return (
    <Card className="bg-white border border-border rounded-3xl p-6 shadow-sm text-left space-y-4">
      <div className="flex items-center gap-2 border-b border-border/50 pb-3">
        <MessageSquare className="h-4.5 w-4.5 text-primary" />
        <h4 className="font-marketing text-sm font-bold text-fg">
          Đánh giá & Phản hồi từ khách thuê
        </h4>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left column: overall score */}
        <div className="flex flex-col items-center justify-center bg-surface-muted/30 rounded-2xl p-5 shrink-0 md:w-36 text-center space-y-1">
          <span className="text-3xl font-extrabold text-fg font-mono leading-none">
            {review.overall}
          </span>
          <span className="text-[10px] text-muted font-bold uppercase block">
            Điểm trung bình
          </span>
          <div className="flex gap-0.5 text-warning pt-0.5">
            {[1, 2, 3, 4, 5].map(star => (
              <Star
                key={star}
                className={`h-3 w-3 ${star <= Math.round(review.overall) ? 'fill-current' : 'text-subtle'}`}
              />
            ))}
          </div>
        </div>

        {/* Right column: detailed criteria */}
        <div className="flex-1 grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center justify-between bg-surface/40 border border-border/50 rounded-xl p-3">
            <span className="text-muted font-medium">Phản hồi (Tốc độ)</span>
            <span className="font-bold text-fg font-mono">
              {review.ratings.responsiveness.toFixed(1)}
            </span>
          </div>
          <div className="flex items-center justify-between bg-surface/40 border border-border/50 rounded-xl p-3">
            <span className="text-muted font-medium">Chất lượng phòng</span>
            <span className="font-bold text-fg font-mono">
              {review.ratings.quality.toFixed(1)}
            </span>
          </div>
          <div className="flex items-center justify-between bg-surface/40 border border-border/50 rounded-xl p-3">
            <span className="text-muted font-medium">Hỗ trợ kỹ thuật</span>
            <span className="font-bold text-fg font-mono">
              {review.ratings.maintenance.toFixed(1)}
            </span>
          </div>
          <div className="flex items-center justify-between bg-surface/40 border border-border/50 rounded-xl p-3">
            <span className="text-muted font-medium">Cam kết hợp đồng</span>
            <span className="font-bold text-fg font-mono">
              {review.ratings.commitment.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-surface/50 border border-border/60 rounded-2xl p-4 text-xs space-y-1">
        <div className="flex justify-between items-center text-[10px]">
          <span className="font-bold text-fg">{review.author}</span>
          <span className="text-muted">{review.date}</span>
        </div>
        <p className="text-muted font-body leading-relaxed italic">
          &ldquo;{review.comment}&rdquo;
        </p>
      </div>
    </Card>
  )
}
