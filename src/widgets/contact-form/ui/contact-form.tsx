'use client'

import * as React from 'react'
import { HomeHeader } from '@/widgets/home-dashboard/ui/home-header'
import { Button } from '@/shared/ui/button'
import { Footer } from '@/shared/ui/footer'

export function ContactForm(): React.ReactElement {
  const [formName, setFormName] = React.useState('')
  const [formPhone, setFormPhone] = React.useState('')
  const [formInterest, setFormInterest] = React.useState('Căn hộ cao tầng')
  const [formBudget, setFormBudget] = React.useState('Cần tư vấn theo khu vực')
  const [formTime, setFormTime] = React.useState('Trong giờ hành chính')
  const [formMoveIn, setFormMoveIn] = React.useState('Chưa xác định')
  const [formMessage, setFormMessage] = React.useState('')
  const [formStatus, setFormStatus] = React.useState<{
    type: 'idle' | 'loading' | 'success' | 'error'
    message: string
  }>({ type: 'idle', message: '' })

  const handleConsultSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    setFormStatus({ type: 'loading', message: 'Đang gửi thông tin đăng ký...' })

    setTimeout(() => {
      setFormStatus({
        type: 'success',
        message: 'Đăng ký thành công! Tư vấn viên sẽ liên hệ bạn sớm nhất.',
      })
      // Clear inputs
      setFormName('')
      setFormPhone('')
      setFormMessage('')
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-bg text-fg selection:bg-primary/20 selection:text-primary">
      <HomeHeader />

      <main className="w-full text-left">
        {/* Header Hero Section (Warm Cream Design with Topography Overlay) */}
        <section className="relative flex flex-col items-center justify-center bg-gradient-to-b from-[#f5ece2] via-[#faf6f1] to-bg pb-24 pt-32 text-center rounded-b-[40px] border-b border-border">
          {/* Topography SVG Background (extremely lightweight, vector-rendered) */}
          <div
            className="absolute inset-0 opacity-[0.08] pointer-events-none select-none overflow-hidden"
            style={{
              willChange: 'transform',
              transform: 'translate3d(0, 0, 0)',
              backfaceVisibility: 'hidden',
            }}
          >
            <svg
              className="w-full h-full min-w-[1440px] min-h-[300px]"
              viewBox="0 0 1440 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M-100 80 C 300 10, 600 150, 1000 60 C 1200 30, 1500 100, 1600 80"
                stroke="currentColor"
                className="text-primary"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M-100 110 C 300 40, 600 180, 1000 90 C 1200 60, 1500 130, 1600 110"
                stroke="currentColor"
                className="text-primary"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M-100 140 C 300 70, 600 210, 1000 120 C 1200 90, 1500 160, 1600 140"
                stroke="currentColor"
                className="text-primary"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M-100 170 C 300 100, 600 240, 1000 150 C 1200 120, 1500 190, 1600 170"
                stroke="currentColor"
                className="text-primary"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M-100 200 C 300 130, 600 270, 1000 180 C 1200 150, 1500 220, 1600 200"
                stroke="currentColor"
                className="text-primary"
                strokeWidth="1.5"
                fill="none"
              />

              <path
                d="M 100 250 C 400 150, 700 290, 1100 210 C 1300 180, 1500 250, 1600 230"
                stroke="currentColor"
                className="text-primary"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M 100 280 C 400 180, 700 320, 1100 240 C 1300 210, 1500 280, 1600 260"
                stroke="currentColor"
                className="text-primary"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </div>

          <div className="absolute -left-32 -top-32 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="mx-auto w-full max-w-6xl px-6 md:px-10 z-10 relative">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary mb-2 block">
              ĐĂNG KÝ TƯ VẤN
            </span>
            <h1 className="font-marketing text-3xl font-bold leading-tight sm:text-4xl text-fg">
              Liên hệ với TH-PropTech
            </h1>
            <p className="mx-auto mt-2 max-w-xl font-body text-sm text-muted">
              Để lại nhu cầu của bạn, đội ngũ chuyên viên của chúng tôi sẽ liên
              hệ tư vấn lộ trình thuê nhà tối ưu nhất.
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="mx-auto max-w-6xl px-6 py-16 md:px-10">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.2fr] items-start">
            {/* Form text */}
            <div className="space-y-6">
              <h2 className="font-marketing text-2xl font-bold text-fg sm:text-3xl">
                Hỗ trợ trực tiếp từ chuyên viên
              </h2>
              <p className="font-body text-sm text-muted leading-relaxed">
                Chúng tôi cam kết mang lại quy trình minh bạch từ khâu tư vấn,
                đặt lịch xem nhà cho đến ký kết hợp đồng điện tử và lưu trữ
                blockchain.
              </p>
              <ul className="space-y-4 pt-2 text-xs font-semibold text-muted">
                <li className="flex items-center gap-3">
                  <svg
                    className="h-5 w-5 text-accent shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  Thông tin liên hệ của bạn được cam kết bảo mật tuyệt đối.
                </li>
                <li className="flex items-center gap-3">
                  <svg
                    className="h-5 w-5 text-accent shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  Xác thực số điện thoại ngay lúc tạo nhu cầu trên hệ thống.
                </li>
                <li className="flex items-center gap-3">
                  <svg
                    className="h-5 w-5 text-accent shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  Tư vấn viên liên hệ đúng khung giờ bạn đã chọn đăng ký.
                </li>
              </ul>
            </div>

            {/* Consultation Form Panel */}
            <form
              onSubmit={handleConsultSubmit}
              className="rounded-3xl border border-border bg-white p-6 shadow-md md:p-8 space-y-5"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label
                    htmlFor="name"
                    className="text-xs font-bold text-fg uppercase tracking-wider"
                  >
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Nguyễn Minh Anh"
                    value={formName}
                    onChange={e => setFormName(e.target.value)}
                    className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-primary"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="phone"
                    className="text-xs font-bold text-fg uppercase tracking-wider"
                  >
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="09xx xxx xxx"
                    value={formPhone}
                    onChange={e => setFormPhone(e.target.value)}
                    className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label
                    htmlFor="interest"
                    className="text-xs font-bold text-fg uppercase tracking-wider"
                  >
                    Căn hộ quan tâm
                  </label>
                  <select
                    id="interest"
                    value={formInterest}
                    onChange={e => setFormInterest(e.target.value)}
                    className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm font-bold focus:outline-none focus:border-primary cursor-pointer"
                  >
                    <option>Căn hộ cao tầng</option>
                    <option>Nhà phố thương mại</option>
                    <option>Đô thị nghỉ dưỡng</option>
                    <option>Cần tư vấn thêm</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="budget"
                    className="text-xs font-bold text-fg uppercase tracking-wider"
                  >
                    Ngân sách dự kiến
                  </label>
                  <select
                    id="budget"
                    value={formBudget}
                    onChange={e => setFormBudget(e.target.value)}
                    className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm font-bold focus:outline-none focus:border-primary cursor-pointer"
                  >
                    <option>Cần tư vấn theo khu vực</option>
                    <option>Dưới 10 triệu / tháng</option>
                    <option>10 đến 20 triệu / tháng</option>
                    <option>Trên 20 triệu / tháng</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label
                    htmlFor="time"
                    className="text-xs font-bold text-fg uppercase tracking-wider"
                  >
                    Thời điểm liên hệ
                  </label>
                  <select
                    id="time"
                    value={formTime}
                    onChange={e => setFormTime(e.target.value)}
                    className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm font-bold focus:outline-none focus:border-primary cursor-pointer"
                  >
                    <option>Trong giờ hành chính</option>
                    <option>Buổi tối</option>
                    <option>Cuối tuần</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="moveIn"
                    className="text-xs font-bold text-fg uppercase tracking-wider"
                  >
                    Thời điểm muốn thuê
                  </label>
                  <select
                    id="moveIn"
                    value={formMoveIn}
                    onChange={e => setFormMoveIn(e.target.value)}
                    className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm font-bold focus:outline-none focus:border-primary cursor-pointer"
                  >
                    <option>Chưa xác định</option>
                    <option>Trong 2 tuần</option>
                    <option>Trong 1 tháng</option>
                    <option>Trên 1 tháng</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="message"
                  className="text-xs font-bold text-fg uppercase tracking-wider"
                >
                  Ghi chú chi tiết thêm
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Ví dụ: Yêu cầu về tiện ích, tầng lầu, số lượng phòng ngủ..."
                  value={formMessage}
                  onChange={e => setFormMessage(e.target.value)}
                  className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-primary resize-none"
                />
              </div>

              {formStatus.type !== 'idle' && (
                <div
                  className={`rounded-xl border p-3.5 text-xs font-semibold ${
                    formStatus.type === 'success'
                      ? 'border-success/35 bg-success-soft text-success'
                      : formStatus.type === 'error'
                        ? 'border-danger/35 bg-danger-soft text-danger'
                        : 'border-primary/35 bg-primary-soft text-primary animate-pulse-subtle'
                  }`}
                >
                  {formStatus.message}
                </div>
              )}

              <Button
                type="submit"
                loading={formStatus.type === 'loading'}
                className="w-full rounded-xl py-3 font-bold shadow-md"
              >
                Gửi yêu cầu tư vấn
              </Button>
            </form>
          </div>
        </section>
      </main>

      {/* Page Footer */}
      <Footer />
    </div>
  )
}
