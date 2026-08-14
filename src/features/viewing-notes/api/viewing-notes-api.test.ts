import { beforeEach, describe, expect, it, vi } from 'vitest'
import { apiClient } from '@/shared/api'
import {
  createViewingNote,
  deleteViewingNote,
  getViewingNotes,
  updateViewingNote,
} from './viewing-notes-api'

vi.mock('@/shared/api', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}))

describe('viewing notes API', () => {
  beforeEach(() => vi.clearAllMocks())

  it('supports private note CRUD without accepting privacy ownership fields', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({ items: [], total: 0 })
    vi.mocked(apiClient.post).mockResolvedValue({ _id: 'note-1' })
    vi.mocked(apiClient.patch).mockResolvedValue({ _id: 'note-1' })
    vi.mocked(apiClient.delete).mockResolvedValue(undefined)

    await getViewingNotes('apartment-1')
    await createViewingNote({ apartmentId: 'apartment-1', noise: 4 })
    await updateViewingNote('note-1', { noise: 5 })
    await deleteViewingNote('note-1')

    expect(apiClient.get).toHaveBeenCalledWith(
      '/viewing-notes?apartmentId=apartment-1&page=1&limit=20'
    )
    expect(apiClient.post).toHaveBeenCalledWith('/viewing-notes', {
      apartmentId: 'apartment-1',
      noise: 4,
    })
    expect(apiClient.patch).toHaveBeenCalledWith('/viewing-notes/note-1', {
      noise: 5,
    })
    expect(apiClient.delete).toHaveBeenCalledWith('/viewing-notes/note-1')
  })
})
