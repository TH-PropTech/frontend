'use client'

import * as React from 'react'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Switch } from '@/shared/ui/switch'
import { UseProfileReturn } from '../model/use-profile'
import { toast } from 'sonner'
import { Fingerprint, CheckCircle2, Smartphone, Bell } from 'lucide-react'

interface TabSecurityProps {
  profile: UseProfileReturn
}

export function TabSecurity({ profile }: TabSecurityProps): React.ReactElement {
  const {
    hasPasskey,
    setHasPasskey,
    activeSessions,
    setActiveSessions,
    notifChannels,
    setNotifChannels,
  } = profile

  return (
    <div className="space-y-8 mt-0 outline-none">
      {/* Passkeys Configuration */}
      <Card className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex items-start gap-4 text-left">
          <div className="h-10 w-10 rounded-full bg-primary-soft flex items-center justify-center text-primary shrink-0">
            <Fingerprint className="h-5 w-5" />
          </div>
          <div className="space-y-1.5 flex-1">
            <h3 className="font-marketing text-base font-bold text-fg">
              Xác thực sinh trắc học (Passkeys / WebAuthn)
            </h3>
            <p className="text-xs text-muted leading-relaxed">
              Passkeys cho phép đăng nhập và xác thực giao dịch an toàn bằng dấu
              vân tay (Touch ID), khuôn mặt (Face ID) hoặc mã PIN thiết bị mà
              không cần mật khẩu.
            </p>
            {hasPasskey ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-success-soft text-success border border-success/15 rounded-lg text-xs font-bold mt-2">
                <CheckCircle2 className="h-4 w-4" />
                Đã đăng ký thiết bị hiện tại làm khóa Passkey bảo mật.
              </div>
            ) : (
              <Button
                onClick={() => {
                  setHasPasskey(true)
                  toast.success('Đăng ký khóa Passkey thành công!', {
                    description:
                      'Thiết bị hiện tại đã được liên kết thông qua cơ chế sinh trắc học WebAuthn.',
                  })
                }}
                className="h-9 text-xs rounded-full px-5 font-bold mt-2 cursor-pointer"
              >
                Thiết lập Passkey cho thiết bị này
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Active Sessions */}
      <Card className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <div className="space-y-1 text-left">
          <h3 className="font-marketing text-base font-bold text-fg flex items-center gap-2">
            <Smartphone className="h-4.5 w-4.5 text-primary" />
            Danh sách thiết bị & Phiên đăng nhập hoạt động
          </h3>
          <p className="text-xs text-muted">
            Các thiết bị đã kết nối và đăng nhập tài khoản của bạn. Bạn có thể
            đăng xuất từ xa nếu có nghi ngờ bảo mật.
          </p>
        </div>

        <div className="divide-y divide-border/60 border border-border rounded-2xl overflow-hidden bg-surface/20 text-left">
          {activeSessions.map(s => (
            <div
              key={s.id}
              className="flex justify-between items-center p-4 hover:bg-surface-muted/20 transition-all gap-4"
            >
              <div className="flex items-center gap-3">
                <Smartphone
                  className={`h-5 w-5 ${s.lastActive === 'Đang hoạt động' ? 'text-success' : 'text-subtle'}`}
                />
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-fg block">
                    {s.device}
                  </span>
                  <span className="text-[10px] text-muted block">
                    IP: {s.ip} • Địa điểm: {s.location}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-muted">
                  {s.lastActive}
                </span>
                {s.lastActive !== 'Đang hoạt động' && (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSessions(prev => prev.filter(x => x.id !== s.id))
                      toast.success('Đã thu hồi phiên đăng nhập!', {
                        description: `Thiết bị ${s.device} đã bị đăng xuất khỏi tài khoản.`,
                      })
                    }}
                    className="text-[10px] text-danger hover:underline font-bold cursor-pointer border-none bg-transparent"
                  >
                    Đăng xuất thiết bị
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Notification Config (using standard Switch components) */}
      <Card className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <div className="space-y-1 text-left">
          <h3 className="font-marketing text-base font-bold text-fg flex items-center gap-2">
            <Bell className="h-4.5 w-4.5 text-primary" />
            Quản lý nhận thông báo đa kênh (Notification Hub)
          </h3>
          <p className="text-xs text-muted">
            Cấu hình các kênh để tự động gửi thông báo biến động giao dịch ký
            quỹ, duyệt hợp đồng, hay sự cố thiết bị.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-left">
          <div className="border border-border rounded-2xl p-4 flex items-center justify-between bg-surface/30">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-fg block">
                Email thông báo
              </span>
              <span className="text-[10px] text-muted block">
                Gửi biên lai & hợp đồng
              </span>
            </div>
            <Switch
              checked={notifChannels.email}
              onCheckedChange={() =>
                setNotifChannels({
                  ...notifChannels,
                  email: !notifChannels.email,
                })
              }
            />
          </div>

          <div className="border border-border rounded-2xl p-4 flex items-center justify-between bg-surface/30">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-fg block">
                Tin nhắn SMS
              </span>
              <span className="text-[10px] text-muted block">
                Mã khóa phòng & OTP
              </span>
            </div>
            <Switch
              checked={notifChannels.sms}
              onCheckedChange={() =>
                setNotifChannels({ ...notifChannels, sms: !notifChannels.sms })
              }
            />
          </div>

          <div className="border border-border rounded-2xl p-4 flex items-center justify-between bg-surface/30">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-fg block">
                Telegram Bot
              </span>
              <span className="text-[10px] text-muted block">
                Thông báo nhanh tức thì
              </span>
            </div>
            <Switch
              checked={notifChannels.telegram}
              onCheckedChange={() =>
                setNotifChannels({
                  ...notifChannels,
                  telegram: !notifChannels.telegram,
                })
              }
            />
          </div>

          <div className="border border-border rounded-2xl p-4 flex items-center justify-between bg-surface/30">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-fg block">
                Zalo OA Message
              </span>
              <span className="text-[10px] text-muted block">
                Tra cứu hóa đơn thuê
              </span>
            </div>
            <Switch
              checked={notifChannels.zalo}
              onCheckedChange={() =>
                setNotifChannels({
                  ...notifChannels,
                  zalo: !notifChannels.zalo,
                })
              }
            />
          </div>

          <div className="border border-border rounded-2xl p-4 flex items-center justify-between bg-surface/30">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-fg block">
                Browser Push
              </span>
              <span className="text-[10px] text-muted block">
                Thông báo trực tiếp màn hình
              </span>
            </div>
            <Switch
              checked={notifChannels.push}
              onCheckedChange={() =>
                setNotifChannels({
                  ...notifChannels,
                  push: !notifChannels.push,
                })
              }
            />
          </div>
        </div>
      </Card>
    </div>
  )
}
