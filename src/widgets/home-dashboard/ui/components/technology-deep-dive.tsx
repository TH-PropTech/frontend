'use client'

import * as React from 'react'
import {
  ShieldCheck,
  Sparkles,
  Eye,
  CheckCircle2,
  Copy,
  Sliders,
  Compass,
  Layers,
} from 'lucide-react'

export function TechnologyDeepDive(): React.ReactElement {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:px-10">
      <div className="mb-16 text-center">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
          CÔNG NGHỆ CỐT LÕI
        </span>
        <h2 className="mt-3 font-marketing text-3xl font-bold text-fg sm:text-4xl">
          Ba trụ cột công nghệ của TH-PropTech
        </h2>
        <p className="mx-auto mt-4 max-w-2xl font-body text-sm text-muted leading-relaxed">
          Kết hợp công nghệ lưu vết bất biến Blockchain, thuật toán AI gợi ý cá
          nhân hóa và trải nghiệm không gian 3D VR Tour trực quan giúp quy trình
          thuê nhà trở nên minh bạch và an toàn tuyệt đối.
        </p>
      </div>

      <div className="flex flex-col gap-16">
        {/* Pillar 1: Blockchain */}
        <div className="flex flex-col items-center gap-8 md:flex-row">
          {/* Visual Mockup Card */}
          <div className="w-full md:w-5/12 rounded-3xl border border-slate-700/60 bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 text-white p-5 sm:p-6 shadow-xl flex flex-col justify-between relative overflow-hidden min-h-[250px]">
            {/* Background grid effect */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between border-b border-slate-700/60 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                  Lưu vết sổ cái bất biến
                </span>
              </div>
              <span className="font-mono text-[10px] text-slate-400">
                Block #10,482,914
              </span>
            </div>

            <div className="relative z-10 my-4 space-y-2.5 font-mono text-xs">
              <div className="flex justify-between items-center bg-slate-800/80 rounded-xl px-3 py-2 border border-slate-700/40">
                <span className="text-slate-400 text-[10px]">
                  MÃ XÁC THỰC TX:
                </span>
                <span className="text-sky-300 font-semibold text-[11px] flex items-center gap-1.5">
                  0x8f2a...c4e9
                  <Copy className="w-3 h-3 text-slate-400 hover:text-white transition-colors" />
                </span>
              </div>
              <div className="flex justify-between items-center px-1 text-[11px]">
                <span className="text-slate-400">Hợp đồng điện tử:</span>
                <span className="text-white font-medium">#HD-2026-08892</span>
              </div>
              <div className="flex justify-between items-center px-1 text-[11px]">
                <span className="text-slate-400">Thời điểm ghi nhận:</span>
                <span className="text-slate-300">24/10/2026 • 09:30:15</span>
              </div>
            </div>

            <div className="relative z-10 pt-3 border-t border-slate-700/60 flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>Chống sửa đổi • Kiểm chứng công khai 100%</span>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-success/20 bg-success-soft px-3 py-1">
              <ShieldCheck className="h-3.5 w-3.5 text-success" />
              <span className="font-mono text-[10px] font-bold uppercase text-success">
                Công nghệ Chuỗi khối (Blockchain)
              </span>
            </div>
            <h3 className="font-display text-2xl font-bold text-fg">
              Giao dịch minh bạch, chống giả mạo
            </h3>
            <p className="font-body text-sm leading-relaxed text-muted">
              Mỗi hợp đồng, đặt cọc và thanh toán đều được lưu vết xác thực bất
              biến trên hệ thống chuỗi khối. Khách thuê và chủ nhà có thể kiểm
              chứng bất kỳ giao dịch nào bằng mã xác thực — không bên nào có thể
              đơn phương sửa đổi, xóa hay phủ nhận điều khoản đã ký.
            </p>
            <ul className="space-y-2 font-body text-sm text-muted">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                <span>
                  Mã xác thực giao dịch có thể tra cứu công khai, tức thì
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                <span>
                  Hợp đồng thuê ghi nhận vĩnh viễn, chống sửa đổi gian lận
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                <span>
                  Bảo vệ quyền lợi pháp lý đồng đều cho cả khách thuê lẫn chủ
                  nhà
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Pillar 2: AI */}
        <div className="flex flex-col items-center gap-8 md:flex-row-reverse">
          {/* Visual Mockup Card */}
          <div className="w-full md:w-5/12 rounded-3xl border border-[#E3D8D0] bg-white p-5 sm:p-6 shadow-xl flex flex-col justify-between relative overflow-hidden min-h-[250px]">
            <div className="flex items-center justify-between border-b border-[#E3D8D0]/60 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary">
                  AI Recommendation Engine
                </span>
              </div>
              <span className="rounded-full bg-[#6B8E4E] px-2.5 py-0.5 font-display text-[10px] font-bold uppercase text-white shadow-sm">
                96% Khớp nhu cầu
              </span>
            </div>

            <div className="my-3 space-y-2.5 font-body">
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-fg">Ngân sách & Mức giá thuê</span>
                  <span className="text-[#6B8E4E] font-bold">98%</span>
                </div>
                <div className="h-2 w-full bg-surface-muted rounded-full overflow-hidden">
                  <div className="h-full bg-[#6B8E4E] rounded-full w-[98%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-fg">Vị trí & Bán kính di chuyển</span>
                  <span className="text-[#E9A23B] font-bold">95%</span>
                </div>
                <div className="h-2 w-full bg-surface-muted rounded-full overflow-hidden">
                  <div className="h-full bg-[#E9A23B] rounded-full w-[95%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-fg">Tiện ích (VR, Gym, Ban công)</span>
                  <span className="text-primary font-bold">92%</span>
                </div>
                <div className="h-2 w-full bg-surface-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full w-[92%]" />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E3D8D0]/60 flex items-center justify-between text-[11px] text-muted">
              <span className="flex items-center gap-1.5 font-medium">
                <Sliders className="w-3.5 h-3.5 text-primary" />
                Lọc trên 1.200+ căn hộ thực tế
              </span>
              <span className="font-semibold text-primary">Explainable AI</span>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3 py-1">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="font-mono text-[10px] font-bold uppercase text-primary">
                Trí tuệ nhân tạo (AI Gợi ý)
              </span>
            </div>
            <h3 className="font-display text-2xl font-bold text-fg">
              Gợi ý thông minh, cá nhân hóa theo túi tiền
            </h3>
            <p className="font-body text-sm leading-relaxed text-muted">
              Hệ thống kết hợp thuật toán Naive Bayes và Content-Based Filtering
              để phân tích hồ sơ người dùng (độ tuổi, thu nhập, khu vực mong
              muốn, số phòng, tiện ích) và đề xuất căn hộ phù hợp nhất. Mỗi gợi
              ý đều kèm điểm tin cậy và giải thích minh bạch lý do được đề xuất.
            </p>
            <ul className="space-y-2 font-body text-sm text-muted">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                <span>
                  Thuật toán Hybrid: Naive Bayes kết hợp Content-Based Filtering
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                <span>
                  Explainable AI — minh bạch lý do và tiêu chí cho từng gợi ý
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                <span>
                  Học hỏi liên tục từ phản hồi của người dùng để nâng cao độ
                  chính xác
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Pillar 3: VR 3D */}
        <div className="flex flex-col items-center gap-8 md:flex-row">
          {/* Visual Mockup Card */}
          <div className="w-full md:w-5/12 rounded-3xl border border-stone-800 bg-gradient-to-br from-stone-900 via-neutral-900 to-stone-950 text-white p-5 sm:p-6 shadow-xl flex flex-col justify-between relative overflow-hidden min-h-[250px]">
            {/* Viewport simulation */}
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-amber-400" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-amber-400">
                  VR 360° Panorama Viewer
                </span>
              </div>
              <span className="rounded-full bg-white/10 px-2 py-0.5 font-mono text-[10px] text-stone-300">
                1080p HD • 60 FPS
              </span>
            </div>

            <div className="my-4 relative h-24 rounded-2xl bg-stone-800/60 border border-stone-700/50 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:12px_12px]" />
              <div className="relative z-10 flex flex-wrap gap-2 justify-center px-2">
                <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-1 rounded-full text-[10px] font-medium shadow-sm animate-pulse">
                  <Compass className="w-3 h-3" />
                  Điểm nhìn: Phòng khách
                </span>
                <span className="inline-flex items-center gap-1 bg-white/10 text-stone-300 border border-white/20 px-2.5 py-1 rounded-full text-[10px] font-medium shadow-sm">
                  <Layers className="w-3 h-3" />
                  Ban công view sông
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
              <span>Đi bộ tự do • Đo đạc tỷ lệ 1:1</span>
              <span className="text-amber-400 font-semibold">
                Tương tác thực tế
              </span>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3 py-1">
              <Eye className="h-3.5 w-3.5 text-primary" />
              <span className="font-mono text-[10px] font-bold uppercase text-primary">
                Không gian 3D tương tác (VR Tour)
              </span>
            </div>
            <h3 className="font-display text-2xl font-bold text-fg">
              Xem nhà từ xa, trải nghiệm như thực tế
            </h3>
            <p className="font-body text-sm leading-relaxed text-muted">
              Mô hình 3D tương tác toàn khu đô thị cho phép bạn chọn vị trí tòa
              nhà, chọn tầng và bước vào xem nội thất căn hộ qua VR Tour 360°.
              Toàn bộ chi tiết về bếp, phòng khách, phòng ngủ và góc ban công
              được thể hiện chân thực với hình ảnh chất lượng cao.
            </p>
            <ul className="space-y-2 font-body text-sm text-muted">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                <span>
                  Mô hình 3D Master Plan định vị trực quan toàn khu đô thị
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                <span>VR Tour 360° nội thất thực tế đến từng góc phòng</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                <span>
                  Chế độ đi bộ tham quan tự do như đang trực tiếp xem nhà
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
