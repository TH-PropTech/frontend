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

// Shared UI
import { Input } from '@/shared/ui/input'
import { Textarea } from '@/shared/ui/textarea'
import { Checkbox } from '@/shared/ui/checkbox'
import { Label } from '@/shared/ui/label'
import { Button } from '@/shared/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'

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
      <div className="flex w-full justify-between items-start overflow-x-auto pt-2 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-2">
        {[
          { id: 'step1', title: 'Lưu trú', icon: Calendar },
          { id: 'step2', title: 'Tài chính', icon: FileText },
          { id: 'step3', title: 'Pháp lý', icon: ShieldCheck },
          { id: 'step4', title: 'Tiến trình', icon: CheckCircle2 },
        ].map((s, idx, arr) => {
          const isActive = activeStepTab === s.id
          const Icon = s.icon
          return (
            <React.Fragment key={s.id}>
              <div className="flex flex-col items-center gap-2 relative z-10 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    setActiveStepTab(
                      s.id as 'step1' | 'step2' | 'step3' | 'step4'
                    )
                  }
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-all shrink-0 ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-md scale-110'
                      : 'border border-border bg-surface text-muted-foreground hover:bg-surface-muted hover:text-foreground'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </button>
                <span
                  className={`text-[11px] font-bold whitespace-nowrap ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
                >
                  {s.title}
                </span>
              </div>

              {/* Connector with Arrow */}
              {idx < arr.length - 1 && (
                <div className="flex-1 flex items-center min-w-[30px] h-11 px-1 sm:px-3">
                  <div className="h-[2px] w-full bg-border relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-border transform rotate-45"></div>
                  </div>
                </div>
              )}
            </React.Fragment>
          )
        })}
      </div>

      {/* Tab 1: Step 1 Editor */}
      {activeStepTab === 'step1' && (
        <div className="space-y-6 bg-surface p-5 rounded-xl border border-border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-fg flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Cấu hình Bước 1: Thông tin lưu trú & Người ở
              </h3>
              <p className="text-xs text-muted mt-1">
                Kiểm soát khoảng ngày dọn vào và giới hạn người ở
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="moveInDateLabel">Nhãn ngày dọn vào</Label>
              <Input
                id="moveInDateLabel"
                disabled={readOnly}
                value={steps.step1.moveInDateLabel}
                onChange={e => updateStep1({ moveInDateLabel: e.target.value })}
              />
            </div>

            <div className="flex items-center gap-3 pt-8">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="allowNotes"
                  disabled={readOnly}
                  checked={steps.step1.allowNotes}
                  onCheckedChange={checked =>
                    updateStep1({ allowNotes: !!checked })
                  }
                />
                <Label htmlFor="allowNotes" className="cursor-pointer">
                  Cho phép ghi chú thêm
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="minMoveInLeadDays">
                Số ngày tối thiểu trước khi dọn vào (Lead Days Min)
              </Label>
              <Input
                id="minMoveInLeadDays"
                type="number"
                disabled={readOnly}
                min={0}
                max={90}
                value={steps.step1.minMoveInLeadDays}
                onChange={e =>
                  updateStep1({ minMoveInLeadDays: Number(e.target.value) })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxMoveInLeadDays">
                Số ngày tối đa trước khi dọn vào (Lead Days Max)
              </Label>
              <Input
                id="maxMoveInLeadDays"
                type="number"
                disabled={readOnly}
                min={1}
                max={365}
                value={steps.step1.maxMoveInLeadDays}
                onChange={e =>
                  updateStep1({ maxMoveInLeadDays: Number(e.target.value) })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="minOccupants">Số người ở tối thiểu</Label>
              <Input
                id="minOccupants"
                type="number"
                disabled={readOnly}
                min={1}
                max={10}
                value={steps.step1.minOccupants}
                onChange={e =>
                  updateStep1({ minOccupants: Number(e.target.value) })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxOccupants">Số người ở tối đa</Label>
              <Input
                id="maxOccupants"
                type="number"
                disabled={readOnly}
                min={steps.step1.minOccupants}
                max={20}
                value={steps.step1.maxOccupants}
                onChange={e =>
                  updateStep1({ maxOccupants: Number(e.target.value) })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notesMaxLength">
                Độ dài tối đa ghi chú (ký tự)
              </Label>
              <Input
                id="notesMaxLength"
                type="number"
                disabled={readOnly}
                min={100}
                max={1000}
                value={steps.step1.notesMaxLength}
                onChange={e =>
                  updateStep1({ notesMaxLength: Number(e.target.value) })
                }
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Step 2 Editor */}
      {activeStepTab === 'step2' && (
        <div className="space-y-6 bg-surface p-5 rounded-xl border border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-fg flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              Cấu hình Bước 2: Hiển thị Tài chính & Huy hiệu Gói thuê
            </h3>
          </div>

          {/* Strict Notice regarding Commercial Values */}
          <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-start gap-3 text-sm text-amber-600 dark:text-amber-400">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
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

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="headerTitle">Tiêu đề phần tài chính</Label>
              <Input
                id="headerTitle"
                disabled={readOnly}
                value={steps.step2.headerTitle}
                onChange={e => updateStep2({ headerTitle: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="depositNoticeBody">
                Nội dung hướng dẫn tiền cọc
              </Label>
              <Textarea
                id="depositNoticeBody"
                disabled={readOnly}
                rows={3}
                value={steps.step2.depositNoticeBody}
                onChange={e =>
                  updateStep2({ depositNoticeBody: e.target.value })
                }
                className="resize-none"
              />
            </div>

            {/* Badge rules */}
            <div className="pt-4 border-t border-border">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <Label className="text-sm">
                  Quy tắc gắn huy hiệu theo thời hạn gói
                </Label>
                {!readOnly && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
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
                    className="text-primary hover:text-primary-hover hover:bg-primary/5"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm huy hiệu
                  </Button>
                )}
              </div>

              <div className="space-y-3">
                {steps.step2.badgeRules.map((rule, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-end gap-4 p-4 bg-surface-muted rounded-xl border border-border"
                  >
                    <div className="w-full sm:w-40 space-y-2">
                      <Label className="text-xs text-muted">
                        Thời hạn (tháng)
                      </Label>
                      <Select
                        disabled={readOnly}
                        value={String(rule.durationMonths)}
                        onValueChange={val => {
                          const updated = [...steps.step2.badgeRules]
                          updated[idx] = {
                            ...rule,
                            durationMonths: Number(val),
                          }
                          updateStep2({ badgeRules: updated })
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn thời hạn" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1" disabled>
                            1 tháng (legacy)
                          </SelectItem>
                          <SelectItem value="3">3 tháng</SelectItem>
                          <SelectItem value="6">6 tháng</SelectItem>
                          <SelectItem value="12">12 tháng</SelectItem>
                          <SelectItem value="24">24 tháng</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex-1 space-y-2">
                      <Label className="text-xs text-muted">
                        Nhãn hiển thị
                      </Label>
                      <Input
                        disabled={readOnly}
                        value={rule.badgeText}
                        onChange={e => {
                          const updated = [...steps.step2.badgeRules]
                          updated[idx] = { ...rule, badgeText: e.target.value }
                          updateStep2({ badgeRules: updated })
                        }}
                      />
                    </div>

                    <div className="w-full sm:w-48 space-y-2">
                      <Label className="text-xs text-muted">Màu sắc</Label>
                      <Select
                        disabled={readOnly}
                        value={rule.colorVariant}
                        onValueChange={val => {
                          const updated = [...steps.step2.badgeRules]
                          updated[idx] = {
                            ...rule,
                            colorVariant: val,
                          }
                          updateStep2({ badgeRules: updated })
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn màu sắc" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="emerald">
                            Xanh lục (Emerald)
                          </SelectItem>
                          <SelectItem value="indigo">
                            Xanh tím (Indigo)
                          </SelectItem>
                          <SelectItem value="amber">
                            Vàng cam (Amber)
                          </SelectItem>
                          <SelectItem value="rose">Hồng đào (Rose)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {!readOnly && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const updated = steps.step2.badgeRules.filter(
                            (_, i) => i !== idx
                          )
                          updateStep2({ badgeRules: updated })
                        }}
                        className="text-muted hover:text-danger hover:bg-danger/10 shrink-0 self-end"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
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
        <div className="space-y-6 bg-surface p-5 rounded-xl border border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-fg flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              Cấu hình Bước 3: Điều khoản & Xác nhận Pháp lý
            </h3>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="consentCheckboxLabel">
                Nhãn checkbox đồng thuận chung
              </Label>
              <Input
                id="consentCheckboxLabel"
                disabled={readOnly}
                value={steps.step3.consentCheckboxLabel}
                onChange={e =>
                  updateStep3({ consentCheckboxLabel: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="consentStatement">
                Tuyên bố xác nhận của khách thuê
              </Label>
              <Textarea
                id="consentStatement"
                disabled={readOnly}
                rows={2}
                value={steps.step3.consentStatement}
                onChange={e =>
                  updateStep3({ consentStatement: e.target.value })
                }
                className="resize-none"
              />
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <Label className="text-sm">
                  Danh sách các điều khoản bắt buộc / tự chọn
                </Label>
                {!readOnly && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
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
                    className="text-primary hover:text-primary-hover hover:bg-primary/5"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm điều khoản
                  </Button>
                )}
              </div>

              <div className="space-y-4">
                {steps.step3.disclosures.map((disc, idx) => (
                  <div
                    key={disc.id}
                    className="p-4 bg-surface-muted rounded-xl border border-border space-y-4 relative"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        {disc.immutablePolicy && (
                          <span className="flex items-center gap-1.5 text-[11px] font-bold text-amber-600 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                            <Lock className="w-3.5 h-3.5" />
                            Pháp lý bắt buộc (Nghị định 96/2024)
                          </span>
                        )}
                        <span className="text-xs font-bold text-fg bg-surface px-2.5 py-1 rounded-md border border-border">
                          Mã: {disc.id}
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`req-${disc.id}`}
                            disabled={readOnly || disc.immutablePolicy}
                            checked={disc.required}
                            onCheckedChange={checked => {
                              const updated = [...steps.step3.disclosures]
                              updated[idx] = {
                                ...disc,
                                required: !!checked,
                              }
                              updateStep3({ disclosures: updated })
                            }}
                          />
                          <Label
                            htmlFor={`req-${disc.id}`}
                            className="cursor-pointer"
                          >
                            Bắt buộc xác nhận
                          </Label>
                        </div>

                        {!readOnly && !disc.immutablePolicy && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              const updated = steps.step3.disclosures.filter(
                                (_, i) => i !== idx
                              )
                              updateStep3({ disclosures: updated })
                            }}
                            className="text-muted hover:text-danger hover:bg-danger/10 h-8 w-8"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Input
                        disabled={readOnly || disc.immutablePolicy}
                        value={disc.title}
                        onChange={e => {
                          const updated = [...steps.step3.disclosures]
                          updated[idx] = { ...disc, title: e.target.value }
                          updateStep3({ disclosures: updated })
                        }}
                        className="font-semibold"
                        placeholder="Tiêu đề điều khoản..."
                      />

                      <Textarea
                        disabled={readOnly || disc.immutablePolicy}
                        rows={2}
                        value={disc.body}
                        onChange={e => {
                          const updated = [...steps.step3.disclosures]
                          updated[idx] = { ...disc, body: e.target.value }
                          updateStep3({ disclosures: updated })
                        }}
                        placeholder="Nội dung điều khoản..."
                        className="resize-none"
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
        <div className="space-y-6 bg-surface p-5 rounded-xl border border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-fg flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              Cấu hình Bước 4: Màn hình Hoàn tất & Lộ trình Ký hợp đồng
            </h3>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="heroSuccessTitle">Tiêu đề hoàn tất hồ sơ</Label>
              <Input
                id="heroSuccessTitle"
                disabled={readOnly}
                value={steps.step4.heroSuccessTitle}
                onChange={e =>
                  updateStep4({ heroSuccessTitle: e.target.value })
                }
              />
            </div>

            <div className="pt-2">
              <Label className="block mb-4">Các mốc lộ trình tiếp theo</Label>
              <div className="space-y-4">
                {steps.step4.timelineSteps.map((tStep, idx) => (
                  <div
                    key={tStep.key}
                    className="p-4 bg-surface-muted rounded-xl border border-border flex flex-col sm:flex-row sm:items-start gap-4"
                  >
                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                      {idx + 1}
                    </span>
                    <div className="flex-1 space-y-3 w-full">
                      <Input
                        disabled={readOnly}
                        value={tStep.title}
                        onChange={e => {
                          const updated = [...steps.step4.timelineSteps]
                          updated[idx] = { ...tStep, title: e.target.value }
                          updateStep4({ timelineSteps: updated })
                        }}
                        className="font-semibold"
                        placeholder="Tên mốc lộ trình"
                      />
                      <Input
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
                        placeholder="Mô tả chi tiết"
                        className="text-muted-foreground"
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
