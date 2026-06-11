'use client'

import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import { usePathname } from 'next/navigation'
import { Logo } from '@/shared/ui/logo'
import { Button } from '@/shared/ui/button'
import { useFavorites } from '@/shared/lib/use-favorites'

export function HomeHeader(): React.ReactElement {
  const [isScrolled, setIsScrolled] = React.useState(false)
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

  const navItems = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Căn hộ', href: '/properties' },
    { name: 'Không gian 3D', href: '/vr' },
    { name: 'Quy trình', href: '/process' },
    { name: 'Liên hệ', href: '/contact' },
  ]

  const isLightHeader = pathname !== '/' || isScrolled

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isLightHeader
          ? 'border-b border-border bg-surface/80 py-3 shadow-sm backdrop-blur-md'
          : 'bg-gradient-to-b from-black/40 to-transparent py-5 text-white'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          className="transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <Logo size="md" variant={isLightHeader ? 'default' : 'white'} />
        </Link>

        <nav
          className="hidden items-center gap-8 text-sm font-semibold md:flex"
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

          <Link
            href={'/profile' as Route}
            className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all hover:scale-105 active:scale-95 relative ${
              isLightHeader
                ? 'border-border bg-white text-primary hover:bg-surface-muted'
                : 'border-white/25 bg-black/20 text-white hover:bg-black/40'
            }`}
            title="Ho so thue nha"
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
          </Link>

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
        </div>
      </div>
    </header>
  )
}
