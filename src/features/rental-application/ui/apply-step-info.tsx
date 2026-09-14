'use client'

import * as React from 'react'
import {
  AlertCircle,
  ArrowRight,
  Briefcase,
  Calendar as CalendarIcon,
  CheckCircle2,
  FileEdit,
  Info,
  PawPrint,
  ShieldAlert,
  Sparkles,
  Users,
} from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { vi } from 'date-fns/locale'
import { Button } from '@/shared/ui/button'
import { Calendar } from '@/shared/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'
import { Switch } from '@/shared/ui/switch'

export interface ApplyStepInfoValues {
  occupants: number
  moveInDate: string
  occupation: string
  hasPets: boolean
  notes?: string
}

export interface ApplyStepInfoProps {
  values: ApplyStepInfoValues
  apartmentArea?: number
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
  values: ApplyStepInfoValues
): Record<string, string> {
  const errors: Record<string, string> = {}

  if (
    !Number.isInteger(values.occupants) ||
    values.occupants < 1 ||
    values.occupants > 20
  ) {
    errors.occupants = 'Số người ở phải từ 1 đến 20.'
  }

  const todayStr = getTodayDateString()
  if (!values.moveInDate || values.moveInDate < todayStr) {
    errors.moveInDate = 'Ngày vào ở không được trước hôm nay.'
  }

  const trimmedOccupation = (values.occupation || '').trim()
  if (!trimmedOccupation || trimmedOccupation.length > 200) {
    errors.occupation = 'Vui lòng nhập nghề nghiệp (1 đến 200 ký tự).'
  }

  if (values.notes && values.notes.trim().length > 1000) {
    errors.notes = 'Ghi chú không được vượt quá 1000 ký tự.'
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
  'Mong muốn đăng ký tạm trú sớm (DVC 6007)',
  'Dọn vào bàn giao buổi sáng (08h - 12h)',
  'Có nhu cầu lắp thêm rèm / lưới an toàn ban công',
]

export function ApplyStepInfo({
  values,
  apartmentArea = 68,
  onChange,
  onNext,
}: ApplyStepInfoProps): React.ReactElement {
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [calendarOpen, setCalendarOpen] = React.useState(false)

  // Calculate recommended occupancy density based on Housing Law 2023 (min 8m2/person)
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
    const target = new Date()
    target.setDate(target.getDate() + offsetDays)
    const formatted = format(target, 'yyyy-MM-dd')
    onChange({ moveInDate: formatted })
    if (errors.moveInDate) {
      setErrors(prev => ({ ...prev, moveInDate: '' }))
    }
    setCalendarOpen(false)
  }

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault()
    const validationErrors = validateStepInfo(values)
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
      className="space-y-8"
      noValidate
    >
      <header className="border-b border-border/80 pb-5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <Info aria-hidden="true" className="h-4 w-4" />
          <span>Giai đoạn 1 / 4: Xác lập hồ sơ nhân thân</span>
        </div>
        <h2 className="mt-1.5 font-display text-xl font-bold text-fg sm:text-2xl">
          Thông tin người thuê & Quy chuẩn cư trú
        </h2>
        <p className="mt-1 text-sm text-muted">
          Thông tin này giúp chủ nhà đánh giá điều kiện nhân thân và đối chiếu
          với nội quy tòa nhà trước khi ký kết hợp đồng số.
        </p>
      </header>

      <div className="space-y-6">
        {/* 1. Số người ở cùng & Định mức nhà ở */}
        <div className="space-y-3 rounded-2xl border border-border bg-surface p-5 shadow-sm">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <label
              htmlFor="occupants-select"
              className="flex items-center gap-2 text-sm font-semibold text-fg"
            >
              <Users aria-hidden="true" className="h-4 w-4 text-primary" />
              <span>Số lượng thành viên cư trú</span>
              <span className="text-danger">*</span>
            </label>
            <span className="text-xs text-muted">
              Định mức khuyến nghị:{' '}
              <strong className="text-fg">
                1 – {recommendedMaxOccupants} người
              </strong>
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
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
                  className="h-11 w-full rounded-xl border-border bg-surface px-3.5 text-sm text-fg focus:ring-2 focus:ring-primary/20"
                >
                  <SelectValue placeholder="Chọn số lượng người ở" />
                </SelectTrigger>
                <SelectContent className="max-h-60 rounded-xl border-border bg-surface text-fg shadow-lg">
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(num => (
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
                <p role="alert" className="mt-1.5 text-xs text-danger">
                  {errors.occupants}
                </p>
              ) : null}
            </div>

            {/* Statutory density callout */}
            <div className="flex items-start gap-2.5 rounded-xl border border-border/70 bg-surface-muted/50 p-3 text-xs text-muted">
              <ShieldAlert
                aria-hidden="true"
                className="mt-0.5 h-4 w-4 shrink-0 text-primary"
              />
              <p className="leading-relaxed">
                <strong>Quy chuẩn Luật Nhà ở 2023:</strong> Diện tích tối thiểu
                bình quân là 8m²/người. Với căn hộ{' '}
                <strong>{apartmentArea}m²</strong>, số người ở cùng tối đa phù
                hợp là {recommendedMaxOccupants} người để bảo đảm an toàn PCCC
                và môi trường sinh hoạt.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Ngày dự kiến vào ở với Popover Calendar & Quick Chips */}
        <div className="space-y-3 rounded-2xl border border-border bg-surface p-5 shadow-sm">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <label
              htmlFor="move-in-date-trigger"
              className="flex items-center gap-2 text-sm font-semibold text-fg"
            >
              <CalendarIcon
                aria-hidden="true"
                className="h-4 w-4 text-primary"
              />
              <span>Ngày dự kiến vào ở & nhận bàn giao</span>
              <span className="text-danger">*</span>
            </label>
            <span className="text-xs text-muted">
              Khung giờ bàn giao: 08:00 – 18:00
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-12">
            <div className="sm:col-span-7">
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    id="move-in-date-trigger"
                    data-testid="move-in-date-trigger"
                    type="button"
                    variant="outline"
                    className={`h-11 w-full justify-start rounded-xl border px-3.5 text-left text-sm font-normal shadow-sm ${
                      errors.moveInDate
                        ? 'border-danger text-danger'
                        : 'border-border bg-surface text-fg hover:bg-surface-muted'
                    }`}
                  >
                    <CalendarIcon
                      aria-hidden="true"
                      className="mr-2.5 h-4 w-4 text-primary"
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
                      return date < today
                    }}
                  />
                </PopoverContent>
              </Popover>

              {errors.moveInDate ? (
                <p role="alert" className="mt-1.5 text-xs text-danger">
                  {errors.moveInDate}
                </p>
              ) : null}

              {/* Quick Suggestion Chips */}
              <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-medium text-subtle">
                  Chọn nhanh:
                </span>
                <button
                  type="button"
                  onClick={() => handleQuickDate(0)}
                  className="rounded-lg border border-border bg-surface-muted/60 px-2.5 py-1 text-[11px] font-medium text-fg hover:border-primary hover:text-primary transition"
                >
                  Hôm nay
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDate(3)}
                  className="rounded-lg border border-border bg-surface-muted/60 px-2.5 py-1 text-[11px] font-medium text-fg hover:border-primary hover:text-primary transition"
                >
                  Sau 3 ngày
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDate(7)}
                  className="rounded-lg border border-border bg-surface-muted/60 px-2.5 py-1 text-[11px] font-medium text-fg hover:border-primary hover:text-primary transition"
                >
                  Sau 1 tuần
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDate(14)}
                  className="rounded-lg border border-border bg-surface-muted/60 px-2.5 py-1 text-[11px] font-medium text-fg hover:border-primary hover:text-primary transition"
                >
                  Sau 2 tuần
                </button>
              </div>
            </div>

            <div className="sm:col-span-5">
              <div className="rounded-xl border border-border/70 bg-surface-muted/50 p-3 text-xs text-muted">
                <p className="font-semibold text-fg">
                  Lưu ý khi nhận bàn giao:
                </p>
                <ul className="mt-1.5 list-disc space-y-1 pl-4 leading-relaxed">
                  <li>
                    Chốt chỉ số đồng hồ điện & nước tại thời điểm nhận nhà.
                  </li>
                  <li>Kiểm kê hiện trạng trang thiết bị nội thất đi kèm.</li>
                  <li>Hai bên ký biên bản bàn giao làm phụ lục hợp đồng.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Nghề nghiệp & Lĩnh vực với Gợi ý Autocomplete */}
        <div className="space-y-3 rounded-2xl border border-border bg-surface p-5 shadow-sm">
          <label
            htmlFor="occupation-input"
            className="flex items-center gap-2 text-sm font-semibold text-fg"
          >
            <Briefcase aria-hidden="true" className="h-4 w-4 text-primary" />
            <span>Nghề nghiệp & Lĩnh vực hoạt động</span>
            <span className="text-danger">*</span>
          </label>

          <div>
            <input
              id="occupation-input"
              ref={occupationInputRef}
              type="text"
              maxLength={200}
              placeholder="Nhập nghề nghiệp hoặc bấm chọn nhanh bên dưới..."
              value={values.occupation || ''}
              onChange={e => {
                onChange({ occupation: e.target.value })
                if (errors.occupation) {
                  setErrors(prev => ({ ...prev, occupation: '' }))
                }
              }}
              aria-invalid={Boolean(errors.occupation)}
              className={`h-11 w-full rounded-xl border bg-surface px-3.5 text-sm text-fg shadow-sm outline-none transition focus:ring-2 focus:ring-primary/20 ${
                errors.occupation
                  ? 'border-danger focus:border-danger'
                  : 'border-border focus:border-primary'
              }`}
              required
            />
            {errors.occupation ? (
              <p role="alert" className="mt-1.5 text-xs text-danger">
                {errors.occupation}
              </p>
            ) : null}
          </div>

          {/* Profession chips */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-medium text-subtle">
              Gợi ý lĩnh vực phổ biến:
            </span>
            <div className="flex flex-wrap gap-1.5">
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
                  className={`rounded-lg border px-2.5 py-1 text-xs transition ${
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
        </div>

        {/* 4. Quy chế thú cưng với Switch */}
        <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <PawPrint aria-hidden="true" className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-fg">
                  Kế hoạch nuôi thú cưng trong căn hộ
                </span>
              </div>
              <p className="text-xs text-muted">
                Báo trước để chủ nhà kiểm tra quy định nuôi vật nuôi của Ban
                quản lý tòa nhà.
              </p>
            </div>
            <Switch
              data-testid="pets-switch"
              checked={values.hasPets}
              onCheckedChange={checked => onChange({ hasPets: checked })}
            />
          </div>

          {values.hasPets ? (
            <div className="mt-4 rounded-xl border border-warning/30 bg-warning-soft/30 p-3.5 text-xs text-warning">
              <div className="flex items-start gap-2">
                <AlertCircle
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-warning"
                />
                <p className="leading-relaxed">
                  <strong>Nội quy thú cưng chung cư:</strong> Cần tiêm chủng
                  ngừa dại định kỳ theo quy định thú y, sử dụng rọ mõm / dây
                  xích khi di chuyển qua thang máy, và đảm bảo không gây tiếng
                  ồn ảnh hưởng tới các hộ xung quanh sau 22:00.
                </p>
              </div>
            </div>
          ) : null}
        </div>

        {/* 5. Ghi chú bổ sung với gợi ý nhanh */}
        <div className="space-y-3 rounded-2xl border border-border bg-surface p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <label
              htmlFor="notes-input"
              className="flex items-center gap-2 text-sm font-semibold text-fg"
            >
              <FileEdit aria-hidden="true" className="h-4 w-4 text-primary" />
              <span>Ghi chú & Thỏa thuận riêng (Tùy chọn)</span>
            </label>
            <span className="text-[11px] text-subtle">
              {(values.notes || '').length}/1000 ký tự
            </span>
          </div>

          <textarea
            id="notes-input"
            ref={notesInputRef}
            rows={3}
            maxLength={1000}
            placeholder="Nêu mong muốn về thiết bị, giờ giấc bàn giao hoặc yêu cầu riêng cho chủ nhà..."
            value={values.notes || ''}
            onChange={e => {
              onChange({ notes: e.target.value })
              if (errors.notes) {
                setErrors(prev => ({ ...prev, notes: '' }))
              }
            }}
            className={`w-full rounded-xl border bg-surface p-3.5 text-sm text-fg shadow-sm outline-none transition focus:ring-2 focus:ring-primary/20 ${
              errors.notes
                ? 'border-danger focus:border-danger'
                : 'border-border focus:border-primary'
            }`}
          />
          {errors.notes ? (
            <p role="alert" className="text-xs text-danger">
              {errors.notes}
            </p>
          ) : null}

          {/* Quick Note Suggestions */}
          <div className="space-y-1.5">
            <span className="flex items-center gap-1 text-[11px] font-medium text-subtle">
              <Sparkles aria-hidden="true" className="h-3 w-3 text-accent" />
              Bấm để thêm ghi chú nhanh:
            </span>
            <div className="flex flex-wrap gap-1.5">
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
                  className="rounded-lg border border-border bg-surface-muted/50 px-2.5 py-1 text-xs text-muted hover:border-primary/50 hover:text-fg transition"
                >
                  + {sugg}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation action */}
      <div className="flex items-center justify-between border-t border-border/80 pt-5">
        <div className="inline-flex items-center gap-2 text-xs text-muted">
          <CheckCircle2 aria-hidden="true" className="h-4 w-4 text-success" />
          <span>
            Thông tin được bảo mật & chỉ gửi tới chủ nhà được xác thực.
          </span>
        </div>

        <Button
          type="submit"
          className="flex items-center gap-2 bg-control px-6 py-2.5 text-sm font-semibold text-on-control shadow-sm hover:opacity-90"
        >
          <span>Tiếp tục chọn gói thuê</span>
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Button>
      </div>
    </form>
  )
}
