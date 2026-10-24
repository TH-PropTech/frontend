import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { StaffModerationPanel } from './staff-moderation-panel'
import type { WebCommunityPost } from '../../lib/use-web-community'

const pendingPost: WebCommunityPost = {
  id: 'pending-1',
  authorName: 'Trần Văn B',
  authorRole: 'tenant',
  authorAvatar: '',
  title: 'Bài viết chờ duyệt',
  content: 'Nội dung cần kiểm duyệt',
  projectName: 'Masteri Thảo Điền',
  topic: 'qa',
  upvotes: 0,
  hasUpvoted: false,
  commentsCount: 0,
  images: [],
  status: 'pending',
  createdAt: 'Vừa xong',
  isOwn: false,
}

describe('StaffModerationPanel', () => {
  it('calls onApprove when approve button is clicked', () => {
    const onApprove = vi.fn()
    const onReject = vi.fn()

    render(
      <StaffModerationPanel
        posts={[pendingPost]}
        onApprove={onApprove}
        onReject={onReject}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: 'Phê duyệt' }))
    expect(onApprove).toHaveBeenCalledWith('pending-1')
  })

  it('calls onReject when reject button is clicked', () => {
    const onApprove = vi.fn()
    const onReject = vi.fn()

    render(
      <StaffModerationPanel
        posts={[pendingPost]}
        onApprove={onApprove}
        onReject={onReject}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: 'Từ chối' }))
    expect(onReject).toHaveBeenCalledWith('pending-1')
  })
})
