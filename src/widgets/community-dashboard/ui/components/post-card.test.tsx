import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { PostCard } from './post-card'

vi.mock('./comments-section', () => ({
  CommentsSection: () => <div data-testid="comments-section" />,
}))

const post = {
  id: 'post-1',
  authorName: 'Nguyễn Văn A',
  authorRole: 'tenant' as const,
  authorAvatar: '/avatar.jpg',
  title: 'Bài viết cộng đồng',
  content: 'Nội dung bài viết',
  projectName: 'Central Park',
  topic: 'qa' as const,
  upvotes: 2,
  hasUpvoted: false,
  commentsCount: 0,
  images: [],
  status: 'approved' as const,
  createdAt: 'Vừa xong',
  isOwn: false,
}

describe('PostCard moderation action', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('shows the remove action to staff and removes after confirmation', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    const onDeletePost = vi.fn()

    render(
      <PostCard
        post={post}
        onUpvote={vi.fn()}
        onDeletePost={onDeletePost}
        currentUser={{ roles: ['staff'] }}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: 'Gỡ bài' }))

    expect(onDeletePost).toHaveBeenCalledWith('post-1')
  })

  it('does not expose the remove action to regular users', () => {
    render(
      <PostCard
        post={post}
        onUpvote={vi.fn()}
        currentUser={{ roles: ['tenant'] }}
      />
    )

    expect(
      screen.queryByRole('button', { name: 'Gỡ bài' })
    ).not.toBeInTheDocument()
  })
})
