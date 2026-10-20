'use client'

import * as React from 'react'
import { Bell, Headphones, Plus, ShieldCheck } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { AlertList, SavedSearchesList } from '@/features/saved-searches'
import { MyReportsList } from '@/features/safety-reports'
import {
  CreateTicketDialog,
  TicketDetailPanel,
  TicketList,
  type SupportTicketItem,
} from '@/features/support-tickets'
import { useCan } from '@/shared/lib/permissions'

export type ProfileFeature =
  | 'saved-searches'
  | 'safety-reports'
  | 'support-tickets'

interface ProfileFeatureHubProps {
  feature: ProfileFeature
}

const PANEL_CLASS = 'rounded-2xl border border-border bg-surface p-6 shadow-sm'

export function ProfileFeatureHub({
  feature,
}: ProfileFeatureHubProps): React.ReactElement {
  const [selectedTicketId, setSelectedTicketId] = React.useState<string | null>(
    null
  )
  const [ticketRevision, setTicketRevision] = React.useState(0)
  const can = useCan()

  if (feature === 'saved-searches') {
    return (
      <div className="grid gap-6 lg:grid-cols-2">
        <section className={PANEL_CLASS} aria-labelledby="saved-searches-title">
          <h2
            id="saved-searches-title"
            className="mb-4 flex items-center gap-2 text-lg font-bold text-fg"
          >
            <Bell className="h-5 w-5 text-primary" /> Bộ lọc đã lưu
          </h2>
          <SavedSearchesList />
        </section>
        <section className={PANEL_CLASS} aria-labelledby="search-alerts-title">
          <h2
            id="search-alerts-title"
            className="mb-4 flex items-center gap-2 text-lg font-bold text-fg"
          >
            <Bell className="h-5 w-5 text-primary" /> Cảnh báo phù hợp
          </h2>
          <AlertList />
        </section>
      </div>
    )
  }

  if (feature === 'safety-reports') {
    return (
      <section className={PANEL_CLASS} aria-labelledby="safety-reports-title">
        <h2
          id="safety-reports-title"
          className="mb-4 flex items-center gap-2 text-lg font-bold text-fg"
        >
          <ShieldCheck className="h-5 w-5 text-primary" /> Báo cáo an toàn của
          tôi
        </h2>
        <MyReportsList />
      </section>
    )
  }

  return (
    <section className={PANEL_CLASS} aria-labelledby="support-title">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2
            id="support-title"
            className="flex items-center gap-2 text-lg font-bold text-fg"
          >
            <Headphones className="h-5 w-5 text-primary" /> Trung tâm hỗ trợ và
            SLA
          </h2>
          <p className="mt-1 text-sm text-muted">
            Theo dõi hạn phản hồi và trao đổi trực tiếp trong từng yêu cầu.
          </p>
        </div>
        {can('create', 'SupportTicket') ? (
          <CreateTicketDialog
            onSuccess={() => setTicketRevision(value => value + 1)}
            trigger={
              <Button className="gap-2">
                <Plus className="h-4 w-4" /> Tạo yêu cầu
              </Button>
            }
          />
        ) : null}
      </div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <TicketList
          key={ticketRevision}
          onSelectTicket={(ticket: SupportTicketItem) =>
            setSelectedTicketId(ticket._id)
          }
        />
        {selectedTicketId ? (
          <TicketDetailPanel ticketId={selectedTicketId} />
        ) : (
          <div className="flex min-h-40 items-center justify-center rounded-xl border border-dashed border-border bg-surface-muted p-6 text-center text-sm text-muted">
            Chọn một yêu cầu để xem hội thoại và trạng thái SLA.
          </div>
        )}
      </div>
    </section>
  )
}
