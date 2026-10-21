import * as React from 'react'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { apiClient } from '@/shared/api'
import { appToast } from '@/shared/ui/app-toast'
import { ConsoleDashboard } from './console-dashboard'
import {
  NAV_ITEMS,
  resolveConsoleTab,
  visibleNavItems,
} from '../model/nav-registry'

const navigation = vi.hoisted(() => ({
  pathname: '/admin/fabric-audit',
  push: vi.fn(),
  replace: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  usePathname: () => navigation.pathname,
  useRouter: () => ({ push: navigation.push, replace: navigation.replace }),
}))
vi.mock('next/link', () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode
    href: string
  }) => <a href={href}>{children}</a>,
}))
vi.mock('@/shared/ui/logo', () => ({ Logo: () => <span>logo</span> }))
vi.mock('@/shared/ui/app-toast', () => ({
  appToast: { success: vi.fn(), error: vi.fn(), info: vi.fn() },
}))
vi.mock('@/shared/api', () => ({
  apiClient: { get: vi.fn(), put: vi.fn() },
}))
vi.mock('@/features/fabric-audit', () => ({
  FabricAuditCenter: () => <div data-testid="fabric-audit-center" />,
}))
vi.mock('@/features/property-ownership-transfer', () => ({
  OwnershipTransferPanel: () => null,
}))
vi.mock('@/features/contract-layouts', () => ({
  LayoutProfileEditor: () => null,
}))
vi.mock('@/features/platform-fees', () => ({
  FeeRevenueReport: () => null,
  FeeScheduleEditor: () => null,
}))
vi.mock('@/features/rental-transactions', () => ({
  StuckTransactionsView: () => null,
}))
vi.mock('@/features/admin-wallets', () => ({ AdminWalletsView: () => null }))
vi.mock('@/features/payment-history', () => ({
  PaymentHistoryView: () => null,
}))
vi.mock('@/features/design-requests', () => ({
  StaffDesignRequestsView: () => <div data-testid="design-requests-view" />,
}))
vi.mock('./views/overview-view', () => ({
  OverviewView: () => <div data-testid="overview-view" />,
}))
vi.mock('./views/permission-matrix-view', () => ({
  PermissionMatrixView: () => null,
}))
vi.mock('./views/policies-view', () => ({ PoliciesView: () => null }))
vi.mock('./views/rental-flow-control-view', () => ({
  RentalFlowControlView: () => null,
}))
vi.mock('./views/ai-config-view', () => ({ AiConfigView: () => null }))
vi.mock('./views/apartment-designs-view', () => ({
  ApartmentDesignsView: () => null,
}))
vi.mock('./views/legal-knowledge-view', () => ({
  LegalKnowledgeView: () => null,
}))
vi.mock('./views/home-view', () => ({ HomeView: () => null }))
vi.mock('./views/property-approvals-view', () => ({
  PropertyApprovalsView: () => null,
}))
vi.mock('./views/kyc-approvals-view', () => ({ KycApprovalsView: () => null }))
vi.mock('./views/schedules-view', () => ({ SchedulesView: () => null }))
vi.mock('./views/community-view', () => ({ CommunityView: () => null }))
vi.mock('./views/safety-reports-view', () => ({
  SafetyReportsView: () => null,
}))
vi.mock('./views/support-queue-view', () => ({ SupportQueueView: () => null }))
vi.mock('./views/apartment-management-view', () => ({
  ApartmentManagementView: () => null,
}))

const ADMIN = { name: 'Admin', email: 'admin@example.test', roles: ['admin'] }
const STAFF = { name: 'Staff', email: 'staff@example.test', roles: ['staff'] }

function config(hiddenForStaff: string[] = []) {
  return { hiddenForStaff, updatedAt: null, updatedBy: null }
}

function renderConsole(user: typeof ADMIN) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  const session = userEvent.setup()
  render(
    <QueryClientProvider client={client}>
      <ConsoleDashboard initialUser={user} />
    </QueryClientProvider>
  )
  return session
}

const nav = (): HTMLElement =>
  screen.getByRole('navigation', { name: 'Menu chính' })

function mockApi(
  opts: { hidden?: string[]; denied?: string[]; permissionsFail?: boolean } = {}
): void {
  vi.mocked(apiClient.get).mockImplementation(((path: string) => {
    if (path === '/admin/nav-config') {
      return Promise.resolve(config(opts.hidden ?? []))
    }
    if (path === '/rbac/me/permissions') {
      if (opts.permissionsFail) return Promise.reject(new Error('down'))
      const permissions: Record<string, boolean> = {}
      for (const key of opts.denied ?? []) permissions[key] = false
      return Promise.resolve({ isAdmin: false, permissions })
    }
    return Promise.reject(new Error('unexpected ' + path))
  }) as never)
}

beforeEach(() => {
  vi.clearAllMocks()
  navigation.pathname = '/admin/fabric-audit'
  mockApi()
})

describe('nav registry', () => {
  it('admin sees every item, in both groups', () => {
    const ids = visibleNavItems(true, ['community']).map(i => i.id)
    expect(ids).toHaveLength(NAV_ITEMS.length)
    expect(ids).toContain('permissions')
    expect(ids).toContain('community')
  })

  it('staff sees only operations items that are not hidden', () => {
    const ids = visibleNavItems(false, ['community', 'kyc']).map(i => i.id)
    expect(ids).toContain('fabric-audit')
    expect(ids).toContain('design-requests')
    expect(ids).not.toContain('community')
    expect(ids).not.toContain('kyc')
    expect(ids).not.toContain('permissions')
    expect(ids).not.toContain('fees')
  })

  it('resolves the section, falling back to overview then the first item', () => {
    const staffItems = visibleNavItems(false, [])
    expect(resolveConsoleTab('/admin/fabric-audit', staffItems)).toBe(
      'fabric-audit'
    )
    expect(resolveConsoleTab('/admin/fees', staffItems)).toBe('overview')
    expect(resolveConsoleTab('/admin/unknown', staffItems)).toBe('overview')
    const noOverview = visibleNavItems(false, ['overview'])
    expect(resolveConsoleTab('/admin/unknown', noOverview)).toBe(
      noOverview[0]?.id
    )
    expect(resolveConsoleTab('/admin/x', [])).toBeNull()
  })

  it('design requests is a staff section but permissions is admin only', () => {
    expect(
      resolveConsoleTab('/admin/design-requests', visibleNavItems(false, []))
    ).toBe('design-requests')
    expect(
      resolveConsoleTab('/admin/permissions', visibleNavItems(false, []))
    ).toBe('overview')
  })
})

describe('staff view', () => {
  it('lists only the operations items and no admin controls', async () => {
    renderConsole(STAFF)
    const menu = within(nav())
    expect(
      await menu.findByRole('button', { name: 'Fabric Audit Center' })
    ).toBeVisible()
    expect(
      menu.getByRole('button', { name: 'Yêu cầu thiết kế 3D' })
    ).toBeVisible()
    expect(
      menu.queryByRole('button', { name: 'Ma trận Phân quyền' })
    ).toBeNull()
    expect(
      menu.queryByRole('button', { name: 'Biểu phí & doanh thu' })
    ).toBeNull()
    expect(screen.queryByText('Quản trị hệ thống')).toBeNull()
    expect(
      screen.queryByRole('button', { name: /Tuỳ chỉnh menu nhân viên/ })
    ).toBeNull()
    expect(screen.getByText('Role: Nhân viên vận hành')).toBeVisible()
  })

  it('hides the items the admin turned off', async () => {
    mockApi({ hidden: ['community'] })
    renderConsole(STAFF)
    const menu = within(nav())
    await menu.findByRole('button', { name: 'Fabric Audit Center' })
    expect(
      menu.queryByRole('button', { name: 'Duyệt bài cộng đồng' })
    ).toBeNull()
  })

  it('does not flash the hidden items while the config is loading', () => {
    vi.mocked(apiClient.get).mockReturnValue(new Promise(() => {}) as never)
    renderConsole(STAFF)
    expect(screen.getByText('Đang tải menu...')).toBeVisible()
    expect(
      within(nav()).queryByRole('button', { name: 'Fabric Audit Center' })
    ).toBeNull()
  })

  it('shows every operations item when the config cannot be loaded', async () => {
    vi.mocked(apiClient.get).mockRejectedValue(new Error('down') as never)
    renderConsole(STAFF)
    expect(
      await within(nav()).findByRole('button', { name: 'Duyệt bài cộng đồng' })
    ).toBeVisible()
  })

  it('falls back to overview when the route is hidden or admin-only', async () => {
    mockApi({ hidden: ['community'] })
    navigation.pathname = '/admin/community'
    renderConsole(STAFF)
    expect(await screen.findByTestId('overview-view')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 1, name: 'Tổng quan' })
    ).toBeVisible()
  })

  it('shows an empty state when nothing is enabled', async () => {
    mockApi({
      hidden: NAV_ITEMS.filter(i => i.audience === 'staff').map(i => i.id),
    })
    renderConsole(STAFF)
    expect(
      await screen.findByText('Chưa có mục nào được bật cho tài khoản này')
    ).toBeVisible()
  })

  it('hides menu items the admin took the read permission away from', async () => {
    mockApi({ denied: ['read:Kyc', 'read:CommunityPost'] })
    renderConsole(STAFF)
    const menu = within(nav())
    await menu.findByRole('button', { name: 'Fabric Audit Center' })
    expect(
      menu.queryByRole('button', { name: 'Xác minh định danh (KYC)' })
    ).toBeNull()
    expect(
      menu.queryByRole('button', { name: 'Duyệt bài cộng đồng' })
    ).toBeNull()
    expect(menu.getByRole('button', { name: 'Lịch hẹn xem nhà' })).toBeVisible()
  })

  it('still lists everything when the permissions cannot be loaded (backend still blocks)', async () => {
    mockApi({ permissionsFail: true })
    renderConsole(STAFF)
    expect(
      await within(nav()).findByRole('button', {
        name: 'Xác minh định danh (KYC)',
      })
    ).toBeVisible()
  })

  it('does not wait for or hide anything by permission for admin', async () => {
    mockApi({ denied: ['read:Kyc'] })
    renderConsole(ADMIN)
    expect(
      within(nav()).getByRole('button', { name: 'Xác minh định danh (KYC)' })
    ).toBeVisible()
  })

  it('opens the design requests section', async () => {
    navigation.pathname = '/admin/design-requests'
    renderConsole(STAFF)
    expect(
      await screen.findByTestId('design-requests-view')
    ).toBeInTheDocument()
  })
})

describe('staff routes', () => {
  it('moves staff from /admin/<section> to /staff/<section>', async () => {
    navigation.pathname = '/admin/community'
    renderConsole(STAFF)
    await waitFor(() =>
      expect(navigation.replace).toHaveBeenCalledWith('/staff/community')
    )
  })

  it('leaves non-section admin routes such as contracts alone', async () => {
    navigation.pathname = '/admin/contracts'
    renderConsole(STAFF)
    await within(nav()).findByRole('button', { name: 'Fabric Audit Center' })
    expect(navigation.replace).not.toHaveBeenCalled()
  })

  it('keeps navigation inside /staff for staff', async () => {
    navigation.pathname = '/staff/overview'
    const session = renderConsole(STAFF)
    await session.click(
      await within(nav()).findByRole('button', { name: 'Fabric Audit Center' })
    )
    expect(navigation.push).toHaveBeenCalledWith('/staff/fabric-audit')
    expect(navigation.replace).not.toHaveBeenCalled()
  })

  it('does not redirect admin away from /admin', async () => {
    navigation.pathname = '/admin/overview'
    renderConsole(ADMIN)
    await within(nav()).findByRole('button', { name: 'Fabric Audit Center' })
    expect(navigation.replace).not.toHaveBeenCalled()
  })
})

describe('admin view', () => {
  it('sees both groups and every staff item regardless of the hidden list', async () => {
    mockApi({ hidden: ['community'] })
    renderConsole(ADMIN)
    const menu = within(nav())
    expect(screen.getByText('Vận hành')).toBeVisible()
    expect(screen.getByText('Quản trị hệ thống')).toBeVisible()
    expect(
      menu.getByRole('button', { name: 'Duyệt bài cộng đồng' })
    ).toBeVisible()
    expect(
      menu.getByRole('button', { name: 'Ma trận Phân quyền' })
    ).toBeVisible()
    expect(screen.getByText('Role: Quản trị viên')).toBeVisible()
  })

  it('navigates to the chosen section', async () => {
    navigation.pathname = '/admin/overview'
    const session = renderConsole(ADMIN)
    await session.click(
      within(nav()).getByRole('button', { name: 'Fabric Audit Center' })
    )
    expect(navigation.push).toHaveBeenCalledWith('/admin/fabric-audit')
  })

  it('renders the active section and its title', () => {
    renderConsole(ADMIN)
    expect(screen.getByTestId('fabric-audit-center')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 1, name: 'Fabric Audit Center' })
    ).toBeInTheDocument()
  })

  it('does not render other sections', () => {
    navigation.pathname = '/admin/overview'
    renderConsole(ADMIN)
    expect(screen.queryByTestId('fabric-audit-center')).not.toBeInTheDocument()
  })

  it('saves the items hidden from staff', async () => {
    vi.mocked(apiClient.put).mockResolvedValue(config(['community']))
    const session = renderConsole(ADMIN)
    await session.click(
      screen.getByRole('button', { name: /Tuỳ chỉnh menu nhân viên/ })
    )
    const dialog = await screen.findByRole('dialog')
    const save = await within(dialog).findByRole('button', { name: 'Lưu' })
    expect(save).toBeDisabled()
    await session.click(
      within(dialog).getByRole('switch', {
        name: 'Ẩn "Duyệt bài cộng đồng" với nhân viên',
      })
    )
    expect(save).toBeEnabled()
    await session.click(save)
    await waitFor(() =>
      expect(apiClient.put).toHaveBeenCalledWith('/admin/nav-config', {
        hiddenForStaff: ['community'],
      })
    )
    expect(appToast.success).toHaveBeenCalled()
  })

  it('refuses to hide every item from staff', async () => {
    const session = renderConsole(ADMIN)
    await session.click(
      screen.getByRole('button', { name: /Tuỳ chỉnh menu nhân viên/ })
    )
    const dialog = await screen.findByRole('dialog')
    await within(dialog).findByRole('button', { name: 'Lưu' })
    const switches = within(dialog).getAllByRole('switch')
    for (const toggle of switches) await session.click(toggle)
    expect(within(dialog).getByRole('button', { name: 'Lưu' })).toBeDisabled()
    expect(within(dialog).getByRole('alert')).toHaveTextContent(
      'ít nhất một mục'
    )
  })

  it('reports a failed save and keeps the dialog open', async () => {
    vi.mocked(apiClient.put).mockRejectedValue(new Error('boom'))
    const session = renderConsole(ADMIN)
    await session.click(
      screen.getByRole('button', { name: /Tuỳ chỉnh menu nhân viên/ })
    )
    const dialog = await screen.findByRole('dialog')
    await within(dialog).findByRole('button', { name: 'Lưu' })
    await session.click(
      within(dialog).getByRole('switch', {
        name: 'Ẩn "Duyệt bài cộng đồng" với nhân viên',
      })
    )
    await session.click(within(dialog).getByRole('button', { name: 'Lưu' }))
    await waitFor(() => expect(appToast.error).toHaveBeenCalled())
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })
})
