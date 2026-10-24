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
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
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

  const isStaffOrAdmin = useMemo(() => {
    if (!currentUser?.roles) return false
    return currentUser.roles.some(
      (r: string) => r.toLowerCase() === 'staff' || r.toLowerCase() === 'admin'
    )
  }, [currentUser])

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
          mapped = [
            ...mappedOwn.filter(p => p.status !== 'approved'),
            ...mapped.filter(p => !mappedOwn.some(o => o.id === p.id)),
          ]
        } catch (e) {
          console.warn('Failed to fetch own posts from API:', e)
        }
      }

      // If staff/admin, fetch pending posts to moderate
      if (isStaffOrAdmin) {
        try {
          const pending: BackendPostResponse[] = await apiClient.get(
            '/community/posts/pending'
          )
          const mappedPending = pending.map(mapPost)
          mapped = [
            ...mappedPending.filter(p => !mapped.some(m => m.id === p.id)),
            ...mapped,
          ]
        } catch (e) {
          console.warn('Failed to fetch pending posts for staff:', e)
        }
      }

      setPosts(mapped)
    } catch (error) {
      console.warn('Failed to fetch community posts from API:', error)
      setPosts([])
    }
  }, [topicFilter, userId, isStaffOrAdmin, mapPost])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadPosts()
  }, [loadPosts])

  const approvedPosts = useMemo(() => {
    let list = showMyPosts
      ? posts.filter(p => p.isOwn)
      : posts.filter(p => p.status === 'approved')

    if (topicFilter !== 'all') {
      list = list.filter(p => p.topic === topicFilter)
    }

    if (selectedProject) {
      list = list.filter(
        p => p.projectName.toLowerCase() === selectedProject.toLowerCase()
      )
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      list = list.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q) ||
          p.projectName.toLowerCase().includes(q) ||
          p.authorName.toLowerCase().includes(q)
      )
    }

    return list
  }, [posts, topicFilter, showMyPosts, selectedProject, searchQuery])

  const projectStats = useMemo(() => {
    const counts: Record<string, number> = {}
    posts
      .filter(p => p.status === 'approved')
      .forEach(p => {
        if (p.projectName) {
          counts[p.projectName] = (counts[p.projectName] || 0) + 1
        }
      })
    const entries = Object.entries(counts).map(([name, count]) => ({
      name,
      posts: count,
    }))
    entries.sort((a, b) => b.posts - a.posts)
    return entries
  }, [posts])

  const totalMembersCount = useMemo(() => {
    const approved = posts.filter(p => p.status === 'approved')
    const unique = new Set(approved.map(p => p.authorName).filter(Boolean))
    return unique.size
  }, [posts])

  const totalProjectsCount = useMemo(() => {
    const approved = posts.filter(p => p.status === 'approved')
    const unique = new Set(approved.map(p => p.projectName).filter(Boolean))
    return unique.size
  }, [posts])

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
        setTitle('')
        setContent('')
        setProjectName('')
        setImages([])
        setShowCreateModal(false)
        setTimeout(() => setSuccessMsg(''), 5000)
      } catch (error) {
        console.warn('API submission failed:', error)
        setErrorMsg('Không thể đăng bài viết lúc này. Vui lòng thử lại sau.')
      }
    },
    [title, content, topic, projectName, images, mapPost]
  )

  const handleApprovePost = useCallback(async (postId: string) => {
    try {
      await apiClient.patch(`/community/posts/${postId}/status`, {
        status: 'approved',
      })
      setPosts(prev =>
        prev.map(p => (p.id === postId ? { ...p, status: 'approved' } : p))
      )
    } catch (error) {
      console.error('Failed to approve post:', error)
    }
  }, [])

  const handleRejectPost = useCallback(async (postId: string) => {
    try {
      await apiClient.patch(`/community/posts/${postId}/status`, {
        status: 'rejected',
      })
      setPosts(prev =>
        prev.map(p => (p.id === postId ? { ...p, status: 'rejected' } : p))
      )
    } catch (error) {
      console.error('Failed to reject post:', error)
    }
  }, [])

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
    searchQuery,
    setSearchQuery,
    selectedProject,
    setSelectedProject,
    projectStats,
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
    handleApprovePost,
    handleRejectPost,
    totalMembersCount,
    totalProjectsCount,
    isStaffOrAdmin,
    currentUser,
  }
}
