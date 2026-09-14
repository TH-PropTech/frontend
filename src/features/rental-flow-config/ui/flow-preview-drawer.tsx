'use client'

import * as React from 'react'
import {
  X,
  Calendar,
  Users,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Lock,
} from 'lucide-react'
import type { FlowProfileSteps } from '../api/rental-flow-api'

interface FlowPreviewDrawerProps {
  isOpen: boolean
  profileName: string
  version: number
  steps: FlowProfileSteps
  onClose: () => void
}

export function FlowPreviewDrawer({
  isOpen,
  profileName,
  version,
  steps,
  onClose,
}: FlowPreviewDrawerProps): React.ReactElement | null {
  const [activeStep, setActiveStep] = React.useState<1 | 2 | 3 | 4>(1)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-fg/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-surface border-l border-border h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-border bg-surface-muted flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-fg">
                Xem trước trải nghiệm khách thuê
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                {profileName} v{version}
              </span>
            </div>
            <p className="text-[11px] text-muted mt-0.5">
              Mô phỏng trực quan 4 bước nộp hồ sơ thuê căn hộ
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted hover:text-fg hover:bg-surface transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Indicator Tracker */}
        <div className="px-6 py-3 border-b border-border bg-surface flex items-center justify-between shrink-0">
          {[1, 2, 3, 4].map(stepNum => (
            <button
              key={stepNum}
              type="button"
              onClick={() => setActiveStep(stepNum as 1 | 2 | 3 | 4)}
              className={`flex items-center gap-2 text-xs font-bold transition-colors ${
                activeStep === stepNum
                  ? 'text-primary'
                  : 'text-muted hover:text-fg'
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${
                  activeStep === stepNum
                    ? 'bg-primary text-white'
                    : 'bg-surface-muted border border-border text-muted'
                }`}
              >
                {stepNum}
              </span>
              <span className="hidden sm:inline">
                {stepNum === 1 && 'Lưu trú'}
                {stepNum === 2 && 'Tài chính'}
                {stepNum === 3 && 'Pháp lý'}
                {stepNum === 4 && 'Hoàn tất'}
              </span>
            </button>
          ))}
        </div>

        {/* Mock Application Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Step 1 Preview */}
          {activeStep === 1 && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-surface-muted border border-border space-y-3">
                <h4 className="text-xs font-bold text-fg flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  {steps.step1.moveInDateLabel}
                </h4>
                <div className="p-3 bg-surface rounded-lg border border-border text-xs text-muted flex items-center justify-between">
                  <span>Khoảng ngày hợp lệ cho phép chọn:</span>
                  <span className="font-semibold text-fg">
                    Từ +{steps.step1.minMoveInLeadDays} ngày đến +
                    {steps.step1.maxMoveInLeadDays} ngày
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-muted border border-border space-y-3">
                <h4 className="text-xs font-bold text-fg flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  Số lượng người ở
                </h4>
                <div className="p-3 bg-surface rounded-lg border border-border text-xs text-muted flex items-center justify-between">
                  <span>Giới hạn quy định:</span>
                  <span className="font-semibold text-fg">
                    Từ {steps.step1.minOccupants} đến {steps.step1.maxOccupants}{' '}
                    người
                  </span>
                </div>
              </div>

              {steps.step1.allowNotes && (
                <div className="p-4 rounded-xl bg-surface-muted border border-border space-y-2">
                  <h4 className="text-xs font-bold text-fg">
                    Ghi chú bổ sung (Tùy chọn)
                  </h4>
                  <p className="text-[11px] text-muted">
                    Khách thuê được nhập tối đa {steps.step1.notesMaxLength} ký
                    tự.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 2 Preview */}
          {activeStep === 2 && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-surface-muted border border-border space-y-2">
                <h4 className="text-xs font-bold text-fg">
                  {steps.step2.headerTitle}
                </h4>
                <p className="text-xs text-muted">
                  {steps.step2.depositNoticeBody}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-fg block">
                  Huy hiệu gói thuê áp dụng:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {steps.step2.badgeRules.map((rule, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-surface rounded-xl border border-border flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-primary" />
                        <span className="text-xs font-semibold text-fg">
                          Gói {rule.durationMonths} tháng
                        </span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                        {rule.badgeText}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3 Preview */}
          {activeStep === 3 && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-surface-muted border border-border space-y-2">
                <h4 className="text-xs font-bold text-fg flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  Xác nhận & Đồng thuận
                </h4>
                <p className="text-xs text-muted">
                  {steps.step3.consentStatement}
                </p>
                <div className="pt-2">
                  <label className="flex items-center gap-2 text-xs font-semibold text-fg">
                    <input
                      type="checkbox"
                      defaultChecked
                      disabled
                      className="rounded border-border text-primary"
                    />
                    {steps.step3.consentCheckboxLabel}
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-fg block">
                  Danh mục điều khoản minh bạch:
                </span>
                <div className="space-y-2.5">
                  {steps.step3.disclosures.map(disc => (
                    <div
                      key={disc.id}
                      className="p-3.5 bg-surface rounded-xl border border-border space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-fg">
                          {disc.title}
                        </span>
                        {disc.immutablePolicy ? (
                          <span className="text-[10px] font-bold text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded flex items-center gap-1 border border-amber-500/20">
                            <Lock className="w-3 h-3" />
                            Nghị định 96/2024
                          </span>
                        ) : disc.required ? (
                          <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                            Bắt buộc
                          </span>
                        ) : (
                          <span className="text-[10px] text-muted bg-surface-muted px-2 py-0.5 rounded">
                            Tùy chọn
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        {disc.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4 Preview */}
          {activeStep === 4 && (
            <div className="space-y-5 text-center py-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-bold text-fg">
                  {steps.step4.heroSuccessTitle}
                </h3>
                <p className="text-xs text-muted">
                  Hồ sơ thuê đã ghi nhận mã tham chiếu và mã băm toàn vẹn
                </p>
              </div>

              <div className="text-left space-y-3 pt-4 border-t border-border">
                <span className="text-xs font-bold text-fg block">
                  Lộ trình xử lý tiếp theo:
                </span>
                <div className="space-y-3">
                  {steps.step4.timelineSteps.map((tStep, idx) => (
                    <div
                      key={tStep.key}
                      className="flex items-start gap-3 p-3 bg-surface rounded-xl border border-border"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-fg block">
                          {tStep.title}
                        </span>
                        <p className="text-[11px] text-muted mt-0.5">
                          {tStep.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Next/Prev */}
        <div className="px-6 py-3.5 border-t border-border bg-surface-muted flex items-center justify-between shrink-0">
          <button
            type="button"
            disabled={activeStep === 1}
            onClick={() =>
              setActiveStep(prev =>
                prev > 1 ? ((prev - 1) as 1 | 2 | 3 | 4) : prev
              )
            }
            className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-surface border border-border text-fg hover:bg-surface-muted disabled:opacity-40 transition-colors"
          >
            Quay lại
          </button>

          <button
            type="button"
            disabled={activeStep === 4}
            onClick={() =>
              setActiveStep(prev =>
                prev < 4 ? ((prev + 1) as 1 | 2 | 3 | 4) : prev
              )
            }
            className="px-4 py-1.5 text-xs font-bold rounded-lg bg-primary text-white hover:bg-primary-hover disabled:opacity-40 transition-colors"
          >
            Tiếp theo
          </button>
        </div>
      </div>
    </div>
  )
}
