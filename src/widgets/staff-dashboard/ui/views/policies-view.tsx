'use client'

import * as React from 'react'
import { BookOpen, FileText, GitBranch, Scale, Sliders } from 'lucide-react'
import { LegalTermsAdminTab } from './components/policies/legal-terms-admin-tab'
import { OperationalPoliciesAdminTab } from './components/policies/operational-policies-admin-tab'
import { PublicServicesAdminTab } from './components/policies/public-services-admin-tab'
import { LegalSourcesAdminTab } from './components/policies/legal-sources-admin-tab'
import { ExecutionPoliciesAdminTab } from './components/policies/execution-policies-admin-tab'

type SubTab = 'terms' | 'policies' | 'governance' | 'sources' | 'execution'

export function PoliciesView(): React.ReactElement {
  const [activeTab, setActiveTab] = React.useState<SubTab>('terms')

  return (
    <div className="space-y-6">
      {/* ═══ HEADER & TAB SWITCHER ═══ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold font-marketing text-fg">
            Quản trị Điều khoản, Chính sách & Dịch vụ công
          </h1>
          <p className="text-xs text-muted mt-1">
            Quản lý văn bản điều khoản có phiên bản, tham số vận hành sàn, và
            danh mục quy định nền tảng gắn kết thủ tục DVC & Luật BĐS.
          </p>
        </div>

        {/* Tab Switcher Pills */}
        <div className="inline-flex p-1 rounded-xl border border-border bg-surface shadow-2xs self-start sm:self-auto overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('terms')}
            data-testid="tab-legal-terms"
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
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
            data-testid="tab-operational-policies"
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'policies'
                ? 'bg-primary text-white shadow-xs'
                : 'text-muted hover:text-fg hover:bg-surface-muted'
            }`}
          >
            <Sliders className="h-4 w-4" />
            Chính sách vận hành
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('governance')}
            data-testid="tab-public-services-governance"
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'governance'
                ? 'bg-primary text-white shadow-xs'
                : 'text-muted hover:text-fg hover:bg-surface-muted'
            }`}
          >
            <Scale className="h-4 w-4" />
            Quy định & Dịch vụ công
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('sources')}
            data-testid="tab-legal-sources"
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'sources'
                ? 'bg-primary text-white shadow-xs'
                : 'text-muted hover:text-fg hover:bg-surface-muted'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            Nguồn Pháp lý & DVC
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('execution')}
            data-testid="tab-execution-policies"
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'execution'
                ? 'bg-primary text-white shadow-xs'
                : 'text-muted hover:text-fg hover:bg-surface-muted'
            }`}
          >
            <GitBranch className="h-4 w-4" />
            Execution policy
          </button>
        </div>
      </div>

      {/* ═══ ACTIVE SUB-TAB VIEW ═══ */}
      {activeTab === 'terms' && <LegalTermsAdminTab />}
      {activeTab === 'policies' && <OperationalPoliciesAdminTab />}
      {activeTab === 'governance' && <PublicServicesAdminTab />}
      {activeTab === 'sources' && <LegalSourcesAdminTab />}
      {activeTab === 'execution' && <ExecutionPoliciesAdminTab />}
    </div>
  )
}
