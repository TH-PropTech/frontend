'use client'

import * as React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/shared/ui/dialog'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Badge } from '@/shared/ui/badge'
import {
  useRecommendation,
  type UseRecommendationReturn,
} from '../model/use-recommendation'
import { MatchScoreRing } from './match-score-ring'
import { ContributionBars } from './contribution-bars'
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  Check,
  Building,
  DollarSign,
  User,
  ExternalLink,
} from 'lucide-react'
import Link from 'next/link'
import type { Route } from 'next'

interface RecommendationModalProps {
  isOpen: boolean
  onClose: () => void
  recommendation?: UseRecommendationReturn
}

const DISTRICTS = [
  'Quận 1',
  'Quận 2',
  'Quận 3',
  'Quận 7',
  'Quận 10',
  'Bình Thạnh',
  'Phú Nhuận',
  'Tân Bình',
  'Thủ Đức',
]

export function RecommendationModal({
  isOpen,
  onClose,
  recommendation,
}: RecommendationModalProps): React.ReactElement {
  const localRec = useRecommendation()
  const rec = recommendation || localRec
  const {
    step,
    survey,
    results,
    isLoading,
    error,
    likedIds,
    updateSurvey,
    nextStep,
    prevStep,
    resetSurvey,
    submitSurvey,
    handleFeedback,
  } = rec

  // Format currency helpers
  const formatVnd = (num: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(num)
  }

  React.useEffect(() => {
    if (!isOpen) {
      resetSurvey()
    }
  }, [isOpen, resetSurvey])

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="max-w-2xl bg-[#FFFDF9] border-[#E3D8D0] p-6 text-fg overflow-hidden sm:rounded-3xl shadow-2xl">
        <DialogHeader className="border-b border-[#E3D8D0]/60 pb-4">
          <DialogTitle className="flex items-center gap-2 font-display text-xl font-bold text-[#9F3F2A]">
            <Sparkles className="w-5 h-5 text-[#E9A23B] fill-[#E9A23B]/20 animate-pulse" />
            Trợ lý Gợi ý Căn hộ AI
          </DialogTitle>
          <DialogDescription className="font-body text-xs text-[#8A7968]">
            Tìm kiếm căn hộ mơ ước dựa trên phân tích học máy Naive Bayes & tiêu
            chuẩn Earthy Trust.
          </DialogDescription>
        </DialogHeader>

        <div className="relative py-4 min-h-[360px] flex flex-col justify-between">
          <div className="transition-all duration-300 ease-in-out">
            {/* STEP 1: DEMOGRAPHICS & FINANCE */}
            {step === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="space-y-2">
                  <h4 className="font-display font-bold text-base text-fg">
                    Bước 1: Hồ sơ khách hàng & Tài chính
                  </h4>
                  <p className="text-xs text-[#8A7968] font-body">
                    Cung cấp tuổi và thu nhập giúp AI lọc cứng các căn hộ vượt
                    quá khả năng tài chính và tối ưu hóa theo nhóm khách hàng
                    tương đồng.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Age */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="age"
                      className="font-bold flex items-center gap-1.5 text-sm"
                    >
                      <User className="w-4 h-4 text-[#9F3F2A]" />
                      Tuổi của bạn
                    </Label>
                    <div className="relative">
                      <Input
                        id="age"
                        type="number"
                        min={18}
                        max={100}
                        value={survey.age}
                        onChange={e =>
                          updateSurvey({ age: Number(e.target.value) })
                        }
                        className="bg-white border-[#E3D8D0] focus:ring-[#9F3F2A] focus:border-[#9F3F2A] rounded-xl font-mono"
                      />
                      <span className="absolute right-3 top-2.5 text-xs text-[#8A7968]">
                        tuổi
                      </span>
                    </div>
                  </div>

                  {/* Income */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="income"
                      className="font-bold flex items-center gap-1.5 text-sm"
                    >
                      <DollarSign className="w-4 h-4 text-[#9F3F2A]" />
                      Thu nhập hàng tháng
                    </Label>
                    <div className="relative">
                      <Input
                        id="income"
                        type="number"
                        min={0}
                        step={1000000}
                        value={survey.income}
                        onChange={e =>
                          updateSurvey({ income: Number(e.target.value) })
                        }
                        className="bg-white border-[#E3D8D0] focus:ring-[#9F3F2A] focus:border-[#9F3F2A] rounded-xl pl-8 font-mono"
                      />
                      <span className="absolute left-3 top-2.5 text-xs text-[#8A7968]">
                        ₫
                      </span>
                    </div>
                    <div className="text-xs font-mono text-[#9F3F2A] mt-1 font-semibold">
                      {formatVnd(survey.income)}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: LOCATION & ROOMS */}
            {step === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="space-y-2">
                  <h4 className="font-display font-bold text-base text-fg">
                    Bước 2: Địa điểm & Quy mô căn hộ
                  </h4>
                  <p className="text-xs text-[#8A7968] font-body">
                    Lọc và ưu tiên các căn hộ có vị trí và số phòng ngủ phù hợp
                    nhất với nhu cầu sử dụng của bạn.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* District Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="district" className="font-bold text-sm">
                      Khu vực mong muốn (TP.HCM)
                    </Label>
                    <select
                      id="district"
                      value={survey.preferred_district}
                      onChange={e =>
                        updateSurvey({ preferred_district: e.target.value })
                      }
                      className="w-full bg-white border border-[#E3D8D0] focus:ring-[#9F3F2A] focus:border-[#9F3F2A] rounded-xl p-2.5 text-sm outline-none transition-colors"
                    >
                      {DISTRICTS.map(d => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Bedrooms count */}
                  <div className="space-y-2">
                    <Label className="font-bold text-sm">Số phòng ngủ</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3].map(num => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => updateSurvey({ rooms: num })}
                          className={`py-2 rounded-xl text-sm font-bold border transition-all ${
                            survey.rooms === num
                              ? 'bg-[#9F3F2A] text-white border-[#9F3F2A] shadow-sm'
                              : 'bg-white border-[#E3D8D0] hover:bg-[#E3D8D0]/10 text-fg'
                          }`}
                        >
                          {num} PN
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: AMENITIES */}
            {step === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="space-y-2">
                  <h4 className="font-display font-bold text-base text-fg">
                    Bước 3: Tiện ích đi kèm
                  </h4>
                  <p className="text-xs text-[#8A7968] font-body">
                    Lựa chọn thêm các tiện ích không bắt buộc để AI cộng điểm ưu
                    tiên phù hợp (Content Checklist scoring).
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Gym Card */}
                  <button
                    type="button"
                    onClick={() => updateSurvey({ has_gym: !survey.has_gym })}
                    className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      survey.has_gym
                        ? 'border-[#9F3F2A] bg-[#9F3F2A]/5'
                        : 'border-[#E3D8D0] bg-white hover:border-[#9F3F2A]/50'
                    }`}
                  >
                    <div>
                      <span className="block font-bold text-sm">
                        Phòng tập Gym
                      </span>
                      <span className="block text-xs text-[#8A7968] mt-0.5 font-body">
                        Có phòng thể hình trong tòa nhà
                      </span>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                        survey.has_gym
                          ? 'bg-[#9F3F2A] border-[#9F3F2A] text-white'
                          : 'border-[#E3D8D0] bg-white'
                      }`}
                    >
                      {survey.has_gym && (
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      )}
                    </div>
                  </button>

                  {/* Parking Card */}
                  <button
                    type="button"
                    onClick={() =>
                      updateSurvey({ has_parking: !survey.has_parking })
                    }
                    className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      survey.has_parking
                        ? 'border-[#9F3F2A] bg-[#9F3F2A]/5'
                        : 'border-[#E3D8D0] bg-white hover:border-[#9F3F2A]/50'
                    }`}
                  >
                    <div>
                      <span className="block font-bold text-sm">
                        Bãi đỗ xe ô tô
                      </span>
                      <span className="block text-xs text-[#8A7968] mt-0.5 font-body">
                        Đảm bảo chỗ gửi xe ô tô rộng rãi
                      </span>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                        survey.has_parking
                          ? 'bg-[#9F3F2A] border-[#9F3F2A] text-white'
                          : 'border-[#E3D8D0] bg-white'
                      }`}
                    >
                      {survey.has_parking && (
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      )}
                    </div>
                  </button>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-body">
                    {error}
                  </div>
                )}
              </div>
            )}

            {/* STEP 4: RECOMMENDATION RESULTS */}
            {step === 4 && (
              <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-[#E3D8D0]/50 pb-2">
                  <h4 className="font-display font-bold text-base text-fg">
                    Kết quả đề xuất tốt nhất dành cho bạn
                  </h4>
                  <Badge
                    variant="outline"
                    className="border-[#6B8E4E] text-[#6B8E4E] bg-[#6B8E4E]/5 font-mono"
                  >
                    Top {results.length} Căn hộ
                  </Badge>
                </div>

                {results.length === 0 ? (
                  <div className="text-center py-12 space-y-3">
                    <Building className="w-12 h-12 text-[#E3D8D0] mx-auto stroke-[1.5]" />
                    <p className="text-sm font-bold text-[#8A7968]">
                      Không tìm thấy căn hộ phù hợp
                    </p>
                    <p className="text-xs text-[#8A7968]/80 max-w-sm mx-auto font-body">
                      Thử tăng ngân sách thu nhập của bạn hoặc thay đổi khu vực
                      tìm kiếm để nhận được nhiều đề xuất hơn.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {results.map(apt => (
                      <div
                        key={apt.id}
                        className="bg-white border border-[#E3D8D0] rounded-2xl p-4 flex flex-col md:flex-row gap-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group animate-slideIn"
                      >
                        {/* Match score ring absolute or relative */}
                        <div className="flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-[#E3D8D0]/60 pb-3 md:pb-0 md:pr-4">
                          <MatchScoreRing score={apt.match_score} />
                          <span className="text-[10px] text-[#8A7968] font-bold uppercase mt-2 font-display">
                            Trùng khớp
                          </span>
                        </div>

                        {/* Middle info */}
                        <div className="flex-1 space-y-3">
                          <div>
                            <span className="text-[10px] font-mono font-bold tracking-widest text-[#9F3F2A] uppercase">
                              {apt.district} • {apt.rooms} Phòng ngủ
                            </span>
                            <h5 className="font-display font-bold text-base text-fg mt-0.5 line-clamp-1 group-hover:text-[#9F3F2A] transition-colors">
                              {apt.name}
                            </h5>
                            <span className="font-display font-extrabold text-[#9F3F2A] text-lg">
                              {formatVnd(apt.rent_price)}
                              <span className="text-xs text-[#8A7968] font-normal">
                                {' '}
                                / tháng
                              </span>
                            </span>
                          </div>

                          {/* Reasons list */}
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold uppercase text-[#8A7968]">
                              Lý do đề xuất:
                            </span>
                            <ul className="space-y-0.5">
                              {apt.reasons.map((reason, index) => (
                                <li
                                  key={index}
                                  className="text-xs text-fg/80 flex items-start gap-1 font-body"
                                >
                                  <span className="text-[#6B8E4E] font-bold shrink-0">
                                    •
                                  </span>
                                  {reason}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Pillars match bars & actions */}
                        <div className="w-full md:w-48 flex flex-col justify-between gap-4 border-t md:border-t-0 md:border-l border-[#E3D8D0]/60 pt-3 md:pt-0 md:pl-4">
                          <ContributionBars contributions={apt.contributions} />

                          <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#E3D8D0]/30">
                            {/* Feedback buttons */}
                            <div className="flex gap-1">
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
                                onClick={() =>
                                  handleFeedback(apt.id, 'dislike')
                                }
                                disabled={likedIds[apt.id] !== undefined}
                              >
                                <ThumbsDown className="w-3.5 h-3.5" />
                              </Button>
                            </div>

                            {/* Details Link */}
                            <Link
                              href={`/properties/${apt.id}` as Route}
                              onClick={onClose}
                            >
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 rounded-full border-[#9F3F2A] text-[#9F3F2A] hover:bg-[#9F3F2A] hover:text-white transition-colors text-xs font-bold flex items-center gap-1"
                              >
                                Chi tiết
                                <ExternalLink className="w-3 h-3" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ACTIONS NAVIGATION BAR */}
          <div className="mt-8 border-t border-[#E3D8D0]/60 pt-4 flex items-center justify-between">
            {step < 4 ? (
              <>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={prevStep}
                  disabled={step === 1}
                  className="rounded-full text-[#8A7968] font-bold text-xs flex items-center gap-1 hover:bg-[#E3D8D0]/10 disabled:opacity-40"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Quay lại
                </Button>

                {step < 3 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="rounded-full bg-[#9F3F2A] hover:bg-[#833221] text-white text-xs font-bold flex items-center gap-1 shadow-md hover:shadow-lg transition-all"
                  >
                    Tiếp tục
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={submitSurvey}
                    disabled={isLoading}
                    className="rounded-full bg-[#6B8E4E] hover:bg-[#587540] text-white text-xs font-bold flex items-center gap-1 shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Đang phân tích...
                      </>
                    ) : (
                      <>
                        Phân tích & Đề xuất
                        <Sparkles className="w-3.5 h-3.5" />
                      </>
                    )}
                  </Button>
                )}
              </>
            ) : (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetSurvey}
                  className="rounded-full border-[#E3D8D0] text-[#8A7968] hover:bg-[#E3D8D0]/10 text-xs font-bold"
                >
                  Khảo sát lại
                </Button>
                <Button
                  type="button"
                  onClick={onClose}
                  className="rounded-full bg-[#9F3F2A] hover:bg-[#833221] text-white text-xs font-bold"
                >
                  Hoàn tất
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
