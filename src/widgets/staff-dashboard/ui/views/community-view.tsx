'use client'

import * as React from 'react'
import Image from 'next/image'
import { apiClient } from '@/shared/api/api-client'
import { CommunityPostDetailModal } from './components/community-post-detail-modal'
import { AdminCard } from '@/shared/ui/admin-card'
import { AdminErrorState } from '@/shared/ui/admin-error-state'
import { ConfirmDialog } from '@/shared/ui/confirm-dialog'
import { appToast } from '@/shared/ui/app-toast'
import { useCan } from '@/shared/lib/permissions'
import {
  getTopicLabel,
  getPostStatusLabel,
  getAuthorRoleLabel,
  formatRecordCode,
} from '../../model/admin-labels'

export interface CommunityPost {
  id: string
  authorName: string
  authorRole: 'tenant' | 'landlord' | 'staff' | 'admin'
  authorAvatar: string
  title: string
  content: string
  projectName: string
  topic: 'qa' | 'review' | 'roommate'
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
  rejectReason?: string
}

interface BackendPostResponse {
  _id?: string
  id?: string
  authorId?: string
  authorName: string
  authorRole?: 'tenant' | 'landlord' | 'staff' | 'admin'
  authorAvatar?: string
  title: string
  content: string
  projectName: string
  topic: 'qa' | 'review' | 'roommate'
  upvotes?: string[] | number
  commentsCount?: number
  images?: string[]
  status?: 'pending' | 'approved' | 'rejected'
  rejectReason?: string
  createdAt?: string
}

function formatTimeAgo(dateStr?: string): string {
  if (!dateStr) return 'Vừa xong'
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

export function CommunityView(): React.ReactElement {
  const can = useCan()
  const canApprove = can('approve', 'CommunityPost')
  const canDelete = can('delete', 'CommunityPost')
  const [posts, setPosts] = React.useState<CommunityPost[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [selectedPost, setSelectedPost] = React.useState<CommunityPost | null>(
    null
  )
  const [rejectReason, setRejectReason] = React.useState('')
  const [showRejectDialog, setShowRejectDialog] = React.useState(false)
  const [postToDelete, setPostToDelete] = React.useState<string | null>(null)
  const [filter, setFilter] = React.useState<
    'all' | 'pending' | 'approved' | 'rejected'
  >('pending')
  const [activeDetailPost, setActiveDetailPost] =
    React.useState<CommunityPost | null>(null)

  React.useEffect(() => {
    if (!showRejectDialog) return
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        setShowRejectDialog(false)
        setSelectedPost(null)
        setRejectReason('')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showRejectDialog])

  const mapPost = React.useCallback((p: BackendPostResponse): CommunityPost => {
    const post: CommunityPost = {
      id: p._id || p.id || '',
      authorName: p.authorName || 'Người dùng TH PropTech',
      authorRole: p.authorRole || 'tenant',
      authorAvatar: p.authorAvatar || '',
      title: p.title || '',
      content: p.content || '',
      projectName: p.projectName || '',
      topic: p.topic || 'qa',
      status: p.status || 'pending',
      createdAt: formatTimeAgo(p.createdAt),
    }
    if (p.rejectReason) {
      post.rejectReason = p.rejectReason
    }
    return post
  }, [])

  const loadPosts = React.useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [pendingRes, approvedRes, rejectedRes] = await Promise.allSettled([
        apiClient.get<BackendPostResponse[]>('/community/posts/pending'),
        apiClient.get<BackendPostResponse[]>('/community/posts'),
        apiClient.get<BackendPostResponse[]>('/community/posts/rejected'),
      ])

      const isAllFailed =
        pendingRes.status === 'rejected' &&
        approvedRes.status === 'rejected' &&
        rejectedRes.status === 'rejected'

      if (isAllFailed) {
        const primaryError =
          pendingRes.reason instanceof Error
            ? pendingRes.reason.message
            : 'Không thể kết nối đến máy chủ'
        throw new Error(primaryError)
      }

      const pendingData =
        pendingRes.status === 'fulfilled' ? pendingRes.value : []
      const approvedData =
        approvedRes.status === 'fulfilled' ? approvedRes.value : []
      const rejectedData =
        rejectedRes.status === 'fulfilled' ? rejectedRes.value : []

      const mapped = [
        ...pendingData.map(mapPost),
        ...approvedData.map(mapPost),
        ...rejectedData.map(mapPost),
      ]
      setPosts(mapped)
    } catch (err: unknown) {
      console.error('Failed to load community posts for moderation:', err)
      setError(
        err instanceof Error
          ? err.message
          : 'Không thể tải danh sách bài viết cộng đồng'
      )
    } finally {
      setLoading(false)
    }
  }, [mapPost])

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadPosts()
  }, [loadPosts])

  const handleConfirmDeletePost = async (): Promise<void> => {
    if (!postToDelete) return
    try {
      await apiClient.delete(`/community/posts/${postToDelete}`)
      setPosts(prev => prev.filter(p => p.id !== postToDelete))
      setActiveDetailPost(null)
      appToast.success('Đã gỡ bài viết thành công.')
    } catch (err) {
      console.error('Failed to delete post:', err)
      appToast.error('Không thể gỡ bài viết. Vui lòng thử lại.')
    } finally {
      setPostToDelete(null)
    }
  }

  const handleApprove = async (id: string): Promise<void> => {
    try {
      await apiClient.patch(`/community/posts/${id}/status`, {
        status: 'approved',
      })
      setPosts(prev =>
        prev.map(p => (p.id === id ? { ...p, status: 'approved' } : p))
      )
      setSelectedPost(null)
      appToast.success('Đã duyệt bài viết thành công.')
    } catch (err) {
      console.error('Failed to approve post:', err)
      appToast.error('Không thể duyệt bài viết. Vui lòng thử lại.')
    }
  }

  const handleReject = async (id: string): Promise<void> => {
    try {
      const reason = rejectReason.trim()
      await apiClient.patch(`/community/posts/${id}/status`, {
        status: 'rejected',
        rejectReason: reason,
      })
      setPosts(prev =>
        prev.map(p =>
          p.id === id ? { ...p, status: 'rejected', rejectReason: reason } : p
        )
      )
      setShowRejectDialog(false)
      setSelectedPost(null)
      setRejectReason('')
      appToast.success('Đã từ chối bài viết thành công.')
    } catch (err) {
      console.error('Failed to reject post:', err)
      appToast.error('Không thể từ chối bài viết. Vui lòng thử lại.')
    }
  }

  const filteredPosts = posts.filter(
    p => filter === 'all' || p.status === filter
  )

  return (
    <div className="space-y-6">
      {/* Title & Filter headers */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-fg font-marketing">
            Danh sách bài viết cộng đồng
          </h2>
          <p className="text-xs text-muted mt-1">
            Kiểm duyệt nội dung bài đăng của cư dân nhằm đảm bảo văn minh, lịch
            sự và không vi phạm điều khoản.
          </p>
        </div>
        <div className="flex rounded-lg border border-line p-1 bg-surface-muted/30 text-xs gap-1 font-semibold self-start">
          <button
            type="button"
            aria-pressed={filter === 'all'}
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${filter === 'all' ? 'bg-primary text-on-control shadow-sm' : 'text-muted hover:text-fg'}`}
          >
            Tất cả
          </button>
          <button
            type="button"
            aria-pressed={filter === 'pending'}
            onClick={() => setFilter('pending')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${filter === 'pending' ? 'bg-primary text-on-control shadow-sm' : 'text-muted hover:text-fg'}`}
          >
            Chờ duyệt ({posts.filter(p => p.status === 'pending').length})
          </button>
          <button
            type="button"
            aria-pressed={filter === 'approved'}
            onClick={() => setFilter('approved')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${filter === 'approved' ? 'bg-primary text-on-control shadow-sm' : 'text-muted hover:text-fg'}`}
          >
            Đã duyệt
          </button>
          <button
            type="button"
            aria-pressed={filter === 'rejected'}
            onClick={() => setFilter('rejected')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${filter === 'rejected' ? 'bg-primary text-on-control shadow-sm' : 'text-muted hover:text-fg'}`}
          >
            Đã từ chối
          </button>
        </div>
      </div>

      {/* Grid List */}
      {loading ? (
        <div className="py-16 text-center rounded-xl border border-dashed border-line bg-surface-muted/30">
          <p className="text-xs text-muted font-medium">
            Đang tải danh sách bài viết...
          </p>
        </div>
      ) : error ? (
        <AdminErrorState
          title="Lỗi tải bài viết cộng đồng"
          message={error}
          onRetry={loadPosts}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPosts.map(post => (
            <AdminCard
              key={post.id}
              className="p-5 flex flex-col justify-between hover:shadow-md transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold font-display px-2 py-0.5 rounded bg-fg/5 text-muted uppercase">
                      {formatRecordCode(post.id)}
                    </span>
                    <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      {getTopicLabel(post.topic)}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      post.status === 'approved'
                        ? 'bg-accent-2/10 text-accent-2'
                        : post.status === 'rejected'
                          ? 'bg-accent/10 text-accent'
                          : 'bg-accent-3/10 text-accent-3'
                    }`}
                  >
                    {getPostStatusLabel(post.status)}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-fg leading-snug line-clamp-1">
                    {post.title}
                  </h3>
                  <p className="text-xs font-medium text-primary mt-1">
                    Dự án: {post.projectName}
                  </p>
                  <p className="text-xs text-muted mt-2 line-clamp-3 leading-relaxed">
                    {post.content}
                  </p>
                </div>

                {post.rejectReason && (
                  <div className="bg-accent/5 border border-accent/10 rounded-lg p-2.5 text-xs text-accent">
                    <strong>Lý do từ chối:</strong> {post.rejectReason}
                  </div>
                )}

                <div className="border-t border-line/50 pt-3 flex justify-between items-center text-xs text-muted">
                  <div className="flex items-center gap-2">
                    {post.authorAvatar ? (
                      <div className="relative h-6 w-6 rounded-full overflow-hidden shrink-0">
                        <Image
                          src={post.authorAvatar}
                          alt={post.authorName || 'Avatar'}
                          fill
                          sizes="24px"
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    ) : (
                      <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold shrink-0">
                        {(post.authorName || 'U').charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <span className="font-semibold text-fg block leading-none">
                        {post.authorName}
                      </span>
                      <span className="text-[10px] block mt-0.5 uppercase">
                        {getAuthorRoleLabel(post.authorRole)}
                      </span>
                    </div>
                  </div>
                  <span>{post.createdAt}</span>
                </div>
              </div>

              {post.status === 'pending' && canApprove && (
                <div className="mt-4 pt-3 border-t border-line/30 flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPost(post)
                      setShowRejectDialog(true)
                    }}
                    className="flex-1 py-2 border border-accent bg-white hover:bg-accent/5 text-accent text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Từ chối
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApprove(post.id)}
                    className="flex-1 py-2 bg-success hover:bg-success/90 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Duyệt bài
                  </button>
                </div>
              )}

              {post.status === 'approved' && canDelete && (
                <div className="mt-4 pt-3 border-t border-line/30 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setPostToDelete(post.id)}
                    className="flex-1 py-2 border border-accent bg-white hover:bg-accent/5 text-accent text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Gỡ bài
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveDetailPost(post)}
                    className="flex-1 py-2 bg-primary hover:bg-primary/90 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Xem & Gỡ bình luận
                  </button>
                </div>
              )}
            </AdminCard>
          ))}

          {filteredPosts.length === 0 && (
            <div className="col-span-full py-16 text-center rounded-xl border border-dashed border-line bg-surface-muted/30">
              <svg
                className="mx-auto h-8 w-8 text-muted/65"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <p className="mt-3 text-xs text-muted font-medium">
                Không có bài viết nào trong mục này.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Reject dialog */}
      {showRejectDialog && selectedPost && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="reject-post-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-fg/50 backdrop-blur-xs"
            onClick={() => {
              setShowRejectDialog(false)
              setSelectedPost(null)
              setRejectReason('')
            }}
          />
          <AdminCard className="relative z-10 w-full max-w-md shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5">
              <h3
                id="reject-post-dialog-title"
                className="text-base font-bold text-fg font-marketing"
              >
                Lý do từ chối bài viết
              </h3>
              <p className="text-xs text-muted mt-1">
                Nhập lý do bài viết không được duyệt để gửi thông báo cho cư
                dân.
              </p>
              <textarea
                value={rejectReason}
                onChange={e => setRejectReason(e.target.value)}
                placeholder="Ví dụ: Bài đăng chứa ngôn từ không phù hợp hoặc nội dung quảng cáo sai quy định..."
                className="w-full h-24 p-3 mt-3 text-xs border border-line rounded-lg focus:outline-none focus:border-accent bg-bg/25 resize-none"
                required
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowRejectDialog(false)
                    setSelectedPost(null)
                    setRejectReason('')
                  }}
                  className="px-4 py-2 border border-line text-muted hover:text-fg text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={() => handleReject(selectedPost.id)}
                  disabled={!rejectReason.trim()}
                  className="px-4 py-2 bg-accent hover:bg-accent/95 text-white text-xs font-semibold rounded-lg shadow-sm disabled:opacity-50 transition-colors cursor-pointer"
                >
                  Xác nhận từ chối
                </button>
              </div>
            </div>
          </AdminCard>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={!!postToDelete}
        onOpenChange={open => !open && setPostToDelete(null)}
        title="Gỡ bài viết"
        description="Bạn có chắc chắn muốn gỡ bài viết này khỏi bảng tin cộng đồng? Hành động này không thể hoàn tác."
        confirmText="Gỡ bài"
        variant="danger"
        onConfirm={handleConfirmDeletePost}
      />

      {/* Detail & Comments Modal */}
      {activeDetailPost && (
        <CommunityPostDetailModal
          isOpen={!!activeDetailPost}
          onClose={() => setActiveDetailPost(null)}
          post={activeDetailPost}
          onDeletePost={async (postId: string) => {
            setPostToDelete(postId)
          }}
          formatTimeAgo={formatTimeAgo}
        />
      )}
    </div>
  )
}
