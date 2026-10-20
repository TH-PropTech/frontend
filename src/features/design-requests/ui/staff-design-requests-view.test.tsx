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
    assignee: null,
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

function renderView() {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  const user = userEvent.setup()
  render(
    <QueryClientProvider client={client}>
      <StaffDesignRequestsView />
    </QueryClientProvider>
  )
  return user
}

function setup(
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
  return renderView()
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
    setup('submitted')
    const row = await screen.findByTestId('design-request-r1')
    expect(within(row).getByText('Căn hộ Sunrise')).toBeInTheDocument()
    expect(within(row).getByText('Trần Thị B')).toBeInTheDocument()
    expect(within(row).getByText('Thiết kế mới')).toBeInTheDocument()
    expect(within(row).getByText('Chờ nhân viên nhận')).toBeInTheDocument()
  })

  it('applies the default status filter and toggles chips', async () => {
    const user = setup('submitted')
    await screen.findByTestId('design-request-r1')
    expect(api.listDesignRequestQueue).toHaveBeenCalledWith({
      statuses: [
        'submitted',
        'escalated',
        'in_progress',
        'changes_requested',
        'needs_info',
      ],
      page: 1,
      limit: 20,
    })
    await user.click(screen.getByRole('button', { name: 'Đã duyệt' }))
    await waitFor(() =>
      expect(api.listDesignRequestQueue).toHaveBeenLastCalledWith({
        statuses: [
          'submitted',
          'escalated',
          'in_progress',
          'changes_requested',
          'needs_info',
          'approved',
        ],
        page: 1,
        limit: 20,
      })
    )
  })

  it('flags a request waiting for staff longer than 48h as overdue', async () => {
    vi.mocked(api.listDesignRequestQueue).mockResolvedValue({
      items: [
        summary('r-old', 'submitted', {
          updatedAt: new Date(Date.now() - 72 * 3_600_000).toISOString(),
        }),
        summary('r-new', 'submitted', {
          updatedAt: new Date().toISOString(),
        }),
        summary('r-wait', 'delivered', {
          updatedAt: new Date(Date.now() - 72 * 3_600_000).toISOString(),
        }),
      ],
      total: 3,
      page: 1,
      limit: 20,
    })
    renderView()
    const old = await screen.findByTestId('design-request-r-old')
    expect(within(old).getByText('Quá hạn')).toBeInTheDocument()
    expect(
      within(screen.getByTestId('design-request-r-new')).queryByText('Quá hạn')
    ).toBeNull()
    // delivered đang chờ chủ nhà, không tính là quá hạn của nhân viên
    expect(
      within(screen.getByTestId('design-request-r-wait')).queryByText('Quá hạn')
    ).toBeNull()
  })

  it('paginates', async () => {
    vi.mocked(api.listDesignRequestQueue).mockResolvedValue({
      items: [summary('r1', 'submitted')],
      total: 45,
      page: 1,
      limit: 20,
    })
    const user = renderView()
    expect(await screen.findByText(/Trang 1\/3/)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Sau' }))
    await waitFor(() =>
      expect(api.listDesignRequestQueue).toHaveBeenLastCalledWith(
        expect.objectContaining({ page: 2 })
      )
    )
  })
})

describe('detail actions by status', () => {
  it('shows brief, attachments and the timeline', async () => {
    const user = setup('submitted')
    const dialog = await openDetail(user)
    expect(await within(dialog).findByText('Phong cách hiện đại')).toBeVisible()
    expect(within(dialog).getByText('Cần phòng khách rộng')).toBeVisible()
    expect(within(dialog).getByText('Chủ nhà gửi yêu cầu')).toBeVisible()
    expect(within(dialog).getAllByRole('link')[0]).toHaveAttribute(
      'target',
      '_blank'
    )
  })

  it('submitted: staff can claim, ask for info or reject (no escalate)', async () => {
    const user = setup('submitted')
    const dialog = await openDetail(user)
    expect(
      await within(dialog).findByRole('button', { name: 'Nhận thiết kế' })
    ).toBeVisible()
    expect(
      within(dialog).getByRole('button', { name: 'Yêu cầu bổ sung' })
    ).toBeVisible()
    expect(
      within(dialog).getByRole('button', { name: 'Từ chối' })
    ).toBeVisible()
    expect(
      within(dialog).queryByRole('button', { name: 'Chuyển quản trị viên' })
    ).toBeNull()
  })

  it('submitted: claiming starts the request and refetches', async () => {
    vi.mocked(api.startDesignRequest).mockResolvedValue(
      detail('r1', 'in_progress')
    )
    const user = setup('submitted')
    const dialog = await openDetail(user)
    const queueCalls = vi.mocked(api.listDesignRequestQueue).mock.calls.length
    await user.click(
      await within(dialog).findByRole('button', { name: 'Nhận thiết kế' })
    )
    await waitFor(() =>
      expect(api.startDesignRequest).toHaveBeenCalledWith('r1')
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
    const user = setup('submitted')
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
    const user = setup('submitted')
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
    const user = setup('needs_info')
    const dialog = await openDetail(user)
    expect(
      await within(dialog).findByText('Đang chờ chủ nhà bổ sung')
    ).toBeVisible()
    expect(within(dialog).queryByRole('button', { name: 'Từ chối' })).toBeNull()
  })

  it('legacy escalated: staff can claim or reject but not ask for info', async () => {
    const user = setup('escalated')
    const dialog = await openDetail(user)
    expect(
      await within(dialog).findByRole('button', { name: 'Nhận thiết kế' })
    ).toBeVisible()
    expect(
      within(dialog).getByRole('button', { name: 'Từ chối' })
    ).toBeVisible()
    expect(
      within(dialog).queryByRole('button', { name: 'Yêu cầu bổ sung' })
    ).toBeNull()
  })

  it('legacy escalated: staff starts the request', async () => {
    vi.mocked(api.startDesignRequest).mockResolvedValue(
      detail('r1', 'in_progress')
    )
    const user = setup('escalated')
    const dialog = await openDetail(user)
    await user.click(
      await within(dialog).findByRole('button', { name: 'Nhận thiết kế' })
    )
    await waitFor(() =>
      expect(api.startDesignRequest).toHaveBeenCalledWith('r1')
    )
  })

  it('changes_requested: shows latest feedback; staff can start again', async () => {
    const base = detail('r1', 'changes_requested')
    const user = setup('changes_requested', {
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

  it('in_progress: shows who is designing together with the designer and deliver controls', async () => {
    vi.mocked(listAdminDesigns).mockResolvedValue([])
    const user = setup('in_progress', {
      assignedAdminId: 's1',
      assignee: { id: 's1', name: 'Lê Văn C' },
    })
    const dialog = await openDetail(user)
    await within(dialog).findByText(
      'Đang do Lê Văn C thiết kế. Chỉ người nhận mới giao được.'
    )
    expect(
      within(dialog).getByRole('button', { name: 'Mở trình thiết kế 3D' })
    ).toBeVisible()
    expect(
      within(dialog).getByRole('button', {
        name: 'Giao thiết kế cho chủ nhà',
      })
    ).toBeVisible()
  })

  it('maps DESIGN_REQUEST_NOT_ASSIGNEE to a message and refetches', async () => {
    vi.mocked(listAdminDesigns).mockResolvedValue([
      {
        id: 'd-new',
        name: 'Bản mới ẩn',
        visible: false,
        updatedAt: '2026-01-10T00:00:00.000Z',
      },
    ] as never)
    vi.mocked(api.deliverDesignRequest).mockRejectedValue(
      apiError(403, 'DESIGN_REQUEST_NOT_ASSIGNEE')
    )
    const user = setup('in_progress')
    const dialog = await openDetail(user)
    const select = await within(dialog).findByLabelText(
      'Thiết kế giao cho chủ nhà'
    )
    await waitFor(() => expect(select).toHaveValue('d-new'))
    await user.click(
      within(dialog).getByRole('button', { name: 'Giao thiết kế cho chủ nhà' })
    )
    await waitFor(() =>
      expect(appToast.error).toHaveBeenCalledWith(
        'Yêu cầu này do đồng nghiệp khác nhận. Chỉ người nhận mới giao được thiết kế.'
      )
    )
  })

  it('maps a 403 to a permission message', async () => {
    vi.mocked(api.startDesignRequest).mockRejectedValue(
      new ApiClientError('forbidden', 403, null)
    )
    const user = setup('escalated')
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
    const user = setup('delivered')
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

describe('in_progress deliver', () => {
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
    const user = setup('in_progress')
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
    const user = setup('in_progress')
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
    const user = setup('in_progress')
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
    const user = setup('in_progress')
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
    const user = setup('in_progress')
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
