'use client'

import * as React from 'react'
import { BookOpen, FileText, Scale, Sliders } from 'lucide-react'
import { LegalTermsAdminTab } from './components/policies/legal-terms-admin-tab'
import { OperationalPoliciesAdminTab } from './components/policies/operational-policies-admin-tab'
import { PublicServicesAdminTab } from './components/policies/public-services-admin-tab'
import { LegalSourcesAdminTab } from './components/policies/legal-sources-admin-tab'
import { AdminCard } from '@/shared/ui/admin-card'

type SubTab = 'terms' | 'policies' | 'governance'
type GovernanceSection = 'services' | 'sources'

export function PoliciesView(): React.ReactElement {
  const [activeTab, setActiveTab] = React.useState<SubTab>('terms')
  const [governanceSection, setGovernanceSection] =
    React.useState<GovernanceSection>('services')

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
        <AdminCard className="inline-flex p-1 shadow-2xs self-start sm:self-auto">
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
        </AdminCard>
      </div>

      {/* ═══ ACTIVE SUB-TAB VIEW ═══ */}
      {activeTab === 'terms' && <LegalTermsAdminTab />}
      {activeTab === 'policies' && <OperationalPoliciesAdminTab />}
      {activeTab === 'governance' && (
        <div className="space-y-4">
          <div className="inline-flex p-1 rounded-lg border border-border bg-surface-muted/50">
            <button
              type="button"
              onClick={() => setGovernanceSection('services')}
              data-testid="tab-public-services-section"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                governanceSection === 'services'
                  ? 'bg-surface text-fg shadow-xs'
                  : 'text-muted hover:text-fg'
              }`}
            >
              <Scale className="h-3.5 w-3.5" />
              Dịch vụ công
            </button>
            <button
              type="button"
              onClick={() => setGovernanceSection('sources')}
              data-testid="tab-legal-sources"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                governanceSection === 'sources'
                  ? 'bg-surface text-fg shadow-xs'
                  : 'text-muted hover:text-fg'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              Nguồn pháp lý
            </button>
          </div>
          {governanceSection === 'services' && <PublicServicesAdminTab />}
          {governanceSection === 'sources' && <LegalSourcesAdminTab />}
        </div>
      )}
    </div>
  )
}
