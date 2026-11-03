'use client'

import * as React from 'react'
import { FileText, BadgeCheck, Brain, Loader2, ShieldCheck } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { DatePicker } from '@/shared/ui/date-picker'
import { OptionSelect, type SelectOption } from '@/shared/ui/option-select'
import { dmyToIso, isoToDmy, parseDmy } from '../../lib/kyc-date'
import { validateKycForm } from '../../lib/kyc-form-validation'
import { KycAddressField } from './kyc-address-field'

const INPUT_CLASS =
  'w-full border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-fg focus:outline-none focus:border-[#9F3F2A] bg-white font-semibold'
const MIN_BIRTH_DATE = new Date(1900, 0, 1)
const GENDER_OPTIONS: SelectOption[] = [
  { value: 'Nam', label: 'Nam' },
  { value: 'Nữ', label: 'Nữ' },
]

interface KycStep2Props {
  kycForm: {
    fullName: string
    cccdNumber: string
    dob: string
    address: string
    gender: string
    nationality: string
    placeOfOrigin: string
    issueDate: string
    placeOfIssue: string
  }
  setKycForm: React.Dispatch<
    React.SetStateAction<{
      fullName: string
      cccdNumber: string
      dob: string
      address: string
      gender: string
      nationality: string
      placeOfOrigin: string
      issueDate: string
      placeOfIssue: string
    }>
  >
  preferredDistrict: string
  setPreferredDistrict: (val: string) => void
  rooms: number
  setRooms: (val: number) => void
  income: number
  setIncome: (val: number) => void
  formatCurrency: (v: number) => string
  isProcessing: boolean
  setCurrentStep: (step: 1 | 2 | 3) => void
  handleConfirmAndSubmitKyc: () => void
}

export function KycStep2({
  kycForm,
  setKycForm,
  preferredDistrict,
  setPreferredDistrict,
  rooms,
  setRooms,
  income,
  setIncome,
  formatCurrency,
  isProcessing,
  setCurrentStep,
  handleConfirmAndSubmitKyc,
}: KycStep2Props): React.ReactElement {
  // Errors appear only after the first submit attempt, then stay live while the user fixes them.
  const [attempted, setAttempted] = React.useState(false)
  const today = React.useMemo(() => new Date(), [])
  const errors = attempted ? validateKycForm(kycForm) : {}
  const hasErrors = Object.keys(errors).length > 0

  const handleSubmit = (): void => {
    if (Object.keys(validateKycForm(kycForm)).length > 0) {
      setAttempted(true)
      return
    }
    handleConfirmAndSubmitKyc()
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch flex-1 overflow-y-auto pr-1">
      {/* Form fields editor */}
      <div className="md:col-span-8 border border-slate-200 rounded-2xl p-5 bg-white shadow-sm space-y-4">
        <h4 className="text-xs font-bold text-[#9F3F2A] uppercase pb-2 border-b border-slate-100 flex items-center gap-1.5">
          <FileText className="h-4.5 w-4.5" /> Kiểm tra thông tin trích xuất
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Số CCCD" error={errors.cccdNumber}>
            <input
              type="text"
              inputMode="numeric"
              aria-label="Số CCCD"
              value={kycForm.cccdNumber || ''}
              onChange={e =>
                setKycForm(prev => ({ ...prev, cccdNumber: e.target.value }))
              }
              className={INPUT_CLASS}
            />
          </Field>
          <Field label="Họ và tên" error={errors.fullName}>
            <input
              type="text"
              aria-label="Họ và tên"
              value={kycForm.fullName || ''}
              onChange={e =>
                setKycForm(prev => ({ ...prev, fullName: e.target.value }))
              }
              className={INPUT_CLASS}
            />
          </Field>

          <Field label="Ngày sinh" error={errors.dob}>
            <DatePicker
              value={dmyToIso(kycForm.dob)}
              onChange={iso =>
                setKycForm(prev => ({ ...prev, dob: isoToDmy(iso) }))
              }
              placeholder="Chọn ngày sinh"
              minDate={MIN_BIRTH_DATE}
              maxDate={today}
            />
          </Field>
          <Field label="Giới tính" error={errors.gender}>
            <OptionSelect
              aria-label="Giới tính"
              value={kycForm.gender || ''}
              options={GENDER_OPTIONS}
              placeholder="Chọn giới tính"
              onChange={gender => setKycForm(prev => ({ ...prev, gender }))}
            />
          </Field>

          <Field label="Quốc tịch" error={errors.nationality}>
            <input
              type="text"
              aria-label="Quốc tịch"
              value={kycForm.nationality || ''}
              onChange={e =>
                setKycForm(prev => ({ ...prev, nationality: e.target.value }))
              }
              className={INPUT_CLASS}
            />
          </Field>
          <div className="hidden md:block" aria-hidden="true" />

          <div className="md:col-span-2">
            <KycAddressField
              label="Quê quán"
              value={kycForm.placeOfOrigin || ''}
              onChange={placeOfOrigin =>
                setKycForm(prev => ({ ...prev, placeOfOrigin }))
              }
            />
          </div>
          <div className="md:col-span-2">
            <KycAddressField
              label="Nơi thường trú"
              withWard
              value={kycForm.address || ''}
              onChange={address => setKycForm(prev => ({ ...prev, address }))}
              {...(errors.address ? { error: errors.address } : {})}
            />
          </div>

          <Field label="Ngày cấp" error={errors.issueDate}>
            <DatePicker
              value={dmyToIso(kycForm.issueDate)}
              onChange={iso =>
                setKycForm(prev => ({ ...prev, issueDate: isoToDmy(iso) }))
              }
              placeholder="Chọn ngày cấp"
              minDate={parseDmy(kycForm.dob) ?? MIN_BIRTH_DATE}
              maxDate={today}
            />
          </Field>
          <Field label="Nơi cấp">
            <input
              type="text"
              aria-label="Nơi cấp"
              value={kycForm.placeOfIssue || ''}
              onChange={e =>
                setKycForm(prev => ({ ...prev, placeOfIssue: e.target.value }))
              }
              className={INPUT_CLASS}
            />
          </Field>
        </div>
      </div>

      {/* AI Preferences & Match Results Card */}
      <div className="md:col-span-4 border border-slate-200 rounded-2xl p-5 bg-white shadow-sm flex flex-col justify-between">
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-[#9F3F2A] uppercase pb-2 border-b border-slate-100 flex items-center gap-1.5">
            <BadgeCheck className="h-4.5 w-4.5" /> Kết quả kiểm tra AI
          </h4>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
            Thông tin được AI OCR trích xuất từ ảnh CCCD. Hồ sơ chờ nhân viên
            duyệt sau khi nộp.
          </div>

          <div className="border-t border-slate-100 pt-3 space-y-3">
            <h4 className="text-[11px] font-bold text-[#9F3F2A] uppercase flex items-center gap-1">
              <Brain className="h-3.5 w-3.5" /> AI Preferences (Gợi ý)
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 block">
                  Khu vực thuê
                </label>
                <select
                  value={preferredDistrict}
                  onChange={e => setPreferredDistrict(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-2 py-1 text-xs text-fg focus:outline-none bg-white font-semibold"
                >
                  <option value="Bình Thạnh">Bình Thạnh</option>
                  <option value="Quận 1">Quận 1</option>
                  <option value="Quận 2">Quận 2</option>
                  <option value="Quận 7">Quận 7</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 block">
                  Số phòng ngủ
                </label>
                <select
                  value={rooms}
                  onChange={e => setRooms(Number(e.target.value))}
                  className="w-full border border-slate-200 rounded-lg px-2 py-1 text-xs text-fg focus:outline-none bg-white font-semibold"
                >
                  <option value={1}>1 PN</option>
                  <option value={2}>2 PN</option>
                  <option value={3}>3 PN</option>
                </select>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-slate-500 block">
                Thu nhập hàng tháng:{' '}
                <span className="text-[#9F3F2A] font-bold">
                  {formatCurrency(income)}
                </span>
              </label>
              <input
                type="range"
                min={8000000}
                max={150000000}
                step={1000000}
                value={income}
                onChange={e => setIncome(Number(e.target.value))}
                className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#9F3F2A]"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 space-y-2.5">
          {attempted && hasErrors && (
            <p role="alert" className="text-[11px] font-semibold text-red-600">
              Vui lòng kiểm tra lại các trường được đánh dấu đỏ.
            </p>
          )}
          {isProcessing ? (
            <div className="flex items-center justify-center gap-2 py-2">
              <Loader2 className="h-5 w-5 text-[#9F3F2A] animate-spin" />
              <span className="text-xs font-bold text-slate-500">
                Đang đẩy giao dịch CA lên Ledger...
              </span>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={() => setCurrentStep(2)}
                variant="outline"
                className="flex-1 h-10 text-xs border-slate-200 text-slate-600 rounded-full font-bold"
              >
                Quay lại
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1 h-10 text-xs text-white rounded-full font-bold shadow-md border-none flex items-center justify-center gap-1 cursor-pointer transition-colors"
                style={{ backgroundColor: '#9F3F2A' }}
              >
                <ShieldCheck className="h-4 w-4" /> Xác nhận & Nộp
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string | undefined
  children: React.ReactNode
}): React.ReactElement {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="text-[11px] font-semibold text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}
