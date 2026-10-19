'use client'

import * as React from 'react'
import {
  Scale,
  ShieldCheck,
  Copy,
  Check,
  ExternalLink,
  Info,
  Building2,
  ListOrdered,
  BookOpen,
} from 'lucide-react'
import type {
  PublicLegalTermsResponse,
  PublicPolicyItem,
} from '../api/legal-terms-api'

export interface TermsDocumentProps {
  terms: PublicLegalTermsResponse
  policies: PublicPolicyItem[]
}

export function TermsDocument({
  terms,
  policies,
}: TermsDocumentProps): React.ReactElement {
  const [copied, setCopied] = React.useState(false)

  const handleCopyHash = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(terms.contentHash)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard write fallback
    }
  }

  const sortedSections = [...(terms.sections || [])].sort(
    (a, b) => a.order - b.order
  )

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
      {/* Header Banner */}
      <header className="mb-10 rounded-2xl border border-border bg-surface p-6 shadow-sm md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <Scale className="h-6 w-6" />
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-0.5 text-xs font-semibold text-success">
                <ShieldCheck className="h-3.5 w-3.5" />
                Văn bản có hiệu lực chính thức
              </span>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-fg md:text-3xl">
                {terms.title}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-lg border border-border bg-surface-muted px-3 py-1.5 text-xs font-medium text-fg">
              Phiên bản: <strong>v{terms.version}</strong>
            </span>
            {(terms.effectiveFrom ?? terms.publishedAt) ? (
              <span className="rounded-lg border border-border bg-surface-muted px-3 py-1.5 text-xs font-medium text-fg">
                Có hiệu lực từ{' '}
                {new Date(
                  (terms.effectiveFrom ?? terms.publishedAt) as string
                ).toLocaleDateString('vi-VN')}
              </span>
            ) : null}
            {terms.publishedAt ? (
              <span className="rounded-lg border border-border bg-surface-muted px-3 py-1.5 text-xs font-medium text-muted">
                Ngày công bố:{' '}
                {new Date(terms.publishedAt).toLocaleDateString('vi-VN')}
              </span>
            ) : null}
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
          {terms.summary}
        </p>

        {/* Cryptographic Hash Badge */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border-strong bg-surface-muted p-3 text-xs">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="font-semibold text-fg">
              Mã băm toàn vẹn (SHA-256):
            </span>
            <code className="truncate rounded bg-bg px-2 py-0.5 font-mono text-muted">
              {terms.contentHash}
            </code>
          </div>
          <button
            type="button"
            onClick={() => void handleCopyHash()}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 py-1 text-xs font-medium text-fg transition hover:bg-surface-raised active:scale-95"
            aria-label="Sao chép mã băm"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-success" />
                <span>Đã sao chép</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-muted" />
                <span>Sao chép</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Grid: Sidebar TOC + Content */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Table of Contents Sticky Sidebar */}
        <aside className="lg:col-span-4">
          <nav
            aria-label="Mục lục điều khoản"
            className="sticky top-24 rounded-2xl border border-border bg-surface p-5 shadow-sm"
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-fg">
              <ListOrdered className="h-4 w-4 text-primary" />
              Mục lục văn bản
            </div>
            <ul className="mt-4 space-y-2 text-xs">
              {sortedSections.map(sec => (
                <li key={sec.id}>
                  <a
                    href={`#${sec.id}`}
                    className="block rounded-lg px-2.5 py-1.5 text-muted transition hover:bg-primary-soft hover:text-primary"
                  >
                    {sec.heading}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#sec-policies-appendix"
                  className="block rounded-lg px-2.5 py-1.5 font-medium text-muted transition hover:bg-primary-soft hover:text-primary"
                >
                  Phụ lục: Chính sách sàn & Căn cứ pháp lý
                </a>
              </li>
              <li>
                <a
                  href="#sec-public-service"
                  className="block rounded-lg px-2.5 py-1.5 font-medium text-muted transition hover:bg-primary-soft hover:text-primary"
                >
                  Dịch vụ công: Đăng ký tạm trú & VNeID (TTHC 1.004194)
                </a>
              </li>
            </ul>

            <div className="mt-6 border-t border-border pt-4">
              <div className="flex items-center gap-2 text-xs text-muted">
                <Info className="h-4 w-4 shrink-0 text-info" />
                <span>
                  Văn bản được lưu trữ bất biến và xác thực đối soát trên
                  Blockchain.
                </span>
              </div>
            </div>
          </nav>
        </aside>

        {/* Legal Text Content Body */}
        <main className="space-y-8 lg:col-span-8">
          {sortedSections.map(sec => (
            <article
              key={sec.id}
              id={sec.id}
              className="scroll-mt-28 rounded-2xl border border-border bg-surface p-6 shadow-sm transition hover:border-border-strong md:p-8"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-bold text-fg md:text-xl">
                  {sec.heading}
                </h2>
              </div>
              <div className="mt-4 text-sm leading-relaxed text-muted md:text-base">
                <p className="whitespace-pre-line">{sec.body}</p>
              </div>
            </article>
          ))}

          {/* Operational Policies Appendix */}
          <section
            id="sec-policies-appendix"
            className="scroll-mt-28 rounded-2xl border border-border bg-surface p-6 shadow-sm md:p-8"
          >
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold text-fg md:text-xl">
                Phụ lục: Các thông số chính sách sàn & Quy chuẩn pháp lý
              </h2>
            </div>
            <p className="mt-2 text-xs text-muted md:text-sm">
              Các thông số vận hành của sàn PropTech được ban hành công khai và
              đối chiếu trực tiếp theo Luật Nhà ở 2023 và Bộ luật Dân sự 2015.
            </p>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-left text-xs text-fg">
                <thead className="border-b border-border bg-surface-muted text-muted">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Chính sách quy định
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Mức áp dụng
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Căn cứ pháp lý
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {policies.map(p => (
                    <tr key={p.key} className="hover:bg-surface-muted/50">
                      <td className="px-4 py-3 font-medium text-fg">
                        {p.description}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 font-semibold text-primary">
                        {p.value} {p.unit || ''}
                      </td>
                      <td className="px-4 py-3 italic text-muted">
                        {p.legalReference || 'Quy chế vận hành sàn'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Public Service Procedure Guide (TTHC 1.004194) */}
          <section
            id="sec-public-service"
            className="scroll-mt-28 rounded-2xl border border-info/30 bg-info/5 p-6 shadow-sm md:p-8"
          >
            <div className="flex items-center gap-2 text-info">
              <ShieldCheck className="h-5 w-5" />
              <h2 className="text-lg font-bold text-fg md:text-xl">
                Hướng dẫn Thủ tục Cư trú trên Cổng Dịch vụ công Quốc gia
              </h2>
            </div>
            <div className="mt-4 space-y-3 text-sm text-muted">
              <p>
                Sau khi ký hợp đồng thuê căn hộ thành công trên TH-PropTech, hệ
                thống hỗ trợ trích xuất bản sao điện tử hợp đồng có mã xác thực
                (Hash) để khách hàng nộp hồ sơ đăng ký thường trú hoặc tạm trú.
              </p>
              <ul className="list-inside list-disc space-y-1.5 text-xs text-fg md:text-sm">
                <li>
                  Mã thủ tục hành chính: <strong>TTHC 1.004194</strong> (Đăng ký
                  tạm trú / Thường trú).
                </li>
                <li>
                  Hình thức nộp: Trực tuyến qua Cổng DVC Bộ Công an hoặc Cổng
                  DVC Quốc gia.
                </li>
                <li>
                  Hồ sơ đính kèm: Hợp đồng thuê nhà hợp pháp đã khóa chữ ký số
                  trên hệ thống.
                </li>
              </ul>
              <div className="pt-2">
                <a
                  href="https://dichvucong.bocongan.gov.vn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-primary underline underline-offset-4 hover:text-primary-hover"
                >
                  Truy cập Cổng Dịch vụ công Trực tuyến
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
