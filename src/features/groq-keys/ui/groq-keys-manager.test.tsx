import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { GroqKeyCheck, GroqKeyItem } from '../model/groq-keys.types'
import { GroqKeysManager } from './groq-keys-manager'

const api = vi.hoisted(() => ({
  listGroqKeys: vi.fn(),
  addGroqKeys: vi.fn(),
  checkGroqKey: vi.fn(),
  setGroqKeyStatus: vi.fn(),
  deleteGroqKey: vi.fn(),
}))

vi.mock('../api/groq-keys-api', () => api)
vi.mock('sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}))

const savedKey: GroqKeyItem = {
  _id: '64f0a1b2c3d4e5f6a7b8c9d0',
  key: 'gsk_abcd...wxyz',
  status: 'active',
  cooldownUntil: 0,
  usageCount: 3,
  failCount: 0,
  lastUsedAt: 0,
  createdAt: 1,
}

const okCheck: GroqKeyCheck = {
  at: 1,
  ok: true,
  models: [{ id: 'llama-3.3-70b-versatile', owner: 'Meta', ctx: 131072 }],
  limits: { tokensLimit: 6000, tokensRemaining: 5000 },
}

describe('GroqKeysManager', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    api.listGroqKeys.mockResolvedValue([savedKey])
  })

  it('renders the saved keys with their status and expandable detail', async () => {
    const user = userEvent.setup()
    render(<GroqKeysManager />)

    const toggle = await screen.findByRole('button', {
      name: /^gsk_abcd\.\.\.wxyz/,
    })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByText('Đang dùng')).toBeInTheDocument()

    await user.click(toggle)

    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('Chưa kiểm tra key này.')).toBeInTheDocument()
  })

  it('checks typed keys and saves the valid ones', async () => {
    const user = userEvent.setup()
    api.checkGroqKey.mockResolvedValue(okCheck)
    api.addGroqKeys.mockResolvedValue({ added: 1, duplicated: 0 })
    render(<GroqKeysManager />)
    await screen.findByRole('button', { name: /^gsk_abcd\.\.\.wxyz/ })

    await user.type(
      screen.getByLabelText('Key Groq cần thêm'),
      'gsk_NEWKEY0123456789012345'
    )
    await user.click(screen.getByRole('button', { name: 'Kiểm tra' }))

    expect(api.checkGroqKey).toHaveBeenCalledWith({
      key: 'gsk_NEWKEY0123456789012345',
    })
    const save = await screen.findByRole('button', {
      name: 'Lưu 1 key hợp lệ',
    })
    await user.click(save)

    await waitFor(() =>
      expect(api.addGroqKeys).toHaveBeenCalledWith({
        keys: ['gsk_NEWKEY0123456789012345'],
        checks: { gsk_NEWKEY0123456789012345: okCheck },
      })
    )
    expect(api.listGroqKeys).toHaveBeenCalledTimes(2)
  })
})
