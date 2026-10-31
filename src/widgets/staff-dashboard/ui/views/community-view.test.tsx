import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { CommunityView } from './community-view'
import { apiClient } from '@/shared/api/api-client'

vi.mock('@/shared/api/api-client', () => ({
  apiClient: {
    get: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}))

vi.mock('@/shared/lib/permissions', () => ({
  useCan: () => () => true,
}))

vi.mock('@/shared/ui/app-toast', () => ({
  appToast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}))

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ComponentProps<'img'>) => <img alt="" {...props} />,
}))

const MOCK_PENDING_POST = {
  _id: 'post-1',
  authorName: 'Nguyễn Văn A',
  authorRole: 'tenant',
  title: 'Hỏi về quy định gửi xe',
  content: 'Cho mình hỏi chung cư có chỗ để xe điện không?',
  projectName: 'Chung cư Vinhomes Central Park',
  topic: 'qa',
  status: 'pending',
  createdAt: '2026-10-30T10:00:00.000Z',
}

const MOCK_APPROVED_POST = {
  _id: 'post-2',
  authorName: 'Trần Thị B',
  authorRole: 'landlord',
  title: 'Đánh giá môi trường sống',
  content: 'Khuôn viên rất thoáng mát và an ninh tốt.',
  projectName: 'Chung cư Masteri Thảo Điền',
  topic: 'review',
  status: 'approved',
  createdAt: '2026-10-29T10:00:00.000Z',
}

const MOCK_REJECTED_POST = {
  _id: 'post-3',
  authorName: 'Lê Văn C',
  authorRole: 'tenant',
  title: 'Cần tìm bạn cùng phòng',
  content: 'Mình cần tìm bạn nữ ở ghép căn 2PN.',
  projectName: 'Chung cư Landmark 81',
  topic: 'roommate',
  status: 'rejected',
  rejectReason: 'Nội dung vi phạm quy định đăng tin',
  createdAt: '2026-10-28T10:00:00.000Z',
}

describe('CommunityView', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(apiClient.get).mockImplementation((url: string) => {
      if (url === '/community/posts/pending') {
        return Promise.resolve([MOCK_PENDING_POST]) as never
      }
      if (url === '/community/posts') {
        return Promise.resolve([MOCK_APPROVED_POST]) as never
      }
      if (url === '/community/posts/rejected') {
        return Promise.resolve([MOCK_REJECTED_POST]) as never
      }
      return Promise.resolve([]) as never
    })
  })

  it('renders pending posts by default without leaking raw enums', async () => {
    const { container } = render(<CommunityView />)

    expect(
      await screen.findByText('Hỏi về quy định gửi xe')
    ).toBeInTheDocument()
    expect(screen.getByText('Hỏi đáp')).toBeInTheDocument()
    expect(screen.getByText('Chờ duyệt')).toBeInTheDocument()
    expect(screen.getByText('Khách thuê')).toBeInTheDocument()

    // Assert no raw enum leak
    expect(container.textContent).not.toMatch(/[A-Z]{3,}(_[A-Z0-9]+){2,}/)
    expect(container.textContent).not.toMatch(/\b(tenant|landlord|roommate)\b/)
  })

  it('filters posts when clicking filter tabs', async () => {
    render(<CommunityView />)

    expect(
      await screen.findByText('Hỏi về quy định gửi xe')
    ).toBeInTheDocument()

    // Switch to Đã duyệt
    fireEvent.click(screen.getByRole('button', { name: 'Đã duyệt' }))
    expect(
      await screen.findByText('Đánh giá môi trường sống')
    ).toBeInTheDocument()
    expect(screen.queryByText('Hỏi về quy định gửi xe')).not.toBeInTheDocument()

    // Switch to Đã từ chối
    fireEvent.click(screen.getByRole('button', { name: 'Đã từ chối' }))
    expect(
      await screen.findByText('Cần tìm bạn cùng phòng')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Nội dung vi phạm quy định đăng tin')
    ).toBeInTheDocument()
  })

  it('approves a pending post when clicking Duyệt bài', async () => {
    vi.mocked(apiClient.patch).mockResolvedValue({} as never)

    render(<CommunityView />)

    expect(
      await screen.findByText('Hỏi về quy định gửi xe')
    ).toBeInTheDocument()
    const approveBtn = screen.getByRole('button', { name: 'Duyệt bài' })
    fireEvent.click(approveBtn)

    await waitFor(() => {
      expect(apiClient.patch).toHaveBeenCalledWith(
        '/community/posts/post-1/status',
        { status: 'approved' }
      )
    })
  })

  it('opens reject dialog and sends rejectReason on rejection', async () => {
    vi.mocked(apiClient.patch).mockResolvedValue({} as never)

    render(<CommunityView />)

    expect(
      await screen.findByText('Hỏi về quy định gửi xe')
    ).toBeInTheDocument()
    const rejectBtn = screen.getByRole('button', { name: 'Từ chối' })
    fireEvent.click(rejectBtn)

    expect(screen.getByText('Lý do từ chối bài viết')).toBeInTheDocument()

    const textarea = screen.getByPlaceholderText(
      /Bài đăng chứa ngôn từ không phù hợp/
    )
    fireEvent.change(textarea, { target: { value: 'Spam quảng cáo' } })

    const confirmRejectBtn = screen.getByRole('button', {
      name: 'Xác nhận từ chối',
    })
    fireEvent.click(confirmRejectBtn)

    await waitFor(() => {
      expect(apiClient.patch).toHaveBeenCalledWith(
        '/community/posts/post-1/status',
        {
          status: 'rejected',
          rejectReason: 'Spam quảng cáo',
        }
      )
    })
  })

  it('renders AdminErrorState when loading posts fails', async () => {
    vi.mocked(apiClient.get).mockRejectedValue(
      new Error('Network error') as never
    )

    render(<CommunityView />)

    expect(
      await screen.findByText('Lỗi tải bài viết cộng đồng')
    ).toBeInTheDocument()
    expect(screen.getByText('Network error')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Thử lại' })).toBeInTheDocument()
  })
})
