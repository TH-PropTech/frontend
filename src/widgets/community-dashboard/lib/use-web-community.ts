'use client'

import { useState, useCallback, useMemo } from 'react'

export interface WebCommunityPost {
  id: string
  authorName: string
  authorRole: 'tenant' | 'landlord' | 'staff'
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
  {
    id: 'wpost-own-1',
    authorName: 'Nguyễn Thạch (Bạn)',
    authorRole: 'tenant',
    authorAvatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
    title: 'Phí gửi xe ô tô tại Vinhomes Central Park bao nhiêu?',
    content:
      'Khách thuê hỏi phí gửi ô tô hầm là bao nhiêu/tháng? Có ai biết bảng giá mới nhất không ạ?',
    projectName: 'Vinhomes Central Park',
    topic: 'qa',
    upvotes: 11,
    hasUpvoted: false,
    commentsCount: 7,
    images: [],
    status: 'approved',
    createdAt: '3 ngày trước',
    isOwn: true,
  },
]

const SEED_PENDING: WebCommunityPost[] = [
  {
    id: 'wpost-own-pending',
    authorName: 'Nguyễn Thạch (Bạn)',
    authorRole: 'tenant',
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
  },
]

export function useWebCommunity() {
  const [posts, setPosts] = useState<WebCommunityPost[]>([
    ...SEED_PENDING,
    ...SEED_POSTS,
  ])
  const [topicFilter, setTopicFilter] = useState<
    'all' | 'qa' | 'review' | 'roommate'
  >('all')
  const [isStaffDemo, setIsStaffDemo] = useState(false)
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

  const approvedPosts = useMemo(() => {
    let filtered = posts.filter(p => p.status === 'approved')
    if (showMyPosts) filtered = filtered.filter(p => p.isOwn)
    if (topicFilter !== 'all')
      filtered = filtered.filter(p => p.topic === topicFilter)
    return filtered
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
    (e: React.FormEvent) => {
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
      const newPost: WebCommunityPost = {
        id: `wpost-${Date.now()}`,
        authorName: 'Nguyễn Thạch (Bạn)',
        authorRole: 'tenant',
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
      setTitle('')
      setContent('')
      setProjectName('')
      setImages([])
      setShowCreateModal(false)
      setSuccessMsg('Bài viết đã gửi thành công! Đang chờ kiểm duyệt.')
      setTimeout(() => setSuccessMsg(''), 5000)
    },
    [title, content, topic, projectName, images]
  )

  const handleApprove = useCallback((id: string) => {
    setPosts(prev =>
      prev.map(p => (p.id === id ? { ...p, status: 'approved' as const } : p))
    )
  }, [])

  const handleReject = useCallback((id: string) => {
    setPosts(prev =>
      prev.map(p => (p.id === id ? { ...p, status: 'rejected' as const } : p))
    )
  }, [])

  const handleUpvote = useCallback((id: string) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id !== id) return p
        return p.hasUpvoted
          ? { ...p, upvotes: p.upvotes - 1, hasUpvoted: false }
          : { ...p, upvotes: p.upvotes + 1, hasUpvoted: true }
      })
    )
  }, [])

  return {
    approvedPosts,
    pendingPosts,
    topicFilter,
    setTopicFilter,
    isStaffDemo,
    setIsStaffDemo,
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
    handleApprove,
    handleReject,
    handleUpvote,
  }
}
