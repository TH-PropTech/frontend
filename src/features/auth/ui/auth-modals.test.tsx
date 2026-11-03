import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { PrivacyModal } from './auth-modals'

describe('PrivacyModal', () => {
  it('states how the KYC face image is stored and used', () => {
    render(<PrivacyModal isOpen onClose={vi.fn()} />)

    expect(screen.getByText(/Ảnh khuôn mặt \(selfie\)/)).toBeInTheDocument()
    expect(screen.getByText(/lưu mã hóa/)).toBeInTheDocument()
  })
})
