'use client'

import * as React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/ui/tabs'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/shared/ui/dropdown-menu'
import { useProfile } from '../model/use-profile'
import { ProfileHeader } from './profile-header'
import { TabProgress } from './tab-progress'
import { TabBills } from './tab-bills'
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
import {
  Activity,
  FileText,
  Wrench,
  Database,
  Settings,
  Building,
  Bookmark,
  Headphones,
  Calculator,
  ShieldCheck,
  ChevronDown,
  Users,
} from 'lucide-react'

type TabKey =
  | 'progress'
  | 'bills'
  | 'blockchain'
  | 'maintenance'
  | 'security'
  | 'listings'
  | 'saved-searches'
  | 'living-cost'
  | 'safety-reports'
  | 'support-tickets'
  | 'rental-applications'

const TRIGGER_CLASS =
  'pb-3 rounded-none border-b-2 border-transparent bg-transparent px-0 font-semibold text-muted hover:text-fg data-[state=active]:text-primary data-[state=active]:border-primary data-[state=active]:font-bold data-[state=active]:bg-transparent shadow-none transition-all cursor-pointer inline-flex items-center'

interface MoreItem {
  value: TabKey
  label: string
  icon: React.ReactNode
}

export function ProfileWidget(): React.ReactElement {
  const profile = useProfile()
  const { activeTab, setActiveTab, role } = profile

  const moreItems: MoreItem[] = [
    {
      value: 'living-cost',
      label: 'Chi phí sinh hoạt',
      icon: <Calculator className="h-4 w-4 text-primary shrink-0" />,
    },
    {
      value: 'safety-reports',
      label: 'Báo cáo an toàn',
      icon: <ShieldCheck className="h-4 w-4 text-primary shrink-0" />,
    },
    {
      value: 'blockchain',
      label: 'Nhật ký giao dịch',
      icon: <Database className="h-4 w-4 text-primary shrink-0" />,
    },
    {
      value: 'security',
      label: 'Bảo mật & Cài đặt',
      icon: <Settings className="h-4 w-4 text-primary shrink-0" />,
    },
  ]

  const activeMoreItem = moreItems.find(i => i.value === activeTab)

  return (
    <>
      <ProfileHeader profile={profile} />

      {/* FSD Tabs Navigation */}
      <Tabs
        value={activeTab}
        onValueChange={val => setActiveTab(val as TabKey)}
        className="w-full"
      >
        <TabsList className="flex flex-wrap items-center border-b border-border bg-transparent p-0 rounded-none mb-8 gap-x-6 gap-y-2 text-sm font-semibold h-auto justify-start">
          {/* === Primary Tabs === */}
          <TabsTrigger value="progress" className={TRIGGER_CLASS}>
            <Activity className="h-4 w-4 mr-1.5 shrink-0" />
            {role === 'tenant' ? 'Tiến trình thuê nhà' : 'Tiến trình cho thuê'}
          </TabsTrigger>

          {role === 'landlord' && (
            <TabsTrigger value="listings" className={TRIGGER_CLASS}>
              <Building className="h-4 w-4 mr-1.5 shrink-0" />
              Tin đăng của tôi
            </TabsTrigger>
          )}

          {role === 'landlord' ? (
            <TabsTrigger value="rental-applications" className={TRIGGER_CLASS}>
              <Users className="h-4 w-4 mr-1.5 shrink-0" />
              Hồ sơ đặt thuê
            </TabsTrigger>
          ) : (
            <TabsTrigger value="rental-applications" className={TRIGGER_CLASS}>
              <Users className="h-4 w-4 mr-1.5 shrink-0" />
              Đơn thuê đã gửi
            </TabsTrigger>
          )}

          <TabsTrigger value="saved-searches" className={TRIGGER_CLASS}>
            <Bookmark className="h-4 w-4 mr-1.5 shrink-0" />
            Tìm kiếm đã lưu
          </TabsTrigger>

          <TabsTrigger value="bills" className={TRIGGER_CLASS}>
            <FileText className="h-4 w-4 mr-1.5 shrink-0" />
            {role === 'tenant' ? 'Hóa đơn & Giao dịch' : 'Hóa đơn & Doanh thu'}
          </TabsTrigger>

          <TabsTrigger value="maintenance" className={TRIGGER_CLASS}>
            <Wrench className="h-4 w-4 mr-1.5 shrink-0" />
            {role === 'tenant' ? 'Báo cáo sự cố & Bảo trì' : 'Quản lý sự cố'}
          </TabsTrigger>

          <TabsTrigger value="support-tickets" className={TRIGGER_CLASS}>
            <Headphones className="h-4 w-4 mr-1.5 shrink-0" />
            Hỗ trợ kỹ thuật
          </TabsTrigger>

          {/* === Dropdown "Thêm ▾" === */}
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <TabsTrigger
                value={activeMoreItem ? activeMoreItem.value : 'more-trigger'}
                className={TRIGGER_CLASS}
              >
                {activeMoreItem ? (
                  <>
                    {activeMoreItem.icon}
                    <span className="ml-1.5 mr-1">{activeMoreItem.label}</span>
                  </>
                ) : (
                  <span className="mr-1">Thêm</span>
                )}
                <ChevronDown className="h-3.5 w-3.5 opacity-70 shrink-0" />
              </TabsTrigger>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="w-56 p-1.5 shadow-xl rounded-xl border border-border bg-surface z-50"
            >
              {moreItems.map(item => {
                const isActive = activeTab === item.value
                return (
                  <DropdownMenuItem
                    key={item.value}
                    onClick={() => setActiveTab(item.value)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm cursor-pointer transition-colors ${
                      isActive
                        ? 'font-bold text-primary bg-primary/10 focus:bg-primary/10 focus:text-primary'
                        : 'text-fg hover:bg-surface-muted focus:bg-surface-muted focus:text-fg'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </TabsList>

        {/* === Tab Contents === */}
        <TabsContent value="progress" className="outline-none">
          <TabProgress profile={profile} />
        </TabsContent>

        <TabsContent value="saved-searches" className="outline-none">
          <ProfileFeatureHub feature="saved-searches" />
        </TabsContent>

        <TabsContent value="living-cost" className="outline-none">
          <ProfileFeatureHub feature="living-cost" />
        </TabsContent>

        <TabsContent value="safety-reports" className="outline-none">
          <ProfileFeatureHub feature="safety-reports" />
        </TabsContent>

        <TabsContent value="bills" className="outline-none">
          <TabBills profile={profile} />
        </TabsContent>

        <TabsContent value="maintenance" className="outline-none">
          <TabMaintenance profile={profile} />
        </TabsContent>

        <TabsContent value="support-tickets" className="outline-none">
          <ProfileFeatureHub feature="support-tickets" />
        </TabsContent>

        <TabsContent value="blockchain" className="outline-none">
          <TabBlockchain profile={profile} />
        </TabsContent>

        <TabsContent value="security" className="outline-none">
          <TabSecurity profile={profile} />
        </TabsContent>

        {role === 'landlord' && (
          <TabsContent value="listings" className="outline-none">
            <TabMyListings />
          </TabsContent>
        )}

        <TabsContent value="rental-applications" className="outline-none">
          {role === 'landlord' ? (
            <TabLandlordApplications />
          ) : (
            <TabTenantApplications />
          )}
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
