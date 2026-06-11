'use client'

import * as React from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import { usePathname } from 'next/navigation'
import { Logo } from '@/shared/ui/logo'
import { Button } from '@/shared/ui/button'

export function HomeHeader(): React.ReactElement {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const pathname = usePathname()

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
                      ? 'text-[#c65a3a] font-bold border-b-2 border-[#c65a3a]'
                      : 'text-white font-bold border-b-2 border-white'
                    : isLightHeader
                      ? 'text-muted hover:text-[#c65a3a]'
                      : 'text-white/75 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>

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
    </header>
  )
}
