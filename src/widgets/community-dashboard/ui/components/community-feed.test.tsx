import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { WebCommunityPost } from '../../lib/community-types'
import { CommunityFeed, type FeedStatus } from './community-feed'

vi.mock('./post-card', () => ({
  PostCard: ({
    post,
    onSelectProject,
  }: {
    post: WebCommunityPost
    onSelectProject?: (p: string) => void
  }) => (
    <article data-testid="post-card">
      {post.title}
      <button type="button" onClick={() => onSelectProject?.(post.projectName)}>
        pick-{post.id}
      </button>
    </article>
  ),
}))

const post = (id: string): WebCommunityPost => ({
  id,
  authorName: 'A',
  authorRole: 'tenant',
  authorAvatar: '',
  title: `Bài ${id}`,
  content: 'c',
  projectName: `Dự án ${id}`,
  topic: 'qa',
  upvotes: 0,
  hasUpvoted: false,
  commentsCount: 0,
  images: [],
  status: 'approved',
  createdAt: 'Vừa xong',
  isOwn: false,
})

const readyStatus: FeedStatus = {
  isLoading: false,
  isError: false,
  retry: vi.fn(),
  hasNextPage: false,
  isFetchingNextPage: false,
  fetchNextPage: vi.fn(),
}

function renderFeed(
  overrides: Partial<React.ComponentProps<typeof CommunityFeed>> = {}
) {
  const handlers = {
    onTabChange: vi.fn(),
    onResetFilters: vi.fn(),
    onAuthRequired: vi.fn(),
    onUpvote: vi.fn(),
    onDeletePost: vi.fn(),
    onCommentAdded: vi.fn(),
    onCommentRemoved: vi.fn(),
    onSelectProject: vi.fn(),
    onApprove: vi.fn(),
    onReject: vi.fn(),
  }
  render(
    <CommunityFeed
      tab="public"
      isAuthenticated={false}
      isModerator={false}
      pendingCount={0}
      posts={[post('1'), post('2')]}
      status={readyStatus}
      hasActiveFilters={false}
      currentUser={null}
      isDeletingPost={false}
      isModerating={false}
      {...handlers}
      {...overrides}
    />
  )
  return handlers
}

describe('CommunityFeed tabs', () => {
  it('offers only the public tab to guests', () => {
    renderFeed()
    expect(screen.getAllByRole('tab')).toHaveLength(1)
    expect(
      screen.getByRole('tab', { name: 'Bài viết cộng đồng' })
    ).toHaveAttribute('aria-selected', 'true')
  })

  it('adds "mine" for signed-in users and "moderation" with a pending badge for staff', () => {
    renderFeed({ isAuthenticated: true, isModerator: true, pendingCount: 4 })

    expect(screen.getAllByRole('tab')).toHaveLength(3)
    expect(screen.getByRole('tab', { name: /Kiểm duyệt/ })).toHaveTextContent(
      '4'
    )
  })

  it('does not show a badge when nothing is pending', () => {
    renderFeed({ isAuthenticated: true, isModerator: true, pendingCount: 0 })
    expect(screen.getByRole('tab', { name: 'Kiểm duyệt' })).toBeInTheDocument()
  })

  it('switches tabs and links the panel to the active tab', () => {
    const { onTabChange } = renderFeed({ isAuthenticated: true })

    fireEvent.click(screen.getByRole('tab', { name: 'Bài viết của tôi' }))
    expect(onTabChange).toHaveBeenCalledWith('mine')
    expect(screen.getByRole('tabpanel')).toHaveAttribute(
      'aria-labelledby',
      'community-feed-tab-public'
    )
  })
})

describe('CommunityFeed body states', () => {
  it('renders the posts', () => {
    renderFeed()
    expect(screen.getAllByTestId('post-card')).toHaveLength(2)
  })

  it('forwards project selection from a card', () => {
    const { onSelectProject } = renderFeed()
    fireEvent.click(screen.getByText('pick-1'))
    expect(onSelectProject).toHaveBeenCalledWith('Dự án 1')
  })

  it('shows skeletons while loading', () => {
    renderFeed({ status: { ...readyStatus, isLoading: true }, posts: [] })
    expect(screen.getByText('Đang tải bài viết...')).toBeInTheDocument()
    expect(screen.queryByTestId('post-card')).not.toBeInTheDocument()
  })

  it('shows an error with a retry instead of an empty message', () => {
    const retry = vi.fn()
    renderFeed({ status: { ...readyStatus, isError: true, retry }, posts: [] })

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Không thể tải bài viết'
    )
    expect(
      screen.queryByText('Không tìm thấy bài viết nào')
    ).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Thử lại' }))
    expect(retry).toHaveBeenCalledOnce()
  })

  it('invites the first post when the community is empty', () => {
    renderFeed({ posts: [] })
    expect(screen.getByText('Không tìm thấy bài viết nào')).toBeInTheDocument()
    expect(screen.getByText(/người đầu tiên chia sẻ/)).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Xóa tất cả bộ lọc' })
    ).not.toBeInTheDocument()
  })

  it('offers to clear filters when filters hide every post', () => {
    const { onResetFilters } = renderFeed({ posts: [], hasActiveFilters: true })

    expect(screen.getByText(/Thử xóa bộ lọc/)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Xóa tất cả bộ lọc' }))
    expect(onResetFilters).toHaveBeenCalledOnce()
  })

  it('tells authors they have not posted yet on the "mine" tab', () => {
    renderFeed({ tab: 'mine', isAuthenticated: true, posts: [] })
    expect(screen.getByText('Bạn chưa đăng bài viết nào')).toBeInTheDocument()
  })

  it('shows the moderation queue with approve and reject wired', () => {
    const { onApprove, onReject } = renderFeed({
      tab: 'moderation',
      isAuthenticated: true,
      isModerator: true,
      posts: [{ ...post('9'), status: 'pending' }],
    })

    fireEvent.click(screen.getByRole('button', { name: 'Phê duyệt' }))
    fireEvent.click(screen.getByRole('button', { name: 'Từ chối' }))
    expect(onApprove).toHaveBeenCalledWith('9')
    expect(onReject).toHaveBeenCalledWith('9')
  })

  it('says the queue is clear when nothing awaits moderation', () => {
    renderFeed({
      tab: 'moderation',
      isAuthenticated: true,
      isModerator: true,
      posts: [],
    })
    expect(
      screen.getByText('Không có bài viết nào đang chờ kiểm duyệt')
    ).toBeInTheDocument()
  })
})

describe('CommunityFeed pagination', () => {
  it('loads more posts on request', () => {
    const fetchNextPage = vi.fn()
    renderFeed({ status: { ...readyStatus, hasNextPage: true, fetchNextPage } })

    fireEvent.click(screen.getByRole('button', { name: 'Xem thêm bài viết' }))
    expect(fetchNextPage).toHaveBeenCalledOnce()
  })

  it('disables the button while the next page loads', () => {
    renderFeed({
      status: { ...readyStatus, hasNextPage: true, isFetchingNextPage: true },
    })
    expect(
      screen.getByRole('button', { name: 'Xem thêm bài viết' })
    ).toBeDisabled()
  })

  it('hides the button on the last page', () => {
    renderFeed()
    expect(
      screen.queryByRole('button', { name: 'Xem thêm bài viết' })
    ).not.toBeInTheDocument()
  })
})
