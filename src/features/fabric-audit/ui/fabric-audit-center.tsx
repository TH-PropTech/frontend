'use client'

import * as React from 'react'
import type { Route } from 'next'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ShieldCheck } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'
import {
  AUDIT_TABS,
  DEFAULT_AUDIT_FILTERS,
  parseAuditFilters,
  parseAuditTab,
  parseSelectedEventId,
  serializeAuditSearch,
  type AuditFilters,
  type AuditSearchState,
  type AuditTab,
} from '../model/audit-filters'
import {
  readStoredRoles,
  resolveFabricAuditCapability,
  type FabricAuditCapability,
} from '../model/capabilities'
import { AuditEventDetailSheet } from './audit-event-detail-sheet'
import { AuditEventsPanel } from './audit-events-panel'
import { AuditOverviewPanel } from './audit-overview-panel'
import { GovernancePanel } from './governance-panel'
import { PanelLoading } from './panel-states'
import { ReconciliationPanel } from './reconciliation-panel'
import { AdminCard } from '@/shared/ui/admin-card'

const TAB_LABELS: Record<AuditTab, string> = {
  overview: 'Tổng quan',
  events: 'Sự kiện',
  reconciliation: 'Đối soát',
  governance: 'Quản trị',
}

const USER_STORAGE_KEY = 'user'

function subscribeToStorage(onChange: () => void): () => void {
  window.addEventListener('storage', onChange)
  return () => window.removeEventListener('storage', onChange)
}

function readStoredUser(): string | null {
  try {
    return window.localStorage.getItem(USER_STORAGE_KEY)
  } catch (error) {
    console.warn('Unable to read the signed-in user', error)
    return null
  }
}

/** `undefined` on the server and during hydration, so the role gate never flashes protected content. */
const readServerUser = (): undefined => undefined

function Workspace({
  capability,
}: {
  capability: FabricAuditCapability
}): React.ReactElement {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const search = searchParams.toString()
  const params = React.useMemo(() => new URLSearchParams(search), [search])
  const tab = parseAuditTab(params)
  const filters = parseAuditFilters(params)
  const eventId = parseSelectedEventId(params)

  const navigate = (next: AuditSearchState): void => {
    const query = serializeAuditSearch(next)
    router.replace((query ? `${pathname}?${query}` : pathname) as Route, {
      scroll: false,
    })
  }

  const changeTab = (value: string): void => {
    const next = AUDIT_TABS.find(item => item === value)
    if (next) navigate({ filters: DEFAULT_AUDIT_FILTERS, tab: next })
  }

  const changeFilters = (next: AuditFilters): void =>
    navigate({ filters: next, tab: 'events' })

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold text-fg">
            <ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" />
            Trung tâm kiểm toán lưu vết
          </h2>
          <p className="text-xs text-muted">
            Theo dõi tình trạng ghi lưu vết, độ phủ bằng chứng và khôi phục có
            kiểm soát.
          </p>
        </div>
        <p className="rounded-full border border-border bg-surface-muted px-3 py-1 text-[11px] font-semibold text-muted">
          {capability.canOperate
            ? 'Quản trị viên: được thao tác'
            : 'Nhân viên: chỉ xem'}
        </p>
      </div>

      <Tabs value={tab} onValueChange={changeTab}>
        <TabsList className="h-auto flex-wrap">
          {AUDIT_TABS.map(item => (
            <TabsTrigger key={item} value={item}>
              {TAB_LABELS[item]}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="overview" className="mt-4">
          <AuditOverviewPanel
            onShowFailedEvents={() =>
              navigate({
                filters: { ...DEFAULT_AUDIT_FILTERS, state: 'failed' },
                tab: 'events',
              })
            }
            onOpenReconciliation={() =>
              navigate({
                filters: DEFAULT_AUDIT_FILTERS,
                tab: 'reconciliation',
              })
            }
          />
        </TabsContent>
        <TabsContent value="events" className="mt-4">
          <AuditEventsPanel
            filters={filters}
            onFiltersChange={changeFilters}
            onSelectEvent={id =>
              navigate({ filters, tab: 'events', eventId: id })
            }
          />
        </TabsContent>
        <TabsContent value="reconciliation" className="mt-4">
          <ReconciliationPanel capability={capability} />
        </TabsContent>
        <TabsContent value="governance" className="mt-4">
          <GovernancePanel capability={capability} />
        </TabsContent>
      </Tabs>

      <AuditEventDetailSheet
        eventId={eventId}
        onClose={() => navigate({ filters, tab })}
      />
    </div>
  )
}

/**
 * Entry point of the Audit Center. The role gate runs before any panel mounts, so a viewer without
 * `admin`/`staff` never triggers an audit request or renders audit data (the API enforces it again).
 */
export function FabricAuditCenter(): React.ReactElement {
  const storedUser = React.useSyncExternalStore(
    subscribeToStorage,
    readStoredUser,
    readServerUser
  )

  if (storedUser === undefined) {
    return <PanelLoading label="Đang kiểm tra quyền truy cập" rows={1} />
  }

  const capability = resolveFabricAuditCapability(readStoredRoles(storedUser))
  if (!capability.canRead) {
    return (
      <AdminCard role="alert" className="p-5 text-sm text-muted">
        Bạn không có quyền xem trung tâm kiểm toán lưu vết.
      </AdminCard>
    )
  }

  return <Workspace capability={capability} />
}
