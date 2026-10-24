import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { WebCommunityPost } from '../../lib/community-types'
import { PostCard } from './post-card'

vi.mock('./comments-section', () => ({
  CommentsSection: (props: {
    onCommentAdded: () => void
    onCommentRemoved: (count: number) => void
  }) => (
    <div data-testid="comments-section">
      <button type="button" onClick={props.onCommentAdded}>
        mock-add
      </button>
      <button type="button" onClick={() => props.onCommentRemoved(3)}>
        mock-remove
      </button>
    </div>
  ),
}))

const post: WebCommunityPost = {
  id: 'post-1',
  authorName: 'Nguyễn Văn A',
  authorRole: 'tenant',
  authorAvatar: '',
  title: 'Bài viết cộng đồng',
  content: 'Nội dung bài viết',
  projectName: 'Central Park',
  topic: 'qa',
  upvotes: 2,
  hasUpvoted: false,
  commentsCount: 4,
  images: [],
  status: 'approved',
  createdAt: 'Vừa xong',
  isOwn: false,
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('PostCard content', () => {
  it('shows the author, localized role, topic, project and counters', () => {
    render(<PostCard post={post} onUpvote={vi.fn()} />)

    expect(screen.getByText('Nguyễn Văn A')).toBeInTheDocument()
    expect(screen.getByText('Khách thuê')).toBeInTheDocument()
    expect(screen.getByText('Hỏi đáp')).toBeInTheDocument()
    expect(screen.getByText('Central Park')).toBeInTheDocument()
    expect(screen.getByText('2 Hữu ích')).toBeInTheDocument()
    expect(screen.getByText('4 Bình luận')).toBeInTheDocument()
  })

  it('shows no status badge for approved posts', () => {
    render(<PostCard post={post} onUpvote={vi.fn()} />)
    expect(screen.queryByText('Đang chờ duyệt')).not.toBeInTheDocument()
    expect(screen.queryByText('Bị từ chối')).not.toBeInTheDocument()
  })

  it('tells the author when a post is waiting for review or was rejected', () => {
    const { rerender } = render(
      <PostCard post={{ ...post, status: 'pending' }} onUpvote={vi.fn()} />
    )
    expect(screen.getByText('Đang chờ duyệt')).toBeInTheDocument()

    rerender(
      <PostCard post={{ ...post, status: 'rejected' }} onUpvote={vi.fn()} />
    )
    expect(screen.getByText('Bị từ chối')).toBeInTheDocument()
  })

  it('renders attached images', () => {
    render(
      <PostCard
        post={{ ...post, images: ['https://cdn.example/a.jpg'] }}
        onUpvote={vi.fn()}
      />
    )
    expect(screen.getByAltText('Hình ảnh bài viết')).toBeInTheDocument()
  })

  it('lets visitors filter by the post project', () => {
    const onSelectProject = vi.fn()
    render(
      <PostCard
        post={post}
        onUpvote={vi.fn()}
        onSelectProject={onSelectProject}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: /Central Park/ }))

    expect(onSelectProject).toHaveBeenCalledWith('Central Park')
  })
})

describe('PostCard upvote', () => {
  it('upvotes for signed-in users and reflects the pressed state', () => {
    const onUpvote = vi.fn()
    render(
      <PostCard post={{ ...post, hasUpvoted: true }} onUpvote={onUpvote} />
    )

    const button = screen.getByRole('button', { name: '2 người thấy hữu ích' })
    expect(button).toHaveAttribute('aria-pressed', 'true')
    fireEvent.click(button)
    expect(onUpvote).toHaveBeenCalledWith('post-1')
  })

  it('asks guests to sign in instead of upvoting', () => {
    const onUpvote = vi.fn()
    const onAuthRequired = vi.fn()
    render(
      <PostCard
        post={post}
        onUpvote={onUpvote}
        isAuthenticated={false}
        onAuthRequired={onAuthRequired}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: /người thấy hữu ích/ }))

    expect(onAuthRequired).toHaveBeenCalledOnce()
    expect(onUpvote).not.toHaveBeenCalled()
  })

  it('does not throw for guests when no sign-in handler is given', () => {
    render(<PostCard post={post} onUpvote={vi.fn()} isAuthenticated={false} />)
    expect(() =>
      fireEvent.click(
        screen.getByRole('button', { name: /người thấy hữu ích/ })
      )
    ).not.toThrow()
  })
})

describe('PostCard comments', () => {
  it('toggles the comment section and forwards count changes with the post id', () => {
    const onCommentAdded = vi.fn()
    const onCommentRemoved = vi.fn()
    render(
      <PostCard
        post={post}
        onUpvote={vi.fn()}
        onCommentAdded={onCommentAdded}
        onCommentRemoved={onCommentRemoved}
      />
    )

    expect(screen.queryByTestId('comments-section')).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '4 bình luận' }))
    expect(screen.getByTestId('comments-section')).toBeInTheDocument()

    fireEvent.click(screen.getByText('mock-add'))
    fireEvent.click(screen.getByText('mock-remove'))
    expect(onCommentAdded).toHaveBeenCalledWith('post-1')
    expect(onCommentRemoved).toHaveBeenCalledWith('post-1', 3)

    fireEvent.click(screen.getByRole('button', { name: '4 bình luận' }))
    expect(screen.queryByTestId('comments-section')).not.toBeInTheDocument()
  })
})

describe('PostCard deletion', () => {
  it('lets staff remove a violating post only after confirming', () => {
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
    expect(onDeletePost).not.toHaveBeenCalled()
    expect(screen.getByRole('alertdialog')).toHaveTextContent(
      'tác giả sẽ nhận được thông báo'
    )

    fireEvent.click(screen.getByRole('button', { name: 'Gỡ bài' }))
    expect(onDeletePost).toHaveBeenCalledWith('post-1')
  })

  it('lets the author delete their own post', () => {
    const onDeletePost = vi.fn()
    render(
      <PostCard
        post={{ ...post, isOwn: true }}
        onUpvote={vi.fn()}
        onDeletePost={onDeletePost}
        currentUser={{ roles: ['tenant'] }}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: 'Xóa bài' }))
    expect(screen.getByRole('alertdialog')).toHaveTextContent('xóa vĩnh viễn')
    fireEvent.click(screen.getByRole('button', { name: 'Xóa bài' }))

    expect(onDeletePost).toHaveBeenCalledWith('post-1')
  })

  it('keeps the post when the confirmation is cancelled', () => {
    const onDeletePost = vi.fn()
    render(
      <PostCard
        post={{ ...post, isOwn: true }}
        onUpvote={vi.fn()}
        onDeletePost={onDeletePost}
        currentUser={{ roles: ['tenant'] }}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: 'Xóa bài' }))
    fireEvent.click(screen.getByRole('button', { name: 'Hủy' }))

    expect(onDeletePost).not.toHaveBeenCalled()
  })

  it('labels staff deleting their own post as a plain delete', () => {
    render(
      <PostCard
        post={{ ...post, isOwn: true }}
        onUpvote={vi.fn()}
        onDeletePost={vi.fn()}
        currentUser={{ roles: ['admin'] }}
      />
    )
    expect(screen.getByRole('button', { name: 'Xóa bài' })).toBeInTheDocument()
  })

  it('does not expose deletion to other regular users or guests', () => {
    const { rerender } = render(
      <PostCard
        post={post}
        onUpvote={vi.fn()}
        onDeletePost={vi.fn()}
        currentUser={{ roles: ['tenant'] }}
      />
    )
    expect(
      screen.queryByRole('button', { name: /Gỡ bài|Xóa bài/ })
    ).not.toBeInTheDocument()

    rerender(<PostCard post={post} onUpvote={vi.fn()} onDeletePost={vi.fn()} />)
    expect(
      screen.queryByRole('button', { name: /Gỡ bài|Xóa bài/ })
    ).not.toBeInTheDocument()
  })

  it('does not show deletion when no delete handler is provided', () => {
    render(
      <PostCard
        post={{ ...post, isOwn: true }}
        onUpvote={vi.fn()}
        currentUser={{ roles: ['staff'] }}
      />
    )
    expect(
      screen.queryByRole('button', { name: /Gỡ bài|Xóa bài/ })
    ).not.toBeInTheDocument()
  })
})
