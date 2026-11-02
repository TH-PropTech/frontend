import * as React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import AdminLayout from '../layout'
import FabricAuditPage, { metadata } from './page'

const navigation = vi.hoisted(() => ({
  replace: vi.fn(),
  notFound: vi.fn(() => {
    throw new Error('NEXT_NOT_FOUND')
  }),
}))

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: navigation.replace }),
  usePathname: () => '/admin/fabric-audit',
  notFound: navigation.notFound,
}))
vi.mock('sonner', () => ({ toast: { error: vi.fn() } }))
vi.mock('@/widgets/staff-dashboard', () => ({
  StaffDashboard: () => <div data-testid="staff-dashboard" />,
}))

class Boundary extends React.Component<
  { children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false }
  static getDerivedStateFromError(): { failed: boolean } {
    return { failed: true }
  }
  render(): React.ReactNode {
    return this.state.failed ? <p>not-found</p> : this.props.children
  }
}

function renderRoute() {
  return render(
    <Boundary>
      <AdminLayout>
        <FabricAuditPage />
      </AdminLayout>
    </Boundary>
  )
}

beforeEach(() => {
  vi.clearAllMocks()
  localStorage.clear()
  vi.spyOn(console, 'error').mockImplementation(() => undefined)
})
afterEach(() => vi.restoreAllMocks())

describe('/admin/fabric-audit route', () => {
  it('is a thin page: it only declares metadata and renders no data itself', () => {
    expect(metadata.title).toBe('Trung tâm kiểm toán lưu vết')
    expect(FabricAuditPage()).toBeNull()
  })

  it.each([['admin'], ['staff']])('is reachable for %s', async role => {
    localStorage.setItem('user', JSON.stringify({ roles: [role] }))
    renderRoute()
    expect(await screen.findByTestId('staff-dashboard')).toBeInTheDocument()
    expect(navigation.notFound).not.toHaveBeenCalled()
  })

  it.each([['tenant'], ['landlord']])(
    'is not reachable for %s (not-found, nothing rendered)',
    async role => {
      localStorage.setItem('user', JSON.stringify({ roles: [role] }))
      renderRoute()
      expect(await screen.findByText('not-found')).toBeInTheDocument()
      expect(screen.queryByTestId('staff-dashboard')).not.toBeInTheDocument()
    }
  )

  it('redirects an anonymous visitor to login without rendering the dashboard', async () => {
    renderRoute()
    await waitFor(() =>
      expect(navigation.replace).toHaveBeenCalledWith('/login')
    )
    expect(screen.queryByTestId('staff-dashboard')).not.toBeInTheDocument()
  })
})
