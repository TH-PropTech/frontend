'use client'

import { useCallback } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient, ApiClientError } from '@/shared/api/api-client'
import { appToast } from '@/shared/ui/app-toast'
import { communityKeys, patchCachedPost } from './community-query'
import type { BackendPostResponse, CommunityTopic } from './community-types'

export interface CreatePostPayload {
  title: string
  content: string
  projectName: string
  topic: CommunityTopic
}

interface ModerationInput {
  id: string
  status: 'approved' | 'rejected'
}

interface DeletePostInput {
  id: string
  /** Staff gỡ bài vi phạm (có thông báo cho tác giả); người khác chỉ xóa bài của mình. */
  asModerator: boolean
}

export function toErrorMessage(error: unknown, fallback: string): string {
  return error instanceof ApiClientError && error.message
    ? error.message
    : fallback
}

export function useCommunityActions() {
  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: (payload: CreatePostPayload) =>
      apiClient.post<BackendPostResponse>('/community/posts', payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: communityKeys.all })
      appToast.success('Bài viết đã được gửi và đang chờ kiểm duyệt.')
    },
  })

  const moderateMutation = useMutation({
    mutationFn: ({ id, status }: ModerationInput) =>
      apiClient.patch<BackendPostResponse>(`/community/posts/${id}/status`, {
        status,
      }),
    onSuccess: (_post, { status }) => {
      void queryClient.invalidateQueries({ queryKey: communityKeys.all })
      appToast.success(
        status === 'approved'
          ? 'Đã phê duyệt bài viết.'
          : 'Đã từ chối bài viết.'
      )
    },
    onError: error =>
      appToast.error(
        toErrorMessage(error, 'Không thể cập nhật trạng thái bài viết.')
      ),
  })

  const upvoteMutation = useMutation({
    mutationFn: (id: string) =>
      apiClient.patch<BackendPostResponse>(`/community/posts/${id}/upvote`, {}),
    onSuccess: (updated, id) => patchCachedPost(queryClient, id, () => updated),
    onError: error =>
      appToast.error(toErrorMessage(error, 'Không thể ghi nhận lượt hữu ích.')),
  })

  const deleteMutation = useMutation({
    mutationFn: ({ id, asModerator }: DeletePostInput) =>
      apiClient.delete<{ success: boolean }>(
        asModerator ? `/community/posts/${id}` : `/community/posts/${id}/mine`
      ),
    onSuccess: (_result, { id }) => {
      patchCachedPost(queryClient, id, () => null)
      void queryClient.invalidateQueries({ queryKey: communityKeys.stats })
      appToast.success('Đã xóa bài viết.')
    },
    onError: error =>
      appToast.error(toErrorMessage(error, 'Không thể xóa bài viết.')),
  })

  const adjustCommentCount = useCallback(
    (postId: string, delta: number) =>
      patchCachedPost(queryClient, postId, post => ({
        ...post,
        commentsCount: Math.max(0, (post.commentsCount ?? 0) + delta),
      })),
    [queryClient]
  )

  return {
    createPost: createMutation.mutateAsync,
    isCreatingPost: createMutation.isPending,
    moderatePost: moderateMutation.mutate,
    isModerating: moderateMutation.isPending,
    upvotePost: upvoteMutation.mutate,
    deletePost: deleteMutation.mutate,
    isDeletingPost: deleteMutation.isPending,
    adjustCommentCount,
  }
}
