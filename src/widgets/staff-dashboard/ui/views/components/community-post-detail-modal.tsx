'use client'

import * as React from 'react'
import { apiClient } from '@/shared/api/api-client'
import type { CommunityPost } from '../community-view'

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
          authorAvatar:
            c.authorAvatar ||
            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
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

  const handleDeleteComment = async (commentId: string): Promise<void> => {
    if (
      typeof window !== 'undefined' &&
      !window.confirm('Bạn có chắc chắn muốn gỡ bình luận này?')
    ) {
      return
    }
    try {
      await apiClient.delete(`/community/comments/${commentId}`)
      setComments(prev =>
        prev.filter(c => c.id !== commentId && c.parentId !== commentId)
      )
    } catch (err) {
      console.error('Failed to delete comment:', err)
      if (typeof window !== 'undefined') {
        window.alert('Không thể gỡ bình luận. Vui lòng thử lại.')
      }
    }
  }

  const getTopicLabel = (topic: string): string => {
    switch (topic) {
      case 'qa':
        return 'Hỏi đáp'
      case 'review':
        return 'Đánh giá'
      case 'roommate':
        return 'Ở ghép'
      default:
        return topic
    }
  }

  const renderCommentNode = (comment: Comment, depth = 0): React.ReactNode => {
    const childComments = comments.filter(c => c.parentId === comment.id)
    return (
      <div key={comment.id} className="space-y-3 mt-3">
        <div
          className={`flex gap-3 items-start ${depth > 0 ? 'ml-6 border-l border-line/80 pl-4' : ''}`}
        >
          <img
            src={comment.authorAvatar}
            alt=""
            className="w-7 h-7 rounded-full object-cover mt-0.5"
          />
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
                  {comment.authorRole === 'staff' ||
                  comment.authorRole === 'admin'
                    ? 'Đội ngũ TH'
                    : comment.authorRole === 'landlord'
                      ? 'Chủ nhà'
                      : 'Người thuê'}
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
                onClick={() => handleDeleteComment(comment.id)}
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-fg/50 backdrop-blur-xs"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-2xl bg-surface border border-line rounded-xl shadow-lg overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 border-b border-line flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-fg font-marketing">
              Chi tiết bài viết & Bình luận
            </h3>
            <p className="text-xs text-muted mt-0.5">
              Quản lý nội dung bài viết và các bình luận liên quan.
            </p>
          </div>
          <button
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
                  {post.id}
                </span>
                <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  {getTopicLabel(post.topic)}
                </span>
              </div>
              <button
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
                <img
                  src={post.authorAvatar}
                  alt=""
                  className="h-5 w-5 rounded-full object-cover"
                />
                <div>
                  <span className="font-semibold text-fg">
                    {post.authorName}
                  </span>
                  <span className="ml-1.5 uppercase">
                    {post.authorRole === 'tenant' ? 'Người thuê' : 'Chủ nhà'}
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
      </div>
    </div>
  )
}
