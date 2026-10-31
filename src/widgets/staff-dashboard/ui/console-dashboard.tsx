'use client'

import * as React from 'react'
import type { Route } from 'next'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Logo } from '@/shared/ui/logo'
import { AdminCard } from '@/shared/ui/admin-card'
import { OwnershipTransferPanel } from '@/features/property-ownership-transfer'
import { LayoutProfileEditor } from '@/features/contract-layouts'
import { FeeRevenueReport, FeeScheduleEditor } from '@/features/platform-fees'
import { AdminWalletsView } from '@/features/admin-wallets'
import { StaffDesignRequestsView } from '@/features/design-requests'
import { HomeView } from './views/home-view'
import { OverviewView } from './views/overview-view'
import { PropertyApprovalsView } from './views/property-approvals-view'
import { KycApprovalsView } from './views/kyc-approvals-view'
import { SchedulesView } from './views/schedules-view'
import { CommunityView } from './views/community-view'
import { SafetyReportsView } from './views/safety-reports-view'
import { SupportQueueView } from './views/support-queue-view'
import { ApartmentManagementView } from './views/apartment-management-view'
import { FabricAuditView } from './views/fabric-audit-view'
import { PermissionMatrixView } from './views/permission-matrix-view'
import { PoliciesView } from './views/policies-view'
import { RentalFlowControlView } from './views/rental-flow-control-view'
import { AiConfigView } from './views/ai-config-view'
import { ApartmentDesignsView } from './views/apartment-designs-view'
import { LegalKnowledgeView } from './views/legal-knowledge-view'
import { PaymentOperationsView } from './views/payment-operations-view'
import {
  NAV_GROUP_LABELS,
  NAV_TAB_IDS,
  resolveConsoleTab,
  visibleNavItems,
  type NavGroup,
  type NavItem,
  type NavTabId,
} from '../model/nav-registry'
import { useNavConfig } from '../model/use-nav-config'
import { PermissionsProvider, useMyPermissions } from '@/shared/lib/permissions'
import { NavCustomizeDialog } from './nav-customize-dialog'

interface ConsoleDashboardProps {
  initialUser: {
    name: string
    email: string
    roles: string[]
  }
}

const GROUP_ORDER: readonly NavGroup[] = ['operations', 'system']

function renderView(
  tab: NavTabId,
  navigate: (tab: NavTabId) => void
): React.ReactNode {
  switch (tab) {
    case 'home':
      return <HomeView onNavigateTab={navigate} />
    case 'overview':
      return <OverviewView />
    case 'apartments':
      return <ApartmentManagementView />
    case 'properties':
      return <PropertyApprovalsView />
    case 'kyc':
      return <KycApprovalsView />
    case 'schedules':
      return <SchedulesView />
    case 'safety-reports':
      return <SafetyReportsView />
    case 'support-tickets':
      return <SupportQueueView />
    case 'community':
      return <CommunityView />
    case 'design-requests':
      return <StaffDesignRequestsView />
    case 'fabric-audit':
      return <FabricAuditView />
    case 'permissions':
      return <PermissionMatrixView />
    case 'policies':
      return <PoliciesView />
    case 'rental-flow':
      return <RentalFlowControlView />
    case 'ownership-transfer':
      return <OwnershipTransferPanel />
    case 'ai-engine':
      return <AiConfigView />
    case 'contract-layouts':
      return <LayoutProfileEditor profileKey="default" />
    case 'fees':
      return (
        <div className="space-y-5">
          <FeeScheduleEditor />
          <FeeRevenueReport />
        </div>
      )
    case 'wallets':
      return <AdminWalletsView />
    case 'payment-history':
      return <PaymentOperationsView />
    case 'apartment-designs':
      return <ApartmentDesignsView />
    case 'legal-knowledge':
      return <LegalKnowledgeView />
  }
}

const VIEWS_WITH_OWN_TITLE = new Set([
  'home',
  'overview',
  'properties',
  'apartments',
  'kyc',
  'schedules',
  'community',
  'support',
  'safety',
])

/**
 * Bảng điều khiển dùng chung cho quản trị viên (`/admin`) và nhân viên (`/staff`): cùng một menu trái, nhân viên
 * chỉ thấy các mục vận hành chưa bị admin ẩn.
 */
export function ConsoleDashboard({
  initialUser,
}: ConsoleDashboardProps): React.ReactElement {
  const pathname = usePathname()
  const router = useRouter()
  const isAdmin = initialUser.roles.includes('admin')
  const basePath = pathname.startsWith('/staff') ? '/staff' : '/admin'
  const navConfig = useNavConfig()
  const myPermissions = useMyPermissions()
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = React.useState(false)

  // Nhân viên chờ cấu hình và quyền để khỏi thấy nháy các mục đã bị ẩn. Lỗi tải thì hiện đủ mục vận
  // hành (backend vẫn chặn thật).
  const waitingForConfig =
    !isAdmin && (navConfig.isPending || myPermissions.isPending)
  const permissionMap = myPermissions.data?.permissions ?? null
  const items = React.useMemo<NavItem[]>(
    () =>
      waitingForConfig
        ? []
        : visibleNavItems(
            isAdmin,
            navConfig.data?.hiddenForStaff ?? [],
            subject => permissionMap?.[`read:${subject}`] ?? true
          ),
    [isAdmin, waitingForConfig, navConfig.data, permissionMap]
  )
  const activeTab = resolveConsoleTab(pathname, items)

  // Nhân viên làm việc ở /staff: link /admin/<mục> cũ chuyển sang /staff/<mục> tương ứng.
  React.useEffect(() => {
    if (isAdmin || !pathname.startsWith('/admin')) return
    const section = pathname.split('/')[2]
    if (section && !(NAV_TAB_IDS as readonly string[]).includes(section)) return
    router.replace(`/staff/${section ?? 'overview'}` as Route)
  }, [isAdmin, pathname, router])
  const activeItem = items.find(item => item.id === activeTab)

  const groups = GROUP_ORDER.map(group => ({
    group,
    items: items.filter(item => item.group === group),
  })).filter(entry => entry.items.length > 0)

  const navigate = (tab: NavTabId): void => {
    router.push(`${basePath}/${tab}` as Route)
    setIsSidebarOpen(false)
  }

  const handleLogout = (): void => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    localStorage.setItem('showLogoutToast', 'true')
    window.location.href = '/'
  }

  const userInitials = initialUser.name
    ? initialUser.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : isAdmin
      ? 'AD'
      : 'OP'

  return (
    <div className="min-h-screen bg-bg text-fg font-body flex relative overflow-hidden">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-fg/40 backdrop-blur-xs lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ═══ SIDEBAR ═══ */}
      <aside
        className={`w-[260px] bg-surface border-r border-line h-screen flex flex-col justify-between shrink-0 fixed lg:sticky top-0 z-40 transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-6">
            <Logo size="md" variant="default" />
            <button
              type="button"
              aria-label="Đóng menu"
              onClick={() => setIsSidebarOpen(false)}
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

          <nav
            aria-label="Menu chính"
            className="min-h-0 flex-1 overflow-y-auto p-4"
          >
            {waitingForConfig ? (
              <p role="status" className="px-4 text-xs text-muted">
                Đang tải menu...
              </p>
            ) : null}
            {groups.map(({ group, items: groupItems }) => (
              <div key={group} className="mb-3 space-y-1 last:mb-0">
                {groups.length > 1 ? (
                  <p className="px-4 pb-1 pt-2 text-[10px] font-bold uppercase tracking-widest text-muted">
                    {NAV_GROUP_LABELS[group]}
                  </p>
                ) : null}
                {groupItems.map(item => (
                  <button
                    key={item.id}
                    type="button"
                    aria-current={activeTab === item.id ? 'page' : undefined}
                    onClick={() => navigate(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left text-xs font-semibold rounded-lg transition-all duration-200 ${
                      activeTab === item.id
                        ? 'bg-primary text-on-control shadow-sm'
                        : 'text-muted hover:bg-fg/5 hover:text-fg'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </div>
            ))}
          </nav>

          {isAdmin ? (
            <div className="shrink-0 border-t border-line p-3">
              <NavCustomizeDialog />
            </div>
          ) : null}
        </div>

        <div className="relative shrink-0 border-t border-line bg-surface-muted/20 p-4">
          {isProfileMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-40 cursor-default"
                onClick={() => setIsProfileMenuOpen(false)}
              />
              <AdminCard className="absolute bottom-full left-4 right-4 mb-2 shadow-lg py-1 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
                <button
                  type="button"
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
              </AdminCard>
            </>
          )}

          <button
            type="button"
            onClick={() => setIsProfileMenuOpen(prev => !prev)}
            className="w-full flex items-center justify-between gap-3 text-left p-1.5 rounded-lg hover:bg-fg/5 transition-colors group relative z-10"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="h-9 w-9 rounded-full bg-accent/10 border border-accent/25 text-accent flex items-center justify-center font-bold text-xs font-display shrink-0">
                {userInitials}
              </div>
              <div className="overflow-hidden">
                <span className="text-xs font-bold text-fg block font-body leading-none truncate group-hover:text-primary transition-colors">
                  {initialUser.name ||
                    (isAdmin ? 'Quản trị viên' : 'Nhân viên')}
                </span>
                <span className="text-[10px] text-muted block mt-0.5 truncate">
                  {initialUser.email}
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

      {/* ═══ MAIN ═══ */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <header className="min-h-16 bg-surface border-b border-line px-3 sm:px-6 flex items-center justify-between sticky top-0 z-30 shrink-0 gap-2">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <button
              type="button"
              aria-label="Mở menu"
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-fg/5 text-fg rounded-lg transition-colors shrink-0 min-h-11 min-w-11 flex items-center justify-center"
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
            <h1
              className={`text-base font-bold text-fg font-marketing truncate min-w-0 ${
                activeTab && VIEWS_WITH_OWN_TITLE.has(activeTab)
                  ? 'hidden sm:block'
                  : ''
              }`}
            >
              {activeItem?.label ?? 'Bảng điều khiển'}
            </h1>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {isAdmin ? (
              <span className="text-[10px] font-bold text-[#e9a23b] bg-[#fbedcf] px-2.5 py-1 rounded-full border border-[#e9a23b]/20 shrink-0 whitespace-nowrap">
                <span className="hidden sm:inline">Role: </span>Quản trị viên
              </span>
            ) : (
              <span className="text-[10px] font-bold text-[#c65a3a] bg-[#f5e3dc] px-2.5 py-1 rounded-full border border-[#c65a3a]/20 shrink-0 whitespace-nowrap">
                <span className="hidden sm:inline">Role: </span>Nhân viên vận
                hành
              </span>
            )}
            <Link
              href="/"
              className="text-xs font-semibold text-muted hover:text-fg transition-colors flex items-center gap-1.5 shrink-0 px-2 py-1.5 rounded-lg min-h-11"
            >
              <span className="hidden sm:inline">Trang chủ</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="shrink-0"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="text-xs font-semibold text-danger hover:bg-danger/10 transition-colors flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg shrink-0 whitespace-nowrap min-h-11"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="shrink-0"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span>Đăng xuất</span>
            </button>
          </div>
        </header>

        <main className="flex-grow p-4 sm:p-6 lg:p-8 pb-24 sm:pb-24">
          <div className="max-w-6xl mx-auto">
            {activeTab ? (
              <PermissionsProvider permissions={isAdmin ? null : permissionMap}>
                {renderView(activeTab, navigate)}
              </PermissionsProvider>
            ) : waitingForConfig ? null : (
              <AdminCard className="p-6 text-center">
                <h2 className="text-sm font-bold text-fg">
                  Chưa có mục nào được bật cho tài khoản này
                </h2>
                <p className="mt-2 text-xs text-muted">
                  Vui lòng liên hệ quản trị viên để được cấp quyền truy cập.
                </p>
              </AdminCard>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
