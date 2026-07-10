'use client'

import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import { HomeHeader } from './home-header'
import { Footer } from '@/shared/ui/footer'
import { HeroSection } from './components/hero-section'
import { PlatformOverview } from './components/platform-overview'
import { FeaturedApartments } from './components/featured-apartments'
import { ComparisonSection } from './components/comparison-section'
import { ApartmentTypes } from './components/apartment-types'
import { RentalProcessTimeline } from './components/rental-process-timeline'
import { LandlordSection } from './components/landlord-section'
import { TechnologyDeepDive } from './components/technology-deep-dive'
import { StatsSection } from './components/stats-section'
import { FeaturedLocations } from './components/featured-locations'
import { WhyChooseUs } from './components/why-choose-us'
import { TestimonialsSection } from './components/testimonials-section'
import { FaqSection } from './components/faq-section'
import { BlogKnowledgeSection } from './components/blog-knowledge-section'
import { SecurityCommitmentsSection } from './components/security-commitments-section'
import { NewsletterSection } from './components/newsletter-section'
import { FinalCtaBanner } from './components/final-cta-banner'
import {
  RecommendationModal,
  useRecommendation,
} from '@/features/ai-recommendation'
import { AuthRequiredModal } from '@/widgets/community-dashboard/ui/components/auth-required-modal'

export function HomeDashboard(): React.ReactElement {
  const [isRecOpen, setIsRecOpen] = React.useState(false)
  const [showAuthModal, setShowAuthModal] = React.useState(false)
  const [user, setUser] = React.useState<{
    name: string
    kycStatus: string
  } | null>(null)

  const recommendation = useRecommendation()

  React.useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('user')
        if (stored) {
          timer = setTimeout(() => {
            setUser(JSON.parse(stored))
          }, 0)
        }
      } catch {
        // Ignore JSON parse error
      }
    }
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [])

  const handleOpenSurvey = () => {
    const token = localStorage.getItem('accessToken')
    const storedUser = localStorage.getItem('user')
    if (token && storedUser) {
      setIsRecOpen(true)
    } else {
      setShowAuthModal(true)
    }
  }

  return (
    <div className="relative min-h-screen bg-bg text-fg selection:bg-primary/20 selection:text-primary">
      {/* Topography SVG Background (fixed background overlay, extremely lightweight & hardware accelerated) */}
      <div
        className="fixed inset-0 opacity-[0.08] pointer-events-none select-none overflow-hidden z-[1]"
        style={{
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
        }}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* Top Left Curves */}
          <path
            d="M-100 100 C 300 20, 600 180, 1000 80 C 1200 40, 1500 120, 1600 100"
            stroke="currentColor"
            className="text-primary"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M-100 130 C 300 50, 600 210, 1000 110 C 1200 70, 1500 150, 1600 130"
            stroke="currentColor"
            className="text-primary"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M-100 160 C 300 80, 600 240, 1000 140 C 1200 100, 1500 180, 1600 160"
            stroke="currentColor"
            className="text-primary"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M-100 190 C 300 110, 600 270, 1000 170 C 1200 130, 1500 210, 1600 190"
            stroke="currentColor"
            className="text-primary"
            strokeWidth="1.2"
            fill="none"
          />

          {/* Mid Right Curves */}
          <path
            d="M-50 450 C 400 320, 700 480, 1100 380 C 1300 340, 1500 420, 1600 400"
            stroke="currentColor"
            className="text-primary"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M-50 480 C 400 350, 700 510, 1100 410 C 1300 370, 1500 450, 1600 430"
            stroke="currentColor"
            className="text-primary"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M-50 510 C 400 380, 700 540, 1100 440 C 1300 400, 1500 480, 1600 460"
            stroke="currentColor"
            className="text-primary"
            strokeWidth="1.2"
            fill="none"
          />

          {/* Bottom Left Curves */}
          <path
            d="M-100 700 C 300 620, 600 780, 1000 680 C 1200 640, 1500 720, 1600 700"
            stroke="currentColor"
            className="text-primary"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M-100 730 C 300 650, 600 810, 1000 710 C 1200 670, 1500 750, 1600 730"
            stroke="currentColor"
            className="text-primary"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M-100 760 C 300 680, 600 840, 1000 740 C 1200 700, 1500 780, 1600 760"
            stroke="currentColor"
            className="text-primary"
            strokeWidth="1.2"
            fill="none"
          />
        </svg>
      </div>

      {/* Absolute Dynamic Header */}
      <HomeHeader />

      {/* Main Content Areas */}
      <main className="w-full">
        <HeroSection />
        {user && user.kycStatus !== 'verified' && (
          <div className="w-full bg-[#faf7f2] py-8 border-b border-[#e3d8d0]/60 relative z-20">
            <div className="max-w-6xl mx-auto px-6 md:px-10">
              <div className="bg-[#fffdf9] border border-[#e3d8d0] rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#f5e3dc] rounded-xl text-[#c65a3a] shrink-0">
                    <svg
                      className="h-6 w-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-[#2b211e] font-display">
                      Yêu cầu xác minh danh tính (KYC)
                    </h3>
                    <p className="text-sm text-[#7a6a61] font-body mt-1 leading-relaxed">
                      Tài khoản của bạn chưa được xác minh danh tính. Vui lòng
                      hoàn tất xác thực CCCD để mở khóa toàn bộ tính năng và
                      tham gia giao dịch ký kết hợp đồng thuê nhà.
                    </p>
                  </div>
                </div>
                <Link href={'/profile?kyc=true' as Route} className="shrink-0">
                  <button
                    type="button"
                    className="bg-[#c65a3a] hover:bg-[#9f3f2a] text-white font-bold rounded-full px-6 py-2.5 transition-all text-xs cursor-pointer shadow-md shadow-[#c65a3a]/15 hover:shadow-lg active:scale-95"
                  >
                    Xác minh ngay
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
        <PlatformOverview />

        {/* AI Recommendation Banner */}
        <section className="mx-auto max-w-6xl px-6 pt-12 md:px-10 relative z-20">
          <div className="relative overflow-hidden rounded-3xl border border-[#e3d8d0] bg-gradient-to-br from-[#faf7f2] via-[#fffdf9] to-[#faf7f2] p-8 md:p-12 shadow-sm">
            {/* Background elements */}
            <div className="absolute right-0 top-0 -mr-16 -mt-16 w-64 h-64 bg-[#c65a3a]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute left-1/3 bottom-0 -ml-16 -mb-16 w-64 h-64 bg-[#6b8e4e]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="space-y-4 max-w-xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#6b8e4e]/20 bg-[#6b8e4e]/5 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#6b8e4e]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6b8e4e] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6b8e4e]"></span>
                  </span>
                  Đề xuất thông minh bằng AI
                </div>
                <h2 className="font-marketing text-2xl md:text-3xl font-bold text-fg leading-tight">
                  Tìm căn hộ phù hợp nhất với bạn bằng Trợ lý ảo TH Proptech
                </h2>
                <p className="text-sm text-[#7a6a61] font-body leading-relaxed">
                  Trải nghiệm công cụ khảo sát thông minh giúp AI phân tích tài
                  chính, nhu cầu tiện ích và nhân khẩu học để đề xuất căn hộ
                  khớp đến 99%. Hoàn toàn miễn phí.
                </p>
              </div>

              <div className="shrink-0">
                <Link href={'/ai-visual' as Route}>
                  <button
                    type="button"
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#9f3f2a] hover:bg-[#833221] px-8 py-4 font-display text-sm font-bold text-white shadow-lg transition-all active:scale-95 cursor-pointer"
                  >
                    <svg
                      className="w-4 h-4 text-[#e9a23b] fill-[#e9a23b]/20 group-hover:rotate-12 transition-transform"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z" />
                      <path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5.5Z" />
                      <path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1.5Z" />
                    </svg>
                    Tham khảo Trợ lý ảo TH Proptech
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <FeaturedApartments
          results={recommendation.results}
          isLoading={recommendation.isLoading}
          likedIds={recommendation.likedIds}
          hasSubmitted={recommendation.hasSubmitted}
          handleFeedback={recommendation.handleFeedback}
          onOpenSurvey={handleOpenSurvey}
          isAuthenticated={!!user}
        />
        <ComparisonSection />
        <ApartmentTypes />
        <RentalProcessTimeline />
        <LandlordSection />
        <TechnologyDeepDive />
        <StatsSection />
        <FeaturedLocations />
        <WhyChooseUs />
        <TestimonialsSection />
        <FaqSection />
        <BlogKnowledgeSection />
        <SecurityCommitmentsSection />
        <NewsletterSection />
        <FinalCtaBanner />
      </main>

      {/* Page Footer */}
      <Footer />

      {/* Recommendation Modal */}
      <RecommendationModal
        isOpen={isRecOpen}
        onClose={() => setIsRecOpen(false)}
        recommendation={recommendation}
      />

      {/* Authentication Required Modal */}
      <AuthRequiredModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        title="Yêu cầu đăng nhập"
        description={
          <>
            Vui lòng đăng nhập để thực hiện khảo sát căn hộ.
            <br />
            <span className="text-xs text-subtle">
              Hệ thống AI cần liên kết thông tin khảo sát với tài khoản của bạn
              để đề xuất và lưu trữ danh sách phù hợp nhất.
            </span>
          </>
        }
      />
    </div>
  )
}
