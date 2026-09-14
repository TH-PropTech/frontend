'use client'

import * as React from 'react'
import { FileText, Sliders } from 'lucide-react'
import { LegalTermsAdminTab } from './components/policies/legal-terms-admin-tab'
import { OperationalPoliciesAdminTab } from './components/policies/operational-policies-admin-tab'

type SubTab = 'terms' | 'policies'

export function PoliciesView(): React.ReactElement {
  const [activeTab, setActiveTab] = React.useState<SubTab>('terms')

  return (
    <div className="space-y-6">
      {/* ═══ HEADER & TAB SWITCHER ═══ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold font-marketing text-fg">
            Quản trị Điều khoản & Chính sách
          </h1>
          <p className="text-xs text-muted mt-1">
            Quản lý văn bản điều khoản dịch vụ có phiên bản và cấu hình các tham
            số vận hành sàn giao dịch.
          </p>
        </div>

        {/* Tab Switcher Pills */}
        <div className="inline-flex p-1 rounded-xl border border-border bg-surface shadow-2xs self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('terms')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'terms'
                ? 'bg-primary text-white shadow-xs'
                : 'text-muted hover:text-fg hover:bg-surface-muted'
            }`}
          >
            <FileText className="h-4 w-4" />
            Điều khoản dịch vụ
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('policies')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'policies'
                ? 'bg-primary text-white shadow-xs'
                : 'text-muted hover:text-fg hover:bg-surface-muted'
            }`}
          >
            <Sliders className="h-4 w-4" />
            Chính sách vận hành
          </button>
        </div>
      </div>

      {/* ═══ ACTIVE SUB-TAB VIEW ═══ */}
      {activeTab === 'terms' ? (
        <LegalTermsAdminTab />
      ) : (
        <OperationalPoliciesAdminTab />
      )}
    </div>
  )
}
