'use client'

import * as React from 'react'
import { FileText, Loader2, ShieldCheck } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { DatePicker } from '@/shared/ui/date-picker'
import { OptionSelect, type SelectOption } from '@/shared/ui/option-select'
import { dmyToIso, isoToDmy, parseDmy } from '../../lib/kyc-date'
import { validateKycForm } from '../../lib/kyc-form-validation'
import { KYC_NATIONALITY } from '../../lib/kyc-nationality'
import { KycAddressField } from './kyc-address-field'

const INPUT_CLASS =
  'w-full border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-fg focus:outline-none focus:border-[#9F3F2A] bg-white font-semibold'
const MIN_BIRTH_DATE = new Date(1900, 0, 1)
const GENDER_OPTIONS: SelectOption[] = [
  { value: 'Nam', label: 'Nam' },
  { value: 'Nữ', label: 'Nữ' },
]

interface KycFormValues {
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

interface KycStep2Props {
  kycForm: KycFormValues
  setKycForm: React.Dispatch<React.SetStateAction<KycFormValues>>
  isProcessing: boolean
  setCurrentStep: (step: 1 | 2 | 3) => void
  handleConfirmAndSubmitKyc: () => void
}

export function KycStep2({
  kycForm,
  setKycForm,
  isProcessing,
  setCurrentStep,
  handleConfirmAndSubmitKyc,
}: KycStep2Props): React.ReactElement {
  // Errors appear only after the first submit attempt, then stay live while the user fixes them.
  const [attempted, setAttempted] = React.useState(false)
  const today = React.useMemo(() => new Date(), [])
  const errors = attempted ? validateKycForm(kycForm) : {}
  const hasErrors = Object.keys(errors).length > 0
  const unread = missingFields(kycForm)

  const handleSubmit = (): void => {
    if (Object.keys(validateKycForm(kycForm)).length > 0) {
      setAttempted(true)
      return
    }
    handleConfirmAndSubmitKyc()
  }

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex-1 overflow-y-auto pr-1">
        <div className="max-w-2xl mx-auto w-full space-y-4 pb-4">
          <div className="text-center space-y-1">
            <h4 className="text-sm font-bold text-fg flex items-center justify-center gap-1.5">
              <FileText className="h-4 w-4 text-[#9F3F2A]" aria-hidden="true" />
              Kiểm tra thông tin trên CCCD
            </h4>
            <p className="text-[11px] text-muted-foreground">
              Thông tin được đọc tự động từ ảnh CCCD. Hồ sơ chờ nhân viên duyệt
              sau khi nộp.
            </p>
          </div>

          {unread.length > 0 && (
            <div
              role="status"
              className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800"
            >
              Hệ thống chưa đọc được: <b>{unread.join(', ')}</b>. Bạn điền giúp
              nhé.
            </div>
          )}

          <Section title="Thông tin cá nhân">
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
            <Field label="Quốc tịch">
              <input
                type="text"
                aria-label="Quốc tịch"
                value={KYC_NATIONALITY}
                readOnly
                className={`${INPUT_CLASS} bg-slate-50 text-slate-500`}
              />
            </Field>
          </Section>

          <Section title="Địa chỉ" single>
            <KycAddressField
              label="Quê quán"
              value={kycForm.placeOfOrigin || ''}
              onChange={placeOfOrigin =>
                setKycForm(prev => ({ ...prev, placeOfOrigin }))
              }
            />
            <KycAddressField
              label="Nơi thường trú"
              withWard
              value={kycForm.address || ''}
              onChange={address => setKycForm(prev => ({ ...prev, address }))}
              {...(errors.address ? { error: errors.address } : {})}
            />
          </Section>

          <Section title="Giấy tờ">
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
                  setKycForm(prev => ({
                    ...prev,
                    placeOfIssue: e.target.value,
                  }))
                }
                className={INPUT_CLASS}
              />
            </Field>
          </Section>
        </div>
      </div>

      {/* Actions stay in view however long the form is. */}
      <div className="border-t border-slate-100 bg-white pt-3">
        <div className="max-w-2xl mx-auto w-full space-y-2">
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

/** Required fields the OCR left empty, so the user knows what to fill in before submitting. */
function missingFields(form: KycFormValues): string[] {
  const missing: string[] = []
  if (!form.dob.trim()) missing.push('ngày sinh')
  if (!form.gender.trim()) missing.push('giới tính')
  if (!form.placeOfOrigin.trim()) missing.push('quê quán')
  if (!form.address.trim()) missing.push('nơi thường trú')
  if (!form.issueDate.trim()) missing.push('ngày cấp')
  return missing
}

function Section({
  title,
  single = false,
  children,
}: {
  title: string
  single?: boolean
  children: React.ReactNode
}): React.ReactElement {
  return (
    <section className="border border-slate-200 rounded-2xl p-4 bg-white shadow-sm space-y-3">
      <h5 className="text-[11px] font-bold text-[#9F3F2A] uppercase tracking-wider">
        {title}
      </h5>
      <div
        className={`grid grid-cols-1 gap-4 ${single ? '' : 'sm:grid-cols-2'}`}
      >
        {children}
      </div>
    </section>
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
