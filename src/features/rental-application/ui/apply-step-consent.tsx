'use client'

import * as React from 'react'
import {
  ArrowLeft,
  Flame,
  Gavel,
  Loader2,
  Lock,
  Scale,
  Send,
} from 'lucide-react'
import { Button } from '@/shared/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/ui/accordion'
import { TermsSummary } from '@/features/legal-terms'
import type { PublicLegalTermsResponse } from '@/features/legal-terms'
import type { RentalApplicationDisclosure } from '../api/rental-application-api'

export interface ApplyStepConsentProps {
  disclosure: RentalApplicationDisclosure
  terms: PublicLegalTermsResponse | null
  loadingTerms?: boolean
  termsError?: string | null
  acknowledgedDisclosures: string[]
  termsAccepted: boolean
  submitting?: boolean
  onToggleDisclosure: (id: string) => void
  onToggleTermsAccepted: (accepted: boolean) => void
  onBack: () => void
  onSubmit: () => void
}

const STATUTORY_LEGAL_SECTIONS = [
  {
    id: 'law-basis',
    title: 'Căn cứ pháp lý & Hiệu lực quy chuẩn',
    icon: Scale,
    summary:
      'Hợp đồng và hồ sơ tuân thủ Bộ luật Dân sự 2015, Luật Nhà ở 2023 và Luật Kinh doanh Bất động sản 2023.',
    content:
      'Toàn bộ thỏa thuận thuê nhà ở được xây dựng trên nguyên tắc bình đẳng, tự nguyện và thiện chí giữa hai bên. Khi chủ nhà phê duyệt, các điều khoản đã đồng thuận sẽ được liên kết trực tiếp vào bản nháp hợp đồng số theo mẫu Phụ lục II Nghị định 96/2024/NĐ-CP.',
  },
  {
    id: 'fire-safety',
    title: 'Quy chế An toàn Phòng cháy Chữa cháy (PCCC)',
    icon: Flame,
    summary:
      'Trách nhiệm bảo đảm lối thoát hiểm, thiết bị báo khói và nội quy phòng chống cháy nổ tại căn hộ.',
    content:
      'Bên thuê có trách nhiệm tuân thủ nghiêm ngặt quy định PCCC của tòa nhà chung cư: không tích trữ chất dễ cháy nổ, không cản trở lối thoát hiểm ban công/cửa chính, và kiểm tra định kỳ bình chữa cháy trang bị trong căn hộ.',
  },
  {
    id: 'dispute-resolution',
    title: 'Cơ chế Giải quyết Tranh chấp & Chấm dứt',
    icon: Gavel,
    summary:
      'Thủ tục hòa giải thương lượng trước khi yêu cầu Tòa án nhân dân có thẩm quyền giải quyết.',
    content:
      'Mọi bất đồng phát sinh sẽ được ưu tiên giải quyết qua thương lượng hòa giải trên nền tảng. Trường hợp một bên đơn phương chấm dứt hợp đồng trái quy định, bên vi phạm phải bồi thường thiệt hại và chịu phạt vi phạm theo đúng điều khoản cam kết.',
  },
]

export function ApplyStepConsent({
  disclosure,
  terms,
  loadingTerms = false,
  termsError = null,
  acknowledgedDisclosures,
  termsAccepted,
  submitting = false,
  onToggleDisclosure,
  onToggleTermsAccepted,
  onBack,
  onSubmit,
}: ApplyStepConsentProps): React.ReactElement {
  const allRequiredAcknowledged = React.useMemo(() => {
    const requiredItems = disclosure.items.filter(item => item.required)
    return requiredItems.every(item =>
      acknowledgedDisclosures.includes(item.id)
    )
  }, [disclosure.items, acknowledgedDisclosures])

  const canSubmit =
    Boolean(terms) &&
    !termsError &&
    !loadingTerms &&
    allRequiredAcknowledged &&
    termsAccepted &&
    !submitting

  const shortHash = terms?.contentHash
    ? terms.contentHash.length > 12
      ? `${terms.contentHash.slice(0, 8)}…${terms.contentHash.slice(-4)}`
      : terms.contentHash
    : ''

  return (
    <div data-testid="apply-step-consent" className="space-y-8">
      <header className="border-b border-border/80 pb-5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <Scale aria-hidden="true" className="h-4 w-4" />
          <span>Giai đoạn 3 / 4: Điều khoản pháp lý & Cam kết người thuê</span>
        </div>
        <h2 className="mt-1.5 font-display text-xl font-bold text-fg sm:text-2xl">
          Quy chế pháp lý & Cam kết trách nhiệm
        </h2>
        <p className="mt-1 text-sm text-muted">
          Vui lòng đọc kỹ các điều khoản dịch vụ, an toàn PCCC và xác nhận cam
          kết trước khi gửi hồ sơ chính thức cho chủ nhà.
        </p>
      </header>

      {/* 1. Terms of Service Summary with Canonical SHA-256 */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
            1. Quy chế & Điều khoản dịch vụ thuê nhà
          </h3>
          {shortHash ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-muted px-2.5 py-0.5 text-[11px] font-mono text-muted">
              <Lock aria-hidden="true" className="h-3 w-3 text-success" />
              SHA-256: {shortHash}
            </span>
          ) : null}
        </div>

        <TermsSummary terms={terms} loading={loadingTerms} error={termsError} />
      </section>

      {/* 2. Interactive Statutory Legal Accordion */}
      <section className="space-y-3 rounded-2xl border border-border bg-surface p-5 shadow-sm">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
          2. Các quy định pháp luật trọng yếu
        </h3>
        <p className="text-xs text-muted">
          Bấm vào từng điều khoản để đọc chi tiết quy định và trách nhiệm pháp
          lý:
        </p>

        <Accordion type="single" collapsible className="w-full">
          {STATUTORY_LEGAL_SECTIONS.map(sec => {
            const Icon = sec.icon
            return (
              <AccordionItem
                key={sec.id}
                value={sec.id}
                className="border-border"
              >
                <AccordionTrigger className="text-left text-xs font-semibold text-fg hover:no-underline py-3">
                  <div className="flex items-center gap-2">
                    <Icon aria-hidden="true" className="h-4 w-4 text-primary" />
                    <span>{sec.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-xs text-muted leading-relaxed pt-1 pb-3 pl-6">
                  <p className="font-medium text-fg mb-1">{sec.summary}</p>
                  <p>{sec.content}</p>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </section>

      {/* 3. Statutory Disclosures Checklist */}
      <section className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
          3. Cam kết xác nhận từ người thuê (Bắt buộc)
        </h3>
        <div className="space-y-3">
          {disclosure.items.map(item => {
            const isChecked = acknowledgedDisclosures.includes(item.id)

            return (
              <label
                key={item.id}
                data-testid={`disclosure-item-${item.id}`}
                className={`flex cursor-pointer items-start gap-3.5 rounded-2xl border p-4.5 transition-all ${
                  isChecked
                    ? 'border-primary/40 bg-surface shadow-sm'
                    : 'border-border bg-surface-muted/30 hover:border-border-strong'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggleDisclosure(item.id)}
                  className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                />
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-fg">{item.title}</span>
                    {item.required ? (
                      <span className="rounded-full bg-danger-soft px-2.5 py-0.5 text-[10px] font-semibold text-danger">
                        Bắt buộc xác nhận
                      </span>
                    ) : (
                      <span className="rounded-full bg-surface-muted px-2 py-0.5 text-[10px] text-subtle">
                        Tùy chọn
                      </span>
                    )}
                  </div>
                  <p className="leading-relaxed text-muted">{item.body}</p>
                </div>
              </label>
            )
          })}
        </div>
      </section>

      {/* 4. Explicit Cryptographic Terms Acceptance */}
      {terms ? (
        <section className="rounded-2xl border border-primary/30 bg-primary-soft/15 p-5 shadow-sm">
          <label className="flex cursor-pointer items-start gap-3.5">
            <input
              type="checkbox"
              data-testid="terms-acceptance-checkbox"
              checked={termsAccepted}
              onChange={e => onToggleTermsAccepted(e.target.checked)}
              className="mt-1 h-5 w-5 rounded border-border text-primary focus:ring-primary"
            />
            <div className="space-y-1.5 text-xs">
              <span className="font-display text-sm font-bold text-fg">
                Tôi đồng thuận toàn bộ Quy chế Điều khoản thuê nhà (Phiên bản{' '}
                {terms.version}
                {shortHash ? ` · Khóa băm: ${shortHash}` : ''})
              </span>
              <p className="leading-relaxed text-muted">
                Bằng việc đánh dấu ô này, bạn xác nhận rằng mọi thông tin kê
                khai là hoàn toàn đúng sự thật. Bản xác nhận này được mã hóa và
                tạo dấu vết toàn vẹn trên sổ cái Hyperledger Fabric khi hợp đồng
                số được ký kết.
              </p>
            </div>
          </label>
        </section>
      ) : null}

      {/* Navigation actions */}
      <div className="flex items-center justify-between border-t border-border/80 pt-5">
        <Button
          type="button"
          variant="outline"
          disabled={submitting}
          onClick={onBack}
          className="flex items-center gap-2 border-border"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          <span>Quay lại chọn gói thuê</span>
        </Button>

        <Button
          type="button"
          disabled={!canSubmit}
          onClick={onSubmit}
          className="flex items-center gap-2 bg-control px-6 py-2.5 text-sm font-semibold text-on-control shadow-sm hover:opacity-90 disabled:opacity-50"
        >
          {submitting ? (
            <>
              <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
              <span>Đang gửi hồ sơ…</span>
            </>
          ) : (
            <>
              <Send aria-hidden="true" className="h-4 w-4" />
              <span>Gửi hồ sơ đặt thuê</span>
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
