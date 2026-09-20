import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { SchedulesView } from './schedules-view'
import { apiClient } from '@/shared/api/api-client'

vi.mock('@/shared/api/api-client', () => ({
  apiClient: {
    get: vi.fn(),
  },
}))

const mockBookingsResponse = {
  items: [
    {
      _id: '507f1f77bcf86cd799439011',
      apartmentId: 'apt-001',
      apartmentTitle: 'Căn hộ Vinhomes Central Park',
      landlordId: 'landlord-123',
      tenantId: 'tenant-456',
      tenantName: 'Nguyễn Văn A',
      tenantPhone: '0901234567',
      visitAt: '2026-09-25T10:00:00.000Z',
      method: 'onsite',
      status: 'pending',
      rejectedReason: null,
      note: 'Khách muốn xem trước 10h',
      landlordName: 'Trần Văn B',
      landlordPhone: '0911222333',
      tenantEmail: 'a@example.com',
      createdAt: '2026-09-19T08:00:00.000Z',
    },
    {
      _id: '507f1f77bcf86cd799439022',
      apartmentId: 'apt-002',
      apartmentTitle: 'Căn hộ Masteri Thảo Điền',
      landlordId: 'landlord-789',
      tenantId: 'tenant-101',
      tenantName: 'Lê Thị C',
      tenantPhone: '0988777666',
      visitAt: '2026-09-26T14:00:00.000Z',
      method: 'video',
      status: 'rejected',
      rejectedReason: 'Chủ nhà bận công tác đột xuất',
      note: null,
      landlordName: 'Phạm Văn D',
      landlordPhone: '0933444555',
      tenantEmail: 'c@example.com',
      createdAt: '2026-09-19T09:00:00.000Z',
    },
  ],
  total: 25,
  page: 1,
  limit: 20,
  totalPages: 2,
  statusCounts: {
    pending: 5,
    confirmed: 10,
    rejected: 3,
    cancelled: 4,
    completed: 3,
  },
}

describe('SchedulesView', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  beforeEach(() => {
    vi.mocked(apiClient.get).mockResolvedValue(mockBookingsResponse)
  })

  it('render danh sách lịch hẹn với ID rút gọn 6 ký tự, ghi chú và badge đếm từ statusCounts', async () => {
    render(<SchedulesView />)

    // Verify initial fetch
    await waitFor(() => {
      expect(apiClient.get).toHaveBeenCalledWith(
        '/bookings?status=pending&page=1&limit=20'
      )
    })

    // Verify items rendered
    expect(
      await screen.findByText('Căn hộ Vinhomes Central Park')
    ).toBeInTheDocument()
    expect(screen.getByText('Căn hộ Masteri Thảo Điền')).toBeInTheDocument()

    // Verify short ID (last 6 chars) and tooltip title
    const shortIdElement = screen.getByText('#439011')
    expect(shortIdElement).toBeInTheDocument()
    expect(shortIdElement).toHaveAttribute('title', '507f1f77bcf86cd799439011')

    // Verify note is rendered
    expect(screen.getByText('Khách muốn xem trước 10h')).toBeInTheDocument()

    // Verify filter tabs with counts
    expect(screen.getByText('Chờ duyệt (5)')).toBeInTheDocument()
    expect(screen.getByText('Đã xác nhận (10)')).toBeInTheDocument()
    expect(screen.getByText('Bị từ chối (3)')).toBeInTheDocument()
    expect(screen.getByText('Đã hủy (4)')).toBeInTheDocument()
    expect(screen.getByText('Hoàn thành (3)')).toBeInTheDocument()
    expect(screen.getByText('Tất cả (25)')).toBeInTheDocument()

    // Verify pagination indicator
    expect(
      screen.getByText(/Trang 1 \/ 2 \(Tổng 25 lịch hẹn\)/)
    ).toBeInTheDocument()
  })

  it('đổi tab thì gọi API với status đúng và reset page về 1', async () => {
    render(<SchedulesView />)

    await waitFor(() => {
      expect(apiClient.get).toHaveBeenCalledTimes(1)
    })

    // Click "Đã xác nhận" filter button
    const confirmedTab = screen.getByText('Đã xác nhận (10)')
    fireEvent.click(confirmedTab)

    await waitFor(() => {
      expect(apiClient.get).toHaveBeenCalledWith(
        '/bookings?status=confirmed&page=1&limit=20'
      )
    })

    // Click "Tất cả" filter button (should omit status param)
    const allTab = screen.getByText('Tất cả (25)')
    fireEvent.click(allTab)

    await waitFor(() => {
      expect(apiClient.get).toHaveBeenCalledWith('/bookings?page=1&limit=20')
    })
  })

  it('hiển thị lý do từ chối (rejectedReason) khi lịch bị từ chối', async () => {
    render(<SchedulesView />)

    await waitFor(() => {
      expect(
        screen.getByText('Chủ nhà bận công tác đột xuất')
      ).toBeInTheDocument()
    })

    expect(screen.getByText('Lý do từ chối:')).toBeInTheDocument()
  })

  it('điều hướng phân trang Trước/Sau kích hoạt gọi API với page tương ứng', async () => {
    render(<SchedulesView />)

    await waitFor(() => {
      expect(screen.getByText('Sau')).toBeInTheDocument()
    })

    // Click "Sau"
    const nextButton = screen.getByText('Sau')
    fireEvent.click(nextButton)

    await waitFor(() => {
      expect(apiClient.get).toHaveBeenCalledWith(
        '/bookings?status=pending&page=2&limit=20'
      )
    })
  })

  it('tải lại danh sách khi nhấn nút "Làm mới"', async () => {
    render(<SchedulesView />)

    await waitFor(() => {
      expect(apiClient.get).toHaveBeenCalledTimes(1)
    })

    const refreshButton = screen.getByTitle('Làm mới danh sách')
    fireEvent.click(refreshButton)

    await waitFor(() => {
      expect(apiClient.get).toHaveBeenCalledTimes(2)
    })
  })

  it('hiển thị thông báo khi danh sách trống', async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce({
      items: [],
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 0,
      statusCounts: {
        pending: 0,
        confirmed: 0,
        rejected: 0,
        cancelled: 0,
        completed: 0,
      },
    })

    render(<SchedulesView />)

    expect(
      await screen.findByText('Không có lịch xem nhà nào trong danh sách.')
    ).toBeInTheDocument()
  })

  it('hiển thị thông báo lỗi và hỗ trợ bấm "Thử lại"', async () => {
    vi.mocked(apiClient.get).mockRejectedValueOnce(
      new Error('Mạng bị gián đoạn')
    )

    render(<SchedulesView />)

    expect(await screen.findByText('Mạng bị gián đoạn')).toBeInTheDocument()

    // Mock next call as success
    vi.mocked(apiClient.get).mockResolvedValueOnce(mockBookingsResponse)

    const retryButton = screen.getByText('Thử lại')
    fireEvent.click(retryButton)

    expect(
      await screen.findByText('Căn hộ Vinhomes Central Park')
    ).toBeInTheDocument()
  })
})
