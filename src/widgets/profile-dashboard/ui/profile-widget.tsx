'use client'

import * as React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/ui/tabs'
import { useProfile } from '../model/use-profile'
import { ProfileHeader } from './profile-header'
import { TabProgress } from './tab-progress'
import { TabBills } from './tab-bills'
import { TabMaintenance } from './tab-maintenance'
import { TabBlockchain } from './tab-blockchain'
import { TabSecurity } from './tab-security'
import { ModalKyc } from './modal-kyc'
import { ModalHandover } from './modal-handover'
import { ModalContract } from './modal-contract'
import { ModalHandoverArchive } from './modal-handover-archive'
import { Activity, FileText, Wrench, Database, Settings } from 'lucide-react'

export function ProfileWidget(): React.ReactElement {
  const profile = useProfile()
  const { activeTab, setActiveTab, role } = profile

  return (
    <>
      <ProfileHeader profile={profile} />

      {/* FSD Tabs Navigation */}
      <Tabs
        value={activeTab}
        onValueChange={val =>
          setActiveTab(
            val as
              | 'progress'
              | 'bills'
              | 'blockchain'
              | 'maintenance'
              | 'security'
          )
        }
        className="w-full"
      >
        <TabsList className="flex border-b border-border bg-transparent p-0 rounded-none mb-8 gap-6 text-sm font-semibold overflow-x-auto whitespace-nowrap pb-2 scrollbar-thin h-auto justify-start">
          <TabsTrigger
            value="progress"
            className="pb-3 rounded-none border-b-2 border-transparent bg-transparent px-0 font-semibold text-muted hover:text-fg data-[state=active]:text-primary data-[state=active]:border-primary data-[state=active]:font-bold data-[state=active]:bg-transparent shadow-none"
          >
            <Activity className="h-4 w-4 mr-1.5" />
            {role === 'tenant' ? 'Tiến trình thuê nhà' : 'Tiến trình cho thuê'}
          </TabsTrigger>
          <TabsTrigger
            value="bills"
            className="pb-3 rounded-none border-b-2 border-transparent bg-transparent px-0 font-semibold text-muted hover:text-fg data-[state=active]:text-primary data-[state=active]:border-primary data-[state=active]:font-bold data-[state=active]:bg-transparent shadow-none"
          >
            <FileText className="h-4 w-4 mr-1.5" />
            {role === 'tenant' ? 'Hóa đơn & Giao dịch' : 'Hóa đơn & Doanh thu'}
          </TabsTrigger>
          <TabsTrigger
            value="maintenance"
            className="pb-3 rounded-none border-b-2 border-transparent bg-transparent px-0 font-semibold text-muted hover:text-fg data-[state=active]:text-primary data-[state=active]:border-primary data-[state=active]:font-bold data-[state=active]:bg-transparent shadow-none"
          >
            <Wrench className="h-4 w-4 mr-1.5" />
            {role === 'tenant'
              ? 'Báo cáo sự cố & Bảo trì'
              : 'Quản lý sự cố khách thuê'}
          </TabsTrigger>
          <TabsTrigger
            value="blockchain"
            className="pb-3 rounded-none border-b-2 border-transparent bg-transparent px-0 font-semibold text-muted hover:text-fg data-[state=active]:text-primary data-[state=active]:border-primary data-[state=active]:font-bold data-[state=active]:bg-transparent shadow-none"
          >
            <Database className="h-4 w-4 mr-1.5" />
            Sổ cái Blockchain
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="pb-3 rounded-none border-b-2 border-transparent bg-transparent px-0 font-semibold text-muted hover:text-fg data-[state=active]:text-primary data-[state=active]:border-primary data-[state=active]:font-bold data-[state=active]:bg-transparent shadow-none"
          >
            <Settings className="h-4 w-4 mr-1.5" />
            Bảo mật & Cài đặt
          </TabsTrigger>
        </TabsList>

        <TabsContent value="progress" className="outline-none">
          <TabProgress profile={profile} />
        </TabsContent>

        <TabsContent value="bills" className="outline-none">
          <TabBills profile={profile} />
        </TabsContent>

        <TabsContent value="maintenance" className="outline-none">
          <TabMaintenance profile={profile} />
        </TabsContent>

        <TabsContent value="blockchain" className="outline-none">
          <TabBlockchain profile={profile} />
        </TabsContent>

        <TabsContent value="security" className="outline-none">
          <TabSecurity profile={profile} />
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <ModalKyc profile={profile} />
      <ModalHandover profile={profile} />
      <ModalContract profile={profile} />
      <ModalHandoverArchive profile={profile} />
    </>
  )
}
