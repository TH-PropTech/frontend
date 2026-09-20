'use client'

import * as React from 'react'
import { Calendar as CalendarIcon, Clock, Phone, User } from 'lucide-react'
import { format, parseISO, addDays } from 'date-fns'
import { vi } from 'date-fns/locale'
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
import { Textarea } from '@/shared/ui/textarea'
import { apiClient } from '@/shared/api/api-client'
import { toast } from 'sonner'

interface BookingWidgetProps {
  propertyId: string
}

export function BookingWidget({
  propertyId,
}: BookingWidgetProps): React.ReactElement {
  // Form states for booking/consultation
  const [formData, setFormData] = React.useState({
    fullName: '',
    phone: '',
    visitDate: '',
    visitTime: 'morning', // morning, afternoon, evening
    notes: '',
  })
  const [calendarOpen, setCalendarOpen] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  // Auto-fill tenant info from localStorage user object if available
  React.useEffect(() => {
    let timer: NodeJS.Timeout | undefined
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('user')
      if (stored) {
        try {
          const u = JSON.parse(stored)
          timer = setTimeout(() => {
            setFormData(prev => ({
              ...prev,
              fullName: u.name || '',
              phone: u.phone || '',
            }))
          }, 0)
        } catch (e) {
          console.error(e)
        }
      }
    }
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleQuickDate = (offsetDays: number) => {
    const target = addDays(new Date(), offsetDays)
    setFormData(prev => ({
      ...prev,
      visitDate: format(target, 'yyyy-MM-dd'),
    }))
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      toast.error('Vui lòng điền đầy đủ Họ tên và Số điện thoại')
      return
    }
    if (!formData.visitDate) {
      toast.error('Vui lòng chọn ngày xem phòng')
      return
    }

    setIsSubmitting(true)
    try {
      // Map visitTime to exact time segment
      const timeMap: Record<string, string> = {
        morning: '09:00',
        afternoon: '14:00',
        evening: '19:00',
      }
      const timeStr = timeMap[formData.visitTime] || '14:00'
      const visitAt = `${formData.visitDate}T${timeStr}:00`

      await apiClient.post('/bookings', {
        apartmentId: propertyId,
        visitAt: new Date(visitAt).toISOString(),
        method: 'onsite',
        note: formData.notes || '',
        tenantName: formData.fullName.trim(),
        tenantPhone: formData.phone.trim(),
      })

      toast.success('Đăng ký xem phòng thành công!', {
        description:
          'Yêu cầu đặt lịch của bạn đã được ghi nhận. Chủ nhà sẽ nhận được thông báo ngay lập tức và xác nhận lịch hẹn với bạn.',
      })
      // Reset form (keeping full name and phone)
      setFormData(prev => ({
        ...prev,
        visitDate: '',
        visitTime: 'morning',
        notes: '',
      }))
    } catch (err) {
      console.error('Booking failed:', err)
      const message =
        err instanceof Error
          ? err.message
          : 'Không thể đăng ký lịch hẹn. Vui lòng thử lại!'
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formattedDateDisplay = formData.visitDate
    ? format(parseISO(formData.visitDate), 'EEEE, dd/MM/yyyy', { locale: vi })
    : 'Chọn ngày xem phòng'

  return (
    <div className="rounded-3xl border border-border bg-surface p-4 shadow-md">
      <h3 className="font-marketing text-base font-bold text-fg mb-1">
        Lên lịch xem căn hộ
      </h3>
      <p className="text-xs text-muted leading-relaxed mb-4">
        Để lại thông tin, chuyên viên tư vấn sẽ chuẩn bị khóa phòng và dẫn bạn
        xem trực tiếp trong vòng 15 phút.
      </p>

      <form onSubmit={handleFormSubmit} className="space-y-3.5 text-left">
        <div>
          <Label
            htmlFor="fullName"
            className="text-[10px] uppercase font-bold text-muted tracking-wider block mb-1"
          >
            Họ và tên *
          </Label>
          <Input
            id="fullName"
            type="text"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Ví dụ: Nguyễn Văn A"
            icon={<User className="h-3.5 w-3.5" />}
            className="w-full h-10 px-3.5 py-2 text-xs font-semibold rounded-xl border border-border bg-surface-muted/50 focus:border-primary focus:ring-2 focus:ring-primary-soft"
          />
        </div>

        <div>
          <Label
            htmlFor="phone"
            className="text-[10px] uppercase font-bold text-muted tracking-wider block mb-1"
          >
            Số điện thoại *
          </Label>
          <Input
            id="phone"
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Ví dụ: 0901234567"
            icon={<Phone className="h-3.5 w-3.5" />}
            className="w-full h-10 px-3.5 py-2 text-xs font-semibold rounded-xl border border-border bg-surface-muted/50 focus:border-primary focus:ring-2 focus:ring-primary-soft"
          />
        </div>

        <div>
          <Label
            htmlFor="visit-date-trigger"
            className="text-[10px] uppercase font-bold text-muted tracking-wider block mb-1"
          >
            Ngày xem phòng *
          </Label>
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                id="visit-date-trigger"
                type="button"
                variant="outline"
                className={`h-10 w-full justify-start rounded-xl border border-border bg-surface-muted/50 px-3.5 text-left text-xs font-semibold shadow-none hover:bg-surface-muted focus:border-primary focus:ring-2 focus:ring-primary-soft ${
                  formData.visitDate ? 'text-fg' : 'text-subtle'
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
                selected={
                  formData.visitDate ? parseISO(formData.visitDate) : undefined
                }
                onSelect={date => {
                  if (date) {
                    setFormData(prev => ({
                      ...prev,
                      visitDate: format(date, 'yyyy-MM-dd'),
                    }))
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

          {/* Quick date chips */}
          <div className="flex flex-wrap items-center gap-1 pt-1.5">
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
              onClick={() => handleQuickDate(1)}
              className="rounded-md border border-border bg-surface-muted/60 px-2 py-0.5 text-[10px] font-medium text-fg hover:border-primary hover:text-primary transition"
            >
              Ngày mai
            </button>
            <button
              type="button"
              onClick={() => handleQuickDate(3)}
              className="rounded-md border border-border bg-surface-muted/60 px-2 py-0.5 text-[10px] font-medium text-fg hover:border-primary hover:text-primary transition"
            >
              Sau 3 ngày
            </button>
          </div>
        </div>

        <div>
          <Label
            htmlFor="visitTime-trigger"
            className="text-[10px] uppercase font-bold text-muted tracking-wider block mb-1"
          >
            Khung giờ
          </Label>
          <Select
            value={formData.visitTime}
            onValueChange={val =>
              setFormData(prev => ({ ...prev, visitTime: val }))
            }
          >
            <SelectTrigger
              id="visitTime-trigger"
              className="h-10 w-full rounded-xl border border-border bg-surface-muted/50 px-3.5 text-xs font-semibold text-fg focus:border-primary focus:ring-2 focus:ring-primary-soft cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Clock
                  aria-hidden="true"
                  className="h-3.5 w-3.5 text-primary"
                />
                <SelectValue placeholder="Chọn khung giờ" />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-xl border border-border bg-surface text-fg shadow-lg">
              <SelectItem
                value="morning"
                className="text-xs font-medium cursor-pointer"
              >
                Sáng (8:00 - 12:00)
              </SelectItem>
              <SelectItem
                value="afternoon"
                className="text-xs font-medium cursor-pointer"
              >
                Chiều (13:00 - 18:00)
              </SelectItem>
              <SelectItem
                value="evening"
                className="text-xs font-medium cursor-pointer"
              >
                Tối (18:00 - 21:00)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label
            htmlFor="notes"
            className="text-[10px] uppercase font-bold text-muted tracking-wider block mb-1"
          >
            Ghi chú yêu cầu
          </Label>
          <Textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            rows={2}
            maxLength={500}
            placeholder="Có thú cưng đi cùng, cần thang máy..."
            className="w-full min-h-[70px] px-3.5 py-2 text-xs font-semibold rounded-xl border border-border bg-surface-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-soft focus:border-primary resize-none"
          />
        </div>

        <Button
          type="submit"
          loading={isSubmitting}
          className="w-full rounded-xl py-3 text-xs font-bold shadow-md shadow-primary/10 mt-2"
        >
          Đăng ký lịch hẹn ngay
        </Button>
      </form>
    </div>
  )
}
