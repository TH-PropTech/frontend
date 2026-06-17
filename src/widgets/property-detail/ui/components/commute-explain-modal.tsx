'use client'

import * as React from 'react'
import { createPortal } from 'react-dom'

interface CommuteExplainModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CommuteExplainModal({
  isOpen,
  onClose,
}: CommuteExplainModalProps): React.ReactElement | null {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted || !isOpen || typeof window === 'undefined') return null

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 transition-all duration-300">
      <div className="bg-white border border-border rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative space-y-5 animate-scale-up border-primary/20">
        <h4 className="font-marketing text-lg md:text-xl font-bold text-fg flex items-center gap-2 border-b border-border pb-3.5">
          <span className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
          Công thức ước tính thời gian di chuyển dự kiến
        </h4>

        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
          <div className="space-y-1.5 text-left">
            <span className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider block">
              Nguyên lý hoạt động:
            </span>
            <p className="text-xs text-fg-muted font-body leading-relaxed font-semibold">
              Khoảng cách địa lý đường chim bay được tính toán tức thời bằng
              công thức toán học bán kính Trái Đất (Haversine) từ tọa độ GPS
              thực tế của tòa nhà đến điểm bạn kéo thả hoặc chỉ định trên bản đồ
              Leaflet. Thời gian di chuyển dự kiến được lập trình dựa trên tốc
              độ di chuyển trung bình thực tế tại khu vực TP.HCM đối với từng
              loại phương tiện giao thông.
            </p>
          </div>

          <div className="bg-surface-muted border border-border/80 rounded-2xl p-4 space-y-2 shadow-inner text-left">
            <span className="text-[10px] font-extrabold text-primary uppercase tracking-wider block">
              Công thức tính toán:
            </span>
            <div className="font-mono text-xs text-primary font-bold leading-relaxed">
              T_bình_thường = (Quãng_đường / Vận_tốc) * 60 phút
              <br />
              T_cao_điểm = T_bình_thường * Hệ_số_ùn_tắc_giao_thông
            </div>
          </div>

          <div className="bg-success/5 border border-success/20 rounded-2xl p-4 space-y-1.5 text-left">
            <span className="text-[10px] font-extrabold text-success uppercase tracking-wider block">
              Ví dụ trực quan:
            </span>
            <p className="text-xs text-success/90 font-medium leading-relaxed font-body">
              Ví dụ: Quãng đường từ căn hộ Vinhomes Central Park đến Quận 1 dài
              5.8 km. Đi xe máy trong giờ thấp điểm mất khoảng 15 phút (vận tốc
              trung bình 28km/h). Trong giờ cao điểm kẹt xe (7h30-8h30 sáng), do
              ùn tắc tại ngã tư Hàng Xanh và cầu Thị Nghè, thời gian di chuyển
              dự kiến tăng thêm 75% lên thành 26 phút (Dự kiến).
            </p>
          </div>

          <div className="space-y-2 pt-1 text-left">
            <span className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider block">
              Tham số vận tốc & Hệ số giờ cao điểm:
            </span>
            <ul className="space-y-2 text-xs font-semibold text-fg-muted font-body pl-5 list-decimal leading-relaxed">
              <li>
                <span className="text-fg font-bold">Xe máy:</span> Tốc độ bình
                thường 28km/h, giờ cao điểm kẹt xe tăng 75% thời gian di chuyển.
              </li>
              <li>
                <span className="text-fg font-bold">Xe ô tô / Taxi:</span> Tốc
                độ bình thường 24km/h, giờ cao điểm kẹt xe tăng 100% thời gian
                (gấp đôi) do đi chung làn ô tô ùn ứ.
              </li>
              <li>
                <span className="text-fg font-bold">
                  Tàu điện Metro (Dự kiến):
                </span>{' '}
                Tốc độ 45km/h cố định hoàn toàn không bị ảnh hưởng bởi ùn tắc
                mặt đất.
              </li>
              <li>
                <span className="text-fg font-bold">Xe Bus công cộng:</span> Tốc
                độ 18km/h, giờ cao điểm tăng 80% thời gian di chuyển do thời
                gian dừng đón trả khách kéo dài.
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-border/60">
          <button
            onClick={onClose}
            className="bg-primary text-white text-xs font-bold px-5 py-3 rounded-xl hover:bg-primary/90 transition-all active:scale-95 cursor-pointer shadow-md shadow-primary/10"
          >
            Đóng giải thích
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
