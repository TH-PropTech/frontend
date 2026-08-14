import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AppToastCard } from './app-toast'

describe('AppToastCard', () => {
  it.each([
    ['success', 'Thành công'],
    ['error', 'Có lỗi xảy ra'],
    ['info', 'Thông báo'],
  ] as const)('renders an accessible %s toast', (type, title) => {
    render(
      <AppToastCard type={type} title={title} message="Nội dung phản hồi" />
    )

    expect(screen.getByRole(type === 'error' ? 'alert' : 'status')).toBeTruthy()
    expect(screen.getByText(title)).toBeTruthy()
    expect(screen.getByText('Nội dung phản hồi')).toBeTruthy()
  })
})
