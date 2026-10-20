'use client'

import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import { Button } from '@/shared/ui/button'
import {
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  Building,
  ExternalLink,
} from 'lucide-react'
import type { RecommendationResult } from '@/features/ai-recommendation'

interface FeaturedApartmentsProps {
  results: RecommendationResult[]
  isLoading: boolean
  likedIds: Record<string | number, 'like' | 'dislike'>
  hasSubmitted: boolean
  handleFeedback: (
    id: string | number,
    type: 'like' | 'dislike'
  ) => Promise<void>
  onOpenSurvey: () => void
  isAuthenticated: boolean
}

export function FeaturedApartments({
  results,
  isLoading,
  likedIds,
  hasSubmitted,
  handleFeedback,
  onOpenSurvey,
  isAuthenticated,
}: FeaturedApartmentsProps): React.ReactElement {
  // Format currency helpers
  const formatVnd = (num: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(num)
  }

  // Get score color
  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-[#6B8E4E]'
    if (score >= 60) return 'bg-[#E9A23B]'
    return 'bg-[#9F3F2A]'
  }

  const displayedResults = results.slice(0, 3)

  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:px-10 relative z-20">
      <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#9F3F2A] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#E9A23B] fill-[#E9A23B]/20" />
            Đề xuất cá nhân hoá cho bạn
          </span>
          <h2 className="mt-3 font-marketing text-3xl font-bold text-fg">
            Căn hộ AI gợi ý phù hợp nhất
          </h2>
        </div>
        <div className="mt-4 flex items-center gap-4 md:mt-0">
          {hasSubmitted && (
            <button
              type="button"
              onClick={onOpenSurvey}
              className="text-xs font-bold text-[#9F3F2A] hover:text-[#833221] underline cursor-pointer"
            >
              Thay đổi khảo sát
            </button>
          )}
          <Link
            href={'/properties' as Route}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#9F3F2A] hover:underline"
          >
            Xem tất cả căn hộ
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </div>

      {isLoading ? (
        // Premium Loading Skeletons
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className="overflow-hidden rounded-3xl border border-[#E3D8D0]/60 bg-white/50 p-1 animate-pulse"
            >
              <div className="h-48 w-full bg-[#E3D8D0]/30 rounded-2xl" />
              <div className="p-6 space-y-4">
                <div className="h-4 w-2/3 bg-[#E3D8D0]/40 rounded" />
                <div className="h-5 w-1/2 bg-[#E3D8D0]/40 rounded" />
                <div className="space-y-2 pt-2 border-t border-[#E3D8D0]/20">
                  <div className="h-3 w-full bg-[#E3D8D0]/30 rounded" />
                  <div className="h-3 w-4/5 bg-[#E3D8D0]/30 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : !hasSubmitted ? (
        // Survey Not Taken State
        <div className="bg-[#FFFDF9] border border-[#E3D8D0] rounded-3xl p-12 text-center space-y-4 max-w-xl mx-auto shadow-sm">
          <div className="w-12 h-12 rounded-full bg-[#9F3F2A]/5 flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6 text-[#9F3F2A]" />
          </div>
          <h3 className="text-base font-bold text-[#9F3F2A] font-display">
            Tìm căn hộ phù hợp với nhu cầu và túi tiền của bạn
          </h3>
          <p className="text-xs text-[#8A7968] font-body leading-relaxed">
            Bạn chưa thực hiện khảo sát gợi ý. Chỉ cần dành 1 phút cung cấp độ
            tuổi, mức thu nhập hàng tháng và khu vực mong muốn, hệ thống Trí tuệ
            Nhân tạo (AI) sẽ tự động tính toán, đối chiếu để tìm ra những căn hộ
            thuê có chi phí hợp lý và tiện ích phù hợp nhất với bạn.
          </p>
          <Button
            onClick={onOpenSurvey}
            className="rounded-full bg-[#9F3F2A] hover:bg-[#833221] text-white font-bold text-xs px-6 py-2.5 transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            Bắt đầu khảo sát (Mất 1 phút)
          </Button>
        </div>
      ) : displayedResults.length === 0 ? (
        // Empty State
        <div className="bg-[#FFFDF9] border border-[#E3D8D0] rounded-3xl p-12 text-center space-y-4 max-w-xl mx-auto shadow-sm">
          <Building className="w-12 h-12 text-[#8A7968]/60 mx-auto stroke-[1.5]" />
          <h3 className="text-base font-bold text-fg font-display">
            Chưa tìm thấy căn hộ phù hợp hoàn toàn
          </h3>
          <p className="text-xs text-[#8A7968] font-body leading-relaxed">
            Hệ thống chưa tìm thấy căn hộ nào khớp với các thông số bạn đã chọn.
            Hãy thử thay đổi thông tin khảo sát (ví dụ như tăng mức thu nhập tối
            đa, chọn thêm các quận lân cận hoặc bỏ bớt các yêu cầu chưa thực sự
            cần thiết) để AI có thể tìm kiếm và đề xuất nhiều kết quả hơn cho
            bạn.
          </p>
          <Button
            onClick={onOpenSurvey}
            className="rounded-full bg-[#9F3F2A] hover:bg-[#833221] text-white font-bold text-xs px-6 cursor-pointer"
          >
            Thay đổi thông tin khảo sát
          </Button>
        </div>
      ) : (
        // Dynamic Recommendation Cards
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {displayedResults.map(apt => (
            <div
              key={apt.id}
              className="group overflow-hidden rounded-3xl border border-[#E3D8D0] bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#9F3F2A]/30 flex flex-col justify-between"
            >
              {/* Card Image Area with Match Score and Tags */}
              <div className="relative h-48 w-full bg-gradient-to-br from-[#faf7f2] to-[#e3d8d0]/40 flex items-center justify-center overflow-hidden">
                <span className="font-marketing text-lg font-bold text-[#8A7968]/70 px-4 text-center line-clamp-1">
                  {apt.name}
                </span>

                {/* Match Score Badge */}
                <div className="absolute left-4 top-4 flex gap-2">
                  <span
                    className={`rounded-full px-3 py-1 font-display text-[10px] font-bold uppercase tracking-wider text-white shadow-sm flex items-center gap-1 ${getScoreBg(
                      apt.match_score
                    )}`}
                  >
                    <Sparkles className="w-3 h-3 text-white fill-white/10" />
                    {apt.match_score}% Khớp
                  </span>
                </div>
              </div>

              {/* Card Content Area */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#9F3F2A] uppercase block">
                    {apt.district} • {apt.rooms} Phòng ngủ
                  </span>
                  <h3 className="font-display text-base font-bold text-fg group-hover:text-[#9F3F2A] transition-colors line-clamp-1">
                    {apt.name}
                  </h3>
                </div>

                {/* Match Reasons List */}
                <div className="border-t border-[#E3D8D0]/60 pt-3">
                  <span className="text-[10px] font-bold uppercase text-[#8A7968] block mb-1">
                    Ưu thế vượt trội:
                  </span>
                  <ul className="space-y-1">
                    {apt.reasons.slice(0, 2).map((reason, index) => (
                      <li
                        key={index}
                        className="text-xs text-fg/85 flex items-start gap-1.5 font-body line-clamp-1"
                      >
                        <span className="text-[#6B8E4E] font-bold shrink-0">
                          •
                        </span>
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing & Footer Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-[#E3D8D0]/30">
                  <div>
                    <span className="block font-body text-[10px] text-[#8A7968]">
                      Giá thuê
                    </span>
                    <span className="font-display text-lg font-bold text-[#9F3F2A]">
                      {formatVnd(apt.rent_price)}
                      <span className="text-xs text-[#8A7968] font-normal">
                        /th
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Feedback Buttons (chỉ khi đã đăng nhập) */}
                    {isAuthenticated && (
                      <>
                        <Button
                          size="icon"
                          variant="outline"
                          className={`w-8 h-8 rounded-full ${
                            likedIds[apt.id] === 'like'
                              ? 'bg-[#6B8E4E] border-[#6B8E4E] text-white hover:bg-[#6B8E4E]'
                              : 'border-[#E3D8D0] text-[#8A7968] hover:bg-[#E3D8D0]/10'
                          }`}
                          onClick={() => handleFeedback(apt.id, 'like')}
                          disabled={likedIds[apt.id] !== undefined}
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          className={`w-8 h-8 rounded-full ${
                            likedIds[apt.id] === 'dislike'
                              ? 'bg-[#9F3F2A] border-[#9F3F2A] text-white hover:bg-[#9F3F2A]'
                              : 'border-[#E3D8D0] text-[#8A7968] hover:bg-[#E3D8D0]/10'
                          }`}
                          onClick={() => handleFeedback(apt.id, 'dislike')}
                          disabled={likedIds[apt.id] !== undefined}
                        >
                          <ThumbsDown className="w-3.5 h-3.5" />
                        </Button>
                      </>
                    )}

                    <Link href={`/properties/${apt.id}` as Route}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 rounded-full border-[#9F3F2A] text-[#9F3F2A] hover:bg-[#9F3F2A] hover:text-white transition-colors text-xs font-bold flex items-center gap-1 ml-1"
                      >
                        Chi tiết
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
