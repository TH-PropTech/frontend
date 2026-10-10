import { describe, expect, it, vi } from 'vitest'
import { apiClient } from '@/shared/api'
import {
  addGroqKeys,
  checkGroqKey,
  deleteGroqKey,
  listGroqKeys,
  setGroqKeyStatus,
} from './groq-keys-api'

describe('groq keys API', () => {
  it('lists saved keys from the admin endpoint', async () => {
    const get = vi.spyOn(apiClient, 'get').mockResolvedValueOnce([])

    await listGroqKeys()

    expect(get).toHaveBeenCalledWith('/groq-keys/admin')
    get.mockRestore()
  })

  it('posts raw keys with their checks when adding', async () => {
    const post = vi
      .spyOn(apiClient, 'post')
      .mockResolvedValueOnce({ added: 1, duplicated: 0 })
    const check = {
      at: 1,
      ok: true,
      models: [],
    }

    await addGroqKeys({ keys: ['gsk_a'], checks: { gsk_a: check } })

    expect(post).toHaveBeenCalledWith('/groq-keys/admin', {
      keys: ['gsk_a'],
      checks: { gsk_a: check },
    })
    post.mockRestore()
  })

  it('checks either a raw key or a saved id', async () => {
    const post = vi
      .spyOn(apiClient, 'post')
      .mockResolvedValue({ at: 1, ok: true, models: [] })

    await checkGroqKey({ key: 'gsk_raw' })
    await checkGroqKey({ id: 'abc' })

    expect(post).toHaveBeenNthCalledWith(1, '/groq-keys/admin/check', {
      key: 'gsk_raw',
    })
    expect(post).toHaveBeenNthCalledWith(2, '/groq-keys/admin/check', {
      id: 'abc',
    })
    post.mockRestore()
  })

  it('patches status and deletes by encoded id', async () => {
    const patch = vi
      .spyOn(apiClient, 'patch')
      .mockResolvedValueOnce({ ok: true })
    const del = vi
      .spyOn(apiClient, 'delete')
      .mockResolvedValueOnce({ ok: true })

    await setGroqKeyStatus('64f0a1', 'reset')
    await deleteGroqKey('64f0a1')

    expect(patch).toHaveBeenCalledWith('/groq-keys/admin/64f0a1', {
      action: 'reset',
    })
    expect(del).toHaveBeenCalledWith('/groq-keys/admin/64f0a1')
    patch.mockRestore()
    del.mockRestore()
  })
})
