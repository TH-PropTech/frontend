export type CommunityTopic = 'qa' | 'review' | 'roommate'
export type CommunityTopicFilter = CommunityTopic | 'all'
export type CommunityPostStatus = 'pending' | 'approved' | 'rejected'
export type CommunityAuthorRole = 'tenant' | 'landlord' | 'staff' | 'admin'

export interface WebCommunityPost {
  id: string
  authorName: string
  authorRole: CommunityAuthorRole
  /** Rỗng khi người dùng chưa có ảnh đại diện; UI hiện chữ cái đầu. */
  authorAvatar: string
  title: string
  content: string
  projectName: string
  topic: CommunityTopic
  upvotes: number
  hasUpvoted: boolean
  commentsCount: number
  images: string[]
  status: CommunityPostStatus
  createdAt: string
  isOwn: boolean
}

export interface BackendPostResponse {
  _id?: string
  id?: string
  authorId?: string
  authorName: string
  authorRole?: CommunityAuthorRole
  authorAvatar?: string
  title: string
  content: string
  projectName: string
  topic: CommunityTopic
  upvotes?: string[] | number
  hasUpvoted?: boolean
  commentsCount?: number
  images?: string[]
  status?: CommunityPostStatus
  createdAt?: string
}

export interface CommunityStats {
  contributorCount: number
  projectCount: number
  projects: { name: string; posts: number }[]
}

/** Người dùng đang đăng nhập, đọc từ `localStorage['user']`. */
export interface StoredUser {
  _id?: string
  id?: string
  name?: string
  roles?: string[]
}

export interface CommunityFilters {
  topic: CommunityTopicFilter
  search: string
  project: string | null
}

export const ROLE_LABELS: Record<CommunityAuthorRole, string> = {
  tenant: 'Khách thuê',
  landlord: 'Chủ nhà',
  staff: 'Đội ngũ TH',
  admin: 'Quản trị viên',
}

export const ROLE_BADGE_CLASSES: Record<CommunityAuthorRole, string> = {
  tenant: 'bg-primary-soft text-primary',
  landlord: 'bg-accent-soft text-fg',
  staff: 'bg-danger-soft text-danger',
  admin: 'bg-danger-soft text-danger',
}

export const TOPIC_LABELS: Record<CommunityTopic, string> = {
  qa: 'Hỏi đáp',
  review: 'Đánh giá',
  roommate: 'Ở ghép',
}

const MINUTE_MS = 60_000
const JUST_NOW = 'Vừa xong'

export function formatTimeAgo(dateStr: string, now: Date = new Date()): string {
  const date = new Date(dateStr)
  if (Number.isNaN(date.getTime())) return ''
  const diffMins = Math.floor((now.getTime() - date.getTime()) / MINUTE_MS)
  if (diffMins < 1) return JUST_NOW
  if (diffMins < 60) return `${diffMins} phút trước`
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours} giờ trước`
  return `${Math.floor(diffHours / 24)} ngày trước`
}

export function getUserId(user: StoredUser | null): string {
  return user?._id ?? user?.id ?? ''
}

export function hasModeratorRole(
  user: { roles?: string[] } | null | undefined
): boolean {
  return (user?.roles ?? []).some(role => {
    const normalized = role.toLowerCase()
    return normalized === 'staff' || normalized === 'admin'
  })
}

/** Ảnh `blob:`/`file:` do phiên bản cũ lưu nhầm chỉ mở được trên máy người đăng, nên bỏ khỏi UI. */
function keepRemoteImages(images: string[] | undefined): string[] {
  return (images ?? []).filter(url => /^https?:\/\//i.test(url))
}

export function mapPost(
  post: BackendPostResponse,
  userId: string
): WebCommunityPost {
  const upvoters = Array.isArray(post.upvotes) ? post.upvotes : null
  const role = post.authorRole ?? 'tenant'
  return {
    id: post._id ?? post.id ?? '',
    authorName: post.authorName,
    authorRole: role === 'admin' ? 'staff' : role,
    authorAvatar: post.authorAvatar ?? '',
    title: post.title,
    content: post.content,
    projectName: post.projectName,
    topic: post.topic,
    upvotes: upvoters
      ? upvoters.length
      : typeof post.upvotes === 'number'
        ? post.upvotes
        : 0,
    hasUpvoted: upvoters
      ? userId !== '' && upvoters.includes(userId)
      : Boolean(post.hasUpvoted),
    commentsCount: post.commentsCount ?? 0,
    images: keepRemoteImages(post.images),
    status: post.status ?? 'approved',
    createdAt: post.createdAt ? formatTimeAgo(post.createdAt) : JUST_NOW,
    isOwn: userId !== '' && post.authorId === userId,
  }
}

/** Lọc phía client cho các danh sách nhỏ đã tải đủ (bài của tôi, chờ duyệt). */
export function filterPosts(
  posts: readonly WebCommunityPost[],
  filters: CommunityFilters
): WebCommunityPost[] {
  const keyword = filters.search.trim().toLowerCase()
  const project = filters.project?.toLowerCase() ?? null
  return posts.filter(post => {
    if (filters.topic !== 'all' && post.topic !== filters.topic) return false
    if (project && post.projectName.toLowerCase() !== project) return false
    if (!keyword) return true
    return [post.title, post.content, post.projectName, post.authorName].some(
      field => field.toLowerCase().includes(keyword)
    )
  })
}
