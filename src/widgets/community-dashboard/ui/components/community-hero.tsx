export function CommunityHero(): React.ReactElement {
  return (
    <section className="relative flex flex-col items-center justify-center bg-gradient-to-b from-[#f5ece2] via-[#faf6f1] to-bg pb-24 pt-32 text-center rounded-b-[40px] border-b border-border overflow-hidden">
      {/* Topography SVG Background — same pattern as PropertiesHero */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none select-none overflow-hidden"
        style={{
          willChange: 'transform',
          transform: 'translate3d(0,0,0)',
          backfaceVisibility: 'hidden',
        }}
      >
        <svg
          className="w-full h-full min-w-[1440px] min-h-[300px]"
          viewBox="0 0 1440 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M-100 80 C 300 10, 600 150, 1000 60 C 1200 30, 1500 100, 1600 80"
            stroke="currentColor"
            className="text-primary/25"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M-100 110 C 300 40, 600 180, 1000 90 C 1200 60, 1500 130, 1600 110"
            stroke="currentColor"
            className="text-primary/25"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M-100 140 C 300 70, 600 210, 1000 120 C 1200 90, 1500 160, 1600 140"
            stroke="currentColor"
            className="text-primary/25"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M-100 170 C 300 100, 600 240, 1000 150 C 1200 120, 1500 190, 1600 170"
            stroke="currentColor"
            className="text-primary/25"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M-100 200 C 300 130, 600 270, 1000 180 C 1200 150, 1500 220, 1600 200"
            stroke="currentColor"
            className="text-primary/25"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M 100 250 C 400 150, 700 290, 1100 210 C 1300 180, 1500 250, 1600 230"
            stroke="currentColor"
            className="text-primary/25"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M 100 280 C 400 180, 700 320, 1100 240 C 1300 210, 1500 280, 1600 260"
            stroke="currentColor"
            className="text-primary/25"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>

      {/* Decorative blurred circles */}
      <div className="absolute -left-32 -top-32 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto w-full max-w-6xl px-6 md:px-10 z-10 relative">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary mb-2 block">
          Cộng đồng cư dân
        </span>
        <h1 className="font-marketing text-3xl font-bold leading-tight sm:text-4xl text-fg">
          Hỏi đáp & Đánh giá căn hộ
        </h1>
        <p className="mx-auto mt-2 max-w-xl font-body text-sm text-muted">
          Không gian chia sẻ trải nghiệm, hỏi đáp thủ tục cho thuê và tìm bạn ở
          ghép — tất cả được kiểm duyệt bởi đội ngũ TH PropTech.
        </p>

        {/* Stats row */}
        <div className="flex items-center justify-center gap-8 mt-6">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&auto=format&fit=crop&q=80"
                alt=""
                className="h-7 w-7 rounded-full border-2 border-[#f5ece2] object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&auto=format&fit=crop&q=80"
                alt=""
                className="h-7 w-7 rounded-full border-2 border-[#f5ece2] object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&auto=format&fit=crop&q=80"
                alt=""
                className="h-7 w-7 rounded-full border-2 border-[#f5ece2] object-cover"
              />
            </div>
            <span className="text-[11px] text-muted font-semibold">
              124+ thành viên
            </span>
          </div>
          <div className="h-4 w-px bg-border" />
          <span className="text-[11px] text-muted font-semibold">
            12 dự án đang thảo luận
          </span>
        </div>
      </div>
    </section>
  )
}
