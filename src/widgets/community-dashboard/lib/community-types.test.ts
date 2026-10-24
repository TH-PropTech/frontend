import { describe, expect, it } from 'vitest'
import {
  filterPosts,
  formatTimeAgo,
  getUserId,
  hasModeratorRole,
  mapPost,
  type BackendPostResponse,
  type CommunityFilters,
  type WebCommunityPost,
} from './community-types'

const NOW = new Date('2026-10-24T12:00:00.000Z')
const minutesAgo = (minutes: number): string =>
  new Date(NOW.getTime() - minutes * 60_000).toISOString()

describe('formatTimeAgo', () => {
  it('says "Vừa xong" for under a minute and for timestamps slightly in the future', () => {
    expect(formatTimeAgo(minutesAgo(0), NOW)).toBe('Vừa xong')
    expect(formatTimeAgo(minutesAgo(-5), NOW)).toBe('Vừa xong')
  })

  it('formats minutes, hours and days at their boundaries', () => {
    expect(formatTimeAgo(minutesAgo(1), NOW)).toBe('1 phút trước')
    expect(formatTimeAgo(minutesAgo(59), NOW)).toBe('59 phút trước')
    expect(formatTimeAgo(minutesAgo(60), NOW)).toBe('1 giờ trước')
    expect(formatTimeAgo(minutesAgo(23 * 60 + 59), NOW)).toBe('23 giờ trước')
    expect(formatTimeAgo(minutesAgo(24 * 60), NOW)).toBe('1 ngày trước')
    expect(formatTimeAgo(minutesAgo(10 * 24 * 60), NOW)).toBe('10 ngày trước')
  })

  it('returns an empty string for an unparseable date instead of "NaN ngày trước"', () => {
    expect(formatTimeAgo('not-a-date', NOW)).toBe('')
  })
})

describe('getUserId / hasModeratorRole', () => {
  it('prefers _id, falls back to id, and is empty for guests', () => {
    expect(getUserId({ _id: 'a', id: 'b' })).toBe('a')
    expect(getUserId({ id: 'b' })).toBe('b')
    expect(getUserId({})).toBe('')
    expect(getUserId(null)).toBe('')
  })

  it('recognises staff and admin roles case-insensitively only', () => {
    expect(hasModeratorRole({ roles: ['Staff'] })).toBe(true)
    expect(hasModeratorRole({ roles: ['tenant', 'ADMIN'] })).toBe(true)
    expect(hasModeratorRole({ roles: ['tenant', 'landlord'] })).toBe(false)
    expect(hasModeratorRole({})).toBe(false)
    expect(hasModeratorRole(null)).toBe(false)
    expect(hasModeratorRole(undefined)).toBe(false)
  })
})

const backendPost = (
  overrides: Partial<BackendPostResponse> = {}
): BackendPostResponse => ({
  _id: 'p1',
  authorId: 'u1',
  authorName: 'Nguyễn Văn A',
  title: 'Tiêu đề',
  content: 'Nội dung',
  projectName: 'Landmark 81',
  topic: 'qa',
  ...overrides,
})

describe('mapPost', () => {
  it('applies defaults for a minimal backend post', () => {
    const post = mapPost(backendPost(), '')

    expect(post).toMatchObject({
      id: 'p1',
      authorRole: 'tenant',
      authorAvatar: '',
      upvotes: 0,
      hasUpvoted: false,
      commentsCount: 0,
      images: [],
      status: 'approved',
      createdAt: 'Vừa xong',
      isOwn: false,
    })
  })

  it('uses id when _id is missing and maps admin authors to staff', () => {
    const post = mapPost(
      backendPost({ _id: undefined, id: 'p9', authorRole: 'admin' }),
      'u1'
    )
    expect(post.id).toBe('p9')
    expect(post.authorRole).toBe('staff')
  })

  it('derives upvote count and hasUpvoted from the upvoter id list', () => {
    const post = mapPost(backendPost({ upvotes: ['u1', 'u2'] }), 'u1')
    expect(post.upvotes).toBe(2)
    expect(post.hasUpvoted).toBe(true)
    expect(mapPost(backendPost({ upvotes: ['u2'] }), 'u1').hasUpvoted).toBe(
      false
    )
    expect(mapPost(backendPost({ upvotes: ['u1'] }), '').hasUpvoted).toBe(false)
  })

  it('accepts a numeric upvote count with an explicit hasUpvoted flag', () => {
    const post = mapPost(backendPost({ upvotes: 7, hasUpvoted: true }), 'u1')
    expect(post.upvotes).toBe(7)
    expect(post.hasUpvoted).toBe(true)
  })

  it('flags only the author as owner and never matches a guest', () => {
    expect(mapPost(backendPost(), 'u1').isOwn).toBe(true)
    expect(mapPost(backendPost(), 'u2').isOwn).toBe(false)
    expect(mapPost(backendPost({ authorId: undefined }), '').isOwn).toBe(false)
  })

  it('drops legacy blob:/file: image URLs that only worked on the author machine', () => {
    const post = mapPost(
      backendPost({
        images: [
          'blob:http://localhost:3000/abc',
          'file:///tmp/a.jpg',
          'https://res.cloudinary.com/demo/a.jpg',
        ],
      }),
      'u1'
    )
    expect(post.images).toEqual(['https://res.cloudinary.com/demo/a.jpg'])
  })

  it('keeps the backend status and renders the creation time relatively', () => {
    const post = mapPost(
      backendPost({ status: 'rejected', createdAt: new Date().toISOString() }),
      'u1'
    )
    expect(post.status).toBe('rejected')
    expect(post.createdAt).toBe('Vừa xong')
  })
})

const webPost = (overrides: Partial<WebCommunityPost>): WebCommunityPost => ({
  ...mapPost(backendPost(), 'u1'),
  ...overrides,
})

describe('filterPosts', () => {
  const posts = [
    webPost({
      id: '1',
      topic: 'qa',
      projectName: 'Landmark 81',
      title: 'Phí quản lý',
    }),
    webPost({
      id: '2',
      topic: 'review',
      projectName: 'Masteri',
      content: 'Gió mát',
    }),
    webPost({
      id: '3',
      topic: 'roommate',
      projectName: 'Landmark 81',
      authorName: 'Trần B',
    }),
  ]
  const none: CommunityFilters = { topic: 'all', search: '', project: null }

  it('returns everything when no filter is active', () => {
    expect(filterPosts(posts, none)).toHaveLength(3)
  })

  it('filters by topic', () => {
    expect(
      filterPosts(posts, { ...none, topic: 'review' }).map(p => p.id)
    ).toEqual(['2'])
  })

  it('filters by project case-insensitively', () => {
    const ids = filterPosts(posts, { ...none, project: 'landmark 81' }).map(
      p => p.id
    )
    expect(ids).toEqual(['1', '3'])
  })

  it('matches keywords across title, content, project and author, ignoring case and padding', () => {
    expect(
      filterPosts(posts, { ...none, search: '  PHÍ ' }).map(p => p.id)
    ).toEqual(['1'])
    expect(
      filterPosts(posts, { ...none, search: 'gió' }).map(p => p.id)
    ).toEqual(['2'])
    expect(
      filterPosts(posts, { ...none, search: 'masteri' }).map(p => p.id)
    ).toEqual(['2'])
    expect(
      filterPosts(posts, { ...none, search: 'trần' }).map(p => p.id)
    ).toEqual(['3'])
  })

  it('combines filters and returns an empty list when nothing matches', () => {
    expect(
      filterPosts(posts, { topic: 'qa', search: 'phí', project: 'Landmark 81' })
    ).toHaveLength(1)
    expect(filterPosts(posts, { ...none, search: 'không có' })).toEqual([])
    expect(filterPosts([], none)).toEqual([])
  })
})
