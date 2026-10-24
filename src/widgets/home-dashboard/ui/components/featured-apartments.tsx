'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Route } from 'next'
import { Button } from '@/shared/ui/button'
import {
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  Building,
  ExternalLink,
  ShieldCheck,
  Eye,
  SlidersHorizontal,
} from 'lucide-react'
import type { RecommendationResult } from '@/features/ai-recommendation'
import type { FeaturedCard } from '../../model/home-apartment-stats'

const MAX_FEATURED_CARDS = 3

// The recommendation API does not report verification or VR availability,
// so those badges stay hidden rather than being assumed.
function toCardFromRecommendation(result: RecommendationResult): FeaturedCard {
  return {
    id: result.id,
    name: result.name,
    district: result.district,
    rent_price: result.rent_price,
    rooms: result.rooms,
    ...(result.image_url ? { image_url: result.image_url } : {}),
    reasons: result.reasons,
    match_score: result.match_score,
    isVerified: false,
    hasVr: false,
  }
}

interface FeaturedApartmentsProps {
  apartments: FeaturedCard[]
  isApartmentsLoading: boolean
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
  apartments,
  isApartmentsLoading,
  results,
  isLoading,
  likedIds,
  hasSubmitted,
  handleFeedback,
  onOpenSurvey,
  isAuthenticated,
}: FeaturedApartmentsProps): React.ReactElement {
  const formatVnd = (num: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(num)
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-[#6B8E4E]'
    if (score >= 60) return 'bg-[#E9A23B]'
    return 'bg-[#9F3F2A]'
  }

  const isAiRecommended = hasSubmitted && results.length > 0
  const displayedResults = (
    isAiRecommended ? results.map(toCardFromRecommendation) : apartments
  ).slice(0, MAX_FEATURED_CARDS)
  const isCatalogLoading = !hasSubmitted && isApartmentsLoading
  const isCatalogEmpty = !hasSubmitted && displayedResults.length === 0

  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:px-10 relative z-20">
      <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#9F3F2A] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#E9A23B] fill-[#E9A23B]/20" />
            {isAiRecommended
              ? 'Đề xuất cá nhân hoá cho bạn'
              : 'Bộ sưu tập căn hộ tuyển chọn'}
          </span>
          <h2 className="mt-2 font-marketing text-2xl sm:text-3xl font-bold text-fg">
            {isAiRecommended
              ? 'Căn hộ AI gợi ý phù hợp nhất'
              : 'Căn hộ nổi bật & minh bạch'}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          {hasSubmitted ? (
            <button
              type="button"
              onClick={onOpenSurvey}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9F3F2A] hover:text-[#833221] bg-white border border-[#E3D8D0] px-3.5 py-2 rounded-full shadow-sm hover:border-[#9F3F2A]/30 transition-all cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Thay đổi tiêu chí AI
            </button>
          ) : (
            <Button
              onClick={onOpenSurvey}
              className="rounded-full bg-[#9F3F2A] hover:bg-[#833221] text-white font-bold text-xs px-4 py-2 transition-all shadow-sm active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Gợi ý theo ngân sách
            </Button>
          )}
          <Link
            href={'/properties' as Route}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#9F3F2A] hover:underline"
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

      {/* AI Recommendation Banner Callout if not yet submitted */}
      {!hasSubmitted && (
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-[#FAF7F2] via-white to-[#FAF7F2] border border-[#E3D8D0] p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#9F3F2A]/10 border border-[#9F3F2A]/20 flex items-center justify-center shrink-0 text-[#9F3F2A]">
              <Sparkles className="w-5 h-5 text-[#9F3F2A]" />
            </div>
            <div>
              <h3 className="font-display text-sm sm:text-base font-bold text-fg">
                Tìm căn hộ phù hợp với nhu cầu và túi tiền của bạn
              </h3>
              <p className="font-body text-xs text-[#8A7968] mt-0.5 leading-relaxed">
                Chỉ cần 1 phút khảo sát, hệ thống AI sẽ tự động phân tích và đối
                chiếu để tìm ra những căn hộ tối ưu nhất cho bạn.
              </p>
            </div>
          </div>
          <Button
            onClick={onOpenSurvey}
            className="shrink-0 rounded-full bg-[#9F3F2A] hover:bg-[#833221] text-white font-bold text-xs px-5 py-2.5 transition-all shadow-sm active:scale-95 cursor-pointer whitespace-nowrap"
          >
            Bắt đầu khảo sát (Mất 1 phút)
          </Button>
        </div>
      )}

      {isLoading || isCatalogLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className="overflow-hidden rounded-3xl border border-[#E3D8D0]/60 bg-white/50 p-1 animate-pulse"
            >
              <div className="h-52 w-full bg-[#E3D8D0]/30 rounded-2xl" />
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
      ) : isCatalogEmpty ? (
        <div className="bg-[#FFFDF9] border border-[#E3D8D0] rounded-3xl p-10 text-center space-y-4 max-w-xl mx-auto shadow-sm">
          <Building className="w-12 h-12 text-[#8A7968]/60 mx-auto stroke-[1.5]" />
          <h3 className="text-base font-bold text-fg font-display">
            Chưa có căn hộ nào để hiển thị
          </h3>
          <p className="text-xs text-[#8A7968] font-body leading-relaxed">
            Hiện chưa có căn hộ đang cho thuê. Vui lòng quay lại sau hoặc xem
            toàn bộ danh sách căn hộ.
          </p>
        </div>
      ) : hasSubmitted && results.length === 0 ? (
        <div className="bg-[#FFFDF9] border border-[#E3D8D0] rounded-3xl p-10 text-center space-y-4 max-w-xl mx-auto shadow-sm">
          <Building className="w-12 h-12 text-[#8A7968]/60 mx-auto stroke-[1.5]" />
          <h3 className="text-base font-bold text-fg font-display">
            Chưa tìm thấy căn hộ phù hợp hoàn toàn
          </h3>
          <p className="text-xs text-[#8A7968] font-body leading-relaxed">
            Hệ thống chưa tìm thấy căn hộ nào khớp với các thông số bạn đã chọn.
            Hãy thử nới rộng khoảng ngân sách hoặc khu vực để AI có thể gợi ý
            nhiều kết quả hơn.
          </p>
          <Button
            onClick={onOpenSurvey}
            className="rounded-full bg-[#9F3F2A] hover:bg-[#833221] text-white font-bold text-xs px-6 py-2 cursor-pointer"
          >
            Thay đổi thông tin khảo sát
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayedResults.map(apt => (
            <div
              key={apt.id}
              className="group overflow-hidden rounded-3xl border border-[#E3D8D0] bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:border-[#9F3F2A]/30 flex flex-col justify-between"
            >
              {/* Card Image Area */}
              <div className="relative h-52 w-full bg-[#faf7f2] overflow-hidden">
                {apt.image_url ? (
                  <Image
                    src={apt.image_url}
                    alt={apt.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-[#faf7f2] to-[#e3d8d0]/40 flex items-center justify-center p-4">
                    <span className="font-marketing text-base font-bold text-[#8A7968]/80 text-center line-clamp-2">
                      {apt.name}
                    </span>
                  </div>
                )}

                {/* Subtle gradient overlay on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                {/* Badges: Match score or Featured */}
                <div className="absolute left-3.5 top-3.5 flex flex-wrap gap-1.5 z-10">
                  {isAiRecommended ? (
                    <span
                      className={`rounded-full px-2.5 py-0.5 font-display text-[10px] font-bold uppercase tracking-wider text-white shadow-sm flex items-center gap-1 ${getScoreBg(
                        apt.match_score
                      )}`}
                    >
                      <Sparkles className="w-3 h-3 text-white fill-white/10" />
                      {apt.match_score}% Khớp
                    </span>
                  ) : (
                    <span className="rounded-full bg-[#9F3F2A] px-2.5 py-0.5 font-display text-[10px] font-bold uppercase tracking-wider text-white shadow-sm flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-white" />
                      Nổi bật
                    </span>
                  )}
                  {apt.hasVr && (
                    <span className="rounded-full bg-black/60 backdrop-blur-md px-2.5 py-0.5 font-mono text-[10px] font-bold text-white shadow-sm flex items-center gap-1">
                      <Eye className="w-3 h-3 text-emerald-400" />
                      VR 360°
                    </span>
                  )}
                </div>

                {apt.isVerified && (
                  <div className="absolute bottom-3 left-3.5 right-3.5 z-10 flex items-center justify-between text-white text-xs">
                    <span className="font-semibold drop-shadow-sm flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Đã kiểm duyệt & Xác thực
                    </span>
                  </div>
                )}
              </div>

              {/* Card Content Area */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3.5">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#9F3F2A] uppercase block">
                    {apt.district} • {apt.rooms} Phòng ngủ
                  </span>
                  <h3 className="font-display text-base font-bold text-fg group-hover:text-[#9F3F2A] transition-colors line-clamp-1">
                    {apt.name}
                  </h3>
                </div>

                {/* Feature highlights */}
                <div className="border-t border-[#E3D8D0]/60 pt-2.5">
                  <ul className="space-y-1">
                    {apt.reasons.slice(0, 2).map((reason, index) => (
                      <li
                        key={index}
                        className="text-xs text-muted flex items-start gap-1.5 font-body line-clamp-1"
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
                <div className="flex items-center justify-between pt-3 border-t border-[#E3D8D0]/40">
                  <div>
                    <span className="block font-body text-[10px] text-[#8A7968]">
                      Giá thuê
                    </span>
                    <span className="font-display text-base sm:text-lg font-bold text-[#9F3F2A]">
                      {formatVnd(apt.rent_price)}
                      <span className="text-xs text-[#8A7968] font-normal">
                        /tháng
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {isAuthenticated && isAiRecommended && (
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
                          aria-label="Thích căn hộ này"
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
                          aria-label="Không thích căn hộ này"
                        >
                          <ThumbsDown className="w-3.5 h-3.5" />
                        </Button>
                      </>
                    )}

                    <Link href={`/properties/${apt.id}` as Route}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 rounded-full border-[#9F3F2A] text-[#9F3F2A] hover:bg-[#9F3F2A] hover:text-white transition-colors text-xs font-bold flex items-center gap-1 ml-1 cursor-pointer"
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
