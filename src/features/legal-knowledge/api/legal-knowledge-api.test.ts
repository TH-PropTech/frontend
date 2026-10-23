import { describe, expect, it, vi } from 'vitest'
import { apiClient } from '@/shared/api'
import {
  archiveLegalDoc,
  createLegalDoc,
  fetchLegalLink,
  listLegalDocs,
  publishLegalDoc,
  publishLegalDocs,
  searchLegalKnowledge,
  unpublishLegalDoc,
  updateLegalDoc,
} from './legal-knowledge-api'

describe('legal knowledge API', () => {
  it('publishes several documents with one batch request', async () => {
    const post = vi
      .spyOn(apiClient, 'post')
      .mockResolvedValueOnce({ published: [], failed: [] })

    await publishLegalDocs(['a', 'b'])

    expect(post).toHaveBeenCalledWith('/legal-knowledge/admin/publish-batch', {
      ids: ['a', 'b'],
    })
    post.mockRestore()
  })

  it('lists docs without a query string when no filter is set', async () => {
    const get = vi.spyOn(apiClient, 'get').mockResolvedValueOnce([])

    await listLegalDocs()

    expect(get).toHaveBeenCalledWith('/legal-knowledge/admin')
    get.mockRestore()
  })

  it('passes only the filters that are set', async () => {
    const get = vi.spyOn(apiClient, 'get').mockResolvedValue([])

    await listLegalDocs({ status: 'draft', category: 'luat', q: '  cọc  ' })
    await listLegalDocs({ q: '   ' })

    expect(get).toHaveBeenNthCalledWith(
      1,
      '/legal-knowledge/admin?status=draft&category=luat&q=c%E1%BB%8Dc'
    )
    expect(get).toHaveBeenNthCalledWith(2, '/legal-knowledge/admin')
    get.mockRestore()
  })

  it('creates and updates documents on the admin endpoints', async () => {
    const post = vi.spyOn(apiClient, 'post').mockResolvedValue({})
    const patch = vi.spyOn(apiClient, 'patch').mockResolvedValue({})
    const input = {
      title: 'Luật Nhà ở',
      category: 'luat' as const,
      content: 'Điều 1. Nội dung đủ dài để lưu.',
    }

    await createLegalDoc(input)
    await updateLegalDoc('64f0', { title: 'Mới' })

    expect(post).toHaveBeenCalledWith('/legal-knowledge/admin', input)
    expect(patch).toHaveBeenCalledWith('/legal-knowledge/admin/64f0', {
      title: 'Mới',
    })
    post.mockRestore()
    patch.mockRestore()
  })

  it('publishes, unpublishes and archives by encoded id', async () => {
    const post = vi.spyOn(apiClient, 'post').mockResolvedValue({})
    const del = vi.spyOn(apiClient, 'delete').mockResolvedValue({ ok: true })

    await publishLegalDoc('a/b')
    await unpublishLegalDoc('a/b')
    await archiveLegalDoc('a/b')

    expect(post).toHaveBeenNthCalledWith(
      1,
      '/legal-knowledge/admin/a%2Fb/publish',
      {}
    )
    expect(post).toHaveBeenNthCalledWith(
      2,
      '/legal-knowledge/admin/a%2Fb/unpublish',
      {}
    )
    expect(del).toHaveBeenCalledWith('/legal-knowledge/admin/a%2Fb')
    post.mockRestore()
    del.mockRestore()
  })

  it('posts the link to fetch and the search query with a limit', async () => {
    const post = vi.spyOn(apiClient, 'post').mockResolvedValue({})

    await fetchLegalLink('https://example.gov.vn/van-ban')
    await searchLegalKnowledge('đặt cọc')

    expect(post).toHaveBeenNthCalledWith(1, '/legal-knowledge/admin/fetch', {
      url: 'https://example.gov.vn/van-ban',
    })
    expect(post).toHaveBeenNthCalledWith(2, '/legal-knowledge/admin/search', {
      query: 'đặt cọc',
      limit: 5,
    })
    post.mockRestore()
  })
})
