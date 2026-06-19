'use client'

import * as React from 'react'
import { apiClient } from '@/shared/api/api-client'

interface BackendCommentResponse {
  _id?: string
  id?: string
  parentId?: string | null
  authorName: string
  authorRole: 'tenant' | 'landlord' | 'staff'
  content: string
  createdAt: string
}

interface FrontendComment {
  id: string
  parentId: string | null
  authorName: string
  authorRole: 'tenant' | 'landlord' | 'staff'
  content: string
  createdAt: string
}

interface CommentsSectionProps {
  postId: string
  onCommentAdded: () => void
  onCommentRemoved?: () => void
  currentUser?: { roles?: string[] } | null | undefined
  isAuthenticated?: boolean
  onAuthRequired?: (() => void) | undefined
}

const ROLE_LABELS = {
  tenant: 'Khách thuê',
  landlord: 'Chủ nhà',
  staff: 'Đội ngũ TH',
} as const

const ROLE_CLASSES = {
  tenant: 'bg-primary/10 text-primary',
  landlord: 'bg-accent/10 text-accent-DEFAULT',
  staff: 'bg-danger/10 text-danger',
} as const

function formatCommentTime(dateStr: string): string {
  try {
    const date = new Date(dateStr)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    if (diffMs < 0) return 'Vừa xong'
    const diffMins = Math.floor(diffMs / (1000 * 60))
    if (diffMins < 1) return 'Vừa xong'
    if (diffMins < 60) return `${diffMins} phút trước`
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours} giờ trước`
    const diffDays = Math.floor(diffHours / 24)
    return `${diffDays} ngày trước`
  } catch {
    return 'Vừa xong'
  }
}

export function CommentsSection({
  postId,
  onCommentAdded,
  onCommentRemoved,
  currentUser,
  isAuthenticated = true,
  onAuthRequired,
}: CommentsSectionProps): React.ReactElement {
  const [comments, setComments] = React.useState<FrontendComment[]>([])
  const [loading, setLoading] = React.useState(true)
  const [newCommentText, setNewCommentText] = React.useState('')
  const [replyToId, setReplyToId] = React.useState<string | null>(null)
  const [replyText, setReplyText] = React.useState('')
  const [submitting, setSubmitting] = React.useState(false)

  const isStaffOrAdmin = React.useMemo(() => {
    if (!currentUser?.roles) return false
    return currentUser.roles.some(
      r => r.toLowerCase() === 'staff' || r.toLowerCase() === 'admin'
    )
  }, [currentUser])

  const handleDeleteComment = async (commentId: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn gỡ bình luận này?')) return
    try {
      await apiClient.delete(`/community/comments/${commentId}`)
      setComments(prev =>
        prev.filter(c => c.id !== commentId && c.parentId !== commentId)
      )
      onCommentRemoved?.()
    } catch (err) {
      console.error('Failed to delete comment:', err)
      // Fallback
      setComments(prev =>
        prev.filter(c => c.id !== commentId && c.parentId !== commentId)
      )
      onCommentRemoved?.()
    }
  }

  const loadComments = React.useCallback(async () => {
    try {
      setLoading(true)
      const data = await apiClient.get<BackendCommentResponse[]>(
        `/community/posts/${postId}/comments`
      )
      const mapped = data.map(c => ({
        id: c._id || c.id || '',
        parentId: c.parentId || null,
        authorName: c.authorName,
        authorRole: c.authorRole || 'tenant',
        content: c.content,
        createdAt: formatCommentTime(c.createdAt),
      }))
      setComments(mapped)
    } catch (err) {
      console.error('Failed to load comments:', err)
    } finally {
      setLoading(false)
    }
  }, [postId])

  React.useEffect(() => {
    let active = true
    const fetchComments = async () => {
      await Promise.resolve()
      if (active) {
        loadComments()
      }
    }
    fetchComments()
    return () => {
      active = false
    }
  }, [loadComments])

  const handleSubmitComment = async (
    e: React.FormEvent,
    parentId: string | null = null
  ) => {
    e.preventDefault()
    const text = parentId ? replyText : newCommentText
    if (!text.trim() || submitting) return

    try {
      setSubmitting(true)
      const newComment = await apiClient.post<BackendCommentResponse>(
        `/community/posts/${postId}/comments`,
        {
          content: text.trim(),
          parentId,
        }
      )

      const mappedComment: FrontendComment = {
        id: newComment._id || newComment.id || '',
        parentId: newComment.parentId || null,
        authorName: newComment.authorName,
        authorRole: newComment.authorRole || 'tenant',
        content: newComment.content,
        createdAt: 'Vừa xong',
      }

      setComments(prev => [...prev, mappedComment])
      onCommentAdded()

      if (parentId) {
        setReplyText('')
        setReplyToId(null)
      } else {
        setNewCommentText('')
      }
    } catch (err) {
      console.error('Failed to submit comment:', err)
    } finally {
      setSubmitting(false)
    }
  }

  // Recursive renderer for nested comments
  const renderCommentTree = (
    parentId: string | null = null,
    depth = 0
  ): React.ReactNode => {
    const levelComments = comments.filter(c => c.parentId === parentId)
    if (levelComments.length === 0) return null

    return (
      <div
        className={`space-y-4 ${depth > 0 ? 'mt-3 pl-4 border-l-2 border-border/40 ml-2' : ''}`}
      >
        {levelComments.map(comment => {
          const isReplying = replyToId === comment.id
          return (
            <div key={comment.id} className="group/comment space-y-2">
              <div className="bg-surface-muted/30 hover:bg-surface-muted/50 transition-colors p-3.5 rounded-2xl border border-border/40">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-fg">
                      {comment.authorName}
                    </span>
                    <span
                      className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${ROLE_CLASSES[comment.authorRole] || ROLE_CLASSES.tenant}`}
                    >
                      {ROLE_LABELS[comment.authorRole] || ROLE_LABELS.tenant}
                    </span>
                  </div>
                  <span className="text-[10px] text-muted">
                    {comment.createdAt}
                  </span>
                </div>
                <p className="text-xs text-muted mt-1.5 leading-relaxed">
                  {comment.content}
                </p>

                {/* Comment Actions */}
                <div className="mt-2 flex items-center gap-4">
                  {isAuthenticated && (
                    <button
                      onClick={() => {
                        if (isReplying) {
                          setReplyToId(null)
                        } else {
                          setReplyToId(comment.id)
                          setReplyText('')
                        }
                      }}
                      className="text-[10px] font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      Trả lời
                    </button>
                  )}
                  {isStaffOrAdmin && (
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-[10px] font-bold text-danger hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      Gỡ
                    </button>
                  )}
                </div>
              </div>

              {/* Reply Form */}
              {isReplying && (
                <form
                  onSubmit={e => handleSubmitComment(e, comment.id)}
                  className="pl-4 mt-2 flex items-start gap-2"
                >
                  <input
                    type="text"
                    placeholder={`Trả lời ${comment.authorName}...`}
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    className="flex-1 text-xs rounded-xl border border-border px-3 py-2 bg-white focus:outline-none focus:border-primary/50"
                    autoFocus
                  />
                  <div className="flex gap-1.5">
                    <button
                      type="submit"
                      disabled={!replyText.trim() || submitting}
                      className="rounded-xl bg-primary px-3 py-2 text-xs font-bold text-white hover:bg-primary-hover disabled:opacity-50 transition-colors cursor-pointer shadow-sm"
                    >
                      Gửi
                    </button>
                    <button
                      type="button"
                      onClick={() => setReplyToId(null)}
                      className="rounded-xl border border-border px-3 py-2 text-xs font-bold text-muted hover:bg-surface-muted transition-colors cursor-pointer"
                    >
                      Hủy
                    </button>
                  </div>
                </form>
              )}

              {/* Render children comments (max depth 3 to avoid layout breaking) */}
              {renderCommentTree(comment.id, depth + 1)}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="mt-5 border-t border-border/40 pt-4 space-y-4">
      <h4 className="text-xs font-bold text-fg uppercase tracking-wider">
        Bình luận ({comments.length})
      </h4>

      {/* Main Comment Input */}
      {isAuthenticated ? (
        <form
          onSubmit={e => handleSubmitComment(e, null)}
          className="flex gap-2"
        >
          <input
            type="text"
            placeholder="Viết bình luận công khai..."
            value={newCommentText}
            onChange={e => setNewCommentText(e.target.value)}
            className="flex-1 text-xs rounded-xl border border-border px-4 py-2.5 bg-white focus:outline-none focus:border-primary/50"
          />
          <button
            type="submit"
            disabled={!newCommentText.trim() || submitting}
            className="rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white hover:bg-primary-hover disabled:opacity-50 transition-colors cursor-pointer shadow-sm"
          >
            Bình luận
          </button>
        </form>
      ) : (
        <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-surface-muted/30 px-4 py-3">
          <svg
            className="h-4 w-4 text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
          <span className="text-xs text-muted">
            Vui lòng{' '}
            <button
              type="button"
              onClick={onAuthRequired}
              className="text-primary font-bold hover:underline bg-transparent border-none p-0 cursor-pointer"
            >
              đăng nhập
            </button>{' '}
            để bình luận.
          </span>
        </div>
      )}

      {/* Comments List */}
      {loading ? (
        <div className="py-6 text-center text-xs text-muted">
          Đang tải bình luận...
        </div>
      ) : comments.length === 0 ? (
        <div className="py-6 text-center text-xs text-muted">
          Chưa có bình luận nào. Hãy là người đầu tiên chia sẻ ý kiến!
        </div>
      ) : (
        renderCommentTree(null, 0)
      )}
    </div>
  )
}
