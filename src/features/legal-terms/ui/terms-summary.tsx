'use client'

import * as React from 'react'
import Link from 'next/link'
import { ExternalLink, FileText, ShieldCheck } from 'lucide-react'
import type { PublicLegalTermsResponse } from '../api/legal-terms-api'

export interface TermsSummaryProps {
  terms: PublicLegalTermsResponse | null
  loading?: boolean
  error?: string | null
}

export function TermsSummary({
  terms,
  loading = false,
  error = null,
}: TermsSummaryProps): React.ReactElement {
  if (loading) {
    return (
      <div
        data-testid="terms-summary-loading"
        className="animate-pulse space-y-3 rounded-2xl border border-border bg-surface-muted p-4"
      >
        <div className="h-5 w-1/3 rounded bg-border" />
        <div className="h-4 w-3/4 rounded bg-border" />
        <div className="h-20 w-full rounded bg-border" />
      </div>
    )
  }

  if (error || !terms) {
    return (
      <div
        data-testid="terms-summary-error"
        className="rounded-2xl border border-danger/30 bg-danger-soft p-4 text-sm text-danger"
      >
        {error || 'Không tải được nội dung điều khoản áp dụng.'}
      </div>
    )
  }

  const shortHash =
    terms.contentHash.length > 12
      ? `${terms.contentHash.slice(0, 8)}…${terms.contentHash.slice(-4)}`
      : terms.contentHash

  return (
    <article
      data-testid="terms-summary"
      className="space-y-4 rounded-2xl border border-border bg-surface p-5 shadow-sm"
    >
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
            <FileText aria-hidden="true" className="h-4 w-4" />
            <span>Điều khoản dịch vụ thuê nhà</span>
          </div>
          <h3 className="font-display text-base font-bold text-fg">
            {terms.title} (v{terms.version})
          </h3>
        </div>

        <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-muted px-3 py-1 text-xs font-mono text-muted">
          <ShieldCheck
            aria-hidden="true"
            className="h-3.5 w-3.5 text-success"
          />
          <span title={terms.contentHash}>Hash: {shortHash}</span>
        </div>
      </header>

      <p className="text-sm leading-relaxed text-muted">{terms.summary}</p>

      {terms.sections && terms.sections.length > 0 ? (
        <div className="space-y-2.5 border-t border-border pt-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-subtle">
            Các điều khoản chính:
          </p>
          <div className="space-y-2">
            {terms.sections.slice(0, 3).map(section => (
              <div
                key={section.id}
                className="rounded-xl border border-border/80 bg-surface-muted/50 p-3 text-xs"
              >
                <p className="font-semibold text-fg">{section.heading}</p>
                <p className="mt-1 line-clamp-2 leading-relaxed text-muted">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="pt-1">
        <Link
          href="/terms"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
        >
          <span>Xem toàn văn quy chế & điều khoản pháp lý</span>
          <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  )
}
