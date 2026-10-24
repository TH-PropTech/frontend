'use client'

import * as React from 'react'
import { Button } from '@/shared/ui/button'
import { toast } from 'sonner'
import { CheckCircle2, Mail } from 'lucide-react'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function NewsletterSection(): React.ReactElement {
  const [email, setEmail] = React.useState('')
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSubscribed, setIsSubscribed] = React.useState(false)

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    const trimmed = email.trim()

    if (!trimmed) {
      toast.error('Vui lòng nhập địa chỉ email của bạn')
      return
    }

    if (!EMAIL_REGEX.test(trimmed)) {
      toast.error('Địa chỉ email không đúng định dạng (ví dụ: ban@example.com)')
      return
    }

    setIsSubmitting(true)

    // Simulate async submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubscribed(true)
      setEmail('')
      toast.success(
        'Đăng ký nhận tin thành công! Bạn sẽ nhận được các thông tin căn hộ mới nhất.'
      )
    }, 600)
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:px-10">
      <div className="rounded-3xl border border-border bg-gradient-to-br from-primary-soft/40 via-white to-accent-soft/30 p-8 md:p-12">
        <div className="mx-auto max-w-2xl text-center space-y-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm border border-border/60">
            {isSubscribed ? (
              <CheckCircle2 className="h-7 w-7 text-emerald-600" />
            ) : (
              <Mail className="h-7 w-7 text-primary" />
            )}
          </div>
          <h2 className="font-marketing text-2xl font-bold text-fg sm:text-3xl">
            {isSubscribed
              ? 'Cảm ơn bạn đã đăng ký!'
              : 'Nhận tin tức & Ưu đãi mới nhất'}
          </h2>
          <p className="font-body text-sm text-muted">
            {isSubscribed
              ? 'Chúng tôi sẽ gửi các bản tin cập nhật căn hộ mới nhất và chia sẻ cẩm nang thuê nhà hữu ích đến hòm thư của bạn.'
              : 'Đăng ký để nhận thông tin căn hộ mới, bài viết hữu ích và các chương trình ưu đãi độc quyền từ TH-PropTech.'}
          </p>
          {!isSubscribed ? (
            <form
              onSubmit={handleSubmit}
              className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Nhập email của bạn..."
                disabled={isSubmitting}
                className="flex-1 rounded-full border border-border bg-white px-5 py-3 font-body text-sm text-fg placeholder:text-muted/50 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-60"
              />
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                className="rounded-full bg-primary hover:bg-primary-hover text-white font-bold px-8 shrink-0 active:scale-95 transition-transform"
              >
                {isSubmitting ? 'Đang gửi...' : 'Đăng ký'}
              </Button>
            </form>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Email đã được thêm vào danh sách thông báo</span>
            </div>
          )}
          <p className="font-body text-[10px] text-muted">
            Chúng tôi tôn trọng quyền riêng tư của bạn. Bạn có thể hủy đăng ký
            bất kỳ lúc nào.
          </p>
        </div>
      </div>
    </section>
  )
}
