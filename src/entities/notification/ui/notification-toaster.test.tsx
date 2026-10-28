import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { NotificationToaster } from './notification-toaster'

const mocks = vi.hoisted(() => ({ useNotificationToasts: vi.fn() }))

vi.mock('../model/use-notification-toasts', () => ({
  useNotificationToasts: mocks.useNotificationToasts,
}))

describe('NotificationToaster', () => {
  it('bật việc hiện toast thông báo và không render ra giao diện nào', () => {
    const { container } = render(<NotificationToaster />)

    expect(mocks.useNotificationToasts).toHaveBeenCalledTimes(1)
    expect(container).toBeEmptyDOMElement()
  })
})
