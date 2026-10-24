import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { StaffModerationPanel } from './staff-moderation-panel'
import type { WebCommunityPost } from '../../lib/community-types'

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
  it('summarises the queue and shows each post with its project', () => {
    render(
      <StaffModerationPanel
        posts={[
          pendingPost,
          { ...pendingPost, id: 'pending-2', title: 'Bài thứ hai' },
        ]}
        onApprove={vi.fn()}
        onReject={vi.fn()}
      />
    )

    expect(
      screen.getByText('2 bài viết đang chờ phê duyệt')
    ).toBeInTheDocument()
    expect(screen.getByText('Bài viết chờ duyệt')).toBeInTheDocument()
    expect(screen.getByText('Bài thứ hai')).toBeInTheDocument()
    expect(screen.getAllByText('Dự án: Masteri Thảo Điền')).toHaveLength(2)
  })

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
    expect(onReject).not.toHaveBeenCalled()
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
    expect(onApprove).not.toHaveBeenCalled()
  })

  it('disables both actions while a decision is being saved', () => {
    render(
      <StaffModerationPanel
        posts={[pendingPost]}
        onApprove={vi.fn()}
        onReject={vi.fn()}
        isBusy
      />
    )

    expect(screen.getByRole('button', { name: 'Phê duyệt' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Từ chối' })).toBeDisabled()
  })
})
