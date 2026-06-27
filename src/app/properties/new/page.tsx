'use client'

import * as React from 'react'
import { HomeHeader } from '@/widgets/home-dashboard/ui/home-header'
import { Footer } from '@/shared/ui/footer'
import { ApartmentPostingForm } from '@/features/apartment-posting'

export default function NewPropertyPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <HomeHeader />
      <main className="mx-auto max-w-5xl px-6 pt-28 pb-20 md:px-10">
        <ApartmentPostingForm mode="create" />
      </main>
      <Footer />
    </div>
  )
}
