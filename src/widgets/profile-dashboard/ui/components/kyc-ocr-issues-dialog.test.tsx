import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { OcrIssue } from '../../lib/kyc-ocr-issues'
import { KycOcrIssuesDialog } from './kyc-ocr-issues-dialog'

const ISSUES: OcrIssue[] = [
  { side: 'front', message: 'Mặt trước: chưa đọc được Số CCCD.' },
  { side: 'back', message: 'Mặt sau: không đọc được. Nên chụp lại.' },
]

function renderDialog(issues: OcrIssue[]) {
  const handlers = {
    onRetake: vi.fn(),
    onContinue: vi.fn(),
    onDismiss: vi.fn(),
  }
  render(<KycOcrIssuesDialog issues={issues} {...handlers} />)
  return handlers
}

describe('KycOcrIssuesDialog', () => {
  it('renders nothing when there are no issues', () => {
    renderDialog([])

    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('lists every flagged side', () => {
    renderDialog(ISSUES)

    expect(screen.getByText(/Mặt trước: chưa đọc được Số CCCD/)).toBeVisible()
    expect(screen.getByText(/Mặt sau: không đọc được/)).toBeVisible()
  })

  it('offers retake and continue-to-edit as separate actions', () => {
    const handlers = renderDialog(ISSUES)

    fireEvent.click(screen.getByRole('button', { name: /Chụp lại ảnh/ }))
    expect(handlers.onRetake).toHaveBeenCalledOnce()
    expect(handlers.onContinue).not.toHaveBeenCalled()

    fireEvent.click(screen.getByRole('button', { name: /Tiếp tục/ }))
    expect(handlers.onContinue).toHaveBeenCalledOnce()
  })

  it('dismisses without choosing on Escape', () => {
    const handlers = renderDialog(ISSUES)

    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' })

    expect(handlers.onDismiss).toHaveBeenCalledOnce()
    expect(handlers.onRetake).not.toHaveBeenCalled()
  })
})
