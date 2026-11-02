import { beforeEach, describe, expect, it, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  buildEventDetail,
  buildEventsPage,
  buildGovernancePage,
  buildOverview,
  buildRunsPage,
} from '../test-fixtures/fabric-audit.fixtures'
import { chooseOption } from '@/shared/lib/test/ui-pickers'
import { deliveryStateView } from '../model/labels'
import { renderWithQuery } from '../test-fixtures/render-with-query'
import { FabricAuditCenter } from './fabric-audit-center'

const api = vi.hoisted(() => ({
  getAuditOverview: vi.fn(),
  listAuditEvents: vi.fn(),
  getAuditEvent: vi.fn(),
  listGovernanceSnapshots: vi.fn(),
  verifyGovernanceSnapshot: vi.fn(),
  publishGovernanceSnapshot: vi.fn(),
  listReconciliationRuns: vi.fn(),
  getReconciliationRun: vi.fn(),
  listReconciliationFindings: vi.fn(),
  startReconciliationRun: vi.fn(),
  resumeReconciliationRun: vi.fn(),
  cancelReconciliationRun: vi.fn(),
  repairReconciliationFinding: vi.fn(),
}))
vi.mock('../api/fabric-audit-api', () => api)

const navigation = vi.hoisted(() => ({
  search: '',
  replace: vi.fn(),
}))
vi.mock('next/navigation', () => ({
  usePathname: () => '/admin/fabric-audit',
  useRouter: () => ({ replace: navigation.replace, push: vi.fn() }),
  useSearchParams: () => new URLSearchParams(navigation.search),
}))

function signIn(roles: string[] | null): void {
  if (roles === null) localStorage.removeItem('user')
  else localStorage.setItem('user', JSON.stringify({ roles }))
}

function expectNoAuditRequests(): void {
  for (const fn of Object.values(api)) expect(fn).not.toHaveBeenCalled()
}

beforeEach(() => {
  vi.clearAllMocks()
  navigation.search = ''
  localStorage.clear()
  api.getAuditOverview.mockResolvedValue(buildOverview())
  api.listAuditEvents.mockResolvedValue(buildEventsPage())
  api.getAuditEvent.mockResolvedValue(buildEventDetail())
  api.listGovernanceSnapshots.mockResolvedValue(buildGovernancePage())
  api.listReconciliationRuns.mockResolvedValue(buildRunsPage([]))
})

describe('FabricAuditCenter authorization', () => {
  it.each([['tenant'], ['landlord']])(
    'renders no audit data and makes no request for a %s',
    async role => {
      signIn([role])
      renderWithQuery(<FabricAuditCenter />)
      expect(await screen.findByRole('alert')).toHaveTextContent(
        'không có quyền xem trung tâm kiểm toán lưu vết'
      )
      expect(screen.queryByRole('tablist')).not.toBeInTheDocument()
      expectNoAuditRequests()
    }
  )

  it('renders nothing sensitive and requests nothing without a signed-in user', async () => {
    signIn(null)
    renderWithQuery(<FabricAuditCenter />)
    expect(await screen.findByRole('alert')).toBeInTheDocument()
    expectNoAuditRequests()
  })

  it('lets staff read the overview', async () => {
    signIn(['staff'])
    renderWithQuery(<FabricAuditCenter />)
    expect(
      await screen.findByText('Đang ghi lên sổ cái thật')
    ).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Tổng quan' })).toHaveAttribute(
      'aria-selected',
      'true'
    )
  })
})

describe('FabricAuditCenter URL synchronization', () => {
  it('opens the tab and filters carried by the URL', async () => {
    signIn(['admin'])
    navigation.search = 'tab=events&state=failed&contractId=c-1&page=2'
    renderWithQuery(<FabricAuditCenter />)
    await waitFor(() =>
      expect(api.listAuditEvents).toHaveBeenCalledWith({
        page: 2,
        limit: 20,
        contractId: 'c-1',
        state: 'failed',
      })
    )
    expect(screen.getByRole('tab', { name: 'Sự kiện' })).toHaveAttribute(
      'aria-selected',
      'true'
    )
  })

  it('writes the selected tab to the URL', async () => {
    const user = userEvent.setup()
    signIn(['admin'])
    renderWithQuery(<FabricAuditCenter />)
    await screen.findByText('Đang ghi lên sổ cái thật')
    await user.click(screen.getByRole('tab', { name: 'Sự kiện' }))
    expect(navigation.replace).toHaveBeenLastCalledWith(
      '/admin/fabric-audit?tab=events',
      { scroll: false }
    )
  })

  it('writes applied filters to the URL and resets the page', async () => {
    const user = userEvent.setup()
    signIn(['staff'])
    navigation.search = 'tab=events&page=3'
    renderWithQuery(<FabricAuditCenter />)
    await chooseOption(
      user,
      await screen.findByLabelText('Trạng thái chuyển'),
      deliveryStateView('failed').label
    )
    await user.click(screen.getByRole('button', { name: 'Áp dụng bộ lọc' }))
    expect(navigation.replace).toHaveBeenLastCalledWith(
      '/admin/fabric-audit?tab=events&state=failed',
      { scroll: false }
    )
  })

  it('writes pagination and the selected event to the URL', async () => {
    const user = userEvent.setup()
    signIn(['staff'])
    navigation.search = 'tab=events'
    api.listAuditEvents.mockResolvedValue(
      buildEventsPage([buildEventsPage().items[0]], {
        total: 45,
        totalPages: 3,
      })
    )
    renderWithQuery(<FabricAuditCenter />)
    await user.click(await screen.findByRole('button', { name: 'Trang sau' }))
    expect(navigation.replace).toHaveBeenLastCalledWith(
      '/admin/fabric-audit?tab=events&page=2',
      { scroll: false }
    )
    await user.click(
      screen.getByRole('button', { name: 'Xem chi tiết sự kiện' })
    )
    expect(navigation.replace).toHaveBeenLastCalledWith(
      '/admin/fabric-audit?tab=events&event=66f0000000000000000000a1',
      { scroll: false }
    )
  })

  it('opens the event detail carried by the URL', async () => {
    signIn(['staff'])
    navigation.search = 'tab=events&event=66f0000000000000000000a1'
    renderWithQuery(<FabricAuditCenter />)
    expect(await screen.findByRole('dialog')).toBeInTheDocument()
    await waitFor(() =>
      expect(api.getAuditEvent).toHaveBeenCalledWith('66f0000000000000000000a1')
    )
  })

  it('drops the event parameter when the detail closes', async () => {
    const user = userEvent.setup()
    signIn(['staff'])
    navigation.search = 'tab=events&event=66f0000000000000000000a1'
    renderWithQuery(<FabricAuditCenter />)
    await screen.findByRole('dialog')
    await user.keyboard('{Escape}')
    expect(navigation.replace).toHaveBeenLastCalledWith(
      '/admin/fabric-audit?tab=events',
      { scroll: false }
    )
  })

  it('jumps from an overview terminal-failure shortcut to filtered events', async () => {
    const user = userEvent.setup()
    signIn(['staff'])
    renderWithQuery(<FabricAuditCenter />)
    await user.click(
      await screen.findByRole('button', { name: 'Xem sự kiện thất bại' })
    )
    expect(navigation.replace).toHaveBeenLastCalledWith(
      '/admin/fabric-audit?tab=events&state=failed',
      { scroll: false }
    )
  })

  it('jumps from the overview to the reconciliation view', async () => {
    const user = userEvent.setup()
    signIn(['staff'])
    renderWithQuery(<FabricAuditCenter />)
    await user.click(await screen.findByRole('button', { name: 'Mở đối soát' }))
    expect(navigation.replace).toHaveBeenLastCalledWith(
      '/admin/fabric-audit?tab=reconciliation',
      { scroll: false }
    )
  })
})
