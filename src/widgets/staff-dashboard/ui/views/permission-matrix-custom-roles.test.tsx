import * as React from 'react'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { apiClient } from '@/shared/api'
import { appToast } from '@/shared/ui/app-toast'
import { PermissionMatrixView } from './permission-matrix-view'
import { validateRoleCode } from './components/permission-matrix/create-role-dialog'
import { slugifyRoleName } from '../../model/role-permission-matrix'

vi.mock('@/shared/api', () => ({
  apiClient: { get: vi.fn(), put: vi.fn(), post: vi.fn(), delete: vi.fn() },
  readApiErrorCode: vi.fn(() => 'HTTP_500'),
}))
vi.mock('@/shared/ui/app-toast', () => ({
  appToast: { success: vi.fn(), error: vi.fn(), info: vi.fn() },
}))

const SCHEMA = {
  tenant: [{ subject: 'Booking', actions: ['read', 'create'] }],
  landlord: [{ subject: 'Wallet', actions: ['read', 'create'] }],
  staff: [
    { subject: 'Kyc', actions: ['read', 'approve'] },
    { subject: 'CommunityPost', actions: ['read', 'approve', 'delete'] },
  ],
}

const ROLES = [
  { _id: 'id-admin', name: 'admin' },
  { _id: 'id-tenant', name: 'tenant' },
  { _id: 'id-landlord', name: 'landlord' },
  { _id: 'id-staff', name: 'staff' },
  {
    _id: 'id-kyc',
    name: 'kyc-reviewer',
    label: 'Nhân viên KYC',
    description: 'Chỉ xử lý KYC',
    baseRole: 'staff',
    isActive: true,
  },
]

const USERS = [
  { _id: 'u-staff-1', fullName: 'Lê Văn A', email: 'a@x.vn', role: 'staff' },
  {
    _id: 'u-staff-2',
    fullName: 'Trần Thị B',
    email: 'b@x.vn',
    role: 'staff',
    permissionProfile: 'kyc-reviewer',
  },
  { _id: 'u-tenant-1', fullName: 'Khách C', email: 'c@x.vn', role: 'tenant' },
]

function mockApi(): void {
  vi.mocked(apiClient.get).mockImplementation(((path: string) => {
    if (path === '/rbac/permission-schema') return Promise.resolve(SCHEMA)
    if (path === '/rbac/roles') return Promise.resolve(ROLES)
    if (path === '/users') return Promise.resolve(USERS)
    if (/^\/rbac\/roles\/[\w-]+\/permissions$/.test(path)) {
      return Promise.resolve(
        path.includes('id-kyc')
          ? [{ action: 'approve', subject: 'CommunityPost', allowed: false }]
          : []
      )
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

async function openCustomTab(session: ReturnType<typeof userEvent.setup>) {
  await session.click(await screen.findByRole('tab', { name: 'Nhân viên KYC' }))
}

beforeEach(() => {
  vi.clearAllMocks()
  mockApi()
})

describe('role code helpers', () => {
  it('builds a code from a Vietnamese name', () => {
    expect(slugifyRoleName('Nhân viên Đối soát')).toBe('nhan-vien-doi-soat')
    expect(slugifyRoleName('  KYC  --  Level 2 ')).toBe('kyc-level-2')
  })

  it('accepts a valid code and rejects bad or reserved ones', () => {
    expect(validateRoleCode('kyc-reviewer')).toBeNull()
    expect(validateRoleCode('ab')).toMatch(/3 đến 40/)
    expect(validateRoleCode('Staff')).toMatch(/3 đến 40/)
    expect(validateRoleCode('9abc')).toMatch(/3 đến 40/)
    expect(validateRoleCode('admin')).toMatch(/trùng/)
    expect(validateRoleCode('staff')).toMatch(/trùng/)
  })
})

describe('custom roles in the matrix', () => {
  it('lists a custom role as a tab, using the matrix of its base role', async () => {
    const session = renderView()
    await openCustomTab(session)
    expect(screen.getByText('KYC-REVIEWER')).toBeVisible()
    expect(screen.getByText('Dựa trên nhân viên')).toBeVisible()
    expect(screen.getByText('Chỉ xử lý KYC')).toBeVisible()
    // vai trò gốc nhân viên có KYC + Cộng đồng, và ô đã tắt được phản ánh
    expect(
      await screen.findByRole('checkbox', {
        name: 'Duyệt Cộng đồng cho nhân viên kyc',
      })
    ).not.toBeChecked()
    expect(screen.getByText('Phân hệ (2)')).toBeVisible()
  })

  it('saves a custom role through its own role id', async () => {
    vi.mocked(apiClient.put).mockResolvedValue([] as never)
    const session = renderView()
    await openCustomTab(session)
    await session.click(
      await screen.findByRole('checkbox', {
        name: 'Duyệt Xác minh KYC cho nhân viên kyc',
      })
    )
    await session.click(screen.getByRole('button', { name: 'Lưu thay đổi' }))
    await waitFor(() => expect(apiClient.put).toHaveBeenCalledTimes(1))
    expect(vi.mocked(apiClient.put).mock.calls[0]?.[0]).toBe(
      '/rbac/roles/id-kyc/permissions'
    )
  })

  it('only offers base-role users in the assignment dialog and saves the selection', async () => {
    vi.mocked(apiClient.put).mockResolvedValue({
      assigned: 2,
      removed: 0,
    } as never)
    const session = renderView()
    await openCustomTab(session)
    await session.click(
      await screen.findByRole('button', { name: /Người dùng \(1\)/ })
    )
    const dialog = await screen.findByRole('dialog')
    expect(await within(dialog).findByText('Lê Văn A')).toBeVisible()
    expect(within(dialog).getByText('Trần Thị B')).toBeVisible()
    expect(within(dialog).queryByText('Khách C')).toBeNull()
    expect(
      within(dialog).getByRole('checkbox', { name: /Trần Thị B/ })
    ).toBeChecked()
    expect(
      within(dialog).getByRole('button', { name: 'Lưu danh sách' })
    ).toBeDisabled()

    await session.click(
      within(dialog).getByRole('checkbox', { name: /Lê Văn A/ })
    )
    await session.click(
      within(dialog).getByRole('button', { name: 'Lưu danh sách' })
    )
    await waitFor(() =>
      expect(apiClient.put).toHaveBeenCalledWith('/rbac/roles/id-kyc/users', {
        userIds: ['u-staff-2', 'u-staff-1'],
      })
    )
    expect(appToast.success).toHaveBeenCalled()
  })

  it('filters the users by name or email', async () => {
    const session = renderView()
    await openCustomTab(session)
    await session.click(
      await screen.findByRole('button', { name: /Người dùng \(1\)/ })
    )
    const dialog = await screen.findByRole('dialog')
    await within(dialog).findByText('Lê Văn A')
    await session.type(
      within(dialog).getByRole('textbox', { name: 'Tìm người dùng' }),
      'b@x'
    )
    expect(within(dialog).queryByText('Lê Văn A')).toBeNull()
    expect(within(dialog).getByText('Trần Thị B')).toBeVisible()
  })

  it('deletes a custom role after confirmation', async () => {
    vi.mocked(apiClient.delete).mockResolvedValue({ deleted: true } as never)
    const session = renderView()
    await openCustomTab(session)
    await session.click(
      await screen.findByRole('button', { name: 'Xóa vai trò' })
    )
    const confirm = await screen.findByRole('alertdialog')
    expect(apiClient.delete).not.toHaveBeenCalled()
    await session.click(
      within(confirm).getByRole('button', { name: 'Xóa vai trò' })
    )
    await waitFor(() =>
      expect(apiClient.delete).toHaveBeenCalledWith('/rbac/roles/id-kyc')
    )
  })

  it('base roles have no assign or delete controls', async () => {
    renderView()
    await screen.findByRole('tab', { name: 'Nhân viên KYC' })
    expect(screen.queryByRole('button', { name: /Người dùng \(/ })).toBeNull()
    expect(screen.queryByRole('button', { name: 'Xóa vai trò' })).toBeNull()
  })
})

describe('creating a role', () => {
  async function openDialog(session: ReturnType<typeof userEvent.setup>) {
    await session.click(
      await screen.findByRole('button', { name: 'Tạo vai trò' })
    )
    return screen.findByRole('dialog')
  }

  it('suggests a code from the name and creates the role on the chosen base role', async () => {
    vi.mocked(apiClient.post).mockResolvedValue({
      _id: 'id-new',
      name: 'duyet-bai',
    } as never)
    const session = renderView()
    const dialog = await openDialog(session)
    await session.type(
      within(dialog).getByRole('textbox', { name: /Tên vai trò/ }),
      'Duyệt bài'
    )
    expect(
      within(dialog).getByRole('textbox', { name: /Mã vai trò/ })
    ).toHaveValue('duyet-bai')
    await session.selectOptions(
      within(dialog).getByRole('combobox'),
      'landlord'
    )
    await session.click(
      within(dialog).getByRole('button', { name: 'Tạo vai trò' })
    )
    await waitFor(() =>
      expect(apiClient.post).toHaveBeenCalledWith('/rbac/roles', {
        name: 'duyet-bai',
        label: 'Duyệt bài',
        baseRole: 'landlord',
      })
    )
    expect(appToast.success).toHaveBeenCalled()
  })

  it('blocks an invalid or reserved code', async () => {
    const session = renderView()
    const dialog = await openDialog(session)
    await session.type(
      within(dialog).getByRole('textbox', { name: /Tên vai trò/ }),
      'Quản trị'
    )
    const code = within(dialog).getByRole('textbox', { name: /Mã vai trò/ })
    await session.clear(code)
    await session.type(code, 'admin')
    expect(within(dialog).getByRole('alert')).toHaveTextContent('trùng')
    expect(
      within(dialog).getByRole('button', { name: 'Tạo vai trò' })
    ).toBeDisabled()
    expect(apiClient.post).not.toHaveBeenCalled()
  })

  it('reports a failed creation and keeps the dialog open', async () => {
    vi.mocked(apiClient.post).mockRejectedValue(new Error('boom'))
    const session = renderView()
    const dialog = await openDialog(session)
    await session.type(
      within(dialog).getByRole('textbox', { name: /Tên vai trò/ }),
      'Thử nghiệm'
    )
    await session.click(
      within(dialog).getByRole('button', { name: 'Tạo vai trò' })
    )
    await waitFor(() => expect(appToast.error).toHaveBeenCalled())
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })
})
