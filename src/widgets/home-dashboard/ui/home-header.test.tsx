import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import * as React from 'react'
import { HomeHeader } from './home-header'

vi.mock('next/navigation', () => ({ usePathname: () => '/properties' }))
vi.mock('@/shared/lib/use-favorites', () => ({
  useFavorites: () => ({ favorites: [] }),
}))
vi.mock('@/features/auth/ui/auth-modals', () => ({
  WelcomeModal: () => null,
}))
vi.mock(
  '@/widgets/community-dashboard/ui/components/auth-required-modal',
  () => ({
    AuthRequiredModal: () => null,
  })
)
vi.mock('./components/notification-bell', () => ({
  NotificationBell: () => <div data-testid="bell" />,
}))
vi.mock('sonner', () => ({ toast: { success: vi.fn() } }))

// Class contract: jsdom không áp CSS; chỉ kiểm tra các class chống cắt/xuống dòng ở 390px.
describe('HomeHeader (mobile 390px class contract)', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('nút Đăng xuất không xuống dòng và không bị co lại', () => {
    localStorage.setItem('accessToken', 't')
    localStorage.setItem(
      'user',
      JSON.stringify({ name: 'Nguyễn Văn A', email: 'a@b.c' })
    )
    render(<HomeHeader />)
    const logout = screen.getByRole('button', { name: 'Đăng xuất' })
    expect(logout.className).toContain('whitespace-nowrap')
    expect(logout.className).toContain('shrink-0')
  })

  it('logo không bị co khi hàng điều hướng chật', () => {
    render(<HomeHeader />)
    const logoLink = screen.getAllByRole('link')[0]!
    expect(logoLink.className).toContain('shrink-0')
  })

  it('chưa đăng nhập thì không có nút Đăng xuất', () => {
    render(<HomeHeader />)
    expect(screen.queryByRole('button', { name: 'Đăng xuất' })).toBeNull()
  })
  it('khối avatar + Đăng xuất ẩn dưới sm để nút menu không bị đẩy ra ngoài màn hình', () => {
    localStorage.setItem('accessToken', 't')
    localStorage.setItem('user', JSON.stringify({ name: 'Nguyễn Văn A' }))
    render(<HomeHeader />)
    const logout = screen.getByRole('button', { name: 'Đăng xuất' })
    const group = logout.parentElement!
    expect(group.className).toContain('hidden')
    expect(group.className).toContain('sm:flex')
  })
})
