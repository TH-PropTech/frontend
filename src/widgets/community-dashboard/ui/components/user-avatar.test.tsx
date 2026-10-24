import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { UserAvatar } from './user-avatar'

describe('UserAvatar', () => {
  it('renders initials when no src is provided', () => {
    render(<UserAvatar name="Ngô Nhựt Huy" />)
    expect(screen.getByText('NH')).toBeInTheDocument()
  })

  it('renders initials for single word name', () => {
    render(<UserAvatar name="Thach" />)
    expect(screen.getByText('TH')).toBeInTheDocument()
  })

  it('renders fallback U when name is empty', () => {
    render(<UserAvatar name="" />)
    expect(screen.getByText('U')).toBeInTheDocument()
  })
})
