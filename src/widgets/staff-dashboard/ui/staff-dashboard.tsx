'use client'

import * as React from 'react'
import { HomeView } from './views/home-view'
import { OverviewView } from './views/overview-view'
import { PropertyApprovalsView } from './views/property-approvals-view'
import { KycApprovalsView } from './views/kyc-approvals-view'
import { SchedulesView } from './views/schedules-view'
import { DisputesView } from './views/disputes-view'
import { ContractMonitorView } from './views/contract-monitor-view'
import { Logo } from '@/shared/ui/logo'
import Link from 'next/link'

type TabType = 'home' | 'overview' | 'properties' | 'kyc' | 'schedules' | 'disputes' | 'contracts'

interface SidebarItem {
  type: TabType
  label: string
  icon: React.ReactNode
}

export function StaffDashboard(): React.ReactElement {
  const [activeTab, setActiveTab] = React.useState<TabType>('home')
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)

  const sidebarItems: SidebarItem[] = [
    {
      type: 'home',
      label: 'Trang chủ vận hành',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
      ),
    },
    {
      type: 'overview',
      label: 'Tổng quan hệ thống',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9" /><rect x="14" y="3" width="7" height="5" /><rect x="14" y="12" width="7" height="9" /><rect x="3" y="16" width="7" height="5" /></svg>
      ),
    },
    {
      type: 'properties',
      label: 'Duyệt tin đăng căn hộ',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
      ),
    },
    {
      type: 'kyc',
      label: 'Xác minh định danh (KYC)',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
      ),
    },
    {
      type: 'schedules',
      label: 'Lịch hẹn xem nhà',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
      ),
    },
    {
      type: 'disputes',
      label: 'Tranh chấp cọc Escrow',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
      ),
    },
    {
      type: 'contracts',
      label: 'Ví & Smart Contracts',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" ry="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>
      ),
    },
  ]

  const renderActiveView = (): React.ReactNode => {
    switch (activeTab) {
      case 'home':
        return <HomeView onNavigateTab={(tab) => setActiveTab(tab)} />
      case 'overview':
        return <OverviewView />
      case 'properties':
        return <PropertyApprovalsView />
      case 'kyc':
        return <KycApprovalsView />
      case 'schedules':
        return <SchedulesView />
      case 'disputes':
        return <DisputesView />
      case 'contracts':
        return <ContractMonitorView />
      default:
        return <HomeView onNavigateTab={(tab) => setActiveTab(tab)} />
    }
  }

  const getTabTitle = (): string => {
    const matched = sidebarItems.find(item => item.type === activeTab)
    return matched ? matched.label : 'Bảng điều khiển'
  }

  return (
    <div className="min-h-screen bg-bg text-fg font-body flex relative overflow-hidden">
      {/* ═══ MOBILE SIDEBAR OVERLAY ═══ */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-fg/40 backdrop-blur-xs lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ═══ SIDEBAR PANEL ═══ */}
      <aside className={`w-[260px] bg-surface border-r border-line h-screen flex flex-col justify-between shrink-0 fixed lg:sticky top-0 z-40 transition-transform duration-300 lg:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col">
          {/* Sidebar Header Logo */}
          <div className="h-16 px-6 border-b border-line flex items-center justify-between">
            <Logo size="md" variant="default" />
            <button 
              onClick={() => setIsSidebarOpen(false)} 
              className="lg:hidden p-1.5 hover:bg-fg/5 text-muted rounded-lg transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.type}
                onClick={() => {
                  setActiveTab(item.type)
                  setIsSidebarOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold rounded-lg transition-all duration-200 ${
                  activeTab === item.type
                    ? 'bg-primary text-on-control shadow-sm'
                    : 'text-muted hover:bg-fg/5 hover:text-fg'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer info */}
        <div className="p-4 border-t border-line bg-surface-muted/20">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-accent/10 border border-accent/25 text-accent flex items-center justify-center font-bold text-xs font-display">
              OP
            </div>
            <div className="overflow-hidden">
              <span className="text-xs font-bold text-fg block font-body leading-none">Culi Vận Hành #04</span>
              <span className="text-[10px] text-muted block mt-0.5 truncate">operator@th-proptech.vn</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ═══ MAIN WORKSPACE AREA ═══ */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Topbar Header */}
        <header className="h-16 bg-surface border-b border-line px-6 flex items-center justify-between sticky top-0 z-30 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-fg/5 text-fg rounded-lg transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
            </button>
            <h1 className="text-base font-bold text-fg font-marketing">{getTabTitle()}</h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-muted bg-fg/5 px-2.5 py-1 rounded-full border border-line">
              Role: Nhân viên vận hành
            </span>
            <Link 
              href="/"
              className="text-xs font-semibold text-muted hover:text-fg transition-colors flex items-center gap-1.5"
            >
              Trang chủ
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </Link>
          </div>
        </header>

        {/* View content wrap */}
        <main className="flex-grow p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {renderActiveView()}
          </div>
        </main>
      </div>
    </div>
  )
}
