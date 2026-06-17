'use client'

import * as React from 'react'
import { apiClient } from '@/shared/api/api-client'

interface CommunityPost {
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
  const [posts, setPosts] = React.useState<CommunityPost[]>([])
  const [loading, setLoading] = React.useState(true)
  const [selectedPost, setSelectedPost] = React.useState<CommunityPost | null>(
    null
  )
  const [rejectReason, setRejectReason] = React.useState('')
  const [showRejectDialog, setShowRejectDialog] = React.useState(false)
  const [filter, setFilter] = React.useState<
    'all' | 'pending' | 'approved' | 'rejected'
  >('pending')

  const mapPost = React.useCallback((p: BackendPostResponse): CommunityPost => {
    return {
      id: p._id || p.id || '',
      authorName: p.authorName || 'Người dùng TH PropTech',
      authorRole: p.authorRole || 'tenant',
      authorAvatar:
        p.authorAvatar ||
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
      title: p.title || '',
      content: p.content || '',
      projectName: p.projectName || '',
      topic: p.topic || 'qa',
      status: p.status || 'pending',
      createdAt: formatTimeAgo(p.createdAt),
    }
  }, [])

  const loadPosts = React.useCallback(async () => {
    setLoading(true)
    try {
      const [pendingData, approvedData] = await Promise.all([
        apiClient
          .get<BackendPostResponse[]>('/community/posts/pending')
          .catch(() => []),
        apiClient
          .get<BackendPostResponse[]>('/community/posts')
          .catch(() => []),
      ])
      const mapped = [...pendingData.map(mapPost), ...approvedData.map(mapPost)]
      setPosts(mapped)
    } catch (err) {
      console.error('Failed to load community posts for moderation:', err)
    } finally {
      setLoading(false)
    }
  }, [mapPost])

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadPosts()
  }, [loadPosts])

  const handleApprove = async (id: string): Promise<void> => {
    try {
      await apiClient.patch(`/community/posts/${id}/status`, {
        status: 'approved',
      })
      setPosts(prev =>
        prev.map(p => (p.id === id ? { ...p, status: 'approved' } : p))
      )
      setSelectedPost(null)
    } catch (err) {
      console.error('Failed to approve post:', err)
      if (typeof window !== 'undefined') {
        window.alert('Không thể duyệt bài viết. Vui lòng thử lại.')
      }
    }
  }

  const handleReject = async (id: string): Promise<void> => {
    try {
      await apiClient.patch(`/community/posts/${id}/status`, {
        status: 'rejected',
      })
      setPosts(prev =>
        prev.map(p =>
          p.id === id ? { ...p, status: 'rejected', rejectReason } : p
        )
      )
      setShowRejectDialog(false)
      setSelectedPost(null)
      setRejectReason('')
    } catch (err) {
      console.error('Failed to reject post:', err)
      if (typeof window !== 'undefined') {
        window.alert('Không thể từ chối bài viết. Vui lòng thử lại.')
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
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${filter === 'all' ? 'bg-primary text-on-control shadow-sm' : 'text-muted hover:text-fg'}`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${filter === 'pending' ? 'bg-primary text-on-control shadow-sm' : 'text-muted hover:text-fg'}`}
          >
            Chờ duyệt ({posts.filter(p => p.status === 'pending').length})
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${filter === 'approved' ? 'bg-primary text-on-control shadow-sm' : 'text-muted hover:text-fg'}`}
          >
            Đã duyệt
          </button>
          <button
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
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPosts.map(post => (
            <div
              key={post.id}
              className="bg-surface border border-line rounded-xl p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold font-display px-2 py-0.5 rounded bg-fg/5 text-muted uppercase">
                      {post.id}
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
                    {post.status === 'approved'
                      ? 'Đã duyệt'
                      : post.status === 'rejected'
                        ? 'Bị từ chối'
                        : 'Chờ duyệt'}
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
                    {}
                    <img
                      src={post.authorAvatar}
                      alt=""
                      className="h-6 w-6 rounded-full object-cover"
                    />
                    <div>
                      <span className="font-semibold text-fg block leading-none">
                        {post.authorName}
                      </span>
                      <span className="text-[10px] block mt-0.5 uppercase">
                        {post.authorRole === 'tenant'
                          ? 'Người thuê'
                          : 'Chủ nhà'}
                      </span>
                    </div>
                  </div>
                  <span>{post.createdAt}</span>
                </div>
              </div>

              {post.status === 'pending' && (
                <div className="mt-4 pt-3 border-t border-line/30 flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedPost(post)
                      setShowRejectDialog(true)
                    }}
                    className="flex-1 py-2 border border-accent bg-white hover:bg-accent/5 text-accent text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Từ chối
                  </button>
                  <button
                    onClick={() => handleApprove(post.id)}
                    className="flex-1 py-2 bg-success hover:bg-success/90 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Duyệt bài
                  </button>
                </div>
              )}
            </div>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-fg/50 backdrop-blur-xs"
            onClick={() => {
              setShowRejectDialog(false)
              setSelectedPost(null)
              setRejectReason('')
            }}
          />
          <div className="relative z-10 w-full max-w-md bg-surface border border-line rounded-xl shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5">
              <h3 className="text-base font-bold text-fg font-marketing">
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
                  onClick={() => handleReject(selectedPost.id)}
                  disabled={!rejectReason.trim()}
                  className="px-4 py-2 bg-accent hover:bg-accent/95 text-white text-xs font-semibold rounded-lg shadow-sm disabled:opacity-50 transition-colors cursor-pointer"
                >
                  Xác nhận từ chối
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
