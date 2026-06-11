'use client'

import * as React from 'react'
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

export function HomeDashboard(): React.ReactElement {
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
        <PlatformOverview />
        <FeaturedApartments />
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
    </div>
  )
}
