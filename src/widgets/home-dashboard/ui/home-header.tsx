'use client'

import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import { usePathname } from 'next/navigation'
import { Logo } from '@/shared/ui/logo'
import { Button } from '@/shared/ui/button'
import { useFavorites } from '@/shared/lib/use-favorites'
import { WelcomeModal } from '@/features/auth/ui/auth-modals'
import { AuthRequiredModal } from '@/widgets/community-dashboard/ui/components/auth-required-modal'
import { NotificationBell } from './components/notification-bell'
import { toast } from 'sonner'

interface UserStored {
  name: string
  email: string
  roles?: string[]
  kycStatus?: string
}

export function HomeHeader(): React.ReactElement {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [user, setUser] = React.useState<UserStored | null>(null)
  const [showWelcome, setShowWelcome] = React.useState(false)
  const [showAuthModal, setShowAuthModal] = React.useState(false)
  const pathname = usePathname()
  const { favorites } = useFavorites()

  React.useEffect(() => {
    const handleScroll = (): void => {
      if (window.scrollY > 40) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return (): void => window.removeEventListener('scroll', handleScroll)
  }, [])

  React.useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const token = localStorage.getItem('accessToken')
    if (storedUser && token) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(JSON.parse(storedUser))

        // Check if welcome modal needs to be shown
        const isNewUser = localStorage.getItem('showWelcomeModal')
        if (isNewUser === 'true') {
          setShowWelcome(true)
          localStorage.removeItem('showWelcomeModal')
        }
      } catch (e) {
        console.error(e)
      }
    }

    // Check if logout toast needs to be shown
    const showLogout = localStorage.getItem('showLogoutToast')
    if (showLogout === 'true') {
      toast.success('Đăng xuất tài khoản thành công!')
      localStorage.removeItem('showLogoutToast')
    }
  }, [])

  const navItems = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Căn hộ', href: '/properties' },
    { name: 'Cộng đồng', href: '/community' },
    { name: 'Cẩm nang', href: '/process' },
  ]

  const isLightHeader = pathname !== '/' || isScrolled

  const hasKycWarning = user && user.kycStatus !== 'verified'

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isLightHeader
          ? 'border-b border-border bg-surface/80 py-3 shadow-sm backdrop-blur-md'
          : 'bg-gradient-to-b from-black/40 to-transparent py-5 text-white'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          className="transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <Logo size="md" variant={isLightHeader ? 'default' : 'white'} />
        </Link>

        <nav
          className="hidden items-center gap-6 text-sm font-semibold lg:flex"
          aria-label="Điều hướng chính"
        >
          {navItems.map(item => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href as Route}
                className={`transition-all duration-200 relative py-1 ${
                  isActive
                    ? isLightHeader
                      ? 'text-primary font-bold border-b-2 border-primary'
                      : 'text-white font-bold border-b-2 border-white'
                    : isLightHeader
                      ? 'text-muted hover:text-primary'
                      : 'text-white/75 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <Link
              href={'/properties/favorites' as Route}
              className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all hover:scale-105 active:scale-95 relative ${
                isLightHeader
                  ? 'border-border bg-white text-primary hover:bg-surface-muted'
                  : 'border-white/25 bg-black/20 text-white hover:bg-black/40'
              }`}
              title="Danh sách yêu thích"
            >
              <svg
                className="h-5 w-5 fill-current"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
              {favorites.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-danger text-[10px] font-bold text-white shadow-sm animate-pulse-subtle">
                  {favorites.length}
                </span>
              )}
            </Link>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all hover:scale-105 active:scale-95 relative ${
                isLightHeader
                  ? 'border-border bg-white text-primary hover:bg-surface-muted'
                  : 'border-white/25 bg-black/20 text-white hover:bg-black/40'
              }`}
              title="Danh sách yêu thích"
            >
              <svg
                className="h-5 w-5 fill-current"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
            </button>
          )}

          {user && <NotificationBell isLightHeader={isLightHeader} />}

          {user ? (
            <div className="flex items-center gap-3">
              {user.roles?.includes('landlord') && pathname !== '/properties' && (
                <Link href={'/properties/new' as Route}>
                  <Button
                    className={`h-[44px] rounded-full px-5 py-2.5 text-sm font-bold shadow-sm transition-all hover:-translate-y-0.5 active:translate-y-0 ${
                      isLightHeader
                        ? 'bg-primary text-primary-foreground hover:bg-primary/95'
                        : 'bg-white text-primary hover:bg-white/95'
                    }`}
                  >
                    Đăng tin cho thuê
                  </Button>
                </Link>
              )}
              <Link
                href={'/profile' as Route}
                className={`flex items-center gap-2 text-sm font-bold ${
                  isLightHeader
                    ? 'text-fg hover:text-primary'
                    : 'text-white hover:text-white/85'
                }`}
                title="Hồ sơ thuê nhà"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all hover:scale-105 active:scale-95 relative ${
                    isLightHeader
                      ? 'border-border bg-white text-primary hover:bg-surface-muted'
                      : 'border-white/25 bg-black/20 text-white hover:bg-black/40'
                  }`}
                >
                  <svg
                    className="h-5 w-5 fill-none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                  {hasKycWarning && (
                    <span className="absolute right-0.5 top-0.5 flex h-2.5 w-2.5 rounded-full bg-danger ring-2 ring-white" />
                  )}
                </div>
                <span className="hidden md:inline-block">
                  Chào, {user.name ? user.name.trim().split(/\s+/).pop() : ''}
                </span>
              </Link>
              <Button
                onClick={() => {
                  localStorage.removeItem('accessToken')
                  localStorage.removeItem('user')
                  localStorage.setItem('showLogoutToast', 'true')
                  setUser(null)
                  window.location.href = '/'
                }}
                className={`h-[44px] rounded-full px-5 py-2.5 text-sm font-bold shadow-sm transition-all hover:-translate-y-0.5 active:translate-y-0 ${
                  isLightHeader
                    ? 'bg-surface-muted text-muted hover:bg-surface-muted/80'
                    : 'bg-white/10 text-white border border-white/15 hover:bg-white/20'
                }`}
              >
                Đăng xuất
              </Button>
            </div>
          ) : (
            <Link href={'/login' as Route}>
              <Button
                className={`h-[44px] rounded-full px-5 py-2.5 text-sm font-bold shadow-[0_12px_32px_rgba(43,33,30,0.15)] transition-all hover:-translate-y-0.5 active:translate-y-0 ${
                  isLightHeader
                    ? 'bg-control text-on-control hover:bg-primary-hover active:bg-primary-hover'
                    : 'bg-control text-on-control border border-white/15 hover:bg-primary-hover active:bg-primary-hover'
                }`}
              >
                Đăng nhập
              </Button>
            </Link>
          )}
        </div>
      </div>

      <WelcomeModal
        isOpen={showWelcome}
        onClose={() => setShowWelcome(false)}
      />

      <AuthRequiredModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        title="Yêu cầu đăng nhập"
        description={
          <>
            Vui lòng đăng nhập để xem danh sách căn hộ yêu thích.
            <br />
            <span className="text-xs text-subtle">
              Bạn có thể lưu tin, theo dõi biến động giá và đặt lịch xem nhà sau
              khi đăng nhập.
            </span>
          </>
        }
      />
    </header>
  )
}
