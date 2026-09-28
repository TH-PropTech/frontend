'use client'

import * as React from 'react'
import {
  ArrowLeft,
  FileText,
  Flame,
  Gavel,
  Landmark,
  Loader2,
  Scale,
  Send,
  ShieldCheck,
} from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Checkbox } from '@/shared/ui/checkbox'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/ui/accordion'
import type { PublicLegalTermsResponse } from '@/features/legal-terms'
import type {
  FeeSnapshot,
  RentalApplicationDisclosure,
  RentalExecutionPolicyRef,
} from '../api/rental-application-api'

export interface ApplyStepConsentProps {
  disclosure: RentalApplicationDisclosure
  terms: PublicLegalTermsResponse | null
  loadingTerms?: boolean
  termsError?: string | null
  acknowledgedDisclosures: string[]
  termsAccepted: boolean
  executionPolicy?: RentalExecutionPolicyRef | null
  executionPolicyAccepted?: boolean
  feeSnapshot?: FeeSnapshot | null
  feeAcknowledged?: boolean
  onToggleFeeAcknowledged?: (accepted: boolean) => void
  submitting?: boolean
  onToggleDisclosure: (id: string) => void
  onToggleTermsAccepted: (accepted: boolean) => void
  onToggleExecutionPolicyAccepted?: (accepted: boolean) => void
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
  executionPolicy = null,
  executionPolicyAccepted = false,
  feeSnapshot = null,
  feeAcknowledged = false,
  onToggleFeeAcknowledged = () => undefined,
  submitting = false,
  onToggleDisclosure,
  onToggleTermsAccepted,
  onToggleExecutionPolicyAccepted = () => undefined,
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
    (!feeSnapshot?.quote.some(
      line => line.payerRole === 'tenant' && line.amount > 0
    ) ||
      feeAcknowledged) &&
    (!executionPolicy || executionPolicyAccepted) &&
    !submitting

  const policyLabel =
    executionPolicy?.strategy === 'DEPOSIT_FIRST'
      ? 'Cọc trước, sau đó ký hợp đồng'
      : 'Ký hợp đồng trước, sau đó thanh toán cọc'

  return (
    <div data-testid="apply-step-consent" className="space-y-6">
      <header className="border-b border-border/80 pb-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <Scale aria-hidden="true" className="h-4 w-4" />
          <span>Bước 3/4: Điều khoản pháp lý & Cam kết người thuê</span>
        </div>
        <h2 className="mt-1 font-display text-xl font-bold text-fg sm:text-2xl">
          Quy chế pháp lý & Cam kết trách nhiệm
        </h2>
        <p className="mt-1 text-xs text-muted">
          Vui lòng đọc kỹ các điều khoản dịch vụ, an toàn PCCC và xác nhận cam
          kết trước khi gửi hồ sơ chính thức cho chủ nhà.
        </p>
      </header>

      {executionPolicy ? (
        <section
          data-testid="selected-execution-policy"
          className="flex items-start gap-3 rounded-2xl border border-primary/25 bg-primary-soft/10 p-4"
        >
          <Landmark
            aria-hidden="true"
            className="mt-0.5 h-4 w-4 shrink-0 text-primary"
          />
          <div className="space-y-1 text-xs">
            <h3 className="font-bold text-fg">Trình tự đã chọn cho hồ sơ</h3>
            <p className="font-semibold text-primary">{policyLabel}</p>
            <p className="leading-relaxed text-muted">
              Lựa chọn này được chụp cùng hồ sơ.{' '}
              {executionPolicy.strategy === 'DEPOSIT_FIRST'
                ? 'Bạn cần hoàn tất xác nhận tiền cọc trước khi bắt đầu ký SmartCA.'
                : 'Hai bên có thể ký trước; hợp đồng chỉ kích hoạt sau khi khoản cọc được xác nhận.'}
            </p>
            <div
              className="mt-3 flex cursor-pointer items-start gap-2 rounded-xl border border-border bg-surface p-3"
              onClick={() =>
                onToggleExecutionPolicyAccepted(!executionPolicyAccepted)
              }
            >
              <Checkbox
                data-testid="execution-policy-acceptance-checkbox"
                checked={executionPolicyAccepted}
                onCheckedChange={checked =>
                  onToggleExecutionPolicyAccepted(checked === true)
                }
                onClick={event => event.stopPropagation()}
                className="mt-0.5"
              />
              <span className="text-[11px] leading-relaxed text-fg">
                Tôi đã đọc và đồng ý với trình tự cọc, ký và điều kiện để hợp
                đồng có hiệu lực.
              </span>
            </div>
          </div>
        </section>
      ) : null}

      {feeSnapshot?.quote.some(
        line => line.payerRole === 'tenant' && line.amount > 0
      ) ? (
        <section
          className="rounded-2xl border border-primary/30 bg-primary-soft/15 p-4"
          data-testid="tenant-fee-acknowledgement"
        >
          <div
            className="flex cursor-pointer items-start gap-3"
            onClick={() => onToggleFeeAcknowledged(!feeAcknowledged)}
          >
            <Checkbox
              checked={feeAcknowledged}
              onCheckedChange={checked =>
                onToggleFeeAcknowledged(checked === true)
              }
              onClick={event => event.stopPropagation()}
              className="mt-0.5"
            />
            <span className="text-xs leading-relaxed text-fg">
              Tôi đã xem và đồng ý với phí dịch vụ người thuê đã được công bố
              trong báo giá biểu phí này.
            </span>
          </div>
        </section>
      ) : null}

      {/* 1. Terms of Service Summary with User-friendly Digital Seal */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted">
            1. Quy chế & Điều khoản dịch vụ thuê nhà
          </h3>
          {terms ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success-soft/30 px-3 py-1 text-xs font-semibold text-success">
              <ShieldCheck aria-hidden="true" className="h-3.5 w-3.5" />
              <span>Chứng thực số v{terms.version}</span>
            </span>
          ) : null}
        </div>

        {loadingTerms ? (
          <div className="animate-pulse space-y-3 rounded-2xl border border-border bg-surface-muted/50 p-4">
            <div className="h-4 w-1/3 rounded bg-border" />
            <div className="h-3 w-3/4 rounded bg-border" />
          </div>
        ) : termsError || !terms ? (
          <div className="rounded-2xl border border-danger/30 bg-danger-soft p-4 text-xs text-danger">
            {termsError || 'Không tải được nội dung điều khoản áp dụng.'}
          </div>
        ) : (
          <article className="space-y-3 rounded-2xl border border-border bg-surface p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <FileText aria-hidden="true" className="h-4 w-4 text-primary" />
              <h4 className="font-display text-sm font-bold text-fg">
                {terms.title} (Phiên bản {terms.version})
              </h4>
            </div>
            <p className="text-xs leading-relaxed text-muted">
              {terms.summary}
            </p>
          </article>
        )}
      </section>

      {/* 2. Interactive Statutory Legal Accordion */}
      <section className="space-y-3 rounded-2xl border border-border bg-surface p-5 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted">
          2. Các quy định pháp luật trọng yếu
        </h3>
        <p className="text-xs text-muted">
          Các điều khoản then chốt bảo vệ quyền lợi hai bên theo quy định hiện
          hành:
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
                <AccordionTrigger className="text-left text-xs font-semibold text-fg hover:no-underline py-2.5">
                  <div className="flex items-center gap-2">
                    <Icon
                      aria-hidden="true"
                      className="h-3.5 w-3.5 text-primary"
                    />
                    <span>{sec.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-xs text-muted leading-relaxed pt-1 pb-3 pl-5">
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
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted">
          3. Cam kết xác nhận từ người thuê (Bắt buộc)
        </h3>
        <div className="space-y-2.5">
          {disclosure.items.map(item => {
            const isChecked = acknowledgedDisclosures.includes(item.id)

            return (
              <div
                key={item.id}
                data-testid={`disclosure-item-${item.id}`}
                onClick={() => onToggleDisclosure(item.id)}
                className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-all ${
                  isChecked
                    ? 'border-primary/40 bg-surface shadow-sm'
                    : 'border-border bg-surface-muted/30 hover:border-border-strong'
                }`}
              >
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={() => onToggleDisclosure(item.id)}
                  onClick={e => e.stopPropagation()}
                  className="mt-0.5"
                />
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-fg">{item.title}</span>
                    {item.required ? (
                      <span className="rounded-full bg-danger-soft px-2 py-0.5 text-[10px] font-semibold text-danger">
                        Bắt buộc
                      </span>
                    ) : (
                      <span className="rounded-full bg-surface-muted px-2 py-0.5 text-[10px] text-subtle">
                        Tùy chọn
                      </span>
                    )}
                  </div>
                  <p className="leading-relaxed text-muted">{item.body}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* 4. Terms Acceptance */}
      {terms ? (
        <section className="rounded-2xl border border-primary/30 bg-primary-soft/15 p-5 shadow-sm">
          <div
            onClick={() => onToggleTermsAccepted(!termsAccepted)}
            className="flex cursor-pointer items-start gap-3"
          >
            <Checkbox
              data-testid="terms-acceptance-checkbox"
              checked={termsAccepted}
              onCheckedChange={checked =>
                onToggleTermsAccepted(checked === true)
              }
              onClick={e => e.stopPropagation()}
              className="mt-0.5"
            />
            <div className="space-y-1 text-xs">
              <span className="font-display text-xs font-bold text-fg">
                Tôi đồng thuận toàn bộ Quy chế Điều khoản thuê nhà (Phiên bản{' '}
                {terms.version})
              </span>
              <p className="leading-relaxed text-muted text-[11px]">
                Bằng việc đánh dấu ô này, bạn xác nhận rằng mọi thông tin kê
                khai là hoàn toàn đúng sự thật và đồng thuận các cam kết pháp lý
                để tiến tới xác lập hợp đồng thuê nhà điện tử.
              </p>
            </div>
          </div>
        </section>
      ) : null}

      {/* Navigation actions */}
      <div className="flex flex-col-reverse gap-3 border-t border-border/80 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="button"
          variant="outline"
          disabled={submitting}
          onClick={onBack}
          className="flex w-full items-center justify-center gap-2 border-border text-xs sm:w-auto"
        >
          <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
          <span>Quay lại chọn gói thuê</span>
        </Button>

        <Button
          type="button"
          disabled={!canSubmit}
          onClick={onSubmit}
          className="flex w-full items-center justify-center gap-2 bg-control px-6 py-2.5 text-xs font-semibold text-on-control shadow-sm hover:opacity-90 disabled:opacity-50 sm:w-auto"
        >
          {submitting ? (
            <>
              <Loader2
                aria-hidden="true"
                className="h-3.5 w-3.5 animate-spin"
              />
              <span>Đang gửi hồ sơ…</span>
            </>
          ) : (
            <>
              <Send aria-hidden="true" className="h-3.5 w-3.5" />
              <span>Gửi hồ sơ đặt thuê</span>
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
