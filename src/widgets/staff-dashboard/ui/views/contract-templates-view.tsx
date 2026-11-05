'use client'

import * as React from 'react'
import { ClipboardCheck, FileText, LayoutTemplate } from 'lucide-react'
import { LayoutProfileEditor } from '@/features/contract-layouts'
import { AdminCard } from '@/shared/ui/admin-card'
import { ActiveTemplateTab } from './components/contract-templates/active-template-tab'
import { HandoverTemplateTab } from './components/contract-templates/handover-template-tab'

type SubTab = 'layout' | 'lease-template' | 'handover-template'

const SUB_TABS: ReadonlyArray<{
  id: SubTab
  label: string
  icon: React.ReactNode
}> = [
  {
    id: 'layout',
    label: 'Bố cục',
    icon: <LayoutTemplate className="h-4 w-4" />,
  },
  {
    id: 'lease-template',
    label: 'Hợp đồng mẫu',
    icon: <FileText className="h-4 w-4" />,
  },
  {
    id: 'handover-template',
    label: 'Biên bản bàn giao',
    icon: <ClipboardCheck className="h-4 w-4" />,
  },
]

export function ContractTemplatesView(): React.ReactElement {
  const [activeTab, setActiveTab] = React.useState<SubTab>('layout')

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h1 className="text-xl font-bold font-marketing text-fg">
            Hợp đồng và biên bản mẫu
          </h1>
          <p className="mt-1 text-xs text-muted">
            Bố cục hiển thị, mẫu hợp đồng đang áp dụng và mẫu biên bản bàn giao.
          </p>
        </div>
        <AdminCard className="inline-flex p-1 shadow-2xs self-start sm:self-auto">
          {SUB_TABS.map(tab => (
            <button
              key={tab.id}
              type="button"
              data-testid={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-muted hover:text-fg hover:bg-surface-muted'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </AdminCard>
      </div>
      {activeTab === 'layout' && <LayoutProfileEditor profileKey="default" />}
      {activeTab === 'lease-template' && <ActiveTemplateTab />}
      {activeTab === 'handover-template' && <HandoverTemplateTab />}
    </div>
  )
}
