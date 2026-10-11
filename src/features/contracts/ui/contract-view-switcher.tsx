'use client'

import * as React from 'react'
import { FileText, LayoutPanelTop } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'
import { ContractPdfPreview } from './contract-pdf-preview'

export interface ContractViewSwitcherProps {
  contractId: string
  contractCode: string
  /** Bản PDF chuẩn đã được khóa và tải được. */
  pdfAvailable: boolean
  /** Bản trình bày trang (HTML) của hợp đồng. */
  page: React.ReactNode
}

/** Hai cách xem cùng một hợp đồng: bản trình bày trên trang và file PDF chuẩn. */
export function ContractViewSwitcher({
  contractId,
  contractCode,
  pdfAvailable,
  page,
}: ContractViewSwitcherProps): React.ReactElement {
  const [view, setView] = React.useState<'page' | 'pdf'>('page')

  return (
    <Tabs
      value={view}
      onValueChange={value => setView(value === 'pdf' ? 'pdf' : 'page')}
      className="space-y-3"
    >
      <TabsList aria-label="Cách xem hợp đồng">
        <TabsTrigger value="page" className="gap-1.5">
          <LayoutPanelTop className="h-3.5 w-3.5" aria-hidden="true" />
          Bản trình bày
        </TabsTrigger>
        <TabsTrigger value="pdf" disabled={!pdfAvailable} className="gap-1.5">
          <FileText className="h-3.5 w-3.5" aria-hidden="true" />
          Bản PDF
        </TabsTrigger>
      </TabsList>
      <TabsContent value="page" className="mt-0">
        {page}
      </TabsContent>
      <TabsContent value="pdf" className="mt-0">
        {pdfAvailable ? (
          <ContractPdfPreview
            contractId={contractId}
            contractCode={contractCode}
          />
        ) : (
          <p className="rounded-xl border border-dashed border-[var(--border)] p-4 text-xs text-[var(--muted)]">
            Chưa có bản PDF. Bản PDF xuất hiện sau khi chủ nhà khóa nội dung và
            tạo bản PDF.
          </p>
        )}
      </TabsContent>
    </Tabs>
  )
}
