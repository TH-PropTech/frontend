import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ApiClientError } from '@/shared/api'
import * as api from '../api/occupant-requests-api'
import { OccupantRequestsPanel } from './occupant-requests-panel'

vi.mock('../api/occupant-requests-api', () => ({
  getOccupantRequests: vi.fn(),
  createOccupantRequest: vi.fn(),
  decideOccupantRequest: vi.fn(),
  respondToOccupantCounter: vi.fn(),
}))
vi.mock('@/shared/api/upload-images', () => ({
  uploadImages: vi.fn().mockResolvedValue(['https://cdn.example.com/id.jpg']),
}))
vi.mock('@/entities/legal-source', async () => {
  const actual = await vi.importActual<object>('@/entities/legal-source')
  return { ...actual, LegalReferences: () => null }
})

const person = {
  fullName: 'Trần Thị B',
  birthYear: 2000,
  relationship: 'Chị',
  idPhotoUrls: ['https://cdn.example.com/id.jpg'],
}

const request = (
  over: Partial<api.OccupantRequest> = {}
): api.OccupantRequest => ({
  _id: 'req-1',
  contractId: 'c1',
  occupants: [person],
  moveInDate: '2031-01-10T00:00:00.000Z',
  reason: 'Chị gái chuyển lên ở cùng',
  proposedSurcharge: 300000,
  counterSurcharge: null,
  agreedSurcharge: null,
  status: 'pending-landlord',
  decisionReason: null,
  amendmentId: null,
  auditTrail: [],
  createdAt: '2030-12-01T00:00:00.000Z',
  ...over,
})

const list = (
  over: Partial<api.OccupantRequestList> = {}
): api.OccupantRequestList => ({
  currentOccupants: 2,
  maxOccupants: 4,
  openRequest: null,
  requests: [],
  ...over,
})

function renderPanel(
  role: 'tenant' | 'landlord',
  contractActive = true,
  onChanged?: () => unknown
) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  render(
    <QueryClientProvider client={client}>
      <OccupantRequestsPanel
        contractId="c1"
        role={role}
        contractActive={contractActive}
        currentRent={8_000_000}
        onChanged={onChanged}
      />
    </QueryClientProvider>
  )
}

async function fillPerson(): Promise<void> {
  await screen.findByRole('form', { name: 'Yêu cầu thêm người ở' })
  fireEvent.change(screen.getByLabelText('Họ tên'), {
    target: { value: 'Trần Thị B' },
  })
  fireEvent.change(screen.getByLabelText('Năm sinh'), {
    target: { value: '2000' },
  })
  fireEvent.change(screen.getByLabelText('Quan hệ với người thuê'), {
    target: { value: 'Chị' },
  })
}

describe('OccupantRequestsPanel', () => {
  beforeEach(() => vi.clearAllMocks())

  it('shows loading, then the empty state with the current head-count', async () => {
    vi.mocked(api.getOccupantRequests).mockResolvedValue(list())
    renderPanel('landlord')
    expect(screen.getByRole('status').textContent).toMatch(/Đang tải/)
    expect(
      await screen.findByText(/Chưa có yêu cầu thêm người ở nào/)
    ).toBeDefined()
    expect(
      screen.getByText(/Hiện có 2 người, căn hộ cho phép tối đa 4/)
    ).toBeDefined()
  })

  it('shows an error with retry when loading fails', async () => {
    vi.mocked(api.getOccupantRequests).mockRejectedValue(new Error('x'))
    renderPanel('tenant')
    expect(await screen.findByRole('alert')).toBeDefined()
    fireEvent.click(screen.getByRole('button', { name: 'Thử lại' }))
    await waitFor(() =>
      expect(api.getOccupantRequests).toHaveBeenCalledTimes(2)
    )
  })

  it('lets the tenant submit a request and shows the new rent in the summary', async () => {
    vi.mocked(api.getOccupantRequests).mockResolvedValue(list())
    vi.mocked(api.createOccupantRequest).mockResolvedValue(request())
    const onChanged = vi.fn()
    renderPanel('tenant', true, onChanged)
    fireEvent.click(
      await screen.findByRole('button', { name: /Gửi yêu cầu thêm người ở/ })
    )
    await fillPerson()
    fireEvent.change(screen.getByLabelText('Chọn ảnh giấy tờ tùy thân'), {
      target: {
        files: [
          new File([new Uint8Array(5)], 'id.jpg', { type: 'image/jpeg' }),
        ],
      },
    })
    await screen.findByAltText('Ảnh giấy tờ tùy thân 1')
    fireEvent.change(screen.getByLabelText(/Ngày dự kiến chuyển vào/), {
      target: { value: '2031-01-10' },
    })
    fireEvent.change(screen.getByLabelText(/Phụ phí hằng tháng đề xuất/), {
      target: { value: '300000' },
    })
    fireEvent.change(screen.getByLabelText('Lý do'), {
      target: { value: 'Chị gái chuyển lên ở cùng' },
    })
    const summary = screen.getByTestId('occupant-request-summary').textContent
    expect(summary).toContain('3 / tối đa 4')
    expect(summary).toContain('8.300.000')
    fireEvent.click(screen.getByRole('button', { name: 'Gửi yêu cầu' }))
    await waitFor(() => expect(api.createOccupantRequest).toHaveBeenCalled())
    expect(
      vi.mocked(api.createOccupantRequest).mock.calls[0]?.[1]
    ).toMatchObject({
      moveInDate: '2031-01-10',
      proposedSurcharge: 300000,
      occupants: [
        { fullName: 'Trần Thị B', birthYear: 2000, relationship: 'Chị' },
      ],
    })
    await waitFor(() => expect(onChanged).toHaveBeenCalled())
  })

  it('names every missing field instead of submitting', async () => {
    vi.mocked(api.getOccupantRequests).mockResolvedValue(list())
    renderPanel('tenant')
    fireEvent.click(
      await screen.findByRole('button', { name: /Gửi yêu cầu thêm người ở/ })
    )
    fireEvent.click(await screen.findByRole('button', { name: 'Gửi yêu cầu' }))
    expect(screen.getByText('Vui lòng nhập họ tên người ở.')).toBeDefined()
    expect(
      screen.getByText('Vui lòng tải ảnh giấy tờ của người ở.')
    ).toBeDefined()
    expect(screen.getByText('Vui lòng chọn ngày chuyển vào.')).toBeDefined()
    expect(screen.getByText('Vui lòng nhập lý do.')).toBeDefined()
    expect(api.createOccupantRequest).not.toHaveBeenCalled()
  })

  it('explains the limit and offers no form when the apartment is full', async () => {
    vi.mocked(api.getOccupantRequests).mockResolvedValue(
      list({ currentOccupants: 4, maxOccupants: 4 })
    )
    renderPanel('tenant')
    fireEvent.click(
      await screen.findByRole('button', { name: /Gửi yêu cầu thêm người ở/ })
    )
    expect(screen.getByTestId('occupant-limit-reached').textContent).toContain(
      'Căn hộ này cho phép tối đa 4 người ở'
    )
    expect(screen.queryByRole('form')).toBeNull()
  })

  it('stops the tenant from adding more people than the apartment allows', async () => {
    vi.mocked(api.getOccupantRequests).mockResolvedValue(
      list({ currentOccupants: 3, maxOccupants: 4 })
    )
    renderPanel('tenant')
    fireEvent.click(
      await screen.findByRole('button', { name: /Gửi yêu cầu thêm người ở/ })
    )
    const add = await screen.findByRole('button', { name: /Thêm người$/ })
    expect((add as HTMLButtonElement).disabled).toBe(true)
  })

  it('does not offer a new request to a tenant of an inactive contract', async () => {
    vi.mocked(api.getOccupantRequests).mockResolvedValue(list())
    renderPanel('tenant', false)
    await screen.findByText(/Chưa có yêu cầu thêm người ở nào/)
    expect(
      screen.queryByRole('button', { name: /Gửi yêu cầu thêm người ở/ })
    ).toBeNull()
  })

  it('lets the landlord approve, counter or reject an open request', async () => {
    vi.mocked(api.getOccupantRequests).mockResolvedValue(
      list({ openRequest: request(), requests: [request()] })
    )
    vi.mocked(api.decideOccupantRequest).mockResolvedValue(request())
    renderPanel('landlord')
    fireEvent.click(
      await screen.findByRole('button', {
        name: /Đồng ý \(phụ phí 300.000 đ\)/,
      })
    )
    await waitFor(() =>
      expect(api.decideOccupantRequest).toHaveBeenCalledWith('c1', 'req-1', {
        action: 'approve',
      })
    )

    fireEvent.click(screen.getByRole('button', { name: 'Đề xuất lại phụ phí' }))
    fireEvent.change(screen.getByLabelText(/Phụ phí đề xuất lại/), {
      target: { value: '500000' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Gửi đề xuất' }))
    await waitFor(() =>
      expect(api.decideOccupantRequest).toHaveBeenLastCalledWith(
        'c1',
        'req-1',
        {
          action: 'counter',
          counterSurcharge: 500000,
        }
      )
    )

    fireEvent.click(screen.getByRole('button', { name: 'Từ chối' }))
    fireEvent.change(screen.getByLabelText('Lý do từ chối'), {
      target: { value: 'Nội quy tòa nhà' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Xác nhận từ chối' }))
    await waitFor(() =>
      expect(api.decideOccupantRequest).toHaveBeenLastCalledWith(
        'c1',
        'req-1',
        {
          action: 'reject',
          reason: 'Nội quy tòa nhà',
        }
      )
    )
  })

  it('lets the tenant answer the landlord counter-offer', async () => {
    const countered = request({
      status: 'pending-tenant',
      counterSurcharge: 500000,
    })
    vi.mocked(api.getOccupantRequests).mockResolvedValue(
      list({ openRequest: countered, requests: [countered] })
    )
    vi.mocked(api.respondToOccupantCounter).mockResolvedValue(countered)
    renderPanel('tenant')
    fireEvent.click(
      await screen.findByRole('button', { name: /Chấp nhận phụ phí 500.000 đ/ })
    )
    await waitFor(() =>
      expect(api.respondToOccupantCounter).toHaveBeenCalledWith(
        'c1',
        'req-1',
        true
      )
    )
    fireEvent.click(screen.getByRole('button', { name: 'Không đồng ý' }))
    await waitFor(() =>
      expect(api.respondToOccupantCounter).toHaveBeenLastCalledWith(
        'c1',
        'req-1',
        false
      )
    )
  })

  it('maps a stale-request conflict to plain Vietnamese', async () => {
    vi.mocked(api.getOccupantRequests).mockResolvedValue(
      list({ openRequest: request(), requests: [request()] })
    )
    vi.mocked(api.decideOccupantRequest).mockRejectedValue(
      new ApiClientError('x', 409, {
        code: 'OCCUPANT_REQUEST_NOT_PENDING',
        message: 'x',
      })
    )
    renderPanel('landlord')
    fireEvent.click(
      await screen.findByRole('button', { name: /Đồng ý \(phụ phí/ })
    )
    expect(
      await screen.findByText(
        'Yêu cầu này đã được xử lý ở nơi khác. Hãy tải lại trang.'
      )
    ).toBeDefined()
  })
})
