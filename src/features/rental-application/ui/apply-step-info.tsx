'use client'

import * as React from 'react'
import {
  ArrowRight,
  Briefcase,
  Calendar as CalendarIcon,
  CheckCircle2,
  FileEdit,
  Info,
  PawPrint,
  ShieldAlert,
  Users,
} from 'lucide-react'
import { addDays, format, parseISO } from 'date-fns'
import { vi } from 'date-fns/locale'
import type { FlowStep1Config } from '@/features/rental-flow-config'
import { Button } from '@/shared/ui/button'
import { Calendar } from '@/shared/ui/calendar'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'
import { Switch } from '@/shared/ui/switch'
import { Textarea } from '@/shared/ui/textarea'

export interface ApplyStepInfoValues {
  occupants: number
  moveInDate: string
  occupation: string
  hasPets: boolean
  notes?: string
}

export interface ApplyStepInfoProps {
  values: ApplyStepInfoValues
  apartmentArea?: number | undefined
  step1Config?: FlowStep1Config | undefined
  onChange: (values: Partial<ApplyStepInfoValues>) => void
  onNext: () => void
}

export function getTodayDateString(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function validateStepInfo(
  values: ApplyStepInfoValues,
  config?: Partial<FlowStep1Config>
): Record<string, string> {
  const errors: Record<string, string> = {}
  const minOccupants = config?.minOccupants ?? 1
  const maxOccupants = config?.maxOccupants ?? 20

  if (
    !Number.isInteger(values.occupants) ||
    values.occupants < minOccupants ||
    values.occupants > maxOccupants
  ) {
    errors.occupants =
      config?.minOccupants !== undefined || config?.maxOccupants !== undefined
        ? `Số người ở phải từ ${minOccupants} đến ${maxOccupants}.`
        : 'Số người ở phải từ 1 đến 20.'
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayStr = getTodayDateString()

  if (!values.moveInDate || values.moveInDate < todayStr) {
    errors.moveInDate = 'Ngày vào ở không được trước hôm nay.'
  } else if (
    config?.minMoveInLeadDays !== undefined &&
    config.minMoveInLeadDays > 0
  ) {
    const minDate = addDays(today, config.minMoveInLeadDays)
    minDate.setHours(0, 0, 0, 0)
    try {
      const selected = parseISO(values.moveInDate)
      if (selected < minDate) {
        errors.moveInDate = `Ngày vào ở phải sau hôm nay ít nhất ${config.minMoveInLeadDays} ngày.`
      }
    } catch {
      errors.moveInDate = 'Ngày vào ở không hợp lệ.'
    }
  }

  if (
    !errors.moveInDate &&
    config?.maxMoveInLeadDays !== undefined &&
    values.moveInDate
  ) {
    const maxDate = addDays(today, config.maxMoveInLeadDays)
    maxDate.setHours(23, 59, 59, 999)
    try {
      const selected = parseISO(values.moveInDate)
      if (selected > maxDate) {
        errors.moveInDate = `Ngày vào ở không được vượt quá ${config.maxMoveInLeadDays} ngày tính từ hôm nay.`
      }
    } catch {
      errors.moveInDate = 'Ngày vào ở không hợp lệ.'
    }
  }

  const trimmedOccupation = (values.occupation || '').trim()
  if (!trimmedOccupation || trimmedOccupation.length > 200) {
    errors.occupation = 'Vui lòng nhập nghề nghiệp (1 đến 200 ký tự).'
  }

  const allowNotes = config?.allowNotes ?? true
  const notesMaxLength = config?.notesMaxLength ?? 1000

  if (
    allowNotes &&
    values.notes &&
    values.notes.trim().length > notesMaxLength
  ) {
    errors.notes = `Ghi chú không được vượt quá ${notesMaxLength} ký tự.`
  }

  return errors
}

const COMMON_OCCUPATIONS = [
  'Công nghệ thông tin / Phần mềm',
  'Tài chính / Ngân hàng / Kế toán',
  'Kinh doanh / Bán lẻ / Thương mại',
  'Y tế / Dược sĩ / Bác sĩ',
  'Giáo dục / Giảng viên / Giáo viên',
  'Luật sư / Tư vấn pháp lý',
  'Làm việc tự do (Freelancer)',
  'Sinh viên / Nghiên cứu sinh',
]

const QUICK_NOTE_SUGGESTIONS = [
  'Cần chỗ đỗ xe ô tô',
  'Mong muốn đăng ký tạm trú sớm (DVC 1.004194)',
  'Dọn vào bàn giao buổi sáng (08h - 12h)',
  'Có nhu cầu lắp thêm rèm / lưới an toàn ban công',
]

export function ApplyStepInfo({
  values,
  apartmentArea = 68,
  step1Config,
  onChange,
  onNext,
}: ApplyStepInfoProps): React.ReactElement {
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [calendarOpen, setCalendarOpen] = React.useState(false)

  const moveInDateLabel =
    step1Config?.moveInDateLabel?.trim() || 'Ngày dự kiến vào ở'
  const minOccupants = step1Config?.minOccupants ?? 1
  const maxOccupants = step1Config?.maxOccupants ?? 10
  const minMoveInLeadDays = step1Config?.minMoveInLeadDays ?? 0
  const maxMoveInLeadDays = step1Config?.maxMoveInLeadDays ?? 90
  const allowNotes = step1Config?.allowNotes ?? true
  const notesMaxLength = step1Config?.notesMaxLength ?? 1000

  // Recommended occupancy density based on Housing Law (min 8m2/person)
  const recommendedMaxOccupants = Math.max(
    1,
    Math.min(20, Math.floor(apartmentArea / 8))
  )

  const occupationInputRef = React.useRef<HTMLInputElement>(null)
  const notesInputRef = React.useRef<HTMLTextAreaElement>(null)

  const selectedDateObject = React.useMemo(() => {
    if (!values.moveInDate) return undefined
    try {
      return parseISO(values.moveInDate)
    } catch {
      return undefined
    }
  }, [values.moveInDate])

  const formattedDateDisplay = React.useMemo(() => {
    if (!selectedDateObject) return 'Chọn ngày vào ở mong muốn'
    try {
      return format(selectedDateObject, 'EEEE, dd/MM/yyyy', { locale: vi })
    } catch {
      return values.moveInDate
    }
  }, [selectedDateObject, values.moveInDate])

  const handleQuickDate = (offsetDays: number): void => {
    const safeOffset = Math.max(
      minMoveInLeadDays,
      Math.min(maxMoveInLeadDays, offsetDays)
    )
    const target = addDays(new Date(), safeOffset)
    const formatted = format(target, 'yyyy-MM-dd')
    onChange({ moveInDate: formatted })
    if (errors.moveInDate) {
      setErrors(prev => ({ ...prev, moveInDate: '' }))
    }
    setCalendarOpen(false)
  }

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault()
    const validationErrors = validateStepInfo(values, step1Config)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      if (validationErrors.occupation) {
        occupationInputRef.current?.focus()
      } else if (validationErrors.notes) {
        notesInputRef.current?.focus()
      }
      return
    }

    onNext()
  }

  return (
    <form
      data-testid="apply-step-info-form"
      onSubmit={handleSubmit}
      className="space-y-6"
      noValidate
    >
      <header className="border-b border-border/80 pb-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <Info aria-hidden="true" className="h-4 w-4" />
          <span>Bước 1/4: Xác lập hồ sơ nhân thân</span>
        </div>
        <h2 className="mt-1 font-display text-xl font-bold text-fg sm:text-2xl">
          Thông tin người thuê & Quy chuẩn cư trú
        </h2>
        <p className="mt-1 text-xs text-muted">
          Thông tin này giúp chủ nhà đánh giá điều kiện nhân thân và đối chiếu
          với nội quy tòa nhà trước khi tạo hợp đồng số.
        </p>
      </header>

      {/* Section 1: Cư trú & Thời gian */}
      <section className="space-y-4 rounded-xl border border-border bg-surface p-3.5 shadow-sm sm:rounded-2xl sm:p-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted">
          1. Quy chuẩn thành viên & Ngày nhận nhà
        </h3>

        <div className="grid gap-5 sm:grid-cols-2">
          {/* Occupants */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="occupants-select"
                className="flex items-center gap-1.5 text-xs font-semibold text-fg"
              >
                <Users
                  aria-hidden="true"
                  className="h-3.5 w-3.5 text-primary"
                />
                <span>Số lượng người ở</span>
                <span className="text-danger">*</span>
              </Label>
              <span className="text-[11px] text-muted">
                Tối ưu: 1 – {recommendedMaxOccupants} người
              </span>
            </div>

            <Select
              value={String(values.occupants || 1)}
              onValueChange={val => {
                onChange({ occupants: parseInt(val, 10) })
                if (errors.occupants) {
                  setErrors(prev => ({ ...prev, occupants: '' }))
                }
              }}
            >
              <SelectTrigger
                id="occupants-select"
                data-testid="occupants-select-trigger"
                className="h-10 w-full rounded-xl border-border bg-surface px-3.5 text-xs text-fg focus:ring-2 focus:ring-primary/20"
              >
                <SelectValue placeholder="Chọn số lượng người ở" />
              </SelectTrigger>
              <SelectContent className="max-h-60 rounded-xl border-border bg-surface text-fg shadow-lg">
                {Array.from(
                  { length: Math.max(1, maxOccupants - minOccupants + 1) },
                  (_, i) => minOccupants + i
                ).map(num => (
                  <SelectItem key={num} value={String(num)}>
                    {num} người {num === 1 ? '(Ở một mình)' : ''}
                    {num === recommendedMaxOccupants
                      ? ' — Mức tối ưu căn hộ'
                      : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.occupants ? (
              <p role="alert" className="text-[11px] text-danger">
                {errors.occupants}
              </p>
            ) : null}
            <p className="flex items-center gap-1 text-[11px] text-subtle">
              <ShieldAlert
                aria-hidden="true"
                className="h-3 w-3 text-primary shrink-0"
              />
              <span>
                Tiêu chuẩn nhà ở {apartmentArea}m² đảm bảo an toàn PCCC.
              </span>
            </p>
          </div>

          {/* Move-in Date */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="move-in-date-trigger"
                className="flex items-center gap-1.5 text-xs font-semibold text-fg"
              >
                <CalendarIcon
                  aria-hidden="true"
                  className="h-3.5 w-3.5 text-primary"
                />
                <span>{moveInDateLabel}</span>
                <span className="text-danger">*</span>
              </Label>
              <span className="text-[11px] text-muted">
                +{minMoveInLeadDays} đến +{maxMoveInLeadDays} ngày
              </span>
            </div>

            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  id="move-in-date-trigger"
                  data-testid="move-in-date-trigger"
                  type="button"
                  variant="outline"
                  className={`h-10 w-full justify-start rounded-xl border px-3 text-left text-xs font-normal shadow-sm ${
                    errors.moveInDate
                      ? 'border-danger text-danger'
                      : 'border-border bg-surface text-fg hover:bg-surface-muted'
                  }`}
                >
                  <CalendarIcon
                    aria-hidden="true"
                    className="mr-2 h-3.5 w-3.5 text-primary"
                  />
                  <span className="capitalize">{formattedDateDisplay}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="w-auto rounded-2xl border border-border bg-surface p-0 shadow-xl"
              >
                <Calendar
                  mode="single"
                  selected={selectedDateObject}
                  onSelect={date => {
                    if (date) {
                      const formatted = format(date, 'yyyy-MM-dd')
                      onChange({ moveInDate: formatted })
                      if (errors.moveInDate) {
                        setErrors(prev => ({ ...prev, moveInDate: '' }))
                      }
                    }
                    setCalendarOpen(false)
                  }}
                  disabled={date => {
                    const today = new Date()
                    today.setHours(0, 0, 0, 0)
                    if (
                      step1Config?.minMoveInLeadDays !== undefined ||
                      step1Config?.maxMoveInLeadDays !== undefined
                    ) {
                      const minDate = addDays(today, minMoveInLeadDays)
                      minDate.setHours(0, 0, 0, 0)
                      const maxDate = addDays(today, maxMoveInLeadDays)
                      maxDate.setHours(23, 59, 59, 999)
                      return date < minDate || date > maxDate
                    }
                    return date < today
                  }}
                />
              </PopoverContent>
            </Popover>

            {errors.moveInDate ? (
              <p role="alert" className="text-[11px] text-danger">
                {errors.moveInDate}
              </p>
            ) : null}

            {/* Quick date chips */}
            <div className="flex flex-wrap items-center gap-1 pt-0.5">
              <span className="text-[10px] text-subtle">Chọn nhanh:</span>
              <button
                type="button"
                onClick={() => handleQuickDate(0)}
                className="rounded-md border border-border bg-surface-muted/60 px-2 py-0.5 text-[10px] font-medium text-fg hover:border-primary hover:text-primary transition"
              >
                Hôm nay
              </button>
              <button
                type="button"
                onClick={() => handleQuickDate(3)}
                className="rounded-md border border-border bg-surface-muted/60 px-2 py-0.5 text-[10px] font-medium text-fg hover:border-primary hover:text-primary transition"
              >
                Sau 3 ngày
              </button>
              <button
                type="button"
                onClick={() => handleQuickDate(7)}
                className="rounded-md border border-border bg-surface-muted/60 px-2 py-0.5 text-[10px] font-medium text-fg hover:border-primary hover:text-primary transition"
              >
                Sau 1 tuần
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Công việc & Thú cưng */}
      <section className="space-y-4 rounded-xl border border-border bg-surface p-3.5 shadow-sm sm:rounded-2xl sm:p-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted">
          2. Nghề nghiệp & Kế hoạch sinh hoạt
        </h3>

        {/* Occupation */}
        <div className="space-y-2">
          <Label
            htmlFor="occupation-input"
            className="flex items-center gap-1.5 text-xs font-semibold text-fg"
          >
            <Briefcase
              aria-hidden="true"
              className="h-3.5 w-3.5 text-primary"
            />
            <span>Nghề nghiệp & Lĩnh vực hoạt động</span>
            <span className="text-danger">*</span>
          </Label>

          <Input
            id="occupation-input"
            ref={occupationInputRef}
            type="text"
            maxLength={200}
            placeholder="Ví dụ: Kỹ sư phần mềm, Bác sĩ, Kinh doanh..."
            value={values.occupation || ''}
            onChange={e => {
              onChange({ occupation: e.target.value })
              if (errors.occupation) {
                setErrors(prev => ({ ...prev, occupation: '' }))
              }
            }}
            aria-invalid={Boolean(errors.occupation)}
            className="h-10 rounded-xl text-xs"
            required
          />
          {errors.occupation ? (
            <p role="alert" className="text-[11px] text-danger">
              {errors.occupation}
            </p>
          ) : null}

          {/* Quick profession chips */}
          <div className="flex overflow-x-auto no-scrollbar gap-1.5 pt-1 pb-1 sm:flex-wrap">
            {COMMON_OCCUPATIONS.map(occ => (
              <button
                key={occ}
                type="button"
                onClick={() => {
                  onChange({ occupation: occ })
                  if (errors.occupation) {
                    setErrors(prev => ({ ...prev, occupation: '' }))
                  }
                }}
                className={`shrink-0 rounded-lg border px-2.5 py-1 text-[11px] transition ${
                  values.occupation === occ
                    ? 'border-primary bg-primary-soft/40 font-semibold text-primary'
                    : 'border-border bg-surface-muted/60 text-muted hover:border-border-strong hover:text-fg'
                }`}
              >
                {occ}
              </button>
            ))}
          </div>
        </div>

        {/* Pets Switch */}
        <div className="flex items-center justify-between rounded-xl border border-border/80 bg-surface-muted/40 p-3.5">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <PawPrint
                aria-hidden="true"
                className="h-3.5 w-3.5 text-primary"
              />
              <span className="text-xs font-semibold text-fg">
                Dự kiến nuôi thú cưng trong căn hộ
              </span>
            </div>
            <p className="text-[11px] text-muted">
              Hệ thống sẽ đối chiếu với ban quản lý tòa nhà để đảm bảo không vi
              phạm nội quy.
            </p>
          </div>
          <Switch
            data-testid="pets-switch"
            checked={values.hasPets}
            onCheckedChange={checked => onChange({ hasPets: checked })}
          />
        </div>

        {/* Notes */}
        {allowNotes ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="notes-input"
                className="flex items-center gap-1.5 text-xs font-semibold text-fg"
              >
                <FileEdit
                  aria-hidden="true"
                  className="h-3.5 w-3.5 text-primary"
                />
                <span>Ghi chú & Thỏa thuận riêng (Tùy chọn)</span>
              </Label>
              <span className="text-[10px] text-subtle">
                {(values.notes || '').length}/{notesMaxLength} ký tự
              </span>
            </div>

            <Textarea
              id="notes-input"
              ref={notesInputRef}
              rows={2}
              maxLength={notesMaxLength}
              placeholder="Nêu mong muốn về bàn giao, thiết bị hoặc yêu cầu riêng..."
              value={values.notes || ''}
              onChange={e => {
                onChange({ notes: e.target.value })
                if (errors.notes) {
                  setErrors(prev => ({ ...prev, notes: '' }))
                }
              }}
              className="rounded-xl text-xs bg-surface"
            />
            {errors.notes ? (
              <p role="alert" className="text-[11px] text-danger">
                {errors.notes}
              </p>
            ) : null}

            {/* Quick note chips */}
            <div className="flex overflow-x-auto no-scrollbar gap-1.5 pt-1 pb-1 sm:flex-wrap">
              {QUICK_NOTE_SUGGESTIONS.map(sugg => (
                <button
                  key={sugg}
                  type="button"
                  onClick={() => {
                    const current = values.notes
                      ? `${values.notes}; ${sugg}`
                      : sugg
                    onChange({ notes: current })
                  }}
                  className="shrink-0 rounded-lg border border-border bg-surface-muted/50 px-2 py-0.5 text-[10px] text-muted hover:border-primary/50 hover:text-fg transition"
                >
                  + {sugg}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      {/* Navigation action */}
      <div className="flex flex-col-reverse gap-3 border-t border-border/80 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex items-center gap-1.5 text-xs text-muted">
          <CheckCircle2
            aria-hidden="true"
            className="h-3.5 w-3.5 shrink-0 text-success"
          />
          <span className="text-[11px] sm:text-xs">
            Thông tin được bảo mật và chỉ gửi tới chủ nhà được xác thực.
          </span>
        </div>

        <Button
          type="submit"
          className="flex w-full items-center justify-center gap-2 bg-control px-6 py-2.5 text-xs font-semibold text-on-control shadow-sm hover:opacity-90 sm:w-auto"
        >
          <span>Tiếp tục chọn gói thuê</span>
          <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
        </Button>
      </div>
    </form>
  )
}
