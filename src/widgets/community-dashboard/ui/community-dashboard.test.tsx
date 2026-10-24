import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { WebCommunityPost } from '../lib/community-types'
import { CommunityDashboard } from './community-dashboard'

const state = vi.hoisted(() => ({ current: {} as Record<string, unknown> }))
const permission = vi.hoisted(() => ({ canCreate: true }))

vi.mock('../lib/use-web-community', () => ({
  useWebCommunity: () => state.current,
}))
vi.mock('@/shared/lib/permissions', () => ({
  useCan: () => () => permission.canCreate,
}))
vi.mock('@/widgets/home-dashboard/ui/home-header', () => ({
  HomeHeader: () => <header data-testid="header" />,
}))
vi.mock('@/shared/ui/footer', () => ({
  Footer: () => <footer data-testid="footer" />,
}))
vi.mock('./components/create-post-modal', () => ({
  CreatePostModal: ({ isOpen }: { isOpen: boolean }) =>
    isOpen ? <div data-testid="create-modal" /> : null,
}))
vi.mock('./components/auth-required-modal', () => ({
  AuthRequiredModal: ({ isOpen }: { isOpen: boolean }) =>
    isOpen ? <div data-testid="auth-modal" /> : null,
}))
vi.mock('./components/community-feed', () => ({
  CommunityFeed: (props: Record<string, (...args: unknown[]) => void>) => (
    <div data-testid="feed">
      <button type="button" onClick={() => props.onDeletePost?.('own')}>
        delete-own
      </button>
      <button type="button" onClick={() => props.onDeletePost?.('other')}>
        delete-other
      </button>
      <button type="button" onClick={() => props.onCommentAdded?.('p1')}>
        comment-added
      </button>
      <button type="button" onClick={() => props.onCommentRemoved?.('p1', 3)}>
        comment-removed
      </button>
      <button type="button" onClick={() => props.onApprove?.('p2')}>
        approve
      </button>
      <button type="button" onClick={() => props.onReject?.('p2')}>
        reject
      </button>
      <button type="button" onClick={() => props.onAuthRequired?.()}>
        need-auth
      </button>
    </div>
  ),
}))

const post = (id: string, isOwn: boolean): WebCommunityPost => ({
  id,
  authorName: 'A',
  authorRole: 'tenant',
  authorAvatar: '',
  title: id,
  content: 'c',
  projectName: 'P',
  topic: 'qa',
  upvotes: 0,
  hasUpvoted: false,
  commentsCount: 0,
  images: [],
  status: 'approved',
  createdAt: 'Vừa xong',
  isOwn,
})

function makeState(overrides: Record<string, unknown> = {}) {
  return {
    currentUser: null,
    isAuthenticated: false,
    isModerator: false,
    filters: { topic: 'all', search: '', project: null },
    setTopic: vi.fn(),
    setSearchInput: vi.fn(),
    setProject: vi.fn(),
    resetFilters: vi.fn(),
    feedTab: 'public',
    setFeedTab: vi.fn(),
    posts: [post('own', true), post('other', false)],
    pendingCount: 0,
    myCounts: { total: 0, approved: 0, pending: 0, rejected: 0 },
    stats: null,
    feedStatus: {},
    createPost: vi.fn(),
    isCreatingPost: false,
    moderatePost: vi.fn(),
    isModerating: false,
    upvotePost: vi.fn(),
    deletePost: vi.fn(),
    isDeletingPost: false,
    adjustCommentCount: vi.fn(),
    ...overrides,
  }
}

beforeEach(() => {
  permission.canCreate = true
  state.current = makeState()
})

describe('CommunityDashboard layout', () => {
  it('shows real stats in the hero and project stats in the sidebar', () => {
    state.current = makeState({
      stats: {
        contributorCount: 7,
        projectCount: 2,
        projects: [{ name: 'Landmark 81', posts: 5 }],
      },
    })
    render(<CommunityDashboard />)

    expect(screen.getByText('7 người đã đóng góp bài viết')).toBeInTheDocument()
    expect(screen.getByText('2 dự án đang thảo luận')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Landmark 81/ })
    ).toBeInTheDocument()
  })

  it('shows a project loading placeholder before stats arrive', () => {
    render(<CommunityDashboard />)
    expect(document.querySelector('[aria-busy="true"]')).toBeInTheDocument()
  })
})

describe('CommunityDashboard create flow', () => {
  it('asks guests to sign in when they try to post', () => {
    render(<CommunityDashboard />)

    fireEvent.click(screen.getByRole('button', { name: 'Đăng bài mới' }))

    expect(screen.getByTestId('auth-modal')).toBeInTheDocument()
    expect(screen.queryByTestId('create-modal')).not.toBeInTheDocument()
  })

  it('opens the composer for signed-in users who may post', () => {
    state.current = makeState({ isAuthenticated: true })
    render(<CommunityDashboard />)

    fireEvent.click(screen.getByRole('button', { name: 'Đăng bài mới' }))

    expect(screen.getByTestId('create-modal')).toBeInTheDocument()
    expect(screen.queryByTestId('auth-modal')).not.toBeInTheDocument()
  })

  it('hides the post button from signed-in users without permission', () => {
    permission.canCreate = false
    state.current = makeState({ isAuthenticated: true })
    render(<CommunityDashboard />)

    expect(
      screen.queryByRole('button', { name: 'Đăng bài mới' })
    ).not.toBeInTheDocument()
  })

  it('still lets guests see the post button even though permissions say no', () => {
    permission.canCreate = false
    render(<CommunityDashboard />)
    expect(
      screen.getByRole('button', { name: 'Đăng bài mới' })
    ).toBeInTheDocument()
  })

  it('opens the sign-in prompt from the feed', () => {
    render(<CommunityDashboard />)
    fireEvent.click(screen.getByText('need-auth'))
    expect(screen.getByTestId('auth-modal')).toBeInTheDocument()
  })
})

describe('CommunityDashboard wiring', () => {
  it('lets staff remove other people’s posts as moderators but own posts as authors', () => {
    const deletePost = vi.fn()
    state.current = makeState({ isModerator: true, deletePost })
    render(<CommunityDashboard />)

    fireEvent.click(screen.getByText('delete-other'))
    fireEvent.click(screen.getByText('delete-own'))

    expect(deletePost).toHaveBeenNthCalledWith(1, {
      id: 'other',
      asModerator: true,
    })
    expect(deletePost).toHaveBeenNthCalledWith(2, {
      id: 'own',
      asModerator: false,
    })
  })

  it('never uses the moderator route for regular users', () => {
    const deletePost = vi.fn()
    state.current = makeState({ deletePost })
    render(<CommunityDashboard />)

    fireEvent.click(screen.getByText('delete-own'))

    expect(deletePost).toHaveBeenCalledWith({ id: 'own', asModerator: false })
  })

  it('adjusts the cached comment count when comments are added or removed', () => {
    const adjustCommentCount = vi.fn()
    state.current = makeState({ adjustCommentCount })
    render(<CommunityDashboard />)

    fireEvent.click(screen.getByText('comment-added'))
    fireEvent.click(screen.getByText('comment-removed'))

    expect(adjustCommentCount).toHaveBeenNthCalledWith(1, 'p1', 1)
    expect(adjustCommentCount).toHaveBeenNthCalledWith(2, 'p1', -3)
  })

  it('maps moderation buttons to approve and reject decisions', () => {
    const moderatePost = vi.fn()
    state.current = makeState({ moderatePost })
    render(<CommunityDashboard />)

    fireEvent.click(screen.getByText('approve'))
    fireEvent.click(screen.getByText('reject'))

    expect(moderatePost).toHaveBeenNthCalledWith(1, {
      id: 'p2',
      status: 'approved',
    })
    expect(moderatePost).toHaveBeenNthCalledWith(2, {
      id: 'p2',
      status: 'rejected',
    })
  })

  it('wires toolbar filters to the community state', () => {
    const setTopic = vi.fn()
    const setSearchInput = vi.fn()
    state.current = makeState({ setTopic, setSearchInput })
    render(<CommunityDashboard />)

    fireEvent.click(screen.getByRole('tab', { name: 'Đánh giá' }))
    fireEvent.change(screen.getByRole('searchbox', { name: 'Tìm bài viết' }), {
      target: { value: 'gió' },
    })

    expect(setTopic).toHaveBeenCalledWith('review')
    expect(setSearchInput).toHaveBeenCalledWith('gió')
  })

  it('clears the project filter from the toolbar chip', () => {
    const setProject = vi.fn()
    state.current = makeState({
      setProject,
      filters: { topic: 'all', search: '', project: 'Masteri' },
    })
    render(<CommunityDashboard />)

    fireEvent.click(screen.getByRole('button', { name: 'Bỏ lọc dự án' }))

    expect(setProject).toHaveBeenCalledWith(null)
  })
})
