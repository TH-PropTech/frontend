import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { HomeView } from './home-view'

describe('HomeView', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('renders neutral welcome greeting when no localStorage user is set', () => {
    render(<HomeView onNavigateTab={vi.fn()} />)
    expect(
      screen.getByText(/Chào mừng quay trở lại, bạn!/i)
    ).toBeInTheDocument()
    expect(screen.queryByText(/Culi Vận Hành/i)).not.toBeInTheDocument()
  })

  it('renders custom user name when available in localStorage', () => {
    localStorage.setItem('user', JSON.stringify({ name: 'Nguyễn Văn A' }))
    render(<HomeView onNavigateTab={vi.fn()} />)
    expect(
      screen.getByText(/Chào mừng quay trở lại, Nguyễn Văn A!/i)
    ).toBeInTheDocument()
  })

  it('does not render fake progress or fake server sync status', () => {
    render(<HomeView onNavigateTab={vi.fn()} />)
    expect(screen.queryByText(/14 \/ 20/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/Server status/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/Blockchain Sync/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/2 tin đang chờ/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/2 người dùng/i)).not.toBeInTheDocument()
  })

  it('triggers onNavigateTab when shortcut buttons are clicked', () => {
    const onNavigateTab = vi.fn()
    render(<HomeView onNavigateTab={onNavigateTab} />)

    fireEvent.click(
      screen.getByRole('button', { name: /Duyệt tin bất động sản/i })
    )
    expect(onNavigateTab).toHaveBeenCalledWith('properties')

    fireEvent.click(
      screen.getByRole('button', { name: /Xác minh danh tính \(KYC\)/i })
    )
    expect(onNavigateTab).toHaveBeenCalledWith('kyc')

    fireEvent.click(
      screen.getByRole('button', { name: /Duyệt bài viết cộng đồng/i })
    )
    expect(onNavigateTab).toHaveBeenCalledWith('community')
  })

  it('does not leak internal uppercase or snake_case enums', () => {
    const { container } = render(<HomeView onNavigateTab={vi.fn()} />)
    const text = container.textContent ?? ''
    expect(text).not.toMatch(/[A-Z]{3,}(_[A-Z0-9]+){2,}/)
  })
})
