import * as React from 'react'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { apiClient } from '@/shared/api'
import { appToast } from '@/shared/ui/app-toast'
import { PermissionMatrixView } from './permission-matrix-view'
import {
  resolveCell,
  toCellState,
  toEntries,
  type PermissionSchema,
  type RolePermissionEntry,
} from '../../model/role-permission-matrix'

vi.mock('@/shared/api', () => ({
  apiClient: { get: vi.fn(), put: vi.fn() },
}))
vi.mock('@/shared/ui/app-toast', () => ({
  appToast: { success: vi.fn(), error: vi.fn(), info: vi.fn() },
}))

const IDS = { tenant: 'id-tenant', landlord: 'id-landlord', staff: 'id-staff' }

const SCHEMA: PermissionSchema = {
  tenant: [
    { subject: 'Apartment', actions: ['read'] },
    { subject: 'Booking', actions: ['read', 'create', 'update'] },
  ],
  landlord: [
    { subject: 'Apartment', actions: ['read', 'update'] },
    { subject: 'Booking', actions: ['read', 'approve'] },
    { subject: 'Wallet', actions: ['read', 'create'] },
  ],
  staff: [
    { subject: 'Kyc', actions: ['read', 'approve'] },
    { subject: 'CommunityPost', actions: ['read', 'approve', 'delete'] },
  ],
}

function mockApi(
  entries: Partial<Record<keyof typeof IDS, RolePermissionEntry[]>> = {}
): void {
  vi.mocked(apiClient.get).mockImplementation(((path: string) => {
    if (path === '/rbac/permission-schema') return Promise.resolve(SCHEMA)
    if (path === '/rbac/roles') {
      return Promise.resolve([
        { _id: 'id-admin', name: 'admin' },
        ...Object.entries(IDS).map(([name, _id]) => ({ _id, name })),
      ])
    }
    const match = /^\/rbac\/roles\/(id-\w+)\/permissions$/.exec(path)
    if (match) {
      const role = match[1]?.replace('id-', '') as keyof typeof IDS
      return Promise.resolve(entries[role] ?? [])
    }
    return Promise.reject(new Error('unexpected ' + path))
  }) as never)
}

function renderView() {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  const session = userEvent.setup()
  render(
    <QueryClientProvider client={client}>
      <PermissionMatrixView />
    </QueryClientProvider>
  )
  return session
}

const box = (name: string): Promise<HTMLElement> =>
  screen.findByRole('checkbox', { name })

beforeEach(() => {
  vi.clearAllMocks()
})

describe('matrix helpers', () => {
  it('a cell with no entry is on (legacy behaviour), an explicit off wins', () => {
    const entries = [{ action: 'approve', subject: 'Kyc', allowed: false }]
    expect(resolveCell(entries, 'approve', 'Kyc')).toBe(false)
    expect(resolveCell(entries, 'read', 'Kyc')).toBe(true)
  })

  it('manage on a subject applies to its actions unless an exact entry overrides it', () => {
    const state = toCellState(SCHEMA.staff, [
      { action: 'manage', subject: 'Kyc', allowed: false },
      { action: 'read', subject: 'Kyc', allowed: true },
    ])
    expect(state['approve:Kyc']).toBe(false)
    expect(state['read:Kyc']).toBe(true)
  })

  it('only the cells of the role schema are part of the state', () => {
    expect(Object.keys(toCellState(SCHEMA.tenant, [])).sort()).toEqual(
      [
        'create:Booking',
        'read:Apartment',
        'read:Booking',
        'update:Booking',
      ].sort()
    )
  })

  it('saving keeps entries outside the schema and rewrites the schema cells explicitly', () => {
    const existing = [
      { action: 'read', subject: 'User', allowed: true },
      { action: 'approve', subject: 'Kyc', allowed: true },
    ]
    const state = toCellState(SCHEMA.staff, existing)
    state['approve:Kyc'] = false
    const out = toEntries(existing, state)
    expect(out).toContainEqual({
      action: 'read',
      subject: 'User',
      allowed: true,
    })
    expect(
      out.filter(e => e.action === 'approve' && e.subject === 'Kyc')
    ).toEqual([{ action: 'approve', subject: 'Kyc', allowed: false }])
  })
})

describe('PermissionMatrixView', () => {
  it('opens on the staff role and lists only the cells the backend enforces', async () => {
    mockApi()
    renderView()
    expect(await box('Duyệt Xác minh KYC cho nhân viên')).toBeChecked()
    expect(screen.getByText('Phân hệ (2)')).toBeVisible()
    expect(screen.getByText('KYC')).toBeVisible()
    // Cộng đồng không có "Tạo" cho nhân viên, nên không có ô đó
    expect(screen.queryByRole('checkbox', { name: /Tạo Cộng đồng/ })).toBeNull()
    // Cột "Sửa" không tồn tại với nhân viên
    expect(screen.queryByRole('columnheader', { name: 'Sửa' })).toBeNull()
  })

  it('reflects what the admin already switched off', async () => {
    mockApi({
      staff: [{ action: 'approve', subject: 'Kyc', allowed: false }],
    })
    renderView()
    expect(await box('Duyệt Xác minh KYC cho nhân viên')).not.toBeChecked()
    expect(await box('Xem Xác minh KYC cho nhân viên')).toBeChecked()
  })

  it('shows each role its own matrix when switching tabs', async () => {
    mockApi()
    const session = renderView()
    await box('Duyệt Xác minh KYC cho nhân viên')
    await session.click(screen.getByRole('tab', { name: 'Khách thuê' }))
    expect(await box('Tạo Lịch hẹn xem nhà cho khách thuê')).toBeChecked()
    expect(screen.queryByRole('checkbox', { name: /Xác minh KYC/ })).toBeNull()
    await session.click(screen.getByRole('tab', { name: 'Chủ nhà' }))
    expect(await box('Tạo Ví nhận tiền cho chủ nhà')).toBeChecked()
  })

  it('saves only the active role, keeping entries outside the matrix', async () => {
    mockApi({
      landlord: [{ action: 'read', subject: 'User', allowed: true }],
    })
    vi.mocked(apiClient.put).mockResolvedValue([] as never)
    const session = renderView()
    await session.click(await screen.findByRole('tab', { name: 'Chủ nhà' }))
    const save = screen.getByRole('button', { name: 'Lưu thay đổi' })
    expect(save).toBeDisabled()
    await session.click(await box('Tạo Ví nhận tiền cho chủ nhà'))
    expect(save).toBeEnabled()
    await session.click(save)
    await waitFor(() => expect(apiClient.put).toHaveBeenCalledTimes(1))
    const [path, body] = vi.mocked(apiClient.put).mock.calls[0] as [
      string,
      { permissions: RolePermissionEntry[] },
    ]
    expect(path).toBe('/rbac/roles/id-landlord/permissions')
    expect(body.permissions).toContainEqual({
      action: 'create',
      subject: 'Wallet',
      allowed: false,
    })
    expect(body.permissions).toContainEqual({
      action: 'read',
      subject: 'Wallet',
      allowed: true,
    })
    expect(body.permissions).toContainEqual({
      action: 'read',
      subject: 'User',
      allowed: true,
    })
    expect(
      body.permissions.some((e: RolePermissionEntry) => e.subject === 'Kyc')
    ).toBe(false)
    expect(appToast.success).toHaveBeenCalled()
  })

  it('keeps unsaved changes per role and marks the tab', async () => {
    mockApi()
    const session = renderView()
    await session.click(await box('Duyệt Xác minh KYC cho nhân viên'))
    await session.click(screen.getByRole('tab', { name: 'Khách thuê' }))
    await screen.findByRole('checkbox', {
      name: 'Xem Lịch hẹn xem nhà cho khách thuê',
    })
    expect(
      within(screen.getByRole('tab', { name: /Nhân viên/ })).getByRole('img', {
        name: 'Có thay đổi chưa lưu',
      })
    ).toBeInTheDocument()
    await session.click(screen.getByRole('tab', { name: /Nhân viên/ }))
    expect(await box('Duyệt Xác minh KYC cho nhân viên')).not.toBeChecked()
  })

  it('undoes the draft of the active role', async () => {
    mockApi()
    const session = renderView()
    await session.click(await box('Duyệt Xác minh KYC cho nhân viên'))
    await session.click(screen.getByRole('button', { name: 'Đặt lại' }))
    expect(await box('Duyệt Xác minh KYC cho nhân viên')).toBeChecked()
    expect(screen.getByRole('button', { name: 'Lưu thay đổi' })).toBeDisabled()
  })

  it('turns a whole row or everything off with the bulk controls', async () => {
    mockApi()
    const session = renderView()
    await box('Duyệt Xác minh KYC cho nhân viên')
    await session.click(
      screen.getByRole('button', { name: /Tắt hàng.*Xác minh KYC/ })
    )
    expect(await box('Xem Xác minh KYC cho nhân viên')).not.toBeChecked()
    expect(await box('Xem Cộng đồng cho nhân viên')).toBeChecked()
    await session.click(screen.getByRole('button', { name: 'Tắt tất cả' }))
    expect(
      screen
        .getAllByRole('checkbox')
        .every(c => !(c as HTMLInputElement).checked)
    ).toBe(true)
  })

  it('shows the admin role as locked, without switches', async () => {
    mockApi()
    const session = renderView()
    await session.click(
      await screen.findByRole('tab', { name: 'Quản trị viên' })
    )
    expect(screen.getByText(/toàn quyền trên mọi phân hệ/)).toBeVisible()
    expect(screen.queryAllByRole('checkbox')).toHaveLength(0)
  })

  it('reports a failed save and keeps the unsaved changes', async () => {
    mockApi()
    vi.mocked(apiClient.put).mockRejectedValue(new Error('boom'))
    const session = renderView()
    await session.click(await box('Duyệt Xác minh KYC cho nhân viên'))
    await session.click(screen.getByRole('button', { name: 'Lưu thay đổi' }))
    await waitFor(() => expect(appToast.error).toHaveBeenCalled())
    expect(screen.getByRole('button', { name: 'Lưu thay đổi' })).toBeEnabled()
  })

  it('shows an error when a role cannot be found', async () => {
    vi.mocked(apiClient.get).mockImplementation(((path: string) =>
      path === '/rbac/permission-schema'
        ? Promise.resolve(SCHEMA)
        : path === '/rbac/roles'
          ? Promise.resolve([{ _id: 'id-admin', name: 'admin' }])
          : Promise.reject(new Error('x'))) as never)
    renderView()
    expect(
      await screen.findByText('Không tải được phân quyền. Vui lòng thử lại.')
    ).toBeVisible()
  })
})
