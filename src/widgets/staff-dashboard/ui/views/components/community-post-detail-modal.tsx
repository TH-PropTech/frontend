'use client'

import * as React from 'react'
import Image from 'next/image'
import { apiClient } from '@/shared/api/api-client'
import type { CommunityPost } from '../community-view'
import { AdminCard } from '@/shared/ui/admin-card'
import { ConfirmDialog } from '@/shared/ui/confirm-dialog'
import { appToast } from '@/shared/ui/app-toast'
import {
  getTopicLabel,
  getAuthorRoleLabel,
  formatRecordCode,
} from '../../../model/admin-labels'

interface Comment {
  id: string
  parentId: string | null
  authorName: string
  authorRole: 'tenant' | 'landlord' | 'staff' | 'admin'
  authorAvatar: string
  content: string
  createdAt: string
}

interface BackendCommentResponse {
  _id?: string
  id?: string
  parentId?: string | null
  authorName?: string
  authorRole?: 'tenant' | 'landlord' | 'staff' | 'admin'
  authorAvatar?: string
  content?: string
  createdAt?: string
}

interface CommunityPostDetailModalProps {
  isOpen: boolean
  onClose: () => void
  post: CommunityPost
  onDeletePost: (postId: string) => Promise<void>
  formatTimeAgo: (dateStr?: string) => string
}

export function CommunityPostDetailModal({
  isOpen,
  onClose,
  post,
  onDeletePost,
  formatTimeAgo,
}: CommunityPostDetailModalProps): React.ReactElement | null {
  const [comments, setComments] = React.useState<Comment[]>([])
  const [loadingComments, setLoadingComments] = React.useState(false)
  const [commentToDelete, setCommentToDelete] = React.useState<string | null>(
    null
  )

  React.useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  React.useEffect(() => {
    if (!isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setComments([])
      return
    }

    const loadPostComments = async (): Promise<void> => {
      setLoadingComments(true)
      try {
        const data = await apiClient.get<BackendCommentResponse[]>(
          `/community/posts/${post.id}/comments`
        )
        const mapped = data.map(c => ({
          id: c._id || c.id || '',
          parentId: c.parentId || null,
          authorName: c.authorName || 'Người dùng TH PropTech',
          authorRole: c.authorRole || 'tenant',
          authorAvatar: c.authorAvatar || '',
          content: c.content || '',
          createdAt: formatTimeAgo(c.createdAt),
        }))
        setComments(mapped)
      } catch (err) {
        console.error('Failed to load comments in staff community view:', err)
      } finally {
        setLoadingComments(false)
      }
    }

    loadPostComments()
  }, [isOpen, post.id, formatTimeAgo])

  const handleConfirmDeleteComment = async (): Promise<void> => {
    if (!commentToDelete) return
    try {
      await apiClient.delete(`/community/comments/${commentToDelete}`)
      setComments(prev =>
        prev.filter(
          c => c.id !== commentToDelete && c.parentId !== commentToDelete
        )
      )
      appToast.success('Đã gỡ bình luận thành công.')
    } catch (err) {
      console.error('Failed to delete comment:', err)
      appToast.error('Không thể gỡ bình luận. Vui lòng thử lại.')
    } finally {
      setCommentToDelete(null)
    }
  }

  const renderCommentNode = (comment: Comment, depth = 0): React.ReactNode => {
    const childComments = comments.filter(c => c.parentId === comment.id)
    return (
      <div key={comment.id} className="space-y-3 mt-3">
        <div
          className={`flex gap-3 items-start ${depth > 0 ? 'ml-6 border-l border-line/80 pl-4' : ''}`}
        >
          {comment.authorAvatar ? (
            <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 mt-0.5">
              <Image
                src={comment.authorAvatar}
                alt={comment.authorName || 'Avatar'}
                fill
                sizes="28px"
                className="object-cover"
                unoptimized
              />
            </div>
          ) : (
            <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold mt-0.5 shrink-0">
              {(comment.authorName || 'U').charAt(0).toUpperCase()}
            </div>
          )}
          <div className="flex-1 bg-surface-muted/30 border border-line/50 rounded-xl p-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-fg">
                  {comment.authorName}
                </span>
                <span
                  className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${
                    comment.authorRole === 'staff' ||
                    comment.authorRole === 'admin'
                      ? 'bg-danger/10 text-danger'
                      : comment.authorRole === 'landlord'
                        ? 'bg-accent/10 text-accent-DEFAULT'
                        : 'bg-primary/10 text-primary'
                  }`}
                >
                  {getAuthorRoleLabel(comment.authorRole)}
                </span>
              </div>
              <span className="text-[10px] text-muted">
                {comment.createdAt}
              </span>
            </div>
            <p className="text-xs text-muted mt-1 leading-relaxed">
              {comment.content}
            </p>
            <div className="mt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setCommentToDelete(comment.id)}
                className="text-[10px] font-bold text-accent hover:underline cursor-pointer"
              >
                Gỡ bình luận
              </button>
            </div>
          </div>
        </div>
        {childComments.map(child => renderCommentNode(child, depth + 1))}
      </div>
    )
  }

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="community-post-detail-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        className="absolute inset-0 bg-fg/50 backdrop-blur-xs"
        onClick={onClose}
      />
      <AdminCard className="relative z-10 w-full max-w-2xl shadow-lg overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 border-b border-line flex items-center justify-between">
          <div>
            <h3
              id="community-post-detail-title"
              className="text-base font-bold text-fg font-marketing"
            >
              Chi tiết bài viết & Bình luận
            </h3>
            <p className="text-xs text-muted mt-0.5">
              Quản lý nội dung bài viết và các bình luận liên quan.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-muted hover:text-fg font-semibold cursor-pointer text-sm"
          >
            Đóng
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-6">
          {/* Post Info card */}
          <div className="bg-surface-muted/30 border border-line/60 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold font-display px-2 py-0.5 rounded bg-fg/5 text-muted uppercase">
                  {formatRecordCode(post.id)}
                </span>
                <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  {getTopicLabel(post.topic)}
                </span>
              </div>
              <button
                type="button"
                onClick={async () => {
                  await onDeletePost(post.id)
                }}
                className="px-3 py-1 bg-accent hover:bg-accent/90 text-white text-[10px] font-bold rounded-lg transition-colors cursor-pointer"
              >
                Gỡ bài viết này
              </button>
            </div>
            <div>
              <h4 className="text-sm font-bold text-fg">{post.title}</h4>
              <p className="text-xs font-semibold text-primary mt-1">
                Dự án: {post.projectName}
              </p>
              <p className="text-xs text-muted mt-2 leading-relaxed">
                {post.content}
              </p>
            </div>
            <div className="border-t border-line/45 pt-3 flex justify-between items-center text-[10px] text-muted">
              <div className="flex items-center gap-2">
                {post.authorAvatar ? (
                  <div className="relative h-5 w-5 rounded-full overflow-hidden shrink-0">
                    <Image
                      src={post.authorAvatar}
                      alt={post.authorName || 'Avatar'}
                      fill
                      sizes="20px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[9px] font-bold shrink-0">
                    {(post.authorName || 'U').charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <span className="font-semibold text-fg">
                    {post.authorName}
                  </span>
                  <span className="ml-1.5 uppercase">
                    {getAuthorRoleLabel(post.authorRole)}
                  </span>
                </div>
              </div>
              <span>{post.createdAt}</span>
            </div>
          </div>

          {/* Comments list */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-fg uppercase tracking-wider">
              Bình luận ({comments.length})
            </h4>

            {loadingComments ? (
              <div className="py-8 text-center text-xs text-muted font-medium">
                Đang tải danh sách bình luận...
              </div>
            ) : comments.length === 0 ? (
              <div className="py-8 text-center text-xs text-muted border border-dashed border-line rounded-xl">
                Chưa có bình luận nào.
              </div>
            ) : (
              <div className="space-y-4">
                {comments
                  .filter(c => !c.parentId)
                  .map(comment => renderCommentNode(comment))}
              </div>
            )}
          </div>
        </div>
      </AdminCard>

      {/* Delete Comment Confirmation Dialog */}
      <ConfirmDialog
        open={!!commentToDelete}
        onOpenChange={open => !open && setCommentToDelete(null)}
        title="Gỡ bình luận"
        description="Bạn có chắc chắn muốn gỡ bình luận này khỏi bài viết? Hành động này không thể hoàn tác."
        confirmText="Gỡ bình luận"
        variant="danger"
        onConfirm={handleConfirmDeleteComment}
      />
    </div>
  )
}
