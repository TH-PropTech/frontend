import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CommentsSection } from './comments-section'
import { apiClient } from '@/shared/api/api-client'

vi.mock('@/shared/api/api-client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}))

describe('CommentsSection moderation action', () => {
  beforeEach(() => {
    vi.mocked(apiClient.get).mockResolvedValue([
      {
        _id: 'comment-1',
        parentId: null,
        authorName: 'Lê Thị B',
        authorRole: 'tenant',
        content: 'Bình luận cần kiểm duyệt',
        createdAt: '2026-09-20T08:00:00.000Z',
      },
    ])
    vi.mocked(apiClient.delete).mockResolvedValue({ success: true })
  })

  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('lets staff remove a comment and updates the parent counter callback', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    const onCommentRemoved = vi.fn()

    render(
      <CommentsSection
        postId="post-1"
        onCommentAdded={vi.fn()}
        onCommentRemoved={onCommentRemoved}
        currentUser={{ roles: ['admin'] }}
      />
    )

    expect(
      await screen.findByText('Bình luận cần kiểm duyệt')
    ).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Gỡ' }))

    await waitFor(() => {
      expect(apiClient.delete).toHaveBeenCalledWith(
        '/community/comments/comment-1'
      )
      expect(onCommentRemoved).toHaveBeenCalledOnce()
    })
    expect(
      screen.queryByText('Bình luận cần kiểm duyệt')
    ).not.toBeInTheDocument()
  })
})
