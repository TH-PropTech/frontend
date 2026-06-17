'use client'

import * as React from 'react'
import { Brain, MapPin, ThumbsUp, ThumbsDown } from 'lucide-react'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'

export interface Recommendation {
  id: number
  name: string
  district: string
  rent_price: number
  rooms: number
  has_gym: boolean
  has_parking: boolean
  match_score: number
  confidence: string
  contributions: {
    location: number
    finance: number
    amenities: number
    demographics: number
  }
  reasons: string[]
}

interface KycRecommendationsProps {
  recommendations: Recommendation[]
  feedbackGiven: Record<number, 'like' | 'dislike'>
  handleFeedback: (id: number, type: 'like' | 'dislike') => void
  handleCloseAll: () => void
  formatCurrency: (value: number) => string
}

export function KycRecommendations({
  recommendations,
  feedbackGiven,
  handleFeedback,
  handleCloseAll,
  formatCurrency,
}: KycRecommendationsProps): React.ReactElement {
  return (
    <div className="max-w-2xl mx-auto w-full space-y-6 overflow-y-auto h-full pr-2 scrollbar-thin">
      <div className="border-b border-border pb-3 text-left">
        <h2 className="font-marketing text-lg font-bold text-fg flex items-center gap-2">
          <Brain className="h-5.5 w-5.5 text-primary" /> Gợi ý Căn hộ từ AI
          Recommender Engine
        </h2>
        <p className="text-xs text-muted mt-1">
          Dựa trên hồ sơ và sở thích của bạn, thuật toán học máy Naïve Bayes đã
          đề xuất các căn hộ phù hợp nhất.
        </p>
      </div>
      <div className="space-y-4">
        {recommendations.map((b, index) => {
          const isTop1 = index === 0
          return (
            <div
              key={b.id}
              className={`border rounded-2xl p-5 bg-white transition-all shadow-sm ${
                isTop1
                  ? 'border-primary/40 bg-gradient-to-br from-primary-soft/5 to-white ring-1 ring-primary/25'
                  : 'border-border'
              }`}
            >
              {isTop1 && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-full uppercase tracking-wider mb-3">
                  🏆 TOP 1 GỢI Ý
                </div>
              )}
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1 text-left">
                  <h4 className="font-marketing text-base font-bold text-fg">
                    {b.name}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-muted">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{b.district}, TP. Hồ Chí Minh</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <Badge
                    variant="outline"
                    className="font-mono text-xs py-0.5 px-2.5 rounded-full border bg-primary-soft text-primary border-primary/20"
                  >
                    {b.match_score}% Hợp
                  </Badge>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleFeedback(b.id, 'like')}
                      className={`p-1.5 border rounded-lg bg-surface transition-all cursor-pointer ${
                        feedbackGiven[b.id] === 'like'
                          ? 'text-success border-success bg-success-soft/20'
                          : 'hover:text-fg'
                      }`}
                    >
                      <ThumbsUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleFeedback(b.id, 'dislike')}
                      className={`p-1.5 border rounded-lg bg-surface transition-all cursor-pointer ${
                        feedbackGiven[b.id] === 'dislike'
                          ? 'text-danger border-danger bg-danger-soft/20'
                          : 'hover:text-fg'
                      }`}
                    >
                      <ThumbsDown className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-b border-border/60 py-3 my-3 text-left">
                <div>
                  <span className="text-[10px] text-muted font-bold uppercase block">
                    Giá thuê
                  </span>
                  <span className="font-mono text-sm font-bold text-primary">
                    {formatCurrency(b.rent_price)}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-muted font-bold uppercase block">
                    Thiết kế
                  </span>
                  <span className="text-xs font-semibold text-fg">
                    {b.rooms} PN
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-muted font-bold uppercase block">
                    Phòng Gym
                  </span>
                  <span className="text-xs font-semibold text-fg">
                    {b.has_gym ? 'Có' : 'Không'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-muted font-bold uppercase block">
                    Bãi đỗ xe
                  </span>
                  <span className="text-xs font-semibold text-fg">
                    {b.has_parking ? 'Có' : 'Không'}
                  </span>
                </div>
              </div>
              <div className="space-y-2 bg-surface/40 p-3 rounded-xl border border-border/40 text-left">
                <div className="flex justify-between items-center text-[10px] text-muted font-bold uppercase">
                  <span className="flex items-center gap-1">
                    <Brain className="h-3.5 w-3.5 text-primary" />
                    AI Decision Breakdown (XAI)
                  </span>
                  <span className="text-primary text-[10px]">
                    Độ tin cậy: {b.confidence}
                  </span>
                </div>
                <div className="space-y-1">
                  {[
                    {
                      l: 'Độ khớp Vị trí',
                      v: b.contributions.location,
                      c: 'bg-success text-success',
                    },
                    {
                      l: 'Độ khớp Tài chính',
                      v: b.contributions.finance,
                      c: 'bg-primary text-primary',
                    },
                    {
                      l: 'Độ khớp Tiện ích',
                      v: b.contributions.amenities,
                      c: 'bg-warning text-warning',
                    },
                  ].map(row => (
                    <div
                      className="grid grid-cols-[100px_1fr_40px] items-center gap-2"
                      key={row.l}
                    >
                      <span className="text-[9px] text-muted font-bold">
                        {row.l}
                      </span>
                      <div className="h-1.5 bg-surface-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full ${row.c.split(' ')[0]} rounded-full`}
                          style={{ width: `${row.v}%` }}
                        />
                      </div>
                      <span
                        className={`text-[9px] font-bold ${
                          row.c.split(' ')[1]
                        } text-right`}
                      >
                        {row.v}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="flex justify-end pt-4 border-t border-border shrink-0">
        <Button
          onClick={handleCloseAll}
          className="h-10 text-xs rounded-full font-bold px-8 cursor-pointer"
        >
          Hoàn tất & Quay lại trang cá nhân
        </Button>
      </div>
    </div>
  )
}
