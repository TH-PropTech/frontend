'use client'

import * as React from 'react'
import { ApartmentItem } from '@/entities/properties'
import { Crown, Maximize2, Scale, Shield, Sparkles } from 'lucide-react'

interface CompareRecommendationsProps {
  compareApartments: ApartmentItem[]
  getUnitPrice: (apt: ApartmentItem) => number
  getTrustScore: (apt: ApartmentItem) => number
}

export function CompareRecommendations({
  compareApartments,
  getUnitPrice,
  getTrustScore,
}: CompareRecommendationsProps): React.ReactElement | null {
  const recommendations = React.useMemo(() => {
    if (compareApartments.length < 2) return null
    const sortedCheapest = [...compareApartments].sort(
      (a, b) => (a.priceNum ?? 999) - (b.priceNum ?? 999)
    )
    const cheapest = sortedCheapest[0]

    const sortedLargest = [...compareApartments].sort(
      (a, b) => (b.areaNum ?? 0) - (a.areaNum ?? 0)
    )
    const largest = sortedLargest[0]

    const sortedBestValue = [...compareApartments].sort(
      (a, b) => getUnitPrice(a) - getUnitPrice(b)
    )
    const bestValue = sortedBestValue[0]

    const sortedMostTrusted = [...compareApartments].sort(
      (a, b) => getTrustScore(b) - getTrustScore(a)
    )
    const mostTrusted = sortedMostTrusted[0]

    if (!cheapest || !largest || !bestValue || !mostTrusted) return null

    return {
      cheapest: cheapest as ApartmentItem,
      largest: largest as ApartmentItem,
      bestValue: bestValue as ApartmentItem,
      mostTrusted: mostTrusted as ApartmentItem,
    }
  }, [compareApartments, getUnitPrice, getTrustScore])

  if (!recommendations) return null

  return (
    <div className="bg-primary-soft/30 border border-primary/20 rounded-2xl p-6 space-y-5 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center gap-2 border-b border-primary/10 pb-3">
        <div className="h-8 w-8 rounded-lg bg-primary-soft flex items-center justify-center text-primary">
          <Scale className="h-4.5 w-4.5" />
        </div>
        <div>
          <h4 className="font-marketing text-sm font-extrabold text-fg">
            Bảng Phân Tích & Đối Chiếu Khuyến Nghị Tối Ưu
          </h4>
          <p className="text-[10px] text-muted">
            Tự động đánh giá chi tiết các chỉ số tài chính, không gian và độ tin
            cậy của các căn hộ được chọn.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="bg-surface rounded-xl p-4 border border-border space-y-2">
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-success uppercase">
            <Crown className="h-3.5 w-3.5" />
            Tối ưu chi phí hàng tháng
          </span>
          <p className="font-semibold text-fg leading-snug">
            {recommendations.cheapest.title}
          </p>
          <p className="text-[11px] text-muted leading-relaxed">
            Căn hộ có giá thuê hợp lý nhất trong danh sách so sánh hiện tại ở
            mức **{recommendations.cheapest.priceNum} Tr/tháng**. Lựa chọn này
            giúp giảm bớt gánh nặng tài chính hàng tháng, lý tưởng cho những ai
            muốn tích lũy thêm ngân sách dự phòng.
          </p>
        </div>

        <div className="bg-surface rounded-xl p-4 border border-border space-y-2">
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-info uppercase">
            <Maximize2 className="h-3.5 w-3.5" />
            Không gian rộng rãi nhất
          </span>
          <p className="font-semibold text-fg leading-snug">
            {recommendations.largest.title}
          </p>
          <p className="text-[11px] text-muted leading-relaxed">
            Với diện tích sử dụng lên tới **
            {recommendations.largest.areaNum} m²**, căn hộ này mang đến không
            gian sinh hoạt vô cùng thoải mái và rộng rãi. Rất thích hợp cho
            những hộ gia đình có con nhỏ hoặc những ai mong muốn thiết lập phòng
            làm việc tại nhà.
          </p>
        </div>

        <div className="bg-surface rounded-xl p-4 border border-border space-y-2">
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-warning uppercase">
            <Scale className="h-3.5 w-3.5" />
            Hiệu quả sử dụng dòng tiền
          </span>
          <p className="font-semibold text-fg leading-snug">
            {recommendations.bestValue.title}
          </p>
          <p className="text-[11px] text-muted leading-relaxed">
            Căn hộ đạt đơn giá thuê tốt nhất ở mức **
            {new Intl.NumberFormat('vi-VN').format(
              Math.round(getUnitPrice(recommendations.bestValue))
            )}{' '}
            đ/m²**. Đây là lựa chọn mang lại hiệu năng sử dụng cao nhất trên
            từng đồng chi trả cho không gian thực tế.
          </p>
        </div>

        <div className="bg-surface rounded-xl p-4 border border-border space-y-2">
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-primary uppercase">
            <Shield className="h-3.5 w-3.5" />
            Độ tin cậy & an toàn pháp lý
          </span>
          <p className="font-semibold text-fg leading-snug">
            {recommendations.mostTrusted.title}
          </p>
          <p className="text-[11px] text-muted leading-relaxed">
            Nổi bật với điểm số xác minh Blockchain cao nhất ở mức **
            {getTrustScore(recommendations.mostTrusted)}%**. Mọi thông tin hợp
            đồng, pháp lý của chủ nhà đều đã được mã hóa và lưu trữ an toàn, hạn
            chế tối đa rủi ro tin ảo.
          </p>
        </div>
      </div>

      <div className="bg-surface/60 rounded-xl p-4 border border-border text-xs leading-relaxed text-fg space-y-3">
        <div className="flex items-center gap-1.5 font-bold text-[11px] text-muted uppercase tracking-wider">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span>Báo cáo phân tích đối chiếu chi tiết:</span>
        </div>
        <div className="space-y-2 font-body text-fg/90 text-[11.5px]">
          <p>
            {`Qua phân tích dữ liệu, căn hộ tại "${recommendations.cheapest.projectName || recommendations.cheapest.title}" có lợi thế vượt trội về giá thuê hàng tháng (${recommendations.cheapest.priceNum} Tr/tháng), giúp bạn tiết kiệm chi tiêu tối ưu.`}
          </p>
          <p>
            {`Tuy nhiên, nếu xét về diện tích rộng lớn thì căn hộ "${recommendations.largest.title}" là điểm nhấn với ${recommendations.largest.areaNum} m² sàn sử dụng. Khi quy đổi về giá trị kinh tế trên từng mét vuông, căn hộ "${recommendations.bestValue.title}" chứng minh độ hiệu quả sử dụng dòng tiền lý tưởng nhất nhờ đơn giá thuê thấp nhất.`}
          </p>
          <p>
            {`Khuyến nghị tổng hợp: Nếu ngân sách của bạn được đặt lên hàng đầu, căn hộ tại ${recommendations.cheapest.projectName || recommendations.cheapest.location} là quyết định sáng suốt nhất. Nếu không gian sống rộng rãi để phục vụ gia đình đông người là ưu tiên, hãy lựa chọn căn hộ ${recommendations.largest.title}. Để hạn chế rủi ro pháp lý và có giao dịch minh bạch tuyệt đối, hãy lựa chọn ${recommendations.mostTrusted.title} vì đã được xác minh toàn diện thông qua Blockchain.`}
          </p>
        </div>
      </div>
    </div>
  )
}
