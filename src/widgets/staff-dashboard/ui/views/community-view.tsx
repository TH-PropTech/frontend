'use client'

import * as React from 'react'

interface CommunityPost {
  id: string
  authorName: string
  authorRole: 'tenant' | 'landlord'
  authorAvatar: string
  title: string
  content: string
  projectName: string
  topic: 'qa' | 'review' | 'roommate'
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
  rejectReason?: string
}

const mockCommunityPosts: CommunityPost[] = [
  {
    id: 'POST-501',
    authorName: 'Phạm Thành Long',
    authorRole: 'tenant',
    authorAvatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    title: 'Hỏi về độ ổn định Internet tại Masteri An Phú?',
    content:
      'Em chuẩn bị dọn qua block B của Masteri An Phú. Không biết ở đây có hay bị mất mạng hay chập chờn không ạ? Nhà em làm việc remote nên cần đường truyền ổn định.',
    projectName: 'Masteri An Phú',
    topic: 'qa',
    status: 'pending',
    createdAt: '3 giờ trước',
  },
  {
    id: 'POST-502',
    authorName: 'Lê Hoài Nam',
    authorRole: 'tenant',
    authorAvatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    title: 'Cần tìm 1 bạn nam ở ghép căn hộ Vinhomes Grand Park S9',
    content:
      'Căn hộ full nội thất đã có tủ lạnh, máy giặt, máy lạnh, bếp từ. Mình cần tìm 1 bạn nam ở ghép văn minh, lịch sự, không hút thuốc. Giá share 2.5tr/tháng.',
    projectName: 'Vinhomes Grand Park',
    topic: 'roommate',
    status: 'pending',
    createdAt: '5 giờ trước',
  },
  {
    id: 'POST-503',
    authorName: 'Nguyễn Thị Minh',
    authorRole: 'landlord',
    authorAvatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    title: 'Đánh giá ban quản lý tòa nhà Sunrise City Quận 7',
    content:
      'Sunrise City vận hành khá ổn, phí dịch vụ 16.500đ/m2 hợp lý so với các tiện ích nhận được. Đội ngũ vệ sinh làm sạch liên tục, an ninh 3 lớp tốt.',
    projectName: 'Sunrise City',
    topic: 'review',
    status: 'approved',
    createdAt: '1 ngày trước',
  },
]

export function CommunityView(): React.ReactElement {
  const [posts, setPosts] = React.useState<CommunityPost[]>(mockCommunityPosts)
  const [selectedPost, setSelectedPost] = React.useState<CommunityPost | null>(
    null
  )
  const [rejectReason, setRejectReason] = React.useState('')
  const [showRejectDialog, setShowRejectDialog] = React.useState(false)
  const [filter, setFilter] = React.useState<
    'all' | 'pending' | 'approved' | 'rejected'
  >('pending')

  const filteredPosts = posts.filter(
    p => filter === 'all' || p.status === filter
  )

  const handleApprove = (id: string): void => {
    setPosts(prev =>
      prev.map(p => (p.id === id ? { ...p, status: 'approved' } : p))
    )
    setSelectedPost(null)
  }

  const handleReject = (id: string): void => {
    if (!rejectReason.trim()) return
    setPosts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, status: 'rejected', rejectReason } : p
      )
    )
    setShowRejectDialog(false)
    setSelectedPost(null)
    setRejectReason('')
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
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
                      {post.authorRole === 'tenant' ? 'Người thuê' : 'Chủ nhà'}
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
