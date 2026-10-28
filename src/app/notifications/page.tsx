import * as React from 'react'
import type { Metadata } from 'next'
import { HomeHeader } from '@/widgets/home-dashboard/ui/home-header'
import { Footer } from '@/shared/ui/footer'
import { NotificationCenter } from '@/widgets/notification-center'

export const metadata: Metadata = {
  title: 'Thông báo',
}

export default function NotificationsPage(): React.ReactElement {
  return (
    <div className="relative flex min-h-screen flex-col justify-between overflow-x-hidden bg-bg text-fg selection:bg-primary/20 selection:text-primary">
      <div>
        <HomeHeader />

        <main className="w-full pb-12 pt-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <NotificationCenter />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}
