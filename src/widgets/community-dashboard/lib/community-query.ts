'use client'

import { useCallback } from 'react'
import {
  useInfiniteQuery,
  useQuery,
  type InfiniteData,
  type QueryClient,
} from '@tanstack/react-query'
import { apiClient } from '@/shared/api/api-client'
import {
  mapPost,
  type BackendPostResponse,
  type CommunityFilters,
  type CommunityStats,
  type WebCommunityPost,
} from './community-types'

export const COMMUNITY_PAGE_SIZE = 10
const STATS_STALE_MS = 60_000

export const communityKeys = {
  all: ['community'] as const,
  feed: (filters: CommunityFilters) => ['community', 'feed', filters] as const,
  mine: (userId: string) => ['community', 'mine', userId] as const,
  pending: ['community', 'pending'] as const,
  stats: ['community', 'stats'] as const,
}

export function buildFeedPath(filters: CommunityFilters, page: number): string {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(COMMUNITY_PAGE_SIZE),
  })
  if (filters.topic !== 'all') params.set('topic', filters.topic)
  const search = filters.search.trim()
  if (search) params.set('search', search)
  if (filters.project) params.set('project', filters.project)
  return `/community/posts?${params.toString()}`
}

export function useCommunityFeed(filters: CommunityFilters, userId: string) {
  const select = useCallback(
    (data: InfiniteData<BackendPostResponse[]>): WebCommunityPost[] =>
      data.pages.flat().map(post => mapPost(post, userId)),
    [userId]
  )

  return useInfiniteQuery({
    queryKey: communityKeys.feed(filters),
    queryFn: ({ pageParam }) =>
      apiClient.get<BackendPostResponse[]>(buildFeedPath(filters, pageParam)),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < COMMUNITY_PAGE_SIZE ? undefined : allPages.length + 1,
    select,
  })
}

function useMappedPosts(
  queryKey: readonly unknown[],
  path: string,
  userId: string,
  enabled: boolean
) {
  const select = useCallback(
    (posts: BackendPostResponse[]): WebCommunityPost[] =>
      posts.map(post => mapPost(post, userId)),
    [userId]
  )
  return useQuery({
    queryKey,
    queryFn: () => apiClient.get<BackendPostResponse[]>(path),
    enabled,
    select,
  })
}

/** Mọi bài của chính người dùng, gồm cả chờ duyệt và bị từ chối. */
export function useMyPosts(userId: string) {
  return useMappedPosts(
    communityKeys.mine(userId),
    '/community/posts/my',
    userId,
    userId !== ''
  )
}

export function usePendingPosts(userId: string, enabled: boolean) {
  return useMappedPosts(
    communityKeys.pending,
    '/community/posts/pending',
    userId,
    enabled
  )
}

export function useCommunityStats() {
  return useQuery({
    queryKey: communityKeys.stats,
    queryFn: () => apiClient.get<CommunityStats>('/community/stats'),
    staleTime: STATS_STALE_MS,
  })
}

function postIdOf(post: BackendPostResponse): string {
  return post._id ?? post.id ?? ''
}

function isInfinitePosts(
  value: unknown
): value is InfiniteData<BackendPostResponse[]> {
  return (
    typeof value === 'object' &&
    value !== null &&
    'pages' in value &&
    Array.isArray((value as { pages: unknown }).pages)
  )
}

/**
 * Cập nhật (hoặc xóa khi `update` trả `null`) một bài trong mọi danh sách đã cache
 * (feed phân trang, bài của tôi, chờ duyệt) mà không cần tải lại.
 */
export function patchCachedPost(
  queryClient: QueryClient,
  postId: string,
  update: (post: BackendPostResponse) => BackendPostResponse | null
): void {
  const patchList = (list: BackendPostResponse[]): BackendPostResponse[] =>
    list.flatMap(post =>
      postIdOf(post) === postId ? (update(post) ?? []) : [post]
    )

  queryClient.setQueriesData(
    { queryKey: communityKeys.all },
    (cached: unknown) => {
      if (Array.isArray(cached)) return patchList(cached)
      if (isInfinitePosts(cached)) {
        return { ...cached, pages: cached.pages.map(patchList) }
      }
      return cached
    }
  )
}
