import * as React from 'react'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ApiClientError, apiClient } from '@/shared/api'
import { listAdminDesigns } from '@/features/apartment-floorplan'
import { appToast } from '@/shared/ui/app-toast'
import * as api from '../api/design-requests-api'
import type {
  DesignRequest,
  DesignRequestStatus,
  DesignRequestSummary,
} from '../api/design-requests-api'
import { StaffDesignRequestsView } from './staff-design-requests-view'

vi.mock('../api/design-requests-api', () => ({
  listDesignRequestQueue: vi.fn(),
  getDesignRequest: vi.fn(),
  escalateDesignRequest: vi.fn(),
  requestInfoDesignRequest: vi.fn(),
  rejectDesignRequest: vi.fn(),
  startDesignRequest: vi.fn(),
  deliverDesignRequest: vi.fn(),
}))
vi.mock('@/features/apartment-floorplan', () => ({
  ApartmentDesignsManager: ({ onClose }: { onClose: () => void }) => (
    <div data-testid="designs-manager">
      <button onClick={onClose}>đóng trình thiết kế</button>
    </div>
  ),
  listAdminDesigns: vi.fn(),
}))
vi.mock('@/shared/ui/app-toast', () => ({
  appToast: { success: vi.fn(), error: vi.fn(), info: vi.fn() },
}))
vi.mock('@/shared/api', async () => {
  const actual =
    await vi.importActual<typeof import('@/shared/api')>('@/shared/api')
  return { ...actual, apiClient: { get: vi.fn() } }
})

function summary(
  id: string,
  status: DesignRequestStatus,
  extra: Partial<DesignRequestSummary> = {}
): DesignRequestSummary {
  return {
    id,
    apartmentId: 'apt-1',
    apartment: { id: 'apt-1', title: 'Căn hộ Sunrise' },
    landlordId: 'l1',
    landlord: { id: 'l1', name: 'Trần Thị B', email: 'b@x.com' },
    kind: 'create',
    targetDesignId: null,
    brief: 'Phong cách hiện đại',
    attachmentUrls: [],
    status,
    revision: 1,
    deliveredDesignId: null,
    assignedAdminId: null,
    createdAt: '2026-01-10T00:00:00.000Z',
    updatedAt: '2026-01-11T00:00:00.000Z',
    ...extra,
  }
}

function detail(
  id: string,
  status: DesignRequestStatus,
  extra: Partial<DesignRequest> = {}
): DesignRequest {
  return {
    ...summary(id, status),
    deliveredDesign: null,
    events: [
      {
        type: 'submitted',
        actorId: 'l1',
        actorRole: 'landlord',
        actorName: 'Trần Thị B',
        note: 'Cần phòng khách rộng',
        attachmentUrls: ['https://img.test/a.png'],
        revision: 1,
        at: '2026-01-10T00:00:00.000Z',
      },
    ],
    ...extra,
  }
}

function renderView(role: 'staff' | 'admin') {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  const user = userEvent.setup()
  render(
    <QueryClientProvider client={client}>
      <StaffDesignRequestsView role={role} />
    </QueryClientProvider>
  )
  return user
}

function setup(
  role: 'staff' | 'admin',
  status: DesignRequestStatus,
  extra: Partial<DesignRequest> = {}
) {
  vi.mocked(api.listDesignRequestQueue).mockResolvedValue({
    items: [summary('r1', status)],
    total: 1,
    page: 1,
    limit: 20,
  })
  vi.mocked(api.getDesignRequest).mockResolvedValue(detail('r1', status, extra))
  return renderView(role)
}

async function openDetail(user: ReturnType<typeof userEvent.setup>) {
  await user.click(await screen.findByRole('button', { name: 'Xem' }))
  return screen.findByRole('dialog')
}

function apiError(status: number, code: string): ApiClientError {
  return new ApiClientError('x', status, {
    code: `HTTP_${status}`,
    message: 'x',
    details: { code },
  } as never)
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('queue', () => {
  it('renders rows with Vietnamese labels', async () => {
    setup('staff', 'submitted')
    const row = await screen.findByTestId('design-request-r1')
    expect(within(row).getByText('Căn hộ Sunrise')).toBeInTheDocument()
    expect(within(row).getByText('Trần Thị B')).toBeInTheDocument()
    expect(within(row).getByText('Thiết kế mới')).toBeInTheDocument()
    expect(within(row).getByText('Chờ tiếp nhận')).toBeInTheDocument()
  })

  it('applies the staff default status filter', async () => {
    setup('staff', 'submitted')
    await screen.findByTestId('design-request-r1')
    expect(api.listDesignRequestQueue).toHaveBeenCalledWith({
      statuses: ['submitted', 'needs_info', 'escalated'],
      page: 1,
      limit: 20,
    })
  })

  it('applies the admin default status filter and toggles chips', async () => {
    const user = setup('admin', 'escalated')
    await screen.findByTestId('design-request-r1')
    expect(api.listDesignRequestQueue).toHaveBeenCalledWith({
      statuses: ['escalated', 'in_progress', 'changes_requested', 'delivered'],
      page: 1,
      limit: 20,
    })
    await user.click(screen.getByRole('button', { name: 'Đã duyệt' }))
    await waitFor(() =>
      expect(api.listDesignRequestQueue).toHaveBeenLastCalledWith({
        statuses: [
          'escalated',
          'in_progress',
          'changes_requested',
          'delivered',
          'approved',
        ],
        page: 1,
        limit: 20,
      })
    )
  })

  it('paginates', async () => {
    vi.mocked(api.listDesignRequestQueue).mockResolvedValue({
      items: [summary('r1', 'submitted')],
      total: 45,
      page: 1,
      limit: 20,
    })
    const user = renderView('staff')
    expect(await screen.findByText(/Trang 1\/3/)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Sau' }))
    await waitFor(() =>
      expect(api.listDesignRequestQueue).toHaveBeenLastCalledWith(
        expect.objectContaining({ page: 2 })
      )
    )
  })
})

describe('detail actions by status and role', () => {
  it('shows brief, attachments and the timeline', async () => {
    const user = setup('staff', 'submitted')
    const dialog = await openDetail(user)
    expect(await within(dialog).findByText('Phong cách hiện đại')).toBeVisible()
    expect(within(dialog).getByText('Cần phòng khách rộng')).toBeVisible()
    expect(within(dialog).getByText('Chủ nhà gửi yêu cầu')).toBeVisible()
    expect(within(dialog).getAllByRole('link')[0]).toHaveAttribute(
      'target',
      '_blank'
    )
  })

  it('submitted: staff can triage but not start or deliver', async () => {
    const user = setup('staff', 'submitted')
    const dialog = await openDetail(user)
    expect(
      await within(dialog).findByRole('button', {
        name: 'Chuyển quản trị viên',
      })
    ).toBeVisible()
    expect(
      within(dialog).getByRole('button', { name: 'Yêu cầu bổ sung' })
    ).toBeVisible()
    expect(
      within(dialog).getByRole('button', { name: 'Từ chối' })
    ).toBeVisible()
    expect(
      within(dialog).queryByRole('button', { name: 'Nhận thiết kế' })
    ).toBeNull()
  })

  it('escalates with an optional note and refetches', async () => {
    vi.mocked(api.escalateDesignRequest).mockResolvedValue(
      detail('r1', 'escalated')
    )
    const user = setup('staff', 'submitted')
    const dialog = await openDetail(user)
    await user.click(
      await within(dialog).findByRole('button', {
        name: 'Chuyển quản trị viên',
      })
    )
    await user.type(within(dialog).getByLabelText('Ghi chú'), 'Cần dựng gấp')
    const queueCalls = vi.mocked(api.listDesignRequestQueue).mock.calls.length
    await user.click(
      within(dialog).getByRole('button', { name: 'Xác nhận chuyển' })
    )
    await waitFor(() =>
      expect(api.escalateDesignRequest).toHaveBeenCalledWith('r1', {
        note: 'Cần dựng gấp',
      })
    )
    await waitFor(() =>
      expect(
        vi.mocked(api.listDesignRequestQueue).mock.calls.length
      ).toBeGreaterThan(queueCalls)
    )
    expect(appToast.success).toHaveBeenCalled()
  })

  it('request-info requires a note', async () => {
    vi.mocked(api.requestInfoDesignRequest).mockResolvedValue(
      detail('r1', 'needs_info')
    )
    const user = setup('staff', 'submitted')
    const dialog = await openDetail(user)
    await user.click(
      await within(dialog).findByRole('button', { name: 'Yêu cầu bổ sung' })
    )
    const submit = within(dialog).getByRole('button', {
      name: 'Gửi yêu cầu bổ sung',
    })
    expect(submit).toBeDisabled()
    await user.type(within(dialog).getByLabelText('Ghi chú'), 'Thiếu ảnh')
    await user.click(submit)
    await waitFor(() =>
      expect(api.requestInfoDesignRequest).toHaveBeenCalledWith('r1', {
        note: 'Thiếu ảnh',
      })
    )
  })

  it('reject requires a note then confirms', async () => {
    vi.mocked(api.rejectDesignRequest).mockResolvedValue(
      detail('r1', 'rejected')
    )
    const user = setup('staff', 'submitted')
    const dialog = await openDetail(user)
    await user.click(
      await within(dialog).findByRole('button', { name: 'Từ chối' })
    )
    const confirm = within(dialog).getByRole('button', {
      name: 'Xác nhận từ chối',
    })
    expect(confirm).toBeDisabled()
    await user.type(within(dialog).getByLabelText('Ghi chú'), 'Ngoài phạm vi')
    await user.click(confirm)
    await waitFor(() =>
      expect(api.rejectDesignRequest).toHaveBeenCalledWith('r1', {
        note: 'Ngoài phạm vi',
      })
    )
  })

  it('needs_info is read-only', async () => {
    const user = setup('admin', 'needs_info')
    const dialog = await openDetail(user)
    expect(
      await within(dialog).findByText('Đang chờ chủ nhà bổ sung')
    ).toBeVisible()
    expect(within(dialog).queryByRole('button', { name: 'Từ chối' })).toBeNull()
  })

  it('escalated: staff is read-only', async () => {
    const user = setup('staff', 'escalated')
    const dialog = await openDetail(user)
    await within(dialog).findByText('Đang chờ quản trị viên nhận thiết kế.')
    expect(
      within(dialog).queryByRole('button', { name: 'Nhận thiết kế' })
    ).toBeNull()
  })

  it('escalated: admin starts the request', async () => {
    vi.mocked(api.startDesignRequest).mockResolvedValue(
      detail('r1', 'in_progress')
    )
    const user = setup('admin', 'escalated')
    const dialog = await openDetail(user)
    await user.click(
      await within(dialog).findByRole('button', { name: 'Nhận thiết kế' })
    )
    await waitFor(() =>
      expect(api.startDesignRequest).toHaveBeenCalledWith('r1')
    )
  })

  it('changes_requested: shows latest feedback; admin can start again', async () => {
    const base = detail('r1', 'changes_requested')
    const user = setup('admin', 'changes_requested', {
      events: [
        ...base.events,
        {
          type: 'feedback',
          actorId: 'l1',
          actorRole: 'landlord',
          actorName: 'Trần Thị B',
          note: 'Đổi màu sofa',
          attachmentUrls: [],
          revision: 1,
          at: '2026-01-12T00:00:00.000Z',
        },
      ],
    })
    const dialog = await openDetail(user)
    const box = await within(dialog).findByTestId('latest-feedback')
    expect(within(box).getByText('Đổi màu sofa')).toBeVisible()
    expect(
      within(dialog).getByRole('button', { name: 'Nhận chỉnh sửa' })
    ).toBeVisible()
  })

  it('in_progress: staff sees no designer or deliver controls', async () => {
    const user = setup('staff', 'in_progress')
    const dialog = await openDetail(user)
    await within(dialog).findByText('Quản trị viên đang thiết kế.')
    expect(
      within(dialog).queryByRole('button', { name: 'Mở trình thiết kế 3D' })
    ).toBeNull()
    expect(
      within(dialog).queryByRole('button', {
        name: 'Giao thiết kế cho chủ nhà',
      })
    ).toBeNull()
  })

  it('maps a 403 to a permission message', async () => {
    vi.mocked(api.startDesignRequest).mockRejectedValue(
      new ApiClientError('forbidden', 403, null)
    )
    const user = setup('admin', 'escalated')
    const dialog = await openDetail(user)
    await user.click(
      await within(dialog).findByRole('button', { name: 'Nhận thiết kế' })
    )
    await waitFor(() =>
      expect(appToast.error).toHaveBeenCalledWith(
        'Bạn không có quyền thực hiện thao tác này.'
      )
    )
  })

  it('delivered is read-only', async () => {
    const user = setup('admin', 'delivered')
    const dialog = await openDetail(user)
    expect(
      await within(dialog).findByText(
        'Đã giao thiết kế, đang chờ chủ nhà duyệt.'
      )
    ).toBeVisible()
    expect(
      within(dialog).queryByRole('button', {
        name: 'Giao thiết kế cho chủ nhà',
      })
    ).toBeNull()
  })
})

describe('in_progress admin deliver', () => {
  const designs = [
    {
      id: 'd-old',
      name: 'Bản cũ ẩn',
      visible: false,
      updatedAt: '2026-01-01T00:00:00.000Z',
    },
    {
      id: 'd-vis',
      name: 'Bản đang hiện',
      visible: true,
      updatedAt: '2026-01-20T00:00:00.000Z',
    },
    {
      id: 'd-new',
      name: 'Bản mới ẩn',
      visible: false,
      updatedAt: '2026-01-10T00:00:00.000Z',
    },
  ]

  beforeEach(() => {
    vi.mocked(listAdminDesigns).mockResolvedValue(designs as never)
  })

  async function ready(user: ReturnType<typeof userEvent.setup>) {
    const dialog = await openDetail(user)
    const select = await within(dialog).findByLabelText(
      'Thiết kế giao cho chủ nhà'
    )
    await waitFor(() => expect(select).toHaveValue('d-new'))
    return dialog
  }

  it('preselects the newest hidden design and delivers it', async () => {
    vi.mocked(api.deliverDesignRequest).mockResolvedValue(
      detail('r1', 'delivered')
    )
    const user = setup('admin', 'in_progress')
    const dialog = await ready(user)
    await user.type(
      within(dialog).getByLabelText('Ghi chú giao thiết kế'),
      'Xong rồi'
    )
    await user.click(
      within(dialog).getByRole('button', { name: 'Giao thiết kế cho chủ nhà' })
    )
    await waitFor(() =>
      expect(api.deliverDesignRequest).toHaveBeenCalledWith('r1', {
        designId: 'd-new',
        note: 'Xong rồi',
      })
    )
  })

  it('requires a selected design', async () => {
    vi.mocked(listAdminDesigns).mockResolvedValue([])
    const user = setup('admin', 'in_progress')
    const dialog = await openDetail(user)
    expect(
      await within(dialog).findByRole('button', {
        name: 'Giao thiết kế cho chủ nhà',
      })
    ).toBeDisabled()
    expect(api.deliverDesignRequest).not.toHaveBeenCalled()
  })

  it('opens the 3D designer for the apartment', async () => {
    vi.mocked(apiClient.get).mockResolvedValue([
      {
        id: 'apt-1',
        title: 'Căn hộ Sunrise',
        bedrooms: 2,
        bathrooms: 1,
        area: 60,
      },
    ])
    const user = setup('admin', 'in_progress')
    const dialog = await openDetail(user)
    await user.click(
      await within(dialog).findByRole('button', {
        name: 'Mở trình thiết kế 3D',
      })
    )
    expect(await screen.findByTestId('designs-manager')).toBeInTheDocument()
    expect(apiClient.get).toHaveBeenCalledWith('/apartments/manage')
  })

  it('maps DESIGN_NOT_FOUND to a message', async () => {
    vi.mocked(api.deliverDesignRequest).mockRejectedValue(
      apiError(404, 'DESIGN_NOT_FOUND')
    )
    const user = setup('admin', 'in_progress')
    const dialog = await ready(user)
    await user.click(
      within(dialog).getByRole('button', { name: 'Giao thiết kế cho chủ nhà' })
    )
    await waitFor(() =>
      expect(appToast.error).toHaveBeenCalledWith(
        'Không tìm thấy thiết kế đã chọn. Vui lòng chọn lại.'
      )
    )
  })

  it('maps DESIGN_REQUEST_INVALID_STATE and refetches', async () => {
    vi.mocked(api.deliverDesignRequest).mockRejectedValue(
      apiError(409, 'DESIGN_REQUEST_INVALID_STATE')
    )
    const user = setup('admin', 'in_progress')
    const dialog = await ready(user)
    const before = vi.mocked(api.getDesignRequest).mock.calls.length
    await user.click(
      within(dialog).getByRole('button', { name: 'Giao thiết kế cho chủ nhà' })
    )
    await waitFor(() =>
      expect(appToast.error).toHaveBeenCalledWith(
        'Yêu cầu đã đổi trạng thái, đang tải lại…'
      )
    )
    await waitFor(() =>
      expect(vi.mocked(api.getDesignRequest).mock.calls.length).toBeGreaterThan(
        before
      )
    )
  })
})
