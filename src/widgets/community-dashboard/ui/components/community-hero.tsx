import * as React from 'react'
import { TopographyBackdrop } from './topography-backdrop'

const HERO_PATHS = [
  'M-100 80 C 300 10, 600 150, 1000 60 C 1200 30, 1500 100, 1600 80',
  'M-100 110 C 300 40, 600 180, 1000 90 C 1200 60, 1500 130, 1600 110',
  'M-100 140 C 300 70, 600 210, 1000 120 C 1200 90, 1500 160, 1600 140',
  'M-100 170 C 300 100, 600 240, 1000 150 C 1200 120, 1500 190, 1600 170',
  'M-100 200 C 300 130, 600 270, 1000 180 C 1200 150, 1500 220, 1600 200',
  'M 100 250 C 400 150, 700 290, 1100 210 C 1300 180, 1500 250, 1600 230',
  'M 100 280 C 400 180, 700 320, 1100 240 C 1300 210, 1500 280, 1600 260',
] as const

interface CommunityHeroProps {
  /** Số người đã có bài được duyệt; chưa có số liệu thì không hiển thị. */
  contributorCount?: number | undefined
  projectCount?: number | undefined
}

export function CommunityHero({
  contributorCount = 0,
  projectCount = 0,
}: CommunityHeroProps): React.ReactElement {
  const highlights = [
    contributorCount > 0 && `${contributorCount} người đã đóng góp bài viết`,
    projectCount > 0 && `${projectCount} dự án đang thảo luận`,
  ].filter((text): text is string => Boolean(text))

  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden rounded-b-[40px] border-b border-border bg-gradient-to-b from-primary-soft via-surface-muted to-bg pb-24 pt-32 text-center">
      <TopographyBackdrop
        paths={HERO_PATHS}
        viewBox="0 0 1440 300"
        className="absolute inset-0 opacity-[0.08]"
        strokeClassName="text-primary/25"
      />

      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/5 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-accent/5 blur-[100px]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-10">
        <span className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-primary">
          Cộng đồng cư dân
        </span>
        <h1 className="font-marketing text-3xl font-bold leading-tight text-fg sm:text-4xl">
          Hỏi đáp & Đánh giá căn hộ
        </h1>
        <p className="mx-auto mt-2 max-w-xl font-body text-sm text-muted">
          Không gian chia sẻ trải nghiệm, hỏi đáp thủ tục cho thuê và tìm bạn ở
          ghép — tất cả được kiểm duyệt bởi đội ngũ TH PropTech.
        </p>

        {highlights.length > 0 && (
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[11px] font-semibold text-muted">
            {highlights.map(text => (
              <li key={text}>{text}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
