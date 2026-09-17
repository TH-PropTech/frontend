'use client'

import * as React from 'react'
import {
  Calendar,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Plus,
  Trash2,
  FileText,
} from 'lucide-react'
import type {
  FlowProfileSteps,
  BadgeRule,
  FlowDisclosure,
} from '../api/rental-flow-api'

interface StepEditorsProps {
  steps: FlowProfileSteps
  readOnly?: boolean
  onChange: (updated: FlowProfileSteps) => void
}

export function StepEditors({
  steps,
  readOnly = false,
  onChange,
}: StepEditorsProps): React.ReactElement {
  const [activeStepTab, setActiveStepTab] = React.useState<
    'step1' | 'step2' | 'step3' | 'step4'
  >('step1')

  const updateStep1 = (patch: Partial<FlowProfileSteps['step1']>): void => {
    onChange({
      ...steps,
      step1: { ...steps.step1, ...patch },
    })
  }

  const updateStep2 = (patch: Partial<FlowProfileSteps['step2']>): void => {
    onChange({
      ...steps,
      step2: { ...steps.step2, ...patch },
    })
  }

  const updateStep3 = (patch: Partial<FlowProfileSteps['step3']>): void => {
    onChange({
      ...steps,
      step3: { ...steps.step3, ...patch },
    })
  }

  const updateStep4 = (patch: Partial<FlowProfileSteps['step4']>): void => {
    onChange({
      ...steps,
      step4: { ...steps.step4, ...patch },
    })
  }

  return (
    <div className="space-y-6">
      {/* Step selection tabs */}
      <div className="flex border-b border-border space-x-2">
        <button
          type="button"
          onClick={() => setActiveStepTab('step1')}
          className={`flex items-center gap-2 pb-3 px-3 text-xs font-semibold border-b-2 transition-colors ${
            activeStepTab === 'step1'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted hover:text-fg'
          }`}
        >
          <Calendar className="w-4 h-4" />
          Bước 1: Ngày dọn & Người ở
        </button>

        <button
          type="button"
          onClick={() => setActiveStepTab('step2')}
          className={`flex items-center gap-2 pb-3 px-3 text-xs font-semibold border-b-2 transition-colors ${
            activeStepTab === 'step2'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted hover:text-fg'
          }`}
        >
          <FileText className="w-4 h-4" />
          Bước 2: Tài chính & Huy hiệu
        </button>

        <button
          type="button"
          onClick={() => setActiveStepTab('step3')}
          className={`flex items-center gap-2 pb-3 px-3 text-xs font-semibold border-b-2 transition-colors ${
            activeStepTab === 'step3'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted hover:text-fg'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          Bước 3: Điều khoản pháp lý
        </button>

        <button
          type="button"
          onClick={() => setActiveStepTab('step4')}
          className={`flex items-center gap-2 pb-3 px-3 text-xs font-semibold border-b-2 transition-colors ${
            activeStepTab === 'step4'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted hover:text-fg'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          Bước 4: Tiến trình hoàn tất
        </button>
      </div>

      {/* Tab 1: Step 1 Editor */}
      {activeStepTab === 'step1' && (
        <div className="space-y-4 bg-surface p-5 rounded-xl border border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-fg flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              Cấu hình Bước 1: Thông tin lưu trú & Người ở
            </h3>
            <span className="text-[11px] text-muted">
              Kiểm soát khoảng ngày dọn vào và giới hạn người ở
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-fg mb-1">
                Nhãn ngày dọn vào
              </label>
              <input
                type="text"
                disabled={readOnly}
                value={steps.step1.moveInDateLabel}
                onChange={e => updateStep1({ moveInDateLabel: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg bg-surface-muted border border-border text-fg focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex items-center gap-3 pt-5">
              <label className="flex items-center gap-2 text-xs font-semibold text-fg cursor-pointer">
                <input
                  type="checkbox"
                  disabled={readOnly}
                  checked={steps.step1.allowNotes}
                  onChange={e => updateStep1({ allowNotes: e.target.checked })}
                  className="rounded border-border text-primary focus:ring-primary"
                />
                Cho phép ghi chú thêm
              </label>
            </div>

            <div>
              <label className="block text-xs font-semibold text-fg mb-1">
                Số ngày tối thiểu trước khi dọn vào (Lead Days Min)
              </label>
              <input
                type="number"
                disabled={readOnly}
                min={0}
                max={90}
                value={steps.step1.minMoveInLeadDays}
                onChange={e =>
                  updateStep1({ minMoveInLeadDays: Number(e.target.value) })
                }
                className="w-full px-3 py-2 text-xs rounded-lg bg-surface-muted border border-border text-fg focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-fg mb-1">
                Số ngày tối đa trước khi dọn vào (Lead Days Max)
              </label>
              <input
                type="number"
                disabled={readOnly}
                min={1}
                max={365}
                value={steps.step1.maxMoveInLeadDays}
                onChange={e =>
                  updateStep1({ maxMoveInLeadDays: Number(e.target.value) })
                }
                className="w-full px-3 py-2 text-xs rounded-lg bg-surface-muted border border-border text-fg focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-fg mb-1">
                Số người ở tối thiểu
              </label>
              <input
                type="number"
                disabled={readOnly}
                min={1}
                max={10}
                value={steps.step1.minOccupants}
                onChange={e =>
                  updateStep1({ minOccupants: Number(e.target.value) })
                }
                className="w-full px-3 py-2 text-xs rounded-lg bg-surface-muted border border-border text-fg focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-fg mb-1">
                Số người ở tối đa
              </label>
              <input
                type="number"
                disabled={readOnly}
                min={steps.step1.minOccupants}
                max={20}
                value={steps.step1.maxOccupants}
                onChange={e =>
                  updateStep1({ maxOccupants: Number(e.target.value) })
                }
                className="w-full px-3 py-2 text-xs rounded-lg bg-surface-muted border border-border text-fg focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-fg mb-1">
                Độ dài tối đa ghi chú (ký tự)
              </label>
              <input
                type="number"
                disabled={readOnly}
                min={100}
                max={1000}
                value={steps.step1.notesMaxLength}
                onChange={e =>
                  updateStep1({ notesMaxLength: Number(e.target.value) })
                }
                className="w-full px-3 py-2 text-xs rounded-lg bg-surface-muted border border-border text-fg focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Step 2 Editor */}
      {activeStepTab === 'step2' && (
        <div className="space-y-4 bg-surface p-5 rounded-xl border border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-fg flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              Cấu hình Bước 2: Hiển thị Tài chính & Huy hiệu Gói thuê
            </h3>
          </div>

          {/* Strict Notice regarding Commercial Values */}
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-start gap-2.5 text-xs text-amber-600 dark:text-amber-400">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">
                Bảo vệ tính toàn vẹn thương mại:
              </span>{' '}
              Giá thuê hàng tháng, tiền cọc thực tế và chính sách chiết khấu
              được xác định nghiêm ngặt từ gói căn hộ được chủ nhà niêm yết và
              kiểm duyệt. Flow profile chỉ cấu hình giao diện hướng dẫn và huy
              hiệu hiển thị.
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-fg mb-1">
                Tiêu đề phần tài chính
              </label>
              <input
                type="text"
                disabled={readOnly}
                value={steps.step2.headerTitle}
                onChange={e => updateStep2({ headerTitle: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg bg-surface-muted border border-border text-fg focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-fg mb-1">
                Nội dung hướng dẫn tiền cọc
              </label>
              <textarea
                disabled={readOnly}
                rows={3}
                value={steps.step2.depositNoticeBody}
                onChange={e =>
                  updateStep2({ depositNoticeBody: e.target.value })
                }
                className="w-full px-3 py-2 text-xs rounded-lg bg-surface-muted border border-border text-fg focus:outline-none focus:border-primary"
              />
            </div>

            {/* Badge rules */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-fg">
                  Quy tắc gắn huy hiệu theo thời hạn gói
                </label>
                {!readOnly && (
                  <button
                    type="button"
                    onClick={() => {
                      const newRule: BadgeRule = {
                        durationMonths: 6,
                        badgeText: 'Tiết kiệm nhất',
                        colorVariant: 'indigo',
                      }
                      updateStep2({
                        badgeRules: [...steps.step2.badgeRules, newRule],
                      })
                    }}
                    className="flex items-center gap-1 text-[11px] font-semibold text-primary hover:text-primary-hover"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Thêm huy hiệu
                  </button>
                )}
              </div>

              <div className="space-y-2">
                {steps.step2.badgeRules.map((rule, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2.5 bg-surface-muted rounded-lg border border-border"
                  >
                    <div className="w-32">
                      <span className="text-[10px] text-muted block mb-0.5">
                        Thời hạn (tháng)
                      </span>
                      <select
                        disabled={readOnly}
                        value={rule.durationMonths}
                        onChange={e => {
                          const updated = [...steps.step2.badgeRules]
                          updated[idx] = {
                            ...rule,
                            durationMonths: Number(e.target.value),
                          }
                          updateStep2({ badgeRules: updated })
                        }}
                        className="w-full px-2 py-1 text-xs rounded bg-surface border border-border text-fg"
                      >
                        <option value={1} disabled>
                          1 tháng (legacy)
                        </option>
                        <option value={3}>3 tháng</option>
                        <option value={6}>6 tháng</option>
                        <option value={12}>12 tháng</option>
                        <option value={24}>24 tháng</option>
                      </select>
                    </div>

                    <div className="flex-1">
                      <span className="text-[10px] text-muted block mb-0.5">
                        Nhãn hiển thị
                      </span>
                      <input
                        type="text"
                        disabled={readOnly}
                        value={rule.badgeText}
                        onChange={e => {
                          const updated = [...steps.step2.badgeRules]
                          updated[idx] = { ...rule, badgeText: e.target.value }
                          updateStep2({ badgeRules: updated })
                        }}
                        className="w-full px-2 py-1 text-xs rounded bg-surface border border-border text-fg"
                      />
                    </div>

                    <div className="w-28">
                      <span className="text-[10px] text-muted block mb-0.5">
                        Màu sắc
                      </span>
                      <select
                        disabled={readOnly}
                        value={rule.colorVariant}
                        onChange={e => {
                          const updated = [...steps.step2.badgeRules]
                          updated[idx] = {
                            ...rule,
                            colorVariant: e.target.value,
                          }
                          updateStep2({ badgeRules: updated })
                        }}
                        className="w-full px-2 py-1 text-xs rounded bg-surface border border-border text-fg"
                      >
                        <option value="emerald">Xanh lục (Emerald)</option>
                        <option value="indigo">Xanh tím (Indigo)</option>
                        <option value="amber">Vàng cam (Amber)</option>
                        <option value="rose">Hồng đào (Rose)</option>
                      </select>
                    </div>

                    {!readOnly && (
                      <button
                        type="button"
                        onClick={() => {
                          const updated = steps.step2.badgeRules.filter(
                            (_, i) => i !== idx
                          )
                          updateStep2({ badgeRules: updated })
                        }}
                        className="p-1 text-muted hover:text-danger mt-3"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Step 3 Editor */}
      {activeStepTab === 'step3' && (
        <div className="space-y-4 bg-surface p-5 rounded-xl border border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-fg flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              Cấu hình Bước 3: Điều khoản & Xác nhận Pháp lý
            </h3>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-fg mb-1">
                Nhãn checkbox đồng thuận chung
              </label>
              <input
                type="text"
                disabled={readOnly}
                value={steps.step3.consentCheckboxLabel}
                onChange={e =>
                  updateStep3({ consentCheckboxLabel: e.target.value })
                }
                className="w-full px-3 py-2 text-xs rounded-lg bg-surface-muted border border-border text-fg focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-fg mb-1">
                Tuyên bố xác nhận của khách thuê
              </label>
              <textarea
                disabled={readOnly}
                rows={2}
                value={steps.step3.consentStatement}
                onChange={e =>
                  updateStep3({ consentStatement: e.target.value })
                }
                className="w-full px-3 py-2 text-xs rounded-lg bg-surface-muted border border-border text-fg focus:outline-none focus:border-primary"
              />
            </div>

            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-fg">
                  Danh sách các điều khoản bắt buộc / tự chọn
                </label>
                {!readOnly && (
                  <button
                    type="button"
                    onClick={() => {
                      const newDisc: FlowDisclosure = {
                        id: `custom-disc-${Date.now()}`,
                        title: 'Quy định bổ sung tòa nhà',
                        body: 'Người thuê cam kết tuân thủ nội quy ban quản lý và quy chuẩn an ninh cư dân.',
                        required: false,
                        immutablePolicy: false,
                      }
                      updateStep3({
                        disclosures: [...steps.step3.disclosures, newDisc],
                      })
                    }}
                    className="flex items-center gap-1 text-[11px] font-semibold text-primary hover:text-primary-hover"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Thêm điều khoản
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {steps.step3.disclosures.map((disc, idx) => (
                  <div
                    key={disc.id}
                    className="p-3 bg-surface-muted rounded-lg border border-border space-y-2 relative"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {disc.immutablePolicy && (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                            <Lock className="w-3 h-3" />
                            Pháp lý bắt buộc (Nghị định 96/2024)
                          </span>
                        )}
                        <span className="text-xs font-bold text-fg">
                          Mã: {disc.id}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-1.5 text-xs text-fg cursor-pointer">
                          <input
                            type="checkbox"
                            disabled={readOnly || disc.immutablePolicy}
                            checked={disc.required}
                            onChange={e => {
                              const updated = [...steps.step3.disclosures]
                              updated[idx] = {
                                ...disc,
                                required: e.target.checked,
                              }
                              updateStep3({ disclosures: updated })
                            }}
                            className="rounded border-border text-primary focus:ring-primary"
                          />
                          Bắt buộc xác nhận
                        </label>

                        {!readOnly && !disc.immutablePolicy && (
                          <button
                            type="button"
                            onClick={() => {
                              const updated = steps.step3.disclosures.filter(
                                (_, i) => i !== idx
                              )
                              updateStep3({ disclosures: updated })
                            }}
                            className="text-muted hover:text-danger"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div>
                      <input
                        type="text"
                        disabled={readOnly || disc.immutablePolicy}
                        value={disc.title}
                        onChange={e => {
                          const updated = [...steps.step3.disclosures]
                          updated[idx] = { ...disc, title: e.target.value }
                          updateStep3({ disclosures: updated })
                        }}
                        className="w-full px-2.5 py-1.5 text-xs font-semibold rounded bg-surface border border-border text-fg"
                        placeholder="Tiêu đề điều khoản..."
                      />
                    </div>

                    <div>
                      <textarea
                        disabled={readOnly || disc.immutablePolicy}
                        rows={2}
                        value={disc.body}
                        onChange={e => {
                          const updated = [...steps.step3.disclosures]
                          updated[idx] = { ...disc, body: e.target.value }
                          updateStep3({ disclosures: updated })
                        }}
                        className="w-full px-2.5 py-1.5 text-xs rounded bg-surface border border-border text-fg"
                        placeholder="Nội dung điều khoản..."
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Step 4 Editor */}
      {activeStepTab === 'step4' && (
        <div className="space-y-4 bg-surface p-5 rounded-xl border border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-fg flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              Cấu hình Bước 4: Màn hình Hoàn tất & Lộ trình Ký hợp đồng
            </h3>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-fg mb-1">
                Tiêu đề hoàn tất hồ sơ
              </label>
              <input
                type="text"
                disabled={readOnly}
                value={steps.step4.heroSuccessTitle}
                onChange={e =>
                  updateStep4({ heroSuccessTitle: e.target.value })
                }
                className="w-full px-3 py-2 text-xs rounded-lg bg-surface-muted border border-border text-fg focus:outline-none focus:border-primary"
              />
            </div>

            <div className="pt-2">
              <label className="text-xs font-semibold text-fg block mb-2">
                Các mốc lộ trình tiếp theo
              </label>
              <div className="space-y-2">
                {steps.step4.timelineSteps.map((tStep, idx) => (
                  <div
                    key={tStep.key}
                    className="p-3 bg-surface-muted rounded-lg border border-border flex items-start gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div className="flex-1 space-y-1.5">
                      <input
                        type="text"
                        disabled={readOnly}
                        value={tStep.title}
                        onChange={e => {
                          const updated = [...steps.step4.timelineSteps]
                          updated[idx] = { ...tStep, title: e.target.value }
                          updateStep4({ timelineSteps: updated })
                        }}
                        className="w-full px-2 py-1 text-xs font-semibold rounded bg-surface border border-border text-fg"
                      />
                      <input
                        type="text"
                        disabled={readOnly}
                        value={tStep.description}
                        onChange={e => {
                          const updated = [...steps.step4.timelineSteps]
                          updated[idx] = {
                            ...tStep,
                            description: e.target.value,
                          }
                          updateStep4({ timelineSteps: updated })
                        }}
                        className="w-full px-2 py-1 text-xs rounded bg-surface border border-border text-muted"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
