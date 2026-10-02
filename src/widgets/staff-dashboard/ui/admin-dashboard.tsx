'use client'

import * as React from 'react'
import type { Route } from 'next'
import {
  Activity,
  ArrowRightLeft,
  Cpu,
  DollarSign,
  LayoutTemplate,
} from 'lucide-react'
import { OverviewView } from './views/overview-view'
import { ContractMonitorView } from './views/contract-monitor-view'
import { AiConsultationView } from './views/ai-consultation-view'
import { PermissionMatrixView } from './views/permission-matrix-view'
import { PoliciesView } from './views/policies-view'
import { RentalFlowControlView } from './views/rental-flow-control-view'
import { RecommendationEngineView } from './views/recommendation-engine-view'
import { Logo } from '@/shared/ui/logo'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { OwnershipTransferPanel } from '@/features/property-ownership-transfer'
import { LayoutProfileEditor } from '@/features/contract-layouts'
import { FeeRevenueReport, FeeScheduleEditor } from '@/features/platform-fees'
import { StuckTransactionsView } from '@/features/rental-transactions'

type TabType =
  | 'overview'
  | 'contracts'
  | 'ai-consultation'
  | 'permissions'
  | 'policies'
  | 'rental-flow'
  | 'ownership-transfer'
  | 'ai-engine'
  | 'contract-layouts'
  | 'fees'
  | 'rental-ops'

const ADMIN_TABS: readonly TabType[] = [
  'overview',
  'contracts',
  'ai-consultation',
  'permissions',
  'policies',
  'rental-flow',
  'ownership-transfer',
  'ai-engine',
  'contract-layouts',
  'fees',
  'rental-ops',
]

export function resolveAdminTab(pathname: string): TabType {
  const section = pathname.split('/')[2]
  return ADMIN_TABS.includes(section as TabType)
    ? (section as TabType)
    : 'overview'
}

interface SidebarItem {
  type: TabType
  label: string
  icon: React.ReactNode
}

interface AdminDashboardProps {
  initialUser: {
    name: string
    email: string
    roles: string[]
  }
}

export function AdminDashboard({
  initialUser,
}: AdminDashboardProps): React.ReactElement {
  const pathname = usePathname()
  const router = useRouter()
  const activeTab = resolveAdminTab(pathname)
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = React.useState(false)

  const sidebarItems: SidebarItem[] = [
    {
      type: 'overview',
      label: 'Tổng quan hệ thống',
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="3" width="7" height="9" />
          <rect x="14" y="3" width="7" height="5" />
          <rect x="14" y="12" width="7" height="9" />
          <rect x="3" y="16" width="7" height="5" />
        </svg>
      ),
    },
    {
      type: 'contracts',
      label: 'Ví & Smart Contracts',
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="2" y="5" width="20" height="14" rx="2" ry="2" />
          <line x1="2" y1="10" x2="22" y2="10" />
        </svg>
      ),
    },
    {
      type: 'ai-consultation',
      label: 'Tư vấn ảo & Gửi thư mời',
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path
            d="M8 10h.01M12 10h.01M16 10h.01"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      type: 'permissions',
      label: 'Ma trận Phân quyền',
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      ),
    },
    {
      type: 'policies',
      label: 'Chính sách & Điều khoản',
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
    },
    {
      type: 'rental-flow',
      label: 'Quy trình thuê',
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="4" y1="21" x2="4" y2="14" />
          <line x1="4" y1="10" x2="4" y2="3" />
          <line x1="12" y1="21" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12" y2="3" />
          <line x1="20" y1="21" x2="20" y2="16" />
          <line x1="20" y1="12" x2="20" y2="3" />
          <line x1="1" y1="14" x2="7" y2="14" />
          <line x1="9" y1="8" x2="15" y2="8" />
          <line x1="17" y1="16" x2="23" y2="16" />
        </svg>
      ),
    },
    {
      type: 'ownership-transfer',
      label: 'Chuyển quyền chủ nhà',
      icon: <ArrowRightLeft className="h-[18px] w-[18px]" aria-hidden="true" />,
    },
    {
      type: 'ai-engine',
      label: 'Cấu hình AI Engine',
      icon: <Cpu className="h-[18px] w-[18px]" />,
    },
    {
      type: 'contract-layouts',
      label: 'Bố cục hợp đồng',
      icon: <LayoutTemplate className="h-[18px] w-[18px]" />,
    },
    {
      type: 'fees',
      label: 'Biểu phí & doanh thu',
      icon: <DollarSign className="h-[18px] w-[18px]" />,
    },
    {
      type: 'rental-ops',
      label: 'Vận hành giao dịch thuê',
      icon: <Activity className="h-[18px] w-[18px]" aria-hidden="true" />,
    },
  ]

  const handleSidebarItemClick = (type: TabType): void => {
    router.push(`/admin/${type}` as Route)
    setIsSidebarOpen(false)
  }

  const toggleSidebar = (): void => {
    setIsSidebarOpen(prev => !prev)
  }

  const toggleProfileMenu = (): void => {
    setIsProfileMenuOpen(prev => !prev)
  }

  const closeProfileMenu = (): void => {
    setIsProfileMenuOpen(false)
  }

  const handleLogout = (): void => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    localStorage.setItem('showLogoutToast', 'true')
    window.location.href = '/'
  }

  const renderActiveView = (): React.ReactNode => {
    switch (activeTab) {
      case 'overview':
        return <OverviewView />
      case 'contracts':
        return <ContractMonitorView />
      case 'ai-consultation':
        return <AiConsultationView />
      case 'permissions':
        return <PermissionMatrixView />
      case 'policies':
        return <PoliciesView />
      case 'rental-flow':
        return <RentalFlowControlView />
      case 'ownership-transfer':
        return <OwnershipTransferPanel />
      case 'ai-engine':
        return <RecommendationEngineView />
      case 'contract-layouts':
        return <LayoutProfileEditor profileKey="default" />
      case 'fees':
        return (
          <div className="space-y-5">
            <FeeScheduleEditor />
            <FeeRevenueReport />
          </div>
        )
      case 'rental-ops':
        return <StuckTransactionsView />
      default:
        return <OverviewView />
    }
  }

  const getTabTitle = (): string => {
    const matched = sidebarItems.find(item => item.type === activeTab)
    return matched ? matched.label : 'Bảng điều khiển'
  }

  const userInitials = initialUser.name
    ? initialUser.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'AD'

  return (
    <div className="min-h-screen bg-bg text-fg font-body flex relative overflow-hidden">
      {/* ═══ MOBILE SIDEBAR OVERLAY ═══ */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-fg/40 backdrop-blur-xs lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* ═══ SIDEBAR PANEL ═══ */}
      <aside
        className={`w-[260px] bg-surface border-r border-line h-screen flex flex-col justify-between shrink-0 fixed lg:sticky top-0 z-40 transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col">
          {/* Sidebar Header Logo */}
          <div className="h-16 px-6 border-b border-line flex items-center justify-between">
            <Logo size="md" variant="default" />
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-1.5 hover:bg-fg/5 text-muted rounded-lg transition-colors"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {sidebarItems.map(item => (
              <button
                key={item.type}
                onClick={() => handleSidebarItemClick(item.type)}
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
        <div className="p-4 border-t border-line bg-surface-muted/20 relative">
          {isProfileMenuOpen && (
            <>
              {/* Click outside overlay to close */}
              <div
                className="fixed inset-0 z-40 cursor-default"
                onClick={closeProfileMenu}
              />
              {/* Dropdown Box */}
              <div className="absolute bottom-full left-4 right-4 mb-2 bg-surface border border-line rounded-lg shadow-lg py-1 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2.5 text-xs font-bold text-danger hover:bg-fg/5 transition-colors flex items-center gap-2"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Đăng xuất
                </button>
              </div>
            </>
          )}

          <button
            onClick={toggleProfileMenu}
            className="w-full flex items-center justify-between gap-3 text-left p-1.5 rounded-lg hover:bg-fg/5 transition-colors group relative z-10"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="h-9 w-9 rounded-full bg-accent/10 border border-accent/25 text-accent flex items-center justify-center font-bold text-xs font-display shrink-0">
                {userInitials}
              </div>
              <div className="overflow-hidden">
                <span className="text-xs font-bold text-fg block font-body leading-none truncate group-hover:text-primary transition-colors">
                  {initialUser.name || 'Culi Vận Hành #04'}
                </span>
                <span className="text-[10px] text-muted block mt-0.5 truncate">
                  {initialUser.email || 'operator@th-proptech.vn'}
                </span>
              </div>
            </div>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className={`text-muted shrink-0 transition-transform duration-200 ${
                isProfileMenuOpen ? 'rotate-180' : ''
              }`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      </aside>

      {/* ═══ MAIN WORKSPACE AREA ═══ */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Topbar Header */}
        <header className="h-16 bg-surface border-b border-line px-6 flex items-center justify-between sticky top-0 z-30 shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 hover:bg-fg/5 text-fg rounded-lg transition-colors"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <h1 className="text-base font-bold text-fg font-marketing">
              {getTabTitle()}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-[#e9a23b] bg-[#fbedcf] px-2.5 py-1 rounded-full border border-[#e9a23b]/20">
              Role: Quản trị viên
            </span>
            <Link
              href="/"
              className="text-xs font-semibold text-muted hover:text-fg transition-colors flex items-center gap-1.5"
            >
              Trang chủ
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </header>

        {/* View content wrap */}
        <main className="flex-grow p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">{renderActiveView()}</div>
        </main>
      </div>
    </div>
  )
}
