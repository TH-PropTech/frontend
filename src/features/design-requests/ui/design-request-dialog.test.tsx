import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ApiClientError } from '@/shared/api/api-client'
import type {
  DesignRequest,
  DesignRequestStatus,
  DesignRequestSummary,
} from '../api/design-requests-api'
import { DesignRequestDialog } from './design-request-dialog'

const api = vi.hoisted(() => ({
  createDesignRequest: vi.fn(),
  listMyDesignRequests: vi.fn(),
  getDesignRequest: vi.fn(),
  replyDesignRequest: vi.fn(),
  approveDesignRequest: vi.fn(),
  feedbackDesignRequest: vi.fn(),
  cancelDesignRequest: vi.fn(),
}))
vi.mock('../api/design-requests-api', () => api)

const floorplan = vi.hoisted(() => ({ listApartmentDesigns: vi.fn() }))
vi.mock('@/features/apartment-floorplan', () => ({
  listApartmentDesigns: floorplan.listApartmentDesigns,
  normalizeFloorplanDesigns: (input: unknown[]) => input,
  toFloorplanConfig: () => ({ apartmentId: 'apt-1' }),
  ApartmentFloorplanFrame: () => <div data-testid="floorplan-frame" />,
}))

vi.mock('@/features/apartment-posting/api/apartment-posting-api', () => ({
  uploadApartmentImages: vi.fn(),
}))

const toast = vi.hoisted(() => ({ success: vi.fn(), error: vi.fn() }))
vi.mock('@/shared/ui/app-toast', () => ({ appToast: toast }))

function summary(
  status: DesignRequestStatus,
  overrides: Partial<DesignRequestSummary> = {}
): DesignRequestSummary {
  return {
    id: 'req-1',
    apartmentId: 'apt-1',
    apartment: { id: 'apt-1', title: 'Căn hộ A' },
    landlordId: 'u-1',
    landlord: null,
    kind: 'create',
    targetDesignId: null,
    brief: 'Phong cách hiện đại',
    attachmentUrls: [],
    status,
    revision: 1,
    deliveredDesignId: null,
    assignedAdminId: null,
    assignee: null,
    createdAt: '2026-10-01T00:00:00.000Z',
    updatedAt: '2026-10-01T00:00:00.000Z',
    ...overrides,
  }
}

function detail(
  status: DesignRequestStatus,
  overrides: Partial<DesignRequest> = {}
): DesignRequest {
  return {
    ...summary(status),
    events: [
      {
        type: 'submitted',
        actorId: 'u-1',
        actorRole: 'landlord',
        actorName: 'Chủ nhà A',
        note: null,
        attachmentUrls: [],
        revision: 0,
        at: '2026-10-01T00:00:00.000Z',
      },
      {
        type: 'info_requested',
        actorId: 's-1',
        actorRole: 'staff',
        actorName: 'Nhân viên B',
        note: 'Cho biết ngân sách?',
        attachmentUrls: [],
        revision: 0,
        at: '2026-10-02T00:00:00.000Z',
      },
    ],
    deliveredDesign: null,
    ...overrides,
  }
}

function setActive(request: DesignRequest): void {
  api.listMyDesignRequests.mockResolvedValue({
    items: [request],
    total: 1,
    page: 1,
    limit: 50,
  })
  api.getDesignRequest.mockResolvedValue(request)
}

async function openDialog(): Promise<void> {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  render(
    <QueryClientProvider client={client}>
      <DesignRequestDialog
        apartmentId="apt-1"
        apartmentTitle="Căn hộ A"
        apartment={{ bedrooms: 2, bathrooms: 1, area: 60, furniture: 'Đủ' }}
      />
    </QueryClientProvider>
  )
  fireEvent.click(screen.getByRole('button', { name: 'Yêu cầu thiết kế 3D' }))
}

describe('DesignRequestDialog', () => {
  beforeEach(() => {
    Object.values(api).forEach(fn => fn.mockReset())
    floorplan.listApartmentDesigns.mockReset()
    toast.success.mockReset()
    toast.error.mockReset()
    api.listMyDesignRequests.mockResolvedValue({
      items: [],
      total: 0,
      page: 1,
      limit: 50,
    })
  })
  afterEach(() => cleanup())

  it('validates the brief then creates a new request', async () => {
    api.createDesignRequest.mockResolvedValue(summary('submitted'))
    await openDialog()

    const submit = await screen.findByRole('button', { name: 'Gửi yêu cầu' })
    fireEvent.click(submit)
    expect(
      await screen.findByText('Vui lòng mô tả yêu cầu thiết kế.')
    ).toBeTruthy()
    expect(api.createDesignRequest).not.toHaveBeenCalled()

    fireEvent.change(screen.getByLabelText('Mô tả yêu cầu'), {
      target: { value: '  Phòng khách rộng  ' },
    })
    fireEvent.click(submit)

    await waitFor(() =>
      expect(api.createDesignRequest).toHaveBeenCalledWith({
        apartmentId: 'apt-1',
        kind: 'create',
        brief: 'Phòng khách rộng',
      })
    )
  })

  it('requires a target design for edit requests and lists public designs', async () => {
    floorplan.listApartmentDesigns.mockResolvedValue([
      { id: 'd-1', name: 'Bắc Âu' },
    ])
    api.createDesignRequest.mockResolvedValue(summary('submitted'))
    await openDialog()

    fireEvent.click(await screen.findByLabelText('Chỉnh sửa thiết kế có sẵn'))
    fireEvent.change(screen.getByLabelText('Mô tả yêu cầu'), {
      target: { value: 'Đổi màu sàn' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Gửi yêu cầu' }))
    expect(
      await screen.findByText('Vui lòng chọn thiết kế cần chỉnh sửa.')
    ).toBeTruthy()

    fireEvent.change(await screen.findByLabelText('Thiết kế cần chỉnh sửa'), {
      target: { value: 'd-1' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Gửi yêu cầu' }))

    await waitFor(() =>
      expect(api.createDesignRequest).toHaveBeenCalledWith({
        apartmentId: 'apt-1',
        kind: 'edit',
        targetDesignId: 'd-1',
        brief: 'Đổi màu sàn',
      })
    )
  })

  it('maps DESIGN_REQUEST_ACTIVE_EXISTS to a Vietnamese message', async () => {
    api.createDesignRequest.mockRejectedValue(
      new ApiClientError('conflict', 409, {
        code: 'DESIGN_REQUEST_ACTIVE_EXISTS',
        message: 'x',
      })
    )
    await openDialog()
    fireEvent.change(await screen.findByLabelText('Mô tả yêu cầu'), {
      target: { value: 'abc' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Gửi yêu cầu' }))

    expect(
      await screen.findByText('Căn hộ này đã có yêu cầu đang xử lý.')
    ).toBeTruthy()
  })

  it('maps APARTMENT_ACCESS_DENIED and generic errors', async () => {
    api.createDesignRequest.mockRejectedValueOnce(
      new ApiClientError('forbidden', 403, {
        code: 'APARTMENT_ACCESS_DENIED',
        message: 'x',
      })
    )
    await openDialog()
    fireEvent.change(await screen.findByLabelText('Mô tả yêu cầu'), {
      target: { value: 'abc' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Gửi yêu cầu' }))
    expect(
      await screen.findByText('Bạn không có quyền gửi yêu cầu cho căn hộ này.')
    ).toBeTruthy()

    api.createDesignRequest.mockRejectedValueOnce(new Error('boom'))
    fireEvent.click(screen.getByRole('button', { name: 'Gửi yêu cầu' }))
    expect(
      await screen.findByText(
        'Không thể xử lý yêu cầu thiết kế 3D. Vui lòng thử lại.'
      )
    ).toBeTruthy()
  })

  it('shows past requests in a collapsed history when none is active', async () => {
    api.listMyDesignRequests.mockResolvedValue({
      items: [summary('approved', { brief: 'Bản cũ đã duyệt' })],
      total: 1,
      page: 1,
      limit: 50,
    })
    await openDialog()

    expect(await screen.findByText('Lịch sử yêu cầu')).toBeTruthy()
    expect(screen.getByText('Bản cũ đã duyệt')).toBeTruthy()
    expect(screen.getByText('Đã duyệt')).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Gửi yêu cầu' })).toBeTruthy()
  })

  it('renders the active request status, brief and timeline', async () => {
    setActive(detail('in_progress'))
    await openDialog()

    expect(await screen.findByText('Đang thiết kế')).toBeTruthy()
    expect(screen.getByText('Phong cách hiện đại')).toBeTruthy()
    expect(screen.getByText('Yêu cầu bổ sung thông tin')).toBeTruthy()
    expect(screen.getByText('Cho biết ngân sách?')).toBeTruthy()
    expect(screen.getByText('Nhân viên B · Nhân viên')).toBeTruthy()
    expect(screen.queryByRole('button', { name: 'Gửi yêu cầu' })).toBeNull()
  })

  it('replies to a needs_info request and requires a note', async () => {
    setActive(detail('needs_info'))
    api.replyDesignRequest.mockResolvedValue(detail('submitted'))
    await openDialog()

    expect(await screen.findByText('Cần bổ sung thông tin')).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Gửi bổ sung' }))
    expect(await screen.findByText('Vui lòng nhập nội dung.')).toBeTruthy()
    expect(api.replyDesignRequest).not.toHaveBeenCalled()

    fireEvent.change(screen.getByLabelText('Nội dung bổ sung'), {
      target: { value: 'Ngân sách 50 triệu' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Gửi bổ sung' }))

    await waitFor(() =>
      expect(api.replyDesignRequest).toHaveBeenCalledWith('req-1', {
        note: 'Ngân sách 50 triệu',
      })
    )
  })

  const delivered = (): DesignRequest =>
    detail('delivered', {
      deliveredDesignId: 'd-9',
      deliveredDesign: {
        id: 'd-9',
        name: 'Thiết kế Bắc Âu',
        description: '',
        theme: 'modern',
        palette: {},
        furnishing: null,
        defaultHour: 10,
        layout: { items: {}, extras: [] },
        visible: false,
        order: 0,
        updatedAt: '2026-10-03T00:00:00.000Z',
      },
    } as Partial<DesignRequest>)

  it('previews the delivered design and approves after confirming', async () => {
    setActive(delivered())
    api.approveDesignRequest.mockResolvedValue(detail('approved'))
    await openDialog()

    expect(await screen.findByTestId('floorplan-frame')).toBeTruthy()
    fireEvent.click(
      screen.getByRole('button', { name: 'Đúng ý – Duyệt thiết kế' })
    )
    expect(api.approveDesignRequest).not.toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button', { name: 'Xác nhận duyệt' }))

    await waitFor(() =>
      expect(api.approveDesignRequest).toHaveBeenCalledWith('req-1')
    )
  })

  it('sends feedback on a delivered design with a required note', async () => {
    setActive(delivered())
    api.feedbackDesignRequest.mockResolvedValue(detail('changes_requested'))
    await openDialog()

    fireEvent.click(
      await screen.findByRole('button', { name: 'Chưa ưng ý – Gửi phản hồi' })
    )
    fireEvent.click(screen.getByRole('button', { name: 'Gửi phản hồi' }))
    expect(await screen.findByText('Vui lòng nhập nội dung.')).toBeTruthy()

    fireEvent.change(screen.getByLabelText('Nội dung phản hồi'), {
      target: { value: 'Đổi màu sofa' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Gửi phản hồi' }))

    await waitFor(() =>
      expect(api.feedbackDesignRequest).toHaveBeenCalledWith('req-1', {
        note: 'Đổi màu sofa',
      })
    )
  })

  it('cancels a non-terminal request after confirmation', async () => {
    setActive(detail('submitted'))
    api.cancelDesignRequest.mockResolvedValue(detail('cancelled'))
    await openDialog()

    fireEvent.click(await screen.findByRole('button', { name: 'Hủy yêu cầu' }))
    expect(api.cancelDesignRequest).not.toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button', { name: 'Xác nhận hủy' }))

    await waitFor(() =>
      expect(api.cancelDesignRequest).toHaveBeenCalledWith('req-1')
    )
  })
})
