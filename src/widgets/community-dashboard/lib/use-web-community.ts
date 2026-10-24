'use client'

import { useMemo, useState } from 'react'
import {
  useCommunityFeed,
  useCommunityStats,
  useMyPosts,
  usePendingPosts,
} from './community-query'
import {
  filterPosts,
  getUserId,
  hasModeratorRole,
  type CommunityFilters,
  type CommunityTopicFilter,
  type WebCommunityPost,
} from './community-types'
import { useCommunityActions } from './use-community-actions'
import { useDebouncedValue } from './use-debounced-value'
import { useStoredUser } from './use-stored-user'

export type FeedTab = 'public' | 'mine' | 'moderation'

const SEARCH_DEBOUNCE_MS = 300

export interface MyPostCounts {
  total: number
  approved: number
  pending: number
  rejected: number
}

function countMyPosts(posts: readonly WebCommunityPost[]): MyPostCounts {
  const countOf = (status: WebCommunityPost['status']): number =>
    posts.filter(post => post.status === status).length
  return {
    total: posts.length,
    approved: countOf('approved'),
    pending: countOf('pending'),
    rejected: countOf('rejected'),
  }
}

export function useWebCommunity() {
  const currentUser = useStoredUser()
  const userId = getUserId(currentUser)
  const isAuthenticated = currentUser !== null
  const isModerator = hasModeratorRole(currentUser)

  const [topic, setTopic] = useState<CommunityTopicFilter>('all')
  const [searchInput, setSearchInput] = useState('')
  const [project, setProject] = useState<string | null>(null)
  const [requestedTab, setRequestedTab] = useState<FeedTab>('public')

  const search = useDebouncedValue(searchInput, SEARCH_DEBOUNCE_MS)
  const filters = useMemo<CommunityFilters>(
    () => ({ topic, search, project }),
    [topic, search, project]
  )

  // Tab không còn hợp lệ (đăng xuất, mất quyền) tự rơi về tab công khai.
  const feedTab: FeedTab =
    (requestedTab === 'mine' && !isAuthenticated) ||
    (requestedTab === 'moderation' && !isModerator)
      ? 'public'
      : requestedTab

  const feed = useCommunityFeed(filters, userId)
  const mine = useMyPosts(userId)
  const pending = usePendingPosts(userId, isModerator)
  const stats = useCommunityStats()
  const actions = useCommunityActions()

  const myPosts = mine.data
  const pendingPosts = pending.data

  const posts = useMemo<WebCommunityPost[]>(() => {
    if (feedTab === 'mine') return filterPosts(myPosts ?? [], filters)
    if (feedTab === 'moderation') return pendingPosts ?? []
    return feed.data ?? []
  }, [feedTab, myPosts, pendingPosts, feed.data, filters])

  const activeQuery =
    feedTab === 'mine' ? mine : feedTab === 'moderation' ? pending : feed

  const myCounts = useMemo(() => countMyPosts(myPosts ?? []), [myPosts])

  return {
    currentUser,
    isAuthenticated,
    isModerator,
    filters: { topic, search: searchInput, project } satisfies CommunityFilters,
    setTopic,
    setSearchInput,
    setProject,
    resetFilters: () => {
      setSearchInput('')
      setProject(null)
    },
    feedTab,
    setFeedTab: setRequestedTab,
    posts,
    pendingCount: pendingPosts?.length ?? 0,
    myCounts,
    stats: stats.data ?? null,
    feedStatus: {
      isLoading: activeQuery.isLoading,
      isError: activeQuery.isError,
      retry: () => void activeQuery.refetch(),
      hasNextPage: feedTab === 'public' && feed.hasNextPage,
      isFetchingNextPage: feed.isFetchingNextPage,
      fetchNextPage: () => void feed.fetchNextPage(),
    },
    ...actions,
  }
}
