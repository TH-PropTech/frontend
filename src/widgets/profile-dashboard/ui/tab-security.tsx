'use client'

import * as React from 'react'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Switch } from '@/shared/ui/switch'
import { UseProfileReturn } from '../model/use-profile'
import { toast } from 'sonner'
import {
  Fingerprint,
  CheckCircle2,
  Smartphone,
  Bell,
  ShieldCheck,
  Copy,
} from 'lucide-react'
import { apiClient } from '@/shared/api/api-client'

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

  const [is2faEnabled, setIs2faEnabled] = React.useState(false)
  const [isSettingUp, setIsSettingUp] = React.useState(false)
  const [setupStep, setSetupStep] = React.useState(1) // 1: QR, 2: OTP verify, 3: Backup codes
  const [otpCode, setOtpCode] = React.useState('')
  const [backupCodes, setBackupCodes] = React.useState<string[]>([])
  const [secret, setSecret] = React.useState('')
  const [otpauthUrl, setOtpauthUrl] = React.useState('')
  const [isLoadingSecret, setIsLoadingSecret] = React.useState(false)
  const [isVerifying, setIsVerifying] = React.useState(false)
  const [isDisabling, setIsDisabling] = React.useState(false)

  React.useEffect(() => {
    async function fetch2faStatus() {
      try {
        const userDetails = await apiClient.get<{ twoFactorEnabled: boolean }>(
          '/users/me'
        )
        if (userDetails) {
          setIs2faEnabled(userDetails.twoFactorEnabled)
          // Also sync with localStorage user info
          const stored = localStorage.getItem('user')
          if (stored) {
            const u = JSON.parse(stored)
            if (!u.twoFactor) u.twoFactor = {}
            u.twoFactor.enabled = userDetails.twoFactorEnabled
            localStorage.setItem('user', JSON.stringify(u))
          }
        }
      } catch (err) {
        console.error('Failed to fetch 2FA status:', err)
      }
    }
    fetch2faStatus()
  }, [])

  const handleStartSetup = async () => {
    setIsLoadingSecret(true)
    try {
      const response = await apiClient.post<{
        secret: string
        otpauthUrl: string
      }>('/two-factor/generate', {})
      setSecret(response.secret)
      setOtpauthUrl(response.otpauthUrl)
      setIsSettingUp(true)
      setSetupStep(1)
      setOtpCode('')
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Không thể tạo khóa bí mật 2FA'
      toast.error(message)
    } finally {
      setIsLoadingSecret(false)
    }
  }

  const handleVerifySetup = async () => {
    if (otpCode.length !== 6 || isNaN(Number(otpCode))) {
      toast.error('Vui lòng nhập mã OTP 6 chữ số hợp lệ')
      return
    }
    setIsVerifying(true)
    try {
      const response = await apiClient.post<{
        success: boolean
        message: string
        backupCodes?: string[]
      }>('/two-factor/enable', { token: otpCode })
      toast.success(response.message || 'Mã xác thực chính xác!')
      setBackupCodes(response.backupCodes || [])
      setSetupStep(3)
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Mã xác thực không chính xác'
      toast.error(message)
    } finally {
      setIsVerifying(false)
    }
  }

  const handleCompleteSetup = () => {
    setIs2faEnabled(true)
    localStorage.setItem('is2faEnabled', 'true')
    // Update local user object as well
    try {
      const stored = localStorage.getItem('user')
      if (stored) {
        const u = JSON.parse(stored)
        if (!u.twoFactor) u.twoFactor = {}
        u.twoFactor.enabled = true
        localStorage.setItem('user', JSON.stringify(u))
      }
    } catch (e) {
      console.error(e)
    }
    setIsSettingUp(false)
    toast.success('Kích hoạt xác thực 2 lớp (2FA) thành công!')
  }

  const handleDisable2fa = async () => {
    if (
      confirm(
        'Bạn có chắc chắn muốn tắt xác thực 2 lớp? Bảo mật tài khoản của bạn sẽ bị giảm xuống.'
      )
    ) {
      setIsDisabling(true)
      try {
        await apiClient.post('/two-factor/disable', {})
        setIs2faEnabled(false)
        localStorage.setItem('is2faEnabled', 'false')
        // Update local user object as well
        try {
          const stored = localStorage.getItem('user')
          if (stored) {
            const u = JSON.parse(stored)
            if (!u.twoFactor) u.twoFactor = {}
            u.twoFactor.enabled = false
            localStorage.setItem('user', JSON.stringify(u))
          }
        } catch (e) {
          console.error(e)
        }
        toast.success('Đã tắt xác thực 2 lớp thành công!')
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Không thể tắt 2FA'
        toast.error(message)
      } finally {
        setIsDisabling(false)
      }
    }
  }

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

      {/* Two-Factor Authentication (2FA) Configuration */}
      <Card className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex items-start gap-4 text-left">
          <div
            className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${is2faEnabled ? 'bg-success-soft text-success' : 'bg-primary-soft text-primary'}`}
          >
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="space-y-1.5 flex-1">
            <h3 className="font-marketing text-base font-bold text-fg">
              Xác thực 2 lớp (Two-Factor Authentication - 2FA)
            </h3>
            <p className="text-xs text-muted leading-relaxed">
              Bảo vệ tài khoản của bạn bằng cách yêu cầu mã bảo mật từ ứng dụng
              xác thực (như Google Authenticator hoặc Authy) ngoài mật khẩu khi
              đăng nhập.
            </p>

            {is2faEnabled ? (
              <div className="space-y-4 mt-3 text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-success-soft text-success border border-success/15 rounded-lg text-xs font-bold">
                  <CheckCircle2 className="h-4 w-4" />
                  Xác thực 2 lớp (TOTP) đang hoạt động trên tài khoản này.
                </div>
                <div className="flex flex-wrap gap-3 mt-2">
                  <Button
                    onClick={handleDisable2fa}
                    variant="outline"
                    loading={isDisabling}
                    className="h-9 text-xs rounded-full px-5 font-bold cursor-pointer border-danger/30 text-danger hover:bg-danger-soft hover:border-danger/40"
                  >
                    Tắt xác thực 2FA
                  </Button>
                </div>
              </div>
            ) : !isSettingUp ? (
              <div className="mt-3 text-left">
                <Button
                  onClick={handleStartSetup}
                  loading={isLoadingSecret}
                  className="h-9 text-xs rounded-full px-5 font-bold cursor-pointer"
                >
                  Kích hoạt 2FA
                </Button>
              </div>
            ) : (
              <div className="mt-4 border border-border/80 rounded-2xl p-5 bg-surface/10 space-y-5 text-left">
                {setupStep === 1 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-border/50 pb-2">
                      <span className="h-5 w-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                        1
                      </span>
                      <h4 className="text-xs font-bold text-fg">
                        Quét mã QR bằng ứng dụng Authenticator
                      </h4>
                    </div>
                    <p className="text-[11px] text-muted leading-relaxed">
                      Mở ứng dụng Google Authenticator, Authy hoặc ứng dụng TOTP
                      bất kỳ trên điện thoại của bạn, chọn quét mã QR dưới đây.
                    </p>
                    {isLoadingSecret ? (
                      <div className="flex justify-center p-8">
                        <span className="text-xs text-muted">
                          Đang tải mã QR...
                        </span>
                      </div>
                    ) : (
                      <>
                        {otpauthUrl && (
                          <div className="flex justify-center p-3 bg-white border border-border rounded-xl w-fit mx-auto">
                            <img
                              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(otpauthUrl)}`}
                              alt="2FA QR Code"
                              className="h-36 w-36"
                            />
                          </div>
                        )}
                        {secret && (
                          <div className="text-center space-y-1">
                            <span className="text-[10px] text-muted">
                              Hoặc nhập mã khóa bí mật thủ công:
                            </span>
                            <div className="flex items-center justify-center gap-2">
                              <code className="px-2.5 py-1 bg-surface border border-border rounded-lg text-xs font-mono font-bold text-primary select-all">
                                {secret}
                              </code>
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(secret)
                                  toast.success('Đã sao chép khóa bí mật')
                                }}
                                className="p-1 text-muted hover:text-primary transition-colors cursor-pointer border-none bg-transparent"
                                type="button"
                              >
                                <Copy className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                    <div className="flex justify-end pt-2">
                      <Button
                        onClick={() => setSetupStep(2)}
                        disabled={isLoadingSecret || !secret}
                        className="h-8 text-[11px] rounded-full px-4 font-bold cursor-pointer"
                      >
                        Tiếp tục
                      </Button>
                    </div>
                  </div>
                )}

                {setupStep === 2 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-border/50 pb-2">
                      <span className="h-5 w-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                        2
                      </span>
                      <h4 className="text-xs font-bold text-fg">
                        Nhập mã xác thực của bạn
                      </h4>
                    </div>
                    <p className="text-[11px] text-muted">
                      Nhập mã gồm 6 chữ số đang hiển thị trên ứng dụng xác thực
                      của bạn để xác nhận liên kết.
                    </p>
                    <div className="flex justify-center max-w-[200px] mx-auto">
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="000000"
                        value={otpCode}
                        onChange={e =>
                          setOtpCode(e.target.value.replace(/\D/g, ''))
                        }
                        className="w-full text-center px-4 py-2 border border-border rounded-xl text-lg font-mono tracking-[0.3em] font-bold focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-white text-fg"
                      />
                    </div>
                    <div className="flex justify-between pt-2">
                      <Button
                        variant="outline"
                        onClick={() => setSetupStep(1)}
                        className="h-8 text-[11px] rounded-full px-4 font-bold cursor-pointer"
                      >
                        Quay lại
                      </Button>
                      <Button
                        onClick={handleVerifySetup}
                        loading={isVerifying}
                        className="h-8 text-[11px] rounded-full px-4 font-bold cursor-pointer"
                      >
                        Xác minh
                      </Button>
                    </div>
                  </div>
                )}

                {setupStep === 3 && (
                  <div className="space-y-4 text-left">
                    <div className="flex items-center gap-2 border-b border-border/50 pb-2">
                      <span className="h-5 w-5 rounded-full bg-success text-white text-[10px] font-bold flex items-center justify-center">
                        ✓
                      </span>
                      <h4 className="text-xs font-bold text-fg">
                        Lưu trữ mã dự phòng bảo mật
                      </h4>
                    </div>
                    <p className="text-[11px] text-muted leading-relaxed">
                      Lưu trữ các mã dự phòng này ở nơi an sau. Mỗi mã chỉ có
                      thể sử dụng **một lần duy nhất** để đăng nhập nếu bạn bị
                      mất thiết bị Authenticator.
                    </p>
                    <div className="grid grid-cols-2 gap-2 p-3.5 bg-surface border border-border rounded-xl font-mono text-[11px] text-fg font-bold">
                      {backupCodes.map((code, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <span className="text-[9px] text-muted">
                            {idx + 1}.
                          </span>
                          <span>{code}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          navigator.clipboard.writeText(backupCodes.join('\n'))
                          toast.success('Đã sao chép danh sách mã dự phòng!')
                        }}
                        className="h-8 text-[11px] rounded-full px-4 font-bold flex-1 cursor-pointer"
                      >
                        Sao chép tất cả
                      </Button>
                      <Button
                        onClick={handleCompleteSetup}
                        className="h-8 text-[11px] rounded-full px-4 font-bold flex-1 cursor-pointer"
                      >
                        Hoàn thành thiết lập
                      </Button>
                    </div>
                  </div>
                )}
              </div>
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
