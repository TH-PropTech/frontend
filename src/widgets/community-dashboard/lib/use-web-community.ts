'use client'

import { useState, useCallback, useMemo, useEffect } from 'react'
import { apiClient } from '@/shared/api/api-client'

export interface WebCommunityPost {
  id: string
  authorName: string
  authorRole: 'tenant' | 'landlord' | 'staff' | 'admin'
  authorAvatar: string
  title: string
  content: string
  projectName: string
  topic: 'qa' | 'review' | 'roommate'
  upvotes: number
  hasUpvoted: boolean
  commentsCount: number
  images: string[]
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
  isOwn: boolean
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
  hasUpvoted?: boolean
  commentsCount?: number
  images?: string[]
  status?: 'pending' | 'approved' | 'rejected'
  createdAt?: string
}

const SEED_POSTS: WebCommunityPost[] = [
  {
    id: 'wpost-1',
    authorName: 'Phạm Thành Long',
    authorRole: 'tenant',
    authorAvatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    title: 'Hỏi về độ ổn định Internet tại Masteri An Phú?',
    content:
      'Em chuẩn bị dọn qua block B của Masteri An Phú. Không biết ở đây có hay bị mất mạng hay chập chờn không ạ? Nhà em làm việc remote nên cần đường truyền ổn định.',
    projectName: 'Masteri An Phú',
    topic: 'qa',
    upvotes: 7,
    hasUpvoted: false,
    commentsCount: 3,
    images: [],
    status: 'approved',
    createdAt: '3 giờ trước',
    isOwn: false,
  },
  {
    id: 'wpost-2',
    authorName: 'Nguyễn Thị Minh',
    authorRole: 'landlord',
    authorAvatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    title: 'Đánh giá ban quản lý tòa nhà Sunrise City Quận 7',
    content:
      'Sunrise City vận hành khá ổn, phí dịch vụ 16.500đ/m2 hợp lý so với các tiện ích nhận được. Đội ngũ vệ sinh làm sạch liên tục, an ninh 3 lớp tốt.',
    projectName: 'Sunrise City',
    topic: 'review',
    upvotes: 18,
    hasUpvoted: false,
    commentsCount: 5,
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=550&auto=format&fit=crop&q=80',
    ],
    status: 'approved',
    createdAt: '12 giờ trước',
    isOwn: false,
  },
  {
    id: 'wpost-3',
    authorName: 'Đỗ Hoàng Anh',
    authorRole: 'tenant',
    authorAvatar:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
    title: 'Cần tìm 1 bạn nam ở ghép căn hộ Vinhomes Grand Park S9',
    content:
      'Căn hộ full nội thất đã có tủ lạnh, máy giặt, máy lạnh, bếp từ. Mình cần tìm 1 bạn nam ở ghép văn minh, lịch sự, không hút thuốc. Giá share 2.5tr/tháng.',
    projectName: 'Vinhomes Grand Park',
    topic: 'roommate',
    upvotes: 4,
    hasUpvoted: false,
    commentsCount: 1,
    images: [],
    status: 'approved',
    createdAt: '2 ngày trước',
    isOwn: false,
  },
]

function formatTimeAgo(dateStr: string): string {
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

export function useWebCommunity() {
  const [posts, setPosts] = useState<WebCommunityPost[]>([])
  const [topicFilter, setTopicFilter] = useState<
    'all' | 'qa' | 'review' | 'roommate'
  >('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showMyPosts, setShowMyPosts] = useState(false)

  // Form states
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [topic, setTopic] = useState<'qa' | 'review' | 'roommate'>('qa')
  const [projectName, setProjectName] = useState('')
  const [images, setImages] = useState<string[]>([])
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  // Get current user from localStorage
  const currentUser = useMemo(() => {
    if (typeof window === 'undefined') return null
    const stored = localStorage.getItem('user')
    if (!stored) return null
    try {
      return JSON.parse(stored)
    } catch {
      return null
    }
  }, [])

  const userId = currentUser?._id || currentUser?.id || ''

  const mapPost = useCallback(
    (p: BackendPostResponse): WebCommunityPost => {
      const authorRoleVal = p.authorRole || 'tenant'
      return {
        id: p._id || p.id || '',
        authorName: p.authorName,
        authorRole: authorRoleVal === 'admin' ? 'staff' : authorRoleVal,
        authorAvatar:
          p.authorAvatar ||
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
        title: p.title,
        content: p.content,
        projectName: p.projectName,
        topic: p.topic,
        upvotes: Array.isArray(p.upvotes) ? p.upvotes.length : p.upvotes || 0,
        hasUpvoted: Array.isArray(p.upvotes)
          ? p.upvotes.includes(userId)
          : !!p.hasUpvoted,
        commentsCount: p.commentsCount || 0,
        images: p.images || [],
        status: p.status || 'approved',
        createdAt: p.createdAt ? formatTimeAgo(p.createdAt) : 'Vừa xong',
        isOwn: p.authorId === userId,
      }
    },
    [userId]
  )

  // Load posts from API
  const loadPosts = useCallback(async () => {
    try {
      const path =
        topicFilter === 'all'
          ? '/community/posts'
          : `/community/posts?topic=${topicFilter}`
      const fetched: BackendPostResponse[] = await apiClient.get(path)

      let mapped = fetched.map(mapPost)

      // Fetch own posts to get their latest statuses
      if (userId) {
        try {
          const own: BackendPostResponse[] = await apiClient.get(
            '/community/posts/my'
          )
          const mappedOwn = own.map(mapPost)
          // Add own posts that are not approved yet to feed
          mapped = [
            ...mappedOwn.filter(p => p.status !== 'approved'),
            ...mapped,
          ]
        } catch (e) {
          console.warn('Failed to fetch own posts from API:', e)
        }
      }

      setPosts(mapped)
    } catch (error) {
      console.warn(
        'Failed to fetch community posts from API, falling back to mock state:',
        error
      )
      // Fallback to seeds
      const initialOwnPost: WebCommunityPost = {
        id: 'wpost-own-pending',
        authorName: currentUser?.fullName || 'Nguyễn Thạch (Bạn)',
        authorRole: currentUser?.role || 'tenant',
        authorAvatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
        title: 'Có ai biết giá điện nước ở The Sun Avenue không?',
        content:
          'Mình mới ký hợp đồng thuê ở The Sun Avenue Q2. Giá điện nước BQL tính theo giá nhà nước hay riêng ạ?',
        projectName: 'The Sun Avenue',
        topic: 'qa',
        upvotes: 0,
        hasUpvoted: false,
        commentsCount: 0,
        images: [],
        status: 'pending',
        createdAt: 'Vừa xong',
        isOwn: true,
      }
      setPosts([initialOwnPost, ...SEED_POSTS])
    }
  }, [topicFilter, userId, currentUser, mapPost])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadPosts()
  }, [loadPosts])

  const approvedPosts = useMemo(() => {
    if (showMyPosts) {
      let filtered = posts.filter(p => p.isOwn)
      if (topicFilter !== 'all')
        filtered = filtered.filter(p => p.topic === topicFilter)
      return filtered
    } else {
      let filtered = posts.filter(p => p.status === 'approved')
      if (topicFilter !== 'all')
        filtered = filtered.filter(p => p.topic === topicFilter)
      return filtered
    }
  }, [posts, topicFilter, showMyPosts])

  const pendingPosts = useMemo(
    () => posts.filter(p => p.status === 'pending'),
    [posts]
  )

  const myTotalCount = useMemo(() => posts.filter(p => p.isOwn).length, [posts])
  const myPendingCount = useMemo(
    () => posts.filter(p => p.isOwn && p.status === 'pending').length,
    [posts]
  )
  const myApprovedCount = useMemo(
    () => posts.filter(p => p.isOwn && p.status === 'approved').length,
    [posts]
  )

  const handleAddImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setErrorMsg('')
      const files = e.target.files
      if (!files) return
      if (images.length + files.length > 5) {
        setErrorMsg('Bạn chỉ có thể chọn tối đa 5 hình ảnh.')
        return
      }
      const newImages: string[] = []
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        if (!file) continue
        if (file.size > 5 * 1024 * 1024) {
          setErrorMsg(`Ảnh "${file.name}" vượt quá giới hạn 5MB.`)
          return
        }
        newImages.push(URL.createObjectURL(file))
      }
      setImages(prev => [...prev, ...newImages])
    },
    [images]
  )

  const handleRemoveImage = useCallback((index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }, [])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setErrorMsg('')
      setSuccessMsg('')
      if (!title.trim() || !content.trim()) {
        setErrorMsg('Vui lòng nhập đầy đủ tiêu đề và nội dung.')
        return
      }
      if (!projectName.trim()) {
        setErrorMsg('Vui lòng gắn thẻ tên dự án/chung cư.')
        return
      }

      try {
        const payload = {
          title,
          content,
          projectName: projectName.trim(),
          topic,
          images,
          tags: [],
        }
        const createdPost = await apiClient.post<BackendPostResponse>(
          '/community/posts',
          payload
        )
        const mapped = mapPost(createdPost)
        setPosts(prev => [mapped, ...prev])
        setSuccessMsg('Bài viết đã gửi thành công! Đang chờ kiểm duyệt.')
      } catch (error) {
        console.warn(
          'API submission failed, using local state fallback:',
          error
        )
        // Fallback
        const newPost: WebCommunityPost = {
          id: `wpost-${Date.now()}`,
          authorName: currentUser?.fullName || 'Nguyễn Thạch (Bạn)',
          authorRole: currentUser?.role || 'tenant',
          authorAvatar:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
          title,
          content,
          projectName: projectName.trim(),
          topic,
          upvotes: 0,
          hasUpvoted: false,
          commentsCount: 0,
          images,
          status: 'pending',
          createdAt: 'Vừa xong',
          isOwn: true,
        }
        setPosts(prev => [newPost, ...prev])
        setSuccessMsg(
          'Bài viết đã gửi thành công! Đang chờ kiểm duyệt (Fallback).'
        )
      }

      setTitle('')
      setContent('')
      setProjectName('')
      setImages([])
      setShowCreateModal(false)
      setTimeout(() => setSuccessMsg(''), 5000)
    },
    [title, content, topic, projectName, images, currentUser, mapPost]
  )

  const handleUpvote = useCallback(
    async (id: string) => {
      try {
        const updatedPost = await apiClient.patch<BackendPostResponse>(
          `/community/posts/${id}/upvote`,
          {}
        )
        const mapped = mapPost(updatedPost)
        setPosts(prev => prev.map(p => (p.id === id ? mapped : p)))
      } catch (error) {
        console.warn('API Upvote failed, fallback to local state:', error)
        setPosts(prev =>
          prev.map(p => {
            if (p.id !== id) return p
            return p.hasUpvoted
              ? { ...p, upvotes: p.upvotes - 1, hasUpvoted: false }
              : { ...p, upvotes: p.upvotes + 1, hasUpvoted: true }
          })
        )
      }
    },
    [mapPost]
  )

  const handleCommentAdded = useCallback((postId: string) => {
    setPosts(prev =>
      prev.map(p =>
        p.id === postId
          ? { ...p, commentsCount: (p.commentsCount || 0) + 1 }
          : p
      )
    )
  }, [])

  const handleDeletePost = useCallback(async (postId: string) => {
    try {
      await apiClient.delete(`/community/posts/${postId}`)
      setPosts(prev => prev.filter(p => p.id !== postId))
    } catch (error) {
      console.warn('API Delete post failed, fallback to local state:', error)
      setPosts(prev => prev.filter(p => p.id !== postId))
    }
  }, [])

  const handleCommentRemoved = useCallback((postId: string) => {
    setPosts(prev =>
      prev.map(p =>
        p.id === postId
          ? { ...p, commentsCount: Math.max(0, (p.commentsCount || 0) - 1) }
          : p
      )
    )
  }, [])

  return {
    approvedPosts,
    pendingPosts,
    topicFilter,
    setTopicFilter,
    showCreateModal,
    setShowCreateModal,
    showMyPosts,
    setShowMyPosts,
    myTotalCount,
    myPendingCount,
    myApprovedCount,
    title,
    setTitle,
    content,
    setContent,
    topic,
    setTopic,
    projectName,
    setProjectName,
    images,
    errorMsg,
    successMsg,
    handleAddImage,
    handleRemoveImage,
    handleSubmit,
    handleUpvote,
    handleCommentAdded,
    handleDeletePost,
    handleCommentRemoved,
    currentUser,
  }
}
