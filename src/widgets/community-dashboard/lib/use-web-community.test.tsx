import * as React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { apiClient, ApiClientError } from '@/shared/api/api-client'
import { appToast } from '@/shared/ui/app-toast'
import type { BackendPostResponse, CommunityStats } from './community-types'
import { COMMUNITY_PAGE_SIZE } from './community-query'
import { useWebCommunity } from './use-web-community'

vi.mock('@/shared/api/api-client', async importOriginal => {
  const actual =
    await importOriginal<typeof import('@/shared/api/api-client')>()
  return {
    ...actual,
    apiClient: {
      get: vi.fn(),
      post: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    },
  }
})

vi.mock('@/shared/ui/app-toast', () => ({
  appToast: { success: vi.fn(), error: vi.fn(), info: vi.fn() },
}))

const stats: CommunityStats = {
  contributorCount: 3,
  projectCount: 2,
  projects: [{ name: 'Landmark 81', posts: 2 }],
}

const rawPost = (
  id: string,
  overrides: Partial<BackendPostResponse> = {}
): BackendPostResponse => ({
  _id: id,
  authorId: 'someone',
  authorName: 'Người khác',
  title: `Bài ${id}`,
  content: 'Nội dung',
  projectName: 'Landmark 81',
  topic: 'qa',
  upvotes: [],
  status: 'approved',
  ...overrides,
})

interface Routes {
  feed?: BackendPostResponse[]
  mine?: BackendPostResponse[]
  pending?: BackendPostResponse[]
}

function mockApi(routes: Routes = {}): void {
  vi.mocked(apiClient.get).mockImplementation((async (path: string) => {
    if (path.startsWith('/community/posts/my')) return routes.mine ?? []
    if (path.startsWith('/community/posts/pending')) return routes.pending ?? []
    if (path.startsWith('/community/posts?')) return routes.feed ?? []
    if (path === '/community/stats') return stats
    throw new Error(`unexpected GET ${path}`)
  }) as never)
}

function loginAs(user: { _id: string; roles: string[] }): void {
  window.localStorage.setItem('user', JSON.stringify(user))
}

function renderCommunity() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
  return renderHook(() => useWebCommunity(), { wrapper })
}

const feedCalls = (): string[] =>
  vi
    .mocked(apiClient.get)
    .mock.calls.map(([path]) => path)
    .filter(path => path.startsWith('/community/posts?'))

beforeEach(() => {
  vi.mocked(apiClient.get).mockReset()
  vi.mocked(apiClient.post).mockReset()
  vi.mocked(apiClient.patch).mockReset()
  vi.mocked(apiClient.delete).mockReset()
  vi.mocked(appToast.success).mockReset()
  vi.mocked(appToast.error).mockReset()
})

afterEach(() => {
  window.localStorage.clear()
})

describe('useWebCommunity feed', () => {
  it('loads the first page for a guest without requesting private lists', async () => {
    mockApi({ feed: [rawPost('1'), rawPost('2')] })

    const { result } = renderCommunity()

    await waitFor(() => expect(result.current.posts).toHaveLength(2))
    expect(feedCalls()).toEqual([
      `/community/posts?page=1&limit=${COMMUNITY_PAGE_SIZE}`,
    ])
    expect(vi.mocked(apiClient.get)).not.toHaveBeenCalledWith(
      '/community/posts/my'
    )
    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.stats).toEqual(stats)
    expect(result.current.feedStatus.hasNextPage).toBe(false)
  })

  it('keeps the author’s own approved posts in the public feed and counts them', async () => {
    loginAs({ _id: 'u1', roles: ['tenant'] })
    const own = rawPost('own', { authorId: 'u1' })
    const pendingOwn = rawPost('own-pending', {
      authorId: 'u1',
      status: 'pending',
    })
    mockApi({ feed: [own, rawPost('2')], mine: [own, pendingOwn] })

    const { result } = renderCommunity()

    await waitFor(() => expect(result.current.myCounts.total).toBe(2))
    expect(result.current.posts.map(post => post.id)).toEqual(['own', '2'])
    expect(result.current.posts[0]?.isOwn).toBe(true)
    expect(result.current.myCounts).toEqual({
      total: 2,
      approved: 1,
      pending: 1,
      rejected: 0,
    })
  })

  it('shows every status in "mine", filtered by the active topic', async () => {
    loginAs({ _id: 'u1', roles: ['tenant'] })
    mockApi({
      mine: [
        rawPost('a', { authorId: 'u1', topic: 'qa' }),
        rawPost('b', { authorId: 'u1', topic: 'review', status: 'rejected' }),
      ],
    })

    const { result } = renderCommunity()
    await waitFor(() => expect(result.current.myCounts.total).toBe(2))

    act(() => result.current.setFeedTab('mine'))
    expect(result.current.feedTab).toBe('mine')
    expect(result.current.posts.map(post => post.id)).toEqual(['a', 'b'])

    act(() => result.current.setTopic('review'))
    expect(result.current.posts.map(post => post.id)).toEqual(['b'])
    expect(result.current.posts[0]?.status).toBe('rejected')
  })

  it('falls back to the public tab when the requested tab is not allowed', async () => {
    mockApi({ feed: [rawPost('1')] })
    const { result } = renderCommunity()
    await waitFor(() => expect(result.current.posts).toHaveLength(1))

    act(() => result.current.setFeedTab('mine'))
    expect(result.current.feedTab).toBe('public')
    act(() => result.current.setFeedTab('moderation'))
    expect(result.current.feedTab).toBe('public')
  })

  it('lets staff load and open the moderation queue', async () => {
    loginAs({ _id: 'staff-1', roles: ['staff'] })
    mockApi({ pending: [rawPost('p1', { status: 'pending' })] })

    const { result } = renderCommunity()
    await waitFor(() => expect(result.current.pendingCount).toBe(1))

    act(() => result.current.setFeedTab('moderation'))
    expect(result.current.feedTab).toBe('moderation')
    expect(result.current.posts.map(post => post.id)).toEqual(['p1'])
    expect(result.current.isModerator).toBe(true)
  })

  it('refetches from the server with topic, project and debounced keyword', async () => {
    mockApi({ feed: [rawPost('1')] })
    const { result } = renderCommunity()
    await waitFor(() => expect(result.current.posts).toHaveLength(1))

    act(() => {
      result.current.setTopic('review')
      result.current.setProject('Landmark 81')
      result.current.setSearchInput('phí')
    })

    await waitFor(() =>
      expect(feedCalls()).toContain(
        `/community/posts?page=1&limit=${COMMUNITY_PAGE_SIZE}&topic=review&search=ph%C3%AD&project=Landmark+81`
      )
    )
    expect(result.current.filters.search).toBe('phí')
  })

  it('clears project and keyword on resetFilters but keeps the topic', async () => {
    mockApi()
    const { result } = renderCommunity()
    act(() => {
      result.current.setTopic('qa')
      result.current.setProject('Masteri')
      result.current.setSearchInput('x')
    })

    act(() => result.current.resetFilters())

    expect(result.current.filters).toEqual({
      topic: 'qa',
      search: '',
      project: null,
    })
  })

  it('pages through the feed until a short page arrives', async () => {
    const firstPage = Array.from({ length: COMMUNITY_PAGE_SIZE }, (_, i) =>
      rawPost(`a${i}`)
    )
    vi.mocked(apiClient.get).mockImplementation((async (path: string) => {
      if (path === '/community/stats') return stats
      return path.includes('page=2') ? [rawPost('last')] : firstPage
    }) as never)

    const { result } = renderCommunity()
    await waitFor(() =>
      expect(result.current.posts).toHaveLength(COMMUNITY_PAGE_SIZE)
    )
    expect(result.current.feedStatus.hasNextPage).toBe(true)

    act(() => result.current.feedStatus.fetchNextPage())

    await waitFor(() =>
      expect(result.current.posts).toHaveLength(COMMUNITY_PAGE_SIZE + 1)
    )
    expect(result.current.feedStatus.hasNextPage).toBe(false)
  })

  it('reports a load failure instead of pretending the feed is empty, and retries', async () => {
    vi.mocked(apiClient.get).mockRejectedValue(new Error('boom'))
    const { result } = renderCommunity()

    await waitFor(() => expect(result.current.feedStatus.isError).toBe(true))
    expect(result.current.posts).toEqual([])

    mockApi({ feed: [rawPost('1')] })
    act(() => result.current.feedStatus.retry())

    await waitFor(() => expect(result.current.posts).toHaveLength(1))
    expect(result.current.feedStatus.isError).toBe(false)
  })
})

describe('useWebCommunity actions', () => {
  async function renderLoaded(routes: Routes) {
    mockApi(routes)
    const hook = renderCommunity()
    await waitFor(() =>
      expect(hook.result.current.posts.length).toBeGreaterThan(0)
    )
    return hook
  }

  it('updates a post from the server response when upvoting', async () => {
    loginAs({ _id: 'u1', roles: ['tenant'] })
    const { result } = await renderLoaded({ feed: [rawPost('1')] })
    vi.mocked(apiClient.patch).mockResolvedValue(
      rawPost('1', { upvotes: ['u1'] })
    )

    act(() => result.current.upvotePost('1'))

    await waitFor(() => expect(result.current.posts[0]?.upvotes).toBe(1))
    expect(result.current.posts[0]?.hasUpvoted).toBe(true)
    expect(apiClient.patch).toHaveBeenCalledWith(
      '/community/posts/1/upvote',
      {}
    )
  })

  it('does not fake an upvote locally when the server rejects it', async () => {
    loginAs({ _id: 'u1', roles: ['tenant'] })
    const { result } = await renderLoaded({ feed: [rawPost('1')] })
    vi.mocked(apiClient.patch).mockRejectedValue(
      new ApiClientError('Bài viết chưa được duyệt', 404, null)
    )

    act(() => result.current.upvotePost('1'))

    await waitFor(() =>
      expect(appToast.error).toHaveBeenCalledWith('Bài viết chưa được duyệt')
    )
    expect(result.current.posts[0]?.upvotes).toBe(0)
  })

  it('lets the author delete their post through the own-post route', async () => {
    loginAs({ _id: 'u1', roles: ['tenant'] })
    const { result } = await renderLoaded({
      feed: [rawPost('1', { authorId: 'u1' }), rawPost('2')],
    })
    vi.mocked(apiClient.delete).mockResolvedValue({ success: true })

    act(() => result.current.deletePost({ id: '1', asModerator: false }))

    await waitFor(() =>
      expect(result.current.posts.map(post => post.id)).toEqual(['2'])
    )
    expect(apiClient.delete).toHaveBeenCalledWith('/community/posts/1/mine')
    expect(appToast.success).toHaveBeenCalledWith('Đã xóa bài viết.')
  })

  it('uses the moderation route for staff removal', async () => {
    loginAs({ _id: 'staff-1', roles: ['staff'] })
    const { result } = await renderLoaded({ feed: [rawPost('1')] })
    vi.mocked(apiClient.delete).mockResolvedValue({ success: true })

    act(() => result.current.deletePost({ id: '1', asModerator: true }))

    await waitFor(() => expect(result.current.posts).toHaveLength(0))
    expect(apiClient.delete).toHaveBeenCalledWith('/community/posts/1')
  })

  it('keeps the post and shows an error when deletion fails', async () => {
    loginAs({ _id: 'u1', roles: ['tenant'] })
    const { result } = await renderLoaded({ feed: [rawPost('1')] })
    vi.mocked(apiClient.delete).mockRejectedValue(
      new ApiClientError('Forbidden', 403, null)
    )

    act(() => result.current.deletePost({ id: '1', asModerator: false }))

    await waitFor(() =>
      expect(appToast.error).toHaveBeenCalledWith('Forbidden')
    )
    expect(result.current.posts).toHaveLength(1)
  })

  it('falls back to a generic message when the failure carries none', async () => {
    loginAs({ _id: 'u1', roles: ['tenant'] })
    const { result } = await renderLoaded({ feed: [rawPost('1')] })
    vi.mocked(apiClient.delete).mockRejectedValue(new Error('network'))

    act(() => result.current.deletePost({ id: '1', asModerator: false }))

    await waitFor(() =>
      expect(appToast.error).toHaveBeenCalledWith('Không thể xóa bài viết.')
    )
  })

  it('approves and rejects through the status endpoint with a success toast', async () => {
    loginAs({ _id: 'staff-1', roles: ['staff'] })
    const { result } = await renderLoaded({ feed: [rawPost('1')] })
    vi.mocked(apiClient.patch).mockResolvedValue(rawPost('1'))

    act(() => result.current.moderatePost({ id: 'p9', status: 'approved' }))
    await waitFor(() =>
      expect(appToast.success).toHaveBeenCalledWith('Đã phê duyệt bài viết.')
    )
    act(() => result.current.moderatePost({ id: 'p9', status: 'rejected' }))
    await waitFor(() =>
      expect(appToast.success).toHaveBeenCalledWith('Đã từ chối bài viết.')
    )
    expect(apiClient.patch).toHaveBeenCalledWith('/community/posts/p9/status', {
      status: 'rejected',
    })
  })

  it('reports a moderation failure', async () => {
    loginAs({ _id: 'staff-1', roles: ['staff'] })
    const { result } = await renderLoaded({ feed: [rawPost('1')] })
    vi.mocked(apiClient.patch).mockRejectedValue(new Error('x'))

    act(() => result.current.moderatePost({ id: 'p9', status: 'approved' }))

    await waitFor(() =>
      expect(appToast.error).toHaveBeenCalledWith(
        'Không thể cập nhật trạng thái bài viết.'
      )
    )
  })

  it('creates a post, announces it is awaiting review, and surfaces failures to the caller', async () => {
    loginAs({ _id: 'u1', roles: ['tenant'] })
    const { result } = await renderLoaded({ feed: [rawPost('1')] })
    const payload = {
      title: 't',
      content: 'c',
      projectName: 'p',
      topic: 'qa' as const,
    }
    vi.mocked(apiClient.post).mockResolvedValueOnce(rawPost('new'))

    await act(async () => {
      await result.current.createPost(payload)
    })
    expect(apiClient.post).toHaveBeenCalledWith('/community/posts', payload)
    expect(appToast.success).toHaveBeenCalledWith(
      'Bài viết đã được gửi và đang chờ kiểm duyệt.'
    )

    vi.mocked(appToast.success).mockClear()
    vi.mocked(apiClient.post).mockRejectedValueOnce(new Error('down'))
    await expect(
      act(async () => {
        await result.current.createPost(payload)
      })
    ).rejects.toThrow('down')
    expect(appToast.success).not.toHaveBeenCalled()
  })

  it('adjusts the cached comment count and never goes below zero', async () => {
    const { result } = await renderLoaded({
      feed: [rawPost('1', { commentsCount: 1 })],
    })

    act(() => result.current.adjustCommentCount('1', 2))
    await waitFor(() => expect(result.current.posts[0]?.commentsCount).toBe(3))

    act(() => result.current.adjustCommentCount('1', -10))
    await waitFor(() => expect(result.current.posts[0]?.commentsCount).toBe(0))
  })
})
