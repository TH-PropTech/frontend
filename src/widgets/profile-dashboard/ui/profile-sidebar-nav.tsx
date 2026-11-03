'use client'

import * as React from 'react'
import {
  Activity,
  FileText,
  Wrench,
  Wallet,
  Database,
  Settings,
  Building,
  Bookmark,
  Headphones,
  ShieldCheck,
  Users,
} from 'lucide-react'

export type TabKey =
  | 'progress'
  | 'bills'
  | 'wallet'
  | 'blockchain'
  | 'maintenance'
  | 'security'
  | 'listings'
  | 'saved-searches'
  | 'safety-reports'
  | 'support-tickets'
  | 'rental-applications'

interface NavItem {
  id: TabKey
  label: string
  icon: React.ComponentType<{ className?: string }>
  landlordOnly?: boolean
}

interface NavGroup {
  groupTitle: string
  items: NavItem[]
}

interface ProfileSidebarNavProps {
  activeTab: TabKey
  onSelectTab: (tab: TabKey) => void
  role: 'tenant' | 'landlord'
}

export function ProfileSidebarNav({
  activeTab,
  onSelectTab,
  role,
}: ProfileSidebarNavProps): React.ReactElement {
  const navGroups: NavGroup[] = React.useMemo(() => {
    return [
      {
        groupTitle: 'Hợp đồng & Nhà ở',
        items: [
          {
            id: 'progress',
            label:
              role === 'tenant' ? 'Tiến trình thuê nhà' : 'Tiến trình cho thuê',
            icon: Activity,
          },
          {
            id: 'rental-applications',
            label: role === 'landlord' ? 'Hồ sơ đặt thuê' : 'Đơn thuê đã gửi',
            icon: Users,
          },
          ...(role === 'landlord'
            ? [
                {
                  id: 'listings' as TabKey,
                  label: 'Tin đăng của tôi',
                  icon: Building,
                  landlordOnly: true,
                },
              ]
            : []),
          {
            id: 'saved-searches',
            label: 'Tìm kiếm đã lưu',
            icon: Bookmark,
          },
        ],
      },
      {
        groupTitle: 'Tài chính & Tiện ích',
        items: [
          {
            id: 'bills',
            label:
              role === 'tenant' ? 'Hóa đơn & Giao dịch' : 'Hóa đơn & Doanh thu',
            icon: FileText,
          },
          {
            id: 'wallet',
            label: 'Ví & Nhận tiền',
            icon: Wallet,
          },
          {
            id: 'maintenance',
            label:
              role === 'tenant' ? 'Báo cáo sự cố & Bảo trì' : 'Quản lý sự cố',
            icon: Wrench,
          },
        ],
      },
      {
        groupTitle: 'An toàn & Cài đặt',
        items: [
          {
            id: 'blockchain',
            label: 'Nhật ký giao dịch',
            icon: Database,
          },
          {
            id: 'safety-reports',
            label: 'Báo cáo an toàn',
            icon: ShieldCheck,
          },
          {
            id: 'support-tickets',
            label: 'Hỗ trợ kỹ thuật',
            icon: Headphones,
          },
          {
            id: 'security',
            label: 'Bảo mật & Cài đặt',
            icon: Settings,
          },
        ],
      },
    ]
  }, [role])

  // Flatten all available items for mobile bar
  const allItems = React.useMemo(() => {
    return navGroups.flatMap(g => g.items)
  }, [navGroups])

  return (
    <>
      {/* ============================================================== */}
      {/* Mobile & Tablet Pill Bar (< lg)                                */}
      {/* ============================================================== */}
      <div className="lg:hidden w-full mb-6 -mx-4 px-4 overflow-x-auto no-scrollbar scroll-smooth">
        <div
          aria-label="Thanh điều hướng tính năng cá nhân trên di động"
          className="flex items-center gap-2 pb-1 w-max"
        >
          {allItems.map(item => {
            const Icon = item.icon
            const isActive = activeTab === item.id

            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => onSelectTab(item.id)}
                onPointerDown={() => onSelectTab(item.id)}
                className={`min-h-11 px-4 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer shadow-xs border ${
                  isActive
                    ? 'bg-primary text-white border-primary shadow-sm'
                    : 'bg-white text-muted hover:text-fg border-border hover:border-border-strong'
                }`}
              >
                <Icon
                  className={`h-4 w-4 shrink-0 ${isActive ? 'text-white' : 'text-primary'}`}
                />
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* Desktop Vertical Sidebar (>= lg)                               */}
      {/* ============================================================== */}
      <aside
        className="hidden lg:block w-64 xl:w-72 shrink-0 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:overscroll-contain pr-1"
        aria-label="Menu chức năng cá nhân"
      >
        <div className="bg-white border border-border rounded-2xl p-3.5 shadow-sm space-y-4">
          {navGroups.map(group => (
            <div key={group.groupTitle} className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted px-3 block">
                {group.groupTitle}
              </span>
              <div
                role="tablist"
                aria-orientation="vertical"
                className="space-y-0.5"
              >
                {group.items.map(item => {
                  const Icon = item.icon
                  const isActive = activeTab === item.id

                  return (
                    <button
                      key={item.id}
                      role="tab"
                      type="button"
                      aria-selected={isActive}
                      onClick={() => onSelectTab(item.id)}
                      onPointerDown={() => onSelectTab(item.id)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          onSelectTab(item.id)
                        }
                      }}
                      className={`min-h-10 w-full px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2.5 text-left cursor-pointer ${
                        isActive
                          ? 'bg-primary/10 text-primary font-bold shadow-xs'
                          : 'text-muted hover:text-fg hover:bg-surface-muted/60'
                      }`}
                    >
                      <Icon
                        className={`h-4 w-4 shrink-0 ${
                          isActive ? 'text-primary' : 'text-subtle'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>
    </>
  )
}
