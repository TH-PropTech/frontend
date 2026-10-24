'use client'

import * as React from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Lock } from 'lucide-react'
import { apiClient } from '@/shared/api/api-client'
import { appToast } from '@/shared/ui/app-toast'
import {
  formatTimeAgo,
  getUserId,
  hasModeratorRole,
  ROLE_BADGE_CLASSES,
  ROLE_LABELS,
  type CommunityAuthorRole,
  type StoredUser,
} from '../../lib/community-types'
import { toErrorMessage } from '../../lib/use-community-actions'
import { ConfirmDeleteDialog } from './confirm-delete-dialog'
import { UserAvatar } from './user-avatar'

interface BackendCommentResponse {
  _id?: string
  id?: string
  authorId?: string
  parentId?: string | null
  authorName: string
  authorRole?: CommunityAuthorRole
  content: string
  createdAt: string
}

interface FrontendComment {
  id: string
  authorId: string
  parentId: string | null
  authorName: string
  authorRole: CommunityAuthorRole
  content: string
  createdAt: string
}

interface CommentsSectionProps {
  postId: string
  onCommentAdded: () => void
  /** Số bình luận đã bị xóa (gồm cả các trả lời con). */
  onCommentRemoved?: (removedCount: number) => void
  currentUser?: StoredUser | null | undefined
  isAuthenticated?: boolean
  onAuthRequired?: (() => void) | undefined
}

function mapComment(comment: BackendCommentResponse): FrontendComment {
  return {
    id: comment._id ?? comment.id ?? '',
    authorId: comment.authorId ?? '',
    parentId: comment.parentId ?? null,
    authorName: comment.authorName,
    authorRole: comment.authorRole ?? 'tenant',
    content: comment.content,
    createdAt: formatTimeAgo(comment.createdAt) || 'Vừa xong',
  }
}

/** Id của bình luận và mọi trả lời con cháu của nó. */
function collectThreadIds(
  comments: readonly FrontendComment[],
  rootId: string
): Set<string> {
  const ids = new Set([rootId])
  let grew = true
  while (grew) {
    grew = false
    for (const comment of comments) {
      if (
        comment.parentId &&
        ids.has(comment.parentId) &&
        !ids.has(comment.id)
      ) {
        ids.add(comment.id)
        grew = true
      }
    }
  }
  return ids
}

const INPUT_CLASSES =
  'min-h-11 flex-1 rounded-xl border border-border bg-surface px-4 py-2.5 text-xs focus:border-primary/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20'
const PRIMARY_BUTTON_CLASSES =
  'min-h-11 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary-hover disabled:opacity-50'

export function CommentsSection({
  postId,
  onCommentAdded,
  onCommentRemoved,
  currentUser,
  isAuthenticated = true,
  onAuthRequired,
}: CommentsSectionProps): React.ReactElement {
  const queryClient = useQueryClient()
  const commentsKey = React.useMemo(
    () => ['community-comments', postId] as const,
    [postId]
  )
  const userId = getUserId(currentUser ?? null)
  const isModerator = hasModeratorRole(currentUser)

  const [newCommentText, setNewCommentText] = React.useState('')
  const [replyToId, setReplyToId] = React.useState<string | null>(null)
  const [replyText, setReplyText] = React.useState('')
  const [pendingDelete, setPendingDelete] =
    React.useState<FrontendComment | null>(null)

  const commentsQuery = useQuery({
    queryKey: commentsKey,
    queryFn: () =>
      apiClient.get<BackendCommentResponse[]>(
        `/community/posts/${postId}/comments`
      ),
    select: data => data.map(mapComment),
  })
  const comments = React.useMemo(
    () => commentsQuery.data ?? [],
    [commentsQuery.data]
  )

  const addMutation = useMutation({
    mutationFn: ({
      content,
      parentId,
    }: {
      content: string
      parentId: string | null
    }) =>
      apiClient.post<BackendCommentResponse>(
        `/community/posts/${postId}/comments`,
        { content, parentId }
      ),
    onSuccess: created => {
      queryClient.setQueryData<BackendCommentResponse[]>(commentsKey, prev => [
        ...(prev ?? []),
        { ...created, createdAt: new Date().toISOString() },
      ])
      onCommentAdded()
    },
    onError: error =>
      appToast.error(toErrorMessage(error, 'Không thể gửi bình luận.')),
  })

  const deleteMutation = useMutation({
    mutationFn: (comment: FrontendComment) =>
      apiClient.delete<{ success: boolean }>(
        isModerator
          ? `/community/comments/${comment.id}`
          : `/community/comments/${comment.id}/mine`
      ),
    onSuccess: (_result, comment) => {
      const removedIds = collectThreadIds(comments, comment.id)
      queryClient.setQueryData<BackendCommentResponse[]>(commentsKey, prev =>
        (prev ?? []).filter(item => !removedIds.has(item._id ?? item.id ?? ''))
      )
      onCommentRemoved?.(removedIds.size)
      setPendingDelete(null)
    },
    onError: error => {
      appToast.error(toErrorMessage(error, 'Không thể xóa bình luận.'))
      setPendingDelete(null)
    },
  })

  const submitComment = (
    event: React.FormEvent,
    parentId: string | null
  ): void => {
    event.preventDefault()
    const text = (parentId ? replyText : newCommentText).trim()
    if (!text || addMutation.isPending) return

    addMutation.mutate(
      { content: text, parentId },
      {
        onSuccess: () => {
          if (parentId) {
            setReplyText('')
            setReplyToId(null)
          } else {
            setNewCommentText('')
          }
        },
      }
    )
  }

  const renderThread = (
    parentId: string | null,
    depth: number
  ): React.ReactNode => {
    const level = comments.filter(comment => comment.parentId === parentId)
    if (level.length === 0) return null

    return (
      <div
        className={`space-y-4 ${depth > 0 ? 'ml-2 mt-3 border-l-2 border-border/40 pl-4' : ''}`}
      >
        {level.map(comment => {
          const isReplying = replyToId === comment.id
          const canDelete =
            isModerator || (userId !== '' && comment.authorId === userId)
          return (
            <div key={comment.id} className="space-y-2">
              <div className="rounded-2xl border border-border/40 bg-surface-muted/40 p-3.5 transition-colors hover:bg-surface-muted/60">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2">
                    <UserAvatar
                      name={comment.authorName}
                      size="sm"
                      className="h-6 w-6"
                    />
                    <span className="truncate text-xs font-bold text-fg">
                      {comment.authorName}
                    </span>
                    <span
                      className={`shrink-0 rounded px-1.5 py-0.5 text-[11px] font-bold ${ROLE_BADGE_CLASSES[comment.authorRole]}`}
                    >
                      {ROLE_LABELS[comment.authorRole]}
                    </span>
                  </div>
                  <span className="shrink-0 text-[11px] text-muted">
                    {comment.createdAt}
                  </span>
                </div>
                <p className="mt-2 whitespace-pre-line break-words text-xs leading-relaxed text-muted">
                  {comment.content}
                </p>

                <div className="mt-1.5 flex items-center gap-2">
                  {isAuthenticated && (
                    <button
                      type="button"
                      onClick={() => {
                        setReplyToId(isReplying ? null : comment.id)
                        setReplyText('')
                      }}
                      className="min-h-10 px-1 text-[11px] font-bold text-primary hover:underline"
                    >
                      Trả lời
                    </button>
                  )}
                  {canDelete && (
                    <button
                      type="button"
                      onClick={() => setPendingDelete(comment)}
                      className="min-h-10 px-1 text-[11px] font-bold text-danger hover:underline"
                    >
                      {isModerator && comment.authorId !== userId
                        ? 'Gỡ'
                        : 'Xóa'}
                    </button>
                  )}
                </div>
              </div>

              {isReplying && (
                <form
                  onSubmit={event => submitComment(event, comment.id)}
                  className="mt-2 flex items-start gap-2 pl-4"
                >
                  <input
                    type="text"
                    aria-label={`Trả lời ${comment.authorName}`}
                    placeholder={`Trả lời ${comment.authorName}...`}
                    value={replyText}
                    maxLength={1000}
                    onChange={event => setReplyText(event.target.value)}
                    className={INPUT_CLASSES}
                    autoFocus
                  />
                  <div className="flex gap-1.5">
                    <button
                      type="submit"
                      disabled={!replyText.trim() || addMutation.isPending}
                      className={PRIMARY_BUTTON_CLASSES}
                    >
                      Gửi
                    </button>
                    <button
                      type="button"
                      onClick={() => setReplyToId(null)}
                      className="min-h-11 rounded-xl border border-border px-3 py-2 text-xs font-bold text-muted transition-colors hover:bg-surface-muted"
                    >
                      Hủy
                    </button>
                  </div>
                </form>
              )}

              {renderThread(comment.id, depth + 1)}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="mt-5 space-y-4 border-t border-border/40 pt-4">
      <h4 className="text-xs font-bold uppercase tracking-wider text-fg">
        Bình luận ({comments.length})
      </h4>

      {isAuthenticated ? (
        <form
          onSubmit={event => submitComment(event, null)}
          className="flex gap-2"
        >
          <input
            type="text"
            aria-label="Viết bình luận"
            placeholder="Viết bình luận công khai..."
            value={newCommentText}
            maxLength={1000}
            onChange={event => setNewCommentText(event.target.value)}
            className={INPUT_CLASSES}
          />
          <button
            type="submit"
            disabled={!newCommentText.trim() || addMutation.isPending}
            className={PRIMARY_BUTTON_CLASSES}
          >
            Bình luận
          </button>
        </form>
      ) : (
        <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-surface-muted/40 px-4 py-3">
          <Lock className="h-4 w-4 text-muted" aria-hidden />
          <span className="text-xs text-muted">
            Vui lòng{' '}
            <button
              type="button"
              onClick={onAuthRequired}
              className="border-none bg-transparent p-0 font-bold text-primary hover:underline"
            >
              đăng nhập
            </button>{' '}
            để bình luận.
          </span>
        </div>
      )}

      {commentsQuery.isLoading ? (
        <div className="py-6 text-center text-xs text-muted" role="status">
          Đang tải bình luận...
        </div>
      ) : commentsQuery.isError ? (
        <div className="py-6 text-center text-xs text-muted" role="alert">
          Không thể tải bình luận.{' '}
          <button
            type="button"
            onClick={() => void commentsQuery.refetch()}
            className="font-bold text-primary hover:underline"
          >
            Thử lại
          </button>
        </div>
      ) : comments.length === 0 ? (
        <div className="py-6 text-center text-xs text-muted">
          Chưa có bình luận nào. Hãy là người đầu tiên chia sẻ ý kiến!
        </div>
      ) : (
        renderThread(null, 0)
      )}

      <ConfirmDeleteDialog
        open={pendingDelete !== null}
        onOpenChange={open => {
          if (!open) setPendingDelete(null)
        }}
        title={
          isModerator && pendingDelete?.authorId !== userId
            ? 'Gỡ bình luận này?'
            : 'Xóa bình luận này?'
        }
        description="Các trả lời bên dưới bình luận này cũng sẽ bị xóa."
        confirmLabel="Xóa"
        isPending={deleteMutation.isPending}
        onConfirm={() => {
          if (pendingDelete) deleteMutation.mutate(pendingDelete)
        }}
      />
    </div>
  )
}
