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
import { FaqSection } from './components/faq-section'
import { SecurityCommitmentsSection } from './components/security-commitments-section'
import { FinalCtaBanner } from './components/final-cta-banner'
import { useHomeApartments } from '../model/use-home-apartments'
import {
  buildBedroomStats,
  buildDistrictStats,
  toFeaturedCard,
} from '../model/home-apartment-stats'
import {
  RecommendationModal,
  useRecommendation,
} from '@/features/ai-recommendation'

export function HomeDashboard(): React.ReactElement {
  const [isRecOpen, setIsRecOpen] = React.useState(false)
  const [user, setUser] = React.useState<{
    name: string
    kycStatus: string
  } | null>(null)

  const recommendation = useRecommendation()
  const { apartments, isLoading: isApartmentsLoading } = useHomeApartments()
  const featuredCards = React.useMemo(
    () => apartments.filter(item => item.priceNum > 0).map(toFeaturedCard),
    [apartments]
  )
  const districtStats = React.useMemo(
    () => buildDistrictStats(apartments),
    [apartments]
  )
  const bedroomStats = React.useMemo(
    () => buildBedroomStats(apartments),
    [apartments]
  )

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

  const handleOpenSurvey = () => setIsRecOpen(true)

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
          <div className="w-full bg-[#faf7f2] py-8 border-b border-[#e3d8d0]/60 relative z-10">
            <div className="max-w-6xl mx-auto px-6 md:px-10">
              <div className="bg-[#fffdf9] border border-[#e3d8d0] rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl text-[#c65a3a] shrink-0">
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

        <FeaturedApartments
          apartments={featuredCards}
          isApartmentsLoading={isApartmentsLoading}
          results={recommendation.results}
          isLoading={recommendation.isLoading}
          likedIds={recommendation.likedIds}
          hasSubmitted={recommendation.hasSubmitted}
          handleFeedback={recommendation.handleFeedback}
          onOpenSurvey={handleOpenSurvey}
          isAuthenticated={!!user}
        />
        <ComparisonSection />
        <ApartmentTypes types={bedroomStats} />
        <RentalProcessTimeline />
        <LandlordSection />
        <TechnologyDeepDive />
        <StatsSection />
        <FeaturedLocations districts={districtStats} />
        <WhyChooseUs />
        <FaqSection />
        <SecurityCommitmentsSection />
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
    </div>
  )
}
