import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  deleteNotification,
  fetchNotifications,
  fetchUnreadCount,
  markAllNotificationsRead,
  markNotificationRead,
} from './notifications-api'

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
  patch: vi.fn(),
  delete: vi.fn(),
}))

vi.mock('@/shared/api', () => ({ apiClient: mocks }))

describe('notifications api', () => {
  beforeEach(() => {
    mocks.get.mockReset()
    mocks.patch.mockReset()
    mocks.delete.mockReset()
  })

  it('lấy danh sách không kèm query khi không có tham số', async () => {
    mocks.get.mockResolvedValue({ items: [], total: 0 })

    await fetchNotifications()

    expect(mocks.get).toHaveBeenCalledWith('/notifications')
  })

  it('đưa page, limit và isRead vào query', async () => {
    mocks.get.mockResolvedValue({ items: [], total: 0 })

    await fetchNotifications({ page: 2, limit: 10, isRead: false })

    expect(mocks.get).toHaveBeenCalledWith(
      '/notifications?page=2&limit=10&isRead=false'
    )
  })

  it('giữ isRead=true khi lọc đã đọc', async () => {
    mocks.get.mockResolvedValue({ items: [], total: 0 })

    await fetchNotifications({ isRead: true })

    expect(mocks.get).toHaveBeenCalledWith('/notifications?isRead=true')
  })

  it('trả về số chưa đọc từ unread-count', async () => {
    mocks.get.mockResolvedValue({ count: 35 })

    await expect(fetchUnreadCount()).resolves.toBe(35)
    expect(mocks.get).toHaveBeenCalledWith('/notifications/unread-count')
  })

  it('đánh dấu đã đọc bằng PATCH và mã hóa id', async () => {
    mocks.patch.mockResolvedValue({})

    await markNotificationRead('a/b')

    expect(mocks.patch).toHaveBeenCalledWith('/notifications/a%2Fb/read', {})
  })

  it('đọc tất cả bằng PATCH, không phải POST', async () => {
    mocks.patch.mockResolvedValue({ success: true })

    await markAllNotificationsRead()

    expect(mocks.patch).toHaveBeenCalledWith('/notifications/read-all', {})
  })

  it('xóa bằng DELETE và mã hóa id', async () => {
    mocks.delete.mockResolvedValue({ success: true })

    await deleteNotification('a/b')

    expect(mocks.delete).toHaveBeenCalledWith('/notifications/a%2Fb')
  })

  it('lan truyền lỗi từ api client', async () => {
    mocks.get.mockRejectedValue(new Error('network'))

    await expect(fetchUnreadCount()).rejects.toThrow('network')
  })
})
