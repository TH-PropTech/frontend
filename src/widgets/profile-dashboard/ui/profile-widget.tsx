'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Tabs, TabsContent } from '@/shared/ui/tabs'
import { useProfile } from '../model/use-profile'
import { ProfileHeader } from './profile-header'
import { ProfileSidebarNav, type TabKey } from './profile-sidebar-nav'
import { TabProgress } from './tab-progress'
import { TabBills } from './tab-bills'
import { TabWallet } from './tab-wallet'
import { TabMaintenance } from './tab-maintenance'
import { TabBlockchain } from './tab-blockchain'
import { TabSecurity } from './tab-security'
import { TabMyListings } from './tab-my-listings'
import { TabLandlordApplications } from './tab-landlord-applications'
import { TabTenantApplications } from './tab-tenant-applications'
import { ModalKyc } from './modal-kyc'
import { ModalHandover } from './modal-handover'
import { ModalContract } from './modal-contract'
import { ModalHandoverArchive } from './modal-handover-archive'
import { ProfileFeatureHub } from './profile-feature-hub'
import { ProfileSkeleton } from './profile-skeleton'

export function ProfileWidget(): React.ReactElement {
  const router = useRouter()
  const profile = useProfile()
  const { activeTab, setActiveTab, role, isInitialLoading } = profile

  const [isUnauthenticated] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return !localStorage.getItem('accessToken')
    }
    return false
  })

  React.useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('accessToken')) {
      router.replace('/login')
    }
  }, [router])

  if (isUnauthenticated || isInitialLoading) {
    return <ProfileSkeleton />
  }

  return (
    <>
      <ProfileHeader profile={profile} />

      {/* 2-Column Responsive Layout: Left Sidebar + Right Content */}
      <Tabs
        value={activeTab}
        onValueChange={val => setActiveTab(val as TabKey)}
        className="w-full"
      >
        <div className="flex flex-col lg:flex-row gap-5 items-start w-full">
          {/* Left Vertical Navigation Sidebar */}
          <ProfileSidebarNav
            activeTab={activeTab}
            onSelectTab={val => setActiveTab(val)}
            role={role}
          />

          {/* Right Main Content Area */}
          <div className="flex-1 min-w-0 w-full">
            <TabsContent value="progress" className="outline-none mt-0">
              <TabProgress profile={profile} />
            </TabsContent>

            <TabsContent value="saved-searches" className="outline-none mt-0">
              <ProfileFeatureHub feature="saved-searches" />
            </TabsContent>

            <TabsContent value="safety-reports" className="outline-none mt-0">
              <ProfileFeatureHub feature="safety-reports" />
            </TabsContent>

            <TabsContent value="bills" className="outline-none mt-0">
              <TabBills profile={profile} />
            </TabsContent>

            <TabsContent value="wallet" className="outline-none mt-0">
              <TabWallet profile={profile} />
            </TabsContent>

            <TabsContent value="maintenance" className="outline-none mt-0">
              <TabMaintenance profile={profile} />
            </TabsContent>

            <TabsContent value="support-tickets" className="outline-none mt-0">
              <ProfileFeatureHub feature="support-tickets" />
            </TabsContent>

            <TabsContent value="blockchain" className="outline-none mt-0">
              <TabBlockchain profile={profile} />
            </TabsContent>

            <TabsContent value="security" className="outline-none mt-0">
              <TabSecurity profile={profile} />
            </TabsContent>

            {role === 'landlord' && (
              <TabsContent value="listings" className="outline-none mt-0">
                <TabMyListings />
              </TabsContent>
            )}

            <TabsContent
              value="rental-applications"
              className="outline-none mt-0"
            >
              {role === 'landlord' ? (
                <TabLandlordApplications />
              ) : (
                <TabTenantApplications />
              )}
            </TabsContent>
          </div>
        </div>
      </Tabs>

      {/* Modals */}
      <ModalKyc profile={profile} />
      <ModalHandover profile={profile} />
      <ModalContract profile={profile} />
      <ModalHandoverArchive profile={profile} />
    </>
  )
}
