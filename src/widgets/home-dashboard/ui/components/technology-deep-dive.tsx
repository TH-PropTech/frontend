'use client'

import * as React from 'react'
import { ShieldCheck, Sparkles, Eye, CheckCircle2 } from 'lucide-react'

const PILLARS = [
  {
    key: 'blockchain',
    icon: ShieldCheck,
    badge: 'Công nghệ Chuỗi khối (Blockchain)',
    title: 'Giao dịch minh bạch, chống giả mạo',
    desc: 'Mỗi hợp đồng, đặt cọc và thanh toán đều được lưu vết xác thực bất biến trên hệ thống chuỗi khối. Khách thuê và chủ nhà có thể kiểm chứng bất kỳ giao dịch nào bằng mã xác thực — không bên nào có thể đơn phương sửa đổi, xóa hay phủ nhận điều khoản đã ký.',
    points: [
      'Mã xác thực giao dịch có thể tra cứu công khai, tức thì',
      'Hợp đồng thuê ghi nhận vĩnh viễn, chống sửa đổi gian lận',
      'Bảo vệ quyền lợi pháp lý đồng đều cho cả khách thuê lẫn chủ nhà',
    ],
  },
  {
    key: 'ai',
    icon: Sparkles,
    badge: 'Trí tuệ nhân tạo (AI Gợi ý)',
    title: 'Gợi ý thông minh, cá nhân hóa theo túi tiền',
    desc: 'Hệ thống kết hợp thuật toán Naive Bayes và Content-Based Filtering để phân tích hồ sơ người dùng (độ tuổi, thu nhập, khu vực mong muốn, số phòng, tiện ích) và đề xuất căn hộ phù hợp nhất. Mỗi gợi ý đều kèm điểm tin cậy và giải thích minh bạch lý do được đề xuất.',
    points: [
      'Thuật toán Hybrid: Naive Bayes kết hợp Content-Based Filtering',
      'Explainable AI — minh bạch lý do và tiêu chí cho từng gợi ý',
      'Học hỏi liên tục từ phản hồi của người dùng để nâng cao độ chính xác',
    ],
  },
  {
    key: '3d',
    icon: Eye,
    badge: 'Mô hình 3D tương tác (Three.js)',
    title: 'Trải nghiệm không gian & Thiết kế layout',
    desc: 'Hệ thống tích hợp Mô hình 3D tương tác (Interactive 3D Walkthrough) qua Three.js và công cụ thiết kế layout căn hộ (Floorplan 3D Editor). Khách thuê có thể trải nghiệm không gian đa chiều, quan sát cấu trúc thực tế trước khi đặt lịch hẹn xem nhà trực tiếp.',
    points: [
      'Mô hình 3D Master Plan định vị trực quan phân khu và tòa nhà',
      'Mô hình 3D tương tác Three.js di chuyển tự do trong không gian căn hộ',
      'Công cụ thiết kế layout Floorplan 3D Editor và gửi yêu cầu thiết kế',
    ],
  },
]

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
          Kết hợp công nghệ lưu vết chống sửa đổi Blockchain (Hyperledger
          Fabric), thuật toán AI gợi ý cá nhân hóa và trải nghiệm Mô hình 3D
          tương tác (Three.js) giúp quy trình thuê căn hộ trở nên minh bạch và
          an toàn tuyệt đối.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {PILLARS.map(pillar => (
          <div
            key={pillar.key}
            className="space-y-4 rounded-3xl border border-border bg-white p-6 shadow-sm"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3 py-1">
              <pillar.icon className="h-3.5 w-3.5 text-primary" />
              <span className="font-mono text-[11px] font-bold uppercase text-primary">
                {pillar.badge}
              </span>
            </div>
            <h3 className="font-display text-xl font-bold text-fg">
              {pillar.title}
            </h3>
            <p className="font-body text-sm leading-relaxed text-muted">
              {pillar.desc}
            </p>
            <ul className="space-y-2 font-body text-sm text-muted">
              {pillar.points.map(point => (
                <li key={point} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
