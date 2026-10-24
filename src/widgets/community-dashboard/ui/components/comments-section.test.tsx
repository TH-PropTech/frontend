import * as React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { apiClient, ApiClientError } from '@/shared/api/api-client'
import { appToast } from '@/shared/ui/app-toast'
import { CommentsSection } from './comments-section'

vi.mock('@/shared/api/api-client', async importOriginal => {
  const actual =
    await importOriginal<typeof import('@/shared/api/api-client')>()
  return {
    ...actual,
    apiClient: { get: vi.fn(), post: vi.fn(), delete: vi.fn() },
  }
})
vi.mock('@/shared/ui/app-toast', () => ({
  appToast: { success: vi.fn(), error: vi.fn(), info: vi.fn() },
}))

const comment = (id: string, extra: Record<string, unknown> = {}) => ({
  _id: id,
  authorId: 'u-other',
  parentId: null,
  authorName: 'Lê Thị B',
  authorRole: 'tenant',
  content: `Nội dung ${id}`,
  createdAt: '2026-09-20T08:00:00.000Z',
  ...extra,
})

function renderSection(
  props: Partial<React.ComponentProps<typeof CommentsSection>> = {}
) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  const callbacks = { onCommentAdded: vi.fn(), onCommentRemoved: vi.fn() }
  render(
    <QueryClientProvider client={queryClient}>
      <CommentsSection postId="post-1" {...callbacks} {...props} />
    </QueryClientProvider>
  )
  return callbacks
}

beforeEach(() => {
  vi.mocked(apiClient.get).mockReset()
  vi.mocked(apiClient.post).mockReset()
  vi.mocked(apiClient.delete).mockReset()
  vi.mocked(appToast.error).mockReset()
})

afterEach(() => {
  cleanup()
})

describe('CommentsSection loading states', () => {
  it('shows the empty message when there are no comments', async () => {
    vi.mocked(apiClient.get).mockResolvedValue([])
    renderSection()

    expect(await screen.findByText(/Chưa có bình luận nào/)).toBeInTheDocument()
    expect(screen.getByText('Bình luận (0)')).toBeInTheDocument()
  })

  it('shows a loading message then the comments with localized roles', async () => {
    vi.mocked(apiClient.get).mockResolvedValue([comment('c1')])
    renderSection()

    expect(screen.getByText('Đang tải bình luận...')).toBeInTheDocument()
    expect(await screen.findByText('Nội dung c1')).toBeInTheDocument()
    expect(screen.getByText('Khách thuê')).toBeInTheDocument()
  })

  it('shows an error with retry instead of an empty list when loading fails', async () => {
    vi.mocked(apiClient.get).mockRejectedValueOnce(new Error('down'))
    renderSection()

    expect(
      await screen.findByText(/Không thể tải bình luận/)
    ).toBeInTheDocument()

    vi.mocked(apiClient.get).mockResolvedValue([comment('c1')])
    fireEvent.click(screen.getByRole('button', { name: 'Thử lại' }))
    expect(await screen.findByText('Nội dung c1')).toBeInTheDocument()
  })

  it('nests replies under their parent', async () => {
    vi.mocked(apiClient.get).mockResolvedValue([
      comment('c1'),
      comment('c2', { parentId: 'c1' }),
    ])
    renderSection()

    expect(await screen.findByText('Nội dung c2')).toBeInTheDocument()
    expect(screen.getByText('Bình luận (2)')).toBeInTheDocument()
  })
})

describe('CommentsSection posting', () => {
  it('asks guests to sign in and hides the reply action', async () => {
    vi.mocked(apiClient.get).mockResolvedValue([comment('c1')])
    const onAuthRequired = vi.fn()
    renderSection({ isAuthenticated: false, onAuthRequired })

    await screen.findByText('Nội dung c1')
    fireEvent.click(screen.getByRole('button', { name: 'đăng nhập' }))

    expect(onAuthRequired).toHaveBeenCalledOnce()
    expect(
      screen.queryByRole('button', { name: 'Trả lời' })
    ).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Viết bình luận')).not.toBeInTheDocument()
  })

  it('posts a trimmed comment, appends it and notifies the parent', async () => {
    vi.mocked(apiClient.get).mockResolvedValue([])
    vi.mocked(apiClient.post).mockResolvedValue(
      comment('new', { content: 'Xin chào', authorId: 'u1' })
    )
    const { onCommentAdded } = renderSection({ currentUser: { _id: 'u1' } })
    await screen.findByText(/Chưa có bình luận nào/)

    const input = screen.getByLabelText('Viết bình luận')
    fireEvent.change(input, { target: { value: '  Xin chào  ' } })
    fireEvent.click(screen.getByRole('button', { name: 'Bình luận' }))

    expect(await screen.findByText('Xin chào')).toBeInTheDocument()
    expect(apiClient.post).toHaveBeenCalledWith(
      '/community/posts/post-1/comments',
      {
        content: 'Xin chào',
        parentId: null,
      }
    )
    expect(onCommentAdded).toHaveBeenCalledOnce()
    expect(input).toHaveValue('')
  })

  it('ignores blank submissions', async () => {
    vi.mocked(apiClient.get).mockResolvedValue([])
    renderSection()
    await screen.findByText(/Chưa có bình luận nào/)

    expect(screen.getByRole('button', { name: 'Bình luận' })).toBeDisabled()
    fireEvent.change(screen.getByLabelText('Viết bình luận'), {
      target: { value: '   ' },
    })
    expect(screen.getByRole('button', { name: 'Bình luận' })).toBeDisabled()
    expect(apiClient.post).not.toHaveBeenCalled()
  })

  it('sends a reply with its parent id', async () => {
    vi.mocked(apiClient.get).mockResolvedValue([comment('c1')])
    vi.mocked(apiClient.post).mockResolvedValue(
      comment('r1', { parentId: 'c1', content: 'Đồng ý' })
    )
    renderSection()
    await screen.findByText('Nội dung c1')

    fireEvent.click(screen.getByRole('button', { name: 'Trả lời' }))
    fireEvent.change(screen.getByLabelText('Trả lời Lê Thị B'), {
      target: { value: 'Đồng ý' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Gửi' }))

    expect(await screen.findByText('Đồng ý')).toBeInTheDocument()
    expect(apiClient.post).toHaveBeenCalledWith(
      '/community/posts/post-1/comments',
      {
        content: 'Đồng ý',
        parentId: 'c1',
      }
    )
  })

  it('cancels a reply draft', async () => {
    vi.mocked(apiClient.get).mockResolvedValue([comment('c1')])
    renderSection()
    await screen.findByText('Nội dung c1')

    fireEvent.click(screen.getByRole('button', { name: 'Trả lời' }))
    fireEvent.click(screen.getByRole('button', { name: 'Hủy' }))

    expect(screen.queryByLabelText('Trả lời Lê Thị B')).not.toBeInTheDocument()
  })

  it('keeps the draft and shows the server message when posting fails', async () => {
    vi.mocked(apiClient.get).mockResolvedValue([])
    vi.mocked(apiClient.post).mockRejectedValue(
      new ApiClientError('Bài viết chưa được duyệt', 404, null)
    )
    const { onCommentAdded } = renderSection()
    await screen.findByText(/Chưa có bình luận nào/)

    const input = screen.getByLabelText('Viết bình luận')
    fireEvent.change(input, { target: { value: 'Thử' } })
    fireEvent.click(screen.getByRole('button', { name: 'Bình luận' }))

    await waitFor(() =>
      expect(appToast.error).toHaveBeenCalledWith('Bài viết chưa được duyệt')
    )
    expect(input).toHaveValue('Thử')
    expect(onCommentAdded).not.toHaveBeenCalled()
  })
})

describe('CommentsSection deletion', () => {
  it('lets staff remove a comment and its replies, reporting the full count', async () => {
    vi.mocked(apiClient.get).mockResolvedValue([
      comment('c1'),
      comment('c2', { parentId: 'c1' }),
      comment('c3'),
    ])
    vi.mocked(apiClient.delete).mockResolvedValue({ success: true })
    const { onCommentRemoved } = renderSection({
      currentUser: { _id: 'staff-1', roles: ['admin'] },
    })
    await screen.findByText('Nội dung c1')

    fireEvent.click(screen.getAllByRole('button', { name: 'Gỡ' })[0]!)
    expect(apiClient.delete).not.toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button', { name: 'Xóa' }))

    await waitFor(() => expect(onCommentRemoved).toHaveBeenCalledWith(2))
    expect(apiClient.delete).toHaveBeenCalledWith('/community/comments/c1')
    expect(screen.queryByText('Nội dung c1')).not.toBeInTheDocument()
    expect(screen.queryByText('Nội dung c2')).not.toBeInTheDocument()
    expect(screen.getByText('Nội dung c3')).toBeInTheDocument()
  })

  it('lets authors delete only their own comments through the own-comment route', async () => {
    vi.mocked(apiClient.get).mockResolvedValue([
      comment('mine', { authorId: 'u1' }),
      comment('theirs'),
    ])
    vi.mocked(apiClient.delete).mockResolvedValue({ success: true })
    const { onCommentRemoved } = renderSection({
      currentUser: { _id: 'u1', roles: ['tenant'] },
    })
    await screen.findByText('Nội dung mine')

    expect(screen.getAllByRole('button', { name: 'Xóa' })).toHaveLength(1)
    fireEvent.click(screen.getByRole('button', { name: 'Xóa' }))
    fireEvent.click(
      within(screen.getByRole('alertdialog')).getByRole('button', {
        name: 'Xóa',
      })
    )

    await waitFor(() => expect(onCommentRemoved).toHaveBeenCalledWith(1))
    expect(apiClient.delete).toHaveBeenCalledWith(
      '/community/comments/mine/mine'
    )
  })

  it('offers no delete action to other users or guests', async () => {
    vi.mocked(apiClient.get).mockResolvedValue([comment('c1')])
    renderSection({ currentUser: { _id: 'u1', roles: ['tenant'] } })
    await screen.findByText('Nội dung c1')

    expect(
      screen.queryByRole('button', { name: /^(Xóa|Gỡ)$/ })
    ).not.toBeInTheDocument()
  })

  it('keeps the comment and explains the failure when deletion is rejected', async () => {
    vi.mocked(apiClient.get).mockResolvedValue([comment('c1')])
    vi.mocked(apiClient.delete).mockRejectedValue(new Error('403'))
    const { onCommentRemoved } = renderSection({
      currentUser: { _id: 'staff-1', roles: ['staff'] },
    })
    await screen.findByText('Nội dung c1')

    fireEvent.click(screen.getByRole('button', { name: 'Gỡ' }))
    fireEvent.click(
      within(screen.getByRole('alertdialog')).getByRole('button', {
        name: 'Xóa',
      })
    )

    await waitFor(() =>
      expect(appToast.error).toHaveBeenCalledWith('Không thể xóa bình luận.')
    )
    expect(screen.getByText('Nội dung c1')).toBeInTheDocument()
    expect(onCommentRemoved).not.toHaveBeenCalled()
  })
})
